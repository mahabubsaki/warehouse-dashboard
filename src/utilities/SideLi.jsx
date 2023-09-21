import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Collapsible from 'react-collapsible';
import '../styles/SideLi.css';
import { useNavigate } from 'react-router-dom';

const SideLi = ({ item }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <Collapsible trigger={<div onClick={() => {
            setOpen(pre => !pre);
            if (!item.subitems?.length) {
                navigate(item.navigate);
            }
        }} className='flex justify-between hover:bg-[#805ad5] duration-500 border-l-[5px] group border-l-transparent hover:border-l-green-600 rounded p-4'>
            <div className='flex gap-4 items-center text-gray-600 group-hover:text-white'>{item.icon}{item.name}</div>
            {item.subitems?.length ? <MdOutlineKeyboardArrowDown className={`duration-300 text-xl ${open ? 'rotate-180' : 'rotate-0'}`} /> : null}
        </div>}>
            {item.subitems?.length ? <div className='pl-8'>
                {item.subitems.map((p, index) => <div key={index} onClick={() => navigate(p.navigate)} className='flex items-center text-gray-600 hover:text-[#805ad5] duration-300 cursor-pointer'>
                    <p className='p-2'>{p.icon}</p>
                    <p className='p-2'>{p.name}</p>


                </div>)}
            </div> : null}
        </Collapsible>
    );
};

export default SideLi;