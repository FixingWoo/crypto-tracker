import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    text-align: center;
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor}
`;

const Loading = styled.div`
    text-align: center;
    color: white;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface RouterState {
    name: string
}

function Coin() {
    const { coins } = useParams();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const name = location.state as RouterState;

    return (
        <Container>
            <Header>
                <Title>{name?.name || "Loading..."}</Title>
            </Header>
            {loading ? (<Loading>loading...</Loading>) : null}
        </Container>        
    )
}

export default Coin;