import { useNavigate, useParams } from 'react-router-dom'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'

export const ClientesDetalhes = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [cliente, setCliente] = useState([])
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context

    useEffect(() => {
        const ClienteApi = async () => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/cliente/detail/${id}`)
            const data = await response.json()

            setCliente(data)
            console.log(data)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        ClienteApi()
        
    }, [cliente])
    
    return(
        <div className="box cliente-wrapper mb-3">
                <h3 className="text-center cliente-title mb-1">Informações do Cliente</h3>
                <p><strong>ID:</strong> {id}</p>
                <div className='row'>
                    <p className='col'><strong>Nome:</strong> {cliente.usuario.first_name}</p>
                    <p className='col'><strong>Sobrenome:</strong> {cliente.usuario.last_name}</p>
                </div>
                
                <div className='row'>
                    <p className='col'><strong>Username:</strong> {cliente.usuario.username}</p>
                    <p className='col'><strong>CPF:</strong> {cliente.cpf}</p>
                </div>

                <div className='row'>
                    <p className='col'><strong>Email:</strong> {cliente.usuario.email}</p>
                    <p className='col'><strong>Telefone:</strong> {cliente.telefone}</p>
                </div>
            </div>
    )
}