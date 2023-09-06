import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, CardBody, CircularProgress, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const AddASINUPC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const handlePostAsin = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        const formData = {
            date: new Date(e.target.date.value),
            asinUpcCode: e.target['asin-upc-code'].value,
            storeManagerName: e.target['store-manager-name'].value,
            productName: e.target['product-name'].value,
            productImage: e.target['product-image'].value,
            minimumPrice: e.target['minium-price'].value,
            storeType: e.target['store-type'].value,
            email: user?.email
        };
        console.log(formData);
        try {
            const response = await axiosInstance.post('add-asin', formData);
            console.log('POST response:', response.data);
            if (response.data.acknowledged) {
                toast.success("ASIN/UPC added successfully", {
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
            // e.target.reset();
        }
    };
    const [autoDate, setAutoDate] = useState(new Date().toISOString().split('T')[0]);
    useEffect(() => {
        const [month, date, year] = new Date().toLocaleDateString().split('/');
        setAutoDate(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}`);
    }, []);
    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add ASIN/UPC</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Stack>
                    <CardBody>
                        <form onSubmit={handlePostAsin}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Input disabled value={autoDate} type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
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
                                    <Input type="number" step="0.00001" className='mt-3' id='minium-price' name='minium-price' placeholder='Enter Minimum Price' />
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
                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add ASIN/UPC</span>
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

export default AddASINUPC;