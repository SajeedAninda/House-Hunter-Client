import React from 'react';
import houseOwnerLottie from "../../../assets/LottieFiles/houseOwnerLottie.json"
import Lottie from 'lottie-react';

const HouseOwnerPanel = () => {
    return (
        <div className='w-[90%] mx-auto'>
            <div className='flex flex-col md:flex-row my-12 md:my-6 lg:my-2 justify-center items-center'>
                <div className='flex-1'>
                    <h1 className='text-7xl md:text-8xl lg:text-9xl font-bold'><span className='text-blue-700'>House Owner</span> <br /> <span className='text-[#0e2b45]'>Dashboard</span> <br /></h1>
                    <h2 className='text-blue-700 text-3xl font-bold'>Control Your Houses from here</h2>
                </div>

                <div className='flex-1'>
                    <Lottie animationData={houseOwnerLottie} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default HouseOwnerPanel;