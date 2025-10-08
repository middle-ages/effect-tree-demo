import {square} from '#Pair'
import {pipe} from '#util'
import {Codec} from 'effect-tree'
import {stats, type Stats} from '../demos/PruferGlyphs/StatsView/stats'

export const stringToCode = (code: string): number[] =>
  // eslint-disable-next-line sonarjs/slow-regex
  code.split(/\s*,\s*/).map(s => Number.parseInt(s))

export const fromCode = (code: string): Stats =>
  code.length === 0
    ? stats([], Codec.Prufer.decode([]))
    : pipe(
        code,
        stringToCode,
        square.mapSecond(Codec.Prufer.decode),
        stats.tupled,
      )
