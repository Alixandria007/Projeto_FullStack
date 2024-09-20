export const Links = () => {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Filmes
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Adicionar</a></li>
            <li><a className="dropdown-item" href="#">Categorias</a></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Clientes
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Adicionar</a></li>
            <li><a className="dropdown-item" href="#">Consultar</a></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle  text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Alugueis
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Consultar</a></li>
            <li><a className="dropdown-item" href="#">Atrasos</a></li>
          </ul>
        </li>
      </ul>
    )
}