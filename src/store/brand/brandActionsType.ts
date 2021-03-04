import { IBrand } from '../../interfaces/brand';

export const ADD_BRANDS = 'ADD_BRANDS';

export interface AddBrandsActionType {
    type: typeof ADD_BRANDS;
    brands: IBrand[];
}
