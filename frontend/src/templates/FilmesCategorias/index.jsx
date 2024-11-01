import { useParams, useSearchParams } from 'react-router-dom';
import './styles.css';
import CardFilmes from '../../components/CardFilmes';

function FilmesCategorias() {
  const {id} = useParams()
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")
  
  return(
    <CardFilmes
    urlNormal={`http://127.0.0.1:8000/filme/categoria/${id}/filmes`}
    urlSearch={`http://127.0.0.1:8000/filme/categoria/${id}/filmes?search=${searchQuery}`}
    />
  )
}

export default FilmesCategorias;
