import{t as v,s as T,c as y,m as j,p as f,u as h,a as N,f as g,r as w}from"./decorators-COc7judH.js";import{f as S}from"./tree-BGmFmoej.js";import{j as e}from"./jsx-runtime-DJONvF-u.js";import{N as u}from"./Numeric-C-5xAlV0.js";import"./Button-B8NH6be9.js";import"./iframe-BbgcHPys.js";import"./preload-helper-PPVm8Dsz.js";const x=({stats:{treeIndex:s,treeCount:l,nodeCount:p},maxWidthPx:r})=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col p-1 text-[var(--controlFg)]",children:[e.jsxs(t,{children:[e.jsx(a,{className:"pr-px",suffix:"",children:"Tree #"}),e.jsx(u,{maxWidthPx:r,value:s.value})]}),e.jsxs(t,{children:[e.jsx(a,{children:"out of all"}),e.jsx(u,{maxWidthPx:r,value:l.value})]}),e.jsxs(t,{children:[e.jsx(a,{children:"possible"}),e.jsx(u,{maxWidthPx:r,value:p.value}),e.jsx(a,{children:"node"})]}),e.jsx(t,{children:e.jsx(a,{className:"leading-9",children:"vertex labeled trees."})})]})}),a=({children:s,className:l,style:p,suffix:r=" "})=>e.jsxs(e.Fragment,{children:[" ",e.jsx("span",{style:p,className:v("inline-block leading-7 -translate-y-1.5",l),children:s}),r]}),t=({children:s})=>e.jsx("div",{className:`
          whitespace-nowrap overflow-hidden h-7
          transition *:transition
      `,children:s});try{x.displayName="StatsView",x.__docgenInfo={description:"",displayName:"StatsView",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"Stats"}},maxWidthPx:{defaultValue:null,description:"",name:"maxWidthPx",required:!1,type:{name:"number"}}}}}catch{}const P=`import {Numeric} from '#components'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'
import {type Stats} from './stats'
import type {PropsWithChildren} from 'react'

interface Props {
  stats: Stats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx,
}: Props) => {
  return (
    <>
      <div className="flex flex-col p-1 text-[var(--controlFg)]">
        <Row>
          <Text className="pr-px" suffix="">
            Tree #
          </Text>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          <Text>out of all</Text>
          <Numeric {...{maxWidthPx}} value={treeCount.value} />
        </Row>

        <Row>
          <Text>possible</Text>
          <Numeric {...{maxWidthPx}} value={nodeCount.value} />
          <Text>node</Text>
        </Row>

        <Row>
          <Text className="leading-9">vertex labeled trees.</Text>
        </Row>
      </div>
    </>
  )
}

const Text = ({
  children,
  className,
  style,
  suffix = ' ',
}: StyledPropsWithChildren & {
  suffix?: string
}) => (
  <>
    {' '}
    <span
      {...{style}}
      className={twMerge('inline-block leading-7 -translate-y-1.5', className)}>
      {children}
    </span>
    {suffix}
  </>
)

const Row = ({children}: PropsWithChildren) => (
  <div
    className={\`
          whitespace-nowrap overflow-hidden h-7
          transition *:transition
      \`}>
    {children}
  </div>
)
`,b=j(S,"stats")(x),L={component:b,parameters:{...y,...T(P)},args:{stats:"1, 2, 3, 4, 5, 6, 7, 8",maxWidthPx:200}},o={},n={args:{stats:"1"}},i={args:{stats:"2"}},c={args:{stats:"3"}},m={args:{stats:f(1,w(48),N(g),h.comma)}},d={args:{stats:f(50,w(48),N(g),h.comma)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '1'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '2'
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '3'
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...d.parameters?.docs?.source}}};const M=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{m as FiftyNodes1,d as FiftyNodesLast,o as TenNodes,n as ThreeNodes1,i as ThreeNodes2,c as ThreeNodes3,M as __namedExportsOrder,L as default};
