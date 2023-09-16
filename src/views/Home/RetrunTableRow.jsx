import { Button, Link, Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/Provider';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { TbTrashOff } from 'react-icons/tb';

const RetrunTableRow = ({ pd, activePage, id, date, handleReturnList, show, handleDeleteReturn }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Tr>
            <Td>{((activePage * 10) + id) - 10}</Td>
            <Td>{pd['storeName'] || 'Not Found'}</Td>
            <Td>{pd['teamCode'] || 'Not Found'}</Td>
            <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>
            <Td>{pd.returned || 'Not Found'}</Td>
            <Td>{pd.orderId || 'Not Found'}</Td>
            <Td>{pd.returnLabel ? <Link href={pd.returnLabel} isExternal color={'blue.500'} textDecor={'underline'}>{pd.returnLabel}</Link> : 'Not Found'}</Td>
            {!show ? <Td className='flex flex-col gap-2 justify-center'>
                {(user.role === 'storeManager' || user.role === 'admin' || user.role == 'warehouseAdmin') ? <Button onClick={() => navigate(`/returned-list/${pd._id}`)}>
                    Edit Stock
                </Button> : null}
                {(user.role === 'warehouseManager' || user.role === 'admin' || user.role == 'warehouseAdmin') ? <Button onClick={() => handleReturnList(pd._id)}>
                    Returned
                </Button> : null}

            </Td> : null}
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteReturn(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default RetrunTableRow;