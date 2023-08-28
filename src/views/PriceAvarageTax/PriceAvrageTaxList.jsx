import React, { useContext, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import PriceAverageTableRow from './PriceAverageTableRow';
import { Pagination } from 'rsuite';
import { AuthContext } from '../../context/Provider';

export const PriceAvrageTaxList = () => {
    const { user } = useContext(AuthContext);
    const data = useFetch(`get-tax?page=1&email=${user?.email}`);
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);


    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-tax?page=${activePage}&email=${user?.email}`, axiosInstance);
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
    return (
        <div>
            {!loading ? <>  <div>
                <h1 className='text-3xl text-center my-8'>Total Avarage Price,Avarage Tax : {currentData.totalProducts || 0}</h1>
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
                                <Th>ASIN</Th>
                                <Th>Walmart Link</Th>
                                <Th>Walmart Tracking</Th>
                                <Th>Quantity</Th>
                                <Th>Price</Th>
                                <Th>Total Tax</Th>
                                <Th>Order ID</Th>
                                <Th>Team Code</Th>
                                <Th>Quanity Recieved</Th>
                                <Th>EDA</Th>
                                <Th>Avg. Price</Th>
                                <Th>Avg. Tax / Avg. Quantity</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                currentData?.data?.map((pd, id) => <PriceAverageTableRow avgPrice={currentData.avgPrice} avgTaxQuan={currentData.avgTaxQuan} activePage={activePage} pd={pd} id={id + 1} />)
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
                </div></> : <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div>}
        </div>
    );
};
