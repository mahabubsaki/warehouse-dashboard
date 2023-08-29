import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import StoreTableRow from '../Store/StoreTableRow';
import { Pagination } from 'rsuite';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { AuthContext } from '../../context/Provider';
import { FiSearch } from 'react-icons/fi';

const InactiveStores = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(`get-store?page=1&email=${user?.email}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    // useEffect(() => {
    //     async function fs() {
    //         const newData = await fetchdata(`get-store?page=${activePage}&status=inactive`, axiosInstance);
    //         setCurrentData(newData);
    //     }
    //     fs();
    // }, [activePage]);

    const [loading, setLoading] = useState(true);
    const inputRef = useRef();

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-store?page=${activePage}&status=inactive&email=${user?.email}`, axiosInstance);
                setCurrentData(newData);
                setLoading(false);
            }
            fs();
        } catch (err) {
            toast.error(err.response.data.message || err.message, {
                id: 'clipboard',
            });
        }
    }, [activePage]);
    const handleOnClick = async () => {
        setLoading(true);
        if (!inputRef.current.value) {
            const newData = await fetchdata(`get-store?page=1&status=inactive&email=${user?.email}`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(`get-store?page=1&status=inactive&email=${user?.email}&search=${inputRef.current.value}`, axiosInstance);
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
                <h1 className='text-3xl text-center my-8'>Total inactive stores : {currentData.totalProducts || 0}</h1>
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
                                <Th>Store Manager</Th>
                                <Th>Store Type</Th>
                                <Th>Store Status</Th>
                                <Th>Notes</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <StoreTableRow activePage={activePage} pd={pd} id={id + 1} />)
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

export default InactiveStores;