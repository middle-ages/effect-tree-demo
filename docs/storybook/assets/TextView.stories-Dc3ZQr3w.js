import{j as t}from"./jsx-runtime-CG1xpAJ6.js";import{q as f,A as N,t as m,z as p,f as _,s as b,i as u,n as w}from"./index-BSv6a1fl.js";import"./iframe-BogCSYVz.js";import"./preload-helper-PPVm8Dsz.js";const a=e=>r=>f(y(e,r))(N),y=(e,r)=>({attributes:{className:i,style:o,...g}={},className:x,style:h,...v})=>({...v,as:e,attributes:{...g,style:{...o,...h},className:m(r,i,x)}});a.div=a("div");a.button=a("button");try{a.displayName="withClassName",a.__docgenInfo={description:`Given a tag name and a base class name, returns a component with a single
element that will use the given tag and base class name.`,displayName:"withClassName",props:{}}}catch{}try{a.div.displayName="withClassName.div",a.div.__docgenInfo={description:"",displayName:"withClassName.div",props:{}}}catch{}try{a.button.displayName="withClassName.button",a.button.__docgenInfo={description:"",displayName:"withClassName.button",props:{}}}catch{}const d=a.div("truncate set-fg-terminal-dim text-sm font-light leading-[25px]"),c=a.div("text-lg truncate font-serif leading-[26px]"),l=({lines:e,style:r,className:i,stats:o})=>t.jsxs("div",{style:r,className:m("relative overflow-hidden",i),children:[t.jsx("div",{className:`h-[100cqh] rounded-md set-bg-terminal border-inset
                    scrollable-y [&::after]:top-full min-h-14`,children:t.jsx("pre",{className:`px-1 font-mono leading-none
                      absolute-full *:first:mt-1 text-xl`,children:e.join(`
`)})}),t.jsx(j,{...o})]}),j=({maxDegree:e,maxDepth:r})=>t.jsx("div",{className:"absolute top-0 right-4 overflow-hidden",children:t.jsxs("div",{className:`grid grid-cols-[min-content_3ch] gap-x-1 text-right pr-1 pt-1
                    *:grid *:grid-cols-subgrid *:col-span-2`,children:[t.jsxs("div",{title:e.title,children:[t.jsxs(d,{children:[e.label,":"]}),t.jsx(c,{children:e.value.toLocaleString()})]}),t.jsxs("div",{title:r.title,children:[t.jsxs(d,{children:[r.label,":"]}),t.jsx(c,{children:r.value.toLocaleString()})]})]})});try{l.displayName="TextView",l.__docgenInfo={description:"",displayName:"TextView",props:{lines:{defaultValue:null,description:"",name:"lines",required:!0,type:{name:"string[]"}},stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"TreeStats"}}}}}catch{}const S=`import {withClassName} from '#compinators'
import {type PrimedStat} from '#tree'
import {twMerge} from 'tailwind-merge'
import type {StyledProps} from '#util'

type TreeStats = Record<'maxDegree' | 'maxDepth', PrimedStat>

interface Props extends StyledProps {
  lines: string[]
  stats: TreeStats
}

const Label = withClassName.div(
  'truncate set-fg-terminal-dim text-sm font-light leading-[25px]',
)

const Value = withClassName.div('text-lg truncate font-serif leading-[26px]')

export const TextView = ({lines, style, className, stats}: Props) => {
  return (
    <div
      {...{style}}
      className={twMerge('relative overflow-hidden', className)}>
      <div
        className={\`h-[100cqh] rounded-md set-bg-terminal border-inset
                    scrollable-y [&::after]:top-full min-h-14\`}>
        <pre
          className={\`px-1 font-mono leading-none
                      absolute-full *:first:mt-1 text-xl\`}>
          {lines.join('\\n')}
        </pre>
      </div>
      <Overlay {...stats} />
    </div>
  )
}

const Overlay = ({maxDegree, maxDepth}: TreeStats) => {
  return (
    <div className="absolute top-0 right-4 overflow-hidden">
      <div
        className={\`grid grid-cols-[min-content_3ch] gap-x-1 text-right pr-1 pt-1
                    *:grid *:grid-cols-subgrid *:col-span-2\`}>
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
}
`,C=[7,6,5,4,3],O={component:l,parameters:{...b(S),..._},args:{lines:p(u(C),"lowerAscii","thin"),stats:{maxDegree:{id:"maxDegree",label:"max degree",title:"title foo",value:12n},maxDepth:{id:"maxDepth",label:"max depth",title:"title Bar",value:45n}}},render:function(r){return t.jsx("div",{className:"m-2 scroll-container overflow-hidden cq-4",children:t.jsx(l,{...r})})}},s={},n={args:{className:"*:text-[10px]",lines:p(u(w(1,100).map(e=>Math.floor(e**(9/10)))),"lower","unixRound")}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    className: '*:text-[10px]',
    lines: drawRomanTree(Codec.Prufer.decode(range(1, 100).map(x => Math.floor(x ** (9 / 10)))), 'lower', 'unixRound')
  }
}`,...n.parameters?.docs?.source}}};const P=["NoOverflow","Overflow"];export{s as NoOverflow,n as Overflow,P as __namedExportsOrder,O as default};
