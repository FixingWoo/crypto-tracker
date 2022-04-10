import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

interface Historical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Price() {
    const { coinId } = useParams();

    const { isLoading, data } = useQuery<Historical[]>(
        ["ohlvc", coinId],
        () => fetchCoinHistory(coinId)
    );    

    const chartData = data?.map((data: Historical) => ({
            x: new Date(data.time_open),
            y: [
                data.open.toFixed(2),
                data.high.toFixed(2),
                data.low.toFixed(2),
                data.close.toFixed(2)
            ]
        })
    )
     
    return (
        <>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart 
                    type="candlestick"
                    series={[{
                        data: chartData
                    }] as unknown as number[] }
                    options={{
                        theme: {
                            mode: "dark"
                        },
                        chart: {
                            type: "candlestick",
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 2
                        },
                        grid: {
                            show: false
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            }
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: data?.map(price => price.time_close),
                            labels: {
                                style: {
                                    colors: '#9c88ff'
                                }
                            }
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: '#3C90EB',
                                    downward: '#DF7D46'
                                }
                            }
                        }
                    }}
                />
            )}
        </>
    );
}

export default Price;