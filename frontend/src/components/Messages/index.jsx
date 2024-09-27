import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import './styles.css'

export const Messages = () => {

    const context = useContext(GlobalContext)
    const {GlobalState} = context
    return(
        <div className= {`messages-wrapper ${GlobalState.messageType}`}>
            <p className="message-text">{GlobalState.messages }</p>
        </div>
    )
}