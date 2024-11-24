import { configureStore } from "@reduxjs/toolkit";
import  productosReducer  from "./productosSlice";
import userReducer from "./userSlices";
import paymentReducer from "./paymentSlice";


const store = configureStore({
    reducer: {
        productos: productosReducer,
        user: userReducer,
        payment: paymentReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
