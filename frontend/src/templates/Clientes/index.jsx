import { useContext, useEffect, useState } from 'react';
import { Tabela } from '../../components/Tabela';
import './styles.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SetMessages } from '../../context/GlobalContext/action';
import { GlobalContext } from '../../context/GlobalContext';
import Pagination from '../../components/Pagination';

export const Clientes = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [clientes, setClientes] = useState([]);
    const context = useContext(GlobalContext);
    const { GlobalDispatch } = context;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    useEffect(() => {
        const ClientesApi = async () => {
            try {
                const search = searchParams.get("search");
                const url = search 
                    ? `http://127.0.0.1:8000/cliente?search=${search}` 
                    : 'http://127.0.0.1:8000/cliente';
                const response = await fetch(url);
                const data = await response.json();

                setClientes(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        ClientesApi();
    }, [searchParams]);

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
        };

        carrinho.dono_carrinho = donocarrinho;
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));

        SetMessages(GlobalDispatch, {
            messages: `${cliente.usuario.username} Adicionado como Dono do Carrinho`,
            messageType: 'success'
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentClientes = clientes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            {clientes.length > 0 ? (
                <div className="clientes box">
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
                            currentClientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>
                                        <Link to={`/clientes/detalhes/${cliente.id}`} className='link'>
                                            {cliente.id}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/clientes/detalhes/${cliente.id}`} className='link'>
                                            {cliente.usuario.first_name} {cliente.usuario.last_name}
                                        </Link>
                                    </td>
                                    <td>{cliente.usuario.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.status ? <i class="bi bi-check-circle-fill"></i> : <i class="bi bi-x-circle-fill"></i>}</td>
                                    <td>
                                        {
                                            cliente.status && (<button
                                            className='btn btn-primary btn-sm'
                                            onClick={() => insertDonoCarrinho(cliente)}
                                        >
                                            Selecionar
                                        </button>)}
                                        
                                    </td>
                                </tr>
                            ))
                        }
                    />
                    
                    <div className="pagination d-flex justify-content-center mt-3">
                        <Pagination
                        data={clientes}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        />
                    </div>
                    
                </div>
            ) : (
            <div className='d-flex justify-content-center'>
                <p>Clientes não encontrados...</p>
            </div>
                
            )}
        </>
    );
};
