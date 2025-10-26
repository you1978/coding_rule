import "./card.scss";

type CardProps = {
  title: string;
  content: string;
  accent?: "primary" | "secondary";
  actions?: Array<{ label: string; href: string }>;
};

export const Card = ({ title, content, accent = "primary", actions = [] }: CardProps) => {
  const modifier = accent === "secondary" ? " c-card--secondary" : "";

  return (
    <article className={`c-card${modifier}`}>
      <header className="c-card__header" aria-label={title}>
        {title}
      </header>
      <div className="c-card__content">{content}</div>
      {actions.length > 0 ? (
        <footer className="c-card__footer">
          {actions.map(({ label, href }) => (
            <a key={label} className="u-btn" href={href}>
              {label}
            </a>
          ))}
        </footer>
      ) : null}
    </article>
  );
};
