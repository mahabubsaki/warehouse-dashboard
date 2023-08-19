import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="flex flex-col w-[90%] sm:w-[500px]  p-6 rounded-md sm:p-10 shadow-2xl ">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign up</h1>
                <p className="text-sm dark:text-gray-400">Create your new account</p>
            </div>
            <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label for="name" className="block mb-2 text-sm">Name</label>
                        <input type="text" name="name" id="text" placeholder="John Wick" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="confirm-password" className="text-sm">Confirm Password</label>
                        </div>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder="*****" className="w-full px-3 py-2 border rounded-md " />
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