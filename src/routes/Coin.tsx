import React from 'react';
import { useQuery } from 'react-query';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {AiOutlineHome} from 'react-icons/ai'
import { Link, Outlet, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCoinInfo, getCoinPrice } from '../api/getCoinData';
import { InfoData, PriceData } from '../interface/interfaces';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Loader = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;
const HomeBtn = styled.div`
  position: absolute;
  left: 20px;
  transition: all 0.3s ease-in;
  svg {
    font-size: 1.5rem;
    margin-top: 15px;
    color: ${props => props.theme.accentColor}
  }
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface RouterState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoData>(['info', coinId], () => getCoinInfo(coinId!));
  const {isLoading: priceLoading, data: priceData} = useQuery<PriceData>(['price', coinId], () => getCoinPrice(coinId!),{refetchInterval: 5000,});
  // 리액트 쿼리에서 3번째 인자에 refetchInterval을 통해 5초주기마다 다시 데이터를 fetch해옴
  const location = useLocation();
  const state = location.state as RouterState;
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const loading = infoLoading || priceLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <HomeBtn>
          <Link to='/'><AiOutlineHome/></Link>
        </HomeBtn>
        <Title>
          {state?.name ? state.name : loading ? 'Loading' : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to='chart'>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to='price'>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{coinId}}/>
        </>
      )}
    </Container>
  );
};

export default Coin;