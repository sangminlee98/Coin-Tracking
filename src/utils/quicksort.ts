import { PriceData } from './../interface/interfaces';
export const quickSort = function (arr: PriceData[]){
  if (arr.length <= 1) return arr;
  const pivot = arr[0].quotes.USD.percent_change_1h
  const pivotObj = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].quotes.USD.percent_change_1h >= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  const lSorted: PriceData[] = quickSort(left);
  const rSorted: PriceData[] = quickSort(right);
  return [...lSorted, pivotObj, ...rSorted];
};