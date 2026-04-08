export type MontageCategory = "Highlights" | "Ranked" | "ARAM" | "Other";

export type MontageVideo = {
  id: string; // internal id (unique)
  title: string;
  category: MontageCategory;
  youtubeId: string; // e.g. "dQw4w9WgXcQ"
  publishedAt?: string; // "2026-04-01" (optional, for sorting/display)
  tags?: string[]; // optional
};

export const montageVideos: MontageVideo[] = [
  {
    id: "katarina-outplay-montage-1",
    title: "KATARINA OUTPLAY MONTAGE #1 WILD RIFT 激鬥峽谷",
    category: "Highlights",
    youtubeId: "Zy8ZhG5Ek7c",
    publishedAt: "2026-04-01",
    tags: ["Katarina", "Outplay", "Montage"],
  },
  // 之後新增影片就繼續往下加
  {
    id: "camille-outplay-montage-1",
    title: "CAMILLE OUTPLAY MONTAGE #1 WILD RIFT 激鬥峽谷",
    category: "Highlights",
    youtubeId: "moAa8xZ6JfA",
    publishedAt: "2026-04-07",
    tags: ["Camille", "Outplay", "Montage"],
  },
  {
    id: "ambessa-legendary-moment-1",
    title: "AMBESSA LEGENDARY MOMENT #1 WILD RIFT 激鬥峽谷",
    category: "Highlights",
    youtubeId: "UqCMyayKEwU",
    publishedAt: "2026-04-09",
    tags: ["Ambessa", "Legendary", "Montage", "Outplay"],
  },
  {
    id: "taron-montage-1",
    title: "TARON OUTPLAY MONTAGE #1 WILD RIFT 激鬥峽谷",
    category: "Highlights",
    youtubeId: "TkfDz2c--oc",
    publishedAt: "2026-04-09",
    tags: ["Taron", "Outplay", "Montage"],
  },
];