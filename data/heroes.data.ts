import type { Lane, Role, FunctionTag } from "./heroes";

/**
 * 只放「你手動維護」的英雄資料：
 * - 想先補幾隻就補幾隻
 * - 其餘未填的英雄會在 heroes.ts 裡自動給空陣列 + 預設 name
 */
export type HeroData = {
  name: string;
  lanes: Lane[];
  roles: Role[];
  functions: FunctionTag[];
};

export const heroData: Record<string, HeroData> = {
  garen: {
    name: "蓋倫",
    lanes: ["上路"],
    roles: ["鬥士", "坦克"],
    functions: ["單帶", "開團"],
  },
  ahri: {
    name: "阿璃",
    lanes: ["中路"],
    roles: ["法師", "刺客"],
    functions: ["收割", "Poke"],
  },
  ashe: {
    name: "艾希",
    lanes: ["下路"],
    roles: ["射手"],
    functions: ["全球流", "風箏"],
  },
  ezreal: {
    name: "伊澤瑞爾",
    lanes: ["下路"],
    roles: ["射手"],
    functions: ["Poke", "全球流"],
  },
};