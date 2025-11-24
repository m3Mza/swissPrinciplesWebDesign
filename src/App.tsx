import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [gridPattern, setGridPattern] = useState([
    false, true, false, false,
    false, false, true, false,
    false, false, false, true,
    true, false, false, false
  ])

  const [typingText, setTypingText] = useState('')
  const [currentFontIndex, setCurrentFontIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const fonts = [
    { name: 'Helvetica', family: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
    { name: 'Times New Roman', family: "'Times New Roman', Times, serif" },
    { name: 'Comic Sans MS', family: "'Comic Sans MS', 'Comic Sans', cursive" },
    { name: 'Impact', family: "Impact, Charcoal, sans-serif" },
    { name: 'Brush Script MT', family: "'Brush Script MT', cursive" },
    { name: 'Courier New', family: "'Courier New', Courier, monospace" },
    { name: 'Papyrus', family: "Papyrus, fantasy" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newPattern = Array(16).fill(false)
      const accentPositions = new Set<number>()
      
      // Generate 2 accent positions and 2 dark positions
      while (accentPositions.size < 2) {
        accentPositions.add(Math.floor(Math.random() * 16))
      }
      
      const darkPositions = new Set<number>()
      while (darkPositions.size < 2) {
        const pos = Math.floor(Math.random() * 16)
        if (!accentPositions.has(pos)) {
          darkPositions.add(pos)
        }
      }
      
      accentPositions.forEach(pos => newPattern[pos] = true)
      darkPositions.forEach(pos => newPattern[pos] = null as any)
      
      setGridPattern(newPattern)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const targetText = 'Pozdrav!'
    const typingSpeed = isDeleting ? 50 : 100
    const pauseAfterComplete = 2000
    const pauseAfterDelete = 500

    const timeout = setTimeout(() => {
      if (!isDeleting && typingText.length < targetText.length) {
        setTypingText(targetText.slice(0, typingText.length + 1))
      } else if (!isDeleting && typingText.length === targetText.length) {
        setTimeout(() => setIsDeleting(true), pauseAfterComplete)
      } else if (isDeleting && typingText.length > 0) {
        setTypingText(typingText.slice(0, -1))
      } else if (isDeleting && typingText.length === 0) {
        setIsDeleting(false)
        setTimeout(() => {
          setCurrentFontIndex((prevIndex) => (prevIndex + 1) % fonts.length)
        }, pauseAfterDelete)
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [typingText, isDeleting, currentFontIndex, fonts.length])

  return (
    <div className="app" id="pocetna">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <a href="#pocetna">ŠVAJCARSKI STIL</a>
          </div>
          <nav className="nav">
            <a href="#pocetna">Početak</a>
            <a href="#kultura">Kultura</a>
            <a href="#internacionalni-stil">Istorijat</a>
            <div className="nav-dropdown">
              <a href="#primena" className="nav-dropdown-toggle">Primena u veb dizajnu ▾</a>
              <div className="nav-dropdown-menu">
                <a href="#grid">Grid sistem</a>
                <a href="#tipografija">Tipografija</a>
                <a href="#prazan-prostor">Prazan prostor</a>
                <a href="#kontrast">Kontrast</a>
                <a href="#asimetrija">Asimetrija</a>
                <a href="#minimalizam">Minimalizam</a>
              </div>
            </div>
            <Link to="/references">Reference</Link>
          </nav>
        </div>
      </header>

      {/* Hero Sekcija - Početna stranica */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Primena švajcarskih<br />
            dizajn principa<br />
            nad konkretnom React aplikacijom
          </h1>
          <p className="hero-subtitle">
            Mirko Popović SI 21/21
          </p>
          <div className="hero-cta">
            <a href="#kultura"><button>Započnite</button></a>
            <Link to="/references">Reference</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="swiss-grid">
            {gridPattern.map((cell, index) => (
              <div 
                key={index} 
                className={`grid-item ${cell === true ? 'accent' : cell === null ? 'dark' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Uticaj kulture sekcija */}
      <section className="culture-section" id="kultura">
        <div className="culture-container">
          <h2 className="content-text">
            1. Kako kultura i društvo<br />
            mogu uticati na<br />
            veb dizajn?
          </h2>
          <div className="culture-images">
            <div className="culture-image-wrapper culture-image-left">
              <img src="/japanUlica.jpg" alt="Tokio ulica" />
              <span className="image-label">Tokio</span>
            </div>
            <div className="culture-image-wrapper culture-image-right">
              <img src="/parizUlica.jpg" alt="Pariz ulica" />
              <span className="image-label">Pariz</span>
            </div>
            <p className="culture-description">
              Veoma dobar primer uticaja kulture na dizajn su ulice Tokija i Pariza, ulice Tokija ali i generalno ulice istočne Azije su prošarane velikim brojem reklama i natpisa, ljudi iz ovih predela su samim tim od malena navikli da bolje obrađuju veći broj informacija. Ove kulturoške razlike se odražavaju čak i na veb dizajnu.
            </p>
          </div>
        </div>

        <div className="result-container">
          <div className="result-content">
            <div className="result-image">
              <img src="/japanStranica.jpg" alt="Goo pretraživač" />
            </div>
            <p className="result-text">
              Drastična razlika se primećuje čak i kod veb pretraživača. Na slici je prikazan "Goo" - veb pretraživač koji Google plasira za japansko tržište.
              U daljim segmentima ćemo istražiti kako su kulturološki aspekti uticali na razvoj švajcarskog veb dizajna i kako se njegovi principi mogu primeniti.
            </p>
          </div>
        </div>
      </section>

      {/* Internacionalni stil sekcija */}
      <section className="internacionalni-section" id="internacionalni-stil">
        
        <div className="content content-reverse">
          <div className="content-image">
            <img src="/dasNeueHeim.jpg" alt="Das Neue Heim magazine" />
          </div>
          <div className="content-text">
            <h2>2. Društveni uticaj na razvoj Švajcarskog stila</h2>
            <blockquote className="swiss-quote">
              "Uveren sam da će kroz generaciju, dve, arhitektura i svet dizajna biti transformisan sa univerzalnošću stila, stil logične forme i čistoće stila."
            </blockquote>
            <p className="quote-attribution">
              — Henri van De Velde, 1929.
            </p>
            <p>
              "DAS NEUE HEIM", poster za konvenciju u Muzeju primenjenih umetnosti u Cirihu 1926. Dizajniran od strane Ernst Kelera, "Oca Švajcarskog grafičkog dizajna".
            </p>
          </div>
        </div>

        <div className="culture-container">
          <h2 className="content-text">
          Racionalnost nakon rata
          </h2>
          <div className="culture-images">
            <div className="culture-image-wrapper culture-image-left">
              <img src="/artNoveau.jpg" alt="Art Nouveau" />
              <span className="image-label">Art Nouveau</span>
            </div>
            <div className="culture-image-wrapper culture-image-right">
              <img src="/deStijl.jpg" alt="De Stijl" />
              <span className="image-label">De Stijl</span>
            </div>
            <p className="culture-description">
              1920-te su označile prelazak sa ornametisanog "Art Noveau" stila u jedan strukturisan, logičan i racionalan stil.
            </p>
          </div>
        </div>

        {/* Posteri */}
        <div className="poster-carousel">
        <div className="carousel-track">
          <div className="carousel-item">
            <img src="/poster1.jpg" alt="Swiss poster 1" />
          </div>
          <div className="carousel-item">
            <img src="/poster2.png" alt="Swiss poster 2" />
          </div>
          <div className="carousel-item">
            <img src="/poster3.png" alt="Swiss poster 3" />
          </div>
          <div className="carousel-item">
            <img src="/poster4.jpg" alt="Swiss poster 4" />
          </div>
          <div className="carousel-item">
            <img src="/poster5.jpg" alt="Swiss poster 5" />
          </div>
          <div className="carousel-item">
            <img src="/poster6.jpg" alt="Swiss poster 6" />
          </div>
          <div className="carousel-item">
            <img src="/poster7.jpg" alt="Swiss poster 7" />
          </div>
          <div className="carousel-item">
            <img src="/poster8.jpg" alt="Swiss poster 8" />
          </div>
          {/* Duplikat za loop */}
          <div className="carousel-item">
            <img src="/poster1.jpg" alt="Swiss poster 1" />
          </div>
          <div className="carousel-item">
            <img src="/poster2.png" alt="Swiss poster 2" />
          </div>
          <div className="carousel-item">
            <img src="/poster3.png" alt="Swiss poster 3" />
          </div>
          <div className="carousel-item">
            <img src="/poster4.jpg" alt="Swiss poster 4" />
          </div>
          <div className="carousel-item">
            <img src="/poster5.jpg" alt="Swiss poster 5" />
          </div>
          <div className="carousel-item">
            <img src="/poster6.jpg" alt="Swiss poster 6" />
          </div>
          <div className="carousel-item">
            <img src="/poster7.jpg" alt="Swiss poster 7" />
          </div>
          <div className="carousel-item">
            <img src="/poster8.jpg" alt="Swiss poster 8" />
          </div>
        </div>
        </div>

        {/* Tekst zaključka o istorijatu */}
        <div className="centered-text-section">
          <p className="centered-paragraph">
            Razvojem industrijalizovanog društva, umetnici su našli mesto u njemu prvenstveno u dizajnu novina i plakata, ornamentacije i ručno crtane slike su polako zamenili beli prostor, fotografije i jednostavan format slova.  Turbulentne promene u društvu od velike depresije 1920-ih do pojave radikalnih ideologija, polako su formirale ideju "Internacionalnog stila" 1950-ih godina prošlog veka.
          </p>
        </div>
      
      </section>

      {/* Primena Section - Features Grid */}
      <section className="features" id="primena">
        <div className="features-grid">
          <div className="features-header">
            <h2 className="features-title">3. Principi internacionalnog stila</h2>
            <p>Osnovni gradivni blokovi jasne vizuelne komunikacije</p>
          </div>
          
          <article className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Grid sistem</h3>
            <p className="feature-description">
              Sistematski raspored elemenata koji stvara vizuelnu harmoniju i strukturnu jasnoću.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">Tipografija</h3>
            <p className="feature-description">
              Sans-serif fontovi pružaju čist, čitljiv 
              prikaz bez dekorativnih ometanja.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Prazan prostor</h3>
            <p className="feature-description">
              Prostor između elemenata koji omogućava bolju čitljivost i vizuelnu hijerarhiju.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">04</div>
            <h3 className="feature-title">Kontrast</h3>
            <p className="feature-description">
              Ograničene palete boja sa jakim kontrastom crne i bele 
              obezbeđuju maksimalni vizuelni uticaj.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">05</div>
            <h3 className="feature-title">Asimetrija</h3>
            <p className="feature-description">
              Dinamična ravnoteža kroz namerne asimetrične kompozicije 
              koje vode pogled posmatrača.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">06</div>
            <h3 className="feature-title">Minimalizam</h3>
            <p className="feature-description">
              Uklanjanje nebitnih detalja radi naglašavanja suštine.
            </p>
          </article>
        </div>
      </section>

      {/* Grid sistem primer */}
      <div id="grid" className="grid-example-section">
        <div className="grid-lines-overlay"></div>
        <h2 className="grid-example-title">3.1. Grid sistem u praksi</h2>
        <div className="grid-example-layout">
          <div className="grid-example-image">
            <img src="/gridSistemi.jpg" alt="Grid sistem primer" />
          </div>
          <div className="grid-example-content">
            <p className="grid-example-author">Josef Müller-Brockmann, 1956.</p>
            <p className="grid-example-description">
              Grid sistem je osmišljen kao vid konstrukcije orijentisan na budućnost, kreirajući maltene "bezvremenski" stil.
            </p>
          </div>
        </div>
      </div>

      {/* Tipografija primer */}
      <div id="tipografija" className="content content-reverse">
        <div className="content-image" style={{ backgroundColor: 'transparent', border: 'none' }}>
          <div className="typography-showcase">
            <div className="typing-container">
              <span 
                className="typing-text" 
                style={{ fontFamily: fonts[currentFontIndex].family }}
              >
                {typingText}
              </span>
              <span className="typing-cursor">|</span>
            </div>
            <div className="font-label">{fonts[currentFontIndex].name}</div>
          </div>
        </div>
        <div className="content-text">
          <h2>3.2. Izbor adekvatne tipografije za vaš projekat</h2>
          <p className="grid-example-description">
            Sam izbor tipografije i izgleda teksta na sajtu može preneti drastično različite poruke, te je potrebno proučiti kontekst u kom će se projekat koristiti.
          </p>
          <p className="grid-example-description">
            Sans-serif fontovi eliminišu nepotrebne dekoracije, fokusirajući se isključivo na funkcionalnost. Hijerarhija se postiže kroz veličinu, debljinu i razmak između slova.
          </p>
        </div>
      </div>

      {/* Tipografija poređenje */}
      <div className="typography-comparison">
        <div className="comparison-item">
          <img src="/znak.jpg" alt="Dobar primer tipografije" />
        </div>
        <div className="comparison-item">
          <img src="/comicsans.jpg" alt="Loš primer tipografije" />
        </div>
      </div>

      {/* Prazan prostor primer */}
      <div id="prazan-prostor" className="whitespace-section">
        <h2 className="whitespace-title">3.3. Beli prostor kao dizajnerski element</h2>
        <div className="whitespace-image">
          <img src="/beliProstor.png" alt="Beli prostor primer" />
        </div>
        <p className="whitespace-text">
          Prazan prostor nije "prazan" - to je aktivni dizajnerski element koji pruža vizuelni odmor i vodi pogled kroz kompoziciju.
        </p>
      </div>

      {/* Kontrast primer */}
      <div id="kontrast" className="result-container">
        <div className="result-content">
          <div className="contrast-palette">
            <div className="palette-square brown"></div>
            <div className="palette-square white"></div>
            <div className="palette-square orange"></div>
            <div className="palette-square gray"></div>
            <div className="palette-square light-gray"></div>
          </div>
          <div className="result-text">
            <h2>3.4. Kontrast i paleta boja</h2>
            <p className="grid-example-description">
              Kontrast crne i bele boje stvara maksimalni vizuelni uticaj. Ograničena paleta fokusira pažnju na sadržaj i strukturu, eliminišući nepotrebne distrakcije.
            </p>
          </div>
        </div>
      </div>

      {/* Asimetrija primer */}
      <div id="asimetrija" className="asymmetry-section">
        <h2 className="asymmetry-title">3.5. Asimetrična kompozicija</h2>
        <div className="asymmetry-grid">
          <div className="asymmetry-item poster-1">
            <img src="/poster1.jpg" alt="Swiss poster 1" />
          </div>
          <div className="asymmetry-item text-1">
            <p>Dinamična ravnoteža kreira se "nasumičnim" ređanjem elemenata</p>
          </div>
          <div className="asymmetry-item poster-2">
            <img src="/poster2.png" alt="Swiss poster 2" />
          </div>
          <div className="asymmetry-item poster-3">
            <img src="/poster3.png" alt="Swiss poster 3" />
          </div>
          <div className="asymmetry-item text-2">
            <p>Vizuelna tenzija se izaziva različitim veličinama objekata</p>
          </div>
          <div className="asymmetry-item poster-4">
            <img src="/poster4.jpg" alt="Swiss poster 4" />
          </div>
          <div className="asymmetry-item poster-5">
            <img src="/poster5.jpg" alt="Swiss poster 5" />
          </div>
          <div className="asymmetry-item text-3">
            <p>Asimetrija više "prija" ljudskom oku, prirodnija je, i vodi pažnju posmatrača</p>
          </div>
          <div className="asymmetry-item poster-6">
            <img src="/poster6.jpg" alt="Swiss poster 6" />
          </div>
          <div className="asymmetry-item poster-7">
            <img src="/poster7.jpg" alt="Swiss poster 7" />
          </div>
          <div className="asymmetry-item poster-8">
            <img src="/poster8.jpg" alt="Swiss poster 8" />
          </div>
          <div className="asymmetry-item poster-9">
            <img src="/dasNeueHeim.jpg" alt="Das Neue Heim" />
          </div>
        </div>
      </div>

      {/* Minimalizam primer */}
      <div id="minimalizam" className="centered-text-section">
        <p className="centered-paragraph">
          3.6. Minimalizam - Jer su reči nekad suvišne.
        </p>
        <div className="minimalism-image">
          <img src="/pivo.jpg" alt="Minimalizam" />
        </div>
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

export default App
