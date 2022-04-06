export const getCoinInfo = async(id: string) => {
  const coinInfo = await (await fetch(`https://api.coinpaprika.com/v1/coins/${id}`)).json();
  const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)).json();
  return {coinInfo, priceData};
}