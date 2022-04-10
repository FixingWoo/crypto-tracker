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

function Chart() {
    const { coinId } = useParams();

    const { isLoading, data } = useQuery<Historical[]>(
        ["ohlcv", coinId], 
        () => fetchCoinHistory(coinId)
    );

    return (
        <>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart 
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => price.close) as number[]
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark"
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        grid: {
                            show: false
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4
                        },
                        yaxis: {
                            show: false
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map(price => price.time_close)
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["blue"] },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`
                            }
                        }
                    }}
                />
            )}
        </>
    );
}

export default Chart;