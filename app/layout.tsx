import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/Navbar";

export const metadata: Metadata = {
  title: "DaiYum",
  description: "DaiYum 公會網站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-dvh bg-neutral-950 text-neutral-100 antialiased">
        <Navbar />
        {children}
        <footer className="border-t border-white/10 py-10 text-sm text-neutral-400">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} DaiYum
          </div>
        </footer>
      </body>
    </html>
  );
}