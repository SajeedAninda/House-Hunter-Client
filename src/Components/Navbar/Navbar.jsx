import React from 'react';
import logo from "../../assets/Logo/logo.png"
import { Link } from 'react-router-dom';
import useCurrentUser from '../../Hooks/useCurrentUser';

const Navbar = () => {
    let { userData } = useCurrentUser();
    console.log(userData);

    return (
        <div className='bg-gradient-to-r from-blue-700 to-blue-400 text-white flex justify-between items-center p-4'>
            <div className='w-[95%] mx-auto'>
                <div className='flex justify-between items-center'>
                    <div>
                        <Link to={"/"} className='flex items-center gap-4'>
                            <img src={logo} className='w-[70px]' alt="" />
                            <h1 className='text-3xl text-white font-bold'>House Hunter</h1>
                        </Link>
                    </div>

                    {userData ? (
                        userData.role === "houseRenter" ? (
                            <div className='flex gap-3'>
                                <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/houseRenter"}>
                                    House Renter Dashboard
                                </Link>

                                <button className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg'>
                                    Logout
                                </button>
                            </div>
                        ) : userData.role === "houseOwner" ? (
                            <div className='flex gap-3'>
                                <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/houseOwner"}>
                                    House Owner Dashboard
                                </Link>
                                <button className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg'>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className='flex gap-2'>
                                <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/login"}>
                                    Login
                                </Link>

                                <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/register"}>
                                    Register
                                </Link>
                            </div>
                        )
                    ) : (
                        <div className='flex gap-2'>
                            <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/login"}>
                                Login
                            </Link>

                            <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/register"}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
