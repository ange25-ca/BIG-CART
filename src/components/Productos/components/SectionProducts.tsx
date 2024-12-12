import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { cargarProductos } from '../../../controllers/productoController';
import CardProduct from './CardProduct';
//import SkeletonProductLoader from './SkeletonProducto';
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

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);

  useEffect(() => {
    dispatch(cargarProductos());
  }, [dispatch]);

  const handleFilterCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterPrice = (min: number, max: number) => {
    setSelectedPriceRange({ min, max });
  };

  const filteredProducts = productos.filter((product) => {
    const matchesCategory = selectedCategory ? product.idCategoria === selectedCategory : true;
    const matchesPrice =
    selectedPriceRange
      ? product.precio >= selectedPriceRange.min && product.precio <= selectedPriceRange.max
      : true;
    return matchesCategory && matchesPrice ;
  });

  return (
    <div className="catalog-container">
      {/* Filtros */}
      <aside className="filters">
        <h3>Filtrar por</h3>
        <div className="filter-group">
          <h4>Categorías</h4>
          {categories.map((category) => (
            <button
              key={category.id}
              className="filter-button"
              onClick={() => handleFilterCategory(category.id)}
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
        <button onClick={() => { setSelectedCategory(null); setSelectedPriceRange(null); }}>
          Limpiar filtros
        </button>
      </aside>

      {/* Productos */}
      <section className="products-section">
        <h2>Catálogo de Productos</h2>
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>Error al cargar productos: {error}</p>
        ) : filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
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
