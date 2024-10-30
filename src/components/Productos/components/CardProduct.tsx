import React from 'react';
import { Product } from '../interfaces/Product';
import '../assets/styles/CardProduct.css';

interface ProductProps {
  product: Product;
}

const CardProduct: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      {product.discount && <span className="discount-badge">{product.discount}% OFF</span>}
      <h3 className="product-name">{product.name}</h3>
      <p className="category">{product.category}</p>
      <div className="price-container">
        <span className="current-price">${product.price.toFixed(2)}</span>
        {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
      </div>
      <p className="sales">{product.sales} vendidos</p>
      <div className="rating">⭐ {product.rating}</div>
      {product.isBestSeller && <span className="best-seller">Más vendido</span>}
    </div>
  );
};

export default CardProduct;
