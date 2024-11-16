import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    idUsuaurio:null
}

const userSlice = createSlice({
    name: 'username',
    initialState,
        reducers: {
            setUserId: (state, action) => {
                state.idUsuaurio = action.payload;
            },
            clearUserId: (state) => {
                state.idUsuaurio = null
            }
        }
});

export const { setUserId, clearUserId } = userSlice.actions;
export default userSlice.reducer;