import Link from "next/link";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/guides", label: "攻略" },
  { href: "/montage", label: "Montage" },
  { href: "/guild", label: "公會" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/Daiyum_rmbg.png`}
              alt="DaiYum"
              className="h-10 w-auto"
            />
          </Link>

          <nav className="flex items-center gap-4 text-sm text-neutral-200">
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
        </div>
      </Container>
    </header>
  );
}