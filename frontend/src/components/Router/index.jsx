import { BrowserRouter } from "react-router-dom"
import { Menu } from "../Menu"
import { MainContent } from "../Main Content"
import { Rotas } from "./Routes"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { Messages } from "../Messages"

export const Router = () =>{
    const context = useContext(GlobalContext)
    const {GlobalState, GlobalDispatch} = context

    return (
    <BrowserRouter>
        
        <Menu/>
        {
            GlobalState.messages && 
            <Messages/>
        }
        <MainContent>
        <Rotas/>
        </MainContent>
        
    </BrowserRouter>
    )}