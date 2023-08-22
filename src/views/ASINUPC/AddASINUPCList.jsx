import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Pagination } from 'rsuite';
import AsinTableRow from './AsinTableRow';

const AddASINUPCList = () => {
    const data = useFetch('get-asin?page=1');
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    console.log(currentData);
    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-asin?page=${activePage}`, axiosInstance);
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
                            currentData?.data?.map((pd, id) => <AsinTableRow activePage={activePage} pd={pd} id={id + 1} />)
                        }
                    </Tbody>

                </Table>
            </TableContainer>
            <div className='flex justify-between my-8 px-4'>
                <p>Showing {((activePage - 1) * 10) + 1} to {((activePage - 1) * 10) + currentData?.data?.length || 0} of {currentData.totalProducts} entires</p>
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

export default AddASINUPCList;