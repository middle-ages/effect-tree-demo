import {store} from '#store'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {Demo} from './src/Demo'

const root = document.querySelector('#root')

if (root !== null) {
  createRoot(root).render(
    <StrictMode>
      <Provider {...{store}}>
        <Demo />
      </Provider>
    </StrictMode>,
  )
}
