import React from 'react';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <section className='App bg-[#f7faff] min-h-screen'>
            <section className='flex'>
                <SideBar />
                <div className='h-[2000px] w-full ml-0 lg:ml-72 duration-500 px-[15px] sm:px-[30px] pt-[30px]'>
                    <Navbar />
                    <Outlet />
                </div>
            </section>
        </section>

    );
};

export default MainLayout;