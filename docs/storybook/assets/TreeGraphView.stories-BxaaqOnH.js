import{t as d,F as f,e as o,s as u,f as l,o as e}from"./index-BVtw-P1L.js";import{r as a}from"./iframe-DKhiFF43.js";import{j as G}from"./jsx-runtime-DoGwtFLm.js";import{Y as w,G as z}from"./GraphView-BwvDJQM0.js";import"./preload-helper-PPVm8Dsz.js";const s=({tree:t,className:i,style:c})=>{const[n,p]=a.useState();a.useEffect(()=>{n===void 0&&w.load().then(p).catch(h=>{throw h})},[n,p]);const m=a.useMemo(()=>d(t),[t]);return G.jsx(z,{style:c,className:i,dot:m})};try{s.displayName="TreeGraphView",s.__docgenInfo={description:"",displayName:"TreeGraphView",props:{tree:{defaultValue:null,description:"",name:"tree",required:!0,type:{name:"any"}}}}}catch{}const v=`import type {StyledProps} from '#util'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {Codec, type Tree} from 'effect-tree'
import {useEffect, useMemo, useState} from 'react'
import {GraphView} from './GraphView'

interface Props extends StyledProps {
  tree: Tree<string> | Tree<number>
}

export const TreeGraphView = ({tree, className, style}: Props) => {
  const [graphviz, setGraphviz] = useState<Graphviz>()
  useEffect(() => {
    if (graphviz === undefined) {
      Graphviz.load()
        .then(setGraphviz)
        .catch((error: unknown) => {
          throw error
        })
    }
  }, [graphviz, setGraphviz])

  const dot = useMemo(() => Codec.treeToGraphViz(tree), [tree])

  return <GraphView {...{style, className, dot}} />
}
`,x={component:s,parameters:{...l,...u(v)},args:{tree:o("a",e("b"),o("c",e("d"),e("e"),o("f",e("g"),e("h"))),e("i"))},decorators:[f({})]},r={};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};const E=["TreeGraphView"];export{r as TreeGraphView,E as __namedExportsOrder,x as default};
