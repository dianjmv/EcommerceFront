import { useAppAction, useAppSelector } from '../hooks';
import { BRANDS_COMPANY_NAMESPACE } from './brandReducer';
import { addCompanyBrands } from './brandActions';

export const useBrandCompany = () => useAppSelector(state => state[BRANDS_COMPANY_NAMESPACE]);
export const useAddBrandCompany = () => useAppAction(addCompanyBrands);
