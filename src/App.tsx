import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


{/* Kontrast deo */}

function ContrastDemo() {
  // TWEAKABLE: Background slide position (0 = fully right/hidden, 1 = fully covering)
  const [backgroundSlide, setBackgroundSlide] = useState(0)
  
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // TWEAKABLE: Calculate slide based on scroll position through section
      // Effect starts when section enters viewport and continues as you scroll through it
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate progress: 0 when section just entering, 1 when fully scrolled through
        const sectionHeight = rect.height
        const visibleTop = Math.max(0, windowHeight - rect.top)
        const progress = Math.min(1, Math.max(0, visibleTop / (sectionHeight * 0.8)))
        
        setBackgroundSlide(progress)
      } else if (rect.bottom < 0) {
        // Section has scrolled past - keep at full
        setBackgroundSlide(1)
      } else {
        // Section hasn't reached yet - keep at 0
        setBackgroundSlide(0)
      }
    }

    // Initial check
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      id="kontrast" 
      className="contrast-demo-section"
      ref={sectionRef}
    >
      {/* TWEAKABLE: Black background slides from right based on scroll */}
      <div 
        className="contrast-sliding-background"
        style={{ 
          transform: `translateX(${100 - (backgroundSlide * 100)}%)`,
        }}
      />
      <div className="contrast-content">
        <h2 className="contrast-demo-title">3.4. Kontrast i paleta boja</h2>
        <p className="contrast-text">
          Kontrast crne i bele boje stvara maksimalni vizuelni uticaj. 
          Švajcarski dizajn koristi ograničene palete boja sa jakim kontrastom 
          kako bi obezbedio jasnu vizuelnu komunikaciju. Ovaj princip omogućava 
          da se ključne informacije istaknu bez nepotrebnih distrakcija. 
          Visok kontrast između teksta i pozadine direktno utiče na čitljivost 
          i pristupačnost, čineći sadržaj razumljivim za širi spektar korisnika.
        </p>
      </div>
    </div>
  )
}

{/* Cultural comparison slider */}

function CultureComparison() {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="culture-comparison-section">
      <div className="culture-comparison-container">
        <div className="culture-comparison-display">
          <div 
            className="comparison-side"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img src="/japanStranica.jpg" alt="Japanski veb dizajn" />
          </div>
          <div 
            className="comparison-side"
            style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
          >
            <img src="/google.png" alt="Google stranica" />
          </div>
          <div 
            className="comparison-slider-line"
            style={{ left: `${sliderPosition}%` }}
          />
        </div>
        <div className="comparison-slider-container">
          <span className="slider-label">Srbija</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="comparison-slider"
          />
          <span className="slider-label">Japan</span>
        </div>
      </div>
      <p className="comparison-description">
        Drastična razlika u dizajnu veb stranica između istočne i zapadne kulture.
      </p>
    </div>
  )
}

{/* Asimetrija deo hover animacije */}

function AsymmetrySection() {
  return (
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
  )
}

{/* Grid animacija - Random kockice pocetna */}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
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

{/* Efekat kuckanja za deo Tipografije */}

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





