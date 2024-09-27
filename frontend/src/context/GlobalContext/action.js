export const carrinhoExists = (dispatch) => {
    const carrinho = sessionStorage.getItem('carrinho')

    if (carrinho !== null) {
        dispatch({type: 'carrinhoExists'})
    }

    else{
        dispatch({type: 'carrinhoNotexists'})
    }
}

export const SetMessages = (dispatch, payload) => {
    dispatch({type: 'setMessages', payload: payload})

    setTimeout(() => {
        dispatch({type: 'setMessagesNull'})
    }, 2500);

    
}