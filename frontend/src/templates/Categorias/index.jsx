import { useEffect, useState } from 'react';
import './styles.css';
import { Card } from '../../components/CardGrid/Card';
import { CardGrid } from '../../components/CardGrid';
import { Link } from 'react-router-dom';
import { Tabela } from '../../components/Tabela';

export const Categorias = () => {
    const [categorias, setCategorias] = useState([])

    useEffect( () => {
        const CategoriasApi = async () => {
            try{
            const response = await fetch('http://127.0.0.1:8000/filme/categoria')
            const data = await response.json()

            setCategorias(data)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        CategoriasApi()
        
    }, [])

    return(
        <div className="clientes">
            {categorias.length > 0 ? (
            <Tabela
            thead={
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ação</th>
                </tr>
            }

            tbody={
                categorias.map((categoria) => (
                    <tr>
                        <td><Link className='link'>{categoria.id}</Link></td>
                        <td><Link className='link'>{categoria.nome}</Link></td>
                        <td><button className='btn btn-primary btn-sm'>Selecionar</button></td>
                    </tr>
                ))
                }
            />
      ) : (
        <p>Carregando categorias...</p>
      )}
        </div>
    )
}