import axiosInstance from "../../lib/axios"
import { buildParams } from "../../utils/buildParams";
const api = "/api/articles"

export const getPosts = (params: Record<string, unknown>) =>{

    const filter = buildParams(params);
    
    return axiosInstance.get(`${api}/findAll${filter}`);
}
export const getPostsSlug = (slug: string) =>{

    return axiosInstance.get(`${api}/${slug}`);
}

export const getPostsPopular = (params: Record<string, unknown>) =>{

    const filter = buildParams(params);
    
    return axiosInstance.get(`${api}/findAll/popular${filter}`);
}

export const updateViews = (id: string) => {

    return axiosInstance.put(`${api}/views/${id}`);
}