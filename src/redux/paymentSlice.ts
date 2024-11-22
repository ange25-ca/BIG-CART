import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir la estructura del estado de pago
interface PaymentState {
  cardholderName: string;  // Nombre del titular de la tarjeta
  cardNumber: string;      // Número de la tarjeta
  expirationDate: string;  // Fecha de expiración (MM/AA)
  cvv: string;             // Código de seguridad (CVV)
  amount: number;          // Monto a pagar
}

// Estado inicial con valores vacíos o predeterminados
const initialState: PaymentState = {
  cardholderName: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  amount: 0,
};

// Crear el slice de pago
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    // Acción para actualizar cualquier campo del estado de pago
    updateField: (
      state,
      action: PayloadAction<{ field: keyof PaymentState; value: string | number }>
    ) => {
      //const { field, value } = action.payload;
      // Actualizar el campo dinámico en el estado
      //state[field] = value as PaymentState[keyof PaymentState];
    },
    // Acción para restablecer el estado de pago
    resetPayment: () => initialState,
  },
});

// Exportar las acciones generadas
export const { updateField, resetPayment } = paymentSlice.actions;

// Exportar el reducer del slice
export default paymentSlice.reducer;
