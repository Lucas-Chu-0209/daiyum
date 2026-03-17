import Link from "next/link";
import { Container } from "../components/Container";

export default function Home() {
  return (
    <main className="py-12">
      <Container>
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-neutral-300">Wild Rift / 英雄聯盟：激鬥峽谷</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            DaiYum 公會
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-200">
            乾淨的攻略、英雄重點整理、以及 Montage 集錦。先把架構做好，內容我們再慢慢補齊。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
            >
              看攻略
            </Link>
            <Link
              href="/montage"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              看 Montage
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}