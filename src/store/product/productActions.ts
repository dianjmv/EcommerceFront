import { IProduct, ProductsPaginated } from '../../interfaces/product';
import { ADD_PRODUCTS, ADD_PRODUCTS_PAGINATED, AddProductsActionType } from './productActionsType';

export function addProducts(products: IProduct[]): AddProductsActionType {
    return {
        type: ADD_PRODUCTS,
        products: products,
    };
}
