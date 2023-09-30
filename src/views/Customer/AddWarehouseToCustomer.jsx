
import { Button, Card, CardBody, CircularProgress, Input, Stack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const AddWarehouseToCustomer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stores, setStores] = useState([]);
    const [storeName, setStoreName] = useState(null);
    const [singleasin, setSingleasin] = useState(null);
    const [teamCode, setTeamCode] = useState(null);
    const [asin, setasin] = useState([]);
    const [nameAndCode, setNameAndCode] = useState(null);
    const { user } = useContext(AuthContext);

    const axiosInstance = useAxios();

    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(user.role == 'admin' ? `get-store?email=${user.email}&select=yes` : `get-store?warehouse=${user.warehouse}&select=yes`, axiosInstance);
            const newData2 = await fetchdata(user.role == 'admin' ? `get-asin?email=${user.email}&select=yes` : `get-asin?warehouse=${user.warehouse}&select=yes`, axiosInstance);
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
        e.preventDefault();
        const form = e.target;

        const formData = {
            date: new Date(form.date.value),
            storeName: form['store-name'].value,
            asin: form.asin.value,
            codeType: form['code-type'].value,
            productName: form['product-name'].value,
            teamCode: form['team-code'].value,
            orderId: form['order-id'].value,
            quantity: form.quantity.value,
            courier: form.courier.value,
            shippingLabel: form['shipping-label'].value,
            trackerID: form.trackerID.value,
            invoice: !!form.invoice.value ? form.tracker.value : 'Not Available',
            tracker: form.tracker.value,
            addedDate: new Date(),
            slip: null,
            notes: null,
            email: user?.email,
            status: 'None',
            warehouse: user.warehouse
        };



        try {
            const response = await axiosInstance.post('add-customer', formData);

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
            toast.error(error?.response?.data?.message || error.message, {
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
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add Shipping Items</h1>
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
                                    <Input disabled value={autoDate} type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
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
                                    <label htmlFor="product-name">Product Name: </label>
                                    <Input readOnly value={nameAndCode ? nameAndCode.productName : ''} type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                                </div>
                                <div>
                                    <label htmlFor="team-code">Team Code: </label>
                                    <Input readOnly value={teamCode ? teamCode : ''} type="text" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
                                </div>
                                <div>
                                    <label htmlFor="order-id">Order ID: </label>
                                    <Input type="text" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="quantity">Quantity: </label>
                                    <Input type="number" className='mt-3' id='quantity' name='quantity' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="courier">Courier: </label>
                                    <Select className='mt-3' options={[{ value: 'USPS', label: 'USPS' }, { value: 'UPS', label: 'UPS' }, { value: 'FedEx', label: 'FedEx' }]} id='courier' name='courier' placeholder='Select Courier '>
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="shipping-label">Shipping Label: </label>
                                    <Input type="url" className='mt-3' id='shipping-label' name='shipping-label' placeholder='Enter Shipping Label' />
                                </div>
                                <div>
                                    <label htmlFor="invoice">Invoice: </label>
                                    <Input type="text" className='mt-3' id='invoice' name='invoice' placeholder='Enter Invoice' />
                                </div>
                                <div>
                                    <label htmlFor="tracker">Tracker: </label>
                                    <Input type="url" className='mt-3' id='tracker' name='tracker' placeholder='Enter Tracker' />
                                </div>
                                <div>
                                    <label htmlFor="trackerID">Tracker ID: </label>
                                    <Input type="text" className='mt-3' id='trackerID' name='trackerID' placeholder='Enter Tracker ID' />
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
        </div >
    );
};

export default AddWarehouseToCustomer;


