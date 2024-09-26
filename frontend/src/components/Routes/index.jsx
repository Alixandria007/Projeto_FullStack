import {Route, Routes } from 'react-router-dom'
import Home from '../../templates/Home';
import { Detalhes } from '../../templates/Detalhes';
import { Carrinho } from '../../templates/Carrinho';
import { Clientes } from '../../templates/Clientes';
import { Categorias } from '../../templates/Categorias';

export const Router = () => {
    return (
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/:slug' element= {<Detalhes/>}/>
          <Route path='/carrinho' element= {<Carrinho/>}/>
          <Route path='/clientes' element={<Clientes/>}></Route>
          <Route path='/categorias' element={<Categorias/>}/>
        </Routes>
    )
}