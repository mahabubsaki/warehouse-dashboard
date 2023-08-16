import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SideBar from './SideBar';
import { AiFillHome } from 'react-icons/ai';
import SideLi from '../utilities/SideLi';
import { useMediaQuery } from '@uidotdev/usehooks';

const NavDrawer = ({ isOpen, onClose, btnRef }) => {
    const navmenus = [{ name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }, { name: 'Dashboard', icon: <AiFillHome className='inline' />, subitems: ["subitem1", "subitem2"] }];

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