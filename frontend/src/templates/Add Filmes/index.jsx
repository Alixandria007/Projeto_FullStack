import { useContext, useEffect, useState } from "react"
import { SetMessages } from "../../context/GlobalContext/action";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

export const AddFilmes = () => {
  const navigate = useNavigate()
  const context = useContext(GlobalContext)
  const {GlobalDispatch} = context

  const [titulo, setTitulo] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [anoLancamento, setAnoLancamento] = useState(1900);
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [autor, setAutor] = useState(null);
  const [classificacaoEtaria, setClassificacaoEtaria] = useState('10');
  const [capa, setCapa] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [publico, setPublico] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriaResponse = await fetch('http://127.0.0.1:8000/filme/categoria');
        const autorResponse = await fetch('http://127.0.0.1:8000/filme/autor');
        const categoriasData = await categoriaResponse.json();
        const autoresData = await autorResponse.json();

        setCategorias(categoriasData);
        setAutores(autoresData);
      } catch (err) {
        SetMessages(GlobalDispatch,{messages:'Erro ao buscar categorias e autores.', messageTypes: 'error'});
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('sinopse', sinopse);
    formData.append('ano_lancamento', anoLancamento);
    formData.append('categoria', JSON.stringify(selectedCategorias));
    formData.append('autor', autor);
    formData.append('classificacao_etaria', classificacaoEtaria);
    formData.append('quantidade', quantidade);
    formData.append('publico', publico);
    formData.append('capa', capa);

    try {
      const response = await fetch('http://127.0.0.1:8000/filme/', {
        method: 'POST',
        body: formData,
      })

      if (response.ok){
        const jsonResponse = await response.json();
        SetMessages(GlobalDispatch,{messages:'Filme adicionado com sucesso.', messageType: 'success'});
        navigate('/')}
        
        else{
        const errorResponse = await response.json();
        console.error("Erro na resposta do servidor: ", errorResponse);
        SetMessages(GlobalDispatch,{messages:'Erro ao adicionar filme.', messageType: 'error'});
      }
      }

      
     catch (err) {
      SetMessages(GlobalDispatch,{messages:'Erro ao adicionar filme.', messageType: 'error'});
    }
  };

  return (
      <div className="box my-5">
        <h2 className="text-center mb-4">Adicionar Filme</h2>
  
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
  
          <div className="form-group">
            <label htmlFor="sinopse">Sinopse:</label>
            <textarea
              id="sinopse"
              className="form-control"
              value={sinopse}
              onChange={(e) => setSinopse(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
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
  
          <div className="form-group">
            <label htmlFor="categorias">Categoria:</label>
            <select
              id="categorias"
              className="form-control"
              multiple
              value={selectedCategorias}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.value).map(option => option.value);
                setSelectedCategorias(selectedOptions);
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
  
          <div className="form-group">
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
                  {autor.nome}
                </option>
              ))}
            </select>
          </div> 
  
          <div className="form-group">
            <label htmlFor="classificacaoEtaria">Classificação Etária:</label>
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
  
          <div className="form-group">
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
  
          <div className="form-check">
            <input
              type="checkbox"
              id="publico"
              className="form-check-input"
              checked={publico}
              onChange={(e) => setPublico(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="publico">Público</label>
          </div>
  
          <div className="form-group mt-3">
            <label htmlFor="capa">Capa:</label>
            <input
              type="file"
              id="capa"
              className="form-control-file"
              onChange={(e) => {
                setCapa(e.target.files[0])}}
            />
          </div>
  
          <button type="submit" className="btn btn-primary btn-block mt-4">
            anailson
          </button>
        </form>
      </div>
  );
};