import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const Login = () => {
    let axiosInstance = useAxiosInstance();
    

    let handleLogin = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        let loadingToast = toast.loading('Logging In...');

        try {
            const response = await axiosInstance.post('/userLogin', { email, password });

            if (response.status >= 200 && response.status < 300) {
                toast.dismiss(loadingToast);
                toast.success(response.data.message);
                Cookies.set('accessToken', response.data.token, { expires: 1, path: '/' });
            }
        } catch (error) {
            if (error.response) {
                toast.dismiss(loadingToast);
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.dismiss(loadingToast);
                toast.error('No response from the server');
            } else {
                toast.dismiss(loadingToast);
                toast.error('An unexpected error occurred');
            }
        }
    }

    return (
        <div className='mx-auto w-[90%] py-8'>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                User Login
                            </p>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input placeholder="johndoe@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name="email" id="email" type='email' required />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="••••••••" name="password" id="password" type="password" required />
                            </div>

                            <button className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white" type="submit">
                                Login
                            </button>

                            <p className="text-lg font-bold leading-tight tracking-tight text-gray-900">
                                Dont Have Account? <Link className='text-blue-700 hover:underline' to={'/'}>Register</Link>
                            </p>

                        </div>
                    </div>
                </div></form>

        </div>
    );
};

export default Login;