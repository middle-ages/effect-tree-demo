import{j as d}from"./jsx-runtime-HuQK5u_o.js";import{c as u,t as b,l as y,b as v,n as P,d as N,e as z,o as _,q as I,v as q}from"./index-BE5-cIaP.js";import{b as B}from"./Number-CT04UDZK.js";const S=e=>(...t)=>{const n={};for(const i of t)n[i]=e;return n},x=8,M=16,V={...v(_(0,9),N(z),P(S(x))),e:7.104,"+":12.448,",":4.438,".":4.448},j=8,F=4,T=2,c=e=>j+(e?T:F),l=({id:e,value:t,maxWidthPx:n,width:i,fontSizePx:o=16,className:a,style:s,isFlat:r=!1})=>{const[m,p]=O(t),[h,w]=i===void 0&&n!==void 0?W(r,n,p,o):[!1,`calc(${i??"0"} + ${u(c(r))})`],g=m||h?t.toLocaleString():"";return d.jsxs(d.Fragment,{children:[d.jsx("span",{tabIndex:r?-1:0,className:b(r?"numeric-flat":"numeric-beveled",h&&"truncate",a),id:e,title:g,style:{width:w,...i!==void 0&&{textAlign:"right"},...s},children:p})," "]})},W=(e,t,n,i)=>{const o=i/M,a=A(n)*o,s=t-c(e),r=Math.min(a,s)+c(e);return[a>=s,u(r)]},f=new Map,A=e=>{const t=f.get(e);if(t!==void 0)return t;const n=new Map;for(const o of e)n.set(o,(n.get(o)??0)+1);const i=y([...n.entries()].map(([o,a])=>{const s=V[o];return a*(s??10)}));return f.set(e,i),i},O=e=>typeof e=="number"||typeof e=="bigint"?e>=Math.pow(10,36)?[!0,B(BigInt(e))]:[!1,e.toLocaleString()]:[!1,e];l.Flat=I(l,"isFlat")(!0);l.FixedWidth=q(({digits:e,...t})=>({...t,width:u(e*x)}))(l);try{l.displayName="Numeric",l.__docgenInfo={description:`A component that displays a numeric value. The message type can be:

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

No truncate/limit will be applied if the width is given explicitly.`,displayName:"Numeric",props:{value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string | number | bigint"}},maxWidthPx:{defaultValue:null,description:"",name:"maxWidthPx",required:!1,type:{name:"number"}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},fontSizePx:{defaultValue:{value:"16"},description:"",name:"fontSizePx",required:!1,type:{name:"number"}},isFlat:{defaultValue:{value:"false"},description:"",name:"isFlat",required:!1,type:{name:"boolean"}}}}}catch{}export{l as N};
