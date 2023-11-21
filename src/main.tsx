import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import './app/styles/index.scss';
import { themeOptions } from './shared/config/themeConfig/themeConfig';
import { ErrorPage } from './pages/error-page';
import { ErrorBoundary } from './app/providers/error-boundary';
import { StoreProvider } from './app/providers/store-provider';
import { store } from './store/root';


const theme = createTheme(themeOptions);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={(msg) => <ErrorPage message={msg} />}>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </StoreProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
