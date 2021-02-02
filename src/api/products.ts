import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {IProduct} from "../interfaces/product";

const baseUrl = new BaseRepository();

export function getProductsApi(){
    const url = `${baseUrl.getBaseUrl()}/products`;
    return axios.get<IProduct[]>(url);
}
