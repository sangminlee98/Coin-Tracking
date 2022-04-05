import React from 'react';
import { useParams } from 'react-router-dom';

const Coin = () => {
  const { coinId } = useParams();
  return (
    <h1>coin : {coinId}</h1>
  );
};

export default Coin;