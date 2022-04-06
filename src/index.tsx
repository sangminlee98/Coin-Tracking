import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);
const queryClient = new QueryClient();


root.render(
  <StrictMode> 
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)