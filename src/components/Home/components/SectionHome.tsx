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
          <p className="subheadline-welcome">¡Explora nuestras secciones ahora mismo y conoce todo lo que tenemos para ti! Descubre más sobre nuestra historia, lo que nos impulsa, y los productos únicos que hemos creado pensando en ti. ¡Estás a solo un clic de encontrar lo que necesitas!</p>
          <a href="#explorar" className="cta-button">Explorar ahora</a>
        </div>
      </section>

      {/* Clientes */}
      <section className="categories-cli">
      <h2 className="section-title-cli">Nuestros clientes</h2>
        <TapeClientes/>
      </section>

       {/* reviews*/}
       <section className="customer-reviews">
  <h2 className="customer-reviews-title">Lo que opinan nuestros clientes</h2>
  <div className="customer-reviews-container">
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/XvK9vWhQ/juan.avif" alt="Juan Pérez" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"Excelente servicio y precios competitivos. ¡Completamente recomendado!"</p>
        <span className="customer-review-author">- Juan Pérez -</span>
        <div className="customer-rating">⭐⭐⭐⭐ 4.0</div>
      </div>
    </div>
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/8P3RKtMB/ana.jpg" alt="Ana Gómez" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"Un catálogo impresionante, siempre encuentro lo que necesito para mi negocio."</p>
        <span className="customer-review-author">- Ana Gómez -</span>
        <div className="customer-rating">⭐⭐⭐⭐⭐ 5.0</div>
      </div>
    </div>
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/tJhT7TYJ/persona.webp" alt="Carlos Ruiz" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"Un catálogo impresionante, siempre encuentro lo que necesito para mi negocio."</p>
        <span className="customer-review-author">- Carlos Ruiz -</span>
        <div className="customer-rating">⭐⭐⭐⭐ 4.5</div>
      </div>
    </div>
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/W3XrMnsZ/maria-2.jpg" alt="María López" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"Gran variedad de productos, siempre de calidad."</p>
        <span className="customer-review-author">- María López -</span>
        <div className="customer-rating">⭐⭐⭐⭐ 4.4</div>
      </div>
    </div>
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/pVczrqGb/luis.webp" alt="Luis Fernández" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"La atención al cliente es excelente, me ayudaron con todo lo que necesitaba."</p>
        <span className="customer-review-author">- Luis Fernández -</span>
        <div className="customer-rating">⭐⭐⭐⭐⭐ 5.0</div>
      </div>
    </div>
    <div className="customer-review-card">
      <img src="https://i.postimg.cc/jjRLZ7g4/luis-h.jpg" alt="Luis Fernández" className="customer-avatar" />
      <div className="customer-review-content">
        <p className="customer-review-text">"La atención al cliente es excelente, me ayudaron con todo lo que necesitaba."</p>
        <span className="customer-review-author">- Luis Hernandez -</span>
        <div className="customer-rating">⭐⭐⭐⭐⭐ 5.0</div>
      </div>
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
