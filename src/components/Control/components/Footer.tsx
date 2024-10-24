import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <Link className="menu__link" to="/">Home</Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/about">About</Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/services">Services</Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/team">Team</Link>
        </li>
        <li className="menu__item">
          <Link className="menu__link" to="/contact">Contact</Link>
        </li>
      </ul>
      <p>&copy;2024 Bigcart | Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
