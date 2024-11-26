import { AppDispatch } from "../redux/store";
import { fetchCarrito } from "../redux/cartSlice";

 export const verCart =() => async (dispatch: AppDispatch) => {
    dispatch(fetchCarrito());
 }