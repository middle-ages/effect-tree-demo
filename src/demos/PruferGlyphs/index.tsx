import {type LazyArg} from '#Function'
import type {DecodeRequest} from '#tree'
import {Footer} from './Footer'
import {Header} from './Header.js'
import {Layout} from './Layout'
import {StatsView} from './StatsView/index'
import {StylePanel} from './StylePanel'
import {TextView} from './TextView'
import {Toolbar} from './Toolbar/index'
import {usePruferCode} from './usePruferCode'

interface Props {
  initial?: LazyArg<DecodeRequest>
}

export const PruferGlyphs = ({initial}: Props) => {
  const {
    format,
    theme,
    setFormat,
    setTheme,
    code,
    modifyActions,
    stats,
    ...rest
  } = usePruferCode(initial)

  return (
    <Layout
      className="demo"
      header={<Header />}
      stats={<StatsView {...{stats}} />}
      toolbar={<Toolbar {...{modifyActions}} />}
      stylePanel={<StylePanel {...{format, setFormat, theme, setTheme}} />}
      view={<TextView {...{...rest, stats, format, theme}} />}
      footer={<Footer {...{code}} />}
    />
  )
}
