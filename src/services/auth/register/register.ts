import type { AxiosResponse } from "axios";
import type { RegisterRequest, RegisterResponse } from "./type";
import axiosInstance from "../../../lib/axios";

const api = "/api/auth";

export const RegisterService = (data: RegisterRequest): Promise<AxiosResponse<RegisterResponse>> =>{

    return axiosInstance.post(`${api}/register`, data);
}