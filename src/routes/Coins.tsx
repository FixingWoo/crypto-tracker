import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    text-align: center;
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
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>

            {loading ? 
                (
                    <Loading>loading...</Loading>
                ) :
                (
                    <CoinsList>
                        {coins.map((coin) => (
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
    );
}

export default Coins;