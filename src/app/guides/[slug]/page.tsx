import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideLayout } from "@/components/guide/GuideLayout";
import { guideTopics } from "@/content/guides";

const findTopic = (slug: string) =>
  guideTopics.find((topic) => topic.slug === slug);

const buildRelated = (slugs: string[] | undefined) => {
  if (!slugs) return [];
  return slugs
    .map((slug) => findTopic(slug))
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
};

type GuideParams = { slug: string };

type GuidePageProps = {
  params: Promise<GuideParams>;
};

export function generateStaticParams() {
  return guideTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = findTopic(slug);
  if (!topic) {
    return {
      title: "ガイドライン",
    };
  }

  return {
    title: `${topic.title} | Next.js + Tailwind + SCSS ガイド`,
    description: topic.lead,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const topic = findTopic(slug);

  if (!topic) {
    notFound();
  }

  const relatedTopics = buildRelated(topic.related);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-12">
      <GuideLayout topic={topic} relatedTopics={relatedTopics} />
    </main>
  );
}
