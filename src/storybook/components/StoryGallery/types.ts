import {Array} from '#util'
import type {ReactRenderer} from '@storybook/react-vite'
import type {ComponentAnnotations} from 'storybook/internal/csf'

/**
 * The type of `stories` on import of a stories module on a component of type
 * `FC<Props>`.
 */
export interface Imported<Props extends {} = {}> {
  default: ComponentAnnotations<ReactRenderer, Props>
  __esModule?: boolean
  __namedExportsOrder?: string[]
}

export type Folded<Args extends {}> = {
  [PropName in string & keyof Args]: Array.NonEmptyReadonlyArray<Args[PropName]>
}

export type FoldedEntry<Args extends {}> = {
  [PropName in keyof Args]: [
    PropName & string,
    Array.NonEmptyArray<Args[PropName]>,
  ]
}[keyof Args]
