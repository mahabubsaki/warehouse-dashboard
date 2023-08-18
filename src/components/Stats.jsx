import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';
import { AiFillDollarCircle, AiOutlineDollarCircle, AiOutlineFileDone } from 'react-icons/ai';
import { GrStorage } from 'react-icons/gr';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Stats = () => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto max-w-5xl lg:grid-cols-3 my-4'>
            <div onClick={() => navigate("/stocks")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Stocks</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <GrStorage className='text-5xl' />
                </div>
            </div>
            <div onClick={() => navigate("/total-shipped")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Total Shipped</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <MdOutlineLocalShipping className='text-5xl' />
                </div>
            </div>
            <div onClick={() => navigate("/missing-items-solved")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Missing Items Solved</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <AiOutlineFileDone className='text-5xl' />
                </div>
            </div>
            <div onClick={() => navigate("/current-month-sell")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Current Month Sell</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <AiFillDollarCircle className='text-5xl' />
                </div>
            </div>
            <div onClick={() => navigate("/last-month-sell")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Last Month Sell</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <AiOutlineDollarCircle className='text-5xl' />
                </div>
            </div>
        </div>
    );
};

export default Stats;