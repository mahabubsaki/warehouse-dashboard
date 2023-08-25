import { Input, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import StoreTableRow from '../Store/StoreTableRow';
import { Pagination } from 'rsuite';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';

const ActiveStores = () => {
    const data = useFetch('get-store?page=1');
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    console.log(currentData);
    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-store?page=${activePage}&status=active`, axiosInstance);
            setCurrentData(newData);
        }
        fs();
    }, [activePage]);
    return (
        <div>
            <div>
                <h1 className='text-3xl text-center my-8'>Total stores : {currentData.totalProducts}</h1>
            </div>
            <div className='flex justify-between my-6' >
                <p>Show Entries</p>
                <div>
                    <Input placeholder='Search...' />
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
                    size="lg"
                    total={currentData.totalProducts || 0}
                    limit={10}
                    activePage={activePage}
                    onChangePage={setActivePage}
                />
            </div>
        </div>
    );
};

export default ActiveStores;