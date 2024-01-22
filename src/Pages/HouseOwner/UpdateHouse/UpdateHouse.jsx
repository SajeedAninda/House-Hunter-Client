import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import toast from 'react-hot-toast';

const UpdateHouse = () => {
    let houseData = useLoaderData();
    let {_id, houseName, address, location, totalBedrooms, totalBathrooms, roomSize, availableDate, rent, phoneNumber, description, imageUrl, ownerEmail } = houseData;

    let axiosInstance = useAxiosInstance();
    let navigate = useNavigate();

    let handleUpdateHouse = (e) => {
        e.preventDefault();
        let houseName = e.target.houseName.value;
        let address = e.target.address.value;
        let location = e.target.location.value;
        let totalBedrooms = e.target.totalBedrooms.value;
        let totalBathrooms = e.target.bathrooms.value;
        let roomSize = e.target.roomSize.value;
        let availableDate = e.target.availableDate.value;
        let rent = e.target.rent.value;
        let phoneNumber = e.target.phoneNumber.value;
        let description = e.target.description.value;

        if (phoneNumber.length !== 14 || !phoneNumber.startsWith("+880")) {
            return toast.error("Please Enter a Valid Bangladeshi Number");
        }

        let loadingToast = toast.loading('Updating House...');

        let houseDetails = { houseName, address, location, totalBedrooms, totalBathrooms, roomSize, availableDate, rent, phoneNumber, description};

        axiosInstance.patch(`/updateHouse/${_id}`, houseDetails)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.dismiss(loadingToast);
                    toast.success("Updated House Successfully");
                    navigate("/houseOwner/houseList");
                }
            })
    }
    return (
        <div className='py-8'>
            <div className='space-y-2'>
                <h1 className='text-blue-700 text-4xl font-bold text-center'>Update Houses</h1>
                <h2 className='text-blue-700 text-xl font-bold text-center'>
                    Update House Details
                </h2>
            </div>
            <div className='w-[90%] my-4 mx-auto bg-gradient-to-r from-blue-700 to-blue-500 shadow-2xl rounded-lg'>
                <div className='py-4 px-8'>
                    <form onSubmit={handleUpdateHouse}>
                        {/* 1st row */}
                        <div className='flex gap-6 w-full'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="houseName">
                                    House Name:
                                </label>
                                <br />
                                <input defaultValue={houseName} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='E.g: Sunny Villa' type="text" name='houseName' id='houseName' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="address">
                                    Address:
                                </label>
                                <br />
                                <input defaultValue={address} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Detailed Address' type="text" name='address' id='address' required />
                            </div>
                        </div>

                        {/* 2nd row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="location">
                                    City Name:
                                </label>
                                <br />
                                <input defaultValue={location} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write the City Name your house is located in' type="text" name='location' id='location' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="bedroom">
                                    Total Bedrooms:
                                </label>
                                <br />
                                <input defaultValue={totalBedrooms} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Total Number of Bedrooms' type="number" name='totalBedrooms' id='totalBedrooms' required />
                            </div>
                        </div>

                        {/* 3rd row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="bathrooms">
                                    Total Bathrooms:
                                </label>
                                <br />
                                <input defaultValue={totalBathrooms} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Total Number of bathrooms' type="number" name='bathrooms' id='bathrooms' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="roomSize">
                                    Room Size:
                                </label>
                                <br />
                                <input defaultValue={roomSize} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Room Size in Square Feet' type="number" name='roomSize' id='roomSize' required />
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="availableDate">
                                    Availability Date:
                                </label>
                                <br />
                                <input defaultValue={availableDate} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Room Available From' type="date" name='availableDate' id='availableDate' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="rent">
                                    Rent Per Month:
                                </label>
                                <br />
                                <input defaultValue={rent} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Rent per Month' type="number" name='rent' id='rent' required />
                            </div>
                        </div>

                        {/* 5th row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="phoneNumber">
                                    Phone Number:
                                </label>
                                <br />
                                <input defaultValue={phoneNumber} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Owners Bangladeshi Phone Number Eg. +8801836378837' type="tel" name='phoneNumber' id='phoneNumber' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="description">
                                    Room Description:
                                </label>
                                <br />
                                <input defaultValue={description} className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Details about the Room' type="text" name='description' id='description' required />
                            </div>
                        </div>

                        {/* BUTTON  */}
                        <button className='w-full mt-4 rounded-lg bg-transparent py-2 text-2xl font-bold border-2 border-white text-white hover:bg-white hover:border-white hover:text-blue-700 transition ease-in-out delay-50'>
                            Update House
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdateHouse;