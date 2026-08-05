import "./AdminFooter.css";

export function AdminFooter() {
  return (
    <footer className="footer">
      <span>© 2026 VIA Outlets · Management Portal v0.1</span>

      <nav className="footer__links">
        <a className="footer__link" href="#privacy">
          Privacy
        </a>
        <a className="footer__link" href="#terms">
          Terms
        </a>
        <a className="footer__link" href="#support">
          IT Support
        </a>
        <span className="footer__status">
          <span className="footer__dot" />
          All systems operational
        </span>
      </nav>
    </footer>
  );
}
