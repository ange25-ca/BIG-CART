import React from 'react';
import '../assets/styles/DetailProduct.css';
import { Product } from '../interfaces/Product';


const categoryMap: { [key: number]: string } = {
  1: 'Electrónica',
  2: 'Hogar',
  3: 'Deportes',
  4: 'Moda',
  5: 'Alimentos',
  6: 'Juguetes',
  7: 'Salud y Belleza',
  8: 'Automotriz',
  9: 'Libros',
  10: 'Mascotas',
};

const ProductDetails: React.FC = () => {
  const product: Product = {
    idProducto: 1,
    sku: 'SKU12345',
    nombreProducto: 'Amazing Gadget',
    precio: 299.99,
    descripcion:
      'Este gadget increíble simplificará tu vida y te traerá alegría en tus actividades diarias. ¡No te lo pierdas!',
    imagenUrl: 'https://via.placeholder.com/500', // Imagen de prueba
    stock: 5,
    categoria: 10,
  };

  const handleBackToCatalog = () => {
    alert('Volviendo al catálogo...');
  };

  const handleAddToCart = () => {
    alert(`Producto "${product.nombreProducto}" agregado al carrito.`);
  };

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="product-image">
          <img src={product.imagenUrl} alt={product.nombreProducto} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.nombreProducto}</h1>
          <p className="product-category">
            <strong>Categoría:</strong> {categoryMap[product.categoria]}
          </p>
          <p className="product-sku">
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="product-description">{product.descripcion}</p>
          <p className="product-price">${product.precio.toFixed(2)}</p>
          <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Agotado'}
          </p>
          <div className="product-actions">
            <button onClick={handleBackToCatalog} className="btn back-btn">
              Volver
            </button>
            <button
              onClick={handleAddToCart}
              className="btn add-to-cart-btn"
              disabled={product.stock === 0}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
