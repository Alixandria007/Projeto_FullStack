import {Route, Routes } from 'react-router-dom'
import Home from '../../../templates/Home';
import { Detalhes } from '../../../templates/Detalhes';
import { Carrinho } from '../../../templates/Carrinho';
import { Clientes } from '../../../templates/Clientes';
import { Categorias } from '../../../templates/Categorias';
import { Alugueis } from '../../../templates/Alugueis';

export const Rotas = () => {
    return (
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/:slug' element= {<Detalhes/>}/>
          <Route path='/carrinho' element= {<Carrinho/>}/>
          <Route path='/clientes' element={<Clientes/>}/>
          <Route path='/categorias' element={<Categorias/>}/>
          <Route path='/alugueis' element={<Alugueis/>}/>
        </Routes>
    )
}