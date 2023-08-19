import React from 'react';
import { Button, Card, CardBody, Input, Stack } from '@chakra-ui/react';

const AddMissingItem = () => {
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Missing Items</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Stack>
                    <CardBody>
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
                                <label htmlFor="asin-upc">ASIN/UPC: </label>
                                <Input type="text" className='mt-3' id='asin-upc' name='asin-upc' placeholder='Enter ASIN/UPC' />
                            </div>
                            <div>
                                <label htmlFor="product-name">Product Name: </label>
                                <Input type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                            </div>
                            <div>
                                <label htmlFor="order-id">Order ID: </label>
                                <Input type="text" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                            </div>
                            <div>
                                <label htmlFor="team-code">Team Code: </label>
                                <Input type="text" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
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
                                <Input type="text" className='mt-3' id='supplier-tracker' name='supplier-tracker' placeholder='Enter Supplier Tracker' />
                            </div>
                            <div>
                                <label htmlFor="eda">EDA: </label>
                                <Input type="datetime-local" className='mt-3' id='eda' name='eda' placeholder='Estimated Date Of Arrival' />
                            </div>
                        </div>
                        <div className='flex my-6'>
                            <Button colorScheme='purple'>Add Missing Items</Button>
                        </div>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default AddMissingItem;