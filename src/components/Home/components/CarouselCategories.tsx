import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/CarouselCategories.css";

const CategoriesSection = () => {
  const images = [
    "https://i.postimg.cc/BbtkzbnP/cats-and-dog-friends-isolated-on-transparent-background-png.webp",
    "https://i.postimg.cc/rsb32TDn/categoria-componentes-electronicos.png",
    "https://i.postimg.cc/J02SMz2L/deporte.webp",
    "https://i.postimg.cc/mgyfFBcQ/moda.avif",
    "https://i.postimg.cc/LXhr7PxT/alimentos.jpg",
    "https://i.postimg.cc/B6ydGvyG/juguetes.jpg",
    "https://i.postimg.cc/nLh5j7fJ/salud.jpg",
    "https://i.postimg.cc/YqBsNTB8/automotriz.webp",
    "https://i.postimg.cc/FH9C8cRL/libros.jpg",
    "https://i.postimg.cc/vmTqHs58/hogar.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambio automático de imágenes cada 3 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer); // Limpieza del temporizador
  }, [currentIndex]);

  const handlePrevious = () => {
    const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Div izquierdo: Texto */}
        <div className="categories-text">
        <h1 className="categories-title">
          ¡Explora nuestras categorías y encuentra lo que buscas!
        </h1>
        <p className="categories-subtitle">
          Desde productos únicos hasta lo último en tendencias, tenemos algo para cada ocasión.
        </p>
        <p className="categories-description">
          Nuestra tienda en línea ofrece una extensa variedad de categorías, cuidadosamente seleccionadas para satisfacer todas tus necesidades. Ya sea que busques algo especial para ti, o un regalo perfecto para un ser querido, aquí encontrarás opciones para todos los gustos. Explora nuestras categorías, descubre lo mejor de cada una y vive una experiencia de compra inigualable. ¡No esperes más para encontrar lo que te hará feliz!
        </p>
        </div>
        {/* Div derecho: Slider */}
        <div className="categories-images">
          <div className="slider-container">
            <button className="slider-button left" onClick={handlePrevious}>
              &#8249;
            </button>
            <img
              src={images[currentIndex]}
              alt={`Categoría ${currentIndex + 1}`}
              className="slider-image"
            />
            <button className="slider-button right" onClick={handleNext}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
      {/* Botón para ir a productos */}
      <Link to="/productos" className="categories-button">
        Ver categorías
      </Link>
    </section>
  );
};

export default CategoriesSection;
