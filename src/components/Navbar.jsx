import React, { useContext } from 'react';
import { AiOutlineSearch, AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
} from '@chakra-ui/react';
import { BiUser, BiLogOutCircle } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdLocationPin } from 'react-icons/md';

import '../styles/Navbar.css';
import NavDrawer from './NavDrawer';
import { AuthContext } from '../context/Provider';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { user, setUser } = useContext(AuthContext);
    return (
        <>
            <header className='nav-header p-[15px] sm:p-[30px] rounded-lg items-center border flex justify-between'>
                <div className='flex items-center gap-4'>
                    <div className='block lg:hidden'>
                        <Button ref={btnRef} onClick={onOpen}>
                            <AiOutlineMenu className='text-xl' />
                        </Button>
                    </div>
                    <div className='relative md:w-[370px] xl:w-[600px] sm:flex items-center hidden'>
                        <input placeholder='Search Here....' type="text" className='bg-[#f7faff] text-lg h-[60px] outline-none text-black rounded-[30px] w-full pl-[82px] pr-[16px]' />
                        <button className='absolute left-[36px] top-[19px]'>
                            <AiOutlineSearch className='text-2xl text-[#818E94]' />
                        </button>
                    </div>
                </div>
                <div className='flex items-center gap-4 lg:gap-14'>
                    <Menu>
                        <MenuButton>
                            <div className='overflow-hidden rounded-full border-2 w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-[#a5adc6]'>
                                <img src="https://demo.dashboardpack.com/finance-html/img/client_img.png" alt="" />
                            </div>
                        </MenuButton>
                        <MenuList backgroundColor={'#4d4f5c'}>
                            <div className='p-[30px] pb-[20px] text-right navbar_profile-dropdown text-sm'>
                                <p className='text-[#828bb2] leading-6'>Welcome User!</p>
                                {user ? <p className='text-white mb-2 mt-1'>{user.name}</p> : null}
                                {user ? <p className='text-white mb-2 mt-1'>{user.email}</p> : null}
                                <div className='mt-5 border-t pt-2.5 text-white border-t-[#79838b]'>
                                    <p className='py-2.5 flex gap-5 cursor-pointer w-fit ms-auto justify-end items-center group'>
                                        {user ? <p>{user.location}</p> : null}
                                        <MdLocationPin className='text-4xl text-[#ffffff]' />
                                    </p>
                                    <p className='py-2.5 flex gap-5 cursor-pointer w-fit ms-auto justify-end items-center group'>
                                        <span onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem('token');
                                        }}>Log Out</span>
                                        <BiLogOutCircle className='text-[#ccc] duration-100 group-hover:text-white text-lg' />
                                    </p>
                                </div>
                            </div>
                        </MenuList>
                    </Menu>

                </div>
            </header>
            <NavDrawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
        </>
    );
};

export default Navbar;