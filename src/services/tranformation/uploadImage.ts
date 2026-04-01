import axios from "axios";

const api = "/api/articles";

export const UploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); 

    const res = await axios.post(`${import.meta.env.VITE_API_URL}${api}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res;
};