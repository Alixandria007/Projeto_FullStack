import { Link } from 'react-router-dom'
import './styles.css'


export const Card = ({titulo, sinopse, capa, id, slug}) => {
    return (
      <div key={id} class="card">
        <img src={`http://localhost:8000${capa}`} className="card-img-top" alt={titulo}/>
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
            <p className="card-text">{sinopse}</p>
          <Link to={`/${slug}`} className="btn btn-primary">Ver Detalhes</Link>
        </div>
      </div>
    )
}