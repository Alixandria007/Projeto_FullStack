import { Link } from 'react-router-dom'
import { Tabela } from '../../components/Tabela'
import './styles.css'
import { useEffect, useState } from 'react'

export const AlugueisAtrasos = () => {
    const [alugueis, setAlugueis] = useState([])

    useEffect( () => {
        const AlugueisApi = async () => {
            try{
            const response = await fetch('http://127.0.0.1:8000/aluguel/aluguel_list/atrasos/')
            const data = await response.json()

            setAlugueis(data)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        AlugueisApi()
        
    }, [])

    return(
        <div className="box alugueis">
        {alugueis.length > 0 ? (
        <Tabela
        thead={
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Data</th>
                <th>Vencimento</th>
                <th>Status</th>               
                <th>Ação</th>
            </tr>
        }

        tbody={
            alugueis.map((aluguel) => (
                <tr>
                    <td><Link className='link'> Aluguel nº{aluguel.id}</Link></td>
                    <td>{aluguel.cliente.usuario.username}</td>
                    <td>{aluguel.data_aluguel}</td>
                    <td>{aluguel.vencimento}</td>
                    <td>{aluguel.status}</td>
                    <td><button className='btn btn-primary btn-sm'>Devolvido</button></td>
                </tr>
            ))
            }
        />
    ) : (
        <p>Não há alugueis atrasados...</p>
    )}
    </div>
    )
}