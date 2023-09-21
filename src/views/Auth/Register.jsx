import Select from 'react-select';
import { Button, Select as CSelect, Spinner } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Provider';
import { toast } from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import fetchdata from '../../utilities/fetchData';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
const IMGBB_API = import.meta.env.VITE_IMGBB_API;


const Register = () => {
    const { user, setUser } = useContext(AuthContext);
    const [otp, setOtp] = useState(null);
    const [temp, setTemp] = useState(null);
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [warehouses, setWarehouses] = useState([]);
    const [profilePreview, setProfilePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef();

    const handleFileChange = (e) => {
        if (!e.target.files[0]) return;
        if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png') {
            const url = URL.createObjectURL(e.target.files[0]);
            setProfilePreview(url);
        } else {

            toast.error("Only jpeg,jpg and png files are acceptable");
        }

    };

    const register = async (data) => {

        try {
            setLoading(true);
            const { data: response } = await axiosInstance.post('signup', data);

            setUser({ name: response.name, email: response.email, role: response.role, location: response.location, id: response.id, warehouse: response.warehouse, warehouseName: response.warehouseName, warehouses: response.warehouses, profile: response.profile });
            localStorage.setItem('token', response.token);
        } catch (err) {

            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        } finally {
            setLoading(false);
        }

    };
    const uploadToImgbb = async (file) => {

        try {
            const formData = new FormData();
            formData.append('image', file);
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API}`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw "Error uploading image on server,Please try again";
            }
            ;
        } catch (err) {

            throw (err);
        }

    };
    const handleOtp = async (e) => {
        e.preventDefault();
        const formOtp = e.target.otp.value;
        if (formOtp == otp) {
            register(temp);
        } else {
            toast.error("OTP is incorrect");
        }
    };
    const handleRegister = async (e) => {

        e.preventDefault();
        if (!profilePreview) {

            return toast.error("Please choose a profile picture", {
                id: 'clipboard',
            });
        }
        try {

            const form = e.target;
            const formData = new FormData(form);
            const img = await uploadToImgbb(form.profile.files[0]);
            const name = formData.get('name');
            const role = formData.get('role');
            const location = formData.get('location');
            const email = formData.get('email');
            const password = formData.get('password');
            if (!/^(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
                return toast.error("Please give password more stronger (At least 8 character with the combination of number, letter and special letter [@,#,%,^,&])", {
                    id: 'clipboard',
                });
            }

            const confirmPassword = formData.get('confirm-password');
            if (password != confirmPassword) {
                return toast.error("Confirm Password didn't match", {
                    id: 'clipboard',
                });
            }
            const warehouse = formData.get('warehouse');
            if (ADMIN_EMAIL == email) {
                return toast.error("Account already exist with given email", {
                    id: 'clipboard',
                });
            }
            setLoading(true);
            const data = { name, role, location, email, password, confirmPassword, warehouse, img };
            const { data: response } = await axiosInstance.post('send-otp', { email: email, type: 'register', warehouse: warehouse });

            setOtp(response.otp);
            setTemp(data);
        } catch (err) {

            toast.error(err?.response?.data?.message || err.message, {
                id: 'clipboard',
            });
        } finally {
            setLoading(false);
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
            {!otp ? <> <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                <p className="text-sm dark:text-gray-400">Create your new account</p>
            </div>
                <form onSubmit={handleRegister} className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                            <input required type="text" name="name" id="name" placeholder="John Wick" className="w-full px-3 py-2 border rounded-md " />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="role" className="text-sm">Role</label>
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
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input required type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md " />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                            </div>
                            <input required type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="confirm-password" className="text-sm">Confirm Password</label>
                            </div>
                            <input required type="password" name="confirm-password" id="confirm-password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                        </div>
                        {profilePreview ? <div className='flex flex-col items-center gap-2'>
                            <div className='overflow-hidden rounded-full border-2 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] border-[#8E54E9] p-2'>
                                <img src={profilePreview} alt="" className='w-full h-full' />

                            </div>
                            <FaTrash onClick={() => setProfilePreview(null)} title='Remove Profile Picture' className='text-2xl hover:text-red-500 cursor-pointer duration-100' />

                        </div> : null}
                        <div className='flex flex-col'>
                            <input ref={fileRef} accept='.jpg, .jpeg, .png' onChange={handleFileChange} type='file' required name="profile" id="profile" className="w-full px-3 py-2 border rounded-md hidden " />
                            {!profilePreview ? <Button onClick={() => fileRef.current.click()} className='flex items-center gap-3' colorScheme='cyan'><span>Upload Profile Picture </span><AiOutlineUpload /></Button> : null}
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
                </form></> : <>
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Verification</h1>
                    <p className="text-sm dark:text-gray-400">You will get an OTP via admin email</p>
                </div>
                <form onSubmit={handleOtp} className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <input required type="number" name="otp" id="otp" placeholder="Give OTP from your admin email" className="w-full px-3 py-2 border rounded-md " />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button className="w-full px-8 py-3 font-semibold rounded-md login-btn">Verify</button>
                        </div>
                    </div>
                </form>
            </>}
            {loading ? <div className='flex justify-center mt-4'>
                <Spinner />
            </div> : null}
        </div>
    );
};

export default Register;