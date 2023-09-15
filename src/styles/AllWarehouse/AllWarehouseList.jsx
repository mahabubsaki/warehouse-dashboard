import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

const AllWarehouseList = ({ pd, id, activePage }) => {
    return (
        <Tr >
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd.name || 'Not Founed'}</Td>
            <Td>{pd.location || 'Not Founed'}</Td>
        </Tr>
    );
};

export default AllWarehouseList;