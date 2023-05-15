import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { usePrivateServer } from "../../hooks/usePrivateServer";
import { DateBadge } from "../DateBadge";

const Container = styled.div`
    padding: 10px 10px 25px 10px;
    border-radius: 10px;
    height: 350px;
    position: relative;
    cursor: pointer;
`;

const Summary = styled.p`

`;

const H2 = styled.h2`
    margin: 0;
`;

const FeaturedImage = styled.img`
    max-width: 100%;
    border-radius: 10px;
`;

export function Post({ id, title, featured_image, summary, created_at, content, creator }) {
    const [featuredImageUrl, setFeaturedImageUrl] = useState("");
    const { accessToken } = useAuth();
    const navigate = useNavigate();
    const server = usePrivateServer();

    useEffect(() => {
        const getImageUrl = async () => {
            const { data } = await server.get(featured_image, {
                responseType: "blob"
            });
            setFeaturedImageUrl(URL.createObjectURL(data));
        }
        getImageUrl();
    }, []);

    

    return (
        <Container onClick={() => navigate(`/post/${id}`, { state: { id, title, featuredImageUrl, summary, created_at, content, creator } })}>
            <FeaturedImage src={featuredImageUrl} />
            <H2>
                {title}
            </H2>
            <Summary>
                {summary}
            </Summary>
            <DateBadge created_at={created_at} relative />
        </Container>
    );
}