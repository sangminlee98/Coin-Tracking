import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getCoinPrice } from '../api/getCoinData';
import { PriceData } from '../interface/interfaces';

const comeupAnimation = keyframes`
  0% {
    transform: none;
    opacity: 0;
  }
  1% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  main:first-child {
    animation-delay: 0.2s;
  }
  main:nth-child(2) {
    animation-delay: 0.4s;
  }
  main:nth-child(3) {
    animation-delay: 0.6s;
  }
  main:nth-child(4) {
    animation-delay: 0.8s;
  }
  main:nth-child(5) {
    animation-delay: 1s;
  }
  main:last-child {
    animation-delay: 1.2s;
  }
`;

const Overview = styled.main`
  width: 100%;
  height: 50px;
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin: 10px 0;
  padding: 20px;
  transform: translateY(-5px);
  opacity: 0;
  animation: ${comeupAnimation} 0.5s linear forwards;
`;

const Tag = styled.h3`
  width: 50%;
  color: black;
  font-size: 12px;
  font-weight: 600;
`;

const Value = styled.div`
  width: 50%;
`;

const Text = styled.h3<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => (props.isPositive ? "lightgreen" : "red")};
`;
interface IOutletProps {
  coinId: string;
}
const checkValue = (value: number | undefined) => {
  if(value) {
    return value > 0;
  }
}
const Price = () => {
  const {coinId} = useOutletContext<IOutletProps>();
  const {isLoading, data} = useQuery<PriceData>(['priceData', coinId], () => getCoinPrice(coinId));
  return (
    <Container>
      {isLoading ? (
        "Loading Price..."
      ) : (
        <>
          <Overview>
            <Tag>Price : </Tag>
            <Value>
              <Text isPositive={true}>
                $ {data?.quotes.USD.price.toFixed(3)}
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Max Change rate in last 24h :</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.market_cap_change_24h) === true
                }
              >
                {data?.quotes.USD.market_cap_change_24h} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Chage rate (last 30 Minutes) :</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_30m) === true
                }
              >
                {data?.quotes.USD.percent_change_30m} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 1 hours) :</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_1h) === true
                }
              >
                {data?.quotes.USD.percent_change_1h} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 12 hours) :</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_12h) === true
                }
              >
                {data?.quotes.USD.percent_change_12h} %
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Change rate (last 24 hours) :</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_24h) === true
                }
              >
                {data?.quotes.USD.percent_change_24h} %
              </Text>
            </Value>
          </Overview>
        </>
      )}
    </Container>
  );
};

export default Price;