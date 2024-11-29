import '../assets/styles/Home.css';
import TapeClientes from './CarouselClientes';
import CarouselPromotions from '../components/CarouselPromotions';
import TopProductsCarousel from "../components/CarouselProducts";
import CategoriesCarousel from "../components/CarouselCategories";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
        {/* Ofertas Especiales */}
        <section className="special-offers">
          <div className="offer-list">
            <CarouselPromotions />
          </div>
        </section>
      {/* Bienvenida */}
      <section className="minimalist-welcome">
        <div className="content-wrapper">
          <h1 className="headline">Donde la variedad y los precios al por mayor se encuentran.</h1>
          <p className="subheadline">Explora miles de productos a precios competitivos y disfruta de una experiencia de compra rápida y confiable.</p>
          <a href="#explorar" className="cta-button">Explorar ahora</a>
        </div>
      </section>

      {/* Clientes */}
      <section className="categories-cli">
      <h2 className="section-title-cli">Nuestros clientes</h2>
        <TapeClientes/>
      </section>

       {/* reviews*/}
       <section className="reviews">
        <h2 className="section-title">Reseñas de nuestros clientes</h2>
        <div className="reviews-container">
          <div className="review-card">
            <div className="review-card-content">
              <p className="review-text">"Excelente servicio y precios competitivos. ¡Completamente recomendado!"</p>
              <span className="review-author">- Juan Pérez</span>
            </div>
            <div className="review-icon">&#9733;</div>
          </div>
          <div className="review-card">
            <div className="review-card-content">
              <p className="review-text">"Un catálogo impresionante, siempre encuentro lo que necesito para mi negocio."</p>
              <span className="review-author">- Ana Gómez</span>
            </div>
            <div className="review-icon">&#9733;</div>
          </div>
          <div className="review-card">
            <div className="review-card-content">
              <p className="review-text">"Compra fácil, entrega rápida. ¡Todo fue perfecto! lo que necesitaba para mi negocio."</p>
              <span className="review-author">- Carlos Ruiz</span>
            </div>
            <div className="review-icon">&#9733;</div>
          </div>
        </div>
      </section>
       {/* Categorías */}
      <section className="categories">
        <div className="category-list">
         <CategoriesCarousel />
        </div>
        <Link to="/productos" className="category-button-home">
          Ir a categorías
        </Link>
      </section>


      {/* Productos Destacados */}
      <section className="featured-products">
        <h2>Productos top</h2>
        <div className="product-list">
          <TopProductsCarousel/>
        </div>
      </section>


      {/* Llamada a la acción */}
      <section className="call-to-action">
        <h2>Únete a Nuestra Comunidad</h2>
        <p>Regístrate para recibir ofertas exclusivas y descuentos especiales.</p>
        <Link to="contactus" className="sign-up-btn">
          Registrarse ahora
        </Link>
      </section>
    </div>
  );
};

export default Home;
