import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Button, Input } from '@chakra-ui/react';
import { format } from 'date-fns';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Provider';

const EditMissing = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [update, setUpdate] = useState(true);
    const { id: myId } = useParams();
    const [data, setData] = useState(null);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        async function fetchdata() {
            const { data } = await axiosInstance.get(`get-single-missing/${myId}`);
            setData(data);
        }
        fetchdata();
    }, [myId, update]);

    const handleUpdate = async (event) => {
        event.preventDefault();

        const status = event?.target?.status?.value;
        const solvedqty = event.target?.solvedqty?.value;

        const formData = user.role == 'warehouseManager' ? {
            solvedqty,
            id: myId
        } : {
            status,
            id: myId
        };
        try {
            const { data } = await axiosInstance.put('update-missing', formData);
            console.log(data);
            if (data.modifiedCount) {
                setUpdate((pre) => !pre);
                toast.success("Missing Details Updated succesfully", {
                    id: 'clipboard',
                });
            } else {
                toast.error("Something went wrong", {
                    id: 'clipboard',
                });
            }
            event.target.reset();
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }

    };

    const { date, addedDate, asinUpc, productName, storeName, teamCode, expectedQuantity, receivedQuantity, missingQuantity, eda, supplierTracker, _id, status } = data || {};
    const dd = date ? format(new Date(date), 'P').split('/') : null;
    if (dd) {
        const temp = dd[0];
        const temp2 = dd[1];
        dd[0] = temp2;
        dd[1] = temp;
    }
    const edd = eda ? format(new Date(eda), 'P').split('/') : null;
    if (edd) {
        const temp = edd[0];
        const temp2 = edd[1];
        edd[0] = temp2;
        edd[1] = temp;
    }
    return (
        <div className='flex flex-col md:flex-row bg-white shadow-md p-12 gap-8'>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Supplier Details</h1>
                <p>Date : {date ? dd.reverse().join('-') : 'Not Found'}</p>
                <p>Store Name : {storeName || 'Not found'}</p>
                <p>ASIN : {asinUpc || 'Not found'}</p>
                <p>Expected Quantity : {expectedQuantity || 'Not found'}</p>
                <p>Recieved Quantity : {receivedQuantity || 'Not found'}</p>
                <p>Missing Quantity : {missingQuantity || 'Not found'}</p>
                <p>Team Code : {teamCode || 'Not found'}</p>
                <p>Product Name : {productName || 'Not found'}</p>
                <p>EDA : {eda ? edd.reverse().join('-') : 'Not Found'}</p>
                <p>Supplier Tracker : {supplierTracker || 'Not found'}</p>
                <p>Status : {status || 'None'}</p>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Update Details</h1>
                <form onSubmit={handleUpdate}>
                    <div className='flex gap-4 my-4'>
                        {user.role == 'warehouseManager' ? <div className='flex-1'>


                            <label htmlFor="solvedqty">Quantity: </label>
                            <Input type="number" step="0.00001" className='mt-3' id='solvedqty' name='solvedqty' placeholder='Enter Missing Item Solved Quantity' />
                        </div> : <div className='flex-1'>
                            <label htmlFor="status">Status: </label>
                            <Select className='mt-3' options={[{ value: 'Solved', label: 'Solved' }]} id='status' name='status' placeholder='Select Courier '>
                            </Select>
                        </div>}



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

export default EditMissing;