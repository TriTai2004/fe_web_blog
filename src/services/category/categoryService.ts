import axiosInstance from "../../lib/axios";
import { buildParams } from "../../utils/buildParams";

const api = "api/categories";

export const getCategory = (params: Record<string, unknown>) =>{

    const filter = buildParams(params);
    
    return axiosInstance.get(`${api}/findAll${filter}`);
}