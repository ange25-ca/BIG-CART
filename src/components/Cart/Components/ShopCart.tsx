import React, { useState } from 'react';
import '../assets/styles/ShoppingCart.css';

interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'BlendMaster Elite Fusionator',
      variant: 'Variant: EU',
      price: 199.0,
      quantity: 1,
      image: '/path-to-image/blender.png', // Cambia esto por la ruta real de la imagen.
    },
    {
      id: 2,
      name: 'EcoChef Precision Cooker',
      variant: 'Color: Stainless Steel',
      price: 129.99,
      quantity: 2,
      image: '/path-to-image/cooker.png',
    },
    {
      id: 3,
      name: 'UltraBrew Coffee Grinder',
      variant: 'Size: Medium',
      price: 89.0,
      quantity: 1,
      image: '/path-to-image/grinder.png',
    },
    {
      id: 4,
      name: 'FreshVac Pro Juicer',
      variant: 'Variant: 2024 Edition',
      price: 249.5,
      quantity: 1,
      image: '/path-to-image/juicer.png',
    },
    {
      id: 5,
      name: 'PowerMatic Turbo Blender',
      variant: 'Color: Red',
      price: 159.0,
      quantity: 1,
      image: '/path-to-image/turbo-blender.png',
    },
    {
      id: 6,
      name: 'HomeBake Artisan Oven',
      variant: 'Power: 220V',
      price: 399.99,
      quantity: 1,
      image: '/path-to-image/oven.png',
    },
    {
      id: 7,
      name: 'ChopEasy Kitchen Processor',
      variant: 'Speed: Turbo',
      price: 179.0,
      quantity: 1,
      image: '/path-to-image/processor.png',
    },
    {
      id: 8,
      name: 'SteamPower Iron Master',
      variant: 'Color: Black',
      price: 69.99,
      quantity: 3,
      image: '/path-to-image/iron.png',
    },
    {
      id: 9,
      name: 'SmartMix Pro Blender',
      variant: 'Version: Advanced',
      price: 189.0,
      quantity: 1,
      image: '/path-to-image/smart-blender.png',
    },
    {
      id: 10,
      name: 'MultiChef Compact Mixer',
      variant: 'Attachments: 3-in-1',
      price: 109.0,
      quantity: 2,
      image: '/path-to-image/mixer.png',
    },
  ]);
  
  const [discountCode, setDiscountCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Lógica para redirigir a la vista de pago
    window.location.href = '/cartPayment';
  };

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items-section">
          <h2>Carrito</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-variant">{item.variant}</p>
              </div>
              <div className="cart-item-controls">
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                <div className="cart-item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className="cart-summary">
          <h3>Total</h3>
          <div className="discount-section">
            <input
              type="text"
              placeholder="Gift card or discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
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
            <button className="clear-cart-button" onClick={clearCart}>
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

