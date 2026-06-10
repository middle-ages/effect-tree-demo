import {parameters} from '#storybook'
import {type HasClass} from '#util'
import type {Meta, StoryObj} from '@storybook/react-vite'
import type {PropsWithChildren} from 'react'
import {twMerge} from 'tailwind-merge'
import {Layout as Component} from './index'
import code from './index.jsx?raw'

const Box = ({children, className}: PropsWithChildren<HasClass>) => (
  <div className={twMerge('pt-1', className)}>
    <div
      className={`relative text-white text-sm w-fit px-2 mx-auto
                text-shadow-gray-800 border border-line-dark
                squircle text-shadow-[0px_1px_2px]`}>
      {children}
    </div>
  </div>
)

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    header: <Box className="bg-red-400 h-9 rounded-md">header</Box>,
    stats: <Box className="bg-orange-400 min-h-8 max-h-10 rounded">stats</Box>,
    toolbar: (
      <Box className="bg-yellow-400 min-h-8 max-h-10 rounded">toolbar</Box>
    ),
    stylePanel: (
      <Box className="bg-green-400 min-h-8 max-h-10 rounded">stylePanel</Box>
    ),
    graphPanel: <Box className="bg-purple-400 h-full">graphPanel</Box>,
    view: <Box className="bg-cyan-400 h-full">view</Box>,
    footer: <Box className="bg-blue-400 h-20 rounded-md">footer</Box>,
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Layout: Story = {}
