import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useCurrentUser from '../../Hooks/useCurrentUser';
import { Navigate } from 'react-router-dom';

const OwnerRoute = ({children}) => {
    let { user, loading } = useAuth();
    let { userData, isUserLoading } = useCurrentUser();

    if (loading || isUserLoading) {
        return <div className='flex justify-center min-h-screen items-center'>
            <span class="loading loading-spinner text-info"></span>
        </div>
    }
    if (userData?.role === "houseOwner" && user) {
        return children;
    }

    return <Navigate to="/login"></Navigate>;
};

export default OwnerRoute;