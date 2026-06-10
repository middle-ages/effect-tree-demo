import {drawRomanTree, type NumericFormat} from '#tree'
import {primeStats, type PrimedStats} from '#tree'
import {Array, K, type StateEffect} from '#util'
import {Codec, type Draw, type Tree} from 'effect-tree'
import {useCallback, useMemo, useState} from 'react'
import type {CodeStateEffect} from './types.js'
import {useTreeStyle} from './useTreeStyle.js'

export interface UseCode
  extends PrimedStats,
    CodeStateEffect,
    StateEffect<'format', NumericFormat>,
    StateEffect<'theme', Draw.ThemeName> {
  tree: Tree<number>
  lines: string[]
  setDigit: (digit: number, index: number) => void
}

export const useCode = (
  initialCode: number[],
  initialFormat: NumericFormat,
  initialTheme: Draw.ThemeName,
): UseCode => {
  const [code, setCode] = useState(initialCode)
  const tree = useMemo(() => Codec.Prufer.decode(code), [code])
  const {nodeCount, ...stats} = primeStats(code, tree)

  const {format, theme, ...styleSetters} = useTreeStyle({
    format: initialFormat,
    theme: initialTheme,
  })

  const lines = useMemo(
    () => drawRomanTree(tree, format, theme),
    [format, theme, tree],
  )

  return {
    code,
    tree,
    lines,
    nodeCount,
    format,
    theme,
    ...stats,
    ...styleSetters,

    setCode,
    setDigit: useCallback((digit: number, index: number): void => {
      setCode(Array.modify(index, K(digit)))
    }, []),
  }
}
