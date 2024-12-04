import axiosInstance from "../Api/axiosConfig";
import {DetallesCarrito, ItemCarrito} from "../components/Cart/Components/interfaces/cartInterface";

interface CartResponse {
  detallesCarrito: DetallesCarrito;
  itemsCarrito: ItemCarrito[];
}
// Obtener el carrito
export const getviewCart = async (idCarrito: number): Promise<CartResponse> => {
  try {
    const response = await axiosInstance.get(`carrito/viewCart/${idCarrito}`);
    console.log('Response completa:', response.data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error al obtener el carrito:', error.message);
    } else {
      console.error('Error desconocido al obtener el carrito');
    }
    throw error; // Re-lanzamos el error para que pueda ser manejado por el código que llama a esta función
  }
};

export const addToCart = async (idCliente: number, idProducto: number, cantidad: number) => {
  const response = await axiosInstance.post('/carrito/addCart', {
    idCliente,
    idProducto,
    cantidad
  });
  console.log('Response completa:', response.data);
}