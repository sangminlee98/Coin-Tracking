export const getCoinChart = async(id: string) => {
  const endDate = Math.floor(Date.now()/1000);
  const startDate = endDate - 60*60*24*7*2; // 2주전
  const response = await ( await fetch(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
  return response;
}