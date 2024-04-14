import { RequestMethod } from "../lib/enum/requestMethod.enum";
import { axiosInstance } from "./axiosInstance";

export namespace PostApiService{

    export function getPosts(){
        return axiosInstance({
            method: RequestMethod.GET,
            url:'posts',
        });
    }

    export function getPostById(postId:string){
        return axiosInstance({
            method: RequestMethod.GET,
            url:`posts/${postId}`,
        });
    }

}