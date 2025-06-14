import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';

let sessionTeas = null;
let sessionSeed = null;

function App() {
  // comments only temporary
  const [teas, setTeas] = useState([]);
  const images = ["tea-image1.png", "tea-image2.png", "tea-image3.png", "tea-image4.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // fetching teas from backend
  useEffect(() => {
    if(sessionTeas && sessionTeas.length > 0){
      setTeas(sessionTeas);
    }
    else{
      let seed = Date.now();
      sessionSeed = seed;
      fetchTeas(sessionSeed);
    }
  }, []);

  // creating interval for changing photo gallery in main site
  useEffect(() => {
    const interval = setInterval(() => {
      setImageOpacity(0);
      
      setTimeout(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        
        setImageOpacity(1);
      }, 350);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

   useEffect(() => {
    const savedMode = getCookie('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.body.setAttribute('data-mode', 'dark-mode');
    } else {
      setIsDarkMode(false);
      document.body.setAttribute('data-mode', 'light-mode');
    }
  }, []);

  // randomizing 3 teas to be shown at the site
  const fetchTeas = async (seed) => {
    try {
      const response = await fetch("http://localhost:5000/teas");
      const data = await response.json();
      
      let shuffledTeas = shuffle([...data.teas], seed);
      const selectedTeas = shuffledTeas.slice(0, 3);
      
      sessionTeas = selectedTeas;
      setTeas(selectedTeas);
      
    } catch (error) {
      console.error('Error fetching teas:', error);
      setTeas([]);
    }
  }

  // shuffling teas array for article descriptions
  function shuffle(array, seed){
    if (array.length <= 1) return array;
    
    let currIndex = array.length;
    seed = (seed * 9301 + 49297) % 233280;

    while(currIndex !== 0){
      let randIndex = Math.floor((seed / 233280) * currIndex);
      currIndex--;

      [array[currIndex], array[randIndex]] = [array[randIndex], array[currIndex]];
    }

    return array;
  }

  // Cookie setting functions
  const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Dark mode toggling
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.body.setAttribute('data-mode', 'dark-mode');
      setCookie('darkMode', 'true');
    } else {
      document.body.setAttribute('data-mode', 'light-mode');
      setCookie('darkMode', 'false');
    }
  };

  // inputting html tags into index.html template
  return (
    <div id="container">
      <header>
          <div><p id="title"><a href="/">China Tea Shop</a></p></div>
          <button className="sidebar-tag"><img src="/icons/lupe.png" alt="Lupe Icon" className="sidebar-icon"></img></button>
          <button className="sidebar-tag"><a href="/login.html"><img src="/icons/user.png" alt="User Icon" className="sidebar-icon"></img></a></button>
          <button className="sidebar-tag"><a href="/yourshopcart.html"><img src="/icons/shop-cart.png" alt="Shop Cart Icon" className="sidebar-icon"></img></a></button>
          <button className="sidebar-tag" onClick={toggleDarkMode}><img src={isDarkMode ? "/icons/moon.png" : "/icons/sunny.png"} alt="Mode Icon" className="sidebar-icon" id="darkModeButton"></img></button>
      </header>
      <div id="background">
        <div className="deco-block"></div>
        <div>
          <nav>
          <div className="nav-tab"><a href="/"><p className="menu-label">Home</p></a></div>
          <div className="nav-tab"><a href="/shop.html"><p className="menu-label">Shop</p></a></div>
          <div className="nav-tab"><a href="/learn.html"><p className="menu-label">Learn</p></a></div>
          <div className="nav-tab"><a href="/about.html"><p className="menu-label">About</p></a></div>
          </nav>
          <div id="sections-area">
            <section id="start-view">
                <div id="intro-content">
                  <p id="intro">
                  The China<br></br> Tea Shop
                  </p>
                  <ul>
                    <li>Located in Gliwice's Downtown since 2004</li>
                    <li>Highest quality teas imported from China</li>
                    <li>Variety of tastes and aromas</li>
                  </ul>
                </div>
                <div id="teapot-cont">
                  <img src="/images/chinese-teapot.png" alt="teapot" id="teapot-img"></img>
                </div>
            </section>
            <section>
              <article id="teas-recommend">
                <div id="teas-gallery">
                  <img src={`/images/${images[currentImageIndex]}`} alt="tea" id="tea-image-change" style={{opacity: imageOpacity}}></img>
                </div>
                <div id="recommended-teas">
                  <h1>Our popular products avaiable NOW:</h1>
                  <div className="tea-product">
                    {
                      teas.length > 0 ? (
                        teas.map((tea) => (
                          <div key={tea.id} className="tea-item">
                            <h3>{tea.name}</h3>
                            <p>{tea.description}</p>
                          </div>
                        )
                      )) : 
                      (
                        <p>Currently no teas avaiable. Check out our offer later!</p>
                      )
                    }
                  </div>
                </div>
              </article>
            </section>
            <section id="newsletter-section">
              <div id="newsletter-content">
                <h2>Stay Connected with Tea Wisdom</h2>
                <p>Join our tea community and receive exclusive brewing tips, new product announcements, and special offers directly to your inbox.</p>
                <form id="newsletter-form">
                  <div id="form-group">
                    <input type="email" id="email-input" placeholder="Enter your email address" required
                    />
                    <button type="submit" id="subscribe-btn">
                      <span>Subscribe</span>
                    </button>
                  </div>
                </form>
                <div id="form-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">🍃</span>
                    <span>Weekly tea brewing tips</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🎁</span>
                    <span>Exclusive member discounts</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">📦</span>
                    <span>First access to new teas</span>
                  </div>
                </div>
                <p id="privacy-text">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </section>
          </div>
        </div>
        <div className="deco-block"></div>
      </div>
      <footer>
        <p id="footer">© 2025 China Tea Shop - Traditional Teas, Modern Experience</p>
      </footer>
    </div>
  );
}

export default App;