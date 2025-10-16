import {FrameDecorator, parameters} from '#storybook'
import {type HasClass} from '#util'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {PropsWithChildren} from 'react'
import {twMerge} from 'tailwind-merge'
import {Layout as Component} from './Layout.js'
import code from './Layout.jsx?raw'

const Box = ({children, className}: PropsWithChildren<HasClass>) => (
  <div
    className={twMerge(
      'h-full flex place-items-center place-content-center rounded-lg',
      'border-2 border-black',
      className,
    )}>
    <div className="bg-[#fff6] rounded-lg p-1 m-1">{children}</div>
  </div>
)

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    header: <Box className="bg-red-400 h-10">header</Box>,
    stats: <Box className="bg-orange-400 max-h-24">stats</Box>,
    toolbar: <Box className="bg-yellow-400 max-h-32">toolbar</Box>,
    stylePanel: <Box className="bg-green-400 max-h-16">stylePanel</Box>,
    view: <Box className="bg-cyan-400 min-h-0">view</Box>,
    footer: <Box className="bg-purple-400 h-10">footer</Box>,
  },
  decorators: FrameDecorator({
    className: 'm-2 p-0 *:p-2 *:size-container *:cqh-4',
  }),
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Layout: Story = {}
