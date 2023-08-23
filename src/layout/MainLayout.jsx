import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    const { pathname } = useLocation();
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
            <Toaster />
        </>

    );
};

export default MainLayout;