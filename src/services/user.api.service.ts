import { RequestMethod } from "../lib/enum/requestMethod.enum";
import { axiosInstance } from "./axiosInstance";

export namespace UserApiService{
    
    export function getUsers(){
        return axiosInstance({
            method: RequestMethod.GET,
            url:'users',
        });
    }
    
};