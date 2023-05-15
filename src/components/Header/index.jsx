import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    font-size: 2rem;
    padding: 1rem;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, .1);
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 100%;

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Logo = styled.div``;

const Navigation = styled.nav`
    svg {
        cursor: pointer;
        color: black;
    }
`;

export function Header() {
    return (
        <HeaderContainer>
            <Logo>
                <span>e</span>blog
            </Logo>
            <Navigation>
                <Link to={"/profile"} replace>
                    <AiOutlineUser />
                </Link>
            </Navigation>
        </HeaderContainer>
    );
}