import type {StyledProps} from '#util'
import {Codec, type Tree} from 'effect-tree'
import {useMemo} from 'react'
import {GraphView} from '#GraphView'

interface Props extends StyledProps {
  tree: Tree<string> | Tree<number>
}

export const TreeGraphView = ({tree, className, style}: Props) => {
  const dot = useMemo(() => Codec.treeToGraphViz(tree), [tree])
  return <GraphView {...{style, className, dot}} />
}
