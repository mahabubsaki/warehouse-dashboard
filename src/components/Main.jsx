import React from 'react';
import Navbar from './Navbar';
import Stats from './Stats';

const Main = () => {
    return (
        <div className='h-[2000px] w-full ml-0 lg:ml-72 duration-500 px-[15px] sm:px-[30px] pt-[30px]'>
            <Navbar />
            <Stats />
        </div>
    );
};

export default Main;