import { Button, Link, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { TbTrashOff } from 'react-icons/tb';

const CustomerTableRow = ({ pd, id, activePage, handleShipped, shipped, action, oos, handleDeleteCustomer }) => {
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
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
            <Td>{pd['storeName'] || 'Not Found'}</Td>

            <Td>{pd['asin'] || 'Not Found'}</Td>

            <Td>{pd['codeType'] || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td> <textarea name="" value={pd.productName || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
            <Td>{pd.teamCode || 'Not Found'}</Td>
            <Td>{pd.quantity || 'Not Found'}</Td>
            <Td>{pd.courier || 'Not Found'}</Td>
            <Td>{pd.tracker ? <Link href={pd.tracker} isExternal color={'blue.500'} textDecor={'underline'}>{pd.tracker}</Link> : 'Not Found'}</Td>
            <Td>{pd.trackerID || 'Not Found'}</Td>
            <Td>{pd.shippingLabel ? <Link href={pd.shippingLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.shippingLabel}</Link> : 'Not Found'}</Td>
            <Td>{pd.slip || 'Not Found'}</Td>
            <Td>{pd.notes || 'Not Found'}</Td>
            {action ? null : (oos && (user.role == 'admin' || user.role == 'warehouseAdmin' || user.role == 'storeManager')) ? <Td><Button onClick={() => handleDeleteCustomer(pd._id)} colorScheme='green'>Solved</Button></Td> : !shipped ? <Td><Button onClick={() => navigate(`/add-warehouse-to-customer-list/${pd._id}`)}>Edit</Button></Td> : (user.role == 'admin' || user.role == 'warehouseManager' || user.role == 'warehouseAdmin') ? <Td><Button onClick={() => handleShipped(pd._id)}>Shipped</Button></Td> : null}
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteCustomer(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default CustomerTableRow;