import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/Provider';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import CustomerTableRow from '../Customer/CustomerTableRow';
import { Pagination } from 'rsuite';
import fetchdata from '../../utilities/fetchData';
const ReadyToShipped = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(`get-customer?page=1&email=${user?.email}&status=Ready`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(true);
    const inputRef = useRef();
    const handleShipped = async (e) => {
        const { data } = await axiosInstance.put('update-customer', { status: 'Shipped', id: e });
        if (data.modifiedCount) {
            setUpdate((pre) => !pre);
            toast.success("Supplier Details Updated succesfully", {
                id: 'clipboard',
            });
        } else {
            toast.error("Something went wrong", {
                id: 'clipboard',
            });
        }
    };
    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-customer?page=${activePage}&email=${user?.email}&status=Ready`, axiosInstance);
                setCurrentData(newData);
                setLoading(false);
            }
            fs();
        } catch (err) {
            toast.error(err.response.data.message || err.message, {
                id: 'clipboard',
            });
        }
    }, [activePage, update]);

    const handleOnClick = async () => {
        setLoading(true);
        if (!inputRef.current.value) {
            const newData = await fetchdata(`get-customer?page=1&email=${user?.email}&status=Ready`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(`get-customer?page=1&email=${user?.email}&search=${inputRef.current.value}&status=Ready`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    return (
        <div>
            {loading ? <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div> : <> <div>
                <h1 className='text-3xl text-center my-8'>Total Ready To Shipped : {currentData.totalProducts || 0}</h1>
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
                    <Table variant='simple'>
                        <Thead>
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
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <CustomerTableRow handleShipped={handleShipped} shipped={true} activePage={activePage} pd={pd} id={id + 1} />)
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

export default ReadyToShipped;