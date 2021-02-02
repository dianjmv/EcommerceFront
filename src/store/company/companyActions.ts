import {COMPANY_ADD_INFO, COMPANY_GET_INFO, CompanyAddInfoAction, CompanyGetInfoAction} from "./companyActionsType";
import {ICompanyInfo} from "../../interfaces/company-info";

export function companyAddInfo(info:ICompanyInfo):CompanyAddInfoAction{
    return {
        type: COMPANY_ADD_INFO,
        companyInfo: info
    };
}

export function getCompanyInfo():CompanyGetInfoAction{
    return {
        type: COMPANY_GET_INFO
    }
}
