import { IFilterProduct } from '../../interfaces/filter';

export const ADD_FILTER = 'ADD_FILTER';
export const RESET_FILTERS = 'RESET_FILTERS';

export interface AddFilterActionType {
    type: typeof ADD_FILTER;
    filter: IFilterProduct;
}

export interface ResetFiltersActionType {
    type: typeof RESET_FILTERS;
}

export type FilterActionsType = AddFilterActionType | ResetFiltersActionType;
