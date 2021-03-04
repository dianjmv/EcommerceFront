import BaseRepository from './repository/baseRepository';
import axios from 'axios';
import { IProduct } from '../interfaces/product';
import { IFilter, IFilterProduct } from '../interfaces/filter';
import { ICategory } from '../interfaces/category';
import { IUser } from '../interfaces/user';
export interface IProductSeller {
    id: number;
    quantity: number;
    product: IProduct;
}
export interface IMostSellerProduct {
    id: number;
    total_price: number;
    user: IUser;
    created_at: string;
    updated_at: string;
    products: IProductSeller[];
}

class ProductsRepository {
    private baseUrl = new BaseRepository();

    public getAllProducts() {
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=updated_at:DESC`;
        return axios.get<IProduct[]>(url);
    }

    public getProductBySlug(slug: string) {
        const url = `${this.baseUrl.getBaseUrl()}/products/?slug=${slug}&_sort=updated_at:DESC`;
        return axios.get<IProduct[]>(url);
    }

    public getProductsOrderByName(order: string) {
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=title:${order}`;
        return axios.get<IProduct[]>(url);
    }

    public getProductsOrderByPrice(order: string) {
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=sale_price:${order}`;
        return axios.get<IProduct[]>(url);
    }

    public getProductsFiltered(filter: IFilterProduct[]) {
        const url = `${this.baseUrl.getBaseUrl()}/products-filtered`;
        const data = { filters: filter };
        return axios.post<IProduct[]>(url, data);
    }
    public getProductsMostSeller() {
        const url = `${this.baseUrl.getBaseUrl()}/most-sellers`;
        return axios.get<IMostSellerProduct[]>(url);
    }
}
export default ProductsRepository;
