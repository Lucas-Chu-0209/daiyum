import Link from "next/link";
import type { Hero, HeroTag } from "../data/heroes";
import { Tag } from "./Tag";

type Props = {
  hero: Hero;
  activeTags: Set<HeroTag>;
  toggleTag: (tag: HeroTag) => void;
};

// 讓 public 路徑自動帶 basePath（GitHub Pages 需要）
function withBasePath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function HeroCard({ hero, activeTags, toggleTag }: Props) {
  const href = `/guides/${hero.id}`;
  const imgSrc = hero.image ? withBasePath(hero.image) : undefined;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Link href={href} className="block">
        <div className="aspect-[16/10] w-full bg-black/30">
          {imgSrc ? (
            // 用 img 最穩（static export + unoptimized）
            <img
              src={imgSrc}
              alt={hero.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-neutral-400">
              No image
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-white">{hero.name}</h3>
          <p className="mt-1 text-xs text-neutral-400">點擊查看詳細</p>
        </div>
      </Link>

      {/* 標籤當輔助：放在卡片底部，仍可點選篩選（但不要觸發 Link） */}
      <div className="px-4 pb-4">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {hero.lanes.map((t) => (
              <Tag
                key={t}
                label={t}
                active={activeTags.has(t)}
                onClick={() => toggleTag(t)}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.roles.map((t) => (
              <Tag
                key={t}
                label={t}
                active={activeTags.has(t)}
                onClick={() => toggleTag(t)}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.functions.map((t) => (
              <Tag
                key={t}
                label={t}
                active={activeTags.has(t)}
                onClick={() => toggleTag(t)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}