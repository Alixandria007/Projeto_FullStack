import { useState } from 'react'
import './styles.css'

export const Tabela = ({ thead, tbody}) => {
    return(
        <table>
            <thead>
                {thead}
            </thead>

            <tbody>
                {tbody}
            </tbody>
        </table>
    )
}