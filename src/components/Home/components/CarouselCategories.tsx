import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../assets/styles/CarouselCategoires.css";

type Category = {
  name: string;
  image: string;
  rating: number;
  link: string;
};

const categories: Category[] = [
  {
    name: "Tecnología",
    image: "https://i.postimg.cc/rsb32TDn/categoria-componentes-electronicos.png",
    rating: 4.5,
    link: "/productos",
  },
  {
    name: "Moda",
    image: "https://i.postimg.cc/3J4zCkqP/modern-girl-fashion-shopping-32bd4f.png",
    rating: 4.7,
    link: "/productos",
  },
  {
    name: "Hogar",
    image: "https://i.postimg.cc/brGVT5mQ/utensilios-cocina-utensilios-metal-estante-colgante-primer-plano-realista-cuchara-espatula-skimmer-t.avif",
    rating: 4.2,
    link: "/productos",
  },
  {
    name: "Juguetes",
    image: "https://i.postimg.cc/cHFPTw0N/coleccion-juguetes-coloridos-escritorio-488220-3796.avif",
    rating: 4.6,
    link: "/productos",
  },
  {
    name: "Automóviles",
    image: "https://i.postimg.cc/bJVF1P9y/productos-de-limpieza-para-coches-manten-tu-vehiculo-impecable.jpg",
    rating: 4.8,
    link: "/productos",
  },
  {
    name: "Salud",
    image: "https://i.postimg.cc/X7Rm2VSX/Menta-3-4-b50374ae4caa4e5107b62459c0563798.png",
    rating: 4.3,
    link: "/productos",
  },
  {
    name: "Mascotas",
    image: "https://i.postimg.cc/BbtkzbnP/cats-and-dog-friends-isolated-on-transparent-background-png.webp",
    rating: 4.1,
    link: "/productos",
  },
];

const CategoriesCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [scrollMessage, setScrollMessage] = useState<string>("Ver más →");

  const handleScroll = () => {
    const carousel = carouselRef.current;

    if (carousel) {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;

      if (scrollLeft + clientWidth >= scrollWidth) {
        setScrollMessage("← Regresar");
      } else if (scrollLeft === 0) {
        setScrollMessage("Ver más →");
      } else {
        setScrollMessage(null);
      }
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="carousel-container">
      <section className="welcome-section">
        <h2>El Top de los Top</h2>
        <p>
          Descubre nuestras categorías más destacadas, seleccionadas con base en la
          preferencia de nuestros clientes. Desde lo más innovador en tecnología
          hasta las tendencias más populares en moda y hogar. Cada categoría ha sido
          elegida por su calidad, relevancia y demanda. ¡Encuentra tu favorita y
          explora lo mejor que tenemos para ofrecer!
        </p>
      </section>

      <div className="carousel-categories" ref={carouselRef}>
        {categories.map((category, index) => (
          <div className="carousel-card" key={index}>
            <div className="carousel-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="carousel-content">
              <h3>{category.name}</h3>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) =>
                  i < Math.round(category.rating) ? (
                    <FaStar key={i} className="star-filled" />
                  ) : (
                    <FaRegStar key={i} className="star-empty" />
                  )
                )}
                <span className="rating">{category.rating.toFixed(1)}</span>
              </div>
              <Link to={category.link} className="btn">
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll-message-container">
        <div className={`scroll-message ${scrollMessage ? "" : "hidden"}`}>
          {scrollMessage}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCarousel;

