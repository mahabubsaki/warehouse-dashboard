import React, { useContext } from 'react';
import SideLi from '../utilities/SideLi';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiStoreAlt } from 'react-icons/bi';
import { FaClipboardList, FaShippingFast, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import { SlMagnifierRemove } from 'react-icons/sl';
import { BsCurrencyDollar, BsQrCode } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AuthContext } from '../context/Provider';
import { RiAddCircleFill } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import logo from '../assets/logo.png';
import { VscTasklist } from 'react-icons/vsc';

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

    ];
    const { user } = useContext(AuthContext);

    const otherRoutes = (user.role == 'admin' || user.role == 'warehouseAdmin') ? [
        { name: 'Store', role: "storeManager", icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },


        { name: 'ASIN/UPC', role: "storeManager", icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },


        { name: 'Warehouse', role: "storeManager", icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },


        { name: 'Customer', role: "storeManager", icon: <FaUserAlt className='inline' />, subitems: [{ name: "Add warehouse to customer", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-warehouse-to-customer" }, { name: "Warehouse to customer list", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },





    ] : [...list].filter(item => item.role == user.role);


    let navmenus = [
        { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
        ...otherRoutes
    ];
    if (user.role == 'admin') {
        navmenus = [...navmenus, { name: 'Add Warehouse', icon: <RiAddCircleFill className='inline' />, navigate: "/add-warehouse", role: 'admin' }, { name: 'All Warehouses', icon: <VscTasklist className='inline text-xl' />, navigate: "/all-warehouse", role: 'admin' }];
    } else {
        navmenus = [...navmenus, { name: 'Managed Warehouse', icon: <MdManageAccounts className='inline' />, navigate: "/manage-warehouse" },];
    }
    return (
        <nav className='fixed sidebar duration-500 -left-[315px] lg:left-0 top-0  w-[315px] z-50  h-screen overflow-y-auto p-[30px]'>
            <div>
                <h1 className='text-2xl text-center  flex justify-center'>
                    <img src={logo} alt="" className='h-[150px] w-[200px]' />
                </h1>
            </div>
            <div className='sidenav_main-container'>
                <ul className='my-[30px] capitalize sidenav_collapse-container'>
                    {
                        navmenus.map((item, index) => <SideLi key={index} item={item} />)
                    }
                </ul>
            </div>
        </nav>
    );
};

export default SideBar;