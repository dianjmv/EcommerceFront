import BaseRepository from "./repository/baseRepository";
import axios from "axios";

import {IBrand} from "../interfaces/brand";

const baseUrl = new BaseRepository();

export function getCompanyBrands(){
    const url = `${baseUrl.getBaseUrl()}/brands`;
    return axios.get<IBrand[]>(url);
}
