import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { getTickers } from '../api/getCoins';
import { isDarkAtom} from '../atoms';
import { PriceData } from '../interface/interfaces';
import { quickSort } from '../utils/quicksort';


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
  margin-bottom: 15px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  & > button:first-child {
    margin-right: 10px;
  }
`;
const FilterButton = styled.button<{isActive: boolean}>`
  border: none;
  outline: none;
  background-color: transparent;
  color: ${props => props.theme.textColor};
  opacity: ${props => props.isActive ? 1 : 0.3};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 20px;
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

type Filter = '?????????' | '????????????';

const Coins = () => {
  let changeRateData;
  const setIsDark = useSetRecoilState(isDarkAtom);
  const [filter, setFilter] = useState<Filter>('?????????');
  const toggleDark = () => setIsDark(state => !state);
  const isDark = useRecoilValue(isDarkAtom);
  const {isLoading, data} = useQuery<PriceData[]>("allCoins", getTickers, {refetchInterval: 60000});
  changeRateData = data !== undefined ? quickSort(data) : [];
  const onPriceFilterClick = () => setFilter('?????????');
  const onChangeRateFilterClick = () => setFilter('????????????');
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
          {isDark ? '????' : '????'}
        </ToggleBtn>
        <ButtonContainer>
          <FilterButton isActive={filter === '?????????' ? true : false} onClick={onPriceFilterClick}>?????????</FilterButton>
          <FilterButton isActive={filter === '????????????' ? true : false} onClick={onChangeRateFilterClick}>????????????</FilterButton>
        </ButtonContainer>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : <CoinsList>
        {filter === '?????????' ? (
          data?.map((coin) =>
          <Coin isDarkMode={isDark} key={coin.id}>
            <Link to={`/${coin.id}`} state={{name: coin.name}}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt='coinImg'/>
                {coin.name} &rarr;
            </Link>
          </Coin>)) : ( 
          changeRateData?.map((coin) =>
          <Coin isDarkMode={isDark} key={coin.id}>
            <Link to={`/${coin.id}`} state={{name: coin.name}}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt='coinImg'/>
                {coin.name} &rarr;
            </Link>
          </Coin>)
          )
        }
      </CoinsList>}
    </Container>
  );
};

export default Coins;