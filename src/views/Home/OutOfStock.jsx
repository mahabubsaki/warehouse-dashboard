import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/Provider';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import { Button, IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import CustomerTableRow from '../Customer/CustomerTableRow';
import { Pagination } from 'rsuite';
import fetchdata from '../../utilities/fetchData';
import { toast } from 'react-hot-toast';

const OutOfStock = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(user.role == 'admin' ? `get-customer?page=1&email=${user?.email}&status=OOS` : `get-customer?page=1&warehouse=${user?.warehouse}&status=OOS`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [refetch, setRefetch] = useState(true);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const inputRef = useRef();
    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(user.role == 'admin' ? `get-customer?page=${activePage}&email=${user?.email}&status=OOS` : `get-customer?page=${activePage}&warehouse=${user?.warehouse}&status=OOS`, axiosInstance);
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
            const newData = await fetchdata(user.role == 'admin' ? `get-customer?page=1&email=${user?.email}&status=OOS` : `get-customer?page=1&warehouse=${user?.warehouse}&status=OOS`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(user.role == 'admin' ? `get-customer?page=1&email=${user?.email}&search=${inputRef.current.value}&status=OOS` : `get-customer?page=1&warehouse=${user?.warehouse}&search=${inputRef.current.value}&status=OOS`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    const handleDeleteCustomer = async (id) => {
        try {
            const data = await axiosInstance.delete(`delete-customer/${id}`);
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
                <h1 className='text-3xl text-center my-8'>Total Out Of Stock : {currentData.totalProducts || 0}</h1>
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
                                <Th>Quantity</Th>
                                <Th>Courier</Th>
                                <Th>Tracker</Th>
                                <Th>Shipping Label</Th>
                                <Th>Shipping Slip</Th>
                                <Th>Notes</Th>
                                {(user.role == 'storeManager' || user.role == 'admin' || user.role == 'warehouseAdmin') ? <Th>Action</Th> : null}

                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <CustomerTableRow key={id} handleDeleteCustomer={handleDeleteCustomer} oos={true} activePage={activePage} pd={pd} id={id + 1} />)
                            }
                        </Tbody>

                    </Table>
                </TableContainer>
                <div className='flex justify-between my-8 px-4'>
                    <p>Showing {currentData?.data?.length > 0 ? (((activePage - 1) * 10) + 1) : 0} to {((activePage - 1) * 10) + currentData?.data?.length || 0} of {currentData.totalProducts} entires</p>
                    <Pagination
                        prev
                        last
                        maxButtons={10}
                        next
                        first
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

export default OutOfStock;