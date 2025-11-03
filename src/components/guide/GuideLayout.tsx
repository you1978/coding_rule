"use Client";
import Link from "next/link";
import type { GuideTopic } from "@/content/guides";
import { CodeSample } from "./CodeSample";
import "./guide-page.scss";
import { ScrollToTopButton } from "./ScrollToTopButton";

type GuideLayoutProps = {
  topic: GuideTopic;
  relatedTopics: GuideTopic[];
};

const headingToId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9faf\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const GuideLayout = ({ topic, relatedTopics }: GuideLayoutProps) => {
  return (
    <article className="c-guide">
      <header className="c-guide__intro">
        <p className="c-guide__lead">{topic.lead}</p>
        <h1 className="c-guide__title">{topic.title}</h1>
        <p className="c-guide__overview">{topic.overview}</p>
      </header>

      {topic.sections.map((section) => {
        const sectionId = headingToId(section.heading);
        return (
          <section key={section.heading} id={sectionId} className="c-guide__section">
            <h2 className="c-guide__heading">{section.heading}</h2>
            <p className="c-guide__description">{section.description}</p>

            {section.steps && section.steps.length > 0 ? (
              <div className="c-guide__block">
                <span className="c-guide__label">実装手順</span>
                <ol className="c-guide__list c-guide__list--numbered">
                  {section.steps.map((step) => (
                    <li key={step} className="c-guide__list-item">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {section.checklist && section.checklist.length > 0 ? (
              <div className="c-guide__block">
                <span className="c-guide__label">チェックポイント</span>
                <ul className="c-guide__list c-guide__list--bulleted">
                  {section.checklist.map((item) => (
                    <li key={item} className="c-guide__list-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {section.samples && section.samples.length > 0 ? (
              <div className="c-guide__samples">
                {section.samples.map((sample) => (
                  <CodeSample key={`${section.heading}-${sample.label}`} sample={sample} />
                ))}
              </div>
            ) : null}

            {section.note ? (
              <p className="c-guide__note">補足: {section.note}</p>
            ) : null}
          </section>
        );
      })}

      {relatedTopics.length > 0 ? (
        <section className="c-guide__related">
          <h2 className="c-guide__related-title">関連ガイド</h2>
          <div className="c-guide__related-links">
            {relatedTopics.map((related) => (
              <Link key={related.slug} href={`/guides/${related.slug}`} className="c-guide__related-link">
                {related.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* トップに戻るボタン導入*/}
      <ScrollToTopButton />
    </article>
  );
};
