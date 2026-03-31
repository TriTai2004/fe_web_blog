import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../services/auth/get-me/type";
import { fetchUser } from "../services/auth/get-me/getMe";

interface AuthState {
    user: Account | null;
    isLoading: boolean;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isLoading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<Account>) => {
            state.user = action.payload;
            state.isLoading = false;

            localStorage.setItem("user", JSON.stringify(action.payload));
        },

        logout: (state) => {
            state.user = null;
            state.isLoading = false;

            localStorage.removeItem("user");
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<Account>) => {
                state.user = action.payload;
                state.isLoading = false;

                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(fetchUser.rejected, (state) => {
                state.user = null;
                state.isLoading = false;

                localStorage.removeItem("user");
            });

    }
});

export const { loginSuccess, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;