import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCoins } from '../api/getCoins';
import { CoinInterface } from '../interface/interfaces';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ToggleBtn = styled.button`
  position: absolute;
  right: 20px;
  margin-top: 15px;
  font-size: 1.5em;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  transition: .3s ease-in;
  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }
`;
const Loader = styled.div`
  text-align: center;
`;

const CoinsList = styled.ul`

`;

const Coin = styled.li<{isDarkMode: boolean}>`
  background-color: white;
  color: ${props => props.isDarkMode ? props.theme.bgColor : 'black'};
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
interface ICoinsProps {
  isDark: boolean;
  toggleDark: () => void;
}
const Coins = ({isDark, toggleDark}: ICoinsProps) => {
  const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", getCoins);
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            Coin Tracker
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>Coin Tracker</Title>
        <ToggleBtn onClick={toggleDark}>
          {isDark ? '🌜' : '🌞'}
        </ToggleBtn>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : <CoinsList>
        {data?.slice(0,100).map((coin) =>
          <Coin isDarkMode={isDark} key={coin.id}>
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