export const getCoinInfo = async(id: string) => {
  const coinInfo = await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}`)).json();
  return coinInfo;
}
export const getCoinPrice = async(id: string) => {
  const coinPrice = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)).json();
  return coinPrice;
}