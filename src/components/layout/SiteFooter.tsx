import "./site-footer.scss";

/**
 * Practice Question 26 starter component.
 * Replace placeholder content with finalized footer layout.
 */
export const SiteFooter = () => {
  return (
    <footer className="c-footer" role="contentinfo">
      <div className="c-footer__inner">
        <p className="c-footer__copy">© {new Date().getFullYear()} Coding Guidelines Practice</p>
        <a href="https://github.com/example" className="c-footer__link">
          GitHub (ダミー)
        </a>
      </div>
    </footer>
  );
};

export default SiteFooter;
