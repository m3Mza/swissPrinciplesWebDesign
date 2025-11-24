import './App.css'
import { Link } from 'react-router-dom'

function References() {
  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Link to="/">ŠVAJCARSKI STIL</Link>
          </div>
          <nav className="nav">
            <Link to="/">Početak</Link>
            <a href="/#kultura">Kultura</a>
            <a href="/#internacionalni-stil">Istorijat</a>
            <div className="nav-dropdown">
              <a href="/#primena" className="nav-dropdown-toggle">Primena u veb dizajnu ▾</a>
              <div className="nav-dropdown-menu">
                <a href="/#grid">Grid sistem</a>
                <a href="/#tipografija">Tipografija</a>
                <a href="/#prazan-prostor">Prazan prostor</a>
                <a href="/#kontrast">Kontrast</a>
                <a href="/#asimetrija">Asimetrija</a>
                <a href="/#minimalizam">Minimalizam</a>
              </div>
            </div>
            <Link to="/references">Reference</Link>
          </nav>
        </div>
      </header>

      <div className="references-container">
        <div className="references-intro">
          <h1>Reference</h1>
          <p>
            Ova stranica sadrži sve izvore korišćene tokom istraživanja i razvoja projekta o švajcarskom dizajnu. 
            Uključuje YouTube videe, web sajtove, knjige i blogove koji su bili koriščeni pri izradi ovog diplomskog rada i aplikacije.
          </p>
        </div>

        <section className="references-section">
          <h2>YouTube</h2>
          <ul className="references-list">
            <li><a href="https://youtu.be/qdHipyZgOTY" target="_blank" rel="noopener noreferrer">Phoebe Yu (2.9.2024). "Swiss web design: simple, but it works. Here's why"</a></li>
            <li><a href="https://youtu.be/W1Hr7vb1aNs?si=LSB10_sWDlKKIGDD" target="_blank" rel="noopener noreferrer">Phoebe Yu (20.10.2024) "Eastern vs Western app design. Why so different?"</a></li>
            <li><a href="https://youtu.be/aImUujll89w" target="_blank" rel="noopener noreferrer">Adrian Somoza / BONT (12.3.2025) "Swiss Web Design: Less but better."</a></li>
            <li><a href="https://youtu.be/06WMy5jsjIg" target="_blank" rel="noopener noreferrer">Jason Smith / Design Smith (1.6.2024) "Swiss Design: Iconic & Influential"</a></li>
          </ul>
        </section>

        <section className="references-section">
          <h2>Web sajtovi</h2>
          <ul className="references-list">
            <li><a href="https://developer.apple.com/design/human-interface-guidelines" target="_blank" rel="noopener noreferrer">Apple Inc. (n.d.) Human Interface Guidelines. Apple Developer.</a></li>
          </ul>
        </section>

        <section className="references-section">
          <h2>Knjige</h2>
          <ul className="references-list">
            <li>"Grid Systems in Graphic Design" - Josef Müller-Brockmann</li>
            <li>"Swiss graphic design: The origins and growth of an international style" - Hollis Richard</li>
          </ul>
        </section>

        <section className="references-section">
          <h2>Blogovi</h2>
          <ul className="references-list">
            <li><a href="https://medium.com/illumination/the-cluttered-canvas-why-asian-internet-looks-different-from-the-rest-of-the-world-48f715929fe8" target="_blank" rel="noopener noreferrer">Shri (28.8.2024), "Shri (28.8.2024) The Cluttered Canvas: Why Asian internet looks different from the rest of the world." Medium</a></li>
            <li><a href="https://grapheine.com/en/magazine/graphic-designer-muller-brockmann-swiss-style/" target="_blank" rel="noopener noreferrer">Shri (28.8.2024), "Grapheine (12.3.2013), "Josef Muller-Brockman "swiss style"". Grapheine.</a></li>
          </ul>
        </section>

        <section className="references-github">
          <h2>GitHub Repozitorijum</h2>
          <p>
            Izvorni kod ovog projekta dostupan je na GitHub-u. Projekat demonstrira primenu švajcarskih 
            dizajn principa korišćenjem React-a i TypeScript-a, sa fokusom na grid sisteme, tipografiju 
            i minimalizam.
          </p>
          <a href="https://github.com/yourusername/swiss-design-project" target="_blank" rel="noopener noreferrer" className="github-link">
            Pogledajte repozitorijum na GitHub-u →
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <p>Mirko Popović</p>
          </div>
          <div className="footer-links">
            <a href="https://github.com/m3Mza" target="_blank" rel="noopener noreferrer">
              GitHub.
            </a>
            <Link to="/references">
              Reference.
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default References
