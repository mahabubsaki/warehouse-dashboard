import React, { useContext, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/Provider';
import { Button, Card, CardBody, CircularProgress, Input, Stack } from '@chakra-ui/react';
import { toast } from 'react-hot-toast';

const AddWarehouse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const handlePostStore = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);

        const formData = {
            name: e.target.name.value,
            location: e.target.location.value
        };
        try {
            const response = await axiosInstance.post('add-warehouse', formData);

            if (response.data.acknowledged) {
                toast.success("Warehouse added successfully", {
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

    return (
        <div>
            <h1 className='text-center my-5 text-3xl font-semibold'>Add Warehouse</h1>
            <Card
                overflow='hidden'
                variant='outline'
            >
                <Stack>
                    <CardBody>
                        <form onSubmit={handlePostStore}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3'>
                                <div>
                                    <label htmlFor="name">Warehouse Name: </label>
                                    <Input required type="text" className='mt-3' id='name' name='name' placeholder='Enter Warehouse Name' />
                                </div>
                                <div>
                                    <label htmlFor="location">Warehouse Location: </label>
                                    <Input required type="text" className='mt-3' id='location' name='location' placeholder='Enter Loction ' />
                                </div>
                            </div>
                            <div className='flex my-6'>

                                <Button disabled={isLoading} type='submit' className='flex gap-3' colorScheme={`purple`}>
                                    <span>Add Warehouse</span>
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

export default AddWarehouse;