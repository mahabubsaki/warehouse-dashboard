import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/Provider';

const MainLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [user]);
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    }, [pathname]);

    return (
        <>
            <section className='App bg-[#f7faff] min-h-screen'>
                <section className='flex'>
                    <SideBar />
                    <div className='h-[2000px] w-full overflow-x-hidden ml-0 lg:ml-[315px] duration-500 px-[15px] sm:px-[30px] pt-[30px]'>
                        <Navbar />
                        <Outlet />
                    </div>
                </section>
            </section>

        </>

    );
};

export default MainLayout;