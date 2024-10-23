import { useEffect, useState } from "react"
import { Tabela } from "../../components/Tabela"
import { useParams } from "react-router-dom"

export const DetalhesAluguel = () => {
    const {id} = useParams()
    const [itens, setItens] = useState()
    const [aluguel, setAluguel] = useState()

    useEffect(() => {
        const fetchFilmes = async () => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/aluguel/detalhes/itens/${id}`, {
                method: "GET"
            })
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json()
            setItens(data)
        }
    
        catch (error) {
            console.error('Erro ao buscar dados:', error);
        }}

        const fetchAluguel = async () => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/aluguel/detalhes/${id}`, {
                method: "GET"
            })
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json()
            setAluguel(data)
        }
    
        catch (error) {
            console.error('Erro ao buscar dados:', error);
        }}

        fetchFilmes()
        fetchAluguel()

    }, [])

    if (!itens || !aluguel) {
        return <div>Carregando...</div>;
    }

    return(
        <>
            <div className="box cliente-wrapper mb-3">
            <h3 className="text-center cliente-title mb-3">Informações do Aluguel nº{id}</h3>

            <div className="row">
                <p className="col"><strong>ID do Cliente:</strong> {aluguel.cliente.id}</p>
                <p className="col"><strong>Status:</strong> {aluguel.status}</p>
            </div>

            <div className="row">
                <p className="col"><strong>Username:</strong> {aluguel.cliente.usuario?.username}</p>
                <p className="col"><strong>Nome completo:</strong> {aluguel.cliente.usuario?.first_name} {aluguel.cliente.usuario?.last_name}</p>
            </div>

            <div className="row">
                <p className="col"><strong>Data do Aluguel:</strong> {aluguel.data_aluguel}</p>
                <p className="col"><strong>Data do Vencimento:</strong> {aluguel.vencimento}</p>
            </div>

            
        </div>

            <div className="box carrinho-wrapper">
                
                <Tabela 
                    thead={<tr>
                        <th>Capa</th>
                        <th>Título</th>
                        <th>Sinopse</th>
                        <th>Quantidade</th>
                    </tr>}

                    tbody={itens.map((item) => (
                        <tr id={item.filme.id} key={item.filme.id}>
                            <td><img src={`http://localhost:8000${item.filme.capa}`} alt={item.titulo} /></td>
                            <td>{item.filme.titulo}</td>
                            <td>{item.filme.sinopse}</td>
                            <td>{item.quantidade}</td>
                        </tr>
                        ))
                    }/>
            </div>
        </>
    )
}