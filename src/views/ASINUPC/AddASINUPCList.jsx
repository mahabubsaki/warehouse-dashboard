import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { Input, TableContainer, Table, Tbody, Th, Thead, Tr, Spinner } from '@chakra-ui/react';
import { Pagination } from 'rsuite';
import AsinTableRow from './AsinTableRow';
import { toast } from 'react-hot-toast';


const AddASINUPCList = () => {
    const data = useFetch('get-asin?page=1');
    const axiosInstance = useAxios();
    const [currentData, setCurrentData] = useState(data);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            async function fs() {
                const newData = await fetchdata(`get-asin?page=${activePage}`, axiosInstance);
                setCurrentData(newData);
                setLoading(false);
            }
            fs();
        } catch (err) {
            toast.error(err.response.data.message || err.message);
        }
    }, [activePage]);
    return (

        <div>
            {loading ? <div className='min-h-[500px] flex justify-center items-center'>
                <Spinner />
            </div> : <> <div>
                <h1 className='text-3xl text-center my-8'>Total ASIN/UPC : {currentData.totalProducts || 0}</h1>
            </div>
                <div className='flex justify-between my-6' >
                    <p>Show Entries</p>
                    <div>
                        <Input placeholder='Search...' />
                    </div>
                </div>

                <TableContainer>
                    <Table size={'lg'} variant='simple' >
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
                    {!loading ? <p>Showing {currentData?.data?.length > 0 ? (((activePage - 1) * 10) + 1) : 0} to {((activePage - 1) * 10) + currentData?.data?.length || 0} of {currentData.totalProducts} entires</p> : null}
                    <Pagination
                        disabled={loading}
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

export default AddASINUPCList;



