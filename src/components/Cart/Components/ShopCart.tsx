import React, { useEffect, useState } from 'react';
import '../assets/styles/ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { verCart } from '../../../controllers/cartController';
import { fetchViewCart, addToCart, updateCartQuantity } from "../../../models/cartModel";


interface CartItem {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const Cart: React.FC = () => {
 
   const dispatch = useDispatch<AppDispatch>();
   const { detallesCarrito, itemsCarrito, isLoading, error } = useSelector((state: RootState) => state.carrito);
   // const idUsuario = useSelector((state: RootState) => state.user.idUsuario); // Usamos la interfaz UserState
   const [localCart, setLocalCart] = useState<CartItem[]>([]);
  const idUsuario = localStorage.getItem('idUsuario');
   // Recuperar productos del backend si el usuario está logueado
   useEffect(() => {
     if (idUsuario) {
        // Enviar idCarrito a la función verCart
         dispatch(verCart(parseInt(idUsuario))); // Ahora pasamos el idCarrito a verCart
    
     } else {
       // Recuperar productos desde localStorage si no está logueado
       const storedCart = localStorage.getItem('carrito');
       setLocalCart(storedCart ? JSON.parse(storedCart) : []);
     }
   }, [idUsuario, dispatch]);
  // Calcular el subtotal
   const subtotal = itemsCarrito.reduce(
     (total, item) => total + item.precio * item.cantidad,
     0
   );
  // Configuración de impuestos y envío
   const taxRate = 0.1; // 10% de impuestos
   const shippingCost = subtotal > 100 ? 0 : 10; // Envío gratis para pedidos de más de $100
   const tax = subtotal * taxRate;
   const totalAmount = subtotal + tax + shippingCost;
  const items = idUsuario ? itemsCarrito : localCart;
  const handleCheckout = () => {
     // Lógica para redirigir a la vista de pago
     window.location.href = '/cartPayment';
   };
   // Función para actualizar la cantidad
    const handleQuantityChange = async (idProducto: number, cantidad: number) => {
     if (idUsuario && detallesCarrito) {
       console.log("es el uusuario: " + idUsuario + "es el carrito: " + detallesCarrito.idCarrito);
       await updateCartQuantity(cantidad, detallesCarrito?.idCarrito, idProducto);
       // Actualiza la UI con el nuevo valor después de la actualización
       dispatch(verCart(parseInt(idUsuario))); // Vuelve a obtener el carrito actualizado
     } else {
       // Si no está logueado, actualiza el carrito local
       const updatedCart = localCart.map(item =>
         item.idProducto === idProducto
           ? { ...item, cantidad: cantidad }
           : item
       );
       setLocalCart(updatedCart);
       localStorage.setItem('carrito', JSON.stringify(updatedCart));
     }
   };
  // Manejo de decremento de cantidad


  
  



  const handleDecrement = (idProducto: number, cantidad: number) => {
    if (cantidad > 1) {
      handleQuantityChange(idProducto, cantidad - 1);
    }
  };

  const handleIncrement = (idProducto: number, cantidad: number) => {
    handleQuantityChange(idProducto, cantidad + 1);
  };

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items-section">
          <h2>Carrito</h2>
          {isLoading ? (
            <p>Cargando productos...</p> // Mostrar mensaje de carga
          ) : error ? (
            <p className="error-message">{error}</p> // Mostrar mensaje de error si ocurre algún problema
          ) : items.length > 0 ? (
            items.map((item) => (
              <div key={item.idProducto} className="cart-item">
                <img src={item.imagen} alt={item.nombreProducto} className="cart-item-image" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.nombreProducto}</p>
                  <p className="cart-item-variant">{item.descripcion}</p>
                </div>
                <div className="cart-item-controls">
                  <span className="cart-item-price">${item.precio}</span>
                  <div className="cart-item-quantity">
                    <button className="quantity-button" onClick={() => handleDecrement(item.idProducto, item.cantidad)}>-</button>
                    <span className="quantity-display">{item.cantidad}</span>
                    <button className="quantity-button" onClick={() => handleIncrement(item.idProducto, item.cantidad)}>+</button>
                    <button className="remove-item">🗑</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </section>

        <aside className="cart-summary">
          <h3>Total</h3>
          {/* <div className="discount-section">
            <input
              type="text"
              placeholder="Gift card or discount code"
              defaultValue="10"
              // onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
            />
          </div> */}
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>IVA</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-actions">
          <button className="checkout-button" onClick={handleCheckout}>
              Procesar pago
            </button>
            <button className="empty-cart-button">Vaciar carrito</button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;
