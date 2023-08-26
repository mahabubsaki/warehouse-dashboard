import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { Pagination } from 'rsuite';
import ShippingTableRow from '../ReadyToShipped/ShippingTableRow';

const TotalShipped = () => {
    const data = useFetch('get-shipped?page=1&shipped=Yes');
    const axiosInstance = useAxios();
    const [refetch, setRefetch] = useState(true);
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-shipped?page=${activePage}&shipped=Yes`, axiosInstance);
                setCurrentData(newData);
                setLoading(false);
            }
            fs();
        } catch (err) {
            toast.error(err.response.data.message || err.message);
        }
    }, [activePage, refetch]);
    const handleShip = async (e) => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.put('update-shipped', { id: e._id });

            if (data.modifiedCount == 1) {
                setRefetch(pre => !pre);
            }
        } catch (err) {
            toast.error(err.response.data.message || err.message);
            setLoading(false);
        }
    };
    return (
        <div>
            {loading ? <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div> : <>      <div>
                <h1 className='text-3xl text-center my-8'>Total Ready To Shipped : {currentData.totalProducts || 0}</h1>
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
                        total={currentData.totalProducts || 0}
                        limit={10}
                        activePage={activePage}
                        onChangePage={setActivePage}
                    />
                </div></>}
        </div>
    );
};

export default TotalShipped;