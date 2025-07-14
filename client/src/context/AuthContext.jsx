import { useEffect, useState } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const getUserFromStorage = () => {
        try {
          const item = localStorage.getItem("user");
          return item ? JSON.parse(item) : null;
        } catch (e) {
          return null;
        }
      };
      
      const [currentUser, setCurrentUser] = useState(getUserFromStorage());
      
    const updateUser = (data) =>{
        setCurrentUser(data);
    }

     useEffect(() => {
        localStorage.setItem("user" , JSON.stringify(currentUser));
     })

    return <AuthContext.Provider value ={{currentUser , updateUser}}> { children }</AuthContext.Provider>
}