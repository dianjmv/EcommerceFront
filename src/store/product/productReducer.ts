import {IPorductState} from "./productTypes";
import {IProduct} from "../../interfaces/product";
import {ADD_PRODUCTS, AddProductsActionType} from "./productActionsType";
import {withClientState} from "../client";


function addProduct(state: IPorductState, products: IProduct[]){
    return ({
        products: products
    })
}
const initialState:IPorductState ={
    products: []
}

export const PRODUCT_NAME_SPACE = 'productsAvailable';


function productsBaseReducer(state = initialState, action: AddProductsActionType) {

    switch (action.type) {
        case ADD_PRODUCTS:
            return addProduct(state, action.products);
        default:
            return state;
    }
}

const productReducer = withClientState(productsBaseReducer, PRODUCT_NAME_SPACE);

export default productReducer;
