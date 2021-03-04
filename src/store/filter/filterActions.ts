import { IFilterProduct } from '../../interfaces/filter';
import { ADD_FILTER, AddFilterActionType, RESET_FILTERS, ResetFiltersActionType } from './filterActionsType';

export function addFilter(filter: IFilterProduct): AddFilterActionType {
    return {
        type: ADD_FILTER,
        filter: filter,
    };
}
export function resetFilters(): ResetFiltersActionType {
    return {
        type: RESET_FILTERS,
    };
}
