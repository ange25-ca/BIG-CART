import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { updateField } from '../../../redux/paymentSlice';
import { z } from 'zod';
import '../assets/Styles/CartPayment.css';

// Importa la lógica de detección de tarjetas
import { validateCardType, cardIcons, CardType } from './validationCard';

const CartPayment: React.FC = () => {
  const dispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);

  // Estado local para errores
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  // Esquema de validación Zod
  const paymentSchema = z.object({
    cardNumber: z
      .string()
      .regex(/^\d{4} \d{4} \d{4} \d{4}$/, 'Número de tarjeta inválido')
      .refine((value) => value.replace(/\s/g, '').length === 16, {
        message: 'El numero de tarjeta debe tener como minimo 16 dígitos',
      }),
    expirationDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Fecha de expiración no es valida'),
    cvv: z.string().length(3, 'CVV no es valida'),
    cardholderName: z.string().min(1, 'El nombre del titular es obligatorio'),
  });

  // Validación de campos
  const validateFields = () => {
    const result = paymentSchema.safeParse(payment);
    if (!result.success) {
      const fieldErrors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      console.log('Pago procesado', payment);
    }
  };

  // Detectar el tipo de tarjeta
  const cardType: CardType = validateCardType(payment.cardNumber);
  const cardIcon = cardIcons[cardType];

  return (
    <div className="cart-payment">
      <div className="encabezadoPayment">
        <h1>Tarjeta de crédito o débito</h1>
        <div className="iconsCard">
          <img src={cardIcons.Visa} alt="Visa" />
          <img src={cardIcons.MasterCard} alt="MasterCard" />
          <img src={cardIcons.AmericanExpress} alt="AmericanExpress" />
          <img src={cardIcons.Discover} alt="Discover" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='cardNumber'>
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <input
            type="text"
            id="cardNumber"
            value={payment.cardNumber}
            placeholder="XXXX XXXX XXXX XXXX"
            style={{
              backgroundImage: `url(${cardIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',  
              backgroundSize: '45px',           
              paddingRight: '45px',                
              width: '100%',                       
              boxSizing: 'border-box',  
            }}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              const limitedValue = rawValue.slice(0, 16);
              const formattedValue = limitedValue.match(/.{1,4}/g)?.join(' ') || '';
              dispatch(updateField({ field: 'cardNumber', value: formattedValue }));
            }}
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </div>
        <div className="cardData">
          <div>
            <label htmlFor="expirationDate">Fecha de Expiración</label>
            <input
              type="text"
              id="expirationDate"
              value={payment.expirationDate}
              placeholder="MM/YY"
              maxLength={5}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 2) { value = value.slice(0, 2) + '/' + value.slice(2, 4);}
                if (value.length > 5) { value = value.slice(0, 5); }
                dispatch(updateField({ field: 'expirationDate', value }));
              }}
            />
            {errors.expirationDate && <p className="error">{errors.expirationDate}</p>}
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder='123'
              value={payment.cvv}
              maxLength={3}
              onChange={(e) =>
                dispatch(updateField({ field: 'cvv', value: e.target.value }))
              }
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="cardholderName">Nombre del Titular</label>
          <input
            type="text"
            id="cardholderName"
            placeholder='BigCart'
            value={payment.cardholderName}
            onChange={(e) =>
              dispatch(updateField({ field: 'cardholderName', value: e.target.value }))
            }
          />
          {errors.cardholderName && <p className="error">{errors.cardholderName}</p>}
        </div>
        <div className="buttonAction">
          <button type="submit">Pagar</button>
        </div>
      </form>
    </div>
  );
};

export default CartPayment;
