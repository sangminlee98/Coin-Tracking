export const getCoins = async() => {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const json = await response.json();
  return json.slice(0,50);
};

export const getTickers = async() => {
  const response = await fetch('https://api.coinpaprika.com/v1/tickers');
  const json = await response.json();
  return json.slice(0,50);
}
