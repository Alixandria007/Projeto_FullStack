import { Link } from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';

export const Search = () => {
    const context = useContext(GlobalContext)
    const {GlobalState} = context

    return (
        <div className="d-flex" role="search">
            {GlobalState.carrinho && <Link to={'carrinho'}><i class="bi bi-cart-fill text-white carrinho"></i></Link>}
 
            <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn  btn-outline-light" type="submit">Search</button>
        </div>
    )
}