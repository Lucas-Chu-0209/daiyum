import type { Hero } from "../data/heroes";
import { Tag } from "./Tag";

type Props = {
  hero: Hero;
  activeTags: Set<string>;
  toggleTag: (tag: string) => void;
};

export function HeroCard({ hero, activeTags, toggleTag }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{hero.name}</h3>
        <span className="text-xs text-neutral-400">#{hero.id}</span>
      </div>

      <div className="mt-3 space-y-2">
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
  );
}