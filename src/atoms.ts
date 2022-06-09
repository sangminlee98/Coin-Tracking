import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: true,
});

export const coinState = atom({
  key: 'coinData',
  default: []
})
