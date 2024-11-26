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
