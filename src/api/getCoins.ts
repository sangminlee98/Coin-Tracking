export const getCoins = async() => {
  const response = await fetch('https://api.coinpaprika.com/v1/coins');
  const json = await response.json();
  return json;
};