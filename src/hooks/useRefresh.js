import { server } from "../services/server";
import { useAuth } from "./useAuth";

export const useRefresh = () => {
    const { setAccessToken } = useAuth();

    const refresh = async () => {
        const response = await server.get("/refresh", {
            withCredentials: true
        });
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
    }

    return refresh;
}