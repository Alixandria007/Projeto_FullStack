import {Route, Routes } from 'react-router-dom'
import Home from '../../../templates/Home';
import { Detalhes } from '../../../templates/Detalhes';
import { Carrinho } from '../../../templates/Carrinho';
import { Clientes } from '../../../templates/Clientes';
import { Categorias } from '../../../templates/Categorias';
import { Alugueis } from '../../../templates/Alugueis';
import { AlugueisAtrasos } from '../../../templates/Alugueis Atrasos';
import { AddFilmes } from '../../../templates/Add Filmes';
import { AddClientes } from '../../../templates/AddClientes';

export const Rotas = () => {
    return (
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/filmes/adicionar/' element={<AddFilmes/>}/>
          <Route path='/:slug' element= {<Detalhes/>}/>
          <Route path='/carrinho' element= {<Carrinho/>}/>
          <Route path='/clientes' element={<Clientes/>}/>
          <Route path='/clientes/adicionar/' element={<AddClientes/>}/>
          <Route path='/categorias' element={<Categorias/>}/>
          <Route path='/alugueis' element={<Alugueis/>}/>
          <Route path='/alugueis/atrasos' element={<AlugueisAtrasos/>}/>
        </Routes>
    )
}