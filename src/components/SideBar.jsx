import React, { useContext } from 'react';
import SideLi from '../utilities/SideLi';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiStoreAlt } from 'react-icons/bi';
import { FaClipboardList, FaShippingFast, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import { SlMagnifierRemove } from 'react-icons/sl';
import { BsCurrencyDollar, BsQrCode } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AuthContext } from '../context/Provider';


const SideBar = () => {
    const list = [
        { name: 'Store', role: "storeManager", icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },
        { name: 'Store', role: "warehouseManager", icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },

        { name: 'ASIN/UPC', role: "storeManager", icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },
        { name: 'ASIN/UPC', role: "warehouseManager", icon: <BsQrCode className='inline' />, subitems: [{ name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },

        { name: 'Warehouse', role: "storeManager", icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },
        { name: 'Warehouse', role: "warehouseManager", icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },

        { name: 'Customer', role: "storeManager", icon: <FaUserAlt className='inline' />, subitems: [{ name: "Add warehouse to customer", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-warehouse-to-customer" }, { name: "Warehouse to customer list", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },

        { name: 'Customer', role: "warehouseManager", icon: <FaUserAlt className='inline' />, subitems: [{ name: "Warehouse to customer list", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },

        { name: 'Ready to shipped', role: "warehouseManager", icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },
        { name: 'Ready to shipped', role: "storeManager", icon: <FaShippingFast className='inline' />, subitems: [{ name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },


        { name: 'Price Avarage TAX', role: "storeManager", icon: <BsCurrencyDollar className='inline' />, subitems: [{ name: "Add price avarage tax", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-price-avarage-tax" }, { name: "Price avarage tax list", icon: <FaClipboardList />, navigate: "/price-avarage-tax-list" },] },

        { name: 'Price Avarage TAX', role: "warehouseManager", icon: <BsCurrencyDollar className='inline' />, subitems: [{ name: "Price avarage tax list", icon: <FaClipboardList />, navigate: "/price-avarage-tax-list" },] }
    ];
    const { user } = useContext(AuthContext);
    const otherRoutes = user.role == 'admin' ? [...list] : [...list].filter(item => item.role == user.role);

    const navmenus = [
        { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
        ...otherRoutes
    ];
    return (
        <nav className='fixed sidebar duration-500 -left-[315px] lg:left-0 top-0  w-[315px] z-50  h-screen overflow-y-auto p-[30px]'>
            <div className='p-[20px] bg-white'>
                <h1 className='text-4xl text-center text-[#805ad5]'>Fulfilbiz</h1>
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