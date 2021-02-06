import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {ISegment} from "../interfaces/segment";

const baseUrl = new BaseRepository();
export function getAllSegments(){
    const url = `${baseUrl.getBaseUrl()}/segments`;
    return axios.get<ISegment[]>(url);
}

export function getSegmentBySlug(slug:string){
    const url = `${baseUrl.getBaseUrl()}/segments?slug=${slug}`;
    return axios.get<ISegment[]>(url);
}
