export default function Footer() {
  return (
    <footer className="main-footer" style={{ marginTop: "2rem" }}>
      <p>
        &copy; {new Date().getFullYear()} Draexlmaier Cantine — Tous droits
        réservés
      </p>
      <p className="made-by">
        <a
          href="mailto:kalboussikarim3@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="kalboussi-link"
        >
          Made by Kalboussi®
        </a>
      </p>
    </footer>
  );
}
