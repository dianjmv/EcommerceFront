import { withClientState } from '../client';
import { IFilter, IFilterProduct } from '../../interfaces/filter';
import { ADD_FILTER, AddFilterActionType, FilterActionsType, RESET_FILTERS } from './filterActionsType';
import { IFilterProductType } from './filterType';

function addFilter(state: IFilterProductType, filter: IFilterProduct) {
    const newFilters: IFilterProduct[] = [];
    const filtersStates: IFilterProduct[] = state.filters;
    if (state.filters.length > 0) {
        let haveNew = false;
        filtersStates.map(filterState => {
            if (
                filterState.type.toLowerCase().trim() === filter.type.toLowerCase().trim() &&
                filterState.slug.toLowerCase().trim() === filter.slug.toLowerCase().trim()
            ) {
                filterState.value = filter.value;
                return filterState;
            } else {
                haveNew = true;
            }
        });
        if (haveNew) filtersStates.push(filter);
    } else {
        filtersStates.push(filter);
    }

    return {
        filters: filtersStates.filter(productFilter => productFilter.value),
    };
}

function resetFilters() {
    return {
        filters: [
            {
                type: 'price',
                slug: 'price',
                value: { min: 0, max: 999 },
            },
        ],
    };
}

const initialState: IFilterProductType = {
    filters: [
        {
            type: 'price',
            slug: 'price',
            value: { min: 0, max: 999 },
        },
    ],
};
export const FILTER_PRODUCT_NAMESPACE = 'filterProduct';

function filterProductBaseReducer(state = initialState, action: FilterActionsType) {
    switch (action.type) {
        case ADD_FILTER:
            return addFilter(state, action.filter);

        case RESET_FILTERS:
            return resetFilters();
        default:
            return state;
    }
}

const filterProductsReducer = withClientState(filterProductBaseReducer, FILTER_PRODUCT_NAMESPACE);

export default filterProductsReducer;
