import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { getCoinChart } from '../api/getCoinChart';

interface IOutletContext {
  coinId: string;
}
const Chart = () => {
  const {coinId} = useOutletContext<IOutletContext>();
  const {isLoading, data} = useQuery(['chart',coinId], () => getCoinChart(coinId));
  console.log(data);
  return (
    <h1>
    </h1>
  );
};

export default Chart;