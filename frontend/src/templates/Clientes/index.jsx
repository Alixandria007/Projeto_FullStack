import { Tabela } from '../../components/Tabela'
import './styles.css'

const Clientes = () => {

    return(
        <Tabela
        thead={
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Fone</th>
                <th>Status</th>
                <th>Ação</th>
            </tr>
        }

        tbody={
            <tr>
                <td>aaaaaaaaa</td>
            </tr>
        }
        />
    )
}