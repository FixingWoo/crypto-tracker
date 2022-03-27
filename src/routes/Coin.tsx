import { useParams } from "react-router-dom";

interface RouteParams {
    coinId: string,
}

function Coin() {
    const { coins } = useParams();

    return (
        <h1>Coin: {coins}</h1>
    );
}

export default Coin;