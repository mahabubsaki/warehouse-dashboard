import { Button, Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/Provider';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const RetrunTableRow = ({ pd, activePage, id, date, handleReturnList, show }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(show);
    return (
        <Tr>
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['teamCode'] || 'Not Found'}</Td>
            <Td>{pd['productName'] || 'Not Found'}</Td>
            <Td>{pd.returned || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td>{pd.returnLabel || 'Not Found'}</Td>
            {!show ? <Td className='flex flex-col gap-2'>
                {(user.role === 'storeManager' || user.role === 'admin' || user.role == 'warehouseAdmin') ? <Button onClick={() => navigate(`/returned-list/${pd._id}`)}>
                    Edit Stock
                </Button> : null}
                {(user.role === 'warehouseManager' || user.role === 'admin' || user.role == 'warehouseAdmin') ? <Button onClick={() => handleReturnList(pd._id)}>
                    Returned
                </Button> : null}

            </Td> : null}
        </Tr>
    );
};

export default RetrunTableRow;