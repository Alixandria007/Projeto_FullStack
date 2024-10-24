import { Link, useSearchParams } from 'react-router-dom';
import './styles.css';
import { useEffect } from 'react';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const searchFilmes = async (search) => {
        const response = await fetch(`http://127.0.0.1:8000/filme/search?search=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Filmes encontrados:", data);
        } else {
            console.error("Erro ao buscar filmes");
        }
    };

    useEffect(() => {
        const searchTerm = searchParams.get('search');
        if (searchTerm) {
            searchFilmes(searchTerm);
        }
    }, [searchParams]);

    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.querySelector("#search").value;
        setSearchParams({ search: search });
    };

    return (
        <div className="d-flex" role="search">
            {sessionStorage.getItem('carrinho') && <Link to={'carrinho'}><i className="bi bi-cart-fill text-white carrinho"></i></Link>}

            <form className='d-flex' onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" id="search" aria-label="Search" />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
    );
};
