import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImagePath from '../assets/img/BIgCart.svg';
import iconCart from '../assets/img/icon-cart.svg';
import "../assets/styles/NavBar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  // Estado para controlar la apertura/cierre del menú móvil
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Primer Div */}
      <div className="navbar-top">
        <div className="contact-info"></div>
        <div className="auth-links">
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          <Link to="/account" className="nav-link">Mi Cuenta</Link>
        </div>
      </div>

      {/* Segundo Div */}
      <div className="navbar-middle">
        <Link to="/" className="navbar-brand">
          <img
            src={logoImagePath}
            width="280"
            height="130"
            className="navbar-logo"
            alt="Brand Logo"
          />
        </Link>
        <div className="navbar-search-cart">
          <ul className="navbar-nav">
            <li className={`nav-item ${isActive("/")}`}>
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className={`nav-item ${isActive("/about-us")}`}>
              <Link to="/about-us" className="nav-link">Nosotros</Link>
            </li>
            <li className={`nav-item ${isActive("/products")}`}>
              <Link to="/products" className="nav-link">Productos</Link>
            </li>
            <li className={`nav-item ${isActive("/contactus")}`}>
              <Link to="/contactus" className="nav-link">Contáctenos</Link>
            </li>
          </ul>
          <div className="btn-cart">
            <Link to="/Cart">
              <img src={iconCart} width="25" height="25" alt="Cart Icon" />
            </Link>
          </div>
        </div>
      </div>

      {/* Botón "hamburger" para el menú móvil */}
      <div className="menu-toggle" onClick={toggleMobileMenu}>
        <div className="menu-icon"></div>
      </div>

      {/* Menú móvil desplegable */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="close-icon" onClick={toggleMobileMenu}></div>
        <ul className="navbar-nav">
          <li className={`nav-item ${isActive("/")}`}>
            <Link to="/" className="nav-link" onClick={toggleMobileMenu}>Inicio</Link>
          </li>
          <li className={`nav-item ${isActive("/about-us")}`}>
            <Link to="/about-us" className="nav-link" onClick={toggleMobileMenu}>Nosotros</Link>
          </li>
          <li className={`nav-item ${isActive("/products")}`}>
            <Link to="/products" className="nav-link" onClick={toggleMobileMenu}>Productos</Link>
          </li>
          <li className={`nav-item ${isActive("/contactus")}`}>
            <Link to="/contactus" className="nav-link" onClick={toggleMobileMenu}>Contáctenos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
