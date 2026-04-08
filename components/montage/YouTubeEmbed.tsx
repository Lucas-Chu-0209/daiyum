"use client";

export function YouTubeEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title?: string;
}) {
  // nocookie domain is a good default for embeds
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black pt-[56.25%]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>

  );
}