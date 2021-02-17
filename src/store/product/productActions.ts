import {IProduct, ProductsPaginated} from "../../interfaces/product";
import {
    ADD_PRODUCTS,
    ADD_PRODUCTS_PAGINATED,
    AddProductsActionType,
    AddProductsPaginatedType
} from "./productActionsType";
import products from "../../fake-server/database/products";

export function addProducts(products:IProduct[]):AddProductsActionType{
    return {
        type: ADD_PRODUCTS,
        products: products
    }
}

export function addProductsPaginated(productsPaginated:ProductsPaginated[], elementsPerPage:number):AddProductsPaginatedType{
    return{
        type:ADD_PRODUCTS_PAGINATED,
        products:productsPaginated,
        elementsPerPage:elementsPerPage
    }
}

