import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get('/profile');
      setUser(data);
    } catch (error) {
      console.log(error);
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
      } else {
        await fetchUserData();
        toast.success('Login Successful');
      }
    } catch (error) {
      console.log(error.toString());
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loginUser }}>
      {children}
    </UserContext.Provider>
  );
}
