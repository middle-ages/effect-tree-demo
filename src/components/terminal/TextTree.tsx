import {pipe, Array} from 'effect'
import {drawTree, type Tree as TreeModel} from 'effect-tree'
import {prefix} from '#String'
import {useMemo} from 'react'
import {Text} from './Text'
import type {StyledProps} from '#util'

interface Props extends StyledProps {
  tree: TreeModel<string>
}

export const TextTree = ({tree, ...props}: Props) => {
  const lines: Array.NonEmptyArray<string> = useMemo(() => {
    const [head, ...tail] = drawTree(tree)
    return ['─' + head, ...pipe(tail, Array.map(prefix('\u00a0')))]
  }, [tree])

  return <Text {...{lines}} {...props} />
}
