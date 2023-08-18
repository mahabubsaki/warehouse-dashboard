import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SideBar from './SideBar';
import SideLi from '../utilities/SideLi';
import { useMediaQuery } from '@uidotdev/usehooks';
import { AiFillHome, AiOutlineAppstore } from 'react-icons/ai';
import { BiStoreAlt } from 'react-icons/bi';
import { GrAdd } from 'react-icons/gr';
import { FaClipboardList, FaShippingFast, FaUserAlt, FaWarehouse } from 'react-icons/fa';
import { SlMagnifierRemove } from 'react-icons/sl';
import { BsQrCode } from 'react-icons/bs';

const NavDrawer = ({ isOpen, onClose, btnRef }) => {
    const navmenus = [
        { name: 'Dashboard', icon: <AiOutlineAppstore className='inline' />, navigate: "/" },
        { name: 'Store', icon: <BiStoreAlt className='inline' />, subitems: [{ name: "Add Store", icon: <GrAdd />, navigate: "/add-store" }, { name: "Store List", icon: <FaClipboardList />, navigate: "/store-list" },] },
        { name: 'Warehouse', icon: <FaWarehouse className='inline' />, subitems: [{ name: "Supplier to warehouse", icon: <GrAdd />, navigate: "/supplier-warehouse" }, { name: "Supplier to warehouse list", icon: <FaClipboardList />, navigate: "/supplier-warehouse-list" },] },
        { name: 'Missing Items', icon: <SlMagnifierRemove className='inline' />, subitems: [{ name: "Add missing item", icon: <GrAdd />, navigate: "/add-missing-item" }, { name: "Missing item list", icon: <FaClipboardList />, navigate: "/add-missing-item-list" },] },
        { name: 'ASIN/UPC', icon: <BsQrCode className='inline' />, subitems: [{ name: "Add ASIN/UPC", icon: <GrAdd />, navigate: "/add-asin-upc" }, { name: "ASIN/UPC list", icon: <FaClipboardList />, navigate: "/add-asin-upc-list" },] },
        { name: 'Ready to shipped', icon: <FaShippingFast className='inline' />, subitems: [{ name: "Add shipped item", icon: <GrAdd />, navigate: "/add-shipped-item" }, { name: "Added shipped item list", icon: <FaClipboardList />, navigate: "/added-shipped-item-list" },] }
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
                        <img src="https://demo.dashboardpack.com/finance-html/img/logo.png" alt="" />
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