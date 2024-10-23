import { Link } from 'react-router-dom'
import { Tabela } from '../../components/Tabela'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { SetMessages } from '../../context/GlobalContext/action'
import { GlobalContext } from '../../context/GlobalContext'

export const AlugueisAtrasos = () => {
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context
    const [isUpdated, setIsUpdated] = useState(false)
    const [alugueis, setAlugueis] = useState([])

    const DevolverPedido = async (id) => {
        const response = await fetch(`http://127.0.0.1:8000/aluguel/devolver/${id}`,{
            method: "PATCH"
        })

        if (response.ok){
            SetMessages(GlobalDispatch, {messages: "Status do pedido atualizado com sucesso!", messageType: 'success'})
            setIsUpdated(!isUpdated)
        }

        else{
            SetMessages(GlobalDispatch, {messages: "Erro ao atualizar o status do pedido!", messageType: 'error'})
        }
    }

    useEffect( () => {
        const AlugueisApi = async () => {
            try{
            const response = await fetch('http://127.0.0.1:8000/aluguel/aluguel_list/')
            const data = await response.json()

            setAlugueis(data)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        AlugueisApi()
        
    }, [isUpdated])

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
                    <td><button onClick={() => DevolverPedido(aluguel.id)} className='btn btn-primary btn-sm'>Devolvido</button></td>
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