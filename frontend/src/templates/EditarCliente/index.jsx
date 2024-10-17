import { useContext, useEffect, useState } from 'react'
import './styles.css'
import { SetMessages } from '../../context/GlobalContext/action'
import { GlobalContext } from '../../context/GlobalContext'
import { useNavigate, useParams } from 'react-router-dom'
import { FormCliente } from '../../components/FormCliente'


export const EditarCliente = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const {GlobalDispatch} = context

    const [usuario, setUsuario] = useState()
    const [nome, setNome] = useState()
    const [sobrenome, setSobrenome] = useState()
    const [email, setEmail] = useState()
    const [cpf, setCPF] = useState()
    const [fone, setFone] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const Data = {
            id: id,
            username: usuario,
            first_name: nome,
            last_name: sobrenome,
            email: email,
            cpf: cpf,
            telefone: fone
        };

        try { 
        const usuario_response = await fetch(`http://127.0.0.1:8000/cliente/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Data),
        })

        if (usuario_response.ok){
            const usuario_jsonResponse = await usuario_response.json()
            SetMessages(GlobalDispatch,{messages:'Cliente atualizado com sucesso.', messageType: 'success'});
            navigate('/')}

        else{
            const errorResponse = await usuario_response.json();
            console.error("Erro na resposta do servidor: ", errorResponse);
            SetMessages(GlobalDispatch,{messages:'Erro ao atualizar o usuario.', messageType: 'error'});
          }}

        catch(err) {
            SetMessages(GlobalDispatch,{messages:'Erro tentar criar o Cliente.', messageType: 'error'});
          }}
    

        useEffect(() => {

            const FetchDados = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/cliente/detail/${id}`);
                    if (!response.ok) {
                        throw new Error('Erro na resposta da API');
                    }
                    const data = await response.json();
                    setUsuario(data.usuario.username)
                    setNome(data.usuario.first_name)
                    setSobrenome(data.usuario.last_name)
                    setCPF(data.cpf)
                    setEmail(data.usuario.email)
                    setFone(data.telefone)
                } catch (error) {
                    console.error('Erro ao buscar dados:', error);
                }
            };

            FetchDados();
        }, [])

    return(
        <div className="box-form my-5">
            <h2 className="text-center mb-4">Adicionar Cliente</h2>
    
            <FormCliente
            buttonText={"Adicionar Cliente"}
            submit={handleSubmit}>
                <div className="form-group mb-2">
                    <label htmlFor="usuario" className="form-label">Usuario:</label>
                    <input className="form-control" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} id="usuario"/>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input className="form-control" type="text" value={nome} onChange={(e) => setNome(e.target.value)} id="nome"/>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                    <input className="form-control" type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} id="sobrenome"/>
                </div>

                <div className="row mb-2">
                    <div className="form-group col-5">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email"/>
                    </div>

                    <div className="form-group col-3">
                        <label htmlFor="cpf" className="form-label">Cpf:</label>
                        <input maxLength={11} className="form-control" type="text" value={cpf} onChange={(e) => setCPF(e.target.value)} id="cpf"/>
                    </div>

                    <div className="form-group col-4">
                        <label htmlFor="telefone" className="form-label">Telefone:</label>
                        <input className="form-control" type="text" value={fone} onChange={(e) => setFone(e.target.value)} id="telefone"/>
                    </div>
                </div>
            </FormCliente>
        </div>
        )}