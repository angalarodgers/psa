import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "https://api.proswimacademykenya.info/api/auth/loginTrainer",
        inputs,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        setCurrentUser(res.data);
        return res;
      } else {
        return res;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
