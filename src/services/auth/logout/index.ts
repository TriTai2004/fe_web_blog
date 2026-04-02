import axiosInstance from "../../../lib/axios"

const api = "/api/auth"

export const Logout = () => {

    return axiosInstance.post(`${api}/logout`, {});
    
}