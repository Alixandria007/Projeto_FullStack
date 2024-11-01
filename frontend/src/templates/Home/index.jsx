import { useSearchParams } from 'react-router-dom';
import './styles.css';
import CardFilmes from '../../components/CardFilmes';

function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")
  
  return(
    <CardFilmes
    urlNormal={'http://127.0.0.1:8000/filme'}
    urlSearch={`http://127.0.0.1:8000/filme/search?search=${searchQuery}`}
    />
  )
}

export default Home;
