import React from 'react';
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import cartData from '../../../../public/shopCart.json';
import CartItemComponent from './CartItem';
import '../assets/styles/ShoppingCart.css';
import {useNavigate} from 'react-router-dom';

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const items = cartData;

  // Calcular el subtotal
  const subtotal = items.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  // Configuración de impuestos y envío
  const taxRate = 0.1; // 10% de impuestos
  const shippingCost = subtotal > 100 ? 0 : 10; // Envío gratis para pedidos de más de $100
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + tax + shippingCost;

  const handleUpdateQuantity = (idProducto: number, quantity: number) => {
    console.log(`Actualizar cantidad de producto con id ${idProducto} a ${quantity}`);
  };

  const handleRemoveItem = (idProducto: number) => {
    console.log(`Eliminar producto con id ${idProducto}`);
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      <div className="shopping-cart-content">
        {/* Lista de ítems con scroll activado cuando hay muchos elementos */}
        <div className="cart-items-container">
          {items.map(item => (
            <CartItemComponent
              key={item.idProducto}
              item={item}
              onUpdateQuantity={(quantity) => handleUpdateQuantity(item.idProducto, quantity)}
              onRemove={() => handleRemoveItem(item.idProducto)}
            />
          ))}
        </div>

        {/* Resumen del carrito */}
        <div className="cart-summary">
          <h3>Resumen del Pedido</h3>
          <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
          <p>Impuestos (10%): <strong>${tax.toFixed(2)}</strong></p>
          <p>Costo de Envío: <strong>${shippingCost.toFixed(2)}</strong></p>
          <div className="balance">
            <p>Total: <strong>${totalAmount.toFixed(2)}</strong></p>
          </div>
          <button onClick={() => console.log("Proceder al pago")} className="cart-checkout">
            Proceder al Pago
          </button>
          <button onClick={() => console.log("Carrito vaciado")} className="cart-clear">
            <FiTrash2 size={18} /> Vaciar Carrito
          </button>

          {/* Métodos de pago */}
          <div className="payment-methods">
            <h4>Métodos de Pago Aceptados:</h4>
            <div className="payment-icons">
              <FaCcVisa size={36} />
              <FaCcMastercard size={36} />
              <FaPaypal size={36} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
