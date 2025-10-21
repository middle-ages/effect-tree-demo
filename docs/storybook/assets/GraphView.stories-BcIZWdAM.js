import{F as e,s as r,f as o}from"./index-BVtw-P1L.js";import"./iframe-DKhiFF43.js";import{G as t}from"./GraphView-BwvDJQM0.js";import"./jsx-runtime-DoGwtFLm.js";import"./preload-helper-PPVm8Dsz.js";const s=`import {unlines, unwords} from '#String'
import type {StyledProps} from '#util'
import {Graphviz} from '@hpcc-js/wasm-graphviz'
import {useEffect, useMemo, useState} from 'react'

interface Props extends StyledProps {
  dot: string
}

const nodeSizeInches = 1 / 10
const levelHeightInches = 1 / 5
const arrowSizeInches = 0

export const GraphView = ({dot, className, style}: Props) => {
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

  const svg = useMemo(() => {
    const styledDot = dot
      .split('\\n')
      .map(line =>
        line.includes('" -> "')
          ? line.replace('[label=""]', \`[\${edge('#333')}]\`)
          : line.replace(
              /\\[label="(.+)"\\]/,
              (_, label: string) => \`[\${shape(label, '#888')}]\`,
            ),
      )

    const lines = unlines(styledDot).replace(
      /^digraph G {/,
      unlines.rest(
        \`digraph G {\`,
        'bgcolor="transparent"',
        'arrowsize=3',
        'rankdir="BT"',
        \`ranksep="\${levelHeightInches.toFixed(2)} equally"\`,
      ),
    )

    const svg = graphviz?.dot(lines).replace(/width="\\d+pt" height="\\d+pt"/, '')
    console.log(svg)
    return svg
  }, [dot, graphviz])

  return (
    <div
      {...{style, className}}
      dangerouslySetInnerHTML={{__html: svg ?? ''}}
    />
  )
}

const shape = (label: string, color: string) =>
  unwords.comma.rest(
    'label=""',
    'shape=circle',
    'style=filled',
    \`color="\${color}"\`,
    \`fillcolor="white"\`,
    \`width=\${nodeSizeInches.toFixed(2)}\`,
    \`height=\${nodeSizeInches.toFixed(2)}\`,
    \`tooltip="\${label}"\`,
  )

const edge = (color: string) =>
  unwords.comma.rest(
    \`arrowsize=\${arrowSizeInches.toFixed(2)}\`,
    \`color="\${color}"\`,
  )
`,d={component:t,parameters:{...o,...r(s)},args:{dot:"digraph G { Hello -> World }"},decorators:[e({})]},n={};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:"{}",...n.parameters?.docs?.source}}};const h=["GraphView"];export{n as GraphView,h as __namedExportsOrder,d as default};
