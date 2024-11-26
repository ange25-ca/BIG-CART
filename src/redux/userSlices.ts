import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idUsuario:null
}

const userSlice = createSlice({
    name: 'username',
    initialState,
        reducers: {
            setUserId: (state, action) => {
                state.idUsuario = action.payload;
            },
            clearUserId: (state) => {
                state.idUsuario = null
            }
        }
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;