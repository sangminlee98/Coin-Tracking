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

interface RouterState {
  name: string;
}

const Coin = () => {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(false);
  const [coinInfo, setCoinInfo] = useState<InfoData>();
  const [coinPrice, setCoinPrice] = useState<PriceData>();
  const location = useLocation();
  const name = location.state ? (location.state as RouterState).name : 'Loading';

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
        <Title>{name}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
};

export default Coin;