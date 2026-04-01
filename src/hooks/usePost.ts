import { isAxiosError, type AxiosResponse } from "axios";
import { useState } from "react";

const usePost = <T, P>(func: (param: P) => Promise<AxiosResponse<T>>) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePost = async (params: P) => {
        try {
            setLoading(true);
            const res = await func(params);
            setData(res.data);

            return res.data
        } catch (err) {
            if (isAxiosError(err)) {
                throw {
                    status: err.response?.status,
                    data: err.response?.data,
                    message: err.message
                };
            }

            if (err instanceof Error) {
                throw { message: err.message };
            }

            throw { message: "Something went wrong" };

        } finally {
            setLoading(false);
        }
    }

    return { data, loading, refetch: handlePost }

}

export default usePost;