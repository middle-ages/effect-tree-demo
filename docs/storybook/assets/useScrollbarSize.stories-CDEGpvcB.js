import{j as n}from"./jsx-runtime-CG1xpAJ6.js";import{s as a,B as c}from"./index-BSv6a1fl.js";import{r as i}from"./iframe-BogCSYVz.js";import"./preload-helper-PPVm8Dsz.js";const l=`import {parameters} from '#storybook'
import type {Meta, StoryObj} from '@storybook/react-vite'
import code from './useScrollbarSize.stories.jsx?raw'
import {useScrollbarSize} from './useScrollbarSize'

const Component = () => {
  const scrollbarWidth = useScrollbarSize(document)
  return <div>ScrollbarSize≔{scrollbarWidth.toFixed(3)}</div>
}

const meta = {
  component: Component,
  parameters: {...parameters.centeredLayout, ...parameters.source(code)},
} satisfies Meta<typeof Component>

type Story = StoryObj<typeof meta>

export const UseScrollbarSize: Story = {}

export default meta
`,m=e=>i.useMemo(()=>{if(!e)return 10;const r=e.createElement("div");r.style.visibility="hidden",r.style.overflow="scroll";const t=e.createElement("div");r.append(t),e.body.append(r);const s=r.offsetWidth-t.offsetWidth;return r.remove(),s},[e]),p=()=>{const e=m(document);return n.jsxs("div",{children:["ScrollbarSize≔",e.toFixed(3)]})},f={component:p,parameters:{...c,...a(l)}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["UseScrollbarSize"];export{o as UseScrollbarSize,y as __namedExportsOrder,f as default};
