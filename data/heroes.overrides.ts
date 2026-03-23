import type { Hero, Lane, Role, FunctionTag } from "./heroes.generated";

export type HeroOverride = Partial<Pick<Hero, "name" | "lanes" | "roles" | "functions">> & {
  id: Hero["id"];
};

// 
export const heroOverrides: HeroOverride[] = [
  {
    id: "garen",
    name: "蓋倫",
    lanes: ["上路"],
    roles: ["鬥士", "坦克"],
    functions: ["單帶", "開團"],
  },
  {
    id: "ahri",
    name: "阿璃",
    lanes: ["中路"],
    roles: ["法師", "刺客"],
    functions: ["收割", "Poke"],
  },
  {
    id: "ashe",
    name: "艾希",
    lanes: ["下路"],
    roles: ["射手"],
    functions: ["全球流", "風箏"],
  },
  {
    id: "ezreal",
    name: "伊澤瑞爾",
    lanes: ["下路"],
    roles: ["射手"],
    functions: ["Poke", "全球流"],
  },
];