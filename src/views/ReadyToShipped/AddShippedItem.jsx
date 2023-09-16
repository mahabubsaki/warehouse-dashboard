import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardBody, CircularProgress, Input, Stack } from '@chakra-ui/react';
import fetchdata from '../../utilities/fetchData';
import useAxios from '../../hooks/useAxios';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const AddShippedItem = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [storeName, setStoreName] = useState(null);
    const [singleasin, setSingleasin] = useState(null);
    const [teamCode, setTeamCode] = useState(null);
    const [asin, setasin] = useState([]);
    const [nameAndCode, setNameAndCode] = useState(null);
    const [warehouse, setWarehouse] = useState([]);
    const [existing, setExisting] = useState(null);

    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(user.role == 'admin' ? `get-store?email=${user.email}&select=yes` : `get-store?warehouse=${user.warehouse}&select=yes`, axiosInstance);
            const newData2 = await fetchdata(user.role == 'admin' ? `get-asin?email=${user.email}&select=yes` : `get-asin?warehouse=${user.warehouse}&select=yes`, axiosInstance);
            const newData3 = await fetchdata(user.role == 'admin' ? `get-customer?email=${user.email}&select=yes` : `get-customer?warehouse=${user.warehouse}&select=yes`, axiosInstance);

            setWarehouse(newData3.data);
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
        if (singleasin) {
            const findAsin = warehouse.find(item => item.asin === singleasin);

            setExisting(findAsin);
        }
    }, [storeName, singleasin]);
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
    const handleAddShipped = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        const form = e.target;
        const formData = {
            date: new Date(form.date.value),
            storeName: form['store-name'].value,
            asin: form['asin-upc'].value,
            codeType: form['code-type'].value,
            productName: form['product-name'].value,
            teamCode: form['team-code'].value,
            orderId: form['order-id'].value,
            quantity: form.quantity.value,
            courier: form.courier.value,
            shippingLabel: form['shipping-label'].value,
            tracker: form.tracker.value,
            addedDate: new Date(),
            shipped: 'No',
            email: user?.email,
            warehouse: user.warehouse
        };
        try {
            const response = await axiosInstance.post('add-shipped', formData);

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
            toast.error(error.response.data.message || error.message, {
                id: 'clipboard',
            });

        }
        finally {
            setIsLoading(false);
            e.target.reset();
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
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Ready To Shipped</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Stack>
                    <CardBody>
                        <form onSubmit={handleAddShipped}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Input disabled value={autoDate} type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
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
                                    <label htmlFor="code-type">Code Type: </label>
                                    <Input readOnly value={nameAndCode ? nameAndCode.codetype : ''} type="text" className='mt-3' id='code-type' name='code-type' placeholder='Enter Code Type' />
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
                                    <Input readOnly value={existing ? existing.quantity : ''} type="number" step="0.00001" className='mt-3' id='quantity' name='quantity' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="courier">Courier: </label>
                                    <Input readOnly value={existing ? existing.courier : ''} type="text" className='mt-3' id='courier' name='courier' placeholder='Enter Courier' />
                                </div>
                                <div>
                                    <label htmlFor="tracker">Tracker: </label>
                                    <Input readOnly value={existing ? existing.tracker : ''} type="url" className='mt-3' id='tracker' name='tracker' placeholder='Enter Tracker' />
                                </div>
                                <div>
                                    <label htmlFor="order-id">Order ID: </label>
                                    <Input readOnly value={existing ? existing.orderId : ''} type="text" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="shipping-label">Shipping Label: </label>
                                    <Input readOnly value={existing ? existing.shippingLabel : ''} type="text" className='mt-3' id='shipping-label' name='shipping-label' placeholder='Enter Shipping Label' />
                                </div>
                            </div>
                            <div className='flex my-6'>
                                {/* <Button type='submit' colorScheme='purple'>Add Ready To Shipped</Button> */}
                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add Ready To Shipped</span>
                                    {isLoading ? <CircularProgress size={'20px'} isIndeterminate color='green.300' /> : null}
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Stack>
            </Card>
        </div >
    );
};

export default AddShippedItem;