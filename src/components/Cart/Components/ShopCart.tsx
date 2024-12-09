import React, { useEffect, useState } from "react";
import "../assets/styles/ShoppingCart.css";
import { useQuery, useMutation , useQueryClient} from "@tanstack/react-query";
import { getviewCart, updateCartQuantity ,eliminardelCarrito} from "../../../models/cartModel";
import { debounce } from "lodash";


// Tipos de datos
interface CartItem {
  idProducto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

interface CartDetails {
  idCarrito: number;
  items: CartItem[];
}

const Cart: React.FC = () => {
  const idUsuario = localStorage.getItem("userId");
  console.log("este es mi usuario: " + idUsuario);

  const queryclient = useQueryClient();
  
  // Hook para obtener carrito desde la API
  const {
    data: cart, // para almacenar el carrito
    isLoading, // el estado para ver si carga
    isError,
  } = useQuery({
    queryKey: ["cart", idUsuario], // como se va identificar el usuario 
    queryFn: async () => {
      if (!idUsuario) {
        // Si no hay usuario, no hacemos la llamada a la API
        return { items: [] }; // Retornamos un carrito vacío
      }
      try {
        const data = await getviewCart(parseInt(idUsuario));
        console.log("Carrito desde la API:", data); // Verifica la respuesta de la API
        return data;
      } catch (error) {
        console.error("Error al obtener carrito:", error);
        return { items: [] }; // En caso de error, devolvemos un carrito vacío
      }
    },
    enabled: !!idUsuario, // Solo ejecutar si hay un idUsuario
  });

  // Hook para actualizar cantidad
  const {mutate, isPending: isPendingMutation} = useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: async () => {
      // Refresca los datos del carrito después de la eliminación
    await   queryclient.invalidateQueries({
      queryKey: ['cart']
    });
    }
      
  });
  const deleteMutation = useMutation( {
    mutationFn: eliminardelCarrito,
    onSuccess: async () => {
      // Refresca los datos del carrito después de la eliminación
    await   queryclient.invalidateQueries({
      queryKey: ['cart']
    });
    },
    onError: (error) => {
      console.error("Error al eliminar el producto del carrito:", error);
    },
  });
  
  const [localCart, setLocalCart] = useState<CartItem[]>([]);
  // Si no hay usuario, obtenemos el carrito desde localStorage
  useEffect(() => {
    if (!idUsuario) {
      const storedCart = localStorage.getItem("carrito");
      setLocalCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [idUsuario]);

  // El subtotal, incluyendo los productos de la API o localStorage
  const items = idUsuario ? cart?.itemsCarrito || [] : localCart;
  const detailCart = idUsuario ? cart?.detallesCarrito : [];
  // calculamos el subtotal 
  const subtotal = items.reduce(
    (total: number, item: { precio: number; cantidad: number }) =>
      total + item.precio * item.cantidad,
    0
  );

  const taxRate = 0.1;
  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * taxRate;
  const totalAmount = subtotal + tax + shippingCost;

  const handleQuantityChange = debounce( (idProducto: number, cantidad: number) => {
    if(isPendingMutation) return;
// Actualizamos la cantidad en el carrito
    if (idUsuario && cart) {
      mutate({
        cantidad,
        idCarrito: detailCart.idCarrito,
        idProducto,
      });
    } else {
      const updatedCart = localCart.map((item) =>
        item.idProducto === idProducto ? { ...item, cantidad } : item
      );
      setLocalCart(updatedCart);
      localStorage.setItem("carrito", JSON.stringify(updatedCart));
    }
  }, 500)

  const handleDecrement = (idProducto: number, cantidad: number) => {
    if (cantidad > 1) handleQuantityChange(idProducto,  - 1);
  };

  const handleIncrement = (idProducto: number) => {
    handleQuantityChange(idProducto,  + 1);
  };

  const handleDelete = ( idProducto: number) => {
    deleteMutation.mutate({
      idCarrito: detailCart.idCarrito,
      idProducto, 
    });
  };
  const handleCheckout = () => {
    window.location.href = "/cartPayment";
  };

  return (
    <div className="cart-container">
      <main className="cart-main">
        <section className="cart-items-section">
          <h2>Carrito</h2>
          {isLoading && <p>Cargando productos...</p>}
          {isError && <p>hubo un error</p>}
          {!isLoading && !isError && items && items.length > 0 ? (
            items.map((item: CartItem) => (
              <div key={item.idProducto} className="cart-item">
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.nombreProducto}</p>
                  <p className="cart-item-variant">{item.descripcion}</p>
                </div>
                <div className="cart-item-controls">
                  <span className="cart-item-price">${item.precio}</span>
                  <div className="cart-item-quantity">
                    <button
                      className="quantity-button"
                      disabled =
                      {item.cantidad <= 1 && isPendingMutation}
                      onClick={() =>
                        handleDecrement(item.idProducto, item.cantidad)
                      }
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.cantidad}</span>
                    <button
                      className="quantity-button"
                      disabled = 
                      {item.cantidad >= 10 && isPendingMutation}
                
                      onClick={() =>
                        handleIncrement(item.idProducto,)
                      }
                    >
                      +
                    </button>
                    <button className="remove-item"
                    onClick={() =>handleDelete(item.idProducto)}
                    >🗑</button>
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
