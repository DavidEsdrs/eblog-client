import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "../../hooks/useAuth";
import { usePrivateServer } from "../../hooks/usePrivateServer";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    width: 300px;
    box-shadow: 0 2px 9px 1px #5e5d5d19;
    padding: 10px;
    border-radius: 5px;

    h3 {
        margin-bottom: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 4px;
    font-size: 14px;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 5px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
`;

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, setAccessToken } = useAuth();
    const navigate = useNavigate();
    const server = usePrivateServer();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await server.post("/login", { email, password });
            if(!data.error) {
                setAccessToken(data.accessToken);
                navigate("/home", { replace: true });
            } else {
                alert(data.error)
            }
            setEmail("");
            setPassword("");

        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <FormContainer>
                <h3>
                    Log in with your account
                </h3>
                <form onSubmit={handleSubmit}>
                    <Input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                    <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    <Button>
                        LOGIN
                    </Button>
                </form>
                <p>
                    Don't have an account yet? 
                    <Link to={"/signup"}>
                        Sign up
                    </Link>
                </p>
            </FormContainer>
        </Container>
    )
}