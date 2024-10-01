export const AddFilmes = () => {

    
    return(
    <div>
      <h2>Adicionar Filme</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sinopse">Sinopse:</label>
          <textarea
            id="sinopse"
            value={sinopse}
            onChange={(e) => setSinopse(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="anoLancamento">Ano de Lançamento:</label>
          <input
            type="number"
            id="anoLancamento"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categorias">Categoria:</label>
          <select
            id="categorias"
            multiple
            value={selectedCategorias}
            onChange={(e) =>
              setSelectedCategorias(
                [...e.target.selectedOptions].map((option) => option.value)
              )
            }
            required
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="autor">Autor:</label>
          <select
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          >
            <option value="">Selecione um autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="classificacaoEtaria">Classificação Etária:</label>
          <select
            id="classificacaoEtaria"
            value={classificacaoEtaria}
            onChange={(e) => setClassificacaoEtaria(e.target.value)}
            required
          >
            <option value="10">+10</option>
            <option value="12">+12</option>
            <option value="14">+14</option>
            <option value="18">+18</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="publico">Público:</label>
          <input
            type="checkbox"
            id="publico"
            checked={publico}
            onChange={(e) => setPublico(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="capa">Capa:</label>
          <input
            type="file"
            id="capa"
            onChange={(e) => setCapa(e.target.files[0])}
          />
        </div>

        <button type="submit">Adicionar Filme</button>
      </form>
    </div>
    )
}