import { access, mkdir, readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const sourcePath = new URL("tokens/machine-material.json", root);
const generatedDirectory = new URL("tokens/generated/", root);
const cssPath = new URL("openbindings-machine-material.css", generatedDirectory);
const shikiLightPath = new URL("openbindings-machine-light.json", generatedDirectory);
const shikiDarkPath = new URL("openbindings-machine-dark.json", generatedDirectory);
const source = JSON.parse(await readFile(sourcePath, "utf8"));

if (source.format !== "openbindings.machine-material@1") {
  throw new Error("machine material must use openbindings.machine-material@1");
}

const paletteNames = Object.keys(source.palette ?? {});
const roleNames = Object.keys(source.roles ?? {});
const requiredSchemes = ["light", "dark"];

if (paletteNames.length === 0 || roleNames.length === 0) {
  throw new Error("machine material must declare palette slots and functional roles");
}

for (const schemeName of requiredSchemes) {
  const scheme = source.schemes?.[schemeName];
  if (!scheme) throw new Error(`machine material is missing ${schemeName}`);
  for (const paletteName of paletteNames) {
    if (!/^#[0-9a-f]{6}$/i.test(scheme[paletteName] ?? "")) {
      throw new Error(`${schemeName}.${paletteName} must be a six-digit hex color`);
    }
  }
  const extras = Object.keys(scheme).filter((name) => !paletteNames.includes(name));
  if (extras.length > 0) {
    throw new Error(`${schemeName} has undeclared palette slots: ${extras.join(", ")}`);
  }
}

for (const [roleName, role] of Object.entries(source.roles)) {
  if (!paletteNames.includes(role.palette)) {
    throw new Error(`${roleName} references undeclared palette slot ${role.palette}`);
  }
}

for (const [token, role] of Object.entries(source.elementsAdapter ?? {})) {
  if (!token.startsWith("--ob-")) {
    throw new Error(`Elements adapter key must be a public --ob-* token: ${token}`);
  }
  if (!roleNames.includes(role)) {
    throw new Error(`Elements adapter references undeclared role: ${role}`);
  }
}

for (const rule of source.shikiAdapter ?? []) {
  if (!roleNames.includes(rule.role) || !Array.isArray(rule.scopes) || rule.scopes.length === 0) {
    throw new Error("every Shiki adapter rule must name a role and at least one scope");
  }
}

for (const roleName of roleNames) {
  if (typeof source.forcedColors?.[roleName] !== "string") {
    throw new Error(`forced-colors adapter is missing role: ${roleName}`);
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

for (const schemeName of requiredSchemes) {
  const scheme = source.schemes[schemeName];
  for (const [roleName, role] of Object.entries(source.roles)) {
    if (!role.minimumContrast) continue;
    const ratio = contrast(scheme[role.palette], scheme.surface);
    if (ratio < role.minimumContrast) {
      throw new Error(
        `${schemeName}.${roleName} on surface is ${ratio.toFixed(2)}:1; expected ${role.minimumContrast}:1`,
      );
    }
  }
}

function cssName(name) {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function schemeDeclarations(scheme, indent = "  ") {
  const palette = paletteNames.map(
    (name) => `${indent}--ob-machine-color-${cssName(name)}: ${scheme[name]};`,
  );
  const roles = Object.entries(source.roles).map(
    ([name, role]) =>
      `${indent}--ob-machine-role-${cssName(name)}: var(--ob-machine-color-${cssName(role.palette)});`,
  );
  return [...palette, ...roles].join("\n");
}

const elementDeclarations = Object.entries(source.elementsAdapter)
  .map(([token, role]) => `  ${token}: var(--ob-machine-role-${cssName(role)});`)
  .join("\n");

const forcedDeclarations = roleNames
  .map(
    (role) =>
      `    --ob-machine-role-${cssName(role)}: ${source.forcedColors[role]};`,
  )
  .join("\n");

const css = `/* Generated from tokens/machine-material.json.
   Machine-material revision ${source.revision}; maturity: ${source.maturity}. Do not edit by hand. */

:root,
[data-ob-theme="light"] {
${schemeDeclarations(source.schemes.light)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-ob-theme]),
  [data-ob-theme="system"] {
${schemeDeclarations(source.schemes.dark, "    ")}
  }
}

[data-ob-theme="dark"] {
${schemeDeclarations(source.schemes.dark)}
}

:root,
[data-ob-theme] {
${elementDeclarations}
}

@media (forced-colors: active) {
  :root,
  [data-ob-theme] {
${forcedDeclarations}
  }
}
`;

function shikiTheme(schemeName) {
  const scheme = source.schemes[schemeName];
  const roleColor = (roleName) => scheme[source.roles[roleName].palette];
  return {
    "$schema": "https://raw.githubusercontent.com/shikijs/textmate-grammars-themes/main/packages/tm-themes/schema/theme.schema.json",
    name: `openbindings-machine-${schemeName}`,
    type: schemeName,
    fg: roleColor("plain"),
    bg: roleColor("surface"),
    colors: {
      "editor.foreground": roleColor("plain"),
      "editor.background": roleColor("surface"),
    },
    settings: [
      {
        settings: {
          foreground: roleColor("plain"),
          background: roleColor("surface"),
        },
      },
      ...source.shikiAdapter.map((rule) => ({
        scope: rule.scopes,
        settings: {
          foreground: roleColor(rule.role),
          ...(source.roles[rule.role].decoration === "underline wavy"
            ? { fontStyle: "underline" }
            : {}),
        },
      })),
    ],
  };
}

const shikiLight = `${JSON.stringify(shikiTheme("light"), null, 2)}\n`;
const shikiDark = `${JSON.stringify(shikiTheme("dark"), null, 2)}\n`;
const outputs = [
  [cssPath, css],
  [shikiLightPath, shikiLight],
  [shikiDarkPath, shikiDark],
];

if (process.argv.includes("--check")) {
  for (const [path, expected] of outputs) {
    await access(path);
    const actual = await readFile(path, "utf8");
    if (actual !== expected) {
      throw new Error(`${path.pathname} is stale; run npm run generate`);
    }
  }
  console.log("machine-material check: roles, contrast, and adapters current");
} else {
  await mkdir(generatedDirectory, { recursive: true });
  await Promise.all(outputs.map(([path, contents]) => writeFile(path, contents)));
  console.log("generated machine-material CSS and Shiki adapters");
}
