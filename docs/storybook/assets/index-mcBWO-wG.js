import{j as d}from"./jsx-runtime-DoGwtFLm.js";import{c as u,h as P,v as z,b as N,w as I,d as _,i as q,x as B,y as S,z as V}from"./index-BVtw-P1L.js";import{b as M,n as j}from"./Number-CddmtPRa.js";const C=e=>(...t)=>{const n={};for(const i of t)n[i]=e;return n},g=8,F=16,T={...N(B(0,9),_(q),I(C(g))),e:7.104,"+":12.448,",":4.438,".":4.448},W=8,A=4,O=2,c=e=>W+(e?O:A),l=({id:e,value:t,maxWidthPx:n,width:i,fontSizePx:a=16,className:o,style:s,isFlat:r=!1,onChange:m=j})=>{const[x,p]=R(t),[h,w]=i===void 0&&n!==void 0?E(r,n,p,a):[!1,`calc(${i??"0"} + ${u(c(r))})`],b=x||h?t.toLocaleString():"";return d.jsxs(d.Fragment,{children:[d.jsx("input",{tabIndex:r?-1:0,pattern:"[1-9]\\d\\d\\d\\d",className:P(r?"numeric-flat":"numeric-beveled",h&&"truncate",o),id:e,title:b,style:{width:w,...i!==void 0&&{textAlign:"right"},...s},onChange:v=>{const y=v.target.value;m(parseInt(y))},value:p})," "]})},E=(e,t,n,i)=>{const a=i/F,o=L(n)*a,s=t-c(e),r=Math.min(o,s)+c(e);return[o>=s,u(r)]},f=new Map,L=e=>{const t=f.get(e);if(t!==void 0)return t;const n=new Map;for(const a of e)n.set(a,(n.get(a)??0)+1);const i=z([...n.entries()].map(([a,o])=>{const s=T[a];return o*(s??10)}));return f.set(e,i),i},R=e=>typeof e=="number"||typeof e=="bigint"?e>=Math.pow(10,36)?[!0,M(BigInt(e))]:[!1,e.toLocaleString()]:[!1,e];l.Flat=S(l,"isFlat")(!0);l.FixedWidth=V(({digits:e,...t})=>({...t,width:u(e*g)}))(l);try{l.displayName="Numeric",l.__docgenInfo={description:`A component that displays a numeric value. The message type can be:

1. \`number\`
2. \`bigint\`

We normalize with no loss of precision into \`bigint\` and format so:

1. If the value \`< 10³⁶\` we display the number/bigint as a nice locale string.
2. If the value \`≥ 10³⁶\` we display the number/bigint in exponential notation,
   but add a tooltip with the full expansion of the value.

The element width will be set to the width of the displayed value if none is
given.

If the computed/given width exceeds the given maximum width the element will
expand no more and the class \`truncate\` will be added to it. The tooltip
will still show the full expanded value.

No truncate/limit will be applied if the width is given explicitly.`,displayName:"Numeric",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | bigint"}},maxWidthPx:{defaultValue:null,description:"",name:"maxWidthPx",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},fontSizePx:{defaultValue:{value:"16"},description:"",name:"fontSizePx",required:!1,type:{name:"number"}},isFlat:{defaultValue:{value:"false"},description:"",name:"isFlat",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(n: number) => void"}}}}}catch{}export{l as N};
