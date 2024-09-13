import { Children } from 'react'
import './styles.css'

export const CardGrid = ({children}) => {
    return (
      <div class="grid-container">
        {children}
      </div>
    )
}