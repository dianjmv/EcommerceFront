import {useAppAction, useAppSelector} from "../hooks";
import {addProducts} from "./productActions";
import {PRODUCT_NAME_SPACE} from "./productReducer";

export const useProductsAvailable = () => useAppSelector((state) => {
    return state[PRODUCT_NAME_SPACE];
});
export const useAddProducts = () => useAppAction(addProducts);
