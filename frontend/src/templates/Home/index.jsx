import { useEffect, useState } from 'react';
import './styles.css';
import { Card } from '../../components/CardGrid/Card';
import { CardGrid } from '../../components/CardGrid';

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/filme');
        const data = await response.json();
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchFilmes();
  }, []);

  return (
    <CardGrid>
      {filmes.length > 0 ? (
        filmes.map(filme => (
          <Card 
          titulo={filme.titulo}
          sinopse = {filme.sinopse}
          capa = {filme.capa}
          id = {filme.id}
          slug = {filme.slug} 
          />
        ))
      ) : (
        <p>Carregando filmes...</p>
      )}
    </CardGrid>
  );
}

export default Home;
