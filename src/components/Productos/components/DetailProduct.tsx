import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/styles/DetailProduct.css';
import { Product } from '../interfaces/Product';
import { MdAddShoppingCart } from 'react-icons/md';

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
  const { idProducto } = useParams(); // Obtén el ID del producto desde la URL
  const navigate = useNavigate(); // Para redirigir al Home
  const [product, setProduct] = useState<Product | null>(null); // Estado para guardar el producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Simulación de obtención de datos del producto desde una API
  useEffect(() => {
    // Aquí deberías hacer la llamada real a tu API para obtener los detalles del producto
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simula un fetch
        const fakeProduct: Product = {
          idProducto: Number(idProducto),
          sku: 'SKU12345',
          nombreProducto: 'Amazing Gadget',
          precio: 299.99,
          rating: 4.9,
          descripcion:
            'Este gadget increíble simplificará tu vida y te traerá alegría en tus actividades diarias. ¡No te lo pierdas!',
          imagenUrl: 'https://i.postimg.cc/85JHv6K5/printer.png',
          stock: 5,
          idCategoria: 10,
        };
        setProduct(fakeProduct); // Actualiza el estado con los datos del producto
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idProducto]);

  const handleBackToHome = () => {
    navigate('/productos'); // Redirige al Home
  };

  const handleAddToCart = () => {
    if (product) {
      alert(`Producto "${product.nombreProducto}" agregado al carrito.`);
    }
  };

  if (loading) {
    return <p>Cargando detalles del producto...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

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
          <p className="product-price">${product.precio.toFixed(2)}</p>
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
              Agregar al carrito   <MdAddShoppingCart size={32} style={{ marginRight: '10px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
