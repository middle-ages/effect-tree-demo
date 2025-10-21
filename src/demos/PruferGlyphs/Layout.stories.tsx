import {parameters} from '#storybook'
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
      'inner-shadow',
      className,
    )}>
    <div className="relative m-1 p-1 text-white text-shadow-[0px_1px_2px] text-shadow-gray-800">
      {children}
    </div>
  </div>
)

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    header: <Box className="bg-red-400 h-9">header</Box>,
    stats: <Box className="bg-orange-400 min-h-16">stats</Box>,
    toolbar: <Box className="bg-yellow-400 min-h-24">toolbar</Box>,
    stylePanel: (
      <Box className="bg-green-400 min-h-12 min-w-48">stylePanel</Box>
    ),
    graphPanel: (
      <Box className="bg-purple-400 min-h-12 min-w-48">graphPanel</Box>
    ),
    view: <Box className="bg-cyan-400 min-h-24 min-w-72">view</Box>,
    footer: <Box className="bg-blue-400 h-20">footer</Box>,
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Layout: Story = {}
