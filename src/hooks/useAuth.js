import { createContext, useContext, useEffect, useState } from "react";
import { usePrivateServer } from "./usePrivateServer";
import { server } from "../services/server";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState("");
    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const authContext = useContext(AuthContext);
    return authContext;
}