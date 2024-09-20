export const carrinhoExists = (dispatch) => {
    const carrinho = sessionStorage.getItem('carrinho')

    if (carrinho !== null) {
        dispatch({type: 'carrinhoExists'})
    }

    else{
        dispatch({type: 'carrinhoNotexists'})
    }
}