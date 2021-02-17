// application
import { ICategory } from '../../interfaces/category';
import { IFilterValues, IListOptions } from '../../interfaces/list';
import {IProduct, IProductsList} from '../../interfaces/product';

export const SHOP_NAMESPACE = 'shop';

export interface ShopState {
    init: boolean;
    categorySlug: string | null;
    categoryIsLoading: boolean;
    category: ICategory | null;
    productsListIsLoading: boolean;
    productsList: IProduct[] | null;
    options: IListOptions;
    filters: IFilterValues;
}
