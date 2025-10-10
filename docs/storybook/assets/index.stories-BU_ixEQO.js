import{N as n,t as v,s as w,a as y,m as S,b as x,u as f,d as h,e as N,g}from"./index-DN-unnOX.js";import{f as j}from"./tree-DdIZv0Cj.js";import{j as e}from"./jsx-runtime-B0gFdbzZ.js";import"./iframe-BCheXTli.js";import"./preload-helper-PPVm8Dsz.js";const p=({stats:{treeIndex:s,treeCount:m,nodeCount:c},maxWidthPx:u=332})=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-1 set-fg-control",children:[e.jsxs(l,{children:[e.jsx("div",{className:"pr-1",children:"Showing tree #"}),e.jsx(n,{maxWidthPx:u,value:s.value})]}),e.jsxs(l,{children:[e.jsx("div",{className:"pr-1",children:"out of all"}),e.jsx(n.Flat,{maxWidthPx:u,value:m.value})]}),e.jsxs(l,{children:[e.jsx("div",{children:"possible"}),e.jsx(n.FixedWidth,{digits:3,value:c.value,className:"mx-1"}),e.jsx("div",{children:"node vertex labeled trees."})]})]})}),l=({children:s,className:m,style:c})=>e.jsx("div",{className:v("flex items-center *:whitespace-nowrap *:first:form-row-h",m),style:c,children:s});try{p.displayName="StatsView",p.__docgenInfo={description:"",displayName:"StatsView",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"PrimedStats"}},maxWidthPx:{defaultValue:{value:"332"},description:"",name:"maxWidthPx",required:!1,type:{name:"number"}}}}}catch{}const P=`import {Numeric} from '#components'
import {type PrimedStats} from '#tree'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props {
  stats: PrimedStats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx = 332,
}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1 set-fg-control">
        <Row>
          <div className="pr-1">Showing tree #</div>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          <div className="pr-1">out of all</div>
          <Numeric.Flat {...{maxWidthPx}} value={treeCount.value} />
        </Row>

        <Row>
          <div>possible</div>
          <Numeric.FixedWidth
            digits={3}
            value={nodeCount.value}
            className="mx-1"
          />
          <div>node vertex labeled trees.</div>
        </Row>
      </div>
    </>
  )
}

const Row = ({children, className, style}: StyledPropsWithChildren) => (
  <div
    className={twMerge(
      'flex items-center *:whitespace-nowrap *:first:form-row-h',
      className,
    )}
    {...{style}}>
    {children}
  </div>
)
`,W=S(j,"stats")(p),C={component:W,parameters:{...y,...w(P)},args:{stats:"1, 2, 3, 4, 5, 6, 7, 8",maxWidthPx:200}},r={},a={args:{stats:"1"}},t={args:{stats:"2"}},o={args:{stats:"3"}},i={args:{stats:x(1,g(48),h(N),f.comma)}},d={args:{stats:x(50,g(48),h(N),f.comma)}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '1'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '2'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '3'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...d.parameters?.docs?.source}}};const V=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{i as FiftyNodes1,d as FiftyNodesLast,r as TenNodes,a as ThreeNodes1,t as ThreeNodes2,o as ThreeNodes3,V as __namedExportsOrder,C as default};
