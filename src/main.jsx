import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from './Context/Context.jsx'; 
import "@fontsource/poppins";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
        
      </BrowserRouter>
    </ContextProvider>
  </StrictMode>
);
