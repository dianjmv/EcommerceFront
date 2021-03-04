import { IProduct, ProductsPaginated } from '../../interfaces/product';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_PRODUCTS_PAGINATED = 'ADD_PRODUCTS_PAGINATED';

export interface AddProductsActionType {
    type: typeof ADD_PRODUCTS;
    products: IProduct[];
}

export type ProductActionsType = AddProductsActionType;
