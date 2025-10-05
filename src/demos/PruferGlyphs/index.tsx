import {type LazyArg} from '#Function'
import {Layout} from './Layout'
import {StatsView} from './StatsView'
import {Toolbar} from './Toolbar'
import {usePruferCode} from './usePruferCode'
import {TextView} from './TextView'
import {Header} from './Header'
import {Footer} from './Footer'

interface Props {
  initialCode: LazyArg<number[]>
}

export const PruferGlyphs = ({initialCode}: Props) => {
  const {code, tree, modifyActions, stats} = usePruferCode(initialCode)
  console.log(code)
  return (
    <Layout
      className="demo"
      header={<Header messages={['The Enumerated Tree']} />}
      view={<TextView {...{tree}} />}
      stats={<StatsView {...{stats}} />}
      toolbar={<Toolbar {...{modifyActions}} />}
      footer={<Footer {...{code}} />}
    />
  )
}
