import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import usePost from "../../../hooks/usePost";
import { RegisterService } from "../../../services/auth/register/register";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import { loginSuccess, logout } from "../../../store/authSlice";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [errors, setErrors] = useState<{ email?: string, password?: string, confirm?: string }>({});

    const navigate = useNavigate();

    const { refetch } = usePost(RegisterService);

    const dispatch = useDispatch<AppDispatch>();

    const validate = () => {
        return {
            email: email ? "" : "Email không được để trống!",
            password: password ? "" : "Mật khẩu không được để trống!",
            confirm: validateConfirm()


        }
    }

    const validateConfirm = () => {
        if (!confirm) {
            return "Xác nhận mật khẩu không được để trống!";
        } else if (confirm !== password) {
            return "Xác nhận mật khẩu không chính xác!";
        } else {
            return "";
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validateErrors = validate();
        setErrors(validateErrors);
        if (validateErrors.email || validateErrors.password || validateErrors.confirm) return;

        try {
            const data = await refetch({ email: email, password: password });


            dispatch(logout());

            dispatch(loginSuccess(data));

            navigate("/");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.warning(error?.response?.data);
            } else {
                toast.error("Có lỗi xảy ra!");
            }
        }
    }

    const registerGG = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
    }

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">

                    <div className="p-6 space-y-6">

                        <div className="flex items-center justify-center mb-4">
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">

                            </span>
                        </div>

                        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                            Đăng ký
                        </h1>

                        <form className="space-y-4" onSubmit={handleSubmit}>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors(prev => (
                                            {
                                                ...prev,
                                                email: ""
                                            }
                                        ))
                                    }}
                                    id="email"
                                    className={`w-full p-2.5 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                                        ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`
                                    }
                                    placeholder="name@company.com"
                                />
                                {errors.email &&
                                    <span className="text-red-500 text-sm">{errors.email}</span>
                                }
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrors(prev => ({
                                            ...prev,
                                            password: ""
                                        }))
                                    }}
                                    id="password"
                                    placeholder="••••••••"
                                    className={`w-full p-2.5 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                                    ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`
                                    }
                                />
                                {errors.password &&
                                    <span className="text-red-500 text-sm">{errors.password}</span>
                                }
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    name="confirm"
                                    value={confirm}
                                    onChange={(e) => {
                                        setConfirm(e.target.value);
                                        setErrors(prev => ({
                                            ...prev,
                                            confirm: ""
                                        }))
                                    }}
                                    id="confirm"
                                    placeholder="••••••••"
                                    className={`w-full p-2.5 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                                    ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`
                                    }

                                />
                                {errors.confirm &&
                                    <span className="text-red-500 text-sm">{errors.confirm}</span>
                                }
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <Link
                                    to={"/forget"}
                                    className="text-blue-600 hover:underline dark:text-blue-400 ml-auto"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Đăng ký
                            </button>
                            <button onClick={() => registerGG()} type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
                                <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                                Đăng nhập với google
                            </button>
                            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                                Đã có tài khoản?{" "}
                                <Link to={"/login"}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Đăng nhập
                                </Link>
                            </p>


                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;