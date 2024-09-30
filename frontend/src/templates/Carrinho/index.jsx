import { useEffect, useState, useContext } from 'react';
import './styles.css';
import { GlobalContext } from '../../context/GlobalContext';
import { carrinhoExists, SetMessages } from '../../context/GlobalContext/action';
import { useNavigate } from 'react-router-dom';
import { Tabela } from '../../components/Tabela';

export const Carrinho = () => {
    const navigate = useNavigate()

    const [carrinho, setCarrinho] = useState(JSON.parse(sessionStorage.getItem('carrinho')) || {
        filmes: [],
        dono_carrinho: null
    })
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context

    const excluirCarrinho = (row) => {
        const id = row.id;
    
        let carrinho = JSON.parse(sessionStorage.getItem('carrinho'));
        let filmes = carrinho.filmes.filter(item => item.id !== parseInt(id))
        carrinho.filmes = filmes
    
        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
    
        setCarrinho(carrinho);
    
        if (carrinho.filmes.length == []) {
            sessionStorage.clear()
            SetMessages(GlobalDispatch, {messages: 'Não há mais itens no carrinho!', messageType: 'error'})
            navigate('/')
        }

        carrinhoExists(GlobalDispatch)
    };
    
    return (
        <>
        {
            carrinho.dono_carrinho && 
            <div className="box cliente-wrapper mb-3">
                <h3 className="text-center cliente-title">Informações do Cliente</h3>
                <p><strong>ID:</strong> {carrinho.dono_carrinho.id}</p>
                <div className='row'>
                    <p className='col'><strong>Nome Completo:</strong> {`${carrinho.dono_carrinho.nome} ${carrinho.dono_carrinho.sobrenome}`}</p>
                    <p className='col'><strong>Username:</strong> {carrinho.dono_carrinho.username}</p>
                </div>
                
                <div className='row'>
                    <p className='col'><strong>CPF:</strong> {carrinho.dono_carrinho.cpf}</p>
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
                        <td><i onClick={(e) => excluirCarrinho(e.target.closest('tr'))} className="bi bi-x-circle-fill"></i></td>
                    </tr>
                    ))
                }/>

                
            <div className="buttons-wrapper d-flex justify-content-between">
                { carrinho.dono_carrinho ?
                    <button className='btn btn-secondary'>Trocar Proprietario</button>: <button className='btn btn-secondary'>Selecionar Propietario</button>
                }
                
               <button className='btn btn-primary'>Realizar Emprestimo</button>
            </div>
        </div>
        </>
    );
};