import React from 'react';
import useAxiosInstance from './useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useCurrentUser = () => {
    let { user } = useAuth();
    let currentUserEmail = user?.email;

    let axiosInstance = useAxiosInstance();
    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['userData', currentUserEmail],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 2500));
            const response = await axiosInstance.get(`/userData/${currentUserEmail}`);
            return response.data;
        },
        enabled: !!currentUserEmail,
    });

    return { userData, isUserLoading };
};

export default useCurrentUser;
