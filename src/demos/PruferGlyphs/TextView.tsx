import {prefix} from '#String'
import {TextTree} from '#components'
import {pipe} from 'effect'
import * as Tree from 'effect-tree'
import {formatRoman, MAX_ROMAN, type NumericFormat} from './roman/roman.js'

interface Props {
  tree: Tree.Tree<number>

  // How do we format the labels of the numeric tree we are drawing?
  format: NumericFormat
}

export const TextView = ({tree, format}: Props) => (
  <TextTree
    className="flex-1 overflow-auto textView p-2 pl-1"
    tree={Tree.map(tree, n =>
      pipe(
        n > MAX_ROMAN ? n.toLocaleString() : formatRoman(format)(n),
        prefix(' '),
      ),
    )}
  />
)
