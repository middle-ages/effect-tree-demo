import {persistor, store} from '#store'
import {Provider} from 'react-redux'
import {Layout} from './Demo/Layout/index'
import {PersistGate} from 'redux-persist/integration/react'

export const Demo = () => (
  <Provider {...{store}}>
    <PersistGate {...{persistor}} loading={<div>Loading saved state...</div>}>
      <Layout />
    </PersistGate>
  </Provider>
)
