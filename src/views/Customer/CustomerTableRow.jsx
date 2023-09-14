import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';

const CustomerTableRow = ({ pd, id, activePage, handleShipped, shipped, action }) => {
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
            <Td>{pd.tracker || 'Not Found'}</Td>
            <Td>{pd.shippingLabel || 'Not Found'}</Td>
            <Td>{pd.slip || 'Not Found'}</Td>
            <Td>{pd.notes || 'Not Found'}</Td>

            {action ? null : !shipped ? <Button onClick={() => navigate(`/add-warehouse-to-customer-list/${pd._id}`)}>Edit</Button> : (user.role == 'admin' || user.role == 'warehouseManager' || user.role == 'warehouseAdmin') ? <Button onClick={() => handleShipped(pd._id)}>Shipped</Button> : null}
        </Tr>
    );
};

export default CustomerTableRow;