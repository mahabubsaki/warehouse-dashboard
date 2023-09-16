import { Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { TbTrashOff } from 'react-icons/tb';
import { AuthContext } from '../../context/Provider';

const AllWarehouseList = ({ pd, id, activePage, handleDeleteWarehouse }) => {
    const { user } = useContext(AuthContext);
    return (
        <Tr >
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd.name || 'Not Founed'}</Td>
            <Td>{pd.location || 'Not Founed'}</Td>
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteWarehouse(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default AllWarehouseList;