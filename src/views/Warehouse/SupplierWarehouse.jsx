import { Button, Card, CardBody, Input, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';

const SupplierWarehouse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();
    const handleAddtoWarehouse = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        const date = e.target.date.value;
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
            courier: null,
            supplierTracker: null,
            addedDate: new Date()
        };
        try {
            const response = await axiosInstance.post('add-supplier', formData);
            console.log('POST response:', response.data);
            if (response.data.acknowledged) {
                toast.success("Supplier data added successfully to warehouse");
            } else {
                toast.error("Something went wrong");
            }


        } catch (error) {
            console.error('Error posting data:', error);
            toast.error(error.message);

        }
        finally {
            setIsLoading(false);
            // e.target.reset();
        }
    };
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
                                    <Input type="datetime-local" className='mt-3' id='date' name='date' placeholder='Enter Date' />
                                </div>
                                <div>
                                    <label htmlFor="store-name">Store Name: </label>
                                    <Input type="text" className='mt-3' id='store-name' name='store-name' placeholder='Enter Store Name' />
                                </div>
                                <div>
                                    <label htmlFor="asin">ASIN: </label>
                                    <Input type="text" className='mt-3' id='asin' name='asin' placeholder='Enter ASIN Code' />
                                </div>
                                <div>
                                    <label htmlFor="code-type">Code Type: </label>
                                    <Input type="text" className='mt-3' id='code-type' name='code-type' placeholder='Enter Code Type' />
                                </div>
                                <div>
                                    <label htmlFor="supplier-order-id">Supplier Order ID: </label>
                                    <Input type="text" className='mt-3' id='supplier-order-id' name='supplier-order-id' placeholder='Enter Supplier Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="product-name">Product Name: </label>
                                    <Input type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                                </div>
                                <div>
                                    <label htmlFor="team-code">Team Code: </label>
                                    <Input type="text" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
                                </div>
                                <div>
                                    <label htmlFor="quantity">Quantity: </label>
                                    <Input type="number" className='mt-3' id='quantity' name='quantity' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="unit-price">Unit Price: </label>
                                    <Input type="number" className='mt-3' id='unit-price' name='unit-price' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="eda">EDA: </label>
                                    <Input type="datetime-local" className='mt-3' id='eda' name='eda' placeholder='Estimated Date Of Arrival' />
                                </div>
                            </div>
                            <div className='flex my-6'>
                                <Button type='submit' colorScheme='purple'>Add Order To Warehouse</Button>
                            </div>
                        </form>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default SupplierWarehouse;
