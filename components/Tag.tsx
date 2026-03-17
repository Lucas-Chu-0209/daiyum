type TagProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function Tag({ label, active = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-white/25 bg-white/15 text-white"
          : "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}