import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@reposearch/ui-components';
import { theme } from '@chakra-ui/pro-theme';
import '@fontsource/inter/variable.css';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const myTheme = extendTheme(
  {
    colors: { ...theme['colors'], brand: theme['colors'].teal },
  },
  theme
);
root.render(
  <StrictMode>
    <ChakraProvider theme={myTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
