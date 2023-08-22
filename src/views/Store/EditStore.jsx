import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Box, Button, Card, CardBody, CircularProgress, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

const EditStore = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [update, setUpdate] = useState(true);
    const { id: myId } = useParams();
    const [data, setData] = useState(null);
    const axiosInstance = useAxios();
    useEffect(() => {
        async function fetchdata() {
            const { data } = await axiosInstance.get(`get-single-store/${myId}`);
            setData(data);
        }
        fetchdata();
    }, [myId, update]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const storeManager = event.target['store-manager'].value;
        const notes = event.target.notes.value;
        const storeStatus = event.target['store-status'].value;

        const formData = {
            'store-manager-name': storeManager,
            notes: notes,
            status: storeStatus,
            id: myId
        };
        const { data } = await axiosInstance.put('update-store', formData);
        if (data.modifiedCount) {
            setUpdate((pre) => !pre);
            toast.success("Store details updated successfully");
        } else {
            toast.error("Something went wrong");
        }
        event.target.reset();
    };

    const { date, addedDate, notes, status, 'store-manager-name': storeManagerName, 'store-name': storeName, 'store-type': storeType, _id } = data || {};
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
                <h1 className='text-3xl font-medium text-center'>Store Details</h1>
                <p>Date : {date ? dd.reverse().join('-') : 'Not Found'}</p>
                <p>Store Name : {storeName}</p>
                <p>Store Manager Name : {storeManagerName}</p>
                <p>Store Type : {storeType}</p>
                <p>Store Status : {status}</p>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Update Details</h1>
                <form onSubmit={handleUpdate}>
                    <div className='flex gap-4 my-4'>
                        <div className='flex-1'>
                            <label htmlFor="store-manager">Store Manager: </label>
                            <Input type="text" className='mt-3' id='store-manager' name='store-manager' placeholder='Enter Store Manager Name' />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="notes">Notes: </label>
                            <Input type="text" className='mt-3' id='notes' name='notes' placeholder='Enter Notes' />
                        </div>
                    </div>
                    <div className='flex items-center gap-3 mt-3'>
                        <label htmlFor="store-status">Status: </label>
                        <RadioGroup name='store-status' defaultValue='active' >
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='yellow' value='active'>
                                    Active
                                </Radio>
                                <Radio colorScheme='blue' value='inactive'>
                                    Inactive
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </div>
                    <div className='flex my-6'>

                        <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                            <span>Update</span>
                            {isLoading ? <CircularProgress size={'20px'} isIndeterminate color='green.300' /> : null}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStore;