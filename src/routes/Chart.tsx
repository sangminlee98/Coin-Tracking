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
  const {isLoading, data} = useQuery<ChartData[]>(['chart',coinId], () => getCoinChart(coinId));
  return (
    <div>
      {isLoading ? (
          "Loading chart..."
        ) : (
          <ApexChart
            type='line'
            series={[
              {
                name: 'price',
                data: data?.map(price => price.close) ?? [],
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
                    show: false,
                  },
                  type: "datetime",
                  categories: data?.map(price => price.time_close)
                },
                stroke: {
                  curve: 'smooth',
                  width: 4,
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    gradientToColors: ['#0be881'],
                    stops: [0, 100],
                  },
                },
                colors: ['#0fbcf9'],
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