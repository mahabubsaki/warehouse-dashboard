import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Button, CircularProgress, Input } from '@chakra-ui/react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import Select from 'react-select';
const EditSupplierWarehouse = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [update, setUpdate] = useState(true);
    const { id: myId } = useParams();
    const [data, setData] = useState(null);
    const axiosInstance = useAxios();
    useEffect(() => {
        async function fetchdata() {
            const { data } = await axiosInstance.get(`get-single-supplier/${myId}`);
            setData(data);
        }
        fetchdata();
    }, [myId, update]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const courier = event.target['courier'].value;
        const supplierTracker = event.target.tracker.value;

        const formData = {
            courier: courier.toLowerCase(),
            supplierTracker,
            id: myId
        };
        const { data } = await axiosInstance.put('update-supplier', formData);
        console.log(data);
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

    const { date, addedDate, asin, codeType, supplierOrderId, productName, teamCode, quantity, unitPrice, eda, courier, supplierTracker, _id, storeName } = data || {};
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
                <p>ASIN : {asin || 'Not found'}</p>
                <p>Quantity : {quantity || 'Not found'}</p>
                <p>Courier : {courier || 'Not found'}</p>
                <p>Team Code : {teamCode || 'Not found'}</p>
                <p>Product Name : {productName || 'Not found'}</p>
                <p>EDA : {eda ? edd.reverse().join('-') : 'Not Found'}</p>
                <p>Supplier Tracker : {supplierTracker || 'Not found'}</p>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Update Details</h1>
                <form onSubmit={handleUpdate}>
                    <div className='flex gap-4 my-4'>
                        <div className='flex-1'>
                            <label htmlFor="courier">Courier: </label>

                            <label htmlFor="courier">Courier: </label>
                            <Select className='mt-3' options={[{ value: 'USPS', label: 'USPC' }, { value: 'UPS', label: 'UPS' }, { value: 'FedEx', label: 'FedEx' }, { value: 'Doordash', label: 'Doordash' }, { value: 'Hand Delivery', label: 'Hand Delivery' }, { value: 'TBA', label: 'TBA' }]} id='courier' name='courier' placeholder='Select Courier '>
                            </Select>
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="tracker">Supplier Tracker: </label>
                            <Input type="text" className='mt-3' id='tracker' name='tracker' placeholder='Enter Supplier Tracker' />
                        </div>
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

export default EditSupplierWarehouse;