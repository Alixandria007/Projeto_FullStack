import { useParams } from 'react-router-dom';
import './styles.css';
import { useState, useEffect } from 'react';

export const Detalhes = () => {
    const [filme, setFilme] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        const fetchFilme = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/filme/${slug}`);
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
        <div className="detail-grid">
            <div className="detail-img-wrapper">
                {filme.capa ? (
                    <img src={`http://localhost:8000${filme.capa}`} className='detail-img'  alt={filme.titulo} />
                ) : (
                    <p>Sem imagem disponível</p>
                )}
            </div>

            <div className="detail-body">
                <h1>{filme.titulo}</h1>
                <p><strong>Sinopse:</strong> {filme.sinopse}</p>
                <p><strong>Categoria:</strong> {filme.categoria.map((categoria) => categoria.nome).join(",")}</p>
                <p><strong>Autor:</strong> {filme.autor.nome}</p>
                <p><strong>Classificação Etária:</strong> {filme.classificacao_etaria}</p>
            </div>
        </div>
    );
};
