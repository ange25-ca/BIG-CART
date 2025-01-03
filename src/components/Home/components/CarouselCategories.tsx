import React, { useState } from "react";
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
              <a
                className="social-icon__link"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
            </li>
            <li className="social-icon__item">
              <a
                className="social-icon__link"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </li>
            <li className="social-icon__item">
              <a
                className="social-icon__link"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icon__item">
              <a
                className="social-icon__link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
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
              <li><a href="/products/angular">Electrónica</a></li>
              <li><a href="/products/react">Hogar</a></li>
              <li><a href="/products/vue">Escolar</a></li>
              <li><a href="/products/laravel">Electrodomésticos</a></li>
            </ul>
          </div>
          <div className="footer__section">
            <h4>Enlaces Útiles</h4>
            <ul>
              <li><a href="/pricing">Productos</a></li>
              <li><a href="/settings">Contáctanos</a></li>
              <li><a href="/orders">Comprar ahora</a></li>
              <li><a href="/help">Ayuda</a></li>
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