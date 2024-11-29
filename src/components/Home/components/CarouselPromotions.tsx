import React, { useState, useEffect } from "react";
import "../assets/styles/CarouselPromotions.css";
import img3 from "../assets/img/banner3.svg";
import img6 from "../assets/img/banner6.svg";
import img4 from  "../assets/img/banner4.svg";
import img7 from  "../assets/img/banner7.svg";
import img5 from "../assets/img/banner5.svg";
import img2 from "../assets/img/banner2.svg";
import img1 from  "../assets/img/banner1.svg";

const images = [
  img1, img3, img4, img5, img6, img7, img2
];

const CarouselPromotions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // Cambia cada 2.5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-prom">
      <div className="carousel-items-wrapper">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : "inactive"
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Botones para navegar manualmente */}
      <div className="carousel-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselPromotions;
