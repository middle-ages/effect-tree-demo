import {Array} from '#util'

export interface ControlDefinition {
  control: {
    type: 'select'
  }
  options: readonly string[]
}

export const disable = <const Names extends readonly string[]>(
  ...names: Names
) =>
  Object.fromEntries(
    Array.map(
      [
        'id',
        'onClick',
        'onChange',
        'children',
        'className',
        'options',
        ...names,
      ],
      name => [name, {table: {disable: true}}] as const,
    ),
  ) as {
    [Name in Names[number] | 'children' | 'className' | 'style']: {
      table: {disable: true}
    }
  }
