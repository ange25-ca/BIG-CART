import React from 'react';
import { Product } from '../interfaces/Product';
import '../assets/styles/CardProduct.css';
import { handleAddToCartwithLogin } from '../../../controllers/cartController';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { agregarProductoLocal } from './addToCartOut';

interface ProductProps {
  product: Product;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {

  // const idUsuario = useSelector((state: RootState) => state.user.idUsuario);// Usamos la interfaz UserState
  const idUsuario = localStorage.getItem('idUsuario') ?? '';
  const handleAddToCart = () => {
    const item = {
      idProducto: product.idProducto,
      cantidad: 1, // Puedes personalizar esta cantidad
      nombreProducto: product.nombreProducto,
      descripcion: product.descripcion,
      precio: product.precio,
      imagen: product.imagenUrl,
    };

    if (!idUsuario) {
      console.log(idUsuario)
      // Usuarios no logueados: usar localStorage
      agregarProductoLocal(item);
      alert(`Producto "${product.nombreProducto}" agregado al carrito local.`);
    } else {alert(`Producto "${product.nombreProducto}" agregado al carrito de backend. el id usuario es: "${idUsuario}`);
    console.log(idUsuario)};
    handleAddToCartwithLogin(parseInt(idUsuario), product.idProducto, 1);
  }
  // Convertir `rating` y `precio` a números si vienen como cadenas
  const rating = typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating;
  const price = typeof product.precio === 'string' ? parseFloat(product.precio) : product.precio;

  const renderStars = (rating: number) => {
    const maxStars = 5;
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      if (rating >= i) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (rating >= i - 0.5) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="card">
      <img src={product.imagenUrl} alt={product.nombreProducto} className="product-image" />
      <h3 className="product-name">{product.nombreProducto}</h3>
      <p className="description">
        {product.descripcion ? product.descripcion.slice(0, 80) + '...' : 'Sin descripción'}
      </p>
      <p className="category">{product.categoria}</p>
      <div className="price-container">
        <span className="current-price">${price.toFixed(2)}</span>
      </div>
      <p className="sales">{100} vendidos</p>
      <div className="rating">
        {renderStars(rating)}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
      <button className="btn-icon details">Más</button>
      <button className="btn-icon add-to-cart" onClick={handleAddToCart}>Agregar</button>
    </div>
  );
};

export default CardProduct;
