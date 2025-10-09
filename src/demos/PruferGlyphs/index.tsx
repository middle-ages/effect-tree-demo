import {type LazyArg} from '#Function'
import {Layout} from './Layout'
import {StatsView} from './StatsView/index'
import {Toolbar} from './Toolbar/index'
import {usePruferCode} from './usePruferCode'
import {TextView} from './TextView'
import {Footer} from './Footer'

interface Props {
  initialCode: LazyArg<number[]>
}

export const PruferGlyphs = ({initialCode}: Props) => {
  const {code, tree, modifyActions, stats} = usePruferCode(initialCode)
  const {maxDepth, maxDegree} = stats
  return (
    <Layout
      className="demo"
      header={
        <h1>
          <span className="font-mono medium">effect-tree</span> Demo
        </h1>
      }
      view={<TextView {...{tree, maxDepth, maxDegree}} format="lowerAscii" />}
      stats={<StatsView {...{stats}} maxWidthPx={400} />}
      toolbar={<Toolbar {...{modifyActions}} />}
      footer={<Footer {...{code}} />}
    />
  )
}
