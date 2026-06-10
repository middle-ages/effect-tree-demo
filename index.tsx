import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Demo} from './src/Demo'
import {bootPool} from '#store'

bootPool()

const root = document.querySelector('#root')

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <Demo />
    </StrictMode>,
  )
}
