import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
    let [role, setRole] = useState('');
    let { register } = useAuth();
    let navigate = useNavigate();

    let handleRegister = async (e) => {
        e.preventDefault();
        let fullName = e.target.fullName.value;
        let phone = e.target.phoneNum.value;
        let email = e.target.email.value;
        let password = e.target.password.value;

        let userDetails = { fullName, phone, email, password, role };


        if (password.length < 6) {
            toast.dismiss(loadingToast);
            return toast.error("Password Length should be more than 6 characters")
        }

        try {
            const success = await register(userDetails);
            if (success) {
                navigate('/');
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='mx-auto w-[90%] py-8'>
            <form onSubmit={handleRegister}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                User Registration
                            </p>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Full Name
                                </label>
                                <input placeholder="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name='fullName' id='fullName' type="text" required />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Role
                                </label>
                                <select onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name="role" id="role" required>
                                    <option value="">Select Your Role</option>
                                    <option value="houseOwner">House Owner</option>
                                    <option value="houseRenter">House Renter</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Phone Number
                                </label>
                                <input placeholder="+8801879792236" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" name="phoneNum" id="phoneNum" type='tel' required />
                            </div>

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
                                Register
                            </button>

                            <p className="text-lg font-bold leading-tight tracking-tight text-gray-900">
                                Already Have any Account? <Link className='text-blue-700 hover:underline' to={'/login'}>Login</Link>
                            </p>

                        </div>
                    </div>
                </div></form>

        </div>
    );
};

export default Register;