import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {IProduct} from "../interfaces/product";


class ProductsRepository{

    private baseUrl = new BaseRepository();

    public getAllProducts(){
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=updated_at:DESC`;
        return axios.get<IProduct[]>(url);

    }

    public getProductBySlug(slug:string){
        const url = `${this.baseUrl.getBaseUrl()}/products/?slug=${slug}&_sort=updated_at:DESC`;
        return axios.get<IProduct[]>(url);
    }

    public getProductsOrderByName(order:string){
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=title:${order}`;
        return axios.get<IProduct[]>(url);
    }

    public getProductsOrderByPrice(order:string){
        const url = `${this.baseUrl.getBaseUrl()}/products?_sort=sale_price:${order}`;
        return axios.get<IProduct[]>(url);
    }
}
export default ProductsRepository


