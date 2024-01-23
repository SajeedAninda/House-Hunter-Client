import React from 'react';
import { useLoaderData } from 'react-router-dom';

const HouseDetails = () => {
    let houseDetails = useLoaderData();
    let { houseName, address, location, totalBedrooms, totalBathrooms, roomSize, availableDate, rent, phoneNumber, description, imageUrl, ownerEmail } = houseDetails;

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

    return (
        <div className='w-[95%] mx-auto py-12'>
            <div className='flex gap-10'>
                <div className='flex-1 space-y-2'>
                    <h1 className='text-4xl font-bold'>{houseName}</h1>
                    <p className='text-xl font-semibold'>{description}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Location:</span> {address}, {location}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Room Size:</span> {roomSize}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Total Beds:</span> {totalBedrooms}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Total Baths:</span> {totalBathrooms}</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Rent Per Month:</span> {rent} Taka</p>
                    <p className='text-xl font-semibold'><span className="font-bold">Available From:</span> {formatDateString(availableDate)}</p>
                </div>
                <div className='flex-1'>
                    <img className='w-full h-[350px] border-8 border-blue-700 rounded-lg object-cover' src={imageUrl} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HouseDetails;