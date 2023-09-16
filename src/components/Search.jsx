import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/Provider';
import useAxios from '../hooks/useAxios';
import { Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const Search = () => {
    const { search, setSearch, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [allData, setAllDate] = useState([
        {
            name: "storeCollection",
            data: []
        },
        {
            name: "asinUpcCollection",
            data: []
        },
        {
            name: "supplierCollection",
            data: []
        },
        {
            name: "customerCollection",
            data: []
        },
        {
            name: "stocksCollection",
            data: []
        },
        {
            name: "shippedCollection",
            data: []
        },
        {
            name: "missingSolvedCollection",
            data: []
        },
        {
            name: "currentMonthCollection",
            data: []
        },
        {
            name: "lastMonthCollection",
            data: []
        },
        {
            name: "activeStoresCollection",
            data: []
        },
        {
            name: "inactiveStoresCollection",
            data: []
        },
        {
            name: "missingCollection",
            data: []
        },
        {
            name: "readyShippedCollection",
            data: []
        },
        {
            name: "outOfStockCollection",
            data: []
        },
        {
            name: "returnCollection",
            data: []
        },
        {
            name: "returnListCollection",
            data: []
        },

    ]);

    const value = searchParams.get('keyword');

    const axiosInstance = useAxios();


    useEffect(() => {
        if (!search || !value) {
            navigate('/');
        }
        if (value) {
            setSearch(value);
        }
    }, [search, value]);

    useEffect(() => {
        if (!search) {
            return;
        }
        async function fs() {
            try {

                const { data } = await axiosInstance.get(user.role == 'admin' ? `super-search?search=${search}&email=${user.email}` : `super-search?search=${search}&warehouse=${user.warehouse}`);

                setAllDate(data);
            }
            catch (err) {
                navigate('/');
                toast.error(err?.response?.data?.message || err?.message, {
                    id: 'clipboard',
                });
            }
        }
        fs();

    }, [search]);
    return (
        <>
            <h2 className='text-3xl font-bold text-center'>Results Found with : {search}</h2>
            {
                allData[0].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Store Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th >Store Name</Th>
                                    <Th>Store Manager</Th>
                                    <Th>Store Type</Th>
                                    <Th>Store Status</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[0].data.map((pd, index) => <Tr> <Td>{index + 1}</Td>
                                        <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                        <Td className='ds'>{pd['store-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-manager-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-type'] || 'Not Found'}</Td>
                                        <Td>{pd.status || 'Not Found'}</Td>
                                        <Td>{pd.notes || 'Not Found'}</Td>
                                    </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[1].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">ASIN/UPC Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>ASIN/UPC Code</Th>
                                    <Th>Product Name</Th>
                                    <Th>Minimum Price</Th>
                                    <Th>Code Type</Th>
                                    <Th>Store Manager</Th>
                                    <Th>Product Image</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[1].data.map((pd, index) => <Tr>
                                        <Td>{index + 1}</Td>
                                        <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                        <Td>{pd['asinUpcCode'] || 'Not Found'}</Td>
                                        <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                        <Td>${pd['minimumPrice'] || 'Not Found'}</Td>
                                        <Td>{pd.storeType || 'Not Found'}</Td>
                                        <Td>{pd.storeManagerName || 'Not Found'}</Td>
                                        <Td>{pd.productImage ? <Link href={pd.productImage} isExternal color={'blue.500'} textDecor={'underline'}>Link</Link> : 'Not Found'}</Td>

                                    </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[2].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Supplier to warehouse Data</h1>
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
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[2].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['asin'] || 'Not Found'}</Td>
                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.supplierOrderId || 'Not Found'}</Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.supplierTracker ? <Link href={pd.supplierTracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.supplierTracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.eda ? format(new Date(pd.eda), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[3].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Customer to warehouse Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[3].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }

            {
                allData[4].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Stocks Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Store Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Product Name</Th>
                                    <Th>Total Quantity</Th>
                                    <Th>Sold</Th>
                                    <Th>Stock</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[4].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['teamCode'] || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>

                                            <Td>{pd.totalQuanity || 'Not Found'}</Td>

                                            <Td>{pd.sold || 'Not Found'}</Td>
                                            <Td>{pd.stock || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[5].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Shipped Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[5].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>

                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[6].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Missing Solved Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Recieved Quantity</Th>
                                    <Th>Quantity</Th>
                                    <Th>Missing Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[6].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.recivedQuantity || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.missingQuantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[7].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Current Month Sell Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[7].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>

                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[8].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Last Month Sell Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[8].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>

                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[9].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Active Store Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th >Store Name</Th>
                                    <Th>Store Manager</Th>
                                    <Th>Store Type</Th>
                                    <Th>Store Status</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[9].data.map((pd, index) => <Tr> <Td>{index + 1}</Td>
                                        <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                        <Td className='ds'>{pd['store-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-manager-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-type'] || 'Not Found'}</Td>
                                        <Td>{pd.status || 'Not Found'}</Td>
                                        <Td>{pd.notes || 'Not Found'}</Td>
                                    </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[10].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Inactive Store Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th >Store Name</Th>
                                    <Th>Store Manager</Th>
                                    <Th>Store Type</Th>
                                    <Th>Store Status</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[10].data.map((pd, index) => <Tr> <Td>{index + 1}</Td>
                                        <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                        <Td className='ds'>{pd['store-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-manager-name'] || 'Not Found'}</Td>
                                        <Td>{pd['store-type'] || 'Not Found'}</Td>
                                        <Td>{pd.status || 'Not Found'}</Td>
                                        <Td>{pd.notes || 'Not Found'}</Td>
                                    </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[11].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Missing Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Recieved Quantity</Th>
                                    <Th>Quantity</Th>
                                    <Th>Missing Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[11].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.recivedQuantity || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.missingQuantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[12].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Ready to Shipped Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[12].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>

                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[13].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Out Of Stock Data</h1>
                    <TableContainer>
                        <Table size={'lg'} variant='simple'>
                            <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Date</Th>
                                    <Th>Store Name</Th>
                                    <Th>Code</Th>
                                    <Th>Code Type</Th>
                                    <Th>Order ID</Th>
                                    <Th>Product Name</Th>
                                    <Th>Team Code</Th>
                                    <Th>Quantity</Th>
                                    <Th>Courier</Th>
                                    <Th>Tracker</Th>
                                    <Th>Shipping Label</Th>
                                    <Th>Shipping Slip</Th>
                                    <Th>Notes</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    allData[13].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd.date ? format(new Date(pd.date), 'P').split('/').reverse().join('-') : 'Not Found'}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>

                                            <Td>{pd['asin'] || 'Not Found'}</Td>

                                            <Td>{pd['codeType'] || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
                                            <Td>{pd.teamCode || 'Not Found'}</Td>
                                            <Td>{pd.quantity || 'Not Found'}</Td>
                                            <Td>{pd.courier || 'Not Found'}</Td>
                                            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
                                            <Td>{pd.slip || 'Not Found'}</Td>
                                            <Td>{pd.notes || 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[14].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Returned Data</h1>
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
                                    allData[14].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['teamCode'] || 'Not Found'}</Td>
                                            <Td>{pd['productName'] || 'Not Found'}</Td>
                                            <Td>{pd.returned || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td>{pd.returnLabel ? <Link href={pd.returnLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.returnLabel}</Link> : 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
            {
                allData[15].data.length ? <>
                    <h1 className="text-2xl font-semibold my-4 text-center">Returned List Data</h1>
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
                                    allData[15].data.map((pd, index) =>
                                        <Tr>
                                            <Td>{index + 1}</Td>
                                            <Td>{pd['storeName'] || 'Not Found'}</Td>
                                            <Td>{pd['teamCode'] || 'Not Found'}</Td>
                                            <Td>{pd['productName'] || 'Not Found'}</Td>
                                            <Td>{pd.returned || 'Not Found'}</Td>
                                            <Td>{pd.orderId || 'Not Found'}</Td>
                                            <Td>{pd.returnLabel ? <Link href={pd.returnLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.returnLabel}</Link> : 'Not Found'}</Td>
                                        </Tr>
                                    )
                                }
                            </Tbody>

                        </Table>
                    </TableContainer>
                </>
                    :
                    null
            }
        </>
    );
};

export default Search;