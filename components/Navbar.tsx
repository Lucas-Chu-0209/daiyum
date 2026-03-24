"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/guides", label: "攻略" },
  { href: "/montage", label: "Montage" },
  { href: "/guild", label: "關於我們" },
];

function MobileDrawer({
  open,
  onClose,
  logoSrc,
}: {
  open: boolean;
  onClose: () => void;
  logoSrc: string;
}) {
  // Avoid SSR/initial render issues
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] md:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Full-screen SOLID background (blocks all clicks) */}
      <div
        className={`absolute inset-0 bg-neutral-900 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Slide-in panel, but it's full screen width */}
      <aside
        id="mobile-drawer"
        className={`absolute inset-0 h-full w-full bg-neutral-900 text-neutral-100 transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="DaiYum" className="h-8 w-auto" />
            <span className="text-sm font-medium text-white">選單</span>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/15 bg-white/5 p-2 text-neutral-100 hover:bg-white/10"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-4 py-4 text-lg text-neutral-100 hover:bg-white/10"
            >
              <span>{item.label}</span>
              <span className="text-neutral-400">→</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>,
    document.body
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const logoSrc = useMemo(() => `${basePath}/brand/Daiyum_rmbg.png`, [basePath]);

  // Close on ESC + lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src={logoSrc} alt="DaiYum" className="h-10 w-auto" />
            </Link>

            <nav className="hidden items-center gap-4 text-sm text-neutral-200 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded px-2 py-1 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-neutral-100 hover:bg-white/10 md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} logoSrc={logoSrc} />
    </>
  );
}