import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import Pagination from 'rsuite/esm/Pagination/Pagination';
import ShippingTableRow from '../ReadyToShipped/ShippingTableRow';

const TotalShipped = () => {
    const data = useFetch('get-shipped?page=1&shipped=Yes');
    const axiosInstance = useAxios();
    const [refetch, setRefetch] = useState(true);
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    console.log(currentData);
    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-shipped?page=${activePage}&shipped=Yes`, axiosInstance);
            setCurrentData(newData);
        }
        fs();
    }, [activePage, refetch]);
    const handleShip = async (e) => {
        const { data } = await axiosInstance.put('update-shipped', { id: e._id });
        console.log(data);
        if (data) {
            setRefetch(pre => !pre);
        }
    };
    return (
        <div>
            <div>
                <h1 className='text-3xl text-center my-8'>Total Ready To Shipped : {currentData.totalProducts}</h1>
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
                            <Th>Code</Th>
                            <Th>Code Type</Th>
                            <Th>Product Name</Th>
                            <Th>Team Code</Th>
                            <Th>Quantity</Th>
                            <Th>Courier</Th>
                            <Th>Tracker</Th>
                            <Th>Order ID</Th>
                            <Th>Shipping Label</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            currentData?.data?.map((pd, id) => <ShippingTableRow shipped={true} handleShip={handleShip} activePage={activePage} pd={pd} id={id + 1} />)
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
                    total={100}
                    limit={10}
                    activePage={activePage}
                    onChangePage={setActivePage}
                />
            </div>
        </div>
    );
};

export default TotalShipped;