import {Link} from '#Link'
import {CodeEditor} from './Demo/CodeEditor/index'
import {Layout} from './Demo/Layout/index'
import {StatsView} from './Demo/StatsView/index'
import {StylePanel} from './Demo/StylePanel'
import {TextView} from './Demo/TextView/index'
import {Toolbar} from './Demo/Toolbar'
import {TreeGraph} from './Demo/TreeGraph/index'
import {header} from './Demo/header'
import {useTreeWorker} from '#worker'
import {selectData, useAppSelector} from '#store'

export const Demo = () => {
  const rootDataState = useAppSelector(selectData)
  const response = useTreeWorker(rootDataState)
  console.log(response === undefined ? 'UNDEFINED' : response)

  return (
    <Layout
      {...{header}}
      className='demo'
      stats={<StatsView />}
      graphPanel={<TreeGraph />}
      content={<TextView />}
      stylePanel={<StylePanel />}
      toolbar={<Toolbar />}
      footer={
        <>
          <Link.PruferPaper />
          <CodeEditor />
        </>
      }
    />
  )
}
