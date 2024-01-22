import { createContext, useContext, useState } from 'react';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let axiosInstance = useAxiosInstance();

  const login = async ({ email, password }) => {
    let loadingToast = toast.loading('Logging In...');

    try {
      const response = await axiosInstance.post('/userLogin', { email, password });

      if (response.status >= 200 && response.status < 300) {
        const token = response.data.token;

        Cookies.set('accessToken', token, { expires: 1, path: '/' });
        setUser({ email });
        toast.dismiss(loadingToast);
        toast.success(response.data.message);
        return true;
      }
    } catch (error) {
      if (error.response) {
        toast.dismiss(loadingToast);
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.dismiss(loadingToast);
        toast.error('No response from the server');
      } else {
        toast.dismiss(loadingToast);
        toast.error('An unexpected error occurred');
      }
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;