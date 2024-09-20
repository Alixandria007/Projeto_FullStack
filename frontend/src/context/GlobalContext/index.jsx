import { createContext, useReducer } from "react"; 
import { reducer } from "./reducer";
import { state } from "./data";

export const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {
    const [GlobalState, GlobalDispatch] = useReducer(reducer, state)

    return(
        <GlobalContext.Provider value={{GlobalState, GlobalDispatch}}>
            {children}
        </GlobalContext.Provider>
    )
}