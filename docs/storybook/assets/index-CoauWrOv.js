import{j as c}from"./jsx-runtime-CG1xpAJ6.js";import{c as u,t as f,k as y,b as v,l as P,d as N,e as S,n as _,o as z,q as F}from"./index-BSv6a1fl.js";const I=e=>{const t=e.toString(),n=t.length-1;if(n===0)return t+"e+0";let i=t.charAt(0);return t.length>1&&(i+="."+t.slice(1)),i+"e+"+n.toString()},q=e=>(...t)=>{const n={};for(const i of t)n[i]=e;return n},g=8,M=16,V={...v(_(0,9),N(S),P(q(g))),e:7.104,"+":12.448,",":4.438,".":4.448},d=12,s=({id:e,value:t,maxWidthPx:n,width:i,fontSizePx:a=16,className:o,style:r,isFlat:l=!1})=>{const[w,m]=B(t),[p,x]=i===void 0&&n!==void 0?j(n,m,a):[!1,`calc(${i??"0"} + ${u(d)})`],b=w||p?t.toLocaleString():"";return c.jsxs(c.Fragment,{children:[c.jsx("span",{tabIndex:l?-1:0,className:f(l?"numeric-flat":"numeric-beveled",p&&"truncate",o),id:e,title:b,style:{width:x,...i!==void 0&&{textAlign:"right",paddingRight:4.5},...r},children:m})," "]})},j=(e,t,n)=>{const i=n/M,a=A(t)*i,o=e-d,r=Math.min(a,o)+d;return[a>=o,u(r)]},h=new Map,A=e=>{const t=h.get(e);if(t!==void 0)return t;const n=new Map;for(const a of e)n.set(a,(n.get(a)??0)+1);const i=y([...n.entries()].map(([a,o])=>{const r=V[a];return o*(r??10)}));return h.set(e,i),i},B=e=>typeof e=="number"||typeof e=="bigint"?e>=Math.pow(10,36)?[!0,I(BigInt(e))]:[!1,e.toLocaleString()]:[!1,e];s.Flat=z(s,"isFlat")(!0);s.FixedWidth=F(({digits:e,className:t,...n})=>({...n,width:u(e*g),className:f("text-right",t)}))(s);try{s.displayName="Numeric",s.__docgenInfo={description:`A component that displays a numeric value. The message type can be:

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

No truncate/limit will be applied if the width is given explicitly.`,displayName:"Numeric",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | bigint"}},maxWidthPx:{defaultValue:null,description:"",name:"maxWidthPx",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},fontSizePx:{defaultValue:{value:"16"},description:"",name:"fontSizePx",required:!1,type:{name:"number"}},isFlat:{defaultValue:{value:"false"},description:"",name:"isFlat",required:!1,type:{name:"boolean"}}}}}catch{}export{s as N};
