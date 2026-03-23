import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const heroesDir = path.join(ROOT, "public", "heroes");
const outFile = path.join(ROOT, "data", "heroes.generated_1.ts");

const entries = fs
  .readdirSync(heroesDir, { withFileTypes: true })
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

const heroAssets = Array.from(extsById.entries())
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

const content = `${header}
export type ImageExt = "avif" | "webp" | "jpg" | "png";

export type HeroAsset = {
  id: string;
  imageExt: ImageExt;
};

export const heroAssets: HeroAsset[] = [
${heroAssets
  .map(
    (h) =>
      `  { id: ${JSON.stringify(h.id)}, imageExt: ${JSON.stringify(h.imageExt)} },`
  )
  .join("\n")}
];
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content, "utf8");

console.log(`Wrote ${outFile} (${heroAssets.length} heroes)`);