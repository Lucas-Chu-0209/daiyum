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
            DaiYum 公會專注於 Wild Rift 的內容創作與社群經營。未來會有攻略、影片、活動等，歡迎加入我們一起玩！
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
            >
              點選查看攻略！
            </Link>
            <Link
              href="/montage"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              看 Montage 精彩集錦！
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}