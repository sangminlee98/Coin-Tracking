import React, { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </StrictMode>
)