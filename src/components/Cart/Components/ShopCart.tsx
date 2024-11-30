import React, { useEffect, useState } from 'react';
import '../assets/styles/ShoppingCart.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { verCart } from '../../../controllers/cartController';

interface CartItem {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

const Cart: React.FC = () => {

  const navigate = useNavigate();
  const distpatch = useDispatch<AppDispatch>();
  const { detallesCarrito, itemsCarrito, isLoading, error } = useSelector((state: RootState) => state.carrito);
  const idUsuario = useSelector((state: RootState) => state.user.idUsuario);
  console.log(idUsuario);
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  // Recuperar productos del backend si el usuario está logueado
  useEffect(() => {
    if (idUsuario) {
      distpatch(verCart());
    } else {
      // Recuperar productos desde localStorage si no está logueado
      const storedCart = localStorage.getItem('carrito');
      setLocalCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [idUsuario, distpatch]);


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

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items-section">
          <h2>Carrito</h2>
          {items.length > 0 ? (
            
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
                      <button
                        className="quantity-button"

                      >
                        -
                      </button>
                      <span className="quantity-display">{item.cantidad}</span>
                      <button
                        className="quantity-button"
                      // onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="remove-item"
                      // onClick={() => removeItem(item.id)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))
            
          ) : (
            <p> No hay productos en el carrito. </p>
          )}
        </section>

        <aside className="cart-summary">
          <h3>Total</h3>
          <div className="discount-section">
            <input
              type="text"
              placeholder="Gift card or discount code"
              value={10}
              // onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
            />
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>IVA</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-actions">
            <button className="clear-cart-button" >
              Empty Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Process Payment
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;

