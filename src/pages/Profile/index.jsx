import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import styled from "styled-components"
import { usePrivateServer } from "../../hooks/usePrivateServer";
import { DateBadge } from "../../components/DateBadge";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const Main = styled.main`
    margin: 0 auto;
    max-width: 1000px;
`;

const ProfileContainer = styled.div`
    /* background-color: #ffd6d6; */
    color: black;
    border-radius: 10px;
    padding: 10px 0;

    p {
        position: relative;
        ::after {
            content: '';
            position: absolute;
            background-color: #b8b8b8;
            width: 100%;
            height: 1px;
            left: 0;
            bottom: -10px;
        }
    }
`;

const Roles = styled.nav`
    display: flex;
    flex-direction: row;
`;

const Role = styled.span`
    background-color: #82c5ff;
    border-radius: 10px;
    padding: 2px 5px;
    font-weight: 800;
    font-size: 1rem;
`;

const H2 = styled.h2`
    margin-bottom: 10px;
`;

const Section = styled.section`
    padding: 20px 0;
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const PostTitle = styled.h3`
    font-weight: 400;
`;

const PostItem = styled.div`
    display: flex;
    flex-direction: row;

    position: relative;

    padding: 1rem;

    box-shadow: 0px 0px 6px 2px rgba(211, 211, 211, .7);

    border-radius: 10px;

    cursor: pointer;
`;

export function Profile() {
    const { user, setUser } = useAuth();
    const [posts, setPosts] = useState([]);
    const server = usePrivateServer();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const userProfile = await server.get(`/users`);
            const userPosts = await server.get(`/users/${user.id}/posts`);

            setPosts(userPosts.data);
            setUser(userProfile.data);
        };  
        getUser();
    }, [server, setPosts, setUser]);

    return (
        <Container>
            <Header />
            <Main>
                <ProfileContainer>
                    <h2>
                        {user?.username}
                    </h2>
                    <Roles>
                        {user?.roles?.map(role => (
                            <Role key={`${user?.id}-${role.id}`}>
                                {role.type}
                            </Role>
                        ))}
                    </Roles>
                    <p> Created at <time>{new Date(user?.created_at).toLocaleDateString("en-GB", { dateStyle: "long" })}</time></p>
                </ProfileContainer>
                <Section>
                    <H2>
                        Your posts
                    </H2>
                    <List>
                        {posts?.map(post => (
                            <li key={post.id}>
                                <PostItem onClick={() => navigate(`/post/${post.id}`, { state: {...post} })}>
                                    <PostTitle>
                                        {post.title}
                                    </PostTitle>
                                    <DateBadge created_at={post.created_at} />
                                </PostItem>
                            </li>
                        ))}
                    </List>
                </Section>
            </Main>
        </Container>
    )
}