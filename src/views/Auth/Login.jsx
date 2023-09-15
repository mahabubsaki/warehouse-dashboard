import { Spinner, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import ForgetPassModal from './ForgetPassModal';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/Provider';
import { toast } from 'react-hot-toast';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS;

const Login = () => {
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, setUser } = useContext(AuthContext);
    const [temp, setTemp] = useState(null);
    const [otp, setOtp] = useState(null);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = async (data) => {

        try {
            setLoading(true);
            const { data: response } = await axiosInstance.post('login', data);
            setLoading(false);
            setUser({ name: response.name, email: response.email, role: response.role, location: response.location, id: response.id, warehouse: response.warehouse, warehouseName: response.warehouseName, warehouses: response.warehouses, profile: response.profile });
            localStorage.setItem('token', response.token);
        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        }
        setLoading(false);
    };

    const handleOtp = async (e) => {
        e.preventDefault();
        const formOtp = e.target.otp.value;
        if (formOtp == otp) {
            login(temp);
        } else {
            toast.error("OTP is incorrect");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log({ email, password, env_email: ADMIN_EMAIL, env_pass: ADMIN_PASS });
        if (ADMIN_EMAIL == email && ADMIN_PASS == password) {
            return login({ email, password });
        }
        if (ADMIN_EMAIL == email && ADMIN_PASS != password) {
            toast.error("Incorrect Password given", {
                id: 'clipboard',
            });
        }
        try {
            setLoading(true);
            const { data: response } = await axiosInstance.post('send-otp', { email: email, password: password, type: 'login' });
            setLoading(false);
            setOtp(response.otp);
            setTemp({ email, password });
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
    return (
        <>
            <div className="flex flex-col w-[90%] sm:w-[500px]  p-6 rounded-md sm:p-10 shadow-2xl ">
                {!otp ? <><div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
                </div>
                    <form onSubmit={handleLogin} className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label for="email" className="block mb-2 text-sm">Email address</label>
                                <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md " />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label for="password" className="text-sm">Password</label>
                                    <span ref={finalRef} onClick={onOpen} className="text-xs cursor-pointer hover:underline dark:text-gray-400">Forgot password?</span>
                                </div>
                                <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button className="w-full px-8 py-3 font-semibold rounded-md login-btn">Sign in</button>
                            </div>

                        </div>
                    </form>
                    <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                        <Link to={'/auth/register'} className="hover:underline dark:text-violet-400">Sign up</Link>.
                    </p></> : <><div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Verification</h1>
                        <p className="text-sm dark:text-gray-400">You will get an OTP via <span className='font-bold'>{temp?.email || 's@gmail.com'}</span></p>
                    </div>
                    <form onSubmit={handleOtp} className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <input required type="number" name="otp" id="otp" placeholder="Give OTP from your email" className="w-full px-3 py-2 border rounded-md " />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button className="w-full px-8 py-3 font-semibold rounded-md login-btn">Verify</button>
                            </div>
                        </div>
                    </form></>}
                {loading ? <div className='flex justify-center mt-4'>
                    <Spinner />
                </div> : null}
            </div>
            <ForgetPassModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} finalRef={finalRef} />
        </>
    );
};

export default Login;