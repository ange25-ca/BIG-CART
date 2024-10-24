import React, { useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import '../assets/styles/SectionProduct.css';
import { Product } from '../interfaces/Product';

const CatalogsProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para los productos

  // Cargar los productos desde el archivo JSON
  useEffect(() => {
    fetch('/data/products.json')  // Ruta relativa del archivo JSON
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        return response.json();
      })
      .then((data) => setProducts(data)) // Actualizar el estado con los productos
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
