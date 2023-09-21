import { Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useState } from 'react';

const StockSearchModal = ({ isOpen, onClose }) => {
    const productNames = [
        "LuminousGlo",
        "EcoSculpt",
        "AquaVista",
        "ZenithBlend",
        "NovaSpark",
        "CrimsonWave",
        "PureHarbor",
        "SapphireBreeze",
        "VerdeVue",
        "RadiantRipple",
        "TranquilEcho",
        "UrbanPulse",
        "VitalNova",
        "CelestialMist",
        "SolarFlare",
        "NaturaGlow",
        "MystiCrest",
        "InfiniteSol",
        "ElevateFlex",
        "EnigmaShift"
    ];

    const [state, setState] = useState([]);


    return (

        <Modal isOpen={isOpen} size={'2xl'} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <div className='w-[90%] mx-auto py-5'>
                        <Input onChange={(e) => {
                            const value = e.target.value;

                            const filter = productNames.filter(pd => pd.toLowerCase().includes(value.toLowerCase()));

                            setState(filter);
                        }} placeholder='Search Here...' />
                    </div>
                    <div>
                        {state.map((p, id) => <p key={id}>{p}</p>)}
                    </div>
                </ModalBody>


            </ModalContent>
        </Modal>
    );
};

export default StockSearchModal;