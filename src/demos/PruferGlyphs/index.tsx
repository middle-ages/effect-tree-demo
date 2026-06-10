import {TreeGraphView} from '#TreeGraphView'
import {type NumericFormat} from '#tree'
import type {Draw} from 'effect-tree'
import {Footer} from './Footer'
import {Layout} from './Layout/index'
import {StatsView} from './StatsView/index'
import {StylePanel} from './StylePanel/index'
import {TextView} from './TextView/index'
import {Toolbar} from './Toolbar/index'
import {header} from './header'
import {useCode} from './hooks/useCode'

interface Props {
  code?: number[]
  format?: NumericFormat
  theme?: Draw.ThemeName
}

export const PruferGlyphs = ({
  code: initialCode = [1, 2, 3] as number[],
  format: initialFormat = 'decimal' as const,
  theme: initialTheme = 'thin' as const,
}: Props) => {
  const {
    tree,
    lines,

    nodeCount,
    treeCount,
    treeIndex,
    maxDegree,
    maxDepth,

    code,
    setCode,

    theme,
    setTheme,

    format,
    setFormat,

    setDigit,
  } = useCode(initialCode, initialFormat, initialTheme)

  return (
    <Layout
      className="demo"
      {...{header}}
      stats={<StatsView {...{nodeCount, treeCount, treeIndex, setCode}} />}
      toolbar={<Toolbar {...{code, setCode}} />}
      stylePanel={<StylePanel {...{format, setFormat, theme, setTheme}} />}
      graphPanel={<TreeGraphView {...{tree}} />}
      view={<TextView {...{lines, maxDepth, maxDegree, nodeCount}} />}
      footer={<Footer {...{code, setDigit}} />}
    />
  )
}
