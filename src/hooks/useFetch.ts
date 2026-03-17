import { useState, useCallback } from "react";
import type { AxiosResponse } from "axios";

const useGet = <T, P>(
    func: (params: P) => Promise<AxiosResponse<T>>,
) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (params: P) => {

        setLoading(true);
        setError(null);

        try {
            const res = await func(params);
            setData(res.data);
            return res.data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }, [func]);


    return {
        data,
        loading,
        error,
        refetch: fetchData
    };
};

export default useGet;