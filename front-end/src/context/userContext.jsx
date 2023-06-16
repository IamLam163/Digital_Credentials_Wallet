import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get('/profile');
      setUser(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (!confirmed) return;

    try {
      await axios.get('/logout');
      // Clear local storage
      localStorage.clear();
      setUser(null);
      setIsLoggedIn(false);
      toast.success('Logged Out Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post('/login', { email, password });
      if (data.error) {
        toast.error(data.error);
        setIsLoggedIn(false);
      } else {
        await fetchUserData();
        setIsLoggedIn(true);
        toast.success('Login Successful');
      }
    } catch (error) {
      console.log(error.toString());
      setIsLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, logout, loginUser }}>
      {children}
    </UserContext.Provider>
  );
}
