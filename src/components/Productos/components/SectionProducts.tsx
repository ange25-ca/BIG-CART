import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { cargarProductos } from '../../../controllers/productoController';
import CardProduct from './CardProduct';
import SkeletonProductLoader from './SkeletonProducto';
import '../assets/styles/SectionProduct.css';

const categories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Hogar' },
  { id: 3, name: 'Deportes' },
  { id: 4, name: 'Moda' },
  { id: 5, name: 'Alimentos' },
  { id: 6, name: 'Juguetes' },
  { id: 7, name: 'Salud y Belleza' },
  { id: 8, name: 'Automotriz' },
  { id: 9, name: 'Libros' },
  { id: 10, name: 'Mascotas' },
];

const priceRanges = [
  { id: 1, label: '0-50', min: 0, max: 50 },
  { id: 2, label: '50-100', min: 50, max: 100 },
  { id: 3, label: '100-200', min: 100, max: 200 },
];

const CatalogsProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productos, isLoading, error } = useSelector(
    (state: RootState) => state.productos
  );
  const [showFilters, setShowFilters] = useState(false); // Estado para alternar filtros

  useEffect(() => {
    dispatch(cargarProductos());
  }, [dispatch]);

  const handleFilterCategory = (category: string) => {
    console.log(`Filtrar por categoría: ${category}`);
    // Lógica para filtrar por categoría
  };

  const handleFilterPrice = (min: number, max: number) => {
    console.log(`Filtrar por precio: ${min} - ${max}`);
    // Lógica para filtrar por rango de precios
  };

  return (
    <div className="catalog-container">
      {/* Botón para alternar filtros en dispositivos pequeños */}
      <button
        className="filter-toggler"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>

      {/* Filtros */}
      <aside className={`filters ${showFilters ? 'show' : ''}`}>
        <h3>Filtrar por</h3>
        <div className="filter-group">
          <h4>Categorías</h4>
          {categories.map((category) => (
            <button
              key={category.id}
              className="filter-button"
              onClick={() => handleFilterCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="filter-group">
          <h4>Precio</h4>
          {priceRanges.map((range) => (
            <button
              key={range.id}
              className="filter-button"
              onClick={() => handleFilterPrice(range.min, range.max)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Productos */}
      <section className="products-section">
        <h2>Catálogo de Productos</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
          />
        </div>
        {isLoading ? (
          <div className="skeleton-loader products-grid">
            {Array.from({ length: productos.length}).map((_, index) => (
              <SkeletonProductLoader key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="error-message">Error al cargar productos: {error}</p>
        ) : productos.length > 0 ? (
          <div className="products-grid">
            {productos.map((product) => (
              <CardProduct key={product.idProducto} product={product} />
            ))}
          </div>
        ) : (
          <p className="no-products">No hay productos disponibles.</p>
        )}
      </section>
    </div>
  );
};

export default CatalogsProducts;

