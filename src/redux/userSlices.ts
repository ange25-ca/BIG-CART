import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    idUsuario: string | null;
    username: string | null;
    email: string | null;
    // Agrega cualquier otro dato relevante del usuario
}

const initialState: UserState = {
    idUsuario: null,
    username: null,
    email: null,
    // Otros campos inicializados
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { idUsuario, username, email } = action.payload;
            state.idUsuario = idUsuario;
            state.username = username;
            state.email = email;
            // Agrega otros datos que quieras almacenar
        },
        clearUserId: (state) => {
            state.idUsuario = null;
            state.username = null;
            state.email = null;
            // Limpiar otros datos si es necesario
        },
    },
});

export const { setUser, clearUserId } = userSlice.actions;
export default userSlice.reducer;
