import { Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';

const StockTableRow = ({ pd, activePage, id, date }) => {
    const dd = date ? format(new Date(pd.date), 'P').split('/') : null;

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
            <Td>{pd.totalQuanity || 'Not Found'}</Td>

            <Td>Not Available</Td>
            <Td>Not Available</Td>
        </Tr>
    );
};

export default StockTableRow;