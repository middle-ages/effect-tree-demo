import{j as c}from"./jsx-runtime-BBpt9uZ8.js";import{F as g,a as f,s as x}from"./index-BmW2xu2G.js";import{p as v,s as S}from"./pseudo-uX_LwC5u.js";import{d as y}from"./argTypes-963DSJ_I.js";import{r as V}from"./iframe-DLMhvWgQ.js";import{S as h}from"./index-Co5lRDHc.js";import"./preload-helper-PPVm8Dsz.js";const C=`import {Array, pipe, type Identified} from '#util'
import {type SelectItem} from '../types'

interface Props<Value extends string> extends Identified {
  value: SelectItem
  items: SelectItem[]
  onChange: (value: Value) => void
  title: string
}

export const Select = <Value extends string>({
  value: {id: value},
  items,
  onChange,
  ...props
}: Props<Value>) => (
  <select
    {...props}
    {...{value}}
    onChange={e => {
      onChange(e.target.value as Value)
    }}>
    {pipe(
      items,
      Array.map(({id, label, title, icon}) => (
        <option key={id} value={id} {...{title}}>
          {icon !== '' && (
            <>
              {icon}
              &nbsp;&nbsp;&nbsp;
            </>
          )}
          {label}
        </option>
      )),
    )}
  </select>
)
`,{expect:l,fn:E}=__STORYBOOK_MODULE_TEST__,p=h,r=[{id:"a",label:"A",title:"a⇒A",icon:"a⇐A"},{id:"b",label:"B",title:"b⇒B",icon:"b⇐B"},{id:"c",label:"C",title:"c⇒C",icon:"c⇐C"},{id:"d",label:"D",title:"d⇒D",icon:"d⇐D"},{id:"e",label:"E",title:"e⇒E",icon:"e⇐E"}],w=t=>r[(t.codePointAt(0)??0)-97],j={component:p,parameters:{...x(C),...f,...v},argTypes:y("value","items"),args:{label:"Sixty zippers",value:r[3],items:r,onChange:E(),title:"Select Title"},decorators:g({className:"*:pt-2 *:px-2 *:pb-3"}),render:function({label:a,onChange:e,...m}){const[d,u]=V.useState(r[3]),b=i=>{u(w(i)),e(i)};return c.jsxs("label",{className:"form-row-h flex gap-2 set-fg-control h-6",children:[c.jsx("div",{className:"truncate w-fit leading-7",children:a}),c.jsx(p,{...m,value:d,onChange:b,label:a})]})}},s={},n={parameters:S.focusVisible().parameters,args:{id:"focusVisible"}},o={play:async({canvas:t,userEvent:a})=>{const e=t.getByRole("combobox");await l(e).toHaveValue("d"),await a.selectOptions(e,"b"),await l(e).toHaveValue("b")}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: pseudo.story.focusVisible<Props>().parameters as BaseAnnotations<ReactRenderer, Props>['parameters'] & {},
  args: {
    id: 'focusVisible'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    const select: HTMLSelectElement = canvas.getByRole('combobox');
    await expect(select).toHaveValue('d');
    await userEvent.selectOptions(select, 'b');
    await expect(select).toHaveValue('b');
  }
}`,...o.parameters?.docs?.source}}};const D=["Select","FocusVisible","SelectTest"];export{n as FocusVisible,s as Select,o as SelectTest,D as __namedExportsOrder,j as default};
