import '../assets/styles/Home.css';
import TapeClientes from './CarouselClientes';
import CarouselPromotions from '../components/CarouselPromotions';
import TopProductsCarousel from "../components/CarouselProducts";
import CategoriesCarousel from "../components/CarouselCategories";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
      {/* Banner destacado */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a BigCart</h1>
          <p>Productos de calidad al mejor precio</p>
          <button className="shop-now-btn">Comprar Ahora</button>
        </div>
      </section>
      {/* Bienvenida */}
      <section className="welcome-section">
      <h2>Donde la variedad y los precios al por mayor se encuentran.</h2>
      <p>Nos enorgullece ofrecerte miles de productos en todas las categorías imaginables, diseñados para satisfacer todas tus necesidades de negocio. 
        Desde artículos de tendencia hasta básicos de alta demanda, en BigCart encontrarás un catálogo vasto y actualizado pensado para 
        ayudarte a abastecer tu negocio con facilidad y eficiencia.</p>
      <p>Aquí, valoramos cada compra al por mayor y trabajamos para ofrecerte no solo precios competitivos, 
        sino también una experiencia de compra rápida y confiable. 
        ¡Explora nuestras categorías, selecciona los productos que necesitas y 
        disfruta de los beneficios de comprar al por mayor con nosotros!</p>
      </section>
      {/* Clientes */}
      <section className="categories">
        <h2>Nuestros clientes</h2>
        <TapeClientes/>
      </section>

       {/* Categorías */}
       {/* Categorías */}
      <section className="categories">
        <div className="category-list">
         <CategoriesCarousel />
        </div>
        <Link to="/productos" className="category-button">
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

      {/* Ofertas Especiales */}
        <section className="special-offers">
          <h2>Ofertas Especiales</h2>
          <div className="offer-list">
            <CarouselPromotions />
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
