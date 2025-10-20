import {type LazyArg} from '#Function'
import {
  drawRomanTree,
  primeStats,
  type DecodeRequest,
  type DecodeResponse,
  type NumericFormat,
} from '#tree'
import type {VoidAction} from '#types'
import {Array, Record, Tuple, type Dispatcher} from '#util'
import {Codec, type Draw} from 'effect-tree'
import {useMemo, useState} from 'react'
import {actionMap} from './Toolbar/actions'
import {type ModifyAction, type PrimedActionMap} from './Toolbar/types'

export interface UsePruferCode extends DecodeResponse {
  actions: PrimedActionMap
  setFormat: Dispatcher<NumericFormat>
  setTheme: Dispatcher<Draw.ThemeName>
}

export const usePruferCode = (
  initial: LazyArg<DecodeRequest> = () => ({
    code: [1, 2, 3, 4, 3, 2, 1],
    format: 'decimal',
    theme: 'thin',
  }),
): UsePruferCode => {
  const [code, setCode] = useState(() => initial().code)
  const [format, setFormat] = useState(() => initial().format)
  const [theme, setTheme] = useState(() => initial().theme)

  const tree = Codec.Prufer.decode(code)
  const lines = drawRomanTree(tree, format, theme)
  const stats = primeStats(code, tree)

  const actions = useMemo(() => makeActionMap(code, setCode), [code])

  return {
    code,
    format,
    theme,
    tree,
    lines,
    stats,
    actions,
    setFormat,
    setTheme,
  }
}

// Prime all actions and predicates with current code and dispatcher.
const makeActionMap = (
  code: number[],
  setCode: Dispatcher<number[]>,
): PrimedActionMap => Record.map(actionMap, Array.map(action(code, setCode)))

const action =
  (code: number[], setCode: Dispatcher<number[]>) =>
  ({apply, disable, ...action}: ModifyAction): VoidAction => ({
    ...action,
    apply: () => {
      setCode(apply)
    },
    disable:
      disable === undefined
        ? undefined
        : Tuple.mapFirst(disable, predicate => predicate(code)),
  })
