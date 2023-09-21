import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, TableContainer, Table, Tbody, Th, Thead, Tr, Spinner, IconButton } from '@chakra-ui/react';
import { Pagination } from 'rsuite';
import AsinTableRow from './AsinTableRow';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/Provider';
import { FiSearch } from 'react-icons/fi';


const AddASINUPCList = () => {
    const { user } = useContext(AuthContext);
    const inputRef = useRef();
    const data = useFetch(`get-asin?page=1&email=${user?.email}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(user.role == 'admin' ? `get-asin?page=${activePage}&email=${user?.email}` : `get-asin?page=${activePage}&warehouse=${user?.warehouse}`, axiosInstance);
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
        setLoading(true);
        if (!inputRef.current.value) {
            const newData = await fetchdata(user.role == 'admin' ? `get-asin?page=1&email=${user?.email}` : `get-asin?page=1&warehouse=${user?.warehouse}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(user.role == 'admin' ? `get-asin?page=1&email=${user?.email}&search=${inputRef.current.value}` : `get-asin?page=1&warehouse=${user?.warehouse}&search=${inputRef.current.value}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    const handleDeleteAsin = async (id) => {
        try {
            const data = await axiosInstance.delete(`delete-asin/${id}`);
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
            </div> : <> <div>
                <h1 className='text-3xl text-center my-8'>Total ASIN/UPC : {currentData.totalProducts || 0}</h1>
            </div>
                <div className='flex justify-between my-6' >
                    <p>Show Entries</p>
                    <div className='flex'>
                        <Input ref={inputRef} placeholder='Search...' />
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
                    <Table size={'lg'} variant='simple' >
                        <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                            <Tr >
                                <Th>ID</Th>
                                <Th>Date</Th>
                                <Th>ASIN/UPC Code</Th>
                                <Th>Product Name</Th>
                                <Th>Minimum Price</Th>
                                <Th>Code Type</Th>
                                <Th>Store Manager</Th>
                                <Th>Product Image</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <AsinTableRow key={id} handleDeleteAsin={handleDeleteAsin} activePage={activePage} pd={pd} id={id + 1} />)
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <div className='flex justify-between my-8 px-4'>
                    {!loading ? <p>Showing {currentData?.data?.length > 0 ? (((activePage - 1) * 10) + 1) : 0} to {((activePage - 1) * 10) + currentData?.data?.length || 0} of {currentData.totalProducts} entires</p> : null}
                    <Pagination
                        disabled={loading}
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

export default AddASINUPCList;



