import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/Provider';
import useAxios from '../../hooks/useAxios';
import { IconButton, Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { Pagination } from 'rsuite';
import RetrunTableRow from './RetrunTableRow';
import { useFetch } from '../../hooks/useFetch';
import fetchdata from '../../utilities/fetchData';
import { toast } from 'react-hot-toast';

const Returned = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(`get-returned-list?page=1&email=bizfulfill@gmail.com&status=No`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const inputRef = useRef();
    const handleReturnList = async (uid) => {
        try {
            const data = await axiosInstance.post('add-returned', { id: uid, warehouse: user.warehouse });
            setRefetch((pre) => !pre);
            toast.success("Moved to Returned successfully", {
                id: 'clipboard',
            });
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }
    };
    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-returned-list?page=${activePage}&email=bizfulfill@gmail.com&status=No`, axiosInstance);
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
            const newData = await fetchdata(`get-returned-list?page=1&email=${user?.email}&status=No`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);

        } else {
            const newData = await fetchdata(`get-returned-list?page=1&email=${user?.email}&search=${inputRef.current.value}&status=No`, axiosInstance);
            setActivePage(1);
            setCurrentData(newData);
            setLoading(false);
        }

    };
    return (
        <div>
            {loading ? <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div> : <><div>
                <h1 className='text-3xl text-center my-8'>Total Returned : {currentData.totalProducts || 0}</h1>
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
                                <Th>Store Name</Th>
                                <Th>Team Code</Th>
                                <Th>Product Name</Th>
                                <Th>Returned Quantity</Th>
                                <Th>Order ID</Th>
                                <Th>Return Label</Th>

                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <RetrunTableRow show={true} handleReturnList={handleReturnList} activePage={activePage} pd={pd} id={id + 1} />)
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
                </div></>}
        </div>
    );
};

export default Returned;