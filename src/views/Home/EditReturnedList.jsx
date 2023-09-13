import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Button, Input } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

const EditReturnedList = () => {
    const { id: myId } = useParams();
    const axiosInstance = useAxios();
    const handleReturn = async (e) => {
        e.preventDefault();
        const data = { id: myId, orderId: e.target.orderId.value, returnLabel: e.target.returnLabel.value };
        console.log(data);
        try {
            const response = await axiosInstance.put('update-returned', data);
            toast.success("Edited Return Data successfully", {
                id: 'clipboard',
            });
        }
        catch (err) {

            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });

        }
    };
    return (
        <div>
            <form onSubmit={handleReturn} className='flex flex-col items-center justify-center gap-4'>
                <Input type="text" className='mt-3 max-w-lg mx-auto px-5' id='orderId' name='orderId' placeholder='Enter Order ID' />
                <Input type="text" className='mt-3 max-w-lg mx-auto px-5' id='returnLabel' name='returnLabel' placeholder='Enter Return Label' />
                <Button type='submit' className='flex gap-3' colorScheme={`purple`}>
                    Update
                </Button>
            </form>
        </div>
    );
};

export default EditReturnedList;