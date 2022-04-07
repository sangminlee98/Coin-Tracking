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
                    show: false
                  },
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                  },
                },
                stroke: {
                  curve: 'smooth',
                  width: 4,
                },
            }}
          />
        )}
    </div>
  );
};

export default Chart;