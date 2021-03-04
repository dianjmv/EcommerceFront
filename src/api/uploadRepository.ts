import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {IProduct} from "../interfaces/product";
import {ImageBanner} from "../interfaces/imageBanner";

class UploadRepository  {
    private baseUrl = new BaseRepository();
    public uploadImage(file:any){
        const url = `${this.baseUrl.getBaseUrl()}/upload`;
        return axios.post<ImageBanner[]>(url, file, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

}
export default UploadRepository
