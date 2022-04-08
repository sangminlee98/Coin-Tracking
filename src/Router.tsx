import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Chart from './routes/Chart';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean
}
const Router = ({toggleDark, isDark}: IRouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Coins isDark={isDark} toggleDark={toggleDark}/>}/>
        <Route path='/:coinId' element={<Coin isDark={isDark} toggleDark={toggleDark}/>}>
          <Route path='price' element={<Price/>}/>
          <Route path='chart' element={<Chart isDark={isDark}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;