import React, { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../context/Provider';
import { Spinner } from '@chakra-ui/react';

const MainLayout = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, mainLoading } = useContext(AuthContext);
    useEffect(() => {

        if (!user && !mainLoading) {
            navigate("/auth/login");
        }
    }, [user, mainLoading]);
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    }, [pathname]);
    if (mainLoading) {
        return <div className='min-h-[500px] flex justify-center items-center'>
            <Spinner />
        </div>;
    }
    if (user) {
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
    }
    return <div className='min-h-[500px] flex justify-center items-center'>
        <Spinner />
    </div>;
};

export default MainLayout;