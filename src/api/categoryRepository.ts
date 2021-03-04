import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {ICategory} from "../interfaces/category";




class CategoryRepository{
    private baseUrl = new BaseRepository();

    public getAllCategories(){
        const url = `${this.baseUrl.getBaseUrl()}/product-categories`;
        return axios.get<ICategory[]>(url);
    }
    public getCategoriesBySlug(slug:string){
        const url = `${this.baseUrl.getBaseUrl()}/product-categories?slug=${slug}`;
        return axios.get<ICategory[]>(url);
    }
    public getCategoriesMostSeller(){
        const url = `${this.baseUrl.getBaseUrl()}/most-sellers/categories`
        return axios.get<ICategory[]>(url);
    }
}
export default CategoryRepository;
