import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Collapsible from 'react-collapsible';
import '../styles/SideLi.css';

const SideLi = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
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