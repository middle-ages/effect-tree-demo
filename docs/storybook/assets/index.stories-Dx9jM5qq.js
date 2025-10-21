import{K as W,L as N,M as X,N as Y,P as R,Q as K,R as F,S as Q,T as D,U as $,b as i,V as A,W as Z,X as G,Y as ee,Z as te,_ as oe,$ as s,a0 as re,a1 as ae,q as ne,a2 as se,a3 as ie,a4 as de,a5 as le,a6 as ce,a7 as pe,a8 as ue,a9 as me,aa as be,ab as fe,ac as ye,ad as Ce,ae as ge,af as he,ag as w,w as ve,ah as Pe,ai as n,aj as Ne,F as Ae,s as we,ak as xe,d as _e}from"./index-BVtw-P1L.js";import{a as Se,i as Te,c as S,f as T,n as Le}from"./Number-CddmtPRa.js";import{r as L}from"./iframe-DKhiFF43.js";import{F as Me,D as je,a as Ee,I as Oe,b as Re,L as Fe,c as De,d as $e,e as He,f as Ie,g as Je,h as ze}from"./IncHalfNodeCount-dYj6gPOE.js";import{j as a}from"./jsx-runtime-DoGwtFLm.js";import{P as p}from"./Pill-DWGvgcVi.js";import"./preload-helper-PPVm8Dsz.js";import"./index-3lxCqcPR.js";const Be=e=>t=>W(e.map(Y),N(t).chain(o=>e.map(X(o)))),ke=Object.freeze(Object.defineProperty({__proto__:null,getArbitrary:Be},Symbol.toStringTag,{value:"Module"})),x=(e,t)=>{const o={...R(t),currentDepth:1},r=I(e);return o.onlyBranches?H(r,e)(o):r(o)},Ue=(e,t)=>N(e(t),{maxLength:t.maxChildren}),H=(e,t)=>o=>t.chain(r=>Ue(e,o).map(K.flipped(r))),I=e=>t=>{if(F(t))return e.map(Q);const o=D(t);return $(e,i(o,H(I(e),e)))(o)},J=e=>x(A,e),z=(e={})=>x(A,{onlyBranches:!0,...Z(e)}),B=e=>J(e).map(G.pre(e?.initialize??1)),Ve=(e={})=>z(e).map(ee.pre(e.initialize??1)),qe=e=>B(e).map(te(oe)),k=(e=3)=>s.array(s.integer({min:1,max:e}),i(e,ae,re)("minLength","maxLength")),We=e=>k(e).map(ne),Xe=Object.freeze(Object.defineProperty({__proto__:null,biasedOneOf:$,defaultNumberedOptions:se,defaultOptions:ie,getArbitrary:x,getNumberedArbitrary:B,getNumberedBranchArbitrary:Ve,getPruferCodeArbitrary:k,getPruferEncodableArbitrary:We,getStringArbitrary:qe,isAtMaxDepth:F,nextDepth:D,normalizeOptions:R,voidBranchArbitrary:z,voidTreeArbitrary:J},Symbol.toStringTag,{value:"Module"})),Ye=Object.freeze(Object.defineProperty({__proto__:null,Part:de,PartF:le,Tree:Xe,TreeF:ke,codePointArbitrary:ce,letterArbitrary:pe,lowerCaseArbitrary:ue,nonEmptyArrayArbitrary:N,tinyLetterStringArbitrary:me,tinyLettersArbitrary:be,tinyNonEmptyLetterStringArbitrary:fe,tinyNonEmptyLettersArbitrary:ye,upperCaseArbitrary:Ce,voidArbitrary:A},Symbol.toStringTag,{value:"Module"})),{Tree:{getPruferCodeArbitrary:U}}=Ye,Ke=e=>t=>{const o=i(t,ge,U),[r]=s.sample(o,{numRuns:1,...e!==void 0});if(r===void 0)throw new Error("Cannot sample prüfer code arbitrary.");return r},Qe=e=>t=>{const o=s.integer({min:2,max:e}),[r]=s.sample(o,{numRuns:1,...t!==void 0&&{seed:t}});if(r===void 0)throw new Error("Cannot sample node count arbitrary.");return r},Ze=e=>s.integer({min:2,max:e}).chain(t=>s.tuple(s.constant(t),U(t))),Ge=e=>t=>{const o=Ze(e),[r]=s.sample(o,{numRuns:1,...t!==void 0&&{seed:t}});if(r===void 0)throw new Error("Cannot sample node count and code arbitrary.");return r},{Prufer:{computeNodeCount:d,fromOrdinal:M,getFirstCode:et,getFirstCodeFor:h,getLastCode:tt,getLastCodeFor:ot,getNextFirstCode:rt,getPreviousLastCode:at,isFirstCode:u,isLastCode:m,labeledTreeCount:j,nextCode:nt,previousCode:st,toOrdinal:E}}=he,O=e=>`You are at the ${e} Prüfer code for this node count and can go no further.`,[b,f]=[O("first"),O("last")],v=`(𝓶𝓪𝔁=${n.toLocaleString()})`,y=[e=>d(e)<=2,"Cannot encode a Prüfer tree with nodeCount ≤ 1."],C=[e=>d(e)>=n,`Cannot encode a Prüfer tree with nodeCount > 𝓶𝓪𝔁 ${v}.`],it=[{id:"firstCode",label:Me,title:"Jump to the first code in the current node count.",disable:[u,b],apply:et},{id:"decHalfCode",label:je,title:"Jump backwards to ½ of the current Prüfer code.",disable:[u,b],apply:w(E,Pe(Se),ve(M))},{id:"decCode",label:Ee,title:"Step back to previous tree.",disable:[u,b],apply:st},{id:"incCode",label:Oe,title:"Step forwards to the next tree.",disable:[m,f],apply:nt},{id:"incHalfCode",label:Re,title:"Jump forwards ½ the distance between this code and the last code for this node count.",disable:[m,f],apply:e=>{const[t,o]=E(e),r=j(o);return M(t===r-1n?r:t+(j(o)-t)/2n,o)}},{id:"lastCode",label:Fe,title:"Jump to the last tree in current node count.",disable:[m,f],apply:tt}],dt=[{id:"firstNodeCount",label:De,title:"Set to smallest Prüfer encodable node count of 2 nodes.",disable:y,apply:()=>[]},{id:"decHafNodeCount",label:$e,title:"Cut node count by ½ and go to the last code of the new node count.",disable:y,apply:w(d,T,ot)},{id:"decNodes",label:He,title:"Remove a node from the tree.",disable:y,apply:at},{id:"incNodes",label:Ie,title:"Add a node to the tree.",disable:C,apply:rt},{id:"incHalfNodeCount",label:Je,title:`Jump to first code of the mid-point of this node count and the 𝓶𝓪𝔁 node count ${v}.`,disable:C,apply:e=>{const t=d(e);return h(t===n-1?n:t+T(n-t))}},{id:"lastNodeCount",label:ze,title:`Set to maximum node count ${v}.`,disable:C,apply:()=>h(n)}],lt=[{id:"randomCode",label:"Prüfer Code",title:"Jump to a random tree with the same number of nodes.",disable:[w(d,Te(2)),"Nowhere to jump: there is only a single tree with two nodes."],apply:Ke()},{id:"randomBoth",label:"Both",title:"Jump to a random tree in some random node count.",disable:void 0,apply:()=>i(n,Ge,S,Ne)},{id:"randomNodes",label:"Node Count",title:`Set a random node count between 2 and ${n.toLocaleString()}.`,disable:void 0,apply:()=>i(n,Qe,S,h)}],ct={code:it,nodeCount:dt,random:lt},pt=`import {Pill} from '#Pill'
import type {Tuple3} from '#Tuple'
import type {MouseListener, VoidAction} from '#types'
import {
  useMemo,
  useState,
  type PropsWithChildren,
  type PointerEvent,
} from 'react'
import {type PrimedActionMap} from './types'

type State = 'active' | undefined

interface Props {
  actions: PrimedActionMap
}

export const Toolbar = ({actions: {code, nodeCount, random}}: Props) => {
  const [state, setState] = useState<State>()
  const isActive = state === 'active'

  const listener: MouseListener = useMemo(
    () => ({
      onPointerDown: (event: PointerEvent): void => {
        setCapture(event)
        setState('active')
      },
      onPointerUp: (event: PointerEvent): void => {
        releaseCapture(event)
        setState(undefined)
      },
    }),
    [],
  )

  return (
    <div className="w-full grid grid-cols-[11ch_1fr]">
      <Row label="Prüfer code">
        <Pill actions={code} />
      </Row>
      <Row label="Node count">
        <Pill actions={nodeCount} />
      </Row>
      <Row label="Randomize">
        <Pill.MultiPress
          {...{listener, isActive}}
          actions={random as unknown as Tuple3<VoidAction>}
        />
      </Row>
    </div>
  )
}

const Row = ({children, label}: PropsWithChildren<{label: string}>) => (
  <div className="form-row-h grid grid-cols-subgrid col-span-2">
    <div className="set-fg-control leading-8">{label}</div>
    <div className="flex-center">{children}</div>
  </div>
)

function setCapture(event: PointerEvent): void {
  const target = event.target as HTMLElement
  target.setPointerCapture(event.pointerId)
}

function releaseCapture(event: PointerEvent): void {
  const target = event.target as HTMLElement
  target.releasePointerCapture(event.pointerId)
}
`,P=({actions:{code:e,nodeCount:t,random:o}})=>{const[r,_]=L.useState(),V=r==="active",q=L.useMemo(()=>({onPointerDown:c=>{ut(c),_("active")},onPointerUp:c=>{mt(c),_(void 0)}}),[]);return a.jsxs("div",{className:"w-full grid grid-cols-[11ch_1fr]",children:[a.jsx(g,{label:"Prüfer code",children:a.jsx(p,{actions:e})}),a.jsx(g,{label:"Node count",children:a.jsx(p,{actions:t})}),a.jsx(g,{label:"Randomize",children:a.jsx(p.MultiPress,{listener:q,isActive:V,actions:o})})]})},g=({children:e,label:t})=>a.jsxs("div",{className:"form-row-h grid grid-cols-subgrid col-span-2",children:[a.jsx("div",{className:"set-fg-control leading-8",children:t}),a.jsx("div",{className:"flex-center",children:e})]});function ut(e){e.target.setPointerCapture(e.pointerId)}function mt(e){e.target.releasePointerCapture(e.pointerId)}try{P.displayName="Toolbar",P.__docgenInfo={description:"",displayName:"Toolbar",props:{actions:{defaultValue:null,description:"",name:"actions",required:!0,type:{name:"PrimedActionMap"}}}}}catch{}const bt=i(ct,xe(_e(ft))),wt={component:P,parameters:we(pt),args:{actions:bt},decorators:Ae({className:"rounded-[11px] *:rounded-lg *:p-2"})},l={};function ft({apply:e,disable:t,...o}){return{...o,apply:Le,disable:void 0}}l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};const xt=["Toolbar"];export{l as Toolbar,xt as __namedExportsOrder,wt as default};
