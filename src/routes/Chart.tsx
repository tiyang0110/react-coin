import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useQuery } from "react-query";

interface ChartProps {
  coinId: string;
}

interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({coinId}:ChartProps){
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 10000});
  const isDark = useRecoilValue(isDarkAtom);

  const priceOriginData = data ?? [];
  const priceData = priceOriginData.map((v) => {
    return {
      x: v.time_close,
      y: [v.open, v.high, v.low, v.close],
    }
  });

  return <div>{isLoading ? "Loading Chart..." : (
    <ApexChart
      type="candlestick"
      options={{
        theme: {
          mode: isDark ? "dark" : "light",
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
      }}
      series={[
        {
          data: priceData
        }
      ]}
    />
  )}</div>;
}

export default Chart;