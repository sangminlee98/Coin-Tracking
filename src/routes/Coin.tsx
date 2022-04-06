import { info } from 'console';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCoinInfo } from '../api/getCoinInfo';
import { InfoData, PriceData } from '../interface/interfaces';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
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

interface RouterState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(false);
  const [coinInfo, setCoinInfo] = useState<InfoData>();
  const [coinPrice, setCoinPrice] = useState<PriceData>();
  const location = useLocation();
  const state = location.state as RouterState;

  useEffect(() => {
    setLoading(true);
    (async() => {
      try {
        const {coinInfo, priceData} = await getCoinInfo(coinId!);
        setCoinInfo(coinInfo);
        setCoinPrice(priceData);
      } catch(e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  },[coinId])
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading' : coinInfo?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{coinInfo?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{coinPrice?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{coinPrice?.max_supply}</span>
            </OverviewItem>
          </Overview>
          
        </>
      )}
    </Container>
  );
};

export default Coin;