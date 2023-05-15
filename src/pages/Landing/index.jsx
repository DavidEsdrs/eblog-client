import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { usePrivateServer } from "../../hooks/usePrivateServer";
import { Home } from "../Home";
import { Login } from "../Login";

export function Landing() {
    const { user, setUser } = useAuth();
    const server = usePrivateServer();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await server.get("/profile");
                setUser(data);
            } catch (err) {
                console.log("There was an error while getting user!", err);
            }
        };
        getUser();

    }, [server, setUser]);

    if(Object.entries(user).length > 0) {
        return <Home />
    } else {
        return <Login />
    }
}