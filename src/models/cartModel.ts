import axiosInstance from "../Api/axiosConfig";
import {DetallesCarrito, ItemCarrito} from "../components/Cart/Components/interfaces/cartInterface";

interface CartResponse {
  detallesCarrito: DetallesCarrito;
  itemsCarrito: ItemCarrito[];
}
// Obtener el carrito
export const fetchViewCart = async (idCarrito: number) => {
  const response = await axiosInstance.get(`carrito/viewCart/${idCarrito}`);
  return response.data;
};

// Agregar producto al carrito
export const addToCart = async (idCliente: number, idProducto: number, cantidad: number): Promise<void> => {
  await axiosInstance.post('/carrito/addCart', {
    idCliente,
    idProducto,
    cantidad,
  });
};

// Actualizar cantidad en el carrito
export const updateCartQuantity = async (
  cantidad: number,
  idCarrito: number,
  idProducto: number
): Promise<void> => {
  await axiosInstance.put('/carrito/updatequantity', {
    cantidad,
    idCarrito,
    idProducto,
  });
};