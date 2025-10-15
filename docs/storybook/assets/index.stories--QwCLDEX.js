import{N as n,t as w,s as j,a as y,m as S,b as h,u as f,d as v,e as g,g as N}from"./index-DIeet80g.js";import{f as F}from"./tree-GU7354cO.js";import{j as e}from"./jsx-runtime-QFOfF_tH.js";import"./iframe-CvpaWoqK.js";import"./preload-helper-PPVm8Dsz.js";const p=({stats:{treeIndex:s,treeCount:r,nodeCount:m},maxWidthPx:u=332})=>{const x=r.value===1n;return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex flex-col gap-1 set-fg-control",children:[e.jsxs(l,{children:[e.jsx("div",{className:"pr-1",children:"Showing tree #"}),e.jsx(n,{maxWidthPx:u,value:s.value})]}),e.jsx(l,{children:x?e.jsx("div",{children:"of the single"}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"pr-1",children:"out of all"}),e.jsx(n.Flat,{maxWidthPx:u,value:r.value})]})}),e.jsxs(l,{children:[e.jsx("div",{children:"possible"}),e.jsx(n.FixedWidth,{digits:3,value:m.value,className:"mx-1"}),e.jsxs("div",{children:["node vertex labeled tree",x?"":"s","."]})]})]})})},l=({children:s,className:r,style:m})=>e.jsx("div",{className:w("flex items-center *:whitespace-nowrap *:first:form-row-h",r),style:m,children:s});try{p.displayName="StatsView",p.__docgenInfo={description:"",displayName:"StatsView",props:{stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"PrimedStats"}},maxWidthPx:{defaultValue:{value:"332"},description:"",name:"maxWidthPx",required:!1,type:{name:"number"}}}}}catch{}const P=`import {Numeric} from '#components'
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
  const isFirst = treeCount.value === 1n
  return (
    <>
      <div className="flex flex-col gap-1 set-fg-control">
        <Row>
          <div className="pr-1">Showing tree #</div>
          <Numeric {...{maxWidthPx}} value={treeIndex.value} />
        </Row>

        <Row>
          {isFirst ? (
            <div>of the single</div>
          ) : (
            <>
              <div className="pr-1">out of all</div>
              <Numeric.Flat {...{maxWidthPx}} value={treeCount.value} />
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
`,W=S(F,"stats")(p),V={component:W,parameters:{...y,...j(P)},args:{stats:"1, 2, 3, 4, 5, 6, 7, 8",maxWidthPx:200}},a={},t={args:{stats:"1"}},o={args:{stats:"2"}},i={args:{stats:"3"}},d={args:{stats:h(1,N(48),v(g),f.comma)}},c={args:{stats:h(50,N(48),v(g),f.comma)}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    stats: pipe(50, replicate(48), map(fromNumber), unwords.comma)
  }
}`,...c.parameters?.docs?.source}}};const I=["TenNodes","ThreeNodes1","ThreeNodes2","ThreeNodes3","FiftyNodes1","FiftyNodesLast"];export{d as FiftyNodes1,c as FiftyNodesLast,a as TenNodes,t as ThreeNodes1,o as ThreeNodes2,i as ThreeNodes3,I as __namedExportsOrder,V as default};
