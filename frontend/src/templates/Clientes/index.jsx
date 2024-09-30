import { useContext, useEffect, useState } from 'react'
import { Tabela } from '../../components/Tabela'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'
import { SetMessages } from '../../context/GlobalContext/action'
import { GlobalContext } from '../../context/GlobalContext'

export const Clientes = () => {
    const navigate = useNavigate()
    const [clientes, setClientes] = useState([])
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context

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


    const insertDonoCarrinho = (cliente) => {
        let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || {
            filmes: [],
            dono_carrinho: null
        };

        const donocarrinho = {
            id: cliente.id,
            username: cliente.usuario.username,
            nome: cliente.usuario.first_name,
            sobrenome: cliente.usuario.last_name,
            email: cliente.usuario.email,
            telefone: cliente.telefone,
            cpf: cliente.cpf
        }

        carrinho.dono_carrinho = donocarrinho
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));

        SetMessages(GlobalDispatch, {messages: `${cliente.usuario.username} Adicionado como Dono do Carrinho`, messageType: 'success'})
    }

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
                    <tr key={cliente.id}>
                        <td><Link className='link'>{cliente.id}</Link></td>
                        <td><Link className='link'>{cliente.usuario.first_name} {cliente.usuario.last_name}</Link></td>
                        <td>{cliente.usuario.email}</td>
                        <td>{cliente.telefone}</td>
                        <td>...</td>
                        <td><button className='btn btn-primary btn-sm' onClick={() => insertDonoCarrinho(cliente)}>Selecionar</button></td>
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