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
import { FcShipped } from 'react-icons/fc';
import { BsGraphDownArrow } from 'react-icons/bs';
import { GiReturnArrow } from 'react-icons/gi';
import { MdPlaylistAddCheckCircle } from 'react-icons/md';

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
    const [ready, setReady] = useState(0);
    const [oos, setOos] = useState(0);
    const [returned, setReturned] = useState(0);
    const [returnedList, setReturnedList] = useState(0);
    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-store?status=active&email=bizfulfill@gmail.com`, axiosInstance);
            const newData2 = await fetchdata(`get-store?status=inactive&email=bizfulfill@gmail.com`, axiosInstance);
            const newData3 = await fetchdata('get-missing?status=Solved&email=bizfulfill@gmail.com', axiosInstance);
            const newData4 = await fetchdata('get-stocks?email=bizfulfill@gmail.com', axiosInstance);
            const newData5 = await fetchdata('get-customer?status=Shipped&email=bizfulfill@gmail.com', axiosInstance);
            const newData6 = await fetchdata('get-month-sell?month=last&email=bizfulfill@gmail.com&status=Shipped', axiosInstance);
            const newData7 = await fetchdata('get-month-sell?month=current&email=bizfulfill@gmail.com&status=Shipped', axiosInstance);
            const newData8 = await fetchdata('get-missing?status=Unsolved&email=bizfulfill@gmail.com', axiosInstance);

            const newData9 = await fetchdata('get-customer?status=Ready&email=bizfulfill@gmail.com', axiosInstance);
            const newData10 = await fetchdata('get-customer?status=OOS&email=bizfulfill@gmail.com', axiosInstance);
            const newData11 = await fetchdata('get-returned-list?email=bizfulfill@gmail.com&status=Yes', axiosInstance);
            const newData12 = await fetchdata('get-returned-list?email=bizfulfill@gmail.com&status=No', axiosInstance);
            setCurrent(newData7.totalProducts);
            setLast(newData6.totalProducts);
            setActive(newData.totalProducts);
            setInactive(newData2.totalProducts);
            setSolved(newData3.totalProducts);
            setStocks(newData4.totalProducts);
            setShipped(newData5.totalProducts);
            setMissing(newData8.totalProducts);
            setReady(newData9.totalProducts);
            setOos(newData10.totalProducts);
            setReturnedList(newData11.totalProducts);
            setReturned(newData12.totalProducts);
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
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/ready-to-shipped")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Ready To Shipped</StatLabel>
                        <StatNumber>{ready}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <FcShipped className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/out-of-stock")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Out Of Stock</StatLabel>
                        <StatNumber>{oos}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <BsGraphDownArrow className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/returned")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Returned</StatLabel>
                        <StatNumber>{returned}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <GiReturnArrow className='text-5xl' />
                </div>
            </div>
            <div style={{ background: `linear-gradient(45deg, ${getRandomPurpleShade()}, ${getRandomPurpleShade()})` }} onClick={() => navigate("/returned-list")} className='bg-white shadow items-center justify-between flex px-6 py-8 rounded-md cursor-pointer'>
                <StatGroup>
                    <Stat>
                        <StatLabel>Returned List</StatLabel>
                        <StatNumber>{returnedList}</StatNumber>

                    </Stat>
                </StatGroup>
                <div>
                    <MdPlaylistAddCheckCircle className='text-5xl' />
                </div>
            </div>
        </div>
    );
};

export default Stats;