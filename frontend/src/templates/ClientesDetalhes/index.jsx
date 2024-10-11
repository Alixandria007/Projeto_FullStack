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

    useEffect( () => {
        const ClientesApi = async () => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/cliente/datail/${id}`)
            const data = await response.json()

            setCliente(data)
        }

            catch (error){
                console.error('Erro ao buscar dados:', error);
            }
        }    

        ClientesApi()
        
    }, [])
    
    return(
        <p>{cliente.usuario.first_name}</p>
    )
}