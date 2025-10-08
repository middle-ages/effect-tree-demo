import {PruferGlyphs} from '#demos'
import {Array, K} from '#util'

export const App = () => {
  return <PruferGlyphs initialCode={K(Array.replicate(1)(2))} />
}
