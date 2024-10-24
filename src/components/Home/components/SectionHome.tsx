import '../assets/styles/Home.css';

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

      {/* Categorías */}
      <section className="categories">
        <h2>Categorías Destacadas</h2>
        <div className="category-list">
          <div className="category-card">Electrónica</div>
          <div className="category-card">Ropa</div>
          <div className="category-card">Hogar</div>
          <div className="category-card">Juguetes</div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="product-list">
          <div className="product-card">
            <img src="URL_DE_IMAGEN" alt="Producto 1" />
            <h3>Producto 1</h3>
            <p>$29.99</p>
          </div>
          <div className="product-card">
            <img src="URL_DE_IMAGEN" alt="Producto 2" />
            <h3>Producto 2</h3>
            <p>$39.99</p>
          </div>
          <div className="product-card">
            <img src="URL_DE_IMAGEN" alt="Producto 3" />
            <h3>Producto 3</h3>
            <p>$19.99</p>
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="special-offers">
        <h2>Ofertas Especiales</h2>
        <div className="offer-list">
          <div className="offer-card">
            <img src="URL_DE_IMAGEN" alt="Oferta 1" />
            <div className="offer-details">
              <h3>Producto en Oferta 1</h3>
              <p className="old-price">$49.99</p>
              <p className="new-price">$29.99</p>
              <button className="buy-now-btn">Comprar Ahora</button>
            </div>
          </div>
          <div className="offer-card">
            <img src="URL_DE_IMAGEN" alt="Oferta 2" />
            <div className="offer-details">
              <h3>Producto en Oferta 2</h3>
              <p className="old-price">$59.99</p>
              <p className="new-price">$39.99</p>
              <button className="buy-now-btn">Comprar Ahora</button>
            </div>
          </div>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="call-to-action">
        <h2>Únete a Nuestra Comunidad</h2>
        <p>Regístrate para recibir ofertas exclusivas y descuentos especiales.</p>
        <button className="sign-up-btn">Regístrate Ahora</button>
      </section>
    </div>
  );
};

export default Home;
