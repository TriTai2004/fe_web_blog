import axiosInstance from "../../../lib/axios";
import type { LoginRequest } from "./type";

const apiLogin = "/api/auth";



export const login = (data: LoginRequest)  =>{

    return axiosInstance.post(`${apiLogin}/login`, data);
}
