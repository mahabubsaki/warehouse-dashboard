import { Button, Link, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { TbTrashOff } from 'react-icons/tb';

const AsinTableRow = ({ pd, id, activePage, handleDeleteAsin }) => {
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (dd) {
        const temp = dd[0];
        const temp2 = dd[1];
        dd[0] = temp2;
        dd[1] = temp;
    }
    return (
        <Tr>
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd.date ? dd.reverse().join('-') : 'Not Found'}</Td>
            <Td>{pd['asinUpcCode'] || 'Not Found'}</Td>
            <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
            <Td>${pd['minimumPrice'] || 'Not Found'}</Td>
            <Td>{pd.storeType || 'Not Found'}</Td>
            <Td>{pd.storeManagerName || 'Not Found'}</Td>
            <Td>{pd.productImage ? <Link href={pd.productImage} isExternal color={'blue.500'} textDecor={'underline'}>Link</Link> : 'Not Found'}</Td>
            <Td><Button onClick={() => navigate(`/add-asin-upc-list/${pd._id}`)}>Edit</Button></Td>
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteAsin(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default AsinTableRow;