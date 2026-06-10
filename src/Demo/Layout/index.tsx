import {withClassName} from '#compinators'
import {HRule} from '#HRule'
import {Link} from '#Link'
import type {Pair} from '#Pair'
import {Repeater} from '#Repeater'
import {SplitPanel} from '#SplitPanel'
import {
  closeWelcome,
  selectIsWelcomeOpen,
  useAppDispatch,
  useAppSelector,
} from '#store'
import {Infotip} from '#Tooltip'
import {useCallback} from 'react'
import {CodeEditor} from '../CodeEditor/index'
import {header} from '../header'
import {StatsView} from '../StatsView/index'
import {SettingsPanel} from '../SettingsPanel'
import {TextView} from '../TextView/index'
import {Toolbar} from '../Toolbar'
import {TreeGraph} from '../TreeGraph/index'

const minWidthsPx: Pair<number> = [352, 186]

export const Layout = () => {
  const {isWelcomeOpen, onCloseInfotip} = useIsWelcome()

  return (
    <div className='relative flex fill-container flex-col bg-app px-1.5 text-fg-control contain-strict'>
      {/** Header */}
      {header}

      {/** Body */}
      <SplitPanel
        {...{minWidthsPx}}
        className='min-h-89 flex-1'
        leftClassName='flex-gap-col'
        rightClassName='-ml-0.5 min-h-[4lh] min-w-42'
        left={
          <>
            <VerticalPanel>
              <StatsView />
              {HRule}
              <Toolbar />
            </VerticalPanel>
            <TreeGraph className='flex-1' />
            <VerticalPanel>
              <SettingsPanel />
            </VerticalPanel>
          </>
        }
        right={<TextView />}
      />

      {/** Footer */}
      <div className='h-18.75 contain-strict'>
        <Link.PruferPaper />
        <CodeEditor />
      </div>

      <Infotip anchor='incCode' isOpen={isWelcomeOpen} onClose={onCloseInfotip}>
        <span className='emphasis'>Click and hold</span>
        <ButtonImage /> to see the tree change as you step through the Prüfer
        codes.
      </Infotip>
    </div>
  )
}

const className = 'dark-col rounded-md pr-1.5 pl-2 py-1.25 contain-layout'

const VerticalPanel = withClassName.div(className)

const ButtonImage = () => (
  <div className='inline-block translate-y-1 scale-90 pr-1 pl-2'>
    <Repeater.Thumbnail />
  </div>
)

const useIsWelcome = (): {
  isWelcomeOpen: boolean
  onCloseInfotip: () => void
} => {
  const dispatch = useAppDispatch()

  return {
    isWelcomeOpen: useAppSelector(selectIsWelcomeOpen),

    onCloseInfotip: useCallback(() => {
      dispatch(closeWelcome())
    }, [dispatch]),
  }
}
