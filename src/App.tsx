import {PruferGlyphs} from '#demos'
import {Array} from '#util'

export const App = () => {
  return (
    <PruferGlyphs
      initial={() => ({
        code: Array.replicate(9)(11),
        format: 'lowerAscii',
        theme: 'thin',
      })}
    />
  )
}
