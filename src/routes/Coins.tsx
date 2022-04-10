import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
    padding: 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    margin-bottom: 10px;
    border-radius: 20px;

    a {
        transition: color .2s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
        cursor: pointer;

        &:hover {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 35px;
    color: ${props => props.theme.accentColor};
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

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

    return (
        <HelmetProvider>
            <Container>
                <Helmet>
                    <title>Crypto Tracker</title>
                </Helmet>
                
                <Header>
                    <Title>Crypto Tracker</Title>
                </Header>

                {isLoading ? 
                    (
                        <Loading>loading...</Loading>
                    ) :
                    (
                        <CoinsList>
                            {data?.slice(0, 100).map((coin) => (
                                <Coin key={coin.id}>
                                    <Link to={`/${coin.id}`} state={coin}>
                                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
                                        {coin.name} &rarr;
                                    </Link>
                                </Coin>
                            ))}
                        </CoinsList>
                    )
                }
            </Container>
        </HelmetProvider>
    );
}

export default Coins;