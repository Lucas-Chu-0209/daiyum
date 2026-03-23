import Link from "next/link";
import { Container } from "../components/Container";

export default function Home() {
  return (
    <main className="py-12">
      <Container>
        {/* Section 1: DaiYum 公會 */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm text-neutral-300">Wild Rift / 英雄聯盟：激鬥峽谷</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            DaiYum 公會
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-200">
            DaiYum 公會專注於 Wild Rift 的各式內容創作與社群經營，致力於提供最新的遊戲資訊與活動，同時也希望能透過本社群增進玩家的觀念與技巧。未來將不定期有攻略、影片、活動等更新，歡迎加入我們一起玩！
          </p>
        </section>

        {/* Section 2: 查看攻略 */}
        <section
          className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          // 之後你選好圖片，把註解打開即可：
          style={{
            backgroundImage: "url(/home/guides-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* 如果有放背景圖，建議保留這層遮罩讓文字清楚 */}
          <div className="p-8">
            <p className="text-sm text-neutral-300">Guides</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              查看攻略
            </h2>
            <p className="mt-4 max-w-2xl text-neutral-200">
              使用路線 / 定位 / 功能標籤快速篩選英雄，找到你要的玩法與定位攻略！持續更新中。
            </p>

            <div className="mt-6">
              <Link
                href="/guides"
                className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200"
              >
                點選查看攻略！
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3: Montage 精彩集錦 */}
        <section
          className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          // 之後你選好圖片，把註解打開即可：
          style={{
            backgroundImage: "url(/home/montages-bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-8">
            <p className="text-sm text-neutral-300">Montage</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Montage 精彩集錦
            </h2>            <p className="mt-4 max-w-2xl text-neutral-200">
              公會成員的操作精華、精彩片段整理，持續更新。
            </p>

            <div className="mt-6">
              <Link
                href="/montage"
                className="inline-flex rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                看 Montage 精彩集錦！
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}