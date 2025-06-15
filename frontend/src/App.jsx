import { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom'
// importing css files for styling
import './css/Layout.css';
import './css/HomePage.css';
import './css/ShopPage.css';
import './css/LearnPage.css';
import './css/AboutPage.css';
import './css/CartPage.css';
import './css/LoginPage.css';

// global variables for new session teas to make randomizer working properly
let sessionTeas = null;
let sessionSeed = null;

function App() {
  return (
    <BrowserRouter>
      <AppContent/>
    </BrowserRouter>
  );
}

function AppContent() {
  // main layout component responsible for baseplate for websites
  const Layout = ({ children, pageTitle = "China Tea Shop" }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // toggling dynamically darkMode
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

    // what does it return
    return (
      <div id="container" className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div id="background">
          <div className="deco-block"></div>
          <div>
            <Navigation />
            <div id="sections-area">
              {children}
            </div>
          </div>
          <div className="deco-block"></div>
        </div>
        <Footer/>
      </div>
    );
  };

  // Header Component
  const Header = ({ isDarkMode, toggleDarkMode }) => {
    return (
      <header>
        <div><p id="title"><Link to="/">China Tea Shop</Link></p></div>
        <button className="sidebar-tag">
          <img src="/icons/lupe.png" alt="Lupe Icon" className="sidebar-icon" />
        </button>
        <button className="sidebar-tag">
          <Link to="/login">
            <img src="/icons/user.png" alt="User Icon" className="sidebar-icon" />
          </Link>
        </button>
        <button className="sidebar-tag">
          <Link to="/cart">
            <img src="/icons/shop-cart.png" alt="Shop Cart Icon" className="sidebar-icon" />
          </Link>
        </button>
        <button className="sidebar-tag" onClick={toggleDarkMode}>
          <img 
            src={isDarkMode ? "/icons/moon.png" : "/icons/sunny.png"} 
            alt="Mode Icon" 
            className="sidebar-icon" 
            id="darkModeButton" 
          />
        </button>
      </header>
    );
  };

  // Navigation Component
  const Navigation = () => {
    const location = useLocation();

    return (
      <nav>
        <Link to="/" className="nav-ref">
          <div className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}>
            <p className="menu-label">Home</p>
          </div>
        </Link>
        <Link to="/shop" className="nav-ref">
          <div className={`nav-tab ${location.pathname === '/shop' ? 'active' : ''}`}>
            <p className="menu-label">Shop</p>
          </div>
        </Link>
        <Link to="/learn" className="nav-ref">
          <div className={`nav-tab ${location.pathname === '/learn' ? 'active' : ''}`}>
            <p className="menu-label">Learn</p>
          </div>
        </Link>
        <Link to="/about" className="nav-ref">
          <div className={`nav-tab ${location.pathname === '/about' ? 'active' : ''}`}>
            <p className="menu-label">About</p>
          </div>
        </Link>
      </nav>
    );
  };

  // Footer Component
  const Footer = () => {
    return (
      <footer>
        <p id="footer">© 2025 China Tea Shop - Traditional Teas, Modern Experience</p>
      </footer>
    );
  };

  // Newsletter Component (main page exclusive)
  const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setMessage('');

      try {
        const response = await fetch('/subscribe_newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Successfully subscribed to newsletter!');
          setMessageType('success');
          setEmail('');
        } else {
          setMessage(data.message || 'An error occurred');
          setMessageType('error');
        }
      } catch (error) {
        setMessage('Network error. Please try again.');
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <section id="newsletter-section">
        <div id="newsletter-content">
          <h2 id="newsletter-title">Stay Connected with Tea Wisdom</h2>
          <p>Join our tea community and receive exclusive brewing tips, new product announcements, and special offers directly to your inbox.</p>
          
          <form id="newsletter-form" onSubmit={handleSubmit}>
            <div id="form-group">
              <input 
                type="email" 
                id="email-input" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button type="submit" id="subscribe-btn" disabled={isLoading}>
                <span>{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
              </button>
            </div>
          </form>

          {message && (
            <div className={`message ${messageType}`} style={{
              padding: '10px',
              margin: '10px 0',
              borderRadius: '4px',
              backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
              color: messageType === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

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
    );
  };

  // Main page (localhost:3000)
  const HomePage = () => {
    const [teas, setTeas] = useState([]);
    const images = ["tea-image1.png", "tea-image2.png", "tea-image3.png", "tea-image4.png"];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageOpacity, setImageOpacity] = useState(1);

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

    return (
      <Layout pageTitle="Home - China Tea Shop">
        <section id="start-view">
          <div id="intro-content">
            <p id="intro">
              The China<br /> Tea Shop
            </p>
            <ul>
              <li>Located in Gliwice's Downtown since 2004</li>
              <li>Highest quality teas imported from China</li>
              <li>Variety of tastes and aromas</li>
            </ul>
          </div>
          <div id="teapot-cont">
            <img src="/images/chinese-teapot.png" alt="teapot" id="teapot-img" />
          </div>
        </section>
        <section>
          <article id="teas-recommend">
            <div id="teas-gallery">
              <img 
                src={`/images/${images[currentImageIndex]}`} 
                alt="tea" 
                id="tea-image-change" 
                style={{opacity: imageOpacity}} 
              />
            </div>
            <div id="recommended-teas">
              <h1>Our popular products available NOW:</h1>
              <div className="tea-product">
                {teas.length > 0 ? (
                  teas.map((tea) => (
                    <div key={tea.id} className="tea-item">
                      <h3>{tea.name}</h3>
                      <p>{tea.description}</p>
                    </div>
                  ))
                ) : (
                  <p>Currently no teas available. Check out our offer later!</p>
                )}
              </div>
            </div>
          </article>
        </section>
        <NewsletterSection />
      </Layout>
    );
  };

  // Shop Page content
  const ShopPage = () => {
    const [teas, setTeas] = useState([]);

    // fetching teas from backend
    useEffect(() => {
      fetchTeas();
    }, []);

    const fetchTeas = async () => {
      try {
        const response = await fetch("http://localhost:5000/teas");
        const data = await response.json();
        setTeas(data.teas);
        
      } catch (error) {
        console.error('Error fetching teas:', error);
        setTeas([]);
      }
    }

    return (
      <Layout pageTitle="Shop - China Tea Shop">
        <section id="shop-content">
          <div id="avaiable-products">
            <div id="title-block">
          <h1>Our Tea Collection</h1>
            </div>
            <h2>🍃 Premium Tea Collection 🍃</h2>
            <p>Discover our handpicked selection of authentic Chinese teas, sourced directly from traditional tea gardens.</p>
            <div id="tea-products-shop">
              {teas.length > 0 ? (
                teas.map((tea) => (
                  <div key={tea.id} className="tea-item-shop">
                    <h3>{tea.name}</h3>
                    <p>{tea.description}</p>
                    <p>Price: {tea.price} PLN</p>
                  </div>
                ))
              ) : (
                <p>Currently no teas available. Check out our offer later!</p>
              )}
            </div>
          </div>
        </section>
      </Layout>
    );
  };

  // Learn Page content
  const LearnPage = () => {
    return (
      <Layout pageTitle="Learn - China Tea Shop">
        <section id="learn-content">
          <h1>Tea Knowledge Center</h1>
          <p>Learn about tea brewing, history, and culture.</p>
          <div className="learn-education">
            <h2>📚 Tea Education 📚</h2>
            <div className="learn-grid">
              <div className="learn-card">
                <h3>☕ Brewing Techniques</h3>
                <p>Master the art of tea preparation with our step-by-step guides for different tea types.</p>
                <ul>
                  <li>Water temperature guidelines</li>
                  <li>Steeping times for optimal flavor</li>
                  <li>Traditional brewing methods</li>
                </ul>
              </div>
              <div className="learn-card">
                <h3>🏛️ Tea History</h3>
                <p>Discover the rich history and cultural significance of Chinese tea traditions.</p>
                <ul>
                  <li>Origins of tea cultivation</li>
                  <li>Tea ceremony traditions</li>
                  <li>Regional tea cultures</li>
                </ul>
              </div>
              <div className="learn-card">
                <h3>🌿 Health Benefits</h3>
                <p>Learn about the health benefits and wellness properties of different teas.</p>
                <ul>
                  <li>Antioxidant properties</li>
                  <li>Digestive benefits</li>
                  <li>Mental wellness effects</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  };

  // About Page content
  const AboutPage = () => {
    return (
      <Layout pageTitle="About - China Tea Shop">
        <section id="about-content">
          <h1>About China Tea Shop</h1>
          <p>Learn about our story and commitment to quality tea.</p>
          <div className="about-container">
            <h2>🏪 Our Story</h2>
            <p>
              Founded in 2004 in the heart of Gliwice's downtown, China Tea Shop has been a beacon for tea enthusiasts 
              seeking authentic Chinese tea experiences. Our journey began with a simple mission: to bring the finest 
              traditional Chinese teas directly from their source to tea lovers in Poland.
            </p>
            <h3>🎯 Our Mission</h3>
            <p>
              We are dedicated to preserving the ancient art of tea cultivation and preparation while making these 
              treasured beverages accessible to modern tea enthusiasts. Every tea in our collection is carefully 
              selected from trusted tea gardens across China.
            </p>
            <h3>🌟 What Sets Us Apart</h3>
            <ul>
              <li><strong>Direct Sourcing:</strong> We work directly with tea farmers and gardens</li>
              <li><strong>Quality Assurance:</strong> Every batch is tested for quality and authenticity</li>
              <li><strong>Expert Knowledge:</strong> Our team consists of certified tea specialists</li>
              <li><strong>Community Focus:</strong> We host regular tea tastings and educational events</li>
            </ul>
            <div className="store-info">
              <h3>📍 Visit Our Store</h3>
              <p><strong>Address:</strong> Downtown Gliwice, Poland</p>
              <p><strong>Since:</strong> 2004</p>
              <p><strong>Specialty:</strong> Authentic Chinese Teas</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  };

  // Cart Page content
  const CartPage = () => {
    return (
      <Layout pageTitle="Shopping Cart - China Tea Shop">
        <section id="cart-content">
          <h1>Your Shopping Cart</h1>
          <p>Your cart is currently empty.</p>
          <div className="cart-empty">
            <p>Start shopping to add items to your cart!</p>
            <Link to="/shop" className="cart-link">
              Browse Our Teas
            </Link>
          </div>
        </section>
      </Layout>
    );
  };

  // Login Page content
  const LoginPage = () => {
    return (
      <Layout pageTitle="Login - China Tea Shop">
        <section id="login-content">
          <h1>Login to Your Account</h1>
          <div className="login-container">
            <form className="login-form">
              <input 
                type="email" 
                placeholder="Email address" 
              />
              <input 
                type="password" 
                placeholder="Password" 
              />
              <button type="submit">
                Login
              </button>
            </form>
            <p className="login-signup">
              Don't have an account? <a href="#">Sign up here</a>
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  // returning routes to subpages
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;