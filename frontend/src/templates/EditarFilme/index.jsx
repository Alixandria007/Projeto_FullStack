import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { SetMessages } from '../../context/GlobalContext/action';
import { GlobalContext } from '../../context/GlobalContext';
import { ConfirmScreen } from '../../components/ConfirmScreen';

export const EditarFilme = () => {
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context
    const navigate = useNavigate();
    const [overlay, setOverlay] = useState(false)

    const [filme, setFilme] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [autor, setAutor] = useState('');
    const [autores, setAutores] = useState([]);
    const [classificacaoEtaria, setClassificacaoEtaria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [capa, setCapa] = useState(null);
    const { slug } = useParams();
    const [imagem, setImagem] = useState(null);
    

    useEffect(() => {
        const fetchFilmeData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/filme/detail/${slug}/`);
                const data = await response.json();
                setFilme(data);
                setTitulo(data.titulo);
                setSinopse(data.sinopse);
                setAnoLancamento(data.ano_lancamento);
                setSelectedCategorias(data.categoria.map((categoria) => categoria.id));
                setAutor(data.autor.id);
                setClassificacaoEtaria(data.classificacao_etaria);
                setCapa(data.capa)
                setImagem(data.capa)
                setQuantidade(data.quantidade);
            } catch (error) {
                console.error('Erro ao carregar os dados do filme:', error);
            }
        };

        const fetchData = async () => {
            try {
                const categoriaResponse = await fetch('http://127.0.0.1:8000/filme/categoria');
                const autorResponse = await fetch('http://127.0.0.1:8000/filme/autor');
                const categoriasData = await categoriaResponse.json();
                const autoresData = await autorResponse.json();

                setCategorias(categoriasData);
                setAutores(autoresData);
            } catch (err) {
                console.error('Erro ao buscar categorias e autores:', err);
            }
        };
        fetchData();
        fetchFilmeData();
    }, [slug]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (titulo) formData.append('titulo', titulo);
        if (sinopse) formData.append('sinopse', sinopse);
        if (anoLancamento) formData.append('anoLancamento', anoLancamento);
        selectedCategorias.forEach((cat) => formData.append('categorias', cat));
        if (autor) formData.append('autor', autor);
        if (classificacaoEtaria) formData.append('classificacaoEtaria', classificacaoEtaria);
        if (quantidade) formData.append('quantidade', quantidade);
        if (capa) formData.append('capa', capa);

        try {
            const response = await fetch(`http://127.0.0.1:8000/filme/detail/edit/${slug}/`, {
                method: 'PATCH',
                body: formData,
            });
            if (response.ok) {
                navigate('/');
            } else {
                console.error('Erro ao editar o filme');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleDelete = async () => {
      try{
        const response = await fetch(`http://127.0.0.1:8000/filme/detail/delete/${slug}/`,{
          method: 'DELETE'
        })

        if (response.ok){
          SetMessages(GlobalDispatch,{'messages': 'Filme Deletado com sucesso!', 'messageType': 'success'})
          navigate('/')
        }

        else{
          SetMessages(GlobalDispatch,{'messages': 'Error ao tentar deletar o filme!', 'messageType': 'error'})
        }
      }
      catch{
          SetMessages(GlobalDispatch,{'messages': 'Error ao tentar deletar o filme!', 'messageType': 'error'})
      }
    }

    const openOverlay = () => setOverlay(true);
    const closeOverlay = () => setOverlay(false);


    return(
    <div className="box-form my-5">
        <h2 className="text-center mb-4">Editar Filme</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group mb-2">
            <label htmlFor="sinopse">Sinopse:</label>
            <textarea
              id="sinopse"
              className="form-control"
              value={sinopse}
              onChange={(e) => setSinopse(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group mb-2">
            <label htmlFor="anoLancamento">Ano de Lançamento:</label>
            <input
              type="number"
              id="anoLancamento"
              className="form-control"
              value={anoLancamento}
              onChange={(e) => setAnoLancamento(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group mb-2">
            <label htmlFor="categorias">Categoria:</label>
            <select
              id="categorias"
              className="form-control"
              multiple
              value={selectedCategorias}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions);
                const values = selectedOptions.map(option => parseInt(option.value));
                setSelectedCategorias(values); 
                console.log(selectedCategorias)
              }}
              required
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="row">

            <div className="form-group col-4">
              <label htmlFor="autor">Autor:</label>
              <select
                id="autor"
                className="form-control"
                value={autor}
                onChange={(e) => setAutor(parseInt(e.target.value))}
                required
              >
                <option value="">Selecione um autor</option>
                {autores.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {filme.autor.nome}
                  </option>
                ))}
              </select>
            </div> 
          
          
            <div className="form-group col-4">
              <label htmlFor="classificacaoEtaria">Classificação:</label>
              <select
                id="classificacaoEtaria"
                className="form-control"
                value={classificacaoEtaria}
                onChange={(e) => setClassificacaoEtaria(e.target.value)}
                required
              >
                <option value="10">+10</option>
                <option value="12">+12</option>
                <option value="14">+14</option>
                <option value="18">+18</option>
              </select>
            </div>
    
            <div className="form-group col-4">
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                type="number"
                id="quantidade"
                className="form-control"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
            </div>
          </div>

            <div className="form-group">
              <label htmlFor="capa">Capa:</label>
              <div className="">
                {imagem ? (
                    <img src={`http://localhost:8000${imagem}`} className='img'  alt={titulo} />
                ) : (
                    <p>Sem imagem</p>
                )}
            </div>

              <input
                type="file"
                id="capa"
                className="form-control"
                
                onChange={(e) => {
                  setCapa(e.target.files[0])}}
              />
            </div>

            
          <div className="d-flex justify-content-between">
            <button type="button" onClick={openOverlay} className="btn btn-danger btn-block mt-4">
              Deletar Filme
            </button>

            <ConfirmScreen
            isOpen={overlay}
            onClose={closeOverlay}
            onConfirm={handleDelete}
            title={titulo}
          />

            <button type="submit" className="btn btn-primary btn-block mt-4">
              Editar Filme
            </button>
          </div>
          
        </form>
      </div>
    )
}