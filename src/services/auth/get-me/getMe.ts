import type { AxiosResponse } from "axios";
import axiosInstance from "../../../lib/axios";
import type { Account } from "./type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMe = (): Promise<AxiosResponse<Account>> => {

    const res = axiosInstance.get("/api/auth/me");

    return res;
};


import axios from "axios";

export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get("/api/accounts/me");
            console.log(res.data);
            
            return res.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                return thunkAPI.rejectWithValue(
                    err.response?.data || "Axios error"
                );
            }

            return thunkAPI.rejectWithValue("Unknown error");
        }
    }
);