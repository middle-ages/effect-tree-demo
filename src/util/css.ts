import type {CSSProperties} from 'react'
import {reduce} from './Array'
import {pipe} from './Function'
import {singleton, toEntries} from './Record'

export const px = (x: number): string => `${x.toFixed(2)}px`,
  ch = (x: number): string => `${x.toFixed(2)}ch`,
  rch = (x: number): string => `${x.toFixed(2)}rch`,
  em = (x: number): string => `${x.toFixed(3)}em`,
  rem = (x: number): string => `${x.toFixed(3)}rem`,
  per = (x: number): string => `${x.toFixed(0)}%`,
  deg = (x: number): string => `${x.toFixed(0)}deg`,
  turn = (x: number): string => `${x.toFixed(2)}turn`,
  ms = (x: number): string => `${x.toFixed(0)}ms`,
  cqw = (x: number): string => `${x.toFixed(3)}cqw`

export const setVar = (name: string, value: string) =>
  singleton(`--${name}`, value) as CSSProperties

export const setVars = (vars: Record<string, string | number>): CSSProperties =>
  pipe(
    vars,
    toEntries,
    reduce(
      {},
      (previous: CSSProperties, [name, value]: [string, string | number]) => ({
        ...previous,
        ...setVar(name, typeof value === 'number' ? value.toFixed(3) : value),
      }),
    ),
  )
