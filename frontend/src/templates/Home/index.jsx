import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import para pegar os query params
import './styles.css';
import { Card } from '../../components/CardGrid/Card';
import { CardGrid } from '../../components/CardGrid';

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [searchParams] = useSearchParams(); // Hook para acessar os parâmetros da URL

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        // Pegando o valor de "search" da URL
        const searchQuery = searchParams.get('search');
        const url = searchQuery
          ? `http://127.0.0.1:8000/filme/search?search=${searchQuery}` // URL com o filtro de busca
          : 'http://127.0.0.1:8000/filme'; // URL sem filtro

        const response = await fetch(url);
        const data = await response.json();
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchFilmes(); // Chama a função sempre que o searchParams mudar
  }, [searchParams]); // O useEffect será executado sempre que o searchParams mudar

  return (
    <CardGrid>
      {filmes.length > 0 ? (
        filmes.map(filme => (
          <Card 
            key={filme.id}
            titulo={filme.titulo}
            sinopse={filme.sinopse}
            capa={filme.capa}
            id={filme.id}
            slug={filme.slug}
          />
        ))
      ) : (
        <p>Carregando filmes...</p>
      )}
    </CardGrid>
  );
}

export default Home;
