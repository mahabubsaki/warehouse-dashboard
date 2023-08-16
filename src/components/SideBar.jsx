import React from 'react';
import SideLi from '../utilities/SideLi';
import { AiFillHome } from 'react-icons/ai';

const SideBar = () => {
    const navmenus = [{ name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }];
    return (
        <nav className='fixed sidebar duration-500 -left-72 lg:left-0 top-0  w-72 z-50  h-screen overflow-y-auto p-[30px]'>
            <div className='p-[20px] bg-white'>
                <img src="https://demo.dashboardpack.com/finance-html/img/logo.png" alt="" />
            </div>
            <div className='sidenav_main-container'>
                <ul className='my-[30px] sidenav_collapse-container'>
                    {
                        navmenus.map(item => <SideLi item={item} />)
                    }
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;