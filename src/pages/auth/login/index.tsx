import { useState } from "react";
import usePost from "../../../hooks/usePost";
import { login } from "../../../services/auth/login/login";
import { loginSuccess } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const { refetch } = usePost(login);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();


    const validate = () => {
        return {
            email: !email ? "Email không được để trống" : "",
            password: !password ? "Mật khẩu không được để trống" : ""
        };
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);

        if (validationErrors.email || validationErrors.password) return;

        try {
            const data = await refetch({ email, password });

            dispatch(loginSuccess(data));

            navigate("/");


        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status == 401) {
                    toast.warning("Tài khoản hoặc mật khẩu không đúng!");
                }
            }
        }
    };

    const loginGG = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/oauth2/authorization/google`;
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">

                <div className="p-6 space-y-6">

                    <div className="flex items-center justify-center mb-4">
                        <span className="text-2xl font-semibold text-gray-900 dark:text-white">

                        </span>
                    </div>

                    <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
                        Đăng nhập
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
                            Đăng nhập
                        </button>


                        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                            Chưa có tài khoản?{" "}
                            <Link to={"/register"}
                                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Đăng ký
                            </Link>
                        </p>
                        <button onClick={() => loginGG()} type="button" className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800">
                            <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon"/>
                                Đăng nhập với google
                        </button>

                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;