import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'rsuite/dist/rsuite.min.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  RouterProvider,
} from "react-router-dom";
import './index.css';

import routes from './routes/index.jsx';
import Provider from './context/Provider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider>
      <ChakraProvider>
        <RouterProvider router={routes}>

        </RouterProvider>
      </ChakraProvider>
    </Provider>

  </React.StrictMode>,
);
