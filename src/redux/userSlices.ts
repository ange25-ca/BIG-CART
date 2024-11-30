import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  idUsuario: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  profileImage: string | null;
}

const initialState: UserState = {
  idUsuario: '',
  address: '',
  email: '',
  username: '',
  phone: '',
  profileImage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<UserState>) => {
      state.idUsuario = action.payload.idUsuario;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.profileImage = action.payload.profileImage;
    },
    logout: (state) => {
      // Restaura el estado a su inicial
      Object.assign(state, initialState);
    },
  },
});

export const { setUserId, logout } = userSlice.actions;

export default userSlice.reducer;
