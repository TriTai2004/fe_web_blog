import type { AxiosResponse } from "axios";
import { useState } from "react";

const usePost = <T, P>(func: (param: P) => Promise<AxiosResponse<T>>) => {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePost = async (params: P) => {
        try {
            setLoading(true);
            const res = await func(params);
            setData(res.data);
            
            return res.data
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                throw err;
            } else {
                setError("Something went wrong");
                throw new Error("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, refetch: handlePost }

}

export default usePost;