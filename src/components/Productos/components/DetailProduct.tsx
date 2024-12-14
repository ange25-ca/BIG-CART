import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import '../assets/styles/DetailProduct.css';
import { MdAddShoppingCart } from 'react-icons/md';
//import { agregarProductoLocal } from './addToCartOut';

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
  const { idProducto } = useParams<{ idProducto: string }>();
  const navigate = useNavigate();

  // Selecciona los productos y busca el producto por ID
  const { productos } = useSelector((state: RootState) => state.productos);

  const product = productos.find((p) => p.idProducto === Number(idProducto));

  const handleBackToHome = () => {
    navigate('/productos'); // Redirige al Home
  };

  const handleAddToCart = () => {
    if (product) {
      // Llama a la función para agregar el producto al carrito (directamente los valores del producto)
      //agregarProductoLocal({
      //  idProducto: product.idProducto,
      //  cantidad: 1, // Establece la cantidad a 1 o el valor que prefieras
      //  nombreProducto: product.nombreProducto,
      //  descripcion: product.descripcion,
      //  precio: product.precio,
      //  imagen: product.imagenUrl,
      //});
      // Muestra una alerta confirmando la acción
      alert(`Producto "${product.nombreProducto}" agregado al carrito.`);
    }
  };  
  if (!product) {
    return <p>Cargando detalles del producto o el producto no existe.</p>;
  }

  // Verificación antes de mostrar el precio 
  const price = Number(product.precio);
  //Función de verificación y asignación
  const displayPrice = !isNaN(price) ? price.toFixed(2) : 'Precio no disponible';

  return (
    <div className="product-details">
      <div className="product-container">
        <div className="product-image-de">
          <img src={product.imagenUrl} alt={product.nombreProducto} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.nombreProducto}</h1>
          <p className="product-category">
            <strong>Categoría:</strong> {categoryMap[product.idCategoria]}
          </p>
          <p className="product-sku">
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="product-description">{product.descripcion}</p>
          <p className="product-price">${displayPrice}</p> //Se sustituye por la función de validación
          <p className="product-rating">
            <strong>Calificación:</strong> {product.rating} ⭐
          </p>
          <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Agotado'}
          </p>
          <div className="product-actions">
            <button onClick={handleBackToHome} className="btn back-btn">
              Atrás
            </button>
            <button
              onClick={handleAddToCart}
              className="btn add-to-cart-btn"
              disabled={product.stock === 0}
            >
              Agregar al carrito <MdAddShoppingCart size={32} style={{ marginRight: '10px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
