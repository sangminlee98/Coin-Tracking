export const getCoinChart = async(id: string) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 23 * 7 * 1; // 현재 시간에서 1주 -1 시간에 해당하는 초를 뺌;
  const response = await ( await fetch(`https://api.coinpaprika.com/v1/coins/${id}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
  return response;
}