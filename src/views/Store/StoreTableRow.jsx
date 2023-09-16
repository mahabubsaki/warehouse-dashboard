import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { TbTrashOff } from 'react-icons/tb';

const StoreTableRow = ({ pd, id, activePage, handleDeleteStore }) => {
    const navigate = useNavigate();
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
    const { user } = useContext(AuthContext);
    if (dd) {
        const temp = dd[0];
        const temp2 = dd[1];
        dd[0] = temp2;
        dd[1] = temp;
    }
    return (
        <Tr >
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd.date ? dd.reverse().join('-') : 'Not Found'}</Td>
            <Td>
                {pd['store-name'] || 'Not Found'}</Td>
            <Td>{pd['store-manager-name'] || 'Not Found'}</Td>
            <Td>{pd['store-type'] || 'Not Found'}</Td>
            <Td>{pd.status || 'Not Found'}</Td>
            <Td>{pd.notes || 'Not Found'}</Td>
            {(user.role == 'admin' || user.role == 'warehouseAdmin') ? <Td>
                <Button onClick={() => navigate(`/store-list/${pd._id}`)}>Edit</Button>
            </Td> : null}
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteStore(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default StoreTableRow;