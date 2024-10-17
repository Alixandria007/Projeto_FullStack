import { Link, useNavigate, useParams } from 'react-router-dom'
import './styles.css'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'
import { ConfirmScreen } from '../../components/ConfirmScreen'
import { SetMessages } from '../../context/GlobalContext/action'

export const ClientesDetalhes = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [overlay, setOverlay] = useState(false)
    const context = useContext(GlobalContext);
    const { GlobalDispatch } = context;
    
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const ClienteApi = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/cliente/detail/${id}`);
                if (!response.ok) {
                    throw new Error('Erro na resposta da API');
                }
                const data = await response.json();
                setCliente(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        ClienteApi();
    }, [id]);

    
    const openOverlay = () => setOverlay(true);
    const closeOverlay = () => setOverlay(false);


    const handleDelete = async () => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/cliente/delete/${id}`,{
              method: 'DELETE'
            })
    
            if (response.ok){
              SetMessages(GlobalDispatch,{'messages': 'Cliente Deletado com sucesso!', 'messageType': 'success'})
              navigate('/')
            }
    
            else{
              SetMessages(GlobalDispatch,{'messages': 'Error ao tentar deletar o cliente!', 'messageType': 'error'})
            }
          }
          catch{
              SetMessages(GlobalDispatch,{'messages': 'Error ao tentar deletar o cliente!', 'messageType': 'error'})
          }
    }

    if (!cliente) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="box cliente-wrapper mb-3">
            <h3 className="text-center cliente-title mb-3">Informações do Cliente</h3>
            <p><strong>ID:</strong> {id}</p>
            <div className="row">
                <p className="col"><strong>Nome:</strong> {cliente.usuario?.first_name}</p>
                <p className="col"><strong>Sobrenome:</strong> {cliente.usuario?.last_name}</p>
            </div>

            <div className="row">
                <p className="col"><strong>Username:</strong> {cliente.usuario?.username}</p>
                <p className="col"><strong>CPF:</strong> {cliente.cpf}</p>
            </div>

            <div className="row">
                <p className="col"><strong>Email:</strong> {cliente.usuario?.email}</p>
                <p className="col"><strong>Telefone:</strong> {cliente.telefone}</p>
            </div>

            <div className="button-wrapper d-flex gap-4">
                <button type="button" onClick={openOverlay} className="btn btn-danger btn-block">
                    Deletar Filme
                </button>

                <ConfirmScreen
                    isOpen={overlay}
                    onClose={closeOverlay}
                    onConfirm={handleDelete}
                    text={`Você tem certeza que vai apagar o cliente "${cliente.usuario.username}"?`}
                />

                <Link to={`/clientes/edit/${id}`} type="button" className='btn btn-primary'>Editar Dados</Link>
            </div>
        </div>


    );
}
