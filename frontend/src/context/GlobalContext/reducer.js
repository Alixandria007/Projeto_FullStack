export const reducer = (state, action, payload) => {
    switch(action.type){
        case 'carrinhoExists': {
            console.log(state.carrinho)
            return {...state, carrinho: true }
        }

        case 'carrinhoNotexists': {
            console.log(state.carrinho)
            return {...state, carrinho: false }
        }

        default:{
            return {...state}
        }
    }
}