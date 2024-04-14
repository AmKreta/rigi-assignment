import { RequestMethod } from "../lib/enum/requestMethod.enum";
import { axiosInstance } from "./axiosInstance";

export namespace PostApiService{

    export function getPosts(page:number, limit:number){
        return axiosInstance({
            method: RequestMethod.GET,
            url:`posts?limit=${limit}&page=${page}`,
        });
    }

    export function getPostById(postId:string){
        return axiosInstance({
            method: RequestMethod.GET,
            url:`posts/${postId}`,
        });
    }

}