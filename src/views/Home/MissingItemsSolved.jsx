import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import MissingTableRow from '../MissingItems/MissingTableRow';
import { Pagination } from 'rsuite';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { AuthContext } from '../../context/Provider';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const MissingItemsSolved = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(`get-missing?page=1&status=Solved&email=${user?.email}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [refetch, setRefetch] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const inputRef = useRef();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(user.role == 'admin' ? `get-missing?page=${activePage}&status=Solved&email=${user?.email}&search=${search}` : `get-missing?page=${activePage}&status=Solved&warehouse=${user?.warehouse}&search=${search}`, axiosInstance);
                setCurrentData(newData);
                setLoading(false);
            }
            fs();
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }
    }, [activePage, refetch]);
    const handleOnClick = async () => {
        console.log(inputRef.current.value);
        setLoading(true);
        if (!inputRef.current.value) {
            setSearch("");
            const newData = await fetchdata(user.role == 'admin' ? `get-missing?page=1&status=Solved&email=${user?.email}` : `get-missing?page=1&status=Solved&warehouse=${user?.warehouse}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            setSearch(inputRef.current.value);
            const newData = await fetchdata(user.role == 'admin' ? `get-missing?page=1&status=Solved&email=${user?.email}&search=${inputRef.current.value}` : `get-missing?page=1&status=Solved&warehouse=${user?.warehouse}&search=${inputRef.current.value}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    const handleDeleteMissing = async (id) => {
        try {
            const data = await axiosInstance.delete(`delete-missing/${id}`);
            setRefetch(pre => !pre);
            toast.success("Successfully solved", {
                id: 'clipboard',
            });
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }
    };
    return (
        <div>
            {loading ? <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div> : <>    <div>
                <h1 className='text-3xl text-center my-8'>Total Missing Items Solved : {currentData.totalProducts || 0}</h1>
                {search && <h1 className='text-center text-xl'>Search Results for <blockquote className='inline font-extrabold italic'>{search}</blockquote></h1>}
            </div>
                <div className='flex justify-between my-6' >
                    <p>Show Entries</p>
                    <div className='flex'>
                        <Input onKeyUp={(e) => {
                            if (e.key == 'Enter') {
                                handleOnClick();
                            }
                        }} ref={inputRef} placeholder='Search...' />
                        <IconButton
                            onClick={handleOnClick}
                            className='-ml-2'
                            colorScheme='blue'
                            aria-label='Search database'
                            icon={<FiSearch />}
                        />
                    </div>
                </div>
                <TableContainer>
                    <Table size={'lg'} variant='simple'>
                        <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Date</Th>
                                <Th>Store Name</Th>
                                <Th>Code</Th>
                                <Th>Code Type</Th>
                                <Th>Order ID</Th>
                                <Th>Product Name</Th>
                                <Th>Team Code</Th>
                                <Th>Recieved Quantity</Th>
                                <Th>Quantity</Th>
                                <Th>Missing Quantity</Th>
                                <Th>Courier</Th>
                                <Th>Tracker</Th>
                                <Th>Tracker ID</Th>
                                <Th>Notes</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <MissingTableRow key={id} handleDeleteMissing={handleDeleteMissing} home={true} activePage={activePage} pd={pd} id={id + 1} />)
                            }
                        </Tbody>

                    </Table>
                </TableContainer>
                <div className='flex justify-between my-8 px-4'>
                    <p>Showing {currentData?.data?.length > 0 ? (((activePage - 1) * 10) + 1) : 0} to {((activePage - 1) * 10) + currentData?.data?.length || 0} of {currentData.totalProducts} entires</p>
                    <Pagination
                        prev
                        last
                        next
                        first
                        maxButtons={10}
                        size="lg"
                        total={currentData.totalProducts || 0}
                        limit={10}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </div></>}
        </div>
    );
};

export default MissingItemsSolved;