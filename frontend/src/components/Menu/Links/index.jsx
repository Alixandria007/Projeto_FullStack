import { Link } from "react-router-dom"

export const Links = () => {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filmes
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={'/filmes/adicionar/'}>Adicionar</Link></li>
            <li><Link className="dropdown-item" to={'/categorias'}>Categorias</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Clientes
          </a>
          <ul className="dropdown-menu">
          <li><Link className="dropdown-item" to={'/clientes/adicionar/'}>Adicionar</Link></li>
          <li><Link className="dropdown-item" to={'/clientes'}>Consultar</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Alugueis
          </a>
          <ul className="dropdown-menu">
            <li><Link to={'/alugueis'} className="dropdown-item" href="#">Consultar</Link></li>
            <li><Link to={'/alugueis/atrasos'} className="dropdown-item" href="#">Atrasos</Link></li>
          </ul>
        </li>
      </ul>
    )
}