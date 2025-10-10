import {type LazyArg} from '#Function'
import {Layout} from './Layout'
import {StatsView} from './StatsView/index'
import {Toolbar} from './Toolbar/index'
import {usePruferCode} from './usePruferCode'
import {TextView} from './TextView'
import {Footer} from './Footer'
import {StylePanel} from './StylePanel'
import {useState} from 'react'
import type {NumericFormat} from './roman/roman.js'

interface Props {
  initialCode: LazyArg<number[]>
}

export const PruferGlyphs = ({initialCode}: Props) => {
  const {code, tree, modifyActions, stats} = usePruferCode(initialCode)
  const [format, setFormat] = useState<NumericFormat>('lowerAscii')
  const {maxDepth, maxDegree} = stats

  return (
    <Layout
      className="demo"
      header={
        <h1>
          <span className="font-mono medium">effect-tree</span> Demo
        </h1>
      }
      view={<TextView {...{tree, maxDepth, maxDegree, format}} />}
      stats={<StatsView {...{stats}} maxWidthPx={400} />}
      toolbar={<Toolbar {...{modifyActions}} />}
      stylePanel={<StylePanel {...{format, setFormat}} />}
      footer={<Footer {...{code}} />}
    />
  )
}