{/* HTML */}

  return (
    <div className="app" id="pocetna">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? 'MENI' : 'MENI'}
          </button>
        </div>
      </header>

      {/* Spotlight Menu Overlay */}
      <div className={`spotlight-menu ${menuOpen ? 'active' : ''}`}>
        <div className="spotlight-background"></div>
        <nav className="spotlight-nav">
          <a href="#pocetna" onClick={() => setMenuOpen(false)}>Početak</a>
          <a href="#kultura" onClick={() => setMenuOpen(false)}>Kultura</a>
          <a href="#internacionalni-stil" onClick={() => setMenuOpen(false)}>Istorijat</a>
          <a href="#primena" onClick={() => setMenuOpen(false)}>Principi</a>
          <Link to="/references" onClick={() => setMenuOpen(false)}>Reference</Link>
        </nav>
      </div>

      {/* Hero Sekcija - Početna stranica */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Primena švajcarskih
            <br />
            dizajn principa
            <br />
            nad konkretnom React aplikacijom
          </h1>
          <p className="hero-subtitle">Mirko Popović SI 21/21</p>
          <div className="hero-cta">
          </div>
        </div>
        <div className="hero-visual">
          <div className="swiss-grid">
            {gridPattern.map((cell, index) => (
              <div
                key={index}
                className={`grid-item ${
                  cell === true ? "accent" : cell === null ? "dark" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Uticaj kulture sekcija */}
      <section className="culture-section" id="kultura">
        <div className="culture-question-container">
          <h2 className="culture-question">
            1. Kako kultura i društvo mogu da utiču na veb dizajn?
          </h2>
        </div>

        <div className="culture-kabukicho-section">
          <div className="culture-kabukicho-container">
            <div className="culture-kabukicho-image">
              <img src="/japanUlica.jpg" alt="Kabukicho Tokyo" />
            </div>
            <div className="culture-kabukicho-text">
              <p>
                Kabukičo distrikt, Tokio, Japan. Ulice istočne Azije su prošarane velikim brojem reklama i natpisa, 
                ljudi iz ovih predela su samim tim od malena navikli da bolje obrađuju veći broj informacija.
              </p>
            </div>
          </div>
        </div>

        <CultureComparison />
      </section>

      {/* Internacionalni stil sekcija */}
      <section className="internacionalni-section" id="internacionalni-stil">
        <div className="content content-reverse">
          <div className="content-image">
            <img src="/dasNeueHeim.jpg" alt="Das Neue Heim magazine" />
          </div>
          <div className="content-text">
            <h2>2. Formiranje ideje švajcarskog stila</h2>
            <blockquote className="swiss-quote">
              "Izaći iz voza u Cirihu 1958. izgledalo je kao ulazak u izložbu avant-gardnog dizajna."
            </blockquote>
            <p className="quote-attribution">— Ričard Holis, ""Swiss graphic design: The origins and growth of an international style", str. 7, 2006.</p>
            <p>
              "DAS NEUE HEIM", poster za konvenciju u Muzeju primenjenih
              umetnosti u Cirihu 1926. Dizajniran od strane Ernst Kelera, "Oca
              Švajcarskog grafičkog dizajna".
            </p>
          </div>
        </div>

        <div className="timeline-section">
          <div className="timeline-decoration-image timeline-img-1 flip-on-hover">
            <img src="/artNoveau.jpg" alt="Art Nouveau" className="flip-front" />
            <img src="/bauhaus.jpg" alt="Bauhaus" className="flip-back" />
          </div>
          <div className="timeline-decoration-image timeline-img-2">
            <img src="/novaTipografija.jpg" alt="Nova Tipografija" />
          </div>
          <div className="timeline-decoration-image timeline-img-3">
            <img src="/maxBill.jpg" alt="Max Bill" />
          </div>
          <div className="timeline-decoration-image timeline-img-4">
            <img src="/helvetica.jpg" alt="Helvetika" />
          </div>
          <div className="timeline-decoration-image timeline-img-5">
            <img src="/brokman.jpg" alt="Josef Müller-Brockmann" />
          </div>

          <div className="timeline-container">
            <section className="timeline-item">
              <div className="timeline-year">1919</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Logika i racionalnost nakon rata</h3>
                  <p>Umetnici u potrazi za logikom i racionalnošću nakon Prvog svetskog rata prelaze na geometrijske stilove kao De Stijl ili Bauhaus.</p>
                </main>
              </article>
            </section>

            <section className="timeline-item">
              <div className="timeline-year">1928</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Nova tipografija</h3>
                  <p>Jan Čihold objavljuje "Die Neue Typographie", manifest moderne tipografije koji naglašava jasnoću i funkcionalnost.</p>
                </main>
              </article>
            </section>

            <section className="timeline-item">
              <div className="timeline-year">1933</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Zatvaranje Bauhausa</h3>
                  <p>Nacisti zatvaraju Bauhaus, ali njegovi principi se šire svetom kroz emigraciju nastavnika i studenata.</p>
                </main>
              </article>
            </section>

            <section className="timeline-item">
              <div className="timeline-year">1950-1960</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Formiranje Internacionalnog stila</h3>
                  <p>U Švajcarskoj, dizajneri poput Maks Bila i Jozef Miler-Brokmana formiraju ideju poslovnog i korporativnog stila orijentisanog na funkcionalnost.</p>
                </main>
              </article>
            </section>

            <section className="timeline-item">
              <div className="timeline-year">1957</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Helvetica</h3>
                  <p>Maks Midinger dizajnira "Helvetica", font koji postaje sinonim za švajcarski dizajn i jedan od najkorišćenijih fontova u istoriji.</p>
                </main>
              </article>
            </section>

            <section className="timeline-item">
              <div className="timeline-year">1981</div>
              <article className="timeline-event">
                <aside className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </aside>
                <main className="timeline-content">
                  <h3>Grid sistemi</h3>
                  <p>Jozef Miler-Brokman objavljuje "Grid Systems in Graphic Design", definišući matematički pristup layout dizajnu.</p>
                </main>
              </article>
            </section>
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

      </section>

      {/* Primena Section - Features Grid */}
      <section className="features" id="primena">
        <div className="features-grid">
          <div className="features-header">
            <h2 className="features-title">
              3. Principi internacionalnog stila
            </h2>
          </div>

          <article className="feature-card">
            <div className="feature-number">01</div>
            <h3 className="feature-title">Grid sistem</h3>
            <p className="feature-description">
              Sistematski raspored elemenata koji stvara vizuelnu harmoniju i
              strukturnu jasnoću.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">02</div>
            <h3 className="feature-title">Tipografija</h3>
            <p className="feature-description">
              Sans-serif fontovi pružaju čist, čitljiv prikaz bez dekorativnih
              ometanja.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">03</div>
            <h3 className="feature-title">Prazan prostor</h3>
            <p className="feature-description">
              Prostor između elemenata koji omogućava bolju čitljivost i
              vizuelnu hijerarhiju.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">04</div>
            <h3 className="feature-title">Kontrast</h3>
            <p className="feature-description">
              Ograničene palete boja sa jakim kontrastom crne i bele obezbeđuju
              maksimalni vizuelni uticaj.
            </p>
          </article>

          <article className="feature-card">
            <div className="feature-number">05</div>
            <h3 className="feature-title">Asimetrija</h3>
            <p className="feature-description">
              Dinamična ravnoteža kroz namerne asimetrične kompozicije koje vode
              pogled posmatrača.
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
        <div className="content content-reverse">
          <div className="content-image">
            <img src="/gridSistemi.jpg" alt="Grid i raster sistemi" />
          </div>
          <div className="content-text">
            <h2>3.1. Grid sistemi</h2>
            <blockquote className="swiss-quote">
              "Upotreba grid sistema prikazuje da dizajner posmatra svoj rad kao konstruktivan i orijentisan na budućnost." "
            </blockquote>
            <p className="quote-attribution">— Jozef Miler Brokman "Grid sistemi u grafičkom dizajnu" str. 10, 1996.</p>
            <p>
              Brokmanova knjiga je formatirala ideju upotrebe grid sistema za strukturalnu jasnoću i konzistenciju pri izradi dizajna.
            </p>
          </div>
        </div>

        {/* Grid carousel (Posteri kopija) */}
        <div className="poster-carousel">
          <div className="carousel-track">
            <div className="carousel-item">
              <img src="/mueller1.jpg" alt="Swiss poster 1" />
            </div>
            <div className="carousel-item">
              <img src="/mueller2.png" alt="Swiss poster 2" />
            </div>
            <div className="carousel-item">
              <img src="/mueller3.png" alt="Swiss poster 3" />
            </div>
            <div className="carousel-item">
              <img src="/mueller4.png" alt="Swiss poster 4" />
            </div>
            <div className="carousel-item">
              <img src="/mueller5.png" alt="Swiss poster 5" />
            </div>
            <div className="carousel-item">
              <img src="/mueller6.png" alt="Swiss poster 6" />
            </div>
            <div className="carousel-item">
              <img src="/mueller7.png" alt="Swiss poster 7" />
            </div>
            <div className="carousel-item">
              <img src="/mueller8.png" alt="Swiss poster 8" />
            </div>
            {/* Duplikat za loop */}
            <div className="carousel-item">
              <img src="/mueller1.png" alt="Swiss poster 1" />
            </div>
            <div className="carousel-item">
              <img src="/mueller2.png" alt="Swiss poster 2" />
            </div>
            <div className="carousel-item">
              <img src="/mueller3.png" alt="Swiss poster 3" />
            </div>
            <div className="carousel-item">
              <img src="/mueller4.png" alt="Swiss poster 4" />
            </div>
            <div className="carousel-item">
              <img src="/mueller5.png" alt="Swiss poster 5" />
            </div>
            <div className="carousel-item">
              <img src="/mueller6.png" alt="Swiss poster 6" />
            </div>
            <div className="carousel-item">
              <img src="/mueller7.png" alt="Swiss poster 7" />
            </div>
            <div className="carousel-item">
              <img src="/mueller8.png" alt="Swiss poster 8" />
            </div>
          </div>
        </div>

        <div className="centered-text-section">
          <p className="centered-paragraph">
            Grid sistemi se lako mogu implementirati putem CSS Grid i Flexbox tehnologija. Korišćenjem grid sistema dizajn postaje organizovaniji i koherentniji.
          </p>
        </div>

        {/* Inspect element */}
        <div className="whitespace-section-inline">
          <div className="whitespace-image" style={{ border: "2px solid #402e32" }}>
            <img src="/inspectElement.png" alt="Inspect Element" />
          </div>
          <p className="whitespace-text">
            Na slici se može videti kako uz pomoć Inspect elementa ugrađenog u pretraživač možemo vizualizovati grid linije.
          </p>
        </div>
      </div>
      
  
      {/* Tipografija primer */}
      <div className="content content-reverse">
        <div
          className="content-image"
          style={{ backgroundColor: "transparent", border: "none" }}
        >
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
            Sam izbor tipografije i izgleda teksta na sajtu može preneti
            drastično različite poruke, te je potrebno proučiti kontekst u kom
            će se projekat koristiti. Sans-serif fontovi eliminišu nepotrebne dekoracije, fokusirajući se
            isključivo na funkcionalnost. Hijerarhija se postiže kroz veličinu,
            debljinu i razmak između slova.
          </p>
        </div>
      </div>

      {/* Tipografija poređenje */}
      <div className="typography-examples">
        <div className="typography-example-row gallery">
          <div className="typography-gallery">
            <div className="gallery-image gallery-image-1">
              <img src="/znak.jpg" alt="Ulični znak Helvetica" />
            </div>
            <div className="gallery-image gallery-image-2">
              <img src="/office.jpg" alt="Office sa Helvetica" />
            </div>
            <div className="gallery-image gallery-image-3">
              <img src="/ulicniZnak.jpg" alt="Ulični znak" />
            </div>
          </div>
          <div className="typography-example-text">
            <h3>Monopol sans-serif fontova u korporativnom okruženju</h3>
            <p>
              Od njenog nastanka 1957. Helvetica (Originalno ime Neue Haas
              Grotesk) je postala sinonim za švajcarski dizajn. Njena
              neutralnost, čitljivost i geometrijska preciznost čine je idealnom
              za jasnu komunikaciju bez stilskih distrakcija.
            </p>
          </div>
        </div>
      </div>

      {/* Prazan prostor primer */}
      <div  className="whitespace-section">
        <h2 className="whitespace-title">
          3.3. Beli prostor kao dizajnerski element
        </h2>
        <div className="whitespace-image">
          <a href="https://www.apple.com/iphone-17-pro/" target="_blank" rel="noopener noreferrer"><img src="/beliProstor.png" alt="Beli prostor primer" /></a>
        </div>
        <p className="whitespace-text">
          Prazan prostor nije "prazan" - to je aktivni dizajnerski element koji
          pruža vizuelni odmor i vodi pogled kroz kompoziciju.
        </p>
      </div>

      {/* Kontrast primer */}
      <ContrastDemo />

      {/* Asimetrija primer */}
      <AsymmetrySection />

      {/* Minimalizam primer */}
      <section id="minimalizam">
        <a href="https://github.com/m3Mza/swissPrinciplesWebDesign" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', outline: 'none' }}>
          {'GIT.'.split('').map((letter, index) => (
            <span
              key={index}
              className="letter"
            >
              {letter}
            </span>
          ))}
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/references">
              Reference.
            </Link>
          </div>
        </div>
      </footer>
      
    </div>
  );
}

export default App
