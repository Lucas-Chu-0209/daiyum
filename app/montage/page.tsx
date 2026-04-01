"use client";

import { useMemo, useState } from "react";
import { Container } from "../../components/Container";
import {
  montageVideos,
  type MontageCategory,
  type MontageVideo,
} from "../../data/montages.data";
import { YouTubeEmbed } from "../../components/montage/YouTubeEmbed";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

const PAGE_SIZE = 12;

export default function MontagePage() {
  const [activeCategory, setActiveCategory] = useState<MontageCategory | "All">(
    "All"
  );
  const [activeVideo, setActiveVideo] = useState<MontageVideo | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => ["All" as const, ...uniq(montageVideos.map((v) => v.category))],
    []
  );

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? montageVideos
        : montageVideos.filter((v) => v.category === activeCategory);

    return [...list].sort((a, b) =>
      (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
    );
  }, [activeCategory]);

  const visible = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const canLoadMore = visibleCount < filtered.length;

  const onSelectCategory = (c: MontageCategory | "All") => {
    // Clicking the same category again toggles back to All
    setActiveCategory((prev) => {
      const next = prev === c ? "All" : c;
      return next;
    });
    // reset pagination whenever user interacts with filters
    setVisibleCount(PAGE_SIZE);
  };

  const close = () => setActiveVideo(null);

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Montage</h1>
            <p className="mt-2 text-neutral-300">
              影片清單（點擊縮圖即可在本頁播放）
            </p>
          </div>
        </div>

        {/* Category filter */}
        <section className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === activeCategory;
            return (
              <button
                key={c}
                type="button"
                onClick={() => onSelectCategory(c)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
                }`}
                aria-pressed={active}
              >
                {c === "All" ? "全部" : c}
              </button>
            );
          })}
        </section>

        {/* Grid */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveVideo(v)}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left hover:bg-white/10"
            >
              <div className="relative">
                <img
                  src={ytThumb(v.youtubeId)}
                  alt={v.title}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                  ▶ 播放
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-neutral-400">{v.category}</div>
                <div className="mt-1 line-clamp-2 text-base font-medium text-white">
                  {v.title}
                </div>
                {v.publishedAt ? (
                  <div className="mt-2 text-xs text-neutral-500">
                    {v.publishedAt}
                  </div>
                ) : null}
              </div>
            </button>
          ))}
        </section>

        {/* Load more */}
        {canLoadMore ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white hover:bg-white/10"
            >
              載入更多（{visible.length}/{filtered.length}）
            </button>
          </div>
        ) : null}

        {/* Player modal (in-page) */}
        {activeVideo ? (
          <div className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 bg-black/70" onClick={close} />
            <div className="absolute inset-0 mx-auto flex max-w-5xl items-start justify-center p-4 pt-20">
              <div className="w-full">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm text-neutral-300">
                      {activeVideo.category}
                    </div>
                    <div className="truncate text-lg font-semibold text-white">
                      {activeVideo.title}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="shrink-0 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10"
                  >
                    關閉
                  </button>
                </div>

                <YouTubeEmbed
                  youtubeId={activeVideo.youtubeId}
                  title={activeVideo.title}
                />
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </main>
  );
}