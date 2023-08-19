import React from 'react';
import { Button, Card, CardBody, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';

const AddASINUPC = () => {
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add ASIN/UPC</h1>
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
                                <label htmlFor="asin-upc-code">ASIN/UPC Code: </label>
                                <Input type="text" className='mt-3' id='asin-upc-code' name='asin-upc-code' placeholder='Enter ASIN/UPC Code' />
                            </div>
                            <div>
                                <label htmlFor="store-manager-name">Store Manager Name: </label>
                                <Input type="text" className='mt-3' id='store-manager-name' name='store-manager-name' placeholder='Enter Store Manager Name' />
                            </div>
                            <div>
                                <label htmlFor="product-name">Product Name: </label>
                                <Input type="text" className='mt-3' id='product-name' name='product-name' placeholder='Enter Product Name' />
                            </div>
                            <div>
                                <label htmlFor="product-image">Product Image: </label>
                                <Input type="url" className='mt-3' id='product-image' name='product-image' placeholder='Enter Product Image URL' />
                            </div>
                            <div>
                                <label htmlFor="minium-price">Minimum Price: </label>
                                <Input type="number" className='mt-3' id='minium-price' name='minium-price' placeholder='Enter Minimum Price' />
                            </div>
                            <div>
                                <label htmlFor="store-type">Code Type: </label>
                                <RadioGroup name='store-type' defaultValue='asin' className='mt-3'>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='yellow' value='asin'>
                                            ASIN
                                        </Radio>
                                        <Radio colorScheme='blue' value='upc'>
                                            UPC
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className='flex my-6'>
                            <Button colorScheme='purple'>Add ASIN/UPC</Button>
                        </div>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default AddASINUPC;