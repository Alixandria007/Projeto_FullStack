import { Link, useParams } from 'react-router-dom';
import './styles.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { carrinhoExists, SetMessages } from '../../context/GlobalContext/action';

export const Detalhes = () => {
    const quantidade = useRef()
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context
    const [ filme, setFilme ] = useState(null);
    const { slug } = useParams();

    const Add_Carinho = (filme, quantidade) => {
        let quant = parseInt(quantidade)
        let carrinho = JSON.parse(sessionStorage.getItem('carrinho')) || {
            filmes: [],
            dono_carrinho: null
        };

        const filmeExistente = carrinho.filmes.find(item => item.id === filme.id);

        if (filmeExistente) {
            if (filmeExistente.quantidade + quant > parseInt(filme.quantidade)){
                SetMessages(GlobalDispatch, {messages: 'Não há essa quantidade em estoque!!', messageType: 'warning'} )
                return
            }
            
            filmeExistente.quantidade += quant;
        } 
        
        else {
            const filme_object = {
                id: filme.id,
                titulo: filme.titulo,
                sinopse: filme.sinopse,
                categoria: filme.categoria.map((cat) => cat.nome),
                autor: filme.autor.nome,
                lancamento: filme.ano_lancamento,
                quantidade: quant,
                capa: filme.capa,
                classificacao_etaria: filme.classificacao_etaria,
            }
            
            carrinho.filmes.push(filme_object);
        }

        sessionStorage.setItem('carrinho', JSON.stringify(carrinho));

        SetMessages(GlobalDispatch, {messages: 'Adicionado com sucesso!!', messageType: 'success'} )
        
        carrinhoExists(GlobalDispatch)
    };

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/filme/detail/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFilme(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchFilme();
    }, [slug]);

    if (!filme) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="detail-grid row">
            <div className="detail-img-wrapper col-8">
                {filme.capa ? (
                    <img src={`http://localhost:8000${filme.capa}`} className='detail-img'  alt={filme.titulo} />
                ) : (
                    <p>Sem imagem disponível</p>
                )}
            </div>

            <div className="detail-body col-4">
                <h1 className='datail-title pb-3 text-center'>{filme.titulo}</h1>

                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Sinopse:</strong></h6> 
                    <p className='detail-text'>{filme.sinopse}</p>
                </div>

                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Lançamento:</strong></h6> 
                    <p>{filme.ano_lancamento}</p>
                </div>

                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Categoria:</strong></h6> 
                    <p>{filme.categoria.map((categoria) => categoria.nome).join(",")}</p>
                </div>
                
                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Autor:</strong></h6> 
                    <p>{filme.autor.nome}</p>
                </div>
                
                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Classificação Etária:</strong> </h6> 
                    <p>+{filme.classificacao_etaria}</p>
                </div>

                <div className='datail-item pb-2'>
                    <h6 className='detail-label'><strong>Estoque:</strong> </h6> 
                    <p>{filme.quantidade}</p>
                </div>
                
                <div class="pb-4">
                    <label for="quantidade" class="form-label"><strong>Quantidade:</strong></label>
                    <input ref={quantidade} type="number" min='1' value={'1'} max={filme.quantidade} class="form-quant form-control" id="quantidade" placeholder=""/>
                </div>

                <div className="d-flex gap-4">
                    <Link to={`/edit/${slug}`} type="button" className='btn btn-secondary'>Editar Filme</Link>
                    <button onClick={() => Add_Carinho(filme, quantidade.current.value)} type="button" className='btn btn-primary'>Adicionar ao carrinho</button>
                </div>
               
            </div>
        </div>
    );
};
