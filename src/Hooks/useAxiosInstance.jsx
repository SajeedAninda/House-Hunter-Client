import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://house-hunter-server-murex.vercel.app/',
    // withCredentials: true
});

const useAxiosInstance = () => {
    return instance;
};

export default useAxiosInstance;