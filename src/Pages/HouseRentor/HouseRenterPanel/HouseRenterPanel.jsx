import Lottie from 'lottie-react';
import React from 'react';
import houseRenterLottie from "../../../assets/LottieFiles/houseRenterLottie.json"
import useCurrentUser from '../../../Hooks/useCurrentUser';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const HouseRenterPanel = () => {
    let { userData } = useCurrentUser();
    let currentUserEmail = userData?.email;
    let axiosInstance = useAxiosInstance();

    const { data: bookingData, isLoading: isBookingLoading } = useQuery({
        queryKey: ['bookingData', currentUserEmail],
        queryFn: async () => {
            const response = await axiosInstance.get(`/userHouseBookings?email=${currentUserEmail}`);
            return response.data;
        }
    });

    console.log(bookingData);

    return (
        <div className='w-[90%] mx-auto'>
            <div className='flex flex-col md:flex-row my-12 md:my-6 lg:my-2 justify-center items-center'>
                <div className='flex-1'>
                    <Lottie animationData={houseRenterLottie} loop={true} />
                </div>

                <div className='flex-1'>
                    <h1 className='text-7xl md:text-8xl lg:text-9xl font-bold'><span className='text-blue-700'>House Owner</span> <br /> <span className='text-[#0e2b45]'>Dashboard</span> <br /></h1>
                    <h2 className='text-blue-700 text-3xl font-bold'>Control Your Houses from here</h2>
                </div>
            </div>
        </div>
    );
};

export default HouseRenterPanel;