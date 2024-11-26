import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/CarouselProducts.css";

interface TopProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
}

const topProducts: TopProduct[] = [
  { id: 1, name: "Smartphone", image: "https://i.postimg.cc/NjBpnLMJ/pngtree-black-mobile-phone-png-image-7097040.png", price: 699, rating: 4.8 },
  { id: 2, name: "Laptop", image: "https://i.postimg.cc/Y0Fb5WYV/modern-laptop-3d-illustration-png.webp", price: 1200, rating: 4.7 },
  { id: 3, name: "Headphones", image: "https://i.postimg.cc/G3T78ZVQ/headphonepng-parspng-com-6.png", price: 150, rating: 4.9 },
  { id: 4, name: "Smartwatch", image: "https://i.postimg.cc/HLPzj2tR/pngtree-the-smartwatch-banner-png-image-11919210.png", price: 199, rating: 4.6 },
  { id: 5, name: "Tablet", image: "https://i.postimg.cc/x8L3xSSV/realistic-tablet-pc-computer-with-blank-screen-png.webp", price: 499, rating: 4.7 },
  { id: 6, name: "Camera", image: "https://i.postimg.cc/5ttpxG88/plain-black-dslr-camera-free-png.webp", price: 850, rating: 4.8 },
  { id: 7, name: "Gaming Console", image: "https://i.postimg.cc/rFSfg58R/Microsoft-Xbox-One-X-Console.png", price: 400, rating: 4.9 },
  { id: 8, name: "Monitor", image: "https://i.postimg.cc/d1b9jVp9/pngtree-monitor-display-screen-png-image-13098167.png", price: 300, rating: 4.7 },
  { id: 9, name: "Speaker", image: "https://i.postimg.cc/ZRCfLgRJ/e0cb70107befb80ffcca5d396ea34486.png", price: 120, rating: 4.8 },
  { id: 10, name: "Printer", image: "https://i.postimg.cc/85JHv6K5/printer.png", price: 250, rating: 4.7 },
  { id: 11, name: "Keyboard", image: "https://i.postimg.cc/hj62ZrzT/Gaming-Keyboard-Free-PNG-Image.png", price: 80, rating: 4.6 },
  { id: 12, name: "Mouse", image: "https://i.postimg.cc/y8yr6ctC/black-gaming-mouse-with-a-rainbow-light-isolated-from-background-free-png.webp", price: 40, rating: 4.8 },
  { id: 13, name: "Desk Lamp", image: "https://i.postimg.cc/zG70Y5HJ/pngtree-3d-desk-lamp-png-illustration-png-image-11595799.png", price: 60, rating: 4.7 },
  { id: 14, name: "Router", image: "https://i.postimg.cc/YqcX1dww/kv-router.png", price: 120, rating: 4.6 },
  { id: 15, name: "Smart Home Hub", image: "https://i.postimg.cc/LsyCLRmy/01.png", price: 180, rating: 4.7 },
  { id: 16, name: "Gaming Chair", image: "https://i.postimg.cc/5t9KXjWY/chairpng-parspng-com.png", price: 250, rating: 4.9 },
];

const AUTO_PLAY_DELAY = 5000; // 5 segundos

const TopProductsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 4) % topProducts.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 4 + topProducts.length) % topProducts.length);
  };

  useEffect(() => {
    const interval = setInterval(next, AUTO_PLAY_DELAY);
    return () => clearInterval(interval); // Limpia el intervalo
  }, []);

  return (
    <div className="top-products-carousel">
      <button className="products-control-btn products-prev-btn" onClick={prev}>
        &#8249;
      </button>
      <div className="products-carousel-container">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className={`products-carousel-item ${
              index >= currentIndex && index < currentIndex + 4 ? "visible" : "hidden"
            }`}
          >
            <img src={product.image} alt={product.name}  style={{height: '200px', width: '200px' }}/>  //gracias a chatgpt
            <div className="product-details">
              <h3 style={{fontWeight: 'bold'}}>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="product-rating">
                {"⭐".repeat(Math.floor(product.rating))} {product.rating.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="products-control-btn products-next-btn" onClick={next}>
        &#8250;
      </button>
      <div className="view-all-products">
        <Link to="/productos" className="view-all-btn">
          Ver todos los productos
        </Link>
      </div>
    </div>
  );
};

export default TopProductsCarousel;