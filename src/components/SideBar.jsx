import React from 'react';
import SideLi from '../utilities/SideLi';
import { AiFillHome, AiOutlineAppstore } from 'react-icons/ai';
import { BiStoreAlt } from 'react-icons/bi';
import { GrAdd, GrAddCircle } from 'react-icons/gr';
import { FaClipboardList, FaShippingFast, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import { SlMagnifierRemove } from 'react-icons/sl';
import { BsCurrencyDollar, BsQrCode } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';


const SideBar = () => {
    const navmenus = [
        { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
        { name: 'Store', icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },
        { name: 'Warehouse', icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },
        { name: 'Customer', icon: <FaUserAlt className='inline' />, subitems: [{ name: "Add warehouse to customer", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-warehouse-to-customer" }, { name: "Add warehouse to customer", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },
        { name: 'Missing Items', icon: <SlMagnifierRemove className='inline' />, subitems: [{ name: "Add missing item", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-missing-item" }, { name: "Missing item list", icon: <FaClipboardList />, navigate: "/add-missing-item-list" },] },
        { name: 'ASIN/UPC', icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },
        { name: 'Ready to shipped', icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },
        { name: 'Price Avarage TAX', icon: <BsCurrencyDollar className='inline' />, subitems: [{ name: "Add price avarage tax", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-price-avarage-tax" }, { name: "Price avarage tax list", icon: <FaClipboardList />, navigate: "/price-avarage-tax-list" },] }
    ];
    return (
        <nav className='fixed sidebar duration-500 -left-72 lg:left-0 top-0  w-72 z-50  h-screen overflow-y-auto p-[30px]'>
            <div className='p-[20px] bg-white'>
                <img src="https://demo.dashboardpack.com/finance-html/img/logo.png" alt="" />
            </div>
            <div className='sidenav_main-container'>
                <ul className='my-[30px] capitalize sidenav_collapse-container'>
                    {
                        navmenus.map(item => <SideLi item={item} />)
                    }
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;