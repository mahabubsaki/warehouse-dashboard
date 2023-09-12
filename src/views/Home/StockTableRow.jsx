import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StockTableRow = ({ pd, activePage, id, date }) => {
    const dd = date ? format(new Date(pd.date), 'P').split('/') : null;
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
            {dd ? <Td>{pd.date ? dd.reverse().join('-') : 'Not Found'}</Td> : null}
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['teamCode'] || 'Not Found'}</Td>
            <Td>{pd['productName'] || 'Not Found'}</Td>
            <Td>{pd.totalRecieved || 'Not Found'}</Td>
            <Td>{pd.sold || 'Not Found'}</Td>
            <Td>{pd.stock || 'Not Found'}</Td>
            <Td>
                <Button onClick={() => navigate(`/stocks/${pd._id}`)}>
                    Edit Stock
                </Button>
            </Td>
        </Tr>
    );
};

export default StockTableRow;