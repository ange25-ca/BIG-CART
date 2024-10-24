// src/interfaces/Product.ts

export interface Product {
    id: number;
    name: string; 
    price: number; // precio con descuento
    oldPrice?: number; // precio antes de descuento
    sales: number; // numero de ventas
    imageUrl: string; // url de la imagen
    category: string;
    rating: number; // calificación
    isBestSeller?: boolean; // si es del top de productos mewjores vendidosssss
    discount?: number; // descuento
}
  