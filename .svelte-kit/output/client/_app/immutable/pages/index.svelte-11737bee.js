import{S as Y,i as Z,s as ee,x as te,y as re,z as ne,M as le,r as T,p as O,C as ae,e as k,t as w,k as A,c as b,a as q,h as D,d as $,m as B,b as R,g as se,J as o,K as G,L as ie,q as oe,j as N,N as ce,O as ue,P as de,o as pe}from"../chunks/index-c4d2f1e5.js";import he from"./DecoderInput.svelte-14143a22.js";function Q(r,a,l){const c=r.slice();return c[8]=a[l],c[9]=a,c[10]=l,c}function U(r){let a,l,c;function _(n){r[5](n,r[8])}let L={emoji:r[8].emoji};return r[8].currentLetter!==void 0&&(L.currentLetter=r[8].currentLetter),a=new he({props:L}),ue.push(()=>de(a,"currentLetter",_)),{c(){te(a.$$.fragment)},l(n){re(a.$$.fragment,n)},m(n,y){ne(a,n,y),c=!0},p(n,y){r=n;const p={};y&2&&(p.emoji=r[8].emoji),!l&&y&2&&(l=!0,p.currentLetter=r[8].currentLetter,le(()=>l=!1)),a.$set(p)},i(n){c||(T(a.$$.fragment,n),c=!0)},o(n){O(a.$$.fragment,n),c=!1},d(n){ae(a,n)}}}function fe(r){let a,l,c,_,L,n,y,p,C,d,h,u=r[2](r[0])+"",m,f,v,x,V,z,H,J,S=r[3](r[0],r[1])+"",P,j,K,X,E=r[1],s=[];for(let e=0;e<E.length;e+=1)s[e]=U(Q(r,E,e));const W=e=>O(s[e],1,1,()=>{s[e]=null});return{c(){a=k("div"),l=k("div"),c=k("h1"),_=w("Decoder"),L=A(),n=k("textarea"),y=A(),p=k("div");for(let e=0;e<s.length;e+=1)s[e].c();C=A(),d=k("p"),h=w("uniqueCharacters(ciphertext): "),m=w(u),f=A(),v=k("br"),x=w(`
      ciphertext: `),V=w(r[0]),z=A(),H=k("br"),J=w(`
      output: `),P=w(S),this.h()},l(e){a=b(e,"DIV",{class:!0});var i=q(a);l=b(i,"DIV",{class:!0});var t=q(l);c=b(t,"H1",{});var I=q(c);_=D(I,"Decoder"),I.forEach($),L=B(t),n=b(t,"TEXTAREA",{class:!0,placeholder:!0}),q(n).forEach($),y=B(t),p=b(t,"DIV",{class:!0});var F=q(p);for(let M=0;M<s.length;M+=1)s[M].l(F);F.forEach($),C=B(t),d=b(t,"P",{});var g=q(d);h=D(g,"uniqueCharacters(ciphertext): "),m=D(g,u),f=B(g),v=b(g,"BR",{}),x=D(g,`
      ciphertext: `),V=D(g,r[0]),z=B(g),H=b(g,"BR",{}),J=D(g,`
      output: `),P=D(g,S),g.forEach($),t.forEach($),i.forEach($),this.h()},h(){R(n,"class","ciphertext svelte-1e9k5yd"),R(n,"placeholder","ciphertext"),R(p,"class","inputs svelte-1e9k5yd"),R(l,"class","decoder svelte-1e9k5yd"),R(a,"class","container svelte-1e9k5yd")},m(e,i){se(e,a,i),o(a,l),o(l,c),o(c,_),o(l,L),o(l,n),G(n,r[0]),o(l,y),o(l,p);for(let t=0;t<s.length;t+=1)s[t].m(p,null);o(l,C),o(l,d),o(d,h),o(d,m),o(d,f),o(d,v),o(d,x),o(d,V),o(d,z),o(d,H),o(d,J),o(d,P),j=!0,K||(X=ie(n,"input",r[4]),K=!0)},p(e,[i]){if(i&1&&G(n,e[0]),i&2){E=e[1];let t;for(t=0;t<E.length;t+=1){const I=Q(e,E,t);s[t]?(s[t].p(I,i),T(s[t],1)):(s[t]=U(I),s[t].c(),T(s[t],1),s[t].m(p,null))}for(pe(),t=E.length;t<s.length;t+=1)W(t);oe()}(!j||i&1)&&u!==(u=e[2](e[0])+"")&&N(m,u),(!j||i&1)&&N(V,e[0]),(!j||i&3)&&S!==(S=e[3](e[0],e[1])+"")&&N(P,S)},i(e){if(!j){for(let i=0;i<E.length;i+=1)T(s[i]);j=!0}},o(e){s=s.filter(Boolean);for(let i=0;i<s.length;i+=1)O(s[i]);j=!1},d(e){e&&$(a),ce(s,e),K=!1,X()}}}function _e(r,a,l){const c=h=>{let u=h.replace(/\s+/g,"");return[...new Set([...u])]};let _=`\u{1F952}\u{1F347}
\u{1F9C4}\u{1F352}\u{1FAD2}
\u{1FAD2}\u{1F95D}\u{1F349}\u{1F349}\u{1F95D}\u{1F965}\u{1F34A}
\u{1F95D}\u{1F965}
\u{1F352}
\u{1F349}\u{1F951}\u{1F352}\u{1FAD2}\u{1F952}
\u{1F350}\u{1F352}\u{1F965}
\u{1F9C4}\u{1F95D}\u{1F349}\u{1F952}
\u{1F952}\u{1F95D}\u{1F34A}\u{1F952}
\u{1FAD2}\u{1F349}\u{1F951}\u{1F347}\u{1F347}\u{1F349}
\u{1F350}\u{1F351}\u{1F352}\u{1FAD2}\u{1FAD2}`;const L=h=>c(h).map(u=>({emoji:u,currentLetter:""})),n=(h,u,m)=>{let f=h,v=f.replace(u,m);for(;f!=v;)f=v,v=f.replace(u,m);return f},y=(h,u)=>{let m=h;return u.forEach(f=>{let v=f.currentLetter;v==""&&(v=f.emoji),m=n(m,f.emoji,v)}),m};let p;function C(){_=this.value,l(0,_)}function d(h,u){r.$$.not_equal(u.currentLetter,h)&&(u.currentLetter=h,l(1,p),l(0,_))}return r.$$.update=()=>{r.$$.dirty&1&&l(1,p=L(_))},[_,p,c,y,C,d]}class ge extends Y{constructor(a){super(),Z(this,a,_e,fe,ee,{})}}export{ge as default};