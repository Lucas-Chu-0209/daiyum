import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const heroesDir = path.join(ROOT, "public", "heroes");
const outFile = path.join(ROOT, "data", "heroes.generated.ts");

const entries = fs.readdirSync(heroesDir, { withFileTypes: true })
  .filter((d) => d.isFile())
  .map((d) => d.name);

// group by id
/** @type {Map<string, Set<string>>} */
const extsById = new Map();

for (const filename of entries) {
  const ext = path.extname(filename).slice(1).toLowerCase(); // avif/webp/jpg/png
  const id = path.basename(filename, path.extname(filename)).toLowerCase();

  if (!["avif", "webp", "jpg", "jpeg", "png"].includes(ext)) continue;

  const set = extsById.get(id) ?? new Set();
  set.add(ext === "jpeg" ? "jpg" : ext);
  extsById.set(id, set);
}

// preference: webp > avif > jpg > png
const pref = ["webp", "avif", "jpg", "png"];

const heroes = Array.from(extsById.entries())
  .map(([id, extset]) => {
    const exts = Array.from(extset);
    const imageExt = pref.find((p) => exts.includes(p)) ?? exts[0];
    return { id, imageExt };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

const header = `/* AUTO-GENERATED FILE. DO NOT EDIT MANUALLY.
 * Run: node scripts/generate-heroes.mjs
 */
`;

const content =
`${header}
export type ImageExt = "avif" | "webp" | "jpg" | "png";

export type Lane = "上路" | "打野" | "中路" | "下路" | "輔助";
export type Role = "鬥士" | "坦克" | "法師" | "射手" | "刺客" | "輔助";
export type FunctionTag = "控場" | "單帶" | "開團" | "收割" | "Poke" | "全球流";
export type HeroTag = Lane | Role | FunctionTag;

export type Hero = {
  id: string;
  name: string;
  lanes: Lane[];
  roles: Role[];
  functions: FunctionTag[];
  imageExt: ImageExt;
};

export const heroes: Hero[] = [
${heroes.map(h => `  { id: ${JSON.stringify(h.id)}, name: ${JSON.stringify(h.id)}, lanes: [], roles: [], functions: [], imageExt: ${JSON.stringify(h.imageExt)} },`).join("\n")}
];
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content, "utf8");

console.log(`Wrote ${outFile} (${heroes.length} heroes)`);