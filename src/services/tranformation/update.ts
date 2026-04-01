import axios from "axios"

const api = "/api/accounts";

export const updateInformation = async ({ file, fullname }: { file: File, fullname: string }) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fullname", fullname);

    const res = await axios.put(`${import.meta.env.VITE_API_URL}${api}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true 


    });

    return res;

}