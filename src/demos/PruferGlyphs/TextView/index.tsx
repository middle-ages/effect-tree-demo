import {prefix} from '#String'
import {TextTree} from '#components'
import * as Tree from 'effect-tree'
import {MAX_ROMAN, toRoman} from './roman.js'
import {pipe} from 'effect'

interface Props {
  tree: Tree.Tree<number>
}

export const TextView = ({tree}: Props) => (
  <TextTree
    className="flex-1 overflow-auto textView p-2 pl-1"
    tree={Tree.map(tree, n =>
      pipe(
        n > MAX_ROMAN ? n.toLocaleString() : toRoman.lowerAscii(n),
        prefix(' '),
      ),
    )}
  />
)
