import BaseRepository from './repository/baseRepository';
import axios from "axios";
import {ICompanyInfo} from "../interfaces/company-info";
import {IBanners} from "../interfaces/banners";


const baseUrl = new BaseRepository();
class CompanyRepository{
    public getCompanyInfo(){
        const url = `${baseUrl.getBaseUrl()}/company-informations`
        return axios.get<ICompanyInfo[]>(url)
    }
}
export default CompanyRepository






export function getCompanyBanners() {
    const url = `${baseUrl.getBaseUrl()}/banners`
    return axios.get<IBanners[]>(url)
}

