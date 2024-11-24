import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardholderName: string;
  error: string | null; // Solo almacena errores, no los calcula
}

const initialState: PaymentState = {
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  cardholderName: '',
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof PaymentState; value: string }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Permite establecer un mensaje de error
    },
  },
});

export const { updateField, setError } = paymentSlice.actions;
export default paymentSlice.reducer;
