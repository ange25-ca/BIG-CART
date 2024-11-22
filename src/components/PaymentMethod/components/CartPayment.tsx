import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/paymentSlice';

const CartPayment: React.FC = () => {
  const dispatch = useDispatch();
  // Obtener el estado de pago desde Redux
  const payment = useSelector((state: RootState) => state.payment);

  // Handler para cambiar los valores de los campos del formulario
  const handleInputChange = (field: keyof typeof payment, value: string | number) => {
    dispatch(updateField({ field, value }));
  };

  // Handler para el envío del formulario (por ejemplo, procesar el pago)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí va la lógica para procesar el pago (enviar a una API, etc.)
    console.log('Pago procesado', payment);
  };

  return (
    <div className="cart-payment">
      <h1>Pago con Tarjeta</h1>
      <form onSubmit={handleSubmit}>
        {/* Formulario de pago */}
        <div>
          <label htmlFor="cardholderName">Nombre del Titular</label>
          <input
            type="text"
            id="cardholderName"
            value={payment.cardholderName}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            value={payment.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="expirationDate">Fecha de Expiración</label>
          <input
            type="text"
            id="expirationDate"
            placeholder="MM/YY"
            value={payment.expirationDate}
            onChange={(e) => handleInputChange('expirationDate', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={payment.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
          />
        </div>

        {/* Resumen del pago */}
        <div className="summary">
          <h3>Resumen</h3>
          <p>Total a Pagar: ${payment.amount.toFixed(2)}</p>
          <button type="submit">Pagar</button>
        </div>
      </form>
    </div>
  );
};

export default CartPayment;
