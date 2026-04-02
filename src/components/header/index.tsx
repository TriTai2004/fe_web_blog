import React, { useEffect, useRef, useState } from "react";
import { BiSearch, BiUser, BiMenu } from "react-icons/bi";
import useGet from "../../hooks/useFetch";
import { getCategory } from "../../services/category/categoryService";
import "./stype.css"
import { Link, useNavigate } from "react-router-dom";
import type { Category } from "../../services/category/type";
import { getPosts } from "../../services/post/postService";
import type { Post } from "../../services/post/type";
import usePost from "../../hooks/usePost";
import { Logout } from "../../services/auth/logout";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
const Header = React.memo(() => {

    const [search, setSearch] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [data, setData] = useState<{ data: Category[] } | null>(null);
    const [keyword, setKeyword] = useState("");
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [show, setShow] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user)


    const { refetch } = useGet(getCategory);

    const { refetch: fetchPosts } = useGet(getPosts);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const { refetch: logoutAccount } = usePost(Logout);


    const fetchCategory = async () => {
        try {
            if (data) {
                return;
            }
            const res = await refetch({});
            setData(res);

        } catch (error) {
            console.error(error);
        }
    }

    const timeout = useRef<number | undefined>(undefined);

    useEffect(() => {
        clearTimeout(timeout.current);

        if (!keyword) {
            setPosts(null);
            setLoadingPosts(false);
            return;
        }

        setLoadingPosts(true);

        timeout.current = window.setTimeout(async () => {
            try {
                const res = await fetchPosts({ page: 0, size: 5, search: keyword });
                setPosts(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingPosts(false);
            }
        }, 900);

    }, [keyword]);

    const backHome = () => {
        navigate("/");
    }

    const handleLogout = async () => {
        try {
            const res = await logoutAccount({});
            dispatch(logout());
            console.log(res);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <header className="bg-gray-900 shadow-md">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4">

                    {/* Logo */}
                    <div onClick={() => backHome()} className="flex items-center gap-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                            <img
                                src="https://lh3.googleusercontent.com/ogw/AF2bZyhjveqDqJ3rTnZn5fOdx6Z21kFmkRkZ8d1yICvN3hYbMg=s32-c-mo"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <span className="text-white font-semibold text-lg">
                            MyBlog
                        </span>
                    </div>

                    {/* Search desktop */}
                    {search && (
                        <div className="flex-1 px-10 hidden md:block">
                            <div className="relative">
                                <input
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value.trim())}
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="w-full rounded-lg bg-gray-800 text-white px-4 py-2 pl-10 outline-none border border-gray-700 focus:border-blue-500"
                                />
                                <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                {keyword && (
                                    <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">

                                        {!loadingPosts ? (
                                            <ul className="max-h-60 overflow-y-auto">
                                                {posts && posts?.length > 0 ? (
                                                    posts.map((p) => (
                                                        <li onClick={() => setKeyword("")} key={p.id}>
                                                            <Link
                                                                to={`/posts/${p.slug}`}
                                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                                            >
                                                                {p.title}
                                                            </Link>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className="px-4 py-3 text-sm text-gray-500">
                                                        Không tìm thấy bài viết
                                                    </li>
                                                )}
                                            </ul>
                                        ) : (
                                            <div className="py-3 flex items-center justify-center">
                                                <span className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                                                <span className="mx-2 text-sm text-gray-400">Đang tìm kiếm....</span>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>

                        </div>

                    )}


                    {/* Actions */}
                    <div className="flex items-center gap-4 text-white">

                        {/* search */}
                        <button
                            onClick={() => setSearch(!search)}
                            className="hover:text-blue-400"
                        >
                            <BiSearch size={24} />
                        </button>

                        {/* category */}
                        <button
                            onClick={() => {
                                fetchCategory();
                                setCategoryOpen(!categoryOpen);
                            }}
                            className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-700"
                        >
                            <BiMenu />
                            <span className="hidden md:block">Danh mục</span>
                        </button>

                        {/* user */}
                        <div className=" relative">
                            <BiUser onClick={() => setShow(!show)} size={26} />
                            {show && (
                                <div className="absolute end-0 py-2 z-10 w-40 shadow-sm">
                                    <ul className="bg-white rounded text-gray-950">
                                        {user && (
                                            <li onClick={() => {
                                                navigate("/information");
                                                setShow(!show);
                                            }} className="cursor-pointer hover:bg-gray-100 transition-all p-2 text-center">
                                                Thông tin
                                            </li>
                                        )}

                                        {user ? (
                                            <li onClick={() => {
                                                handleLogout();
                                                navigate("/login");
                                                setShow(!show);
                                            }} className="cursor-pointer hover:bg-gray-100 transition-all p-2 text-center">
                                                Đăng xuất
                                            </li>
                                        ) : (
                                            <li
                                                onClick={() => {
                                                    navigate("/login");
                                                    setShow(!show);
                                                }}
                                                className="cursor-pointer hover:bg-gray-100 transition-all p-2 text-center">
                                                Đăng nhập
                                            </li>
                                        )}

                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </header>

            {/* SEARCH MOBILE */}
            {search && (
                <div className="md:hidden bg-gray-900 px-4 pb-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full rounded-lg bg-gray-800 text-white px-4 py-2 pl-10 outline-none border border-gray-700"
                        />
                        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        {keyword && (
                            <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">

                                {!loadingPosts ? (
                                    <ul className="max-h-60 overflow-y-auto">
                                        {posts && posts?.length > 0 ? (
                                            posts.map((p) => (
                                                <li onClick={() => setKeyword("")} key={p.id}>
                                                    <Link
                                                        to={`/posts/${p.slug}`}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                                                    >
                                                        {p.title}
                                                    </Link>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="px-4 py-3 text-sm text-gray-500">
                                                Không tìm thấy bài viết
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <div className="py-3 flex items-center justify-center">
                                        <span className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
                                        <span className="mx-2 text-sm text-gray-400">Đang tìm kiếm....</span>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CATEGORY */}
            {categoryOpen && (
                <div className="bg-gray-800 border-t border-gray-700">
                    {data && (
                        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-4 text-white">
                            {data.data.map((c: Category) => (
                                <Link
                                    key={c.id}
                                    to={`/category/${c.slug}`}
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    className="hover:text-blue-400 cursor-pointer text-center"
                                >
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    )}

                </div>
            )}
        </>
    );
});

export default Header;