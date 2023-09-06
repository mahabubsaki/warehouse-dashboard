import { Button, Card, CardBody, CircularProgress, Input, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import Select from 'react-select';
import fetchdata from '../../utilities/fetchData';
import { AuthContext } from '../../context/Provider';



const SupplierWarehouse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [storeName, setStoreName] = useState(null);
    const [singleasin, setSingleasin] = useState(null);
    const [teamCode, setTeamCode] = useState(null);
    const [asin, setasin] = useState([]);
    const [nameAndCode, setNameAndCode] = useState(null);

    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-store?email=${user.email}`, axiosInstance);
            const newData2 = await fetchdata(`get-asin?email=bizfulfill@gmail.com&select=yes`, axiosInstance);
            setStores(newData.data.map(e => {
                return { value: e['store-name'], label: e['store-name'] };
            }));
            setasin(newData2.data.map(e => {
                return {
                    value: e['asinUpcCode'], label: e['asinUpcCode'], codetype: e.
                        storeType, productName: e.productName
                };
            }));
        }
        fs();
    }, []);

    useEffect(() => {
        if (storeName && singleasin) {
            setTeamCode(storeName + '_' + singleasin);
        }
    }, [storeName, singleasin]);
    const handleAddtoWarehouse = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        const date = new Date(e.target.date.value);
        const storeName = e.target['store-name'].value;
        const asin = e.target.asin.value;
        const codeType = e.target['code-type'].value;
        const supplierOrderId = e.target['supplier-order-id'].value;
        const productName = e.target['product-name'].value;
        const teamCode = e.target['team-code'].value;
        const quantity = e.target.quantity.value;
        const unitPrice = e.target['unit-price'].value;
        const eda = e.target.eda.value;
        const formData = {
            date,
            storeName,
            asin,
            codeType,
            supplierOrderId,
            productName,
            teamCode,
            quantity,
            unitPrice,
            eda,
            email: user?.email,
            courier: null,
            supplierTracker: null,
            addedDate: new Date()
        };

        try {
            const response = await axiosInstance.post('add-supplier', formData);
            console.log('POST response:', response.data);
            if (response.data.supplierAdd.acknowledged) {
                toast.success("Supplier data added successfully to warehouse", {
                    id: 'clipboard',
                });
            } else {
                toast.error("Something went wrong", {
                    id: 'clipboard',
                });
            }


        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message, {
                id: 'clipboard',
            });

        }
        finally {
            setIsLoading(false);
            e.target.reset();
        }
    };
    const handleAsinSelectChange = async (e) => {
        if (e.value) {
            setSingleasin(e.value);
            const data = asin.find(item => item.value == e.value);
            setNameAndCode({ productName: data.productName, codetype: data.codetype });
        } else {
            setNameAndCode(null);
            setSingleasin(null);
        }
    };

    const handleStoreChange = async (e) => {
        if (e.value) {
            setStoreName(e.value);
        } else {
            setStoreName(null);
        }
    };
    const [autoDate, setAutoDate] = useState(new Date().toISOString().split('T')[0]);
    useEffect(() => {
        const [month, date, year] = new Date().toLocaleDateString().split('/');
        setAutoDate(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`);
    }, []);
    console.log(autoDate);
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add order to warehouse</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >

                <Stack>
                    <CardBody>
                        <form onSubmit={handleAddtoWarehouse}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Input value={autoDate} disabled type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />

                                </div>
                                <div>
                                    <label htmlFor="store-name">Store Name: </label>
                                    <Select onChange={handleStoreChange} className='mt-3' placeholder='Enter Store Name' id='store-name' name='store-name' options={stores} />
                                </div>
                                <div>
                                    <label htmlFor="asin">ASIN: </label>
                                    <Select onChange={handleAsinSelectChange} placeholder='Enter ASIN Code' className='mt-3' id='asin' name='asin' options={asin} />
                                </div>
                                <div>
                                    <label htmlFor="code-type">Code Type: </label>
                                    <Input readOnly value={nameAndCode ? nameAndCode.codetype : ''} type="text" className='mt-3' id='code-type' name='code-type' placeholder='Enter Code Type' />
                                </div>
                                <div>
                                    <label htmlFor="supplier-order-id">Supplier Order ID: </label>
                                    <Input type="text" className='mt-3' id='supplier-order-id' name='supplier-order-id' placeholder='Enter Supplier Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="product-name">Product Name: </label>
                                    <Input readOnly value={nameAndCode ? nameAndCode.productName : ''} type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                                </div>
                                <div>
                                    <label htmlFor="team-code">Team Code: </label>
                                    <Input readOnly value={teamCode ? teamCode : ''} type="text" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
                                </div>
                                <div>
                                    <label htmlFor="quantity">Quantity: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='quantity' name='quantity' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="unit-price">Unit Price: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='unit-price' name='unit-price' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="eda">EDA: </label>
                                    <Input type="date" className='mt-3' id='eda' name='eda' placeholder='Estimated Date Of Arrival' />
                                </div>
                            </div>
                            <div className='flex my-6'>
                                {/* <Button type='submit' colorScheme='purple'>Add Order To Warehouse</Button> */}
                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add Order To Warehouse</span>
                                    {isLoading ? <CircularProgress size={'20px'} isIndeterminate color='green.300' /> : null}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default SupplierWarehouse;;
