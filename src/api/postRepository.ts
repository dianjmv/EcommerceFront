import BaseRepository from "./repository/baseRepository";
import axios from "axios";
import {IPost} from "../interfaces/post";
class PostRepository{
    private baseUrl = new BaseRepository();

    public getAllPosts(){
        const url = `${this.baseUrl.getBaseUrl()}/posts?_sort=created_at:DESC`;
        return axios.get<IPost[]>(url);
    }

    public getPostBySlug(slug:string){
        const url = `${this.baseUrl.getBaseUrl()}/posts?slug=${slug}`;
        return axios.get<IPost[]>(url);
    }

    public getPostsByTags(tags:string[]){
        const url = `${this.baseUrl.getBaseUrl()}/posts/blog-tags`;
        const tagsFilter = {
            "tags": tags
        }
        return axios.post<IPost[]>(url,tagsFilter)
    }
}
export default PostRepository;
