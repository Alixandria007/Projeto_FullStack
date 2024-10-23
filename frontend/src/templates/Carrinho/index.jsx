import { useEffect, useState, useContext } from 'react';
import './styles.css';
import { GlobalContext } from '../../context/GlobalContext';
import { carrinhoExists, SetMessages } from '../../context/GlobalContext/action';
import { Link, useNavigate } from 'react-router-dom';
import { Tabela } from '../../components/Tabela';

export const Carrinho = () => {
    const navigate = useNavigate()

    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.getItem('carrinho')) || {
        filmes: [],
        dono_carrinho: null
    })
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context

    useEffect(() => {
        if (carrinho.filmes.length == []) {
            excluirCarrinho()
        }
    })

    const excluirCarrinho = () => {
        sessionStorage.clear()
        SetMessages(GlobalDispatch, {messages: 'Não há mais itens no carrinho!', messageType: 'error'})
        navigate('/')
    }


    const excluirItem = (row) => {
        const id = row.id;
    
        let carrinho = JSON.parse(sessionStorage.getItem('carrinho'));
        let filmes = carrinho.filmes.filter(item => item.id !== parseInt(id))
        carrinho.filmes = filmes
    
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    
        setCarrinho(carrinho);
    
        if (carrinho.filmes.length == []) {
            excluirCarrinho()
        }

        carrinhoExists(GlobalDispatch)
    };


    const criarAluguel = async (carrinho) => {
        let dataDevolucao = new Date();
        dataDevolucao.setMonth(dataDevolucao.getMonth() + 1);
        const dataDevolucaoFormatada = dataDevolucao.toISOString().slice(0, 10);
        try {
            const aluguelResponse = await fetch('http://127.0.0.1:8000/aluguel/criar_aluguel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cliente: carrinho.dono_carrinho.id,
                    data_aluguel: new Date().toISOString().slice(0, 10),
                    vencimento: dataDevolucaoFormatada,
                    status: 'P',
                    filmes: carrinho.filmes
                }),
            });
    
            if (!aluguelResponse.ok) {
                throw new Error('Erro ao criar o aluguel.');
            }
        
            SetMessages(GlobalDispatch, {messages: 'Aluguel criado com sucesso!', messageType: 'success'})
            sessionStorage.clear()
            navigate('/')
        } catch (error) {
            SetMessages(GlobalDispatch, {messages: 'Erro ao criar o carrinho!', messageType: 'error'})
            console.error('Erro ao criar o aluguel:', error);
        }
    };
    
    return (
        <>
        {
            carrinho.dono_carrinho && 
            <div className="box cliente-wrapper mb-3">
                <h3 className="text-center cliente-title mb-1">Informações do Cliente</h3>
                <p><strong>ID:</strong> {carrinho.dono_carrinho.id}</p>
                <div className='row'>
                    <p className='col'><strong>Nome:</strong> {carrinho.dono_carrinho.nome}</p>
                    <p className='col'><strong>Sobrenome:</strong> {carrinho.dono_carrinho.sobrenome}</p>
                </div>
                
                <div className='row'>
                    <p className='col'><strong>Username:</strong> {carrinho.dono_carrinho.username}</p>
                    <p className='col'><strong>CPF:</strong> {carrinho.dono_carrinho.cpf}</p>
                </div>

                <div className='row'>
                    <p className='col'><strong>Email:</strong> {carrinho.dono_carrinho.email}</p>
                    <p className='col'><strong>Telefone:</strong> {carrinho.dono_carrinho.telefone}</p>
                </div>
                
                
            </div>

        }

        <div className="box carrinho-wrapper">
            
            <Tabela 
                thead={<tr>
                    <th>Capa</th>
                    <th>Título</th>
                    <th>Sinopse</th>
                    <th>Quantidade</th>
                    <th>Excluir</th>
                </tr>}

                tbody={carrinho.filmes.map((filme) => (
                    <tr id={filme.id} key={filme.id}>
                        <td><img src={`http://localhost:8000${filme.capa}`} alt={filme.titulo} /></td>
                        <td>{filme.titulo}</td>
                        <td>{filme.sinopse}</td>
                        <td>{filme.quantidade}</td>
                        <td><i onClick={(e) => excluirItem(e.target.closest('tr'))} className="bi bi-x-circle-fill"></i></td>
                    </tr>
                    ))
                }/>

                
            <div className="buttons-wrapper d-flex justify-content-between">
                { carrinho.dono_carrinho ?
                    <Link to={'/clientes'} className='btn btn-secondary'>Trocar Proprietario</Link>: <Link to={'/clientes'} className='btn btn-secondary'>Selecionar Propietario</Link>
                }
                
                {   
                    carrinho.dono_carrinho &&
                    <button onClick={() => criarAluguel(carrinho)} className='btn btn-primary'>Realizar Emprestimo</button>
                }
               
            </div>
        </div>
        </>
    );
};