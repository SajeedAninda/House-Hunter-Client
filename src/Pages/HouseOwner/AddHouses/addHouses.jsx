import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import axios from 'axios';
import useCurrentUser from '../../../Hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const AddHouses = () => {
    let axiosInstance = useAxiosInstance();
    let [selectedImage, setSelectedImage] = useState(null);
    let { userData } = useCurrentUser();
    let navigate = useNavigate();

    let handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedImage(file);
            } else {
                setSelectedImage(null);
                toast.error("Please upload a valid image")
            }
        }
    };

    let data = new FormData();
    data.append("image", selectedImage);


    let handleAddHouses = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            toast.error("Please upload an image");
            return;
        }

        let houseName = e.target.houseName.value;
        let address = e.target.address.value;
        let location = e.target.location.value;
        let totalBedrooms = e.target.totalBedrooms.value;
        let totalBathrooms = e.target.bathrooms.value;
        let roomSize = parseFloat(e.target.roomSize.value);
        let availableDate = e.target.availableDate.value;
        let rent = parseFloat(e.target.rent.value);
        let phoneNumber = e.target.phoneNumber.value;
        let description = e.target.description.value;
        let ownerEmail = userData?.email;

        if (phoneNumber.length !== 14 || !phoneNumber.startsWith("+880")) {
            return toast.error("Please Enter a Valid Bangladeshi Number");
        }

        let loadingToast = toast.loading('Adding House...');

        try {
            let res = await axios.post("https://api.imgbb.com/1/upload?key=cbd289d81c381c05afbab416f87e8637", data);
            let imageUrl = res.data.data.display_url;
            let houseDetails = { houseName, address, location, totalBedrooms, totalBathrooms, roomSize, availableDate, rent, phoneNumber, description, imageUrl, ownerEmail };

            axiosInstance.post("/houses", houseDetails)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        toast.dismiss(loadingToast);
                        toast.success("Added House Successfully");
                        navigate("/houseOwner");
                    }
                })
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.dismiss(loadingToast);
            toast.error("Error uploading image");
        }
    }

    return (
        <div className='py-8'>
            <div className='space-y-2'>
                <h1 className='text-blue-700 text-4xl font-bold text-center'>Add Houses</h1>
                <h2 className='text-blue-700 text-xl font-bold text-center'>
                    Add Houses with full descriptions for buyers to see and select
                </h2>
            </div>
            <div className='w-[90%] my-4 mx-auto bg-gradient-to-r from-blue-700 to-blue-500 shadow-2xl rounded-lg'>
                <div className='py-4 px-8'>
                    <form onSubmit={handleAddHouses}>
                        {/* 1st row */}
                        <div className='flex gap-6 w-full'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="houseName">
                                    House Name:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='E.g: Sunny Villa' type="text" name='houseName' id='houseName' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="address">
                                    Address:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Detailed Address' type="text" name='address' id='address' required />
                            </div>
                        </div>

                        {/* 2nd row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="location">
                                    City Name:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write the City Name your house is located in' type="text" name='location' id='location' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="bedroom">
                                    Total Bedrooms:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Total Number of Bedrooms' type="number" name='totalBedrooms' id='totalBedrooms' required />
                            </div>
                        </div>

                        {/* 3rd row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="bathrooms">
                                    Total Bathrooms:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Total Number of bathrooms' type="number" name='bathrooms' id='bathrooms' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="roomSize">
                                    Room Size:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Room Size in Square Feet' type="number" name='roomSize' id='roomSize' required />
                            </div>
                        </div>

                        {/* 4th row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="availableDate">
                                    Availability Date:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Room Available From' type="date" name='availableDate' id='availableDate' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="rent">
                                    Rent Per Month:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Rent per Month' type="number" name='rent' id='rent' required />
                            </div>
                        </div>

                        {/* 5th row */}
                        <div className='flex gap-6 w-full mt-4'>
                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="phoneNumber">
                                    Phone Number:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Owners Bangladeshi Phone Number Eg. +8801836378837' type="tel" name='phoneNumber' id='phoneNumber' required />
                            </div>

                            <div className='flex-1'>
                                <label className='text-white text-2xl font-bold text-center' htmlFor="description">
                                    Room Description:
                                </label>
                                <br />
                                <input className='mt-2 px-4 w-full rounded-lg py-2' placeholder='Write Details about the Room' type="text" name='description' id='description' required />
                            </div>
                        </div>

                        {/* 6th row  */}
                        <div className='mt-5 bg-transparent w-full m-auto rounded-xl'>
                            <div className='px-5 py-3 relative rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                            onChange={handleImageChange}
                                        />
                                        <div className='bg-transparent border-2 border-white text-white text-2xl font-bold cursor-pointer py-2 px-7 hover:bg-[white] hover:border-blue-700 hover:text-blue-700 rounded-xl'>
                                            {selectedImage ? selectedImage.name : "Upload Relevant House Picture"}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* BUTTON  */}
                        <button className='w-full mt-4 rounded-lg bg-transparent py-2 text-2xl font-bold border-2 border-white text-white hover:bg-white hover:border-white hover:text-blue-700 transition ease-in-out delay-50'>
                            Add House
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddHouses;