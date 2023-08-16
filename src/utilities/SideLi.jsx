import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Collapsible from 'react-collapsible';
import './SideLi.css';

const SideLi = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        // <>
        //     <li onClick={() => setOpen(pre => !pre)} className='flex cursor-pointer  text-[#676b84] justify-between items-center p-4'>
        //         <div className='flex gap-4 items-center'>
        //             <p className='text-xl'> {item.icon}</p>
        //             {item.name}
        //         </div>

        //         <MdOutlineKeyboardArrowDown className={`duration-300 text-xl ${open ? 'rotate-180' : 'rotate-0'}`} />
        //     </li>
        //     <div className='overflow-hidden'>
        //         <ul className={`ml-16 relative ${open ? 'top-0 h-auto' : `${item.top} h-0`} duration-300 `}>
        //             {item.subitems.map(item => <li className='py-[10px]'>{item}</li>)}
        //         </ul>
        //     </div>
        // </>
        <Collapsible trigger={<div onClick={() => setOpen(pre => !pre)} className='flex justify-between p-4'>
            <div className='flex gap-4 items-center text-gray-600'>{item.icon}{item.name}</div>
            <MdOutlineKeyboardArrowDown className={`duration-300 text-xl ${open ? 'rotate-180' : 'rotate-0'}`} />
        </div>}>
            {item.subitems.length ? <div className='pl-8'>
                {item.subitems.map(p => <p className='p-2'>{p}</p>)}
            </div> : null}
        </Collapsible>
    );
};

export default SideLi;