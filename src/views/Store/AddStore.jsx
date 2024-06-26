import { Button, Card, CardBody, CircularProgress, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const AddStore = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const handlePostStore = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        const formData = {
            date: new Date(e.target.date.value),
            'store-name': e.target['store-name'].value,
            'store-manager-name': e.target['store-manager-name'].value,
            'store-type': e.target['store-type'].value,
            status: 'empty',
            notes: 'empty',
            email: user?.email,
            addedDate: new Date(),
            warehouse: user.warehouse
        };
        try {
            const response = await axiosInstance.post('add-store', formData);

            if (response.data.acknowledged) {
                toast.success("Store added successfully", {
                    id: 'clipboard',
                });
            } else {
                toast.error("Something went wrong", {
                    id: 'clipboard',
                });
            }


        } catch (err) {

            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });

        }
        finally {
            setIsLoading(false);
            e.target.reset();
        }
    };
    const [autoDate, setAutoDate] = useState(new Date().toISOString().split('T')[0]);
    useEffect(() => {
        const [month, date, year] = new Date().toLocaleDateString().split('/');
        setAutoDate(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`);
    }, []);
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add Store</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Stack>
                    <CardBody>
                        <form onSubmit={handlePostStore}>
                            <div onSubmit={handlePostStore} className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Input disabled value={autoDate} type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
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

                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add Store</span>
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

export default AddStore;