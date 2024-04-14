import axios from "axios";
import { rootApiUrl } from "./rootApiUrl";

export const axiosInstance = axios.create({
    baseURL: rootApiUrl,
    headers: {
      'Authorization': ``
    },
});