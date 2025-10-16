import {square} from '#Pair'
import {primeStats, type PrimedStats} from '#tree'
import {pipe} from '#util'
import {Codec} from 'effect-tree'

export const stringToCode = (code: string): number[] =>
  code === '' ? [] : code.split(/\s*,\s*/).map(s => Number.parseInt(s))

export const fromCode = (code: string): PrimedStats =>
  code.length === 0
    ? primeStats([], Codec.Prufer.decode([]))
    : pipe(
        code,
        stringToCode,
        square.mapSecond(Codec.Prufer.decode),
        primeStats.tupled,
      )
