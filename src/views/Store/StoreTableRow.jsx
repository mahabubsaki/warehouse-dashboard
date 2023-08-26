import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoreTableRow = ({ pd, id, activePage }) => {
    const navigate = useNavigate();
    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;

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
            <Td className='ds'>{pd['store-name'] || 'Not Found'}</Td>
            <Td>{pd['store-manager-name'] || 'Not Found'}</Td>
            <Td>{pd['store-type'] || 'Not Found'}</Td>
            <Td>{pd.status || 'Not Found'}</Td>
            <Td>{pd.notes || 'Not Found'}</Td>
            <Button onClick={() => navigate(`/store-list/${pd._id}`)}>Edit</Button>
        </Tr>
    );
};

export default StoreTableRow;