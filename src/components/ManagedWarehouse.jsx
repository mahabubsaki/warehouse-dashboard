import React, { useContext } from 'react';
import { AuthContext } from '../context/Provider';
import { Badge, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const ManagedWarehouse = () => {
    const { user, setUser } = useContext(AuthContext);

    const handleOnClick = (w) => {
        setUser(p => {
            return { ...p, warehouse: w.warehouse, role: w.role, warehouseName: w.warehouseName };
        });
    };
    return (
        <div>

            <TableContainer>
                <Table size={'lg'} variant='simple'>
                    <Thead fontStyle={'italic'} backgroundColor={'#B5FE83'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Warehouse Name</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            user.warehouses.map((i, idx) => <Tr>
                                <Td>{idx + 1}</Td>
                                <Td>{i.warehouseName}</Td>
                                <Td>{i.role}</Td>
                                {user.warehouse != i.warehouse ? <Td>
                                    <Button onClick={() => handleOnClick(i)}>Switch Warehouse</Button>
                                </Td> : <Td>
                                    <Badge colorScheme='green'>Active</Badge></Td>}
                            </Tr>)
                        }
                    </Tbody>

                </Table>
            </TableContainer>
        </div>
    );
};

export default ManagedWarehouse;