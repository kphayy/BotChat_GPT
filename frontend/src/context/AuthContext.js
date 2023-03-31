import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextPovider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user") || null));

    const login = async(inputs) => {
        const res = await axios.post("/api/auth/login", inputs);
        setCurrentUser(res.data);
    }

    const logout = async() => {
        await axios.post("/api/auth/logout");
        setCurrentUser(null);
    }

    const refreshAccessToken = (accessToken) => {
        console.log("accessToken >>>> " + accessToken)
        setCurrentUser({...currentUser, accessToken: accessToken});
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout, refreshAccessToken}}>
            {children}
        </AuthContext.Provider>
    )

}