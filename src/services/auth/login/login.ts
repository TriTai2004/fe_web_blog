import type { AxiosResponse } from "axios";
import axiosInstance from "../../../lib/axios";
import type { LoginRequest, LoginResponse } from "./type";

const apiLogin = "/api/auth";



export const login = (data: LoginRequest) : Promise<AxiosResponse<LoginResponse>> =>{

    return axiosInstance.post(`${apiLogin}/login`, data);
}
