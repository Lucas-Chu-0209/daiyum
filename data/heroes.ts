export * from "./heroes.generated";

import { heroes as generatedHeroes } from "./heroes.generated";
import { heroOverrides } from "./heroes.overrides";

const overrideMap = new Map(heroOverrides.map((o) => [o.id, o]));

// 導出的 heroes 會是「generated」+「你覆蓋的欄位」
export const heroes = generatedHeroes.map((h) => {
  const o = overrideMap.get(h.id);
  if (!o) return h;

  return {
    ...h,
    ...o,
  };
});

// export type Lane = "上路" | "打野" | "中路" | "下路" | "輔助";
// export type Role = "鬥士" | "坦克" | "法師" | "射手" | "刺客" | "輔助";
// export type FunctionTag = "控場" | "單帶" | "開團" | "收割" | "Poke" | "全球流";

// export type HeroTag = Lane | Role | FunctionTag;
// export type ImageExt = "avif" | "webp" | "jpg" | "png";

// export type Hero = {
//   id: string; // url-safe, e.g. "ahri"
//   name: string; // display name, e.g. "阿璃"
//   lanes: Lane[];
//   roles: Role[];
//   functions: FunctionTag[];
//   imageExt?: ImageExt; // optional, default .avif
//   // image?: string; // e.g. "/heroes/ahri.png"
// };

// export const heroes: Hero[] = [
//   {
//     id: "garen",
//     name: "蓋倫",
//     lanes: ["上路"],
//     roles: ["鬥士", "坦克"],
//     functions: ["單帶", "開團"],
//     imageExt: "webp",
//   },
//   {
//     id: "ahri",
//     name: "阿璃",
//     lanes: ["中路"],
//     roles: ["法師", "刺客"],
//     functions: ["收割", "Poke"],
//     imageExt: "webp",
//     // image: "/heroes/ezreal.webp",
//   },
//   {
//     id: "ashe",
//     name: "艾希",
//     lanes: ["下路"],
//     roles: ["射手"],
//     functions: ["Poke", "全球流"],
//     imageExt: "webp",
//   },
//   {
//     id: "ezreal",
//     name: "伊澤瑞爾",
//     lanes: ["下路"],
//     roles: ["射手"],
//     functions: ["Poke", "全球流"],
//     imageExt: "webp",
//     // image: "/heroes/ezreal.webp",
//   },
// ];