import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';

import SideLi from '../utilities/SideLi';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BiStoreAlt } from 'react-icons/bi';
import { FaClipboardList, FaShippingFast, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import { SlMagnifierRemove } from 'react-icons/sl';
import { BsCurrencyDollar, BsQrCode } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AuthContext } from '../context/Provider';

const NavDrawer = ({ isOpen, onClose, btnRef }) => {
    const list = [
        { name: 'Store', role: "storeManager", icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },

        { name: 'ASIN/UPC', role: "storeManager", icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },

        { name: 'Warehouse', role: "storeManager", icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },

        { name: 'Customer', role: "storeManager", icon: <FaUserAlt className='inline' />, subitems: [{ name: "Add warehouse to customer", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-warehouse-to-customer" }, { name: "Warehouse to customer list", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },

        { name: 'Ready to shipped', role: "warehouseManager", icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },
        // { name: 'Ready to shipped', role: "storeManager", icon: <FaShippingFast className='inline' />, subitems: [{ name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },
        { name: 'Price Avarage TAX', role: "storeManager", icon: <BsCurrencyDollar className='inline' />, subitems: [{ name: "Add price avarage tax", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-price-avarage-tax" }, { name: "Price avarage tax list", icon: <FaClipboardList />, navigate: "/price-avarage-tax-list" },] }
    ];
    const { user } = useContext(AuthContext);
    const otherRoutes = user.role == 'admin' ? [
        { name: 'Store', role: "storeManager", icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },


        { name: 'ASIN/UPC', role: "storeManager", icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },


        { name: 'Warehouse', role: "storeManager", icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },


        { name: 'Customer', role: "storeManager", icon: <FaUserAlt className='inline' />, subitems: [{ name: "Add warehouse to customer", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-warehouse-to-customer" }, { name: "Warehouse to customer list", icon: <FaClipboardList />, navigate: "/add-warehouse-to-customer-list" },] },



        // { name: 'Ready to shipped', role: "warehouseManager", icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] },


        { name: 'Price Avarage TAX', role: "storeManager", icon: <BsCurrencyDollar className='inline' />, subitems: [{ name: "Add price avarage tax", icon: <IoMdAddCircleOutline className="text-xl" />, navigate: "/add-price-avarage-tax" }, { name: "Price avarage tax list", icon: <FaClipboardList />, navigate: "/price-avarage-tax-list" },] },


    ] : [...list].filter(item => item.role == user.role);

    const navmenus = [
        { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
        ...otherRoutes
    ];
    const isSmallDevice = useMediaQuery("only screen and (max-width : 1023px)");


    useEffect(() => {
        if (!isSmallDevice) {
            onClose();
        }
    }, [isSmallDevice]);
    return (
        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />


                <DrawerBody>

                    <div className='p-[20px] bg-white'>
                        <h1 className='text-2xl text-center text-[#805ad5]'>Subwarehouse</h1>
                    </div>
                    <div className='sidenav_main-container'>
                        <ul className='my-[30px] sidenav_collapse-container'>

                            {
                                navmenus.map(item => <SideLi item={item} />)
                            }
                        </ul>
                    </div>
                </DrawerBody>

            </DrawerContent>
        </Drawer>
    );
};

export default NavDrawer;