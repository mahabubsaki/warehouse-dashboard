import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Button, CircularProgress, Input } from '@chakra-ui/react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';

const EditAsin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [update, setUpdate] = useState(true);
    const { id: myId } = useParams();
    const [data, setData] = useState(null);
    const axiosInstance = useAxios();
    useEffect(() => {
        async function fetchdata() {
            const { data } = await axiosInstance.get(`get-single-asin/${myId}`);
            setData(data);
        }
        fetchdata();
    }, [myId, update]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const minimumPrice = event.target['minimum-price'].value;
        const productImage = event.target['product-image'].value;

        const formData = {
            minimumPrice: minimumPrice,
            productImage,
            id: myId
        };
        const { data } = await axiosInstance.put('update-asin', formData);
        if (data.modifiedCount) {
            setUpdate((pre) => !pre);
            toast.success("Store details updated successfully", {
                id: 'clipboard',
            });
        } else {
            toast.error("Something went wrong", {
                id: 'clipboard',
            });
        }
        event.target.reset();
    };

    const { date, addedDate, asinUpcCode, storeManagerName,
        productName, minimumPrice } = data || {};
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
                <p>ASIN/UPC Code : {asinUpcCode}</p>
                <p>Store Manager Name : {storeManagerName}</p>
                <p>Product Name : {productName}</p>
                <p>Old Minimum Price : {minimumPrice}</p>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-medium text-center'>Update Details</h1>
                <form onSubmit={handleUpdate}>
                    <div className='flex gap-4 my-4'>
                        <div className='flex-1'>
                            <label htmlFor="minimum-price">New Minimum Price: </label>
                            <Input type="number" step="0.00001" className='mt-3' id='minimum-price' name='minimum-price' placeholder='Enter New Minimum Price' />
                        </div>
                        <div className='flex-1'>
                            <label htmlFor="product-image">Product Image: </label>
                            <Input type="url" className='mt-3' id='product-image' name='product-image' placeholder='Enter Product Image Link' />
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

export default EditAsin;