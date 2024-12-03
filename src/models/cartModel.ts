import axiosInstance from "../Api/axiosConfig";

export const getviewCart = async (idCarrito: number) => {
  try {
    const response = await axiosInstance.get(`carrito/viewCart/${idCarrito}`);
    console.log('Response completa:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
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