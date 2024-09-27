export const reducer = (state, action, payload) => {
    switch(action.type){
        case 'carrinhoExists': {
            return {...state, carrinho: true }
        }

        case 'carrinhoNotexists': {
            return {...state, carrinho: false }
        }

        case 'setMessages': {
            return {...state, messages: action.payload.messages, messageType: action.payload.messageType }
        }

        case 'setMessagesNull': {
            return {...state, messages: null, messageType: null }
        }

        default:{
            return {...state}
        }
    }
}