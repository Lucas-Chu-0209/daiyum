"use client";

import { useMemo, useState } from "react";
import { Container } from "../../components/Container";
import { HeroCard } from "../../components/HeroCard";
import { Tag } from "../../components/Tag";
import { Hero, heroes, type HeroTag} from "../../data/heroes";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function GuidesPage() {
  const [activeTags, setActiveTags] = useState<Set<HeroTag>>(new Set());

  const allLaneTags = useMemo(() => uniq(heroes.flatMap((h) => h.lanes)), []);
  const allRoleTags = useMemo(() => uniq(heroes.flatMap((h) => h.roles)), []);
  const allFuncTags = useMemo(
    () => uniq(heroes.flatMap((h) => h.functions)),
    []
  );

  const toggleTag = (tag: HeroTag) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const clear = () => setActiveTags(new Set());

  const filtered = useMemo(() => {
    if (activeTags.size === 0) return heroes;

    // AND filter: hero must include every selected tag across any category
    return heroes.filter((h) => {
      const heroTags = new Set<string>([...h.lanes, ...h.roles, ...h.functions]);
      for (const t of activeTags) {
        if (!heroTags.has(t)) return false;
      }
      return true;
    });
  }, [activeTags]);

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">攻略</h1>
            <p className="mt-2 text-neutral-300">
              點標籤可篩選英雄（可多選）。
            </p>
          </div>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-white hover:bg-white/10"
          >
            清除篩選
          </button>
        </div>

        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="space-y-3">
            <div>
              <div className="mb-2 text-xs text-neutral-400">路線</div>
              <div className="flex flex-wrap gap-2">
                {allLaneTags.map((t) => (
                  <Tag
                    key={t}
                    label={t}
                    active={activeTags.has(t)}
                    onClick={() => toggleTag(t)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-neutral-400">定位</div>
              <div className="flex flex-wrap gap-2">
                {allRoleTags.map((t) => (
                  <Tag
                    key={t}
                    label={t}
                    active={activeTags.has(t)}
                    onClick={() => toggleTag(t)}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs text-neutral-400">功能</div>
              <div className="flex flex-wrap gap-2">
                {allFuncTags.map((t) => (
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
        </section>

        <div className="mt-6 text-sm text-neutral-300">
          顯示：<span className="text-white">{filtered.length}</span> /{" "}
          {heroes.length} 位英雄
        </div>

        <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HeroCard
              key={h.id}
              hero={h}
              activeTags={activeTags}
              toggleTag={toggleTag}
            />
          ))}
        </section>
      </Container>
    </main>
  );
}