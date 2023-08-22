import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AsinTableRow = ({ pd, id, activePage }) => {
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
            <Td>{pd['asinUpcCode'] || 'Not Found'}</Td>
            <Td>{pd['productName'] || 'Not Found'}</Td>
            <Td>${pd['minimumPrice'] || 'Not Found'}</Td>
            <Td>{pd.storeType || 'Not Found'}</Td>
            <Td>{pd.storeManagerName || 'Not Found'}</Td>
            <Td>{pd.productImage || 'Not Found'}</Td>
            <Button onClick={() => navigate(`/add-asin-upc-list/${pd._id}`)}>Edit</Button>
        </Tr>
    );
};

export default AsinTableRow;