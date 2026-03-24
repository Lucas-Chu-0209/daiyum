import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const ROOT = process.cwd();

const legacyFile = path.join(ROOT, "data", "heroes.generated.ts");
const outFile = path.join(ROOT, "data", "heroes.data.ts");

if (!fs.existsSync(legacyFile)) {
  console.error(
    `Missing ${legacyFile}\n` +
      `Please copy your old generated file to data/heroes.generated.ts first.`
  );
  process.exit(1);
}

// Import the TS module via a temp JS/ESM bridge.
// We'll do a simple transform: strip type exports, keep the exported const heroes.
const legacyTs = fs.readFileSync(legacyFile, "utf8");

// Extract the "export const heroes: Hero[] = [ ... ];" array text
const match = legacyTs.match(/export const heroes: Hero\[\] = \[(.|\n|\r)*?\];/m);
if (!match) {
  console.error(
    `Could not find "export const heroes: Hero[] = [ ... ];" in ${legacyFile}`
  );
  process.exit(1);
}

const heroesBlock = match[0]
  // turn `export const heroes: Hero[] =` into `export const heroes =`
  .replace("export const heroes: Hero[] =", "export const heroes =");

// Write to a temp .mjs so Node can import it
const tmpFile = path.join(
  ROOT,
  "node_modules",
  ".tmp-heroes-generated-legacy.mjs"
);
fs.mkdirSync(path.dirname(tmpFile), { recursive: true });
fs.writeFileSync(tmpFile, `${heroesBlock}\n`, "utf8");

const modUrl = url.pathToFileURL(tmpFile).toString();
const { heroes } = await import(modUrl);

if (!Array.isArray(heroes)) {
  console.error(`Imported heroes is not an array from ${legacyFile}`);
  process.exit(1);
}

// If heroes.data.ts already exists, try to preserve any manual edits (e.g. Chinese names)
let existingHeroData = {};
if (fs.existsSync(outFile)) {
  const existingText = fs.readFileSync(outFile, "utf8");
  // very lightweight parse: find "export const heroData = { ... }"
  // We'll just avoid parsing and keep it simple: don't preserve automatically
  // unless you ask; for now we overwrite deterministically from legacy.
}

const lines = [];
lines.push(`import type { Lane, Role, FunctionTag } from "./heroes";`);
lines.push("");
lines.push(`export type HeroData = {`);
lines.push(`  name: string;`);
lines.push(`  lanes: Lane[];`);
lines.push(`  roles: Role[];`);
lines.push(`  functions: FunctionTag[];`);
lines.push(`};`);
lines.push("");
lines.push(`export const heroData: Record<string, HeroData> = {`);

for (const h of heroes) {
  // Ensure string id key
  const id = String(h.id);
  const name = String(h.name ?? id);
  const lanes = Array.isArray(h.lanes) ? h.lanes : [];
  const roles = Array.isArray(h.roles) ? h.roles : [];
  const functions = Array.isArray(h.functions) ? h.functions : [];

  lines.push(`  ${JSON.stringify(id)}: {`);
  lines.push(`    name: ${JSON.stringify(name)},`);
  lines.push(`    lanes: ${JSON.stringify(lanes)},`);
  lines.push(`    roles: ${JSON.stringify(roles)},`);
  lines.push(`    functions: ${JSON.stringify(functions)},`);
  lines.push(`  },`);
}

lines.push(`};`);
lines.push("");

fs.writeFileSync(outFile, lines.join("\n"), "utf8");

console.log(`Wrote ${outFile} (${heroes.length} heroes)`);