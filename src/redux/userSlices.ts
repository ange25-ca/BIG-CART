import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definimos la interfaz del estado del usuario
export interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  profileImage: string | null;
}

// Estado inicial
const initialState: UserState = {
  idUsuario: '',
  address: '',
  email: '',
  username: '',
  phone: '',
  profileImage: localStorage.getItem('profileImage') || null, // Tomar el valor de localStorage si existe
};

// Definimos el slice de usuario
const userSlice = createSlice({
  name: 'user',

  initialState,
  
  reducers: {
    setUserIdOnly: (state, action: PayloadAction<string>) => {
      state.idUsuario = action.payload;  // Solo actualiza el idUsuario
    },

    setUserId: (state, action: PayloadAction<UserState>) => {
      // Actualiza el estado con los datos completos del usuario
      state.idUsuario = action.payload.idUsuario;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.profileImage = action.payload.profileImage;
      
      // Guardar en localStorage solo si profileImage tiene un valor válido
      if (action.payload.profileImage) {
        localStorage.setItem('imageUrl', action.payload.profileImage);
      }
    },

    logout: (state) => {
      // Restaura el estado a su valor inicial
      Object.assign(state, initialState);
      // Opcionalmente limpiar localStorage al cerrar sesión
      localStorage.removeItem('profileImage');
    },
  },
});

export const { setUserIdOnly, setUserId, logout } = userSlice.actions;

export default userSlice.reducer;
