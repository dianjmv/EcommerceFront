import {IProduct} from "../../interfaces/product";
import {ADD_PRODUCTS, AddProductsActionType} from "./productActionsType";

export function addProducts(products:IProduct[]):AddProductsActionType{
    return {
        type: ADD_PRODUCTS,
        products: products
    }
}
