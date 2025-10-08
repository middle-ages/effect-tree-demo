import {pipe, type LazyArg} from '#Function'
import {Record, Tuple} from 'effect'
import {Codec, type Tree} from 'effect-tree'
import {useMemo, useState} from 'react'
import type {Dispatcher} from '#util'
import {actionMap, type PrimedModifyActionMap} from './actions'
import {type Stats, stats} from './StatsView/stats'

const {Prufer} = Codec

export interface UsePruferCode {
  code: number[]
  tree: Tree<number>
  modifyActions: PrimedModifyActionMap
  stats: Stats
}

export const usePruferCode = (
  initialCode: LazyArg<number[]>,
): UsePruferCode => {
  const [code, setCode] = useState(initialCode)

  const tree: Tree<number> = useMemo(() => Prufer.decode(code), [code])
  const modifyActions = useMemo(() => makeActionMap(code, setCode), [code])

  return {code, tree, modifyActions, stats: stats(code, tree)}
}

// Prime all actions and predicates with current code and dispatcher.
const makeActionMap = (
  code: number[],
  setCode: Dispatcher<number[]>,
): PrimedModifyActionMap =>
  pipe(
    actionMap,
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
