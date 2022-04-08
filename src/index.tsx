import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import App from './App';


const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);
const queryClient = new QueryClient();


root.render(
  <StrictMode> 
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
)