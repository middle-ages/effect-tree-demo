import {pipe, type LazyArg} from '#Function'
import {
  drawRomanTree,
  primeStats,
  type DecodeRequest,
  type DecodeResponse,
  type NumericFormat,
} from '#tree'
import type {Dispatcher} from '#util'
import {Record, Tuple} from 'effect'
import {Codec, type Draw} from 'effect-tree'
import {useMemo, useState} from 'react'
import {modifyActionMap} from './Toolbar/actions'
import {type PrimedModifyActionMap} from './Toolbar/types'

export interface UsePruferCode extends DecodeResponse {
  modifyActions: PrimedModifyActionMap
  setFormat: Dispatcher<NumericFormat>
  setTheme: Dispatcher<Draw.ThemeName>
}

export const usePruferCode = (
  initial: LazyArg<DecodeRequest> = () => ({
    code: [1, 2, 3, 4, 3, 2, 1],
    format: 'lowerAscii',
    theme: 'thin',
  }),
): UsePruferCode => {
  const [code, setCode] = useState(() => initial().code)
  const [format, setFormat] = useState(() => initial().format)
  const [theme, setTheme] = useState(() => initial().theme)

  const tree = Codec.Prufer.decode(code)
  const lines = drawRomanTree(tree, format, theme)
  const stats = primeStats(code, tree)

  const modifyActions = useMemo(() => makeActionMap(code, setCode), [code])

  return {
    code,
    format,
    theme,
    tree,
    lines,
    stats,
    modifyActions,
    setFormat,
    setTheme,
  }
}

// Prime all actions and predicates with current code and dispatcher.
const makeActionMap = (
  code: number[],
  setCode: Dispatcher<number[]>,
): PrimedModifyActionMap =>
  pipe(
    modifyActionMap,
    Record.mapEntries(({apply, disable, ...action}, key) => [
      key,
      {
        ...action,
        apply: () => {
          setCode(apply)
        },
        disable:
          disable === undefined
            ? undefined
            : Tuple.mapFirst(disable, predicate => predicate(code)),
      },
    ]),
  )
