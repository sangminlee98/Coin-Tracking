import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';


const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);
const queryClient = new QueryClient();


root.render(
  <StrictMode> 
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </StrictMode>
)