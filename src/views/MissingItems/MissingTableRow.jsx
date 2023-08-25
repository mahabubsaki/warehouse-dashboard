import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MissingTableRow = ({ pd, activePage, id }) => {
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
    const eda = pd.eda ? format(new Date(pd.eda), 'P').split('/') : null;
    const navigate = useNavigate();
    if (dd) {
        const temp = dd[0];
        const temp2 = dd[1];
        dd[0] = temp2;
        dd[1] = temp;
    }
    if (eda) {
        const temp = eda[0];
        const temp2 = eda[1];
        eda[0] = temp2;
        eda[1] = temp;
    }
    return (
        <Tr>
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd.date ? dd.reverse().join('-') : 'Not Found'}</Td>
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['asinUpc'] || 'Not Found'}</Td>
            <Td>{pd['productName'] || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td>{pd.teamCode || 'Not Found'}</Td>
            <Td>{pd.expectedQuantity || 'Not Found'}</Td>
            <Td>{pd.receivedQuantity || 'Not Found'}</Td>
            <Td>{pd.supplierTracker || 'Not Found'}</Td>
            <Td>{pd.eda ? eda.reverse().join('-') : 'Not Found'}</Td>
            <Button onClick={() => navigate(`/add-missing-item-list/${pd._id}`)}>Edit</Button>
        </Tr>
    );
};

export default MissingTableRow;