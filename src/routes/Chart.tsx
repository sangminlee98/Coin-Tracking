import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { getCoinChart } from '../api/getCoinChart';
import { ChartData } from '../interface/interfaces';
import ApexChart from 'react-apexcharts';

interface IOutletContext {
  coinId: string;
}
const Chart = () => {
  const {coinId} = useOutletContext<IOutletContext>();
  const {isLoading, data} = useQuery<ChartData[]>(['chart',coinId], () => getCoinChart(coinId),{refetchInterval: 5000,});
  // 5초 주기로 데이터를 다시 fetch해옴
  return (
    <div>
      {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type='candlestick'
            series={[
              {
                name: 'Price',
                data: data?.map(price => ({
                  x: price.time_close,
                  y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]
                })) ?? [],
              }
            ]} 
            options={{
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: 'transparent',
                },
                theme: {
                  mode: 'dark'
                },
                grid: {
                  show: false
                },
                yaxis: {
                  show: false
                },
                xaxis: {
                  labels: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: true,
                  },
                  type: "datetime",
                  categories: data?.map(price => price.time_close)
                },
                stroke: {
                  curve: 'smooth',
                  width: 4,
                },
                tooltip: {
                  y: {
                    formatter: (value) => `$ ${value.toFixed(3)}`,
                  }
                }
            }}
          />
        )}
    </div>
  );
};

export default Chart;