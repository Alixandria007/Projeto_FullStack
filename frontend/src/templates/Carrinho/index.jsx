import { useEffect, useState, useContext } from 'react';
import './styles.css';
import { GlobalContext } from '../../context/GlobalContext';
import { carrinhoExists } from '../../context/GlobalContext/action';
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
            navigate('/')
        }

        carrinhoExists(GlobalDispatch)
    };
    
    return (
        <div className="carrinho-wrapper">
            
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
                <p><strong>Dono do Carrinho:</strong> { carrinho.dono_carrinho ?
                    <p>{carrinho.dono_carrinho.nome}</p>: <button className='btn btn-secondary'>Selecionar Dono do Carrinho</button>
                }</p>
                
               <button className='btn btn-primary button'>Realizar Emprestimo</button>
            </div>
        </div>
    );
};