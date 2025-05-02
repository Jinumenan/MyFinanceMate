import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext();


const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //function to update user  data
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };

    //function to clear user data
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return (
        <UserContext.Provider value={{user, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;