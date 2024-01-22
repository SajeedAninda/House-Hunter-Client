import { createContext, useContext, useEffect, useState } from 'react';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export let AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  let [user, setUser] = useState(() => {
    let storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  let axiosInstance = useAxiosInstance();
  console.log(user);

  let login = async ({ email, password }) => {
    let loadingToast = toast.loading('Logging In...');

    try {
      let response = await axiosInstance.post('/userLogin', { email, password });

      if (response.status >= 200 && response.status < 300) {
        let token = response.data.token;

        Cookies.set('accessToken', token, { expires: 1, path: '/' });

        let updatedUser = { email };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        setUser(updatedUser);
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success(response.data.message);
        }, 0);
        return true;
      }
    } catch (error) {
      toast.dismiss(loadingToast);
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

  let register = async (userDetails) => {
    let loadingToast = toast.loading('Registering...');

    try {
      let response = await axiosInstance.post('/userRegister', userDetails);

      if (response.status === 200) {
        let { email } = userDetails;
        localStorage.setItem('user', JSON.stringify({ email }));

        Cookies.set('accessToken', response.data.token, { expires: 1, path: '/' });
        setTimeout(() => {
          toast.dismiss(loadingToast);
          toast.success(response.data.message);
        }, 0);
        return true;
      } else {
        toast.dismiss(loadingToast);
        toast.error('Registration failed. Please try again.');
        return false;
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response from the server');
      } else {
        toast.error('An unexpected error occurred');
      }
      return false;
    }
  };


  let logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      Cookies.remove('accessToken');
      toast.success('Logged out successfully');
      return true;
    }
    catch (error) {
      return false;
    }
  };

  useEffect(() => {
    let unSubscribe = () => {
      setUser(user)
    };
    return () => {
      unSubscribe();
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
