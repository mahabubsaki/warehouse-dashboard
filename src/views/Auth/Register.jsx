import { Select } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';

const Register = () => {
    const { user, setUser } = useContext(AuthContext);
    const axiosInstance = useAxios();
    const navigate = useNavigate();

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

        const data = { name, role, location, email, password, confirmPassword };
        try {
            const { data: response } = await axiosInstance.post('signup', data);
            setUser({ name: response.name, email: response.email, role: response.role, location: response.location });
            localStorage.setItem('token', response.token);
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message || err.message);
        }

    };
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);
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
                        <Select required id='role' name='role' placeholder='Select Role'>
                            <option value='admin'>Admin</option>
                            <option value='storeManager'>Store Manager</option>
                            <option value='warehouseManager'>Warehouse Manager</option>
                        </Select>
                    </div>
                    <div>
                        <label for="loation" className="block mb-2 text-sm">Location</label>
                        <input required type="text" name="location" id="text" placeholder="Enter Location" className="w-full px-3 py-2 border rounded-md " />
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