import{j as N,p as s,k as b,a as l,l as V,n as _,o as I,q as S,u as n,v as d,m as L,t as f,d as j,s as A}from"./decorators-COc7judH.js";import{j as r}from"./jsx-runtime-DJONvF-u.js";import{r as M}from"./iframe-BbgcHPys.js";import"./preload-helper-PPVm8Dsz.js";const h=3999,D=["upper","lower","upperAscii","lowerAscii"],C=["decimal",...D],P={upper:["Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ","Ⅵ","Ⅶ","Ⅷ","Ⅸ","Ⅹ","Ⅺ","Ⅻ"]},c=[["",...P.upper.slice(0,9)],["","Ⅹ","ⅩⅩ","ⅩⅩⅩ","ⅩⅬ","Ⅼ","ⅬⅩ","ⅬⅩⅩ","ⅬⅩⅩⅩ","ⅩⅭ"],["","Ⅽ","ⅭⅭ","ⅭⅭⅭ","ⅭⅮ","Ⅾ","ⅮⅭ","ⅮⅭⅭ","ⅮⅭⅭⅭ","ⅭⅯ"],["","Ⅿ","ⅯⅯ","ⅯⅯⅯ"]],R={"Ⅰ":["ⅰ","I","i"],"Ⅱ":["ⅱ","II","ii"],"Ⅲ":["ⅲ","III","iii"],"Ⅳ":["ⅳ","IV","iv"],"Ⅴ":["ⅴ","V","v"],"Ⅵ":["ⅵ","VI","vi"],"Ⅶ":["ⅶ","VII","vii"],"Ⅷ":["ⅷ","VIII","viii"],"Ⅸ":["ⅸ","IX","ix"],"Ⅹ":["ⅹ","X","x"],"Ⅺ":["ⅺ","XI","xi"],"Ⅻ":["ⅻ","XII","xii"],"Ⅽ":["ⅼ","C","c"],"Ⅼ":["ⅽ","L","l"],"Ⅾ":["ⅾ","D","d"],"Ⅿ":["ⅿ","M","m"]},u=e=>R[e],k=e=>u(e)[0],z=e=>u(e)[1],F=e=>u(e)[2],O=e=>t=>e==="upper"?t:u(t)[e==="lower"?0:e==="upperAscii"?1:2],i=e=>e<1||e>h?" ":n.rest(c[3]?.[Math.floor(e/1e3)]??" ",c[2]?.[Math.floor(e%1e3/100)]??" ",c[1]?.[Math.floor(e%100/10)]??" ",c[0]?.[e%10]??" ");i.lower=e=>s(e,i,d,l(k),n);i.upperAscii=e=>s(e,i,d,l(z),n);i.lowerAscii=e=>s(e,i,d,l(F),n);const q=e=>t=>{if(e==="decimal")return t.toLocaleString();const a=O(e);return s(t,i,d,l(a),n)},X=(e,t)=>{const a=N(e,o=>s(o>h?o.toLocaleString():q(t)(o),b(" ")));return s(a,S,l(V(I,_(" "," "))))},p=e=>L(t=>f(e,t),"className")(({children:t,className:a,...o})=>r.jsx("div",{className:f(e,a),...o,children:t}));try{p.displayName="withClassName",p.__docgenInfo={description:"",displayName:"withClassName",props:{}}}catch{}const g=p("text-sm leading-6 opacity-65 truncate"),v=p("font-serif text-lg leading-[25px]"),x=({tree:e,format:t,...a})=>{const o=M.useMemo(()=>X(e,t),[e,t]);return r.jsxs("div",{className:`
         size-full flex-1 relative overflow-auto
         border-inset-colors border-3 rounded-md
         text-[var(--terminalText)] bg-black
    `,children:[r.jsx("pre",{className:`
          p-1 text-2xl *:leading-none font-mono;
          absolute top-0 left-0 size-full`,children:o.map((y,T)=>r.jsx("div",{children:y},T))}),r.jsx(E,{...a})]})},E=({maxDegree:e,maxDepth:t})=>r.jsx("div",{className:"sticky z-50 top-0 left-full w-fit font-light text-[var(--terminalText)]",children:r.jsxs("div",{className:"grid grid-cols-[min-content_3ch] gap-x-1 py-1.5 px-2 text-right",children:[r.jsxs(g,{children:[e.label,":"]}),r.jsx(v,{children:e.value.toLocaleString()}),r.jsxs(g,{children:[t.label,":"]}),r.jsx(v,{children:t.value.toLocaleString()})]})});try{x.displayName="TextView",x.__docgenInfo={description:"",displayName:"TextView",props:{tree:{defaultValue:null,description:"",name:"tree",required:!0,type:{name:"Fix<TreeFTypeLambda, A>"}},format:{defaultValue:null,description:"",name:"format",required:!0,type:{name:'"decimal" | "upper" | "lower" | "upperAscii" | "lowerAscii"'}},maxDegree:{defaultValue:null,description:"",name:"maxDegree",required:!0,type:{name:"Stat"}},maxDepth:{defaultValue:null,description:"",name:"maxDepth",required:!0,type:{name:"Stat"}}}}}catch{}const W=`import {withClassName} from '#compinators'
import * as Tree from 'effect-tree'
import {useMemo} from 'react'
import {drawRomanTree, type NumericFormat} from './roman/roman'
import type {Stat} from './StatsView/stats.js'

type TreeStats = Record<'maxDegree' | 'maxDepth', Stat>

interface Props extends TreeStats {
  tree: Tree.Tree<number>

  // How do we format the labels of the numeric tree we are drawing?
  format: NumericFormat
}

const Label = withClassName('text-sm leading-6 opacity-65 truncate')
const Value = withClassName('font-serif text-lg leading-[25px]')

export const TextView = ({tree, format, ...overlayProps}: Props) => {
  const lines: string[] = useMemo(
    () => drawRomanTree(tree, format),
    [tree, format],
  )
  return (
    <div
      className={\`
         size-full flex-1 relative overflow-auto
         border-inset-colors border-3 rounded-md
         text-[var(--terminalText)] bg-black
    \`}>
      <pre
        className={\`
          p-1 text-2xl *:leading-none font-mono;
          absolute top-0 left-0 size-full\`}>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </pre>
      <Overlay {...overlayProps} />
    </div>
  )
}
//  <TextTree
//    className="relative *:px-2 *:pl-1 flex-1 textView"
//    tree={
//    <Overlay {...{code}} />
//  </TextTree>

const Overlay = ({maxDegree, maxDepth}: TreeStats) => {
  return (
    <div className="sticky z-50 top-0 left-full w-fit font-light text-[var(--terminalText)]">
      <div className="grid grid-cols-[min-content_3ch] gap-x-1 py-1.5 px-2 text-right">
        <Label>{maxDegree.label}:</Label>
        <Value>{maxDegree.value.toLocaleString()}</Value>
        <Label>{maxDepth.label}:</Label>
        <Value>{maxDepth.value.toLocaleString()}</Value>
      </div>
    </div>
  )
}

/*
        <div className="grid grid-cols-subgrid" title={maxDepth.title}>
        </div>
        <div className="grid grid-cols-subgrid" title={maxDepth.title}>
        </div>

import {prefix} from '#String'
import type {StyledPropsWithChildren} from '#util'
import {Array, pipe} from 'effect'
import {drawTree, type Tree as TreeModel} from 'effect-tree'
import {useMemo} from 'react'
import {Text} from './Text'

import {twMerge} from 'tailwind-merge'

interface Props extends StyledPropsWithChildren {
  lines: string[]
}

export const Text = ({lines, style, className, children}: Props) => {
  return (
    <div className="relative *:*:truncate *:*:leading-none">
      <div
        className={twMerge('absolute top-0 left-0 size-full', className)}
        {...{style}}>
        {lines.map((line, i) => (
          <div key={i}>{}</div>
        ))}
      </div>
      {children}
    </div>
  )
}

*/
`,w=[7,6,5,4,3],G={component:x,parameters:A(W),argTypes:{format:{control:{type:"radio"},options:C}},args:{tree:j(w),code:w,format:"decimal"}},m={args:{format:"decimal"}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    format: 'decimal'
  }
}`,...m.parameters?.docs?.source}}};const J=["TextView"];export{m as TextView,J as __namedExportsOrder,G as default};
