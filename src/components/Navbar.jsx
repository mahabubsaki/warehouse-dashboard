import React, { useContext, useRef } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const { user, setUser, setSearch } = useContext(AuthContext);

    const navigate = useNavigate();
    const inputRef = useRef();
    const handleOnclick = () => {
        if (inputRef?.current?.value) {
            setSearch(inputRef.current.value);
            navigate(`/search?keyword=${inputRef.current.value}`);
        }
    };

    return (
        <>
            <h1 className='text-center font-semibold text-2xl'>{user.warehouseName}</h1>
            <header className='nav-header p-[15px] sm:p-[30px] rounded-lg items-center border flex justify-between'>

                <div className='flex items-center gap-4'>
                    <div className='block lg:hidden'>
                        <Button ref={btnRef} onClick={onOpen}>
                            <AiOutlineMenu className='text-xl' />
                        </Button>
                    </div>
                    {(user.role == 'admin' || user.role == 'warehouseAdmin') ? <div className='relative md:w-[370px] xl:w-[600px] sm:flex items-center hidden'>
                        <input ref={inputRef} placeholder='Search Here....' type="text" className='bg-[#f7faff] text-lg h-[60px] outline-none text-black rounded-[30px] w-full pl-[82px] pr-[16px]' />
                        <button className='absolute left-[36px] top-[19px] '>
                            <AiOutlineSearch className='text-2xl text-[#818E94]' />
                        </button>
                        <button onClick={handleOnclick} className='btn-grad-search absolute right-0 rounded-[30px] py-5 px-6'>Search</button>
                    </div> : null}
                </div>
                <div className='flex items-center gap-4 lg:gap-14'>
                    <Menu>
                        <MenuButton>
                            <div className='overflow-hidden rounded-full border-2 w-[40px] h-[40px] sm:w-[70px] sm:h-[70px] border-[#a5adc6]'>
                                {user.role != 'admin' ? <img src={user.profile} alt="" /> : null}
                            </div>
                        </MenuButton>
                        <MenuList backgroundColor={'#4d4f5c'}>
                            <div className='p-[30px] pb-[20px] text-right navbar_profile-dropdown text-sm'>
                                <p className='text-[#828bb2] leading-6'>Welcome {user.role.toUpperCase()}!</p>
                                {user ? <p className='text-white mb-2 mt-1'>{user.name}</p> : null}
                                {user ? <p className='text-white mb-2 mt-1'>{user.email}</p> : null}
                                <div className='mt-5 border-t pt-2.5 text-white border-t-[#79838b]'>
                                    <div className='py-2.5 flex gap-5 cursor-pointer w-fit ms-auto justify-end items-center group'>
                                        {user ? <p>{user.location}</p> : null}
                                        <MdLocationPin className='text-4xl text-[#ffffff]' />
                                    </div>
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