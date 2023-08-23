import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerTableRow = ({ pd, id, activePage }) => {
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
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
            <Td>{pd['asin'] || 'Not Found'}</Td>
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['codeType'] || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td>{pd.productName || 'Not Found'}</Td>
            <Td>{pd.teamCode || 'Not Found'}</Td>
            <Td>{pd.quantity || 'Not Found'}</Td>
            <Td>{pd.courier || 'Not Found'}</Td>
            <Td>{pd.tracker || 'Not Found'}</Td>
            <Td>{pd.shippingLabel || 'Not Found'}</Td>
            <Td>{pd.slip || 'Not Found'}</Td>
            <Td>{pd.Notes || 'Not Found'}</Td>

            <Button onClick={() => navigate(`/add-warehouse-to-customer-list/${pd._id}`)}>Edit</Button>
        </Tr>
    );
};

export default CustomerTableRow;