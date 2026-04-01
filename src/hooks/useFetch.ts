import { useState, useCallback } from "react";
import { isAxiosError, type AxiosResponse } from "axios";

const useGet = <T, P>(
    func: (params: P) => Promise<AxiosResponse<T>>,) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async (params: P) => {

        setLoading(true);

        try {
            const res = await func(params);
            setData(res.data);
            return res.data;
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
    }, [func]);


    return {
        data,
        loading,
        refetch: fetchData
    };
};

export default useGet;