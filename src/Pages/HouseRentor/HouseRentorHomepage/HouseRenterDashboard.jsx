import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from "../../../assets/Logo/logo.png"
import useAuth from '../../../Hooks/useAuth';

const HouseRenterDashboard = () => {
    let { logout } = useAuth();

    const handleLogout = async () => {
        try {
            const success = await logout();
            if (success) {
                navigate('/login');
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className='bg-gradient-to-r from-blue-700 to-blue-400 text-white flex justify-between items-center p-4'>
                <div className='w-[95%] mx-auto'>
                    <div className='flex justify-between items-center'>
                        <div >
                            <Link to={"/"} className='flex items-center gap-4'>
                                <img src={logo} className='w-[70px]' alt="" />
                                <h1 className='text-3xl text-white font-bold'>House Hunter</h1>
                            </Link>
                        </div>

                        <div className='flex gap-2'>
                            <Link className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg' to={"/"}>
                                Go Home
                            </Link>

                            <button onClick={handleLogout} className='bg-white px-4 py-3 font-bold text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg'>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div >
            <Outlet></Outlet>
        </div>
    );
};

export default HouseRenterDashboard;