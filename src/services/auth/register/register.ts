import type { RegisterRequest } from "./type";
import axiosInstance from "../../../lib/axios";

const api = "/api/auth";

export const RegisterService = (data: RegisterRequest) =>{

    return axiosInstance.post(`${api}/register`, data);
}