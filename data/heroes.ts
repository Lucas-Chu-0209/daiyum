import { heroAssets } from "./heroes.generated_1";
import { heroData } from "./heroes.data";
import type { ImageExt } from "./heroes.generated";

export type Lane = "上路" | "打野" | "中路" | "下路" | "輔助";
export type Role = "鬥士" | "坦克" | "法師" | "射手" | "刺客";

// 你目前已經定義很多 FunctionTag，我先保留你現有的全集（你可自行加/刪）
export type FunctionTag =
  | "控場"
  | "單帶"
  | "開團"
  | "收割"
  | "Poke"
  | "全球流"
  | "風箏"
  | "線霸"
  | "打團"
  | "反打"
  | "遊走"
  | "爆發"
  | "持續輸出"
  | "保護"
  | "意識流"
  | "切後"
  | "農夫"
  | "清線"
  | "控線"
  | "視野"
  | "勾你"
  | "會動的肉"
  | "治療"
  | "切坦";

export type HeroTag = Lane | Role | FunctionTag;

export type Hero = {
  id: string;
  name: string;
  lanes: Lane[];
  roles: Role[];
  functions: FunctionTag[];
  imageExt: ImageExt;
};

/**
 * 最終給網站用的 heroes：
 * - 有填 heroData 的英雄：用你手動資料（中文名 + tags）
 * - 沒填的英雄：name 預設用 id，tags 為空陣列
 */
export const heroes: Hero[] = heroAssets.map((a) => {
  const d = heroData[a.id];

  return {
    id: a.id,
    imageExt: a.imageExt,
    name: d?.name ?? a.id,
    lanes: d?.lanes ?? [],
    roles: d?.roles ?? [],
    functions: d?.functions ?? [],
  };
});