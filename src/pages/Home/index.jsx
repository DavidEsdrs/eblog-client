import { useEffect, useState } from "react";
import styled from "styled-components"
import { Post } from "../../components/Post/index";
import { Header } from "../../components/Header/index";
import { useAuth } from "../../hooks/useAuth";
import { usePrivateServer } from "../../hooks/usePrivateServer";
import { usePosts } from "../../hooks/usePosts";

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const Title = styled.h1`
    position: relative;

    &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: #eeeeee;
    }
`;

const Main = styled.main`
    width: 1000px;
    margin: 0 auto;

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
`;

export function Home() {
    const { posts, setPosts } = usePosts();
    const { accessToken } = useAuth();
    const server = usePrivateServer();

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await server.get("/posts");
            if(!data.error) {
                setPosts(data);
            }
        };
        fetchPosts();
    }, [server, accessToken, setPosts]);

    return (
        <Container>
            <Header />
            <Main>
                <ul>
                    {posts?.map(post => (
                        <li key={post.id}>
                            <Post {...post} />
                        </li>
                    ))}
                </ul>
            </Main>
        </Container>
    )
}