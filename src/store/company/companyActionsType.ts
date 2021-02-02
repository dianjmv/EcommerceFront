import {ICompanyInfo} from "../../interfaces/company-info";

export const COMPANY_ADD_INFO = 'COMPANY_ADD_INFO';
export const COMPANY_GET_INFO = 'COMPANY_GET_INFO';


export interface CompanyAddInfoAction{
    type : typeof COMPANY_ADD_INFO,
    companyInfo: ICompanyInfo
}

export interface CompanyGetInfoAction{
    type: typeof COMPANY_GET_INFO
}
