
import {IFilterValues, IListOptions} from '../../interfaces/list';
import {IProduct, IProductsList} from '../../interfaces/product';
import {IShopCategory} from '../../interfaces/category';
import {SHOP_NAMESPACE} from './shopTypes';
import {
    SHOP_FETCH_CATEGORY_SUCCESS,
    SHOP_FETCH_PRODUCTS_LIST_START,
    SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
    SHOP_INIT,
    SHOP_RESET_FILTERS,
    SHOP_SET_FILTER_VALUE,
    SHOP_SET_OPTION_VALUE,
    ShopFetchCategorySuccessAction,
    ShopFetchProductsListStartAction,
    ShopFetchProductsListSuccessAction,
    ShopInitAction,
    ShopResetFiltersAction,
    ShopSetFilterValueAction,
    ShopSetOptionValueAction,
    ShopThunkAction,
} from './shopActionTypes';
import ProductsRepository from "../../api/productsRepository";

let cancelPreviousCategoryRequest = () => {
};
let cancelPreviousProductsListRequest = () => {
};

export function shopInit(
    categorySlug: string | null,
    options: IListOptions = {},
    filters: IFilterValues = {},
): ShopInitAction {
    return {
        type: SHOP_INIT,
        categorySlug,
        options,
        filters,
    };
}

export function shopFetchCategorySuccess(category: IShopCategory | null): ShopFetchCategorySuccessAction {
    return {
        type: SHOP_FETCH_CATEGORY_SUCCESS,
        category,
    };
}

export function shopFetchProductsListStart(): ShopFetchProductsListStartAction {
    return {
        type: SHOP_FETCH_PRODUCTS_LIST_START,
    };
}

export function shopFetchProductsListSuccess(productsList: IProduct[]): ShopFetchProductsListSuccessAction {
    return {
        type: SHOP_FETCH_PRODUCTS_LIST_SUCCESS,
        productsList,
    };
}

export function shopResetFilters(): ShopResetFiltersAction {
    return {
        type: SHOP_RESET_FILTERS,
    };
}

export function shopSetOptionValue(option: string, value: string): ShopSetOptionValueAction {
    return {
        type: SHOP_SET_OPTION_VALUE,
        option,
        value,
    };
}

export function shopSetFilterValue(filter: string, value: string | null): ShopSetFilterValueAction {
    return {
        type: SHOP_SET_FILTER_VALUE,
        filter,
        value,
    };
}



export function shopFetchProductsListThunk(): ShopThunkAction<Promise<void>> {
    return async (dispatch, getState) => {
        let canceled = false;
        const productsRepository = new ProductsRepository()

        cancelPreviousProductsListRequest();
        cancelPreviousProductsListRequest = () => {
            canceled = true;
        };

        dispatch(shopFetchProductsListStart());

        const shopState = getState()[SHOP_NAMESPACE];

        let {filters} = shopState;

        if (shopState.categorySlug !== null) {
            filters = {...filters, category: shopState.categorySlug};
        }

        await productsRepository.getAllProducts().then(({data}) => (dispatch(shopFetchProductsListSuccess(data))));

        if (canceled) {
            return;
        }


    };
}

export function shopSetOptionValueThunk(option: string, value: string): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopSetOptionValue(option, value));
        await dispatch(shopFetchProductsListThunk());
    };
}

export function shopSetFilterValueThunk(filter: string, value: string | null): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopSetFilterValue(filter, value));
        await dispatch(shopFetchProductsListThunk());
    };
}

export function shopResetFiltersThunk(): ShopThunkAction<Promise<void>> {
    return async (dispatch) => {
        dispatch(shopResetFilters());
        await dispatch(shopFetchProductsListThunk());
    };
}


