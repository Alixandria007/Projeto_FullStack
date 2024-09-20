import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Menu } from './components/Menu';
import { MainContent } from './components/Main Content';
import { Router} from './components/Routes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
    <BrowserRouter>
        
          <Menu/>
          <MainContent>
            <Router/>
          </MainContent>
        
    </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
