// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';

function App() {
  // comments only temporary
  // const [teas, setTeas] = useState([]);
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   fetchTeas()
  //   axios.get('http://localhost:5000/')
  //         .then(response => setMessage(response.data))
  //         .catch(error => console.error(error));
  // }, []);

  // const fetchTeas = async () => {
  //   const response = await fetch("http://localhost:5000/teas")
  //   const data = await response.json()
  //   setTeas(data.teas)
  // }

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
        <div class="deco-block"></div>
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
              <article>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta in quam non lacinia. Donec dolor dolor, fringilla id enim vitae, sagittis cursus velit. Nullam iaculis viverra orci, non dapibus risus bibendum vitae. In et libero in nibh consectetur eleifend eget nec eros. Pellentesque faucibus leo leo, quis cursus purus mollis nec. Cras dapibus porttitor accumsan. Maecenas ultrices, massa vel scelerisque maximus, nisl ex volutpat odio, at mattis neque purus vitae dolor. Proin felis eros, pulvinar quis leo quis, commodo tempor erat. Integer aliquet, diam in mollis posuere, dolor lorem suscipit metus, et accumsan ex lorem id dolor. Nullam porttitor erat nec consequat facilisis. Aliquam iaculis mattis efficitur. Curabitur ut porta augue. Proin leo diam, ultricies in mattis vel, mattis ut arcu.<br></br>

Mauris finibus metus vel commodo sagittis. Donec facilisis ac mi pharetra dignissim. Nam pretium, libero sed malesuada blandit, massa nibh aliquam massa, et pellentesque tortor nisl sed nibh. Phasellus eros risus, congue nec orci id, cursus elementum quam. Nulla in nisl a erat placerat consequat ut quis quam. Pellentesque magna lorem, tincidunt non sollicitudin eu, aliquet non est. Phasellus volutpat libero lorem, non elementum lorem cursus id. Morbi aliquet aliquet pretium. Vivamus at egestas odio, at accumsan nibh. Maecenas quis arcu eu nibh lobortis bibendum. Vivamus luctus ullamcorper elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam nec risus ante.<br></br>

Phasellus ultrices justo ac quam dapibus sollicitudin. Nulla dictum nisl lacus, eget imperdiet quam placerat scelerisque. Vivamus magna massa, mollis non enim a, porttitor elementum nisl. Donec et nibh quam. Nullam porttitor faucibus tellus, a sollicitudin erat aliquam ac. Nam urna felis, lacinia sed nisi sed, condimentum interdum ex. Nulla suscipit suscipit tristique. Cras nulla elit, tincidunt ut sodales a, rhoncus a arcu. Vivamus augue mauris, efficitur quis lacus in, tristique mollis purus. Praesent quis pellentesque neque. Sed vel posuere ante. Nullam fermentum aliquet magna, quis lobortis ex consequat ut. Mauris eu aliquet leo. Integer dignissim quam urna, non malesuada risus sagittis non. Fusce id suscipit quam.<br></br>

Vestibulum accumsan urna libero, ac viverra sem placerat eu. Donec rhoncus ligula nec velit ultricies efficitur. Integer malesuada feugiat vehicula. Sed nec odio eros. Integer luctus, magna at blandit feugiat, sapien urna volutpat leo, et consectetur nisl nulla in justo. Phasellus nisl lectus, dapibus eget velit vel, vestibulum volutpat turpis. Ut pulvinar elit mauris, a venenatis nisl hendrerit quis. Praesent sed scelerisque sem. Sed aliquam eleifend mi, in fermentum ex rutrum a.<br></br>

Praesent sit amet nunc id lorem pellentesque tempor eget quis urna. Sed hendrerit justo non risus consectetur lacinia. Phasellus dignissim massa a volutpat elementum. Integer sed eleifend ante. Quisque ut augue ut risus tempor volutpat. Quisque vitae sodales ligula, in pellentesque velit. Curabitur id pretium risus. Praesent sodales pulvinar lacus ut eleifend. Vestibulum auctor sapien vitae magna pharetra, non porta justo eleifend. Praesent fermentum, urna eu sagittis sagittis, urna dui interdum erat, id ultrices lacus ex in mauris.<br></br>
              </article>
            </section>
          </div>
        </div>
        <div class="deco-block"></div>
      </div>
      <footer>
        <p id="footer">© 2025 China Tea Shop - Traditional Teas, Modern Experience</p>
      </footer>
    </div>
  );
}

export default App;