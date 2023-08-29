import { Stat, StatGroup, StatLabel, StatNumber, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { FaListAlt, FaStoreAlt, FaStoreAltSlash, FaThList } from 'react-icons/fa';
import { TbShoppingCartDiscount } from 'react-icons/tb';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import StockSearchModal from '../views/Home/StockSearchModal';
import { TfiSearch } from 'react-icons/tfi';
import getRandomPurpleShade from '../utilities/randomColorGenerator';
import useAxios from '../hooks/useAxios';
import fetchdata from '../utilities/fetchData';

const Stats = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const axiosInstance = useAxios();
    const [active, setActive] = useState(0);
    const [inactive, setInactive] = useState(0);
    const [solved, setSolved] = useState(0);
    const [stocks, setStocks] = useState(0);
    const [shipped, setShipped] = useState(0);
    const [current, setCurrent] = useState(0);
    const [last, setLast] = useState(0);
    const [missing, setMissing] = useState(0);
    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-store?status=active&email=admin@admin.com`, axiosInstance);
            const newData2 = await fetchdata(`get-store?status=inactive&email=admin@admin.com`, axiosInstance);
            const newData3 = await fetchdata('get-missing?status=Solved&email=admin@admin.com', axiosInstance);
            const newData4 = await fetchdata('get-stocks?email=admin@admin.com', axiosInstance);
            const newData5 = await fetchdata('get-shipped?shipped=Yes&email=admin@admin.com', axiosInstance);
            const newData6 = await fetchdata('get-month-sell?month=last&email=admin@admin.com', axiosInstance);
            const newData7 = await fetchdata('get-month-sell?month=current&email=admin@admin.com', axiosInstance);
            const newData8 = await fetchdata('get-missing?status=Unsolved&email=admin@admin.com', axiosInstance);
            setCurrent(newData7.totalProducts);
            setLast(newData6.totalProducts);
            setActive(newData.totalProducts);
            setInactive(newData2.totalProducts);
            setSolved(newData3.totalProducts);
            setStocks(newData4.totalProducts);
            setShipped(newData5.totalProducts);
            setMissing(newData8.totalProducts);
        }
        fs();
    }, []);
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mx-auto max-w-6xl lg:grid-cols-3 my-4'>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate('/stocks')} className=' shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StockSearchModal isOpen={isOpen} onClose={onClose} />
                <StatGroup>
                    <Stat>
                        <StatLabel>Stocks</StatLabel>
                        <StatNumber>{stocks}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <TfiSearch onClick={onOpen} className='text-5xl font-bold' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/total-shipped")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Total Shipped</StatLabel>
                        <StatNumber>{shipped}</StatNumber>

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
                        <StatNumber>{solved}</StatNumber>

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
                        <StatNumber>{current}</StatNumber>

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
                        <StatNumber>{last}</StatNumber>

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
                        <StatNumber>{active}</StatNumber>

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
                        <StatNumber>{inactive}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FaStoreAltSlash className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/add-missing-item-list")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Missing Items</StatLabel>
                        <StatNumber>{missing}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <TbShoppingCartDiscount className='text-5xl' />
                </div>
            </div>
        </div>
    );
};

export default Stats;