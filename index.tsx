import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './src/App'
import './src/style.css'

const root = document.querySelector('#root')

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
