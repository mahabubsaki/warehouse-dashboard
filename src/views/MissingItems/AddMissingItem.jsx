import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardBody, Input, Stack } from '@chakra-ui/react';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';
const AddMissingItem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [storeName, setStoreName] = useState(null);
    const { user } = useContext(AuthContext);
    const [singleasin, setSingleasin] = useState(null);
    const [teamCode, setTeamCode] = useState(null);
    const [asin, setasin] = useState([]);
    const [nameAndCode, setNameAndCode] = useState(null);

    const axiosInstance = useAxios();

    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-store`, axiosInstance);
            const newData2 = await fetchdata(`get-asin`, axiosInstance);
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
        // if (isLoading) return;
        setIsLoading(true);
        e.preventDefault();

        const form = e.target;

        const formData = {
            date: new Date(form.date.value),
            storeName: form['store-name'].value,
            asinUpc: form['asin-upc'].value, // Corrected key
            productName: form['product-name'].value,
            teamCode: form['team-code'].value,
            orderId: form['order-id'].value,
            expectedQuantity: form['expected-quantity'].value, // Corrected key
            receivedQuantity: form['recieved-quantity'].value, // Corrected key
            missingQuantity: form['missing-quantity'].value,
            supplierTracker: form['supplier-tracker'].value,
            eda: form.eda.value,
            status: 'Unsolved',
            addedDate: new Date(),
            email: user?.email,
            warehouse: user.warehouse
        };




        try {
            const response = await axiosInstance.post('add-missing', formData);

            if (response.data.acknowledged) {
                toast.success("Supplier data added successfully to warehouse", {
                    id: 'clipboard',
                });
            } else {
                toast.error("Something went wrong", {
                    id: 'clipboard',
                });
            }


        } catch (error) {
            toast.error(err?.response?.data?.message || err.message, {
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
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Missing Items</h1>
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
                                    <Input disabled defaultValue={new Date().toISOString().slice(0, 10)} type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
                                </div>
                                <div>
                                    <label htmlFor="store-name">Store Name: </label>
                                    <Select onChange={handleStoreChange} className='mt-3' placeholder='Enter Store Name' id='store-name' name='store-name' options={stores} />
                                </div>
                                <div>
                                    <label htmlFor="asin-upc">ASIN/UPC: </label>
                                    <Select onChange={handleAsinSelectChange} placeholder='Enter ASIN Code' className='mt-3' id='asin-upc' name='asin-upc' options={asin} />
                                </div>
                                <div>
                                    <label htmlFor="product-name">Product Name: </label>
                                    <Input readOnly value={nameAndCode ? nameAndCode.productName : ''} type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                                </div>
                                <div>
                                    <label htmlFor="order-id">Order ID: </label>
                                    <Input type="text" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="team-code">Team Code: </label>
                                    <Input readOnly value={teamCode ? teamCode : ''} type="text" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
                                </div>
                                <div>
                                    <label htmlFor="expected-quantity">Expected Quantity: </label>
                                    <Input type="number" className='mt-3' id='expected-quantity' name='expected-quantity' placeholder='Enter Expected Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="recieved-quantity">Recieved Quantity: </label>
                                    <Input type="number" className='mt-3' id='recieved-quantity' name='recieved-quantity' placeholder='Enter Recieved Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="missing-quantity">Missing Quantity: </label>
                                    <Input type="number" className='mt-3' id='missing-quantity' name='missing-quantity' placeholder='Enter Missing Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="supplier-racker">Supplier Tracker: </label>
                                    <Input type="url" className='mt-3' id='supplier-tracker' name='supplier-tracker' placeholder='Enter Supplier Tracker' />
                                </div>
                                <div>
                                    <label htmlFor="eda">EDA: </label>
                                    <Input type="date" className='mt-3' id='eda' name='eda' placeholder='Estimated Date Of Arrival' />
                                </div>
                            </div>
                            <div className='flex my-6'>
                                <Button type='submit' colorScheme='purple'>Add Missing Items</Button>
                            </div>
                        </form>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default AddMissingItem;;