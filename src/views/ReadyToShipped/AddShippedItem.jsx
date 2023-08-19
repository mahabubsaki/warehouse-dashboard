import React from 'react';
import { Button, Card, CardBody, Input, Stack } from '@chakra-ui/react';

const AddShippedItem = () => {
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Ready To Shipped</h1>
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
                                <label htmlFor="code-type">Code Type: </label>
                                <Input type="text" className='mt-3' id='code-type' name='code-type' placeholder='Enter Code Type' />
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
                                <label htmlFor="courier">Courier: </label>
                                <Input type="text" className='mt-3' id='courier' name='courier' placeholder='Enter Courier' />
                            </div>
                            <div>
                                <label htmlFor="tracker">Tracker: </label>
                                <Input type="text" className='mt-3' id='tracker' name='tracker' placeholder='Enter Tracker' />
                            </div>
                            <div>
                                <label htmlFor="order-id">Order ID: </label>
                                <Input type="text" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                            </div>
                            <div>
                                <label htmlFor="shipping-label">Shipping Label: </label>
                                <Input type="text" className='mt-3' id='shipping-label' name='shipping-label' placeholder='Enter Shipping Label' />
                            </div>
                        </div>
                        <div className='flex my-6'>
                            <Button colorScheme='purple'>Add Ready To Shipped</Button>
                        </div>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default AddShippedItem;