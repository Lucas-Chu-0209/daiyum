"use client";

import { useMemo, useState } from "react";
import { Container } from "../../components/Container";
import { HeroCard } from "../../components/HeroCard";
import { Tag } from "../../components/Tag";
import {
  heroes,
  type HeroTag,
  type Lane,
  type Role,
  type FunctionTag,
} from "../../data/heroes";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

// Type guards: let TS narrow HeroTag -> Lane/Role/FunctionTag safely
function isLaneTag(tag: HeroTag, laneSet: Set<Lane>): tag is Lane {
  // laneSet is authoritative list of lane tags in this page
  return laneSet.has(tag as Lane);
}
function isRoleTag(tag: HeroTag, roleSet: Set<Role>): tag is Role {
  return roleSet.has(tag as Role);
}
function isFuncTag(tag: HeroTag, funcSet: Set<FunctionTag>): tag is FunctionTag {
  return funcSet.has(tag as FunctionTag);
}

export default function GuidesPage() {
  const [activeTags, setActiveTags] = useState<Set<HeroTag>>(new Set());

  // IMPORTANT: derived from heroes, so depend on heroes (even if it's currently module-level)
  const allLaneTags = useMemo(() => uniq(heroes.flatMap((h) => h.lanes)), [heroes]);
  const allRoleTags = useMemo(() => uniq(heroes.flatMap((h) => h.roles)), [heroes]);
  const allFuncTags = useMemo(
    () => uniq(heroes.flatMap((h) => h.functions)),
    [heroes]
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

  // Filter: within same category = OR, across categories = AND
  const filtered = useMemo(() => {
    if (activeTags.size === 0) return heroes;

    const laneSet = new Set<Lane>(allLaneTags);
    const roleSet = new Set<Role>(allRoleTags);
    const funcSet = new Set<FunctionTag>(allFuncTags);

    const activeLanes = new Set<Lane>(
      [...activeTags].filter((t) => isLaneTag(t, laneSet))
    );
    const activeRoles = new Set<Role>(
      [...activeTags].filter((t) => isRoleTag(t, roleSet))
    );
    const activeFuncs = new Set<FunctionTag>(
      [...activeTags].filter((t) => isFuncTag(t, funcSet))
    );

    return heroes.filter((h) => {
      const laneOk =
        activeLanes.size === 0 ? true : h.lanes.some((t) => activeLanes.has(t));

      const roleOk =
        activeRoles.size === 0 ? true : h.roles.some((t) => activeRoles.has(t));

      const funcOk =
        activeFuncs.size === 0
          ? true
          : h.functions.some((t) => activeFuncs.has(t));

      return laneOk && roleOk && funcOk;
    });
  }, [activeTags, allLaneTags, allRoleTags, allFuncTags]);

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">英雄攻略</h1>
            <p className="mt-2 text-neutral-300">點擊標籤可篩選英雄（可多選）</p>
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