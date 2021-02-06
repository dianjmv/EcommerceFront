import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {ICategory} from "../interfaces/category";

const baseUrl = new BaseRepository();
export function getAllCategories(){
    const url = `${baseUrl.getBaseUrl()}/product-categories`;
    return axios.get<ICategory[]>(url);
}

export function getCategoriesBySlug(slug:string){
    const url = `${baseUrl.getBaseUrl()}/product-categories?slug=${slug}`;
    return axios.get<ICategory[]>(url);
}
