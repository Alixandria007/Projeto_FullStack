import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/CardGrid/Card';
import { CardGrid } from '../../components/CardGrid';
import Pagination from '../../components/Pagination';

function CardFilmes({urlNormal, urlSearch}) {
  const [filmes, setFilmes] = useState([]);
  const [searchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const searchQuery = searchParams.get('search');
        const url = searchQuery
          ? urlSearch
          : urlNormal;

        const response = await fetch(url);
        const data = await response.json();
        setFilmes(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchFilmes();
  }, [searchParams]); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFilmes = filmes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <CardGrid>
        {filmes.length > 0 ? (
          currentFilmes.map(filme => (
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
          <p>Filmes não encontrados...</p>
        )}
      </CardGrid>

      
      <div className='pagination d-flex justify-content-center mt-3'>
        <Pagination
                itemsPerPage={10}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                data={filmes}
              />
      </div>
      
    </>
    
  );
}

export default CardFilmes;
