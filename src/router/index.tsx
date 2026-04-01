import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import HomeAdmin from "../pages/admin/home";
import UserAdmin from "../pages/admin/user";
import ContentAdmin from "../pages/admin/content";
import MainClient from "./../layouts/mainLayout/index";
import Home from "../pages/client/home";
import PostDetail from "../pages/client/post-detail";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import CategoryPage from "../pages/client/category-post";
import Information from "../pages/client/account-infomation";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainClient />,
        children: [
            {
                index: true,
                path: "",
                element: <Home />
            },

            {
                index: true,
                path: "posts/:postSlug",
                element: <PostDetail />
            },
            {
                index: true,
                path: "category/:slugCategory",
                element: <CategoryPage />
            },
            {
                index: true,
                path: "/information",
                element: <Information />
            },

        ]
    },
    {
        path: "/login",
        element: <Login />,
        
    },
    {
        path: "/register",
        element: <Register />,
        
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                path: "dashboard",
                element: <HomeAdmin />
            },
            {
                path: "contents",
                element: <ContentAdmin />

            },
            {
                path: "users",
                element: <UserAdmin />

            }

        ]

    }
]);

export default router;