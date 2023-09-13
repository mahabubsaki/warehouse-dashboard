import { Button, Input } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-hot-toast';

const EditStock = () => {
    const { id: myId } = useParams();
    const axiosInstance = useAxios();
    const handleReturn = async (e) => {
        e.preventDefault();
        const data = { id: myId, returned: e.target.returnqty.value };
        console.log(data);
        try {
            const response = await axiosInstance.put('update-stock', data);
            toast.success("Edited Stock successfully", {
                id: 'clipboard',
            });
        }
        catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });

        }
    };
    return (
        <div>
            <form onSubmit={handleReturn} className='flex flex-col items-center justify-center gap-4'>
                <Input type="number" step="0.00001" className='mt-3 max-w-lg mx-auto px-5' id='solvedqty' name='returnqty' placeholder='Enter Returned Quantity' />
                <Button type='submit' className='flex gap-3' colorScheme={`purple`}>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default EditStock;