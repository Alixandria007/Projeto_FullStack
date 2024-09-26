import { useEffect, useState } from 'react'
import { Tabela } from '../../components/Tabela'
import './styles.css'
import { Link } from 'react-router-dom'

export const Clientes = () => {
    const [clientes, setClientes] = useState([])

    useEffect( () => {
        const ClientesApi = async () => {
            try{
            const response = await fetch('http://127.0.0.1:8000/cliente')
            const data = await response.json()

            setClientes(data)
            console.log(clientes)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        ClientesApi()
        
    }, [])

    return(
        <div className="clientes">
            {clientes.length > 0 ? (
            <Tabela
            thead={
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Fone</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            }

            tbody={
                clientes.map((cliente) => (
                    <tr>
                        <td><Link className='link'>{cliente.id}</Link></td>
                        <td><Link className='link'>{cliente.usuario.first_name} {cliente.usuario.last_name}</Link></td>
                        <td>{cliente.usuario.email}</td>
                        <td>{cliente.telefone}</td>
                        <td>...</td>
                        <td><button className='btn btn-primary btn-sm'>Selecionar</button></td>
                    </tr>
                ))
                }
            />
      ) : (
        <p>Carregando clientes...</p>
      )}
        </div>
    )
}