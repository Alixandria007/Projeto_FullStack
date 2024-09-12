import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Menu } from './components/Menu';
import Home from './templates/Home';
import { Main_Content } from './components/Main Content';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menu/>
    <Main_Content>
      <Home/>
    </Main_Content>
  </React.StrictMode>
);
