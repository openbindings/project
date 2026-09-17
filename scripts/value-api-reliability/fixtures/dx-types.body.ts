// Prepended imports select the installed ESM, CommonJS or browser contract.
type IsAny<T> = 0 extends (1 & T) ? true : false;
type Same<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;
interface Shape {
  nested: { total: json.Numeric };
  rows: Array<{ label: string }>;
  tuple: [string, { count: number }?];
  optional?: { note: string };
  choice: { kind: "a"; count: number } | { kind: "b"; label: string };
  exact: json.Decimal;
  file: json.Encoded;
}
interface Tree { value: number; children: Tree[] }
declare const expression: api.Expression;
declare const session: api.Session;

// Only compiled: assertions here must not mutate runtime values.
export async function typeWitnesses() {
  const input = { price: json.number("0.1"), quantity: 3 };
  input.quantity = 4;
  const result = await expression.evaluate<Shape>(input);
  // @ts-expect-error DX-RED: typed evaluation can be absent
  result.nested.total;
  if (result !== undefined) {
    // @ts-expect-error DX-RED: nested result properties are readonly
    result.nested.total = 0;
    // @ts-expect-error DX-RED: arrays cannot grow
    result.rows.push({ label: "new" });
    const row = result.rows[0];
    if (row) {
      // @ts-expect-error DX-RED: array elements are readonly
      row.label = "changed";
    }
    // @ts-expect-error DX-RED: tuple positions are readonly
    result.tuple[0] = "changed";
    const tupleText: string = result.tuple[0]; void tupleText;
    if (result.tuple[1] !== undefined) {
      // @ts-expect-error DX-RED: optional tuple members are readonly
      result.tuple[1].count = 1;
    }
    if (result.optional !== undefined) {
      // @ts-expect-error DX-RED: optional object members are readonly
      result.optional.note = "changed";
    }
    if (result.choice.kind === "a") {
      const count: number = result.choice.count; void count;
      // @ts-expect-error DX-RED: discriminated union members are readonly
      result.choice.count = 2;
    }
    const exact: json.Decimal = result.exact;
    const file: json.Encoded = result.file;
    const copy: Uint8Array = file.bytes(); copy[0] = 42;
    json.stringify({ exact, file, total: result.nested.total });
  }
  const complete = await session.complete<Shape>();
  // @ts-expect-error DX-RED: completion can be absent
  complete.nested.total;
  if (complete !== undefined) {
    // @ts-expect-error DX-RED: completion containers are readonly
    complete.nested.total = 1;
    // @ts-expect-error DX-RED: completion arrays are readonly
    complete.rows.push({ label: "new" });
  }
  for (const selected of [await expression.select<Shape>(input, "/a"), await session.select<Shape>("/a")]) {
    if (selected.present) {
      // @ts-expect-error DX-RED: selected nested containers are readonly
      selected.value.nested.total = 1;
      // @ts-expect-error DX-RED: selected arrays are readonly
      selected.value.rows.push({ label: "new" });
    } else { const absent: undefined = selected.value; void absent; }
  }
  const valueSelection: api.Selection<json.Value> = await expression.select<json.Value>(input, "");
  if (valueSelection.present) json.stringify(valueSelection.value);
  const typed = await expression.evaluate<json.Value>(input);
  if (typed !== undefined) json.stringify(typed);
  const optionalValue = await expression.evaluate<json.Value | undefined>(input);
  if (optionalValue !== undefined) json.stringify(optionalValue);
  const redundant = await expression.evaluate<json.Value | { rows: number[] }>(input);
  const normalized: json.Value | undefined = redundant; void normalized;
  const opaque = await expression.evaluate<unknown>(input);
  // @ts-expect-error explicit unknown stays opaque on both contracts
  opaque.total;
  const neverValue: undefined = await expression.evaluate<never>(input); void neverValue;
  const scalar: number | null | undefined = await expression.evaluate<number | null>(input); void scalar;
  const tree = await expression.evaluate<Tree>(input);
  if (tree !== undefined) {
    // @ts-expect-error DX-RED: recursive result arrays are readonly
    tree.children.push({ value: 1, children: [] });
  }
  const ordinary = await expression.evaluate(input);
  const ordinaryComplete = await session.complete();
  const ordinarySelection = await session.select("");
  type DefaultEvaluate = Assert<IsAny<typeof ordinary>>;
  type DefaultComplete = Assert<IsAny<typeof ordinaryComplete>>;
  if (ordinarySelection.present) { type DefaultSelect = Assert<IsAny<typeof ordinarySelection.value>>; void (null as unknown as DefaultSelect); }
  // A generic remains a caller assertion, not validation or expression inference.
  await expression.evaluate<{ callerAssertedShape: boolean }>(input);
  const parsed = json.parse<{ nested: { count: number }; rows: number[] }>("{}");
  parsed.nested.count = 2; parsed.rows.push(1);
  const projected = json.plain({ rows: [1] });
  if (projected !== null && typeof projected === "object" && !Array.isArray(projected)) projected.extra = "mutable";
  const engine: api.Engine = jsonata;
  const legacy = api.createJSONataExecutor();
  const advanced = api.createJSONataValueExecutor();
  const oldNumber = new json.JSONNumber("0.1"); json.stringifyJSON(oldNumber);
  void engine; void legacy; void advanced;
  void (null as unknown as DefaultEvaluate | DefaultComplete);
}
