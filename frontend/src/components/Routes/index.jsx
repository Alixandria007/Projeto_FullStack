import {Route, Routes } from 'react-router-dom'
import Home from '../../templates/Home';
import { Detalhes } from '../../templates/Detalhes';
import { Carrinho } from '../../templates/Carrinho';

export const Router = () => {
    return (
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/:slug' element= {<Detalhes/>}/>
          <Route path='/carrinho' element= {<Carrinho/>}/>
        </Routes>
    )
}