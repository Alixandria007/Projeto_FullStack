import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Router} from './components/Router';
import { GlobalProvider } from './context/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router/>
    </GlobalProvider>
  </React.StrictMode>
);
