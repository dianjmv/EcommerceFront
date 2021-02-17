import {useAppAction, useAppSelector} from "../hooks";

import {FILTER_PRODUCT_NAMESPACE} from "./filterReducer";
import {addFilter, resetFilters} from "./filterActions";

export const useFilterProduct = () => useAppSelector((state) => state[FILTER_PRODUCT_NAMESPACE]);
export const useAddFilterProduct = () => useAppAction(addFilter);
export const useResetFilters = ()=>useAppAction(resetFilters);
