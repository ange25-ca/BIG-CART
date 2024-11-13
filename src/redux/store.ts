import { configureStore } from "@reduxjs/toolkit";
import  productosReducer  from "./productosSlice";

const store = configureStore({
    reducer: {
        productos: productosReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;