import { Stat, StatGroup, StatLabel, StatNumber, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { FaListAlt, FaStoreAlt, FaStoreAltSlash, FaThList } from 'react-icons/fa';
import { GrStorage } from 'react-icons/gr';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import StockSearchModal from '../views/Home/StockSearchModal';
import { TfiSearch } from 'react-icons/tfi';
import getRandomPurpleShade from '../utilities/randomColorGenerator';

const Stats = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto max-w-6xl lg:grid-cols-3 my-4'>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={onOpen} className=' shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StockSearchModal isOpen={isOpen} onClose={onClose} />
                <StatGroup>
                    <Stat>
                        <StatLabel>Stocks</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <TfiSearch className='text-5xl font-bold' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/total-shipped")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
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
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/missing-items-solved")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
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
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/current-month-sell")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Current Month Sell</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FaListAlt className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/last-month-sell")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Last Month Sell</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FaThList className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/active-stores")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Active Stores</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FaStoreAlt className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/inactive-stores")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Inactive Stores</StatLabel>
                        <StatNumber>345,670</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FaStoreAltSlash className='text-5xl' />
                </div>
            </div>
        </div>
    );
};

export default Stats;