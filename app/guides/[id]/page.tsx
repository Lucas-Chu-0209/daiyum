import { notFound } from "next/navigation";
import { Container } from "../../../components/Container";
import { heroes } from "../../../data/heroes";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return heroes.map((h) => ({ id: h.id }));
}

export default async function HeroDetailPage({ params }: Props) {
  const { id } = await params;

  const hero = heroes.find((h) => h.id === id);
  if (!hero) return notFound();

  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-semibold text-white">{hero.name}</h1>
        <p className="mt-2 text-neutral-300">路線：{hero.lanes.join(" / ")}</p>
        <p className="mt-2 text-neutral-300">定位：{hero.roles.join(" / ")}</p>
        <p className="mt-2 text-neutral-300">
          功能：{hero.functions.join(" / ")}
        </p>
      </Container>
    </main>
  );
}