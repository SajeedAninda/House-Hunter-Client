import Lottie from 'lottie-react';
import React from 'react';
import houseRenterLottie from "../../../assets/LottieFiles/houseRenterLottie.json"
import useCurrentUser from '../../../Hooks/useCurrentUser';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaDeleteLeft } from "react-icons/fa6";


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

    return (
        <div className='w-[90%] mx-auto py-8'>
            <div className='flex flex-col md:flex-row my-12 md:my-6 lg:my-2 justify-center items-center'>
                <div className='flex-1'>
                    <Lottie animationData={houseRenterLottie} loop={true} />
                </div>

                <div className='flex-1'>
                    <div className='Cards'>
                        <h2 className='font-bold text-4xl text-blue-700'>Booked Houses: </h2>
                        {
                            bookingData ?
                                (
                                    <div className='grid grid-cols-2 gap-6 py-6'>
                                        {bookingData?.map(item => (
                                            <div key={item?._id} className="bg-whiterounded-lg shadow-lg flex flex-col">
                                                <img className="rounded-t-lg w-full h-[200px] object-cover" src={item?.imageUrl} alt="" />


                                                <div className="p-5 flex flex-col flex-grow bg-gradient-to-r from-blue-700 to-blue-500 rounded-b-lg">
                                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white">{item?.houseName}</h5>


                                                    <p className="mb-3 font-bold text-white">
                                                        {item?.location}
                                                    </p>

                                                    <div className='flex gap-2 items-center'>
                                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-white flex items-center">{item?.totalBedrooms} Beds </h5>
                                                        <p className="mb-2 text-xl font-bold tracking-tight text-white flex items-center">~</p>
                                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-white flex items-center">{item?.totalBathrooms} Bath </h5>
                                                    </div>

                                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-white flex items-center">{item?.rent}৳ / Month </h5>


                                                    <button className="mt-auto inline-flex items-center relative px-3 py-1 text-blue-700 text-lg font-bold overflow-hidden bg-white rounded-md  transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0 gap-2">
                                                        Delete
                                                        <FaDeleteLeft className='text-2xl'/>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                                :
                                (
                                    <div className='text-3xl'>Loading...</div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseRenterPanel;