import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './src/App'

const root = document.querySelector('#root')

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
