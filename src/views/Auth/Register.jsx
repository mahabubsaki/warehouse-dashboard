import Select from 'react-select';
import { Select as CSelect } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';

const Register = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    console.log(warehouses);
    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get('name');
        const role = formData.get('role');
        const location = formData.get('location');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const warehouse = formData.get('warehouse');

        const data = { name, role, location, email, password, confirmPassword, warehouse };
        try {
            const { data: response } = await axiosInstance.post('signup', data);
            console.log(response);
            setUser({ name: response.name, email: response.email, role: response.role, location: response.location, id: response.id, warehouse: response.warehouse });
            localStorage.setItem('token', response.token);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }

    };
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    useEffect(() => {
        async function fs() {
            const newData = await fetchdata(`get-warehouse?&select=yes`, axiosInstance);

            setWarehouses(newData.data.map(e => {
                return { value: e._id, label: e.name };
            }));

        }
        fs();
    }, []);
    return (
        <div className="flex flex-col w-[90%] sm:w-[500px]  p-6 rounded-md sm:p-10 shadow-2xl ">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                <p className="text-sm dark:text-gray-400">Create your new account</p>
            </div>
            <form onSubmit={handleRegister} className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label for="name" className="block mb-2 text-sm">Name</label>
                        <input required type="text" name="name" id="text" placeholder="John Wick" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="role" className="text-sm">Role</label>
                        </div>
                        <CSelect required id='role' name='role' placeholder='Select Role'>
                            <option value='storeManager'>Store Manager</option>
                            <option value='warehouseManager'>Warehouse Manager</option>
                            <option value='warehouseAdmin'>Warehouse Admin</option>
                        </CSelect>
                    </div>
                    <div>
                        <label htmlFor="warehouse">Warehouse Name: </label>
                        <Select className='mt-3' placeholder='Enter Warehouse Name' id='warehouse' name='warehouse' options={warehouses} />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm">Email address</label>
                        <input required type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="password" className="text-sm">Password</label>
                        </div>
                        <input required type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="confirm-password" className="text-sm">Confirm Password</label>
                        </div>
                        <input required type="password" name="confirm-password" id="confirm-password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                    </div>

                </div>
                <div className="space-y-2">
                    <div>
                        <button className="w-full px-8 py-3 font-semibold rounded-md login-btn">Sign in</button>
                    </div>
                    <p className="px-6 text-sm text-center dark:text-gray-400">Already have an account?
                        <Link to={'/auth/login'} className="hover:underline dark:text-violet-400">Sign in</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;