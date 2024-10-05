export const AddClientes = () => {

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('Submit')
    }

    return(
        <div className="box-form my-5">
            <h2 className="text-center mb-4">Adicionar Cliente</h2>
    
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="usuario" className="form-label">Usuario:</label>
                    <input className="form-control" type="text" id="usuario"/>
                </div>

                <div className="form-group">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input className="form-control" type="text" id="nome"/>
                </div>

                <div className="form-group">
                    <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                    <input className="form-control" type="text" id="sobrenome"/>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input className="form-control" type="email" id="email"/>
                </div>

                <div className="form-group">
                    <label htmlFor="cpf" className="form-label">Cpf:</label>
                    <input maxLength={11} className="form-control" type="text" id="cpf"/>
                </div>

                <div className="form-group">
                    <label htmlFor="telefone" className="form-label">Telefone:</label>
                    <input className="form-control" type="text" id="telefone"/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                    Adicionar Filme
                </button>
            </form>
        </div>
        );
}