import {IProduct} from "../../interfaces/product";

export const ADD_PRODUCTS = 'ADD_PRODUCTS';

export interface AddProductsActionType{
    type : typeof ADD_PRODUCTS;
    products : IProduct[]
}
