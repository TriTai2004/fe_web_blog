import { Outlet } from "react-router-dom";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../services/auth/get-me/getMe";
import { useEffect } from "react";
import type { AppDispatch } from "../../store/store";

const MainClient = () =>{

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
         dispatch(fetchUser());
    }, []);

    return (
        <>
            <Header/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}

export default MainClient;