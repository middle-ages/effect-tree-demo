import{j as u}from"./jsx-runtime-CG1xpAJ6.js";import{F as b,a as g,s as f}from"./index-BSv6a1fl.js";import{p as v,s as S}from"./pseudo-C8PbS2Z9.js";import{d as y}from"./argTypes-CSM1vGze.js";import{r as V}from"./iframe-BogCSYVz.js";import{S as x}from"./index-D6BzZJer.js";import"./preload-helper-PPVm8Dsz.js";const C=`import {Array, pipe, type Identified} from '#util'
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
          {icon}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {label}
        </option>
      )),
    )}
  </select>
)
`,{expect:i,fn:E}=__STORYBOOK_MODULE_TEST__,l=x,o=[{id:"a",label:"A",title:"a⇒A",icon:"a⇐A"},{id:"b",label:"B",title:"b⇒B",icon:"b⇐B"},{id:"c",label:"C",title:"c⇒C",icon:"c⇐C"},{id:"d",label:"D",title:"d⇒D",icon:"d⇐D"},{id:"e",label:"E",title:"e⇒E",icon:"e⇐E"}],T=t=>o[(t.codePointAt(0)??0)-97],I={component:l,parameters:{...f(C),...g,...v},argTypes:y("value","items"),args:{value:o[3],items:o,onChange:E(),title:"Select Title"},decorators:b({className:"*:p-2"}),render:function({onChange:r,...e}){const[p,m]=V.useState(o[3]),d=c=>{m(T(c)),r(c)};return u.jsx(l,{...e,value:p,onChange:d})}},a={},s={parameters:S.focusVisible().parameters,args:{id:"focusVisible"}},n={play:async({canvas:t,userEvent:r})=>{const e=t.getByRole("combobox");await i(e).toHaveValue("d"),await r.selectOptions(e,"b"),await i(e).toHaveValue("b")}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: pseudo.story.focusVisible<Props>().parameters as BaseAnnotations<ReactRenderer, Props>['parameters'] & {},
  args: {
    id: 'focusVisible'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvas,
    userEvent
  }) => {
    const select: HTMLSelectElement = canvas.getByRole('combobox');
    await expect(select).toHaveValue('d');
    await userEvent.selectOptions(select, 'b');
    await expect(select).toHaveValue('b');
  }
}`,...n.parameters?.docs?.source}}};const D=["Select","FocusVisible","SelectTest"];export{s as FocusVisible,a as Select,n as SelectTest,D as __namedExportsOrder,I as default};
