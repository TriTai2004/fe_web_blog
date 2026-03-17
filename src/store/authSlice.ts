import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
}

// Lấy từ localStorage khi reload
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("accessToken");

const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    accessToken: savedToken || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;

            // Lưu lại khi login
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("accessToken", action.payload.accessToken);
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;

            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;