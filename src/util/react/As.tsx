import type {HTMLElementType} from 'react'
import type {HasElement, StyledPropsWithChildren} from './props.js'

export const As = <Tag extends HTMLElementType>({
  as: As,
  attributes = {},
  dataset = {},
  children,
  ...props
}: HasElement<Tag> & StyledPropsWithChildren) => {
  // Casting to the correct type, I.E: "JSX.IntrinsicElements[Tag]" make
  // Typescript croak about an oversized union.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const all = {...attributes, ...dataset, ...props} as any
  return <As {...all}>{children}</As>
}
