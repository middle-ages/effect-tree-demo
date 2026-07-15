import {withClassName} from '#compinators'
import {HRule} from '#HRule'
import type {Pair} from '#Pair'
import {Repeater} from '#Repeater'
import {SplitPanel} from '#SplitPanel'
import {Infotip} from '#Tooltip'
import {twMerge} from 'tailwind-merge'
import {Footer} from '../Footer/index'
import {header} from '../header'
import {SettingsPanel} from '../SettingsPanel'
import {StatsView} from '../StatsView/index'
import {TextView} from '../TextView/index'
import {Toolbar} from '../Toolbar'
import {TreeGraph} from '../TreeGraph/index'
import {useIsWelcome} from './useIsWelcome'

const minWidthsPx: Pair<number> = [342, 186]

const topClassName = twMerge(
  'relative fill-container px-1.75',
  'flex flex-col',
  'bg-app text-fg-control',
  'contain-strict',
)

export const Layout = () => {
  const {isWelcomeOpen, onCloseInfotip} = useIsWelcome()

  return (
    <div className={topClassName}>
      {/** Header */}
      {header}

      {/** Body */}
      <SplitPanel
        {...{minWidthsPx}}
        className='min-h-89 flex-1'
        leftClassName='flex-gap-col'
        rightClassName='min-h-[4lh] min-w-42'
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

      <Footer />

      <Infotip anchor='incCode' isOpen={isWelcomeOpen} onClose={onCloseInfotip}>
        <span className='emphasis'>Click and hold</span>
        <ButtonImage /> to see the tree change as you step through the Prüfer
        codes.
      </Infotip>
    </div>
  )
}

const VerticalPanel = withClassName.div(
  'dark-col rounded-md pr-1.5 pl-2 py-1.25 contain-layout',
)

const ButtonImage = () => (
  <div className='inline-block translate-y-1 scale-90 pr-1 pl-2'>
    <Repeater.Thumbnail />
  </div>
)

/*


        className='min-h-89 flex-1'
        */
