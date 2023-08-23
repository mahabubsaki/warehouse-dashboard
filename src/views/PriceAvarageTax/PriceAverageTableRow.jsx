import { Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PriceAverageTableRow = ({ pd, id, activePage, avgPrice, avgTaxQuan }) => {

    const dd = pd.date ? format(new Date(pd.date), 'P').split('/') : null;
    const eda = pd.eda ? format(new Date(pd.eda), 'P').split('/') : null;
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
            <Td>{pd['asin'] || 'Not Found'}</Td>
            <Td>{pd['walmartLink'] || 'Not Found'}</Td>
            <Td>{pd['walmartTracking'] || 'Not Found'}</Td>
            <Td>{pd.quantity || 'Not Found'}</Td>
            <Td>{pd.price || 'Not Found'}</Td>
            <Td>{pd.totalTax || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td>{pd.teamCode || 'Not Found'}</Td>
            <Td>{pd.quantityReceived || 'Not Found'}</Td>
            <Td>{pd.eda ? eda.reverse().join('-') : 'Not Found'}</Td>
            {id == 1 ? <> <Td rowSpan={10}>{avgPrice}</Td>
                <Td rowSpan={10}>{avgTaxQuan}</Td></> : null}
        </Tr>
    );
};

export default PriceAverageTableRow;