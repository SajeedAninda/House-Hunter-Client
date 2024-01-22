import React from 'react';
import useCurrentUser from '../../Hooks/useCurrentUser';
import HouseRentorHomePage from '../HouseRentor/HouseRentorHomepage/HouseRentorHomePage';
import HouseOwnerDashboard from '../HouseOwner/HouseOwnerDashboard/HouseOwnerDashboard';

const ViewPage = () => {
    let { userData } = useCurrentUser();
    console.log(userData?.role);

    return (
        <>
            {userData?.role === "houseRenter" && <HouseRentorHomePage />}
            {userData?.role === "houseOwner" && <HouseOwnerDashboard />}
        </>
    );
};

export default ViewPage;
