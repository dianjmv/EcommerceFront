import { IBrand } from '../../interfaces/brand';
import { ADD_BRANDS, AddBrandsActionType } from './brandActionsType';

export function addCompanyBrands(brands: IBrand[]): AddBrandsActionType {
    return {
        type: ADD_BRANDS,
        brands: brands,
    };
}
