import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "../assets/styles/Footer.css";

const Footer: React.FC = () => {
  const [isFooterVisible] = useState<boolean>(true);

  // // Alternar la visibilidad del footer
  // const toggleFooter = (): void => {
  //   setIsFooterVisible((prev) => !prev);
  // };

  return (
    <div>
      {/* Botón para alternar el footer
      <button className="footer-toggle" onClick={toggleFooter}>
        {isFooterVisible ? "Menos"  : "Ver más" }
      </button> */}

      {/* Contenedor principal del footer */}
      <footer className={`footer ${isFooterVisible ? "show" : ""}`}>
        <div className="footer__top">
          <p>Conéctate con nosotros en redes sociales:</p>
          <ul className="social-icon">
            <li className="social-icon__item">
              <Link to="https://facebook.com" className="social-icon__link">
              <FaFacebookF />
              </Link>
            </li>
            <li className="social-icon__item">
              <Link to="https://twitter.com" className="social-icon__link">
              <FaTwitter />
              </Link>
            </li>
            <li className="social-icon__item">
              <Link to="https://linkedin.com" className="social-icon__link">
              <FaLinkedinIn />
              </Link>
            </li>
            <li className="social-icon__item">
              <Link to="https://instagram.com" className="social-icon__link">
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__content">
          <div className="footer__section">
            <h3>BigCart</h3>
            <p>Explora nuestras secciones y conoce más sobre nosotros y nuestros productos.</p>
          </div>
          <div className="footer__section">
            <h4>Categorías</h4>
            <ul>
              <li><Link to="/productos?name=Electrónica">Electrónica</Link></li>
              <li><Link to="/productos?name=Hogar">Hogar</Link></li>
              <li><Link to="/productos?name=Libros">Libros</Link></li>
              <li><Link to="/productos?name=Mascotas">Mascotas</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4>Enlaces Útiles</h4>
            <ul>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/contactus">Contáctanos</Link></li>
              <li><Link to="/productos">Comprar ahora</Link></li>
              <li><Link to="/about-us">Nosotros</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Contacto</h4>
            <p>Calle 60 No. 488, Centro, 97000 Mérida, Yucatán, MX</p>
            <p>bigcart213@bigcart.com.mx</p>
            <p>+52 8009 054294</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy;2024 BigCart | Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;