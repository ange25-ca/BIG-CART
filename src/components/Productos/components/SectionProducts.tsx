import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { cargarProductos } from '../../../controllers/productoController';
import CardProduct from './CardProduct';
import '../assets/styles/SectionProduct.css';
import SkeletonProductLoader from './SkeletonProducto';

const CatalogsProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productos, isLoading, error } = useSelector(
    (state: RootState) => state.productos,
  );
  useEffect(
    () => {
      dispatch(cargarProductos());
    }, [dispatch]
  );

  return (
    <section className="products-section">
      <h2>Catálogo de Productos</h2>
      {isLoading && (
        <div className="skeleton-loader products-grid">
          {/* Aquí se implemena el componente de Skeleton */}
          {Array.from({ length: productos.length }).map((_, index) => (
            <SkeletonProductLoader key={index} />
          ))}
        </div>
      )}
      {error && <p>Error al cargar productos, Error: {error}</p>}
      {!isLoading && !error && productos.length > 0 && (
        <div className="products-grid">
          {productos.map((product) => (
            <CardProduct key={product.idProducto} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CatalogsProducts;
