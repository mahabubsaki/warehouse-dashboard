import { Button, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';

const ForgetPassModal = ({ isOpen, onOpen, onClose, finalRef }) => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(null);
    const [email, setEmail] = useState(null);
    const [verified, setVerified] = useState(false);
    const axiosInstance = useAxios();
    const flushStates = () => {
        setLoading(false);
        setOtp(false);
        setEmail(false);
        setVerified(false);
        onClose();
    };
    const handleChangePassWord = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const email = e.target.email.value;
            const { data: response } = await axiosInstance.post('send-otp', { email: email, type: 'update-pass' });

            setOtp(response.otp);
            setEmail(email);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        } finally {
            setLoading(false);
        }
    };
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const formOtp = e.target.otp.value;
            if (formOtp == otp) {
                setVerified(true);
            } else {
                toast.error("OTP is incorrect");
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        } finally {
            setLoading(false);
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const form = e.target;
            const formData = new FormData(form);
            setLoading(true);
            const password = formData.get('password');
            if (!/^(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
                return toast.error("Please give password more stronger (At least 8 character with the combination of number, letter and special letter [@,#,%,^,&])", {
                    id: 'clipboard',
                });
            }

            const confirmPassword = formData.get('confirm-password');
            if (password != confirmPassword) {
                return toast.error("Confirm Password didn't match", {
                    id: 'clipboard',
                });
            }
            const response = await axiosInstance.put('update-password', { email: email, password: password });
            flushStates();
            toast.success('Password updated successfully, You can now login with new password');
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
            flushStates();
        } finally {
            setLoading(false);
        }
    };
    return (


        <>

            <Modal
                isCentered
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => {
                    flushStates();
                }}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{!otp ? 'Forget your password' : !verified ? 'Verification' : 'Update Password'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {!otp ?
                            <>
                                <h1>Enter your email to get OTP for changing password</h1>
                                <form onSubmit={handleChangePassWord}>
                                    <FormLabel>Email</FormLabel>
                                    <Input required name='email' type='email' placeholder='Your Email Address' />
                                    <Button className='mt-4' type='submit' colorScheme='purple'>Forget Password</Button>
                                </form>  </>
                            : !verified ?
                                <>
                                    <h1>You will get an OTP via admin email</h1>
                                    <form onSubmit={handleVerifyOTP}>
                                        <Input required name='otp' type='number' placeholder='Give OTP from your admin email' />
                                        <Button className='mt-4' type='submit' colorScheme='purple'>Verify</Button>
                                    </form>
                                </> : <> <h1>Please give a new password which you easily can remember</h1>
                                    <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
                                        <Input required name='password' type='password' placeholder='Give New Password' />
                                        <Input required name='confirm-password' type='password' placeholder='Retype New Password' />
                                        <div>
                                            <Button className='mt-4' type='submit' colorScheme='purple'>Update</Button>
                                        </div>
                                    </form></>}
                        {loading ? <div className='flex justify-center mt-4'>
                            <Spinner />
                        </div> : null}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>


    );
};

export default ForgetPassModal;;