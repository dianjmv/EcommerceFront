import BaseRepository from "./repository/baseRepository";
import axios from "axios";

import {IBrand} from "../interfaces/brand";

const baseUrl = new BaseRepository();
export function getAllBrands(){
    const url = `${baseUrl.getBaseUrl()}/brands`;
    return axios.get<IBrand[]>(url);
}

export function getBrandBySlug(slug:string){
    const url = `${baseUrl.getBaseUrl()}/brands?slug=${slug}`;
    return axios.get<IBrand[]>(url);
}
