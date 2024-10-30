import React, { useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import '../assets/styles/SectionProduct.css';
import { Product } from '../interfaces/Product';

const CatalogsProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos

  // Cargar los productos desde el archivo JSON
  useEffect(() => {
    fetch('/public/products.json') //ruta public
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        return response.json();
      })
      .then((data) => setProducts(data)) // asigno los productos acutalizando el estado de productos
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  return (
    <section className="products-section">
      <h2>Catálogo de Productos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CatalogsProducts;
