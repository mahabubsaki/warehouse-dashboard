import React, { useContext, useState } from 'react';
import { Button, Card, CardBody, CircularProgress, Input, Stack } from '@chakra-ui/react';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';
const AddPriceAvarageTax = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        const form = e.target;

        const formData = {
            date: new Date(form.date.value),
            asin: form.asin.value,
            walmartLink: form['walmart-link'].value,
            walmartTracking: form['walmart-tracking'].value,
            quantity: form.quantity.value,
            price: form.price.value,
            totalTax: form['total-tax'].value,
            orderId: form['order-id'].value,
            teamCode: form['team-code'].value,
            quantityReceived: form['quantity-recieved'].value,
            eda: form.eda.value,
            addedDate: new Date(),
            email: user?.email,
            admin: user?.role == 'admin',
            warehouse: user.warehouse
        };

        try {
            const response = await axiosInstance.post('add-tax', formData);

            if (response.data.acknowledged) {
                toast.success("Tax data added successfully", {
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

    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Average Price, Avarage TAX</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >


                <Stack>
                    <CardBody>
                        <form onSubmit={handleAdd}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="date">Date: </label>
                                    <Input type="date" className='mt-3' id='date' name='date' placeholder='Enter Date' />
                                </div>

                                <div>
                                    <label htmlFor="asin">ASIN: </label>
                                    <Input type="text" className='mt-3' id='asin' name='asin' placeholder='Enter ASIN Code' />
                                </div>
                                <div>
                                    <label htmlFor="walmart-link">Walmart Link: </label>
                                    <Input type="url" className='mt-3' id='walmart-link' name='walmart-link' placeholder='Enter Walmart Link' />
                                </div>
                                <div>
                                    <label htmlFor="walmart-tracking">Walmart Tracking: </label>
                                    <Input type="text" className='mt-3' id='walmart-tracking' name='walmart-tracking' placeholder='Enter Walmart Tracking' />
                                </div>
                                <div>
                                    <label htmlFor="quantity">Quantity: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='quantity' name='quantity' placeholder='Enter Quantity' />
                                </div>
                                <div>
                                    <label htmlFor="price">Price: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='price' name='price' placeholder='Enter Price' />
                                </div>
                                <div>
                                    <label htmlFor="total-tax">Total TAX: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='total-tax' name='total-tax' placeholder='Enter Total TAX' />
                                </div>
                                <div>
                                    <label htmlFor="order-id">Order ID: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='order-id' name='order-id' placeholder='Enter Order ID' />
                                </div>
                                <div>
                                    <label htmlFor="team-code">Team Code: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='team-code' name='team-code' placeholder='Enter Team Code' />
                                </div>
                                <div>
                                    <label htmlFor="quantity-recieved">Quantity Recieved: </label>
                                    <Input type="number" step="0.00001" className='mt-3' id='quantity-recieved' name='quantity-recieved' placeholder='Enter Quantity Recieved' />
                                </div>
                                <div>
                                    <label htmlFor="eda">EDA: </label>
                                    <Input type="date" className='mt-3' id='eda' name='eda' placeholder='Estimated Date Of Arrival' />
                                </div>
                            </div>
                            <div className='flex my-6'>
                                {/* <Button type='submit' colorScheme='purple'>Add Avarage Price, Avarage Tax</Button> */}
                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add Avarage Price, Avarage Tax</span>
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

export default AddPriceAvarageTax;;