import React from 'react';
import useCurrentUser from '../../Hooks/useCurrentUser';
import HouseRentorHomePage from '../HouseRentor/HouseRentorHomepage/HouseRentorHomePage';
import HouseOwnerDashboard from '../HouseOwner/HouseOwnerDashboard/HouseOwnerDashboard';
import Homepage from '../Guest/Homepage';

const ViewPage = () => {
    // let { userData } = useCurrentUser();
    // console.log(userData?.role);

    return (
        <>
            {/* {!userData && <Homepage />}
            {userData?.role === "houseRenter" && <HouseRentorHomePage />}
            {userData?.role === "houseOwner" && <HouseOwnerDashboard />} */}
        </>
    );
};

export default ViewPage;
