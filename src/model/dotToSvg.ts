import {unlines, unwords} from '#String'
import {px} from '#Css'
import {K} from '#Function'
import {SizePx} from '#react/size'
import {Graphviz} from '@hpcc-js/wasm-graphviz'

const nodeSizeInches = 1 / 16
const levelHeightInches = 1 / 2
const arrowSizeInches = 0

const sizeRe = /width="(?<w>\d+)pt" height="(?<h>\d+)pt"/

export interface DotToSvg {
  svg: string
  requiredPx: SizePx
  isOverflowX: boolean
}

export const dotToSvg =
  (graphviz: Graphviz) =>
  (dot: string, {widthPx: availableWidthPx}: SizePx): DotToSvg => {
    const lines = styleDot(dot)
    const source = graphviz.dot(lines)
    const groups = sizeRe.exec(source)?.groups ?? {}

    const [requiredWidthPx, requiredHeightPx] = [
      pt(groups['w'] ?? '0'),
      pt(groups['h'] ?? '0'),
    ]

    const isOverflowX = requiredWidthPx > availableWidthPx

    const svg = source.replace(
      sizeRe,
      `style="width: min(${px(requiredWidthPx)}, 100%);` +
        `height: min(${px(requiredHeightPx)}, 100%);"`,
    )

    const requiredPx = SizePx(requiredWidthPx, requiredHeightPx)

    return {svg, requiredPx, isOverflowX}
  }

const node: string = unwords.comma.rest(
  'label=""',
  'shape=circle',
  'style=filled',
  `color="black"`,
  `fillcolor="white"`,
  `width=${nodeSizeInches.toFixed(2)}`,
  `height=${nodeSizeInches.toFixed(2)}`,
)

const edge = (color: string): string =>
  unwords.comma.rest(
    `arrowsize=${arrowSizeInches.toFixed(2)}`,
    `color="${color}"`,
  )

const pt = (v: string): number => (4 / 3) * Number.parseInt(v)

const styleDot = (dot: string): string => {
  const styledDot = dot
    .split('\n')
    .map(line =>
      line.includes('" -> "')
        ? line.replace('[label=""]', `[${edge('#777')}]`)
        : line.replace(/\[label="(.+)"\]/, K(`[${node}]`)),
    )

  const lines = unlines(styledDot).replace(
    /^digraph G {/,
    unlines.rest(
      `digraph G {`,
      'bgcolor="transparent"',
      'rankdir="BT"',
      `ranksep="${levelHeightInches.toFixed(2)} equally"`,
    ),
  )

  return lines
}
