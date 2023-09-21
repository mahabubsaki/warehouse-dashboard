import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/Provider';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { Pagination } from 'rsuite';
import AllWarehouseList from './AllWarehouseList';
import fetchdata from '../../utilities/fetchData';
import { toast } from 'react-hot-toast';

const AllWarehouse = () => {
    const { user } = useContext(AuthContext);
    const inputRef = useRef();
    const data = useFetch(`get-all-warehouse?page=1&email=${user.email}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [refetch, setRefetch] = useState(true);

    const [loading, setLoading] = useState(true);

    const handleOnClick = async () => {
        setLoading(true);
        if (!inputRef.current.value) {
            const newData = await fetchdata(`get-all-warehouse?page=1&email=${user.email}`);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(`get-all-warehouse?page=1&email=${user.email}&search=${inputRef.current.value}`);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    useEffect(() => {
        if (!user) return;
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-all-warehouse?page=${activePage}&email=${user.email}`, axiosInstance);
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
    const handleDeleteWarehouse = async (id) => {
        try {
            const data = await axiosInstance.delete(`delete-warehouse/${id}`);
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
            {!loading ? <><div>
                <h1 className='text-3xl text-center my-8'>Total Warehouses : {currentData.totalProducts || 0}</h1>
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
                    <Table size={'lg'} variant='simple'>
                        <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                            <Tr>
                                <Th>ID</Th>
                                <Th >Warehouse Name</Th>
                                <Th>Warehouse Location</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <AllWarehouseList key={id} handleDeleteWarehouse={handleDeleteWarehouse} activePage={activePage} pd={pd} id={id + 1} />)
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
                        maxButtons={10}
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

export default AllWarehouse;