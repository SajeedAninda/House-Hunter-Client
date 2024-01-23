import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import useCurrentUser from '../../Hooks/useCurrentUser';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import toast from 'react-hot-toast';

const HouseDetails = () => {
    let [isOpen, setIsOpen] = useState(false);
    let axiosInstance = useAxiosInstance();
    let houseDetails = useLoaderData();
    let { _id, houseName, address, location, totalBedrooms, totalBathrooms, roomSize, availableDate, rent, phoneNumber, description, imageUrl, ownerEmail } = houseDetails;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    let formatDateString = (inputDateStr) => {
        var inputDate = new Date(inputDateStr);
        function getOrdinalSuffix(day) {
            if (day >= 11 && day <= 13) {
                return "th";
            }
            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }
        var outputDateStr = inputDate.getDate() + getOrdinalSuffix(inputDate.getDate()) + " " +
            new Intl.DateTimeFormat('en-US', { month: 'long' }).format(inputDate) + ", " +
            inputDate.getFullYear();

        return outputDateStr;
    }

    let { userData } = useCurrentUser();

    let handleBookHouse = async (e) => {
        e.preventDefault();
        let bookerName = e.target.fullName.value;
        let bookerEmail = e.target.email.value;
        let bookerPhoneNum = e.target.phnNum.value;
        let houseId = _id;
        let bookingDetails = { bookerName, bookerEmail, bookerPhoneNum, houseId };

        let loadingToast = toast.loading('Booking House...');

        try {
            let response = await axiosInstance.post("/houseBookings", bookingDetails);
            if (response.data.insertedId) {
                toast.dismiss(loadingToast);
                toast.success("Booked House Successfully");
                closeModal();
            }
        } catch (error) {
            console.error("Error Booking:", error);
            toast.dismiss(loadingToast);

            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.error === 'Cannot book more than two houses.') {
                        toast.error("Cannot book more than two houses.");
                    } else if (error.response.data.error === 'House already booked.') {
                        toast.error("House already booked.");
                    } else {
                        toast.error("Error Booking House");
                    }
                } else {
                    toast.error("Error Booking House");
                }
            } else if (error.request) {
                toast.error("No response from the server.");
            } else {
                toast.error("Error in the request setup.");
            }
        }
    };

    return (
        <div className='w-[95%] mx-auto py-12'>
            <div className='flex gap-10 items-center'>
                <div className='flex-1 space-y-2'>
                    <h1 className='text-4xl font-bold'>{houseName}</h1>
                    <p className='text-xl font-semibold'>{description}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Location:</span> {address}, {location}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Room Size:</span> {roomSize}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Total Beds:</span> {totalBedrooms}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Total Baths:</span> {totalBathrooms}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Rent Per Month:</span> {rent} Taka</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Available From:</span> {formatDateString(availableDate)}</p>
                    <button type="button"
                        onClick={openModal} className='bg-blue-700 text-white font-bold w-full py-3 hover:bg-transparent hover:text-blue-700 border-2 border-blue-700 rounded-lg'>
                        Book This House
                    </button>
                </div>
                <div className='flex-1'>
                    <img className='w-full h-[350px] border-8 border-blue-700 rounded-lg object-cover' src={imageUrl} alt="" />
                </div>
            </div>



            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-bold leading-6 text-gray-900"
                                    >
                                        Book {houseName}
                                    </Dialog.Title>
                                    <form onSubmit={handleBookHouse}>
                                        <div className="mt-2 flex w-full gap-2 items-center">
                                            <label htmlFor="fullName" className='text-lg font-semibold w-[25%]'>
                                                Your Name:
                                            </label>
                                            <input className='mt-2 px-4 rounded-lg py-2 border-2 border-blue-700 w-[75%]' type="text" name='fullName' defaultValue={userData?.fullName} disabled required />
                                        </div>

                                        <div className="mt-2 flex w-full gap-2 items-center">
                                            <label htmlFor="email" className='text-lg font-semibold w-[25%]'>
                                                Email:
                                            </label>
                                            <input className='mt-2 px-4 rounded-lg py-2 border-2 border-blue-700 w-[75%]' name="email" type="email" defaultValue={userData?.email} disabled required />
                                        </div>

                                        <div className="mt-2 flex w-full gap-2 items-center">
                                            <label htmlFor="phnNum" className='text-lg font-semibold w-[25%]'>
                                                Phone No:
                                            </label>
                                            <input className='mt-2 px-4 rounded-lg py-2 border-2 border-blue-700 w-[75%]' name="phnNum" type="tel" required defaultValue={userData?.phone} />
                                        </div>

                                        <div className="mt-4 flex justify-center">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Book House
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

        </div>
    );
};

export default HouseDetails;