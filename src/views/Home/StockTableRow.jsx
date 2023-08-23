import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

const StockTableRow = ({ pd, activePage, id }) => {
    console.log(pd);
    return (
        <Tr>
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['teamCode'] || 'Not Found'}</Td>
            <Td>{pd['productName'] || 'Not Found'}</Td>
            <Td>{pd.recievedQuanity || 'Not Found'}</Td>

            <Td>{(pd.recievedQuanity && pd.quantity) ? pd.recievedQuanity - pd.quantity : '0'}</Td>
            <Td>{pd.quantity || 'Not Found'}</Td>
        </Tr>
    );
};

export default StockTableRow;