import { Button, Card, CardBody, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';

const AddStore = () => {
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add Store</h1>
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
                                <label htmlFor="store-manager-name">Store Manager Name: </label>
                                <Input type="text" className='mt-3' id='store-manager-name' name='store-manager-name' placeholder='Enter Store Manager Name' />
                            </div>
                            <div>
                                <label htmlFor="store-type">Store Type: </label>
                                <RadioGroup name='store-type' defaultValue='amazon' className='mt-3'>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='yellow' value='amazon'>
                                            Amazon
                                        </Radio>
                                        <Radio colorScheme='blue' value='walmart'>
                                            Walmart
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className='flex my-6'>
                            <Button colorScheme='purple'>Add Store</Button>
                        </div>
                    </CardBody>
                </Stack>
            </Card>
        </div>
    );
};

export default AddStore;