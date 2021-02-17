import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {ISegment} from "../interfaces/segment";



class SegmentRepository{
    private baseUrl = new BaseRepository();
    public getAllSegments(){
        const url = `${this.baseUrl.getBaseUrl()}/segments`;
        return axios.get<ISegment[]>(url);
    }
    public getSegmentBySlug(slug:string){
        const url = `${this.baseUrl.getBaseUrl()}/segments?slug=${slug}`;
        return axios.get<ISegment[]>(url);
    }
}
export default SegmentRepository;

