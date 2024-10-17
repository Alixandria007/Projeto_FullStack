import { useState } from "react"

export const FormCliente = ({
    children,
    buttonText,
    submit}) => {
    
    return(
        <form onSubmit={submit}>

                {children}

                <button type="submit" className="btn btn-primary btn-block mt-4">
                    {buttonText}
                </button>
            </form>
    )
}