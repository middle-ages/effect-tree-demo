import{j as a}from"./jsx-runtime-DJONvF-u.js";import{t as h,g as f,p as g,h as w,a as x,f as b,i as y}from"./decorators-COc7judH.js";const v=e=>{const t=e.toString(),n=t.length-1;if(n===0)return t+"e+0";let i=t.charAt(0);return t.length>1&&(i+="."+t.slice(1)),i+"e+"+n.toString()},N=e=>(...t)=>{const n={};for(const i of t)n[i]=e;return n},_=e=>`${e.toFixed(2)}px`,I={...g(y(0,9),x(b),w(N(8))),e:7.104,"+":12.448,",":4.438,".":4.448},c=14,u=({value:e,maxWidthPx:t,width:n,sizeFactor:i=1,className:s,style:o})=>{const[r,l]=F(e),p=r?e.toLocaleString():"",[d,m]=n===void 0&&t!==void 0?P(t,l,i):[!1,n];return a.jsxs(a.Fragment,{children:[a.jsx("span",{className:h("numeric",typeof e=="string"&&"italic",d&&"truncate",s),title:p,style:{width:m,...o},children:l})," "]})},P=(e,t,n)=>{const i=z(t)*n,s=e-c,o=Math.min(i,s)+c;return[i>=s,_(o)]},z=e=>{const t=new Map;for(const n of e)t.set(n,(t.get(n)??0)+1);return f([...t.entries()].map(([n,i])=>{const s=I[n];return i*(s??10)}))},F=e=>typeof e=="number"||typeof e=="bigint"?e>=Math.pow(10,7)?[!0,v(BigInt(e))]:[!1,e.toLocaleString()]:[!1,e];try{u.displayName="Numeric",u.__docgenInfo={description:`A component that displays a numeric value or a string message. The message
type can be:

1. \`number\`
2. \`bigint\`
3. \`string\`

When the value is a string, no special processing is performed.

When it is numeric, we normalize with no loss of precision into \`bigint\` and
format so:

1. If the value \`< 10⁷\` we display the number/bigint as a nice locale string.
2. If the value \`≥ 10⁷\` we display the number/bigint in exponential notation,
   but add a tooltip with the full expansion of the value.

The element width will be set to the width of the displayed value. For string
input, you should supply the optional width because measurement is approximated.

If the computed/given width exceeds the given maximum width the element will
expand no more and the class \`truncate\` will be added to it. The tooltip
will still show the full expanded value.

No truncate/limit will be applied if the width is given explicitly.`,displayName:"Numeric",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | bigint"}},maxWidthPx:{defaultValue:null,description:"",name:"maxWidthPx",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},sizeFactor:{defaultValue:{value:"1"},description:"",name:"sizeFactor",required:!1,type:{name:"number"}}}}}catch{}export{u as N,_ as p};
