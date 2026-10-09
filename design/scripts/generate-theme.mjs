import { access, mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const rolesPath = new URL("tokens/color.json", root);
const themePath = new URL("tokens/themes/openbindings.json", root);
const generatedDirectory = new URL("tokens/generated/", root);
const outputPath = new URL("openbindings-theme.css", generatedDirectory);

const roles = JSON.parse(await readFile(rolesPath, "utf8"));
const theme = JSON.parse(await readFile(themePath, "utf8"));
const roleNames = Object.keys(roles.roles ?? {});
const requiredSchemes = ["light", "dark"];

if (roles.format !== "openbindings.color-roles@1") {
  throw new Error("color roles must use openbindings.color-roles@1");
}
if (theme.format !== "openbindings.theme@1") {
  throw new Error("theme must use openbindings.theme@1");
}

for (const schemeName of requiredSchemes) {
  const scheme = theme.schemes?.[schemeName];
  if (!scheme) throw new Error(`theme is missing ${schemeName}`);
  for (const role of roleNames) {
    if (!/^#[0-9a-f]{6}$/i.test(scheme[role] ?? "")) {
      throw new Error(`${schemeName}.${role} must be a six-digit hex color`);
    }
  }
  const extras = Object.keys(scheme).filter((role) => !roleNames.includes(role));
  if (extras.length > 0) {
    throw new Error(`${schemeName} has undeclared roles: ${extras.join(", ")}`);
  }
}

for (const [token, role] of Object.entries(theme.elementsAdapter ?? {})) {
  if (!token.startsWith("--ob-")) {
    throw new Error(`Elements adapter key must be a public --ob-* token: ${token}`);
  }
  if (!roleNames.includes(role)) {
    throw new Error(`Elements adapter references undeclared role: ${role}`);
  }
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const a = luminance(first);
  const b = luminance(second);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

const contrastChecks = [
  ["text", "background", 7],
  ["textMuted", "background", 4.5],
  ["textFaint", "background", 4.5],
  ["accentContrast", "accent", 4.5],
  ["borderStrong", "background", 3],
  ["success", "background", 4.5],
  ["success", "successSoft", 4.5],
  ["warning", "background", 4.5],
  ["warning", "warningSoft", 4.5],
  ["danger", "background", 4.5],
  ["danger", "dangerSoft", 4.5],
];

for (const schemeName of requiredSchemes) {
  const scheme = theme.schemes[schemeName];
  for (const [foreground, background, minimum] of contrastChecks) {
    const ratio = contrast(scheme[foreground], scheme[background]);
    if (ratio < minimum) {
      throw new Error(
        `${schemeName}.${foreground} on ${background} is ${ratio.toFixed(2)}:1; expected ${minimum}:1`,
      );
    }
  }
}

function cssName(role) {
  return role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function declarations(scheme, indent = "  ") {
  return roleNames
    .map(
      (role) =>
        `${indent}--ob-theme-color-${cssName(role)}: ${scheme[role]};`,
    )
    .join("\n");
}

const elementDeclarations = Object.entries(theme.elementsAdapter)
  .map(([token, role]) => `  ${token}: var(--ob-theme-color-${cssName(role)});`)
  .join("\n");

const forcedColors = {
  background: "Canvas",
  surface: "Canvas",
  surfaceStrong: "ButtonFace",
  text: "CanvasText",
  textMuted: "GrayText",
  textFaint: "GrayText",
  border: "GrayText",
  borderStrong: "CanvasText",
  accent: "Highlight",
  accentContrast: "HighlightText",
  focus: "Highlight",
  success: "CanvasText",
  successSoft: "Canvas",
  warning: "CanvasText",
  warningSoft: "Canvas",
  danger: "CanvasText",
  dangerSoft: "Canvas",
};

for (const role of roleNames) {
  if (typeof forcedColors[role] !== "string") {
    throw new Error(`forced-colors adapter is missing role: ${role}`);
  }
}
const forcedColorExtras = Object.keys(forcedColors).filter(
  (role) => !roleNames.includes(role),
);
if (forcedColorExtras.length > 0) {
  throw new Error(
    `forced-colors adapter has undeclared roles: ${forcedColorExtras.join(", ")}`,
  );
}

const output = `/* Generated from tokens/color.json and tokens/themes/openbindings.json.
   Theme revision ${theme.revision}; maturity: ${theme.maturity}. Do not edit by hand. */

:root,
[data-ob-theme="light"] {
  color-scheme: light;
${declarations(theme.schemes.light)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-ob-theme]),
  [data-ob-theme="system"] {
    color-scheme: dark;
${declarations(theme.schemes.dark, "    ")}
  }
}

[data-ob-theme="dark"] {
  color-scheme: dark;
${declarations(theme.schemes.dark)}
}

:root,
[data-ob-theme] {
${elementDeclarations}
}

@media (forced-colors: active) {
  :root,
  [data-ob-theme] {
${roleNames
  .map((role) => `    --ob-theme-color-${cssName(role)}: ${forcedColors[role]};`)
  .join("\n")}
  }
}
`;

if (process.argv.includes("--check")) {
  await access(outputPath);
  const actual = await readFile(outputPath, "utf8");
  if (actual !== output) {
    throw new Error(`${outputPath.pathname} is stale; run npm run generate`);
  }
  console.log("theme check: role coverage, contrast, and generated CSS current");
} else {
  await mkdir(generatedDirectory, { recursive: true });
  await writeFile(outputPath, output);
  console.log("generated official OpenBindings theme CSS");
}
