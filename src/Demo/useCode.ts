import {stringStats, TreeCode, type PrimedStats, type StringStats} from '#model'
import {linesSelector, useAppSelector} from '#store'
import {type Tree} from 'effect-tree'

export interface UseCode extends PrimedStats {
  tree: Tree<number>
  lines: string[]
  stats: StringStats
}

export const useCode = (): UseCode => {
  const [tree, primed, lines] = [
    useAppSelector(TreeCode.selectTree),
    useAppSelector(TreeCode.selectStats),
    useAppSelector(linesSelector),
  ]

  const {nodeCount, ...stats} = primed

  return {...stats, tree, lines, nodeCount, stats: stringStats(primed)}
}
