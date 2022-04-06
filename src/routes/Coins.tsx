import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCoins } from '../api/getCoins';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  text-align: center;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color .2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface CoinInterface {
  id:        string;
  name:      string;
  symbol:    string;
  rank:      number;
  is_new:    boolean;
  is_active: boolean;
  type:      string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async() => {
      setLoading(true);
      try {
        const coins = await getCoins();
        setCoins(coins.splice(0,100));
      } catch(e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  },[]);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <CoinsList>
        {coins.map((coin) =>
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{name: coin.name}}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt='coinImg'/>
                {coin.name} &rarr;
            </Link>
          </Coin>)}
      </CoinsList>}
    </Container>
  );
};

export default Coins;