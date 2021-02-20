import {IPorductState} from "./productTypes";
import {IProduct, ProductsPaginated} from "../../interfaces/product";
import {ADD_PRODUCTS, ADD_PRODUCTS_PAGINATED, AddProductsActionType, ProductActionsType} from "./productActionsType";
import {withClientState} from "../client";


function addProduct(state: IPorductState, products: IProduct[]){
    return ({
        products: products
    })
}

function addProductPaginated(state:IPorductState, elementsPerPAge:number, products:ProductsPaginated[]){
    return({
        elementsPerPAge:elementsPerPAge,
        products:products
    })
}



const initialState:IPorductState ={
    products: []
}

export const PRODUCT_NAME_SPACE = 'productsAvailable';


function productsBaseReducer(state = initialState, action: ProductActionsType) {

    switch (action.type) {
        case ADD_PRODUCTS:
            return addProduct(state, action.products);
        default:
            return state;

    }
}

const productReducer = withClientState(productsBaseReducer, PRODUCT_NAME_SPACE);

export default productReducer;
