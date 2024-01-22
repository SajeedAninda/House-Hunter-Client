import React from 'react';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useCurrentUser from '../../../Hooks/useCurrentUser';
import { Link } from 'react-router-dom';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const HouseList = () => {
    let axiosInstance = useAxiosInstance();
    let { userData } = useCurrentUser();
    let currentUserEmail = userData?.email;
    console.log(currentUserEmail)

    const { data: houses, isLoading: isHousesLoading, refetch } = useQuery({
        queryKey: ['houses', currentUserEmail],
        queryFn: async () => {
            const response = await axiosInstance.get(`/myHouses?ownerEmail=${currentUserEmail}`);
            return response.data;
        }
    })

    let handleDeleteHouse = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once Deleted, you cannot revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#336CDD',
            cancelButtonColor: '#ed4747',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/deleteHouse/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            console.log(res.data);
                            toast.success("House Deleted Succesfully")
                        }
                    })
                    .catch(error => {
                        console.error("Error :", error);
                        toast.error('Error', 'Failed to delete House');
                    });
            }
        });
    }

    return (
        <div className='mx-auto w-[90%] py-8'>
            <div className='space-y-2'>
                <h1 className='text-blue-700 text-4xl font-bold text-center'>House List</h1>
                <h2 className='text-blue-700 text-xl font-bold text-center'>
                    See All the Houses that you have added and take actions according to that
                </h2>
            </div>

            <div className='mt-8'>
                <h1 className='text-3xl text-blue-700 font-bold'>
                    Total Houses: {houses?.length}
                </h1>
            </div>

            <div className='mt-4'>
                <div className='bg-gradient-to-r from-blue-700 to-blue-500 rounded-tl-xl rounded-tr-xl grid grid-cols-11 px-6 py-4'>
                    <div className='text-white font-bold text-xl col-span-1 text-center'>
                        Image
                    </div>
                    <div className='text-white font-bold text-xl col-span-3 text-center'>
                        House Name
                    </div>
                    <div className='text-white font-bold text-xl col-span-3 text-center'>
                        Location
                    </div>
                    <div className='text-white font-bold text-xl col-span-1 text-center'>
                        Rooms
                    </div>
                    <div className='text-white font-bold text-xl col-span-1 text-center'>
                        Rent
                    </div>
                    <div className='text-white font-bold text-xl col-span-1 text-center'>
                        Update
                    </div>
                    <div className='text-white font-bold text-xl col-span-1 text-center'>
                        Delete
                    </div>
                </div>
            </div>

            {
                houses ?
                    (
                        houses?.map(house =>
                            <div className=''>
                                <div className='bg-[#F7FFF7] border-b-2 border-blue-700 grid grid-cols-11 px-6 py-4 items-center'>
                                    <div className='text-[#0e2b45] font-bold text-lg col-span-1 text-center flex justify-center'>
                                        <img className='w-[50px] h-[50px] rounded-full object-cover' src={house?.imageUrl} alt="" />
                                    </div>
                                    <div className='text-[#0e2b45] font-bold text-lg col-span-3 text-center'>
                                        {house?.houseName}
                                    </div>
                                    <div className='text-[#0e2b45] font-bold text-lg col-span-3 text-center'>
                                        {house?.address}
                                    </div>
                                    <div className='text-[#0e2b45] font-bold text-lg col-span-1 text-center'>
                                        {house?.totalBedrooms}
                                    </div>
                                    <div className='text-[#0e2b45] font-bold text-lg col-span-1 text-center capitalize'>
                                        {house?.rent} ৳
                                    </div>

                                    <Link to={`updatehouse/${house?._id}`} className='text-[#0e2b45] font-bold text-lg col-span-1 text-center flex justify-center'>
                                        <MdEditSquare className='text-3xl cursor-pointer font-bold text-[#0e2b45]' />
                                    </Link>
                                    
                                    <div onClick={() => handleDeleteHouse(house?._id)} className='text-[#0e2b45] font-bold text-lg col-span-1 text-center flex justify-center'>
                                        <RiDeleteBinFill className='text-3xl cursor-pointer font-bold text-[#ed4747]' />
                                    </div>
                                </div>
                            </div>
                        )
                    )
                    :
                    (
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    )
            }
        </div>
    );
};

export default HouseList;