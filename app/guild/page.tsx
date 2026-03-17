import { Container } from "../../components/Container";

export default function GuildPage() {
  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-white">公會</h1>
        <p className="mt-2 text-neutral-300">介紹、招募規則、成員資訊等。</p>
      </Container>
    </main>
  );
}