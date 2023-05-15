import { server } from "../services/server";
import { useEffect, useRef } from "react";
import { useRefresh } from "./useRefresh.js";
import { useAuth } from "./useAuth";

export const usePrivateServer = () => {
    const refresh = useRefresh();
    const { accessToken } = useAuth();

    useEffect(() => {
        const requestIntercept = server.interceptors.request.use(config => {
            if(!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${accessToken}`
            }
            return config;
        }, error => Promise.reject(error));

        const responseIntercept = server.interceptors.response.use(
            response => response, 
            async error => {
                const prevReq = error?.config;
                if(/*(error?.response?.status === 403 || error?.response?.status === 401)*/
                    (error?.response?.data.error === "Invalid JWT!" || error?.response?.data.error === "Invalid token!")
                 && !prevReq?.sent) {
                    prevReq.sent = true;
                    const newAccessToken = await refresh();
                    prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return server(prevReq); // Resend the request with the new access token
                }
                return Promise.reject(error);
            }
        );

        return () => {
            server.interceptors.request.eject(requestIntercept);
            server.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh]);
     
    return server;
}