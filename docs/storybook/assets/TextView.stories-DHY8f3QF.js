import{j as e}from"./jsx-runtime-DoGwtFLm.js";import{z as f,I as b,h as m,J as p,f as N,s as _,q as u,x as y}from"./index-BVtw-P1L.js";import"./iframe-DKhiFF43.js";import"./preload-helper-PPVm8Dsz.js";const a=t=>s=>f(w(t,s))(b),w=(t,s)=>({attributes:{className:n,style:o,...g}={},className:x,style:v,...h})=>({...h,as:t,attributes:{...g,style:{...o,...v},className:m(s,n,x)}});a.div=a("div");a.button=a("button");try{a.displayName="withClassName",a.__docgenInfo={description:`Given a tag name and a base class name, returns a component with a single
element that will use the given tag and base class name.`,displayName:"withClassName",props:{}}}catch{}try{a.div.displayName="withClassName.div",a.div.__docgenInfo={description:"",displayName:"withClassName.div",props:{}}}catch{}try{a.button.displayName="withClassName.button",a.button.__docgenInfo={description:"",displayName:"withClassName.button",props:{}}}catch{}const d=a.div("truncate set-fg-terminal-dim text-sm"),c=a.div("text-lg truncate font-serif"),i=({lines:t,style:s,className:n,stats:o})=>e.jsxs("div",{style:s,className:m("relative min-w-72",n),children:[e.jsx("div",{className:`fill-container-h rounded-md set-bg-terminal focusable
                    border-inset-2 scrollable-y [&::after]:top-full`,children:e.jsx("pre",{className:"p-1 font-mono leading-none absolute-full *:first:mt-1",children:t.join(`
`)})}),e.jsx(j,{...o})]}),j=({nodeCount:t,maxDegree:s,maxDepth:n})=>e.jsx("div",{className:"absolute top-2 right-6",children:e.jsxs("div",{className:`grid grid-cols-[min-content_4rch] gap-x-1.5 text-right
                  *:subgrid-2 *:*:leading-6! *:cursor-default`,children:[e.jsxs("div",{title:t.title,children:[e.jsxs(d,{children:[t.label,":"]}),e.jsx(c,{children:t.value.toLocaleString()})]}),e.jsxs("div",{title:s.title,children:[e.jsxs(d,{children:[s.label,":"]}),e.jsx(c,{children:s.value.toLocaleString()})]}),e.jsxs("div",{title:n.title,children:[e.jsxs(d,{children:[n.label,":"]}),e.jsx(c,{children:n.value.toLocaleString()})]})]})});try{i.displayName="TextView",i.__docgenInfo={description:"",displayName:"TextView",props:{lines:{defaultValue:null,description:"",name:"lines",required:!0,type:{name:"string[]"}},stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"TreeStats"}}}}}catch{}const C=`import {withClassName} from '#compinators'
import {type PrimedStat} from '#tree'
import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '#util'

type TreeStats = Record<'nodeCount' | 'maxDegree' | 'maxDepth', PrimedStat>

interface Props extends StyledProps {
  lines: string[]
  stats: TreeStats
}

const Label = withClassName.div('truncate set-fg-terminal-dim text-sm')
const Value = withClassName.div('text-lg truncate font-serif')

export const TextView = ({lines, style, className, stats}: Props) => {
  return (
    <div {...{style}} className={twMerge('relative min-w-72', className)}>
      <div
        className={\`fill-container-h rounded-md set-bg-terminal focusable
                    border-inset-2 scrollable-y [&::after]:top-full\`}>
        <pre className="p-1 font-mono leading-none absolute-full *:first:mt-1">
          {lines.join('\\n')}
        </pre>
      </div>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({nodeCount, maxDegree, maxDepth}: TreeStats) => (
  <div className="absolute top-2 right-6">
    <div
      className={\`grid grid-cols-[min-content_4rch] gap-x-1.5 text-right
                  *:subgrid-2 *:*:leading-6! *:cursor-default\`}>
      <div title={nodeCount.title}>
        <Label>{nodeCount.label}:</Label>
        <Value>{nodeCount.value.toLocaleString()}</Value>
      </div>
      <div title={maxDegree.title}>
        <Label>{maxDegree.label}:</Label>
        <Value>{maxDegree.value.toLocaleString()}</Value>
      </div>
      <div title={maxDepth.title}>
        <Label>{maxDepth.label}:</Label>
        <Value>{maxDepth.value.toLocaleString()}</Value>
      </div>
    </div>
  </div>
)
`,S=[7,6,5,4,3],O={component:i,parameters:{..._(C),...N},args:{lines:p(u(S),"lowerAscii","thin"),stats:{nodeCount:{id:"nodeCount",label:"node count",title:"title foo",value:112n},maxDegree:{id:"maxDegree",label:"max degree",title:"title foo",value:12n},maxDepth:{id:"maxDepth",label:"max depth",title:"title Bar",value:45n}}},render:function(s){return e.jsx("div",{className:"m-2 scroll-container overflow-hidden cq-4",children:e.jsx(i,{...s})})}},r={},l={args:{className:"*:text-[10px]",lines:p(u(y(1,100).map(t=>Math.floor(t**(9/10)))),"lower","unixRound")}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    className: '*:text-[10px]',
    lines: drawRomanTree(Codec.Prufer.decode(range(1, 100).map(x => Math.floor(x ** (9 / 10)))), 'lower', 'unixRound')
  }
}`,...l.parameters?.docs?.source}}};const P=["NoOverflow","Overflow"];export{r as NoOverflow,l as Overflow,P as __namedExportsOrder,O as default};
