import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';

const ForgetPassModal = ({ isOpen, onOpen, onClose, finalRef }) => {
    return (


        <>

            <Modal
                isCentered
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forget your password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Your Email Address' />
                        </FormControl>
                        <Button className='mt-4' colorScheme='purple'>Forget Password</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>


    );
};

export default ForgetPassModal;