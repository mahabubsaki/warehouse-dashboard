import { Button, Td, Tr } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { TbTrashOff } from 'react-icons/tb';

const StockTableRow = ({ pd, activePage, id, date, handleDeleteStock }) => {
    const { user } = useContext(AuthContext);
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
            <Td> <textarea name="" value={pd['productName'] || 'Not Found'} style={{ backgroundColor: 'transparent', resize: 'none' }} className='w-full min-h-[200px]' disabled></textarea></Td>

            <Td>{pd.totalRecieved || 'Not Found'}</Td>
            <Td>{pd.sold || 'Not Found'}</Td>
            <Td>{pd.stock || 'Not Found'}</Td>
            <Td>{pd.return || 'Not Found'}</Td>
            <Td>
                <Button onClick={() => navigate(`/stocks/${pd._id}`)}>
                    Edit Stock
                </Button>
            </Td>
            {user.role == 'admin' ? <Td><TbTrashOff className='text-3xl text-red-400 cursor-pointer hover:text-red-800 duration-100' onClick={() => handleDeleteStock(pd._id)} /></Td> : null}
        </Tr>
    );
};

export default StockTableRow;