import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './styles.css';
import { useEffect } from 'react';

export const Search = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const removeQueryParam = (param) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete(param);
    
        navigate({
          pathname: location.pathname,
          search: searchParams.toString(),
        });
      };

    const handleSearch = (event) => {
        event.preventDefault();
        const search = event.target.querySelector("#search").value;
        if (search === ''){
            removeQueryParam("search")
        }
        else{
            setSearchParams({ search: search });
        }
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
