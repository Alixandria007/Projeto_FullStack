import { useEffect, useState } from "react"
import { Tabela } from "../../components/Tabela"
import { useParams } from "react-router-dom"

export const DetalhesAluguel = () => {
    const {id} = useParams()
    const [itens, setItens] = useState()

    useEffect(() => {
        const fetctData = async () => {
            try{
            const response = await fetch(`http://127.0.0.1:8000/aluguel/detalhes/${id}`, {
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

        fetctData()

    }, [])

    if (!itens) {
        return <div>Carregando...</div>;
    }

    return(
        <>
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