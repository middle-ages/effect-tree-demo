import type {StyledProps} from '#util'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {Codec, type Tree} from 'effect-tree'
import {useEffect, useMemo, useState} from 'react'
import {GraphView} from './GraphView'

interface Props extends StyledProps {
  tree: Tree<string> | Tree<number>
}

export const TreeGraphView = ({tree, className, style}: Props) => {
  const [graphviz, setGraphviz] = useState<Graphviz>()
  useEffect(() => {
    if (graphviz === undefined) {
      Graphviz.load()
        .then(setGraphviz)
        .catch((error: unknown) => {
          throw error
        })
    }
  }, [graphviz, setGraphviz])

  const dot = useMemo(() => Codec.treeToGraphViz(tree), [tree])

  return <GraphView {...{style, className, dot}} />
}
