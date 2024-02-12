import { useState } from "react";
import { Header } from "../../components/Header";
import styled from "styled-components";
import { useEffect } from "react";
import { usePrivateServer } from "../../hooks/usePrivateServer";
import { useAuth } from "../../hooks/useAuth";
import { DateBadge } from "../../components/DateBadge";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineModeEditOutline, MdReadMore } from "react-icons/md";

const Container = styled.div`
    width: 100%;
    height: 100vh;

    main {
        padding: 0 2rem;
    }
`;

const CreatePostButton = styled.button`
    padding: 20px;
    margin-right: auto;
    cursor: pointer;
    transition: all 200ms;
    border: 1px solid black;
    border-radius: 5px;
`;

const Posts = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 70%;
    margin: 0 auto;

    h2 {
        margin-right: auto;
    }

    li {
        width: 100%;
    }
`;

const PostOverview = styled.div`
    padding: 1rem;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 0px 6px 2px rgba(211, 211, 211, .7);

    h3 {
        margin-right: auto;
    }
`;

const ButtonContainer = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 3px;
`;

const Button = styled.button`
    padding: 5px 10px;
    transition: all 150ms;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
`;

const ReadButton = styled(Button)`
    :hover {
        background-color: #d3d3d3;
    }
`;

const EditButton = styled(Button)`
    :hover {
        background-color: #b2ff8e;
    }
`;

const DeleteButton = styled(Button)`
    :hover {
        background-color: #ff9797;
    }
`;

export function AuthorPanel() {
    const [posts, setPosts] = useState([]);
    const { user } = useAuth();
    const server = usePrivateServer();
    const navigate = useNavigate();

    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        const getPosts = async () => {
            const { data } = await server.get(`/users/${user.id}/posts?createdAt=DESC`);
            setPosts(data);
        };
        getPosts();
    }, [server, setPosts, user]);

    const handleDelete = () => {

    }

    return (
        <Container>
           <Header />
           <main>
                <Posts>
                    <CreatePostButton onClick={() => navigate(`/post/create`)}>
                        CREATE POST
                    </CreatePostButton>
                    <h2>
                        Your posts
                    </h2>
                    {posts.map(post => (
                        <li key={post.id}>
                            <PostOverview>
                                <h3>
                                    {post.title}
                                </h3>
                                <DateBadge created_at={post.created_at} />
                                <ButtonContainer>
                                    <Link to={`/post/${post.id}`} state={{...post}}>
                                        <ReadButton>
                                                <MdReadMore />
                                                <b>
                                                    READ
                                                </b>
                                        </ReadButton>
                                    </Link>
                                    <EditButton>
                                        <MdOutlineModeEditOutline />
                                        <b>
                                            EDIT
                                        </b>
                                    </EditButton>
                                    <DeleteButton onClick={() => setDeleteModal(true)}>
                                        <MdDeleteOutline />
                                        <b>
                                            DELETE
                                        </b>
                                    </DeleteButton>
                                </ButtonContainer>
                            </PostOverview>
                        </li>
                    ))}
                </Posts>
           </main>
        </Container>
    )
}