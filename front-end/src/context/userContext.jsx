import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedResponseData = localStorage.getItem("responseData");
      const parsedResponseData = JSON.parse(storedResponseData);

      if (parsedResponseData && !parsedResponseData.error) {
        setUser(parsedResponseData.user);
        setIsLoggedIn(true);
        console.log("Authenticated User:", parsedResponseData.user);
        console.log("User_Id:", parsedResponseData.user.id);
        navigate(`/dashboard/${parsedResponseData.user.id}`);
      } else {
        console.log("Error:", parsedResponseData.error);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  /*
  const fetchUserData = async () => {
    try {
      const storedUserData = await localStorage.getItem("responseData");
      console.log(storedUserData);
      console.log(storedUserData.user);
      setUser(storedUserDatadata);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };
*/

  /*
 * // Retrieving user data from local storage
const storedUserData = localStorage.getItem("user");

if (storedUserData) {
  const userData = JSON.parse(storedUserData);
  console.log(userData.username); // "john_doe"
  console.log(userData.email);    // "john@example.com"
  // Access other user properties...
} else {
  console.log("User data not found in local
 * */
  const logout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;

    try {
      await axios.get("https://digital-wallet.onrender.com/logout");
      // Clear local storage
      localStorage.clear();
      setUser(null);
      setIsLoggedIn(false);
      toast.success("Logged Out Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://digital-wallet.onrender.com/login",
        { email, password },
      );
      if (data.error) {
        toast.error(data.error);
        setIsLoggedIn(false);
      } else {
        await fetchUserData();
        setIsLoggedIn(true);
        toast.success("Login Successful");
      }
    } catch (error) {
      console.log(error.toString());
      setIsLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoggedIn, logout, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
