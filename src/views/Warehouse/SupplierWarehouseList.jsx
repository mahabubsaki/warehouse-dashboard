import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Pagination } from 'rsuite';
import SupplierTableRow from './SupplierTableRow';
import { AuthContext } from '../../context/Provider';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const SupplierWarehouseList = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(user.role == 'admin' ? `get-supplier?page=1&email=${user?.email}` : `get-supplier?page=1&warehouse=${user?.warehouse}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);

    const inputRef = useRef();
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(user.role == 'admin' ? `get-supplier?page=${activePage}&email=${user?.email}&search=${search}` : `get-supplier?page=${activePage}&warehouse=${user?.warehouse}&search=${search}`, axiosInstance);
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
            setSearch("");
            const newData = await fetchdata(user.role == 'admin' ? `get-supplier?page=1&email=${user?.email}` : `get-supplier?page=1&warehouse=${user?.warehouse}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            setSearch(inputRef.current.value);
            const newData = await fetchdata(user.role == 'admin' ? `get-supplier?page=1&email=${user?.email}&search=${inputRef.current.value}` : `get-supplier?page=1&warehouse=${user?.warehouse}&search=${inputRef.current.value}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    const handleDeleteSupplier = async (id) => {
        try {
            const data = await axiosInstance.delete(`delete-supplier/${id}`);
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
            {!loading ? <> <div>
                <h1 className='text-3xl text-center my-8'>Total Supplier To Warehouse : {currentData.totalProducts || 0}</h1>
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
                                <Th>Code</Th>
                                <Th>Code Type</Th>
                                <Th>Product Name</Th>
                                <Th>Order Id</Th>
                                <Th>Team Code</Th>
                                <Th>Quantity</Th>
                                <Th>Courier</Th>
                                <Th>Supplier Tracker</Th>
                                <Th>EDA</Th>
                                <Th>Notes</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <SupplierTableRow key={id} handleDeleteSupplier={handleDeleteSupplier} activePage={activePage} pd={pd} id={id + 1} />)
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
                </div></> : <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div>}
        </div>
    );
};

export default SupplierWarehouseList;