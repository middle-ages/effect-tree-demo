import {Link} from '#Link'
import type {Types} from 'effect'
import type {ComponentProps} from 'react'
import {CodeEditor} from './CodeEditor.js'

type Props = Types.Simplify<ComponentProps<typeof CodeEditor>>

export const Footer = (props: Props) => (
  <>
    <Link.PruferPaper />
    <CodeEditor {...props} />
  </>
)
