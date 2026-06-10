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
      className={`relative mx-auto w-fit squircle border border-line-dark px-2 text-sm text-white text-shadow-[0px_1px_2px] text-shadow-gray-800`}>
      {children}
    </div>
  </div>
)

const meta = {
  component: Component,
  parameters: parameters.source(code),
  args: {
    header: <Box className='h-9 rounded-md bg-red-400'>header</Box>,
    stats: <Box className='max-h-10 min-h-8 rounded bg-orange-400'>stats</Box>,
    toolbar: (
      <Box className='max-h-10 min-h-8 rounded bg-yellow-400'>toolbar</Box>
    ),
    stylePanel: (
      <Box className='max-h-10 min-h-8 rounded bg-green-400'>stylePanel</Box>
    ),
    graphPanel: <Box className='h-full bg-purple-400'>graphPanel</Box>,
    content: <Box className='h-full bg-cyan-400'>content</Box>,
    footer: <Box className='h-20 rounded-md bg-blue-400'>footer</Box>,
  },
} satisfies Meta<typeof Component>

export default meta

type Story = StoryObj<typeof meta>

export const Layout: Story = {}
