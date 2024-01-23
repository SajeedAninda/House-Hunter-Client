import React, { useState } from 'react';
import { TbFilterSearch } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../../Hooks/useAxiosInstance';
import { Link } from 'react-router-dom';
import useCurrentUser from '../../Hooks/useCurrentUser';

const Houses = () => {
    let [rentMin, setRentMin] = useState(0);
    let [rentMax, setRentMax] = useState(50000);
    let [city, setCity] = useState("allCity");
    let [bedRooms, setBedRooms] = useState("allRooms");
    let [bathRoom, setBathrooms] = useState("allBathRooms");
    let [minRoomSize, setMinRoomSize] = useState("500");
    let [maxRoomSize, setMaxRoomSize] = useState("5000");
    let [searchText, setSearchText] = useState("");

    let { userData } = useCurrentUser();

    let axiosInstance = useAxiosInstance();

    const { data: house, isLoading: isHouseLoading, refetch } = useQuery({
        queryKey: ['house', rentMin, rentMax, city, bedRooms, bathRoom, minRoomSize, maxRoomSize, searchText],
        queryFn: async () => {
            const response = await axiosInstance.get(`/allHouses?rentMin=${rentMin}&rentMax=${rentMax}&city=${city}&bedRooms=${bedRooms}&bathRoom=${bathRoom}&minRoomSize=${minRoomSize}&maxRoomSize=${maxRoomSize}&searchText=${searchText}`);
            return response.data;
        }
    })

    console.log(bedRooms, bathRoom, city)


    return (
        <div>
            <div className='w-[95%] mx-auto py-8'>
                <div>
                    <div className="max-w-3xl mx-auto text-center pb-8">
                        <h1 className="mb-2 text-3xl font-bold text-blue-700">Find Available House</h1>
                        <p className="text-xl font-semibold text-blue-700">Explore our diverse range of Houses. Find your ideal choice path by browsing through Houses, Filter Accordingly
                        </p>
                    </div>
                </div>

                <div className='flex gap-6'>
                    <div className='filters w-[30%] border-2 border-blue-700 px-4 pt-4 pb-8 rounded-md h-fit'>
                        <div className='FilterHeader border-b-2 border-blue-700 flex justify-center items-center gap-2 py-2'>
                            <h2 className='text-xl text-blue-700 font-bold text-center'>Filter Houses</h2>
                            <TbFilterSearch className='text-3xl text-blue-700' />
                        </div>

                        <div className='rentRange pt-4 '>
                            <h2 className='text-lg font-semibold'>Rent Per Month:</h2>
                            <div className='flex gap-3 py-2'>
                                <div className='w-full'>
                                    <input onChange={(e) => { setRentMin(parseFloat(e.target.value)) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-xl' type="number" defaultValue={0} />
                                </div>
                                <div className='w-full'>
                                    <input onChange={(e) => { setRentMax(parseFloat(e.target.value)) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-xl' type="number" defaultValue={50000} />
                                </div>
                            </div>
                        </div>

                        <div className='cities pt-2'>
                            <div>
                                <label className='text-lg font-semibold' htmlFor="cities">
                                    Cities:
                                </label>
                                <br />
                                <select onChange={(e) => { setCity(e.target.value) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-md' name="cities" id="cities">
                                    <option className='font-semibold' value="allCity" selected>All Cities</option>
                                    <option className='font-semibold' value="Dhaka">Dhaka</option>
                                    <option className='font-semibold' value="Chittagong">Chittagong</option>
                                    <option className='font-semibold' value="Rajshahi">Rajshahi</option>
                                    <option className='font-semibold' value="Khulna">Khulna</option>
                                </select>
                            </div>
                        </div>

                        <div className='bedrooms pt-2'>
                            <div>
                                <label className='text-lg font-semibold' htmlFor="bedrooms">
                                    Bedrooms:
                                </label>
                                <br />
                                <select onChange={(e) => { setBedRooms(e.target.value) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-md' name="bedrooms" id="bedrooms">
                                    <option className='font-semibold' value="allRooms" selected>All Bedroom</option>
                                    <option className='font-semibold' value="1">1</option>
                                    <option className='font-semibold' value="2">2</option>
                                    <option className='font-semibold' value="3">3</option>
                                    <option className='font-semibold' value="4">4</option>
                                    <option className='font-semibold' value="5">5</option>
                                    <option className='font-semibold' value="6">6</option>
                                    <option className='font-semibold' value="7">7</option>
                                    <option className='font-semibold' value="8">8</option>
                                    <option className='font-semibold' value="9">9</option>
                                    <option className='font-semibold' value="10">10</option>
                                </select>
                            </div>
                        </div>

                        <div className='bathrooms pt-2'>
                            <div>
                                <label className='text-lg font-semibold' htmlFor="bathrooms">
                                    Bathrooms:
                                </label>
                                <br />
                                <select onChange={(e) => { setBathrooms(e.target.value) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-md' name="bathrooms" id="bathrooms">
                                    <option className='font-semibold' value="allBathRooms" selected>All Bathrooms</option>
                                    <option className='font-semibold' value="1">1</option>
                                    <option className='font-semibold' value="2">2</option>
                                    <option className='font-semibold' value="3">3</option>
                                    <option className='font-semibold' value="4">4</option>
                                    <option className='font-semibold' value="5">5</option>
                                </select>
                            </div>
                        </div>

                        <div className='roomSize pt-4 '>
                            <h2 className='text-lg font-semibold'>Room Size in Sq.Feet:</h2>
                            <div className='flex gap-3 py-2'>
                                <div className='w-full'>
                                    <input onChange={(e) => { setMinRoomSize(parseFloat(e.target.value)) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-xl' type="number" defaultValue={500} />
                                </div>
                                <div className='w-full'>
                                    <input onChange={(e) => { setMaxRoomSize(parseFloat(e.target.value)) }} className='w-full border-2 border-blue-700 rounded-xl py-2 px-4 font-semibold text-xl' type="number" defaultValue={5000} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='search&card w-[70%]'>
                        <div className='SearchBar relative'>
                            <input onChange={(e) => { setSearchText(e.target.value) }} className='w-full border-2 border-blue-700 rounded-lg py-3 px-4 text-blue-700 font-semibold placeholder:font-semibold' type="text" placeholder='Search By House Name' />
                            <FaSearch className='text-xl absolute right-5 bottom-4 text-blue-700 cursor-pointer' />
                        </div>

                        <div className='Cards'>
                            {
                                house ?
                                    (
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6'>
                                            {house?.map(item => (
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


                                                        {
                                                            userData?.role === "houseRenter" ?
                                                                <Link to={`/houseDetails/${item?._id}`} className="mt-auto inline-flex items-center relative px-3 py-1 text-blue-700 text-lg font-bold overflow-hidden bg-white rounded-md  transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0">
                                                                    See Details
                                                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                                    </svg>
                                                                </Link>
                                                                :
                                                                <Link to={"/login"} className="mt-auto inline-flex items-center relative px-3 py-1 text-blue-700 text-sm font-bold overflow-hidden bg-white rounded-md  transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-700 before:to-blue-500 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0">
                                                                    Login as Renter to See Details
                                                                </Link>
                                                        }
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <div>Loading...</div>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Houses;