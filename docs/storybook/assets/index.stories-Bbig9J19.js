import{t as w,s as j,a as y,m as S,b as x,u as h,d as f,e as v,g}from"./index-BmW2xu2G.js";import{f as P}from"./tree-C1YHQWwX.js";import{j as e}from"./jsx-runtime-BBpt9uZ8.js";import{N as n}from"./index-DaKrbpy1.js";import"./iframe-DLMhvWgQ.js";import"./Number-CT04UDZK.js";import"./preload-helper-PPVm8Dsz.js";const p=({stats:{treeIndex:s,treeCount:r,nodeCount:c},maxWidthPx:N=267})=>{const u=r.value===1n;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-0.5 set-fg-control",children:[e.jsxs(l,{children:[e.jsx("div",{className:"pr-1",children:"Showing tree #"}),e.jsx(n,{maxWidthPx:N,value:s.value})]}),e.jsx(l,{children:u?e.jsx("div",{children:"of the single"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"pr-1.5",children:"out of all"}),e.jsx(n.Flat,{maxWidthPx:313,value:r.value})]})}),e.jsxs(l,{children:[e.jsx("div",{children:"possible"}),e.jsx(n.FixedWidth,{digits:3,value:c.value,className:"mx-1"}),e.jsxs("div",{children:["node vertex labeled tree",u?"":"s","."]})]})]})})},l=({children:s,className:r,style:c})=>e.jsx("div",{className:w("flex items-center *:whitespace-nowrap *:first:form-row-h",r),style:c,children:s});try{p.displayName="StatsView",p.__docgenInfo={description:"",displayName:"StatsView",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"PrimedStats"}},maxWidthPx:{defaultValue:{value:"267"},description:"",name:"maxWidthPx",required:!1,type:{name:"number"}}}}}catch{}const F=`import {Numeric} from '#Numeric'
import {type PrimedStats} from '#tree'
import {type StyledPropsWithChildren} from '#util'
import {twMerge} from 'tailwind-merge'

interface Props {
  stats: PrimedStats
  maxWidthPx?: number
}

export const StatsView = ({
  stats: {treeIndex, treeCount, nodeCount},
  maxWidthPx = 267,
}: Props) => {
  const isFirst = treeCount.value === 1n
  return (
    <>
      <div className="flex flex-col gap-0.5 set-fg-control">
        <Row>
          <div className="pr-1">Showing tree #</div>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          {isFirst ? (
            <div>of the single</div>
          ) : (
            <>
              <div className="pr-1.5">out of all</div>
              <Numeric.Flat maxWidthPx={313} value={treeCount.value} />
            </>
          )}
        </Row>

        <Row>
          <div>possible</div>
          <Numeric.FixedWidth
            digits={3}
            value={nodeCount.value}
            className="mx-1"
          />
          <div>node vertex labeled tree{isFirst ? '' : 's'}.</div>
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
`,W=S(P,"stats")(p),L={component:W,parameters:{...y,...j(F)},args:{stats:"1, 2, 3, 4, 5, 6, 7, 8",maxWidthPx:200}},a={},t={args:{stats:"1"}},o={args:{stats:"2"}},i={args:{stats:"3"}},d={args:{stats:x(1,g(48),f(v),h.comma)}},m={args:{stats:x(50,g(48),f(v),h.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '1'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '2'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    stats: '3'
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(1, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...m.parameters?.docs?.source}}};const M=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{d as FiftyNodes1,m as FiftyNodesLast,a as TenNodes,t as ThreeNodes1,o as ThreeNodes2,i as ThreeNodes3,M as __namedExportsOrder,L as default};
