import{S as g,i as I,s as b,e as o,t as j,k as L,c as m,a as h,h as D,d as f,m as w,b as u,g as x,J as d,K as p,L as z,j as E,n as y}from"../chunks/index-c4d2f1e5.js";function S(r){let e,s,c,i,t,l,v;return{c(){e=o("div"),s=o("div"),c=j(r[1]),i=L(),t=o("input"),this.h()},l(a){e=m(a,"DIV",{class:!0});var n=h(e);s=m(n,"DIV",{class:!0});var _=h(s);c=D(_,r[1]),_.forEach(f),i=w(n),t=m(n,"INPUT",{maxlength:!0,class:!0}),n.forEach(f),this.h()},h(){u(s,"class","label svelte-181c3y5"),u(t,"maxlength","1"),u(t,"class","svelte-181c3y5"),u(e,"class","decoderInput svelte-181c3y5")},m(a,n){x(a,e,n),d(e,s),d(s,c),d(e,i),d(e,t),p(t,r[0]),l||(v=z(t,"input",r[2]),l=!0)},p(a,[n]){n&2&&E(c,a[1]),n&1&&t.value!==a[0]&&p(t,a[0])},i:y,o:y,d(a){a&&f(e),l=!1,v()}}}function V(r,e,s){let{emoji:c="\u{1F351}"}=e,{currentLetter:i="-"}=e;function t(){i=this.value,s(0,i)}return r.$$set=l=>{"emoji"in l&&s(1,c=l.emoji),"currentLetter"in l&&s(0,i=l.currentLetter)},[i,c,t]}class q extends g{constructor(e){super(),I(this,e,V,S,b,{emoji:1,currentLetter:0})}}export{q as default};
