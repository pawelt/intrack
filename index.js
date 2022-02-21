(()=>{var $=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},oe=(e,t)=>{let r=e.parentElement;if(!r)return null;let o=r.replaceChild(t,e);return t.onMount&&t.onMount(),o},j=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},v=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},dt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let o=j(e);o&&(o.innerHTML=""+t)},mt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let o=j(e);return o?.innerHTML!==void 0?o.innerHTML:t},Z=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let o=j(e);o&&(o.value=""+t)},X=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let o=j(e);return o?o.value:t},ft=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},ht=(e,t,r)=>{t.querySelectorAll(e).forEach(o=>{let{xname:a,xid:s}=o.dataset;if(!a||!s)return;let i=j({el:r,xname:a,xid:s});!i||!i.parentElement||oe(i,o)})};var jr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[jr(a.substring(5))]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&o.setAttribute(a,""+s),o[a]=s)}),r.flat().forEach(a=>$(o,typeof a=="object"?a:document.createTextNode(a))),o},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>$(r,typeof o=="object"?o:document.createTextNode(o))),r};var ee={},Gr=1,g=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let o="event-"+Gr++;return ee[o]=ee[o]||[],ee[o].push(t),{type:o,callback:t}},x=(e,t)=>{let r=0,{type:o}=e({});for(let a of ee[o]||[])a(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(d=>i.append(c,d))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Fe=e=>({type:"router:navigate",payload:e}),ze=e=>{x(Fe,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),ze(t)};var yt=()=>ze(window.location.href);window.addEventListener("popstate",()=>ze(window.location.href));var wt="todos",Y=[],qe=e=>({type:"store:item-created",payload:e}),Kr=e=>({type:"store:item-updated",payload:e}),Be=e=>({type:"store:item-deleted",payload:e}),vt=()=>Y,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),je().then(()=>x(qe,{todo:t}))},Tt=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),je().then(()=>x(Kr,{todo:t}))):!1},It=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),je().then(()=>x(Be,{todoId:e})))},St=async()=>{Y=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:Y})},je=async()=>{localStorage.setItem(wt,JSON.stringify(Y))};var kt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Mt=e=>fetch(`${kt}?target=${e}`),Ct=(e,t)=>fetch(`${kt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Ee=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Mt(r)).json(),{ISIN:a,LONG_NAME:s}=o.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ge="instruments",P={},H=e=>({type:"store:instruments-updated",payload:e}),we=()=>Object.values(P),te=()=>P,Et=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ke().then(()=>x(H,{changes:[{instrument:t,op:"create"}]}))},Yr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ke().then(()=>x(H,{changes:[{instrument:r,op:"update"}]}))},Nt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ke().then(()=>x(H,{changes:[{instrument:t,op:"delete"}]}))},Jr=async()=>{P=JSON.parse(localStorage.getItem(Ge)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ke=async()=>{localStorage.setItem(Ge,JSON.stringify(P))},Lt=async e=>{localStorage.setItem(Ge,JSON.stringify(e)),P=e},Rt=window;Rt.quick_refresh=!1;var Qr=Rt.quick_refresh?.2:2,Zr=10,Pt=async()=>{let e=[];for(let t of we())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Qr*60*1e3){let r=Ee.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Yr(t),e.push({instrument:t,op:"update"}))}e.length&&x(H,{changes:e}),setTimeout(Pt,Zr*1e3)};Jr().then(()=>x(H,{changes:[]})).then(Pt);var Ye="wallets",U={},Xr=e=>({type:"store:wallet-created",payload:e}),en=e=>({type:"store:wallet-updated",payload:e}),tn=e=>({type:"store:wallets-updated",payload:e}),rn=e=>({type:"store:wallet-deleted",payload:e}),Je=()=>Object.values(U),ae=()=>U,At=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,Ze().then(()=>x(Xr,{wallet:t}))},Qe=async e=>{let{name:t=""}=e;return U[t]?(U[t]=e,Ze().then(()=>x(en,{wallet:e}))):!1},Ot=async e=>U[e]?(delete U[e],Ze().then(()=>x(rn,{name:e}))):!1,nn=async()=>{U=JSON.parse(localStorage.getItem(Ye)||"{}"),console.log({wallets:U})},Ze=async()=>{localStorage.setItem(Ye,JSON.stringify(U))},Dt=async e=>{localStorage.setItem(Ye,JSON.stringify(e)),U=e};nn().then(()=>x(tn,{}));var se=e=>t=>({type:e,payload:t}),I=(e="")=>se(e),et=(e="")=>se(e),Xe=e=>t=>{let r=t.target,{xname:o="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:o,xid:a,ev:t};s&&e==="click"?x(se(s.type),l):i&&e==="keyup"?x(se(i.type),l):c&&e==="keydown"?x(se(c.type),l):o&&x(se(`${o}:${e}`),l)},$t=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var Ut={};var Wt=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Ut[`${t}:${r}`]=e),e},Ht=(e="",t="")=>Ut[`${e}:${t}`];function on(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function an(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var _t=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(an(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=on(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var S="-ms-",ie="-moz-",m="-webkit-",Ne="comm",ce="rule",le="decl";var Vt="@import";var Le="@keyframes";var Ft=Math.abs,re=String.fromCharCode,zt=Object.assign;function qt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Re(e){return e.trim()}function Bt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ve(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function k(e){return e.length}function ue(e){return e.length}function pe(e,t){return t.push(e),e}function jt(e,t){return e.map(t).join("")}var Pe=1,de=1,Gt=0,E=0,b=0,fe="";function be(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:Pe,column:de,length:i,return:""}}function he(e,t){return zt(be("",null,null,"",null,null,0),e,{length:-e.length},t)}function Kt(){return b}function Yt(){return b=E>0?M(fe,--E):0,de--,b===10&&(de=1,Pe--),b}function N(){return b=E<Gt?M(fe,E++):0,de++,b===10&&(de=1,Pe++),b}function W(){return M(fe,E)}function Te(){return E}function ge(e,t){return J(fe,e,t)}function me(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ae(e){return Pe=de=1,Gt=k(fe=e),E=0,[]}function Oe(e){return fe="",e}function xe(e){return Re(ge(E-1,tt(e===91?e+2:e===40?e+1:e)))}function Jt(e){for(;(b=W())&&b<33;)N();return me(e)>2||me(b)>3?"":" "}function Qt(e,t){for(;--t&&N()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return ge(e,Te()+(t<6&&W()==32&&N()==32))}function tt(e){for(;N();)switch(b){case e:return E;case 34:case 39:e!==34&&e!==39&&tt(b);break;case 40:e===41&&tt(e);break;case 92:N();break}return E}function Zt(e,t){for(;N()&&e+b!==47+10;)if(e+b===42+42&&W()===47)break;return"/*"+ge(t,E-1)+"*"+re(e===47?e:N())}function Xt(e){for(;!me(W());)N();return ge(e,E)}function rr(e){return Oe(De("",null,null,null,[""],e=Ae(e),0,[0],e))}function De(e,t,r,o,a,s,i,c,l){for(var d=0,p=0,h=i,L=0,B=0,D=0,y=1,R=1,T=1,C=0,V="",ye=a,G=s,F=o,w=V;R;)switch(D=C,C=N()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){ve(w+=f(xe(C),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:w+=xe(C);break;case 9:case 10:case 13:case 32:w+=Jt(D);break;case 92:w+=Qt(Te()-1,7);continue;case 47:switch(W()){case 42:case 47:pe(sn(Zt(N(),Te()),t,r),l);break;default:w+="/"}break;case 123*y:c[d++]=k(w)*T;case 125*y:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+p:B>0&&k(w)-h&&pe(B>32?tr(w+";",o,r,h-1):tr(f(w," ","")+";",o,r,h-2),l);break;case 59:w+=";";default:if(pe(F=er(w,t,r,d,p,a,c,V,ye=[],G=[],h),s),C===123)if(p===0)De(w,t,F,F,ye,s,h,c,G);else switch(L){case 100:case 109:case 115:De(e,F,F,o&&pe(er(e,F,F,0,0,a,c,V,a,ye=[],h),G),a,G,h,c,o?ye:G);break;default:De(w,F,F,F,[""],G,0,c,G)}}d=p=B=0,y=T=1,V=w="",h=i;break;case 58:h=1+k(w),B=D;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&Yt()==125)continue}switch(w+=re(C),C*y){case 38:T=p>0?1:(w+="\f",-1);break;case 44:c[d++]=(k(w)-1)*T,T=1;break;case 64:W()===45&&(w+=xe(N())),L=W(),p=h=k(V=w+=Xt(Te())),C++;break;case 45:D===45&&k(w)==2&&(y=0)}}return s}function er(e,t,r,o,a,s,i,c,l,d,p){for(var h=a-1,L=a===0?s:[""],B=ue(L),D=0,y=0,R=0;D<o;++D)for(var T=0,C=J(e,h+1,h=Ft(y=i[D])),V=e;T<B;++T)(V=Re(y>0?L[T]+" "+C:f(C,/&\f/g,L[T])))&&(l[R++]=V);return be(e,t,r,a===0?ce:c,l,d,p)}function sn(e,t,r){return be(e,t,r,Ne,re(Kt()),J(e,2,-2),0)}function tr(e,t,r,o){return be(e,t,r,le,J(e,0,o),J(e,o+1,-1),o)}function rt(e,t){switch(qt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ie+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ie+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ve(e,"stretch")?rt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~ve(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function Q(e,t){for(var r="",o=ue(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function nr(e,t,r,o){switch(e.type){case Vt:case le:return e.return=e.return||e.value;case Ne:return"";case Le:return e.return=e.value+"{"+Q(e.children,o)+"}";case ce:e.value=e.props.join(",")}return k(r=Q(e.children,o))?e.return=e.value+"{"+r+"}":""}function or(e){var t=ue(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function ar(e){return function(t){t.root||(t=t.return)&&e(t)}}function sr(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case le:e.return=rt(e.value,e.length);break;case Le:return Q([he(e,{value:f(e.value,"@","@"+m)})],o);case ce:if(e.length)return jt(e.props,function(a){switch(Bt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([he(e,{props:[f(a,/:(read-\w+)/,":"+ie+"$1")]})],o);case"::placeholder":return Q([he(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),he(e,{props:[f(a,/:(plac\w+)/,":"+ie+"$1")]}),he(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],o)}return""})}}function cn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var ir=cn;var ln=function(t,r,o){for(var a=0,s=0;a=s,s=W(),a===38&&s===12&&(r[o]=1),!me(s);)N();return ge(t,E)},un=function(t,r){var o=-1,a=44;do switch(me(a)){case 0:a===38&&W()===12&&(r[o]=1),t[o]+=ln(E-1,r,o);break;case 2:t[o]+=xe(a);break;case 4:if(a===44){t[++o]=W()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=re(a)}while(a=N());return t},pn=function(t,r){return Oe(un(Ae(t),r))},cr=new WeakMap,dn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!cr.get(o))&&!a){cr.set(t,!0);for(var s=[],i=pn(r,s),c=o.props,l=0,d=0;l<i.length;l++)for(var p=0;p<c.length;p++,d++)t.props[d]=s[l]?i[l].replace(/&\f/g,c[p]):c[p]+" "+i[l]}}},mn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var fn=[sr],hn=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(y){var R=y.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var a=t.stylisPlugins||fn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var R=y.getAttribute("data-emotion").split(" "),T=1;T<R.length;T++)s[R[T]]=!0;c.push(y)});var l,d=[dn,mn];{var p,h=[nr,ar(function(y){p.insert(y)})],L=or(d.concat(a,h)),B=function(R){return Q(rr(R),L)};l=function(R,T,C,V){p=C,B(R?R+"{"+T.styles+"}":T.styles),V&&(D.inserted[T.name]=!0)}}var D={key:r,sheet:new _t({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},lr=hn;function gn(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var ur=gn;var xn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pr=xn;var yn=/[A-Z]|^ms/g,wn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,hr=function(t){return t.charCodeAt(1)===45},dr=function(t){return t!=null&&typeof t!="boolean"},nt=ir(function(e){return hr(e)?e:e.replace(yn,"-$&").toLowerCase()}),mr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(wn,function(o,a,s){return z={name:a,styles:s,next:z},a})}return pr[t]!==1&&!hr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ie(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)z={name:o.name,styles:o.styles,next:z},o=o.next;var a=r.styles+";";return a}return vn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Ie(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var d=t[r];return d!==void 0?d:r}function vn(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=Ie(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":dr(i)&&(o+=nt(s)+":"+mr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)dr(i[c])&&(o+=nt(s)+":"+mr(s,i[c])+";");else{var l=Ie(e,t,i);switch(s){case"animation":case"animationName":{o+=nt(s)+":"+l+";";break}default:o+=s+"{"+l+"}"}}}return o}var fr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,$e=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ie(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ie(o,r,t[c]),a&&(s+=i[c]);var l;fr.lastIndex=0;for(var d="",p;(p=fr.exec(s))!==null;)d+="-"+p[1];var h=ur(s)+d;return{name:h,styles:s,next:z}};var bn=!0;function ot(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var gr=function(t,r,o){var a=t.key+"-"+r.name;if((o===!1||bn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function xr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function yr(e,t,r){var o=[],a=ot(e,o,r);return o.length<2?r:a+t(o)}var Tn=function(t){var r=lr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=$e(d,r.registered,void 0);return gr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=$e(d,r.registered),L="animation-"+h.name;return xr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=$e(d,r.registered);xr(r,h)},i=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];return yr(r.registered,o,In(d))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(d){r.inserted[d]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ot.bind(null,r.registered),merge:yr.bind(null,r.registered,o)}},In=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},wr=Tn;var q=wr({key:"css"}),ba=q.flush,Ta=q.hydrate,vr=q.cx,Ia=q.merge,Sa=q.getRegisteredStyles,br=q.injectGlobal,Ma=q.keyframes,_=q.css,Ca=q.sheet,ka=q.cache;var Sn=_`
  cursor: pointer;
`,Mn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...o}={...e};o.disabled||delete o.disabled;let a=`${o.variant==="text"?Mn:Sn} ${r}`;return n("button",{class:a,...o},t)},at=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+gt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&xt(s)},...r},t)};var Tr="view-home",Ir=()=>{let e=Ht(Tr),t=Wt(n("div",{xname:Tr},"Home rendered ",n("strong",{xname:"xxx"},+mt({el:e,xname:"xxx"},0)+1)," times.",n("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||n("input",{xname:"yyy",value:"test "}),n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Ue=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var Da=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),Cn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),kn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var st=e=>{let t=Cn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},O=e=>kn.format(e),Se=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,o=typeof t=="string"?new Date(t):t,a=Math.floor((o.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var En=_`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='new-instrument'] {
    width: 500px;
    font-size: 0.8rem;
  }
  [data-xname='instrument-list'] {
    width: 100%;
    border-collapse: collapse;
    border: 0;
    font-size: 0.85rem;
    .right {
      text-align: right;
    }
    .updatedAgo {
      font-size: 0.9rem;
      width: 120px;
    }
    tr:nth-child(even) {
      background-color: #efefef;
    }
    td {
      padding: 0.4rem 0.8rem;
    }
    td:first-child,
    th:first-child {
      padding-left: 0.4rem;
    }
  }
`,lt,We,Sr=({changes:e})=>{if(ne()==="instruments")if(!e.length)K(We,n(On,null));else for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":$(We,n(ct,{instrument:t.instrument}));break;case"update":r&&oe(r,n(ct,{instrument:t.instrument}));break;case"delete":r?.remove();break}}};g(H,Sr);var it=()=>lt.value="",Nn=g(I(),it),Ln=g(I(),async()=>{let e=lt.value,t=Ee.find(o=>o.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(te()[r.code||""]){it();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Et(r),it()}),Rn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Nt(e)}),Pn=()=>n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),An=()=>n("div",null,n("input",{xname:"new-instrument"}),"  ",n(A,{xclick:Ln},"Add instrument"),"  ",n(A,{xclick:Nn,variant:"text"},"Clear")),On=()=>n(u,null,we().map(e=>n(ct,{instrument:e}))),ct=({instrument:e})=>n("tr",{xname:"instrument",xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",null,e.isin),n("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Se(e.latestUpdate)),n("td",null,n(A,{xclick:Rn,xid:e.code,variant:"text"},"Delete"))),Mr=()=>{let e=n("div",{class:En},n(Pn,null),n(An,null),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:"instrument-list"}));return e.onMount=()=>{lt=v({xname:"new-instrument"}),We=v({xname:"instrument-list"}),Sr({changes:[]}),Cr(),console.log("ViewInstruments mounted!")},e},Cr=()=>{ne()==="instruments"&&(We.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Se(t.dataset.latestUpdate||"")}),setTimeout(Cr,5e3))};var Dn=_`
  -label: view-wallets;

  [data-xname='new-wallet-name'] {
    width: 200px;
    font-size: 0.8rem;
  }

  [data-xname='wallet-list'] {
    width: 100%;
    margin-top: 10px;
  }

  [data-xname='wallet'] {
    margin-bottom: 2rem;
    [data-xname='wallet-title'] {
      position: relative;
      cursor: pointer;
      background-color: #cca;

      & > * {
        padding: 0.2rem 0.5rem;
      }

      .toggle-instruments {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .delete-wallet {
        position: relative;
      }

      .name {
        font-size: 1.2rem;
        margin-right: 1rem;
        display: inline-block;
        min-width: 150px;
      }
      [data-xname='updated-ago'] {
        display: inline-block;
        font-size: 0.85rem;
      }
      .summary {
        font-size: 0.85rem;
        & > div {
          display: inline-block;
          margin-right: 1.5rem;
        }
      }
    }
    [data-xname='instruments'] {
      border-collapse: collapse;
      border: 0;
      font-size: 0.85rem;

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      display: none;
      &.expanded {
        display: block;
        animation: fade-in 0.8s;
      }

      tr:nth-child(even) {
        background-color: #efefef;
      }
      td,
      th {
        padding: 0.3rem 0;
      }
      td:first-child,
      th:first-child {
        padding-left: 0.4rem;
      }
      td:last-child,
      th:last-child {
        padding-right: 0.4rem;
      }
      .instrument-name {
        text-align: left;
      }
      .price {
        text-align: right;
        width: 100px;
        input {
          width: 80px;
          text-align: right;
        }
      }
      .percent {
        text-align: right;
        width: 60px;
      }
      .date {
        width: 130px;
        text-align: right;
      }
      .actions {
        text-align: right;
        width: 100px;
      }
      [data-xname='wallet-total'] {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,ut,Ce,Me={},kr=()=>{ut.value=""},Er=e=>{Z({el:e,xname:"wallet-new-total-price"},""),Z({el:e,xname:"wallet-new-unit-price"},""),Z({el:e,xname:"wallet-new-date"},st(new Date)),Z({el:e,xname:"wallet-new-instrument"},"")},Nr=({changes:e}={})=>{if(ne()!=="wallets")return;let t=n(u,null,Je().map(o=>n($r,{wallet:o}))),r=ft();ht(".new-instrument-field",Ce,t),K(Ce,t),r.focus()};g(H,Ue(Nr,500));var $n=g(I(),kr),Un=g(I(),({xid:e=""})=>{Er(v({xname:"wallet",xid:e}))}),Wn=g(I(),({xid:e=""})=>{Me[e]=!Me[e],v({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),Hn=g(I(),async()=>{let e=ut?.value||"";if(!e)return;let t={name:e,comment:"",instruments:[]};await At(t),kr(),Me[e]=!0,$(Ce,n($r,{wallet:t}))}),_n=g(I(),async({xid:e=""})=>{!ae()[e]||!confirm(`Delete wallet ${e}?`)||(await Ot(e),v({el:Ce,xname:"wallet",xid:e}).remove())}),Lr=e=>{oe(v({xname:"wallet-total",xid:e.name}),n(Ar,{wd:e})),oe(v({xname:"wallet-title",xid:e.name}),n(Or,{wd:e}))},Vn=g(I(),({xid:e=""})=>{let t=ae()[e];if(!t){alert("Wallet "+e+" not found");return}let r=v({xname:"wallet",xid:e}),o={id:Date.now(),code:X({el:r,xname:"wallet-new-instrument"},""),date:X({el:r,xname:"wallet-new-date"},""),totalPrice:+X({el:r,xname:"wallet-new-total-price"},""),unitPrice:+X({el:r,xname:"wallet-new-unit-price"},"")};t.instruments.push(o),Qe(t);let a=pt(t);Lr(a),Er(r),$(v({el:r,xname:"instrument-list"}),n(Dr,{ins:a.instruments.slice(-1)[0],walletName:a.name}))}),Fn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),o=ae()[t],a=o.instruments.find(({id:s})=>""+s===r);!o||!confirm(`Delete instrument ${a?.code} from wallet ${o.name}?`)||(o.instruments=o.instruments.filter(({id:s})=>""+s!==r),Qe(o),Lr(pt(o)),v({xid:e}).remove())}),Rr=e=>{let t=te();return Se(e.reduce((r,o)=>{let a=t[o.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Pr=()=>{ne()==="wallets"&&(Je().forEach(e=>dt({xname:"updated-ago",xid:e.name},Rr(e.instruments))),setTimeout(Pr,5*1e3))},pt=e=>{let t=te(),r=e.instruments.map(s=>{let i=t[s.code]?.latestPrice||0,c=s.totalPrice/s.unitPrice,l=i*c;return{id:s.id,instrumentName:t[s.code]?.name??"???",instrumentUrl:t[s.code]?.sourceUrl,instrumentType:t[s.code]?.type,change:l/s.totalPrice*100-100,currentTotal:l,currentUnit:i,unitCount:c,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:t[s.code]?.latestUpdate||""}}),o=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:o,totalPaid:a,changeValue:O(o-a),changePercent:O(o/a*100-100),updatedAgo:Rr(e.instruments)}},Ar=({wd:e})=>n("tr",{xname:"wallet-total",xid:e.name},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},e.changeValue),n("td",{class:"percent"},e.changePercent),n("td",{class:"price"},O(e.totalValue)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"},O(e.totalPaid)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"actions"})),Or=({wd:e})=>n("div",{xname:"wallet-title",xid:e.name},n("div",{xclick:Wn,class:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),n(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:_n},"Delete"),n("div",{class:"summary"},n("div",{class:""},"Change\xA0",n("b",null,e.changeValue),"\xA0(",n("b",null,e.changePercent,"%"),")"),n("div",{class:""},"Value ",n("b",null,O(e.totalValue))),n("div",{class:""},"Paid ",n("b",null,O(e.totalPaid))))),Dr=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return n("tr",{xid:r},n("td",{class:"instrument-name"},n("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),n("td",{class:"price"},O(e.currentTotal-e.paidTotal)),n("td",{class:"percent"},O(e.change)),n("td",{class:"price"},O(e.currentTotal)),n("td",{class:"price"},O(e.currentUnit)),n("td",{class:"price"},O(e.unitCount)),n("td",{class:"price"},O(e.paidTotal)),n("td",{class:"price"},O(e.paidUnit)),n("td",{class:"date"},e.paidDate),n("td",{class:"actions"},n(A,{xclick:Fn,xid:r,variant:"text"},"Delete")))},zn=({wallet:e})=>n("tr",null,n("td",null,n("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},n("option",{value:""}),we().map(t=>n("option",{value:t.code},"(",t.type,") ",t.name)))),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),n("td",{class:"date"},n("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:st(new Date),class:"new-instrument-field"})),n("td",{class:"actions"},n(A,{xclick:Vn,xid:e.name},"Add"),n(A,{xclick:Un,xid:e.name,variant:"text"},"Clear"))),$r=({wallet:e})=>{let t=pt(e);return n("div",{xname:"wallet",xid:e.name},n(Or,{wd:t}),n("table",{xname:"instruments",xid:e.name,class:vr({expanded:Me[e.name]})},n("thead",null,n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"}))),n("tbody",{xname:"instrument-list"},t.instruments.map(r=>n(Dr,{ins:r,walletName:t.name}))),n("tfoot",null,n(Ar,{wd:t}),n(zn,{wallet:e}))))},Ur=()=>{let e=n("div",{class:Dn},n("div",null,n("input",{xname:"new-wallet-name"}),"  ",n(A,{xclick:Hn},"Create wallet"),"  ",n(A,{xclick:$n,variant:"text"},"Clear")),n("div",{xname:"wallet-list"}));return e.onMount=()=>{ut=v({xname:"new-wallet-name"}),Ce=v({xname:"wallet-list"}),Nr(),Pr(),console.log("ViewWallets mounted!")},e};var He,ke,Wr=()=>{ke.focus();let e=ke.value.trim();!e||(ke.value="",bt(e))},qn=Ue((e,t)=>{Tt({done:!1,text:t,id:e})},500),Bn=g(I(),({xid:e=""})=>It(e)),jn=g(I(),Wr),Gn=g(et(),({ev:e})=>{e.key==="Enter"&&Wr()}),Kn=g(et(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&qn(t,r)});g(Be,({todoId:e})=>{v({el:He,xname:"todo",xid:e}).remove()});g(qe,({todo:e})=>{$(He,n(Hr,{todo:e}))});var Hr=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xclick:Bn,xid:e.id}," X "),"\xA0",n("input",{xkeyup:Kn,xid:e.id,value:e.text})),_r=()=>{let e=n("div",null,n("div",null,n("input",{xkeyup:Gn,xname:"new-item-text"}),"\xA0",n("button",{xclick:jn},"Add")),n("ol",{xname:"items"}));return e.onMount=async()=>{He=v({xname:"items"}),ke=v({xname:"new-item-text"}),ke.focus(),await St(),K(He,...vt().map(t=>n(Hr,{todo:t}))),console.log("ViewTodo mounted!")},e};var Yn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,_e;g(I("migration-export:click"),()=>{let e=ae(),t=te();Z(_e,JSON.stringify({instruments:t,wallets:e},null,2)),_e.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(X(_e,""));console.log({wallets:e,instruments:t}),await Lt(t),await Dt(e),x(H,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var Vr=()=>{let e=n("div",{class:Yn},n("div",null,n(A,{xname:"migration-export"},"Export from LS")," ",n(A,{xname:"migration-import"},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{_e=v({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Ve={home:{label:"Home",Component:Ir},wallets:{label:"Wallets",Component:Ur},instruments:{label:"Instruments",Component:Mr},todo:{label:"Todo",Component:_r},migration:{label:"Data migration",Component:Vr}},ne=()=>new URLSearchParams(window.location.search).get("view")||"home",Fr=()=>{let{Component:e,label:t}=Ve[ne()]||Ve.home;return{Component:e,label:t}};var Jn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,zr=()=>{let[,...e]=Object.entries(Ve);return n("div",{class:Jn},n(at,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(u,null,o>0?" | ":"",n(at,{view:t},r.label))))};br`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    //margin: 0 auto;
    width: 1000px;
    margin: 0 auto;
    overflow-y: scroll;
    //background: lime;
  }
  .app {
    min-width: 1000px;
    //width: 100%;
  }
  a {
    color: blue;
    text-decoration: none;
  }
  h1 { /* app title */
    display: inline-block;
    margin: 0;
    margin-right: 20px;
    font-size: 1.5rem;
    color: black;

  }
  h2 {
    font-size: 1.2rem;
  }
  input[type="date"] {
    padding: 0;
    font-size: 13px;
    width: 115px;
  }
  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    margin: 0;
    padding: 1px;
  }

`;var qr;g(Fe,()=>{let{Component:e}=Fr();K(qr,n(e,null))});var Br=()=>{let e=n("div",{class:"app"},n(zr,null),n("hr",null),n("div",{xname:"current-view"}));return e.onMount=()=>{qr=v({xname:"current-view"}),console.log("App mounted!")},e};$t();$(document.body,n(Br,null));yt();})();
