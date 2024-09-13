import {Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from '../../templates/Home';
import { Detalhes } from '../../templates/Detalhes';

export const Router = () => {
    return (
      
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/:slug' element= {<Detalhes/>}/>
        </Routes>
    )
}