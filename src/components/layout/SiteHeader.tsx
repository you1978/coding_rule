import Link from "next/link";
import "./site-header.scss";

/**
 * Practice Question 25 starter component.
 * Flesh out navigation items, layout, and responsive behavior.
 */
export const SiteHeader = () => {
  return (
    <header className="c-header" role="banner">
      <div className="c-header__inner">
        <Link href="/" className="c-header__brand">
          Next.js + Tailwind + SCSS
        </Link>
        <nav aria-label="主要ナビゲーション" className="c-header__nav">
          <ul className="c-header__links">
            <li>
              <Link href="/guides">Guides</Link>
            </li>
            <li>
              <Link href="/overview">Overview</Link>
            </li>
            <li>
              <Link href="/practice">Practice</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
