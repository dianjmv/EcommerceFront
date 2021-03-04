import { BrandStateType } from './brandType';
import { ADD_BRANDS, AddBrandsActionType } from './brandActionsType';
import { IBrand } from '../../interfaces/brand';
import { withClientState } from '../client';

function addBrand(state: BrandStateType, brands: IBrand[]): BrandStateType {
    return {
        brands: brands,
    };
}

const initialState: BrandStateType = {
    brands: [],
};
export const BRANDS_COMPANY_NAMESPACE = 'brandsCompany';

function brandsCompanyBaseReducer(state = initialState, action: AddBrandsActionType) {
    switch (action.type) {
        case ADD_BRANDS:
            return addBrand(state, action.brands);
        default:
            return state;
    }
}

const brandsCompanyReducer = withClientState(brandsCompanyBaseReducer, BRANDS_COMPANY_NAMESPACE);

export default brandsCompanyReducer;
