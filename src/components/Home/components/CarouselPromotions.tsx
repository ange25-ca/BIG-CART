import React, { useState, useEffect } from "react";
import "../assets/styles/CarouselPromotions.css";
import img3 from "../assets/img/navidad2.png";
import img6 from "../assets/img/1.svg";
import img4 from  "../assets/img/navidad3.png";
import img7 from  "../assets/img/3.svg";
import img5 from "../assets/img/4.svg";
import img1 from  "../assets/img/navidad1.png";

const images = [
  img1, img3, img4, img5, img6, img7
];

const CarouselPromotions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
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
