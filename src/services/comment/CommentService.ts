import axiosInstance from "../../lib/axios"
import { buildParams } from "../../utils/buildParams";
import type { CommentRequest } from "./type";

const api = "/api/comments"

export const postComment = (data: CommentRequest) => {

    return axiosInstance.post(`${api}`, data);

}
export const getComment = (params: Record<string, unknown>) => {

    const filter = buildParams(params);

    return axiosInstance.get(`${api}/findAll${filter}`);

}

export const likeComment = ({ commentId }: { commentId: string }) => {

    const res = axiosInstance.post(`/api/like-comments`, { commentId });

    return res;

}