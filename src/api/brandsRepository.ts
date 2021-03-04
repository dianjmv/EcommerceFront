import BaseRepository from './repository/baseRepository';
import axios from 'axios';

import { IBrand } from '../interfaces/brand';

class BrandsRepository {
    private baseUrl = new BaseRepository();
    public getAllBrands() {
        const url = `${this.baseUrl.getBaseUrl()}/brands`;
        return axios.get<IBrand[]>(url);
    }
    public getBrandBySlug(slug: string) {
        const url = `${this.baseUrl.getBaseUrl()}/brands?slug=${slug}`;
        return axios.get<IBrand[]>(url);
    }
    public getCompanyBrands() {
        const url = `${this.baseUrl.getBaseUrl()}/brands`;
        return axios.get<IBrand[]>(url);
    }
}
export default BrandsRepository;
