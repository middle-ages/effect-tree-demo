import {PruferGlyphs} from '#demos'

export const App = () => {
  return (
    <PruferGlyphs
      initial={() => ({
        code: [11, 12, 9, 11, 9, 4, 4, 1, 5, 10, 3],
        format: 'decimal',
        theme: 'thin',
      })}
    />
  )
}
