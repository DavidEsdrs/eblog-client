import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { Header } from "../../components/Header/index";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment";
import { usePrivateServer } from "../../hooks/usePrivateServer";

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const Main = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const FeaturedImage = styled.img`
    width: 100%;
`;

const Summary = styled.section`
    font-style: italic;
`;

const Article = styled.article`
    width: 800px;
    font-size: 1.2rem;
    line-height: 2.4rem;
    color: #333333;
`;

const Content = styled.div`
    width: 500px;
    margin: 0 auto;
    text-indent: 1rem;
`;

const Info = styled.div`
    position: relative;

    &::after {
        content: '';
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: #dfdfdf;
        left: 0;
        bottom: -5px;
    }
`;

const Author = styled.div`
    margin-bottom: 40px;
    text-align: end;

    b {
        font-weight: 600;
    }
`;

const Title = styled.h1`
    margin-bottom: 10px;
    font-size: ${(({ theme }) => theme.sizes.title_size)};
`;

export function Page() {
    const [post, setPost] = useState();
    const [featuredImageUrl, setFeaturedImageUrl] = useState();
    const location = useLocation();
    const server = usePrivateServer();

    useEffect(() => {
        const getPost = async () => {
            const { data } = await server.get(`/posts/${location.state.id}`);
            if(!data.error) {
                setPost(data);
            }
            const { data: content } = await server.get(`/posts/${location.state.id}/image`, {
                responseType: "blob"
            });
            const url = URL.createObjectURL(content);
            console.log({url})
            setFeaturedImageUrl(url);
        };
        getPost();
    }, [server, setPost, location]);

    return (
        <Container>
            <Header />
            <Main>
                <Article>
                    <Info>
                        <FeaturedImage src={featuredImageUrl} />
                        <header>
                            <Title>
                                {post?.title}
                            </Title>
                        </header>
                        <Summary>
                            {post?.summary}
                        </Summary>
                        <Author className="author">
                            By <a rel="author"> 
                                <b>
                                    {post?.creator?.email} 
                                </b>
                            </a> on {moment(post?.created_at).format("MMM Do, YYYY")}
                        </Author>
                    </Info>
                    <Content>
                        {post && parse(post.content)}
                    </Content>
                </Article>
            </Main>
        </Container>
    );
}