import './styles.css';
import {Search} from './Search/index'
import { Links } from './Links';
import { Link } from 'react-router-dom';

export const Menu = () => {
  return (
  <nav className="navbar navbar-expand-lg bg-primary">
    <div className="container-fluid">
      <Link className="navbar-brand text-white" to={'/'}>Locadora</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Links/>
        <Search/>
      </div>
    </div>
  </nav>
  );
}