import { useAppAction, useAppSelector } from '../hooks';
import { companyAddInfo } from './companyActions';
import { COMPANY_INFO_NAMESPACE } from './companyReducer';

export const useCompanyInfo = () => useAppSelector(state => state[COMPANY_INFO_NAMESPACE]);
export const useCompanyAddInfo = () => useAppAction(companyAddInfo);
