import type { AxiosResponse } from "axios";
import axiosInstance from "../../lib/axios"
import { buildParams } from "../../utils/buildParams";
import type { Like } from "./type";

const api = "/api/likes";

export const getLike = (p: Record<string, unknown>): Promise<AxiosResponse<Like | null>> => {

    const params = buildParams(p);

    return axiosInstance.get(`${api}${params}`);
}

export const likeOrDislike = (p: Record<string, unknown>): Promise<AxiosResponse<Like>> => {

    return axiosInstance.post(`${api}`, p);
    
}