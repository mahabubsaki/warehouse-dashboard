import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Button, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const EditCustomer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const [update, setUpdate] = useState(true);
    const { id: myId } = useParams();
    const [data, setData] = useState(null);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchdata() {
            const { data } = await axiosInstance.get(`get-single-customer/${myId}`);
            setData(data);
        }
        fetchdata();
    }, [myId, update]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const courier = event.target['courier'].value;
        const tracker = event.target.tracker.value;
        const notes = event.target.notes.value;
        const invoice = event.target.invoice.value;
        const shippingLabel = event.target.label.value;

        const formData = {
            courier: courier.toLowerCase(),
            tracker,
            notes,
            invoice,
            id: myId,
            shippingLabel
        };
        const { data } = await axiosInstance.put('update-customer', formData);
        if (data.modifiedCount) {
            setUpdate((pre) => !pre);
            toast.success("Supplier Details Updated succesfully", {
                id: 'clipboard',
            });
        } else {
            toast.error("Something went wrong", {
                id: 'clipboard',
            });
        }
        event.target.reset();
    };
    const handleBtnUpdate = async (status) => {
        const { data } = await axiosInstance.put('update-customer', { status: status, id: myId });
        if (data.modifiedCount) {
            setUpdate((pre) => !pre);
            toast.success("Supplier Details Updated succesfully", {
                id: 'clipboard',
            });
            navigate('/');
        } else {
            toast.error("Something went wrong", {
                id: 'clipboard',
            });
        }
    };
    const { date, addedDate, storeName, asin, quantity, courier, teamCode, productName, tracker, shippingLabel, invoice } = data || {};
    const dd = date ? format(new Date(date), 'P').split('/') : null;
    if (dd) {
        const temp = dd[0];
        const temp2 = dd[1];
        dd[0] = temp2;
        dd[1] = temp;
    }

    return (
        <div className='flex flex-col md:flex-row bg-white shadow-md p-12 gap-8'>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Customer Details</h1>
                <p>Date : {date ? dd.reverse().join('-') : 'Not Found'}</p>
                <p>Store Name : {storeName || 'Not found'}</p>
                <p>ASIN : {asin || 'Not found'}</p>
                <p>Quantity : {quantity || 'Not found'}</p>
                <p>Courier : {courier || 'Not found'}</p>
                <p>Team Code : {teamCode || 'Not found'}</p>
                <p>Product Name : {productName || 'Not found'}</p>
                <p>Supplier Tracker : {tracker || 'Not found'}</p>
                <p>Supplier Label : {shippingLabel || 'Not found'}</p>
                <p>Invoice : {invoice || 'Not found'}</p>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Update Details</h1>
                {(user.role == 'admin' || user.role == 'storeManager') ? <form onSubmit={handleUpdate}>
                    <div className='flex gap-4 my-4'>
                        <div className='flex-1'>
                            <label htmlFor="tracker">Supplier Tracker: </label>
                            <Input type="text" className='mt-3' id='tracker' name='tracker' placeholder='Enter Supplier Tracker' />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="label">Shipping Label: </label>
                            <Input type="text" className='mt-3' id='label' name='label' placeholder='Enter Shipping Label' />
                        </div>

                    </div>
                    <div className='flex gap-4 my-4'>
                        <div className='flex-1'>
                            <label htmlFor="notes">Notes: </label>
                            <Input type="text" className='mt-3' id='notes' name='notes' placeholder='Enter Notes' />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="invoice">Invoice: </label>
                            <Input type="text" className='mt-3' id='invoice' name='invoice' placeholder='Enter Invoice' />
                        </div>
                    </div>
                    <div className='my-4'>
                        <div className='flex items-center gap-3 mt-3'>
                            <label htmlFor="courier">Courier: </label>
                            <RadioGroup name='courier' defaultValue='USPS' >
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='blue' value='USPS'>
                                        USPS
                                    </Radio>
                                    <Radio colorScheme='blue' value='UPS'>
                                        UPS
                                    </Radio>
                                    <Radio colorScheme='blue' value='FedEx'>
                                        FedEx
                                    </Radio>
                                    <Radio colorScheme='blue' value='Other'>
                                        Other
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='flex my-6'>

                        <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                            <span>Update</span>
                            {isLoading ? <CircularProgress size={'20px'} isIndeterminate color='green.300' /> : null}
                        </Button>
                    </div>
                </form> : <div className='flex justify-center gap-5 my-4'>
                    <Button onClick={() => handleBtnUpdate('Ready')}>Ready To Shipped</Button>
                    <Button onClick={() => handleBtnUpdate('OOS')}>Out Of Stock</Button>
                </div>}
            </div>
        </div>
    );
};

export default EditCustomer;