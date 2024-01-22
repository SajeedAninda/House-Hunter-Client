import { createContext, useContext, useEffect, useState } from 'react';
import useAxiosInstance from '../Hooks/useAxiosInstance';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  let axiosInstance = useAxiosInstance();
  console.log(user);

  const login = async ({ email, password }) => {
    let loadingToast = toast.loading('Logging In...');

    try {
      const response = await axiosInstance.post('/userLogin', { email, password });

      if (response.status >= 200 && response.status < 300) {
        const token = response.data.token;

        Cookies.set('accessToken', token, { expires: 1, path: '/' });

        const updatedUser = { email };
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

  const logout = () => {
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
