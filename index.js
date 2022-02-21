(()=>{var $=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},ae=(e,t,r)=>{let o=e.replaceChild(t,r);return t.onMount&&t.onMount(),o},se=(e,t)=>e.removeChild(t),j=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},v=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},mt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let o=j(e);o&&(o.innerHTML=""+t)},ft=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let o=j(e);return o?.innerHTML!==void 0?o.innerHTML:t},X=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let o=j(e);o&&(o.value=""+t)},ee=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let o=j(e);return o?o.value:t},ht=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},gt=(e,t,r)=>{t.querySelectorAll(e).forEach(o=>{let{xname:a,xid:s}=o.dataset;if(!a||!s)return;let i=j({el:r,xname:a,xid:s});if(!i)return;let c=i.parentElement;!c||ae(c,o,i)})};var Gr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[Gr(a.substring(5))]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&o.setAttribute(a,""+s),o[a]=s)}),r.flat().forEach(a=>$(o,typeof a=="object"?a:document.createTextNode(a))),o},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>$(r,typeof o=="object"?o:document.createTextNode(o))),r};var te={},Kr=1,g=(e,t)=>{let{type:r}=e({});if(r)return te[r]=te[r]||[],te[r].push(t),{type:r,callback:t};let o="event-"+Kr++;return te[o]=te[o]||[],te[o].push(t),{type:o,callback:t}},x=(e,t)=>{let r=0,{type:o}=e({});for(let a of te[o]||[])a(t),r++;return r};var xt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},ze=e=>({type:"router:navigate",payload:e}),qe=e=>{x(ze,{newUrl:new URL(e)})},yt=e=>{let t=""+e;window.history.pushState(null,"",t),qe(t)};var wt=()=>qe(window.location.href);window.addEventListener("popstate",()=>qe(window.location.href));var vt="todos",Y=[],Be=e=>({type:"store:item-created",payload:e}),Yr=e=>({type:"store:item-updated",payload:e}),je=e=>({type:"store:item-deleted",payload:e}),bt=()=>Y,Tt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Ge().then(()=>x(Be,{todo:t}))},It=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Ge().then(()=>x(Yr,{todo:t}))):!1},St=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Ge().then(()=>x(je,{todoId:e})))},Mt=async()=>{Y=JSON.parse(localStorage.getItem(vt)||"[]"),console.log({todos:Y})},Ge=async()=>{localStorage.setItem(vt,JSON.stringify(Y))};var kt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Ct=e=>fetch(`${kt}?target=${e}`),Et=(e,t)=>fetch(`${kt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Re=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Et(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Et(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Ct(r)).json(),{ISIN:a,LONG_NAME:s}=o.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Ct(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ke="instruments",P={},H=e=>({type:"store:instruments-updated",payload:e}),Te=()=>Object.values(P),re=()=>P,Nt=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ye().then(()=>x(H,{changes:[{instrument:t,op:"create"}]}))},Jr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ye().then(()=>x(H,{changes:[{instrument:r,op:"update"}]}))},Lt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ye().then(()=>x(H,{changes:[{instrument:t,op:"delete"}]}))},Qr=async()=>{P=JSON.parse(localStorage.getItem(Ke)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ye=async()=>{localStorage.setItem(Ke,JSON.stringify(P))},Rt=async e=>{localStorage.setItem(Ke,JSON.stringify(e)),P=e},Pt=window;Pt.quick_refresh=!1;var Zr=Pt.quick_refresh?.2:2,Xr=10,At=async()=>{let e=[];for(let t of Te())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Zr*60*1e3){let r=Re.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Jr(t),e.push({instrument:t,op:"update"}))}e.length&&x(H,{changes:e}),setTimeout(At,Xr*1e3)};Qr().then(()=>x(H,{changes:[]})).then(At);var Je="wallets",U={},en=e=>({type:"store:wallet-created",payload:e}),tn=e=>({type:"store:wallet-updated",payload:e}),rn=e=>({type:"store:wallets-updated",payload:e}),nn=e=>({type:"store:wallet-deleted",payload:e}),Qe=()=>Object.values(U),ie=()=>U,Ot=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,Xe().then(()=>x(en,{wallet:t}))},Ze=async e=>{let{name:t=""}=e;return U[t]?(U[t]=e,Xe().then(()=>x(tn,{wallet:e}))):!1},Dt=async e=>U[e]?(delete U[e],Xe().then(()=>x(nn,{name:e}))):!1,on=async()=>{U=JSON.parse(localStorage.getItem(Je)||"{}"),console.log({wallets:U})},Xe=async()=>{localStorage.setItem(Je,JSON.stringify(U))},$t=async e=>{localStorage.setItem(Je,JSON.stringify(e)),U=e};on().then(()=>x(rn,{}));var ce=e=>t=>({type:e,payload:t}),I=(e="")=>ce(e),tt=(e="")=>ce(e),et=e=>t=>{let r=t.target,{xname:o="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:o,xid:a,ev:t};s&&e==="click"?x(ce(s.type),l):i&&e==="keyup"?x(ce(i.type),l):c&&e==="keydown"?x(ce(c.type),l):o&&x(ce(`${o}:${e}`),l)},Ut=()=>{document.addEventListener("click",et("click")),document.addEventListener("keyup",et("keyup")),document.addEventListener("keydown",et("keydown"))};var Wt={};var Ht=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Wt[`${t}:${r}`]=e),e},_t=(e="",t="")=>Wt[`${e}:${t}`];function an(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function sn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Vt=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(sn(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=an(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var S="-ms-",le="-moz-",m="-webkit-",Pe="comm",ue="rule",de="decl";var Ft="@import";var Ae="@keyframes";var zt=Math.abs,ne=String.fromCharCode,qt=Object.assign;function Bt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Oe(e){return e.trim()}function jt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function Ie(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function E(e){return e.length}function pe(e){return e.length}function me(e,t){return t.push(e),e}function Gt(e,t){return e.map(t).join("")}var De=1,fe=1,Kt=0,k=0,b=0,ge="";function Se(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:De,column:fe,length:i,return:""}}function xe(e,t){return qt(Se("",null,null,"",null,null,0),e,{length:-e.length},t)}function Yt(){return b}function Jt(){return b=k>0?M(ge,--k):0,fe--,b===10&&(fe=1,De--),b}function N(){return b=k<Kt?M(ge,k++):0,fe++,b===10&&(fe=1,De++),b}function W(){return M(ge,k)}function Me(){return k}function ye(e,t){return J(ge,e,t)}function he(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function $e(e){return De=fe=1,Kt=E(ge=e),k=0,[]}function Ue(e){return ge="",e}function we(e){return Oe(ye(k-1,rt(e===91?e+2:e===40?e+1:e)))}function Qt(e){for(;(b=W())&&b<33;)N();return he(e)>2||he(b)>3?"":" "}function Zt(e,t){for(;--t&&N()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return ye(e,Me()+(t<6&&W()==32&&N()==32))}function rt(e){for(;N();)switch(b){case e:return k;case 34:case 39:e!==34&&e!==39&&rt(b);break;case 40:e===41&&rt(e);break;case 92:N();break}return k}function Xt(e,t){for(;N()&&e+b!==47+10;)if(e+b===42+42&&W()===47)break;return"/*"+ye(t,k-1)+"*"+ne(e===47?e:N())}function er(e){for(;!he(W());)N();return ye(e,k)}function nr(e){return Ue(We("",null,null,null,[""],e=$e(e),0,[0],e))}function We(e,t,r,o,a,s,i,c,l){for(var p=0,d=0,h=i,L=0,B=0,D=0,y=1,R=1,T=1,C=0,V="",be=a,G=s,F=o,w=V;R;)switch(D=C,C=N()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){Ie(w+=f(we(C),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:w+=we(C);break;case 9:case 10:case 13:case 32:w+=Qt(D);break;case 92:w+=Zt(Me()-1,7);continue;case 47:switch(W()){case 42:case 47:me(cn(Xt(N(),Me()),t,r),l);break;default:w+="/"}break;case 123*y:c[p++]=E(w)*T;case 125*y:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+d:B>0&&E(w)-h&&me(B>32?rr(w+";",o,r,h-1):rr(f(w," ","")+";",o,r,h-2),l);break;case 59:w+=";";default:if(me(F=tr(w,t,r,p,d,a,c,V,be=[],G=[],h),s),C===123)if(d===0)We(w,t,F,F,be,s,h,c,G);else switch(L){case 100:case 109:case 115:We(e,F,F,o&&me(tr(e,F,F,0,0,a,c,V,a,be=[],h),G),a,G,h,c,o?be:G);break;default:We(w,F,F,F,[""],G,0,c,G)}}p=d=B=0,y=T=1,V=w="",h=i;break;case 58:h=1+E(w),B=D;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&Jt()==125)continue}switch(w+=ne(C),C*y){case 38:T=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(E(w)-1)*T,T=1;break;case 64:W()===45&&(w+=we(N())),L=W(),d=h=E(V=w+=er(Me())),C++;break;case 45:D===45&&E(w)==2&&(y=0)}}return s}function tr(e,t,r,o,a,s,i,c,l,p,d){for(var h=a-1,L=a===0?s:[""],B=pe(L),D=0,y=0,R=0;D<o;++D)for(var T=0,C=J(e,h+1,h=zt(y=i[D])),V=e;T<B;++T)(V=Oe(y>0?L[T]+" "+C:f(C,/&\f/g,L[T])))&&(l[R++]=V);return Se(e,t,r,a===0?ue:c,l,p,d)}function cn(e,t,r){return Se(e,t,r,Pe,ne(Yt()),J(e,2,-2),0)}function rr(e,t,r,o){return Se(e,t,r,de,J(e,0,o),J(e,o+1,-1),o)}function nt(e,t){switch(Bt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+le+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+le+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ie(e,"stretch")?nt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,E(e)-3-(~Ie(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function Q(e,t){for(var r="",o=pe(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function or(e,t,r,o){switch(e.type){case Ft:case de:return e.return=e.return||e.value;case Pe:return"";case Ae:return e.return=e.value+"{"+Q(e.children,o)+"}";case ue:e.value=e.props.join(",")}return E(r=Q(e.children,o))?e.return=e.value+"{"+r+"}":""}function ar(e){var t=pe(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function sr(e){return function(t){t.root||(t=t.return)&&e(t)}}function ir(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case de:e.return=nt(e.value,e.length);break;case Ae:return Q([xe(e,{value:f(e.value,"@","@"+m)})],o);case ue:if(e.length)return Gt(e.props,function(a){switch(jt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([xe(e,{props:[f(a,/:(read-\w+)/,":"+le+"$1")]})],o);case"::placeholder":return Q([xe(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),xe(e,{props:[f(a,/:(plac\w+)/,":"+le+"$1")]}),xe(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],o)}return""})}}function ln(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var cr=ln;var un=function(t,r,o){for(var a=0,s=0;a=s,s=W(),a===38&&s===12&&(r[o]=1),!he(s);)N();return ye(t,k)},dn=function(t,r){var o=-1,a=44;do switch(he(a)){case 0:a===38&&W()===12&&(r[o]=1),t[o]+=un(k-1,r,o);break;case 2:t[o]+=we(a);break;case 4:if(a===44){t[++o]=W()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=ne(a)}while(a=N());return t},pn=function(t,r){return Ue(dn($e(t),r))},lr=new WeakMap,mn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!lr.get(o))&&!a){lr.set(t,!0);for(var s=[],i=pn(r,s),c=o.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},fn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var hn=[ir],gn=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(y){var R=y.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var a=t.stylisPlugins||hn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var R=y.getAttribute("data-emotion").split(" "),T=1;T<R.length;T++)s[R[T]]=!0;c.push(y)});var l,p=[mn,fn];{var d,h=[or,sr(function(y){d.insert(y)})],L=ar(p.concat(a,h)),B=function(R){return Q(nr(R),L)};l=function(R,T,C,V){d=C,B(R?R+"{"+T.styles+"}":T.styles),V&&(D.inserted[T.name]=!0)}}var D={key:r,sheet:new Vt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},ur=gn;function xn(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var dr=xn;var yn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pr=yn;var wn=/[A-Z]|^ms/g,vn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,gr=function(t){return t.charCodeAt(1)===45},mr=function(t){return t!=null&&typeof t!="boolean"},ot=cr(function(e){return gr(e)?e:e.replace(wn,"-$&").toLowerCase()}),fr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(vn,function(o,a,s){return z={name:a,styles:s,next:z},a})}return pr[t]!==1&&!gr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ce(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)z={name:o.name,styles:o.styles,next:z},o=o.next;var a=r.styles+";";return a}return bn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Ce(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function bn(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=Ce(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":mr(i)&&(o+=ot(s)+":"+fr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)mr(i[c])&&(o+=ot(s)+":"+fr(s,i[c])+";");else{var l=Ce(e,t,i);switch(s){case"animation":case"animationName":{o+=ot(s)+":"+l+";";break}default:o+=s+"{"+l+"}"}}}return o}var hr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,He=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ce(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ce(o,r,t[c]),a&&(s+=i[c]);var l;hr.lastIndex=0;for(var p="",d;(d=hr.exec(s))!==null;)p+="-"+d[1];var h=dr(s)+p;return{name:h,styles:s,next:z}};var Tn=!0;function at(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var xr=function(t,r,o){var a=t.key+"-"+r.name;if((o===!1||Tn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function yr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function wr(e,t,r){var o=[],a=at(e,o,r);return o.length<2?r:a+t(o)}var In=function(t){var r=ur(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered,void 0);return xr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered),L="animation-"+h.name;return yr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered);yr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return wr(r.registered,o,Sn(p))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:at.bind(null,r.registered),merge:wr.bind(null,r.registered,o)}},Sn=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},vr=In;var q=vr({key:"css"}),Ta=q.flush,Ia=q.hydrate,br=q.cx,Sa=q.merge,Ma=q.getRegisteredStyles,Tr=q.injectGlobal,Ca=q.keyframes,_=q.css,Ea=q.sheet,ka=q.cache;var Mn=_`
  cursor: pointer;
`,Cn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...o}={...e};o.disabled||delete o.disabled;let a=`${o.variant==="text"?Cn:Mn} ${r}`;return n("button",{class:a,...o},t)},st=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+xt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&yt(s)},...r},t)};var Ir="view-home",Sr=()=>{let e=_t(Ir),t=Ht(n("div",{xname:Ir},"Home rendered ",n("strong",{xname:"xxx"},+ft({el:e,xname:"xxx"},0)+1)," times.",n("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||n("input",{xname:"yyy",value:"test "}),n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var $a=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),En=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),kn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var it=e=>{let t=En.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},O=e=>kn.format(e),Ee=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,o=typeof t=="string"?new Date(t):t,a=Math.floor((o.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var Nn=_`
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
`,ut,ve,Mr=({changes:e})=>{if(oe()==="instruments")if(!e.length)K(ve,n(Dn,null));else for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":$(ve,n(lt,{instrument:t.instrument}));break;case"update":r&&ae(ve,n(lt,{instrument:t.instrument}),r);break;case"delete":r&&se(ve,r);break}}};g(H,Mr);var ct=()=>ut.value="",Ln=g(I(),ct),Rn=g(I(),async()=>{let e=ut.value,t=Re.find(o=>o.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(re()[r.code||""]){ct();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Nt(r),ct()}),Pn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Lt(e)}),An=()=>n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),On=()=>n("div",null,n("input",{xname:"new-instrument"}),"  ",n(A,{xclick:Rn},"Add instrument"),"  ",n(A,{xclick:Ln,variant:"text"},"Clear")),Dn=()=>n(u,null,Te().map(e=>n(lt,{instrument:e}))),lt=({instrument:e})=>n("tr",{xname:"instrument",xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",null,e.isin),n("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Ee(e.latestUpdate)),n("td",null,n(A,{xclick:Pn,xid:e.code,variant:"text"},"Delete"))),Cr=()=>{let e=n("div",{class:Nn},n(An,null),n(On,null),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:"instrument-list"}));return e.onMount=()=>{ut=v({xname:"new-instrument"}),ve=v({xname:"instrument-list"}),Mr({changes:[]}),Er(),console.log("ViewInstruments mounted!")},e},Er=()=>{oe()==="instruments"&&(ve.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Ee(t.dataset.latestUpdate||"")}),setTimeout(Er,5e3))};var $n=_`
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
`,dt,Z,ke={},kr=()=>{dt.value=""},Nr=e=>{X({el:e,xname:"wallet-new-total-price"},""),X({el:e,xname:"wallet-new-unit-price"},""),X({el:e,xname:"wallet-new-date"},it(new Date)),X({el:e,xname:"wallet-new-instrument"},"")},Lr=({changes:e}={})=>{if(oe()!=="wallets")return;let t=n(u,null,Qe().map(o=>n(Ur,{wallet:o}))),r=ht();gt(".new-instrument-field",Z,t),K(Z,t),r.focus()};g(H,_e(Lr,500));var Un=g(I(),async()=>{let e=dt?.value||"";if(!e)return;let t={name:e,comment:"",instruments:[]};await Ot(t),kr(),ke[e]=!0,$(Z,n(Ur,{wallet:t}))}),Wn=g(I(),async({xid:e=""})=>{!ie()[e]||!confirm(`Delete wallet ${e}?`)||(await Dt(e),se(Z,v({el:Z,xname:"wallet",xid:e})))}),Hn=g(I(),kr),_n=g(I(),({xid:e=""})=>{ke[e]=!ke[e],v({xname:"instruments",xid:e}).classList.toggle("expanded",ke[e])}),Vn=g(I(),({xid:e=""})=>{Nr(v({xname:"wallet",xid:e}))}),Rr=e=>{let t=v({el:Z,xname:"wallet-total",xid:e.name});ae(t.parentElement,n(Or,{wd:e}),t);let r=v({el:Z,xname:"wallet-title",xid:e.name});ae(r.parentElement,n(Dr,{wd:e}),r)},Fn=g(I(),({xid:e=""})=>{let t=ie()[e];if(!t){alert("Wallet "+e+" not found");return}let r=v({xname:"wallet",xid:e}),o={id:Date.now(),code:ee({el:r,xname:"wallet-new-instrument"},""),date:ee({el:r,xname:"wallet-new-date"},""),totalPrice:+ee({el:r,xname:"wallet-new-total-price"},""),unitPrice:+ee({el:r,xname:"wallet-new-unit-price"},"")};t.instruments.push(o),Ze(t);let a=pt(t);Rr(a),Nr(r),$(v({el:r,xname:"instrument-list",xid:t.name}),n($r,{ins:a.instruments.slice(-1)[0],walletName:a.name}))}),zn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),o=ie()[t],a=o.instruments.find(({id:s})=>""+s===r);!o||!confirm(`Delete instrument ${a?.code} from wallet ${o.name}?`)||(o.instruments=o.instruments.filter(({id:s})=>""+s!==r),Ze(o),Rr(pt(o)),v({xid:e}).remove())}),Pr=e=>{let t=re();return Ee(e.reduce((r,o)=>{let a=t[o.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Ar=()=>{oe()==="wallets"&&(Qe().forEach(e=>mt({xname:"updated-ago",xid:e.name},Pr(e.instruments))),setTimeout(Ar,5*1e3))},pt=e=>{let t=re(),r=e.instruments.map(s=>{let i=t[s.code]?.latestPrice||0,c=s.totalPrice/s.unitPrice,l=i*c;return{id:s.id,instrumentName:t[s.code]?.name??"???",instrumentUrl:t[s.code]?.sourceUrl,instrumentType:t[s.code]?.type,change:l/s.totalPrice*100-100,currentTotal:l,currentUnit:i,unitCount:c,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:t[s.code]?.latestUpdate||""}}),o=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:o,totalPaid:a,changeValue:O(o-a),changePercent:O(o/a*100-100),updatedAgo:Pr(e.instruments)}},Or=({wd:e})=>n("tr",{xname:"wallet-total",xid:e.name},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},e.changeValue),n("td",{class:"percent"},e.changePercent),n("td",{class:"price"},O(e.totalValue)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"},O(e.totalPaid)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"actions"})),Dr=({wd:e})=>n("div",{xname:"wallet-title",xid:e.name},n("div",{xclick:_n,class:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),n(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:Wn},"Delete"),n("div",{class:"summary"},n("div",{class:""},"Change\xA0",n("b",null,e.changeValue),"\xA0(",n("b",null,e.changePercent,"%"),")"),n("div",{class:""},"Value ",n("b",null,O(e.totalValue))),n("div",{class:""},"Paid ",n("b",null,O(e.totalPaid))))),$r=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return n("tr",{xid:r},n("td",{class:"instrument-name"},n("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),n("td",{class:"price"},O(e.currentTotal-e.paidTotal)),n("td",{class:"percent"},O(e.change)),n("td",{class:"price"},O(e.currentTotal)),n("td",{class:"price"},O(e.currentUnit)),n("td",{class:"price"},O(e.unitCount)),n("td",{class:"price"},O(e.paidTotal)),n("td",{class:"price"},O(e.paidUnit)),n("td",{class:"date"},e.paidDate),n("td",{class:"actions"},n(A,{xclick:zn,xid:r,variant:"text"},"Delete")))},qn=({wallet:e})=>n("tr",null,n("td",null,n("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},n("option",{value:""}),Te().map(t=>n("option",{value:t.code},"(",t.type,") ",t.name)))),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),n("td",{class:"date"},n("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:it(new Date),class:"new-instrument-field"})),n("td",{class:"actions"},n(A,{xclick:Fn,xid:e.name},"Add"),n(A,{xclick:Vn,xid:e.name,variant:"text"},"Clear"))),Ur=({wallet:e})=>{let t=pt(e);return n("div",{xname:"wallet",xid:e.name},n(Dr,{wd:t}),n("table",{xname:"instruments",xid:e.name,class:br({expanded:ke[e.name]})},n("thead",null,n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"}))),n("tbody",{xname:"instrument-list",xid:t.name},t.instruments.map(r=>n($r,{ins:r,walletName:t.name}))),n("tfoot",null,n(Or,{wd:t}),n(qn,{wallet:e}))))},Wr=()=>{let e=n("div",{class:$n},n("div",null,n("input",{xname:"new-wallet-name"}),"  ",n(A,{xclick:Un},"Create wallet"),"  ",n(A,{xclick:Hn,variant:"text"},"Clear")),n("div",{xname:"wallet-list"}));return e.onMount=()=>{dt=v({xname:"new-wallet-name"}),Z=v({xname:"wallet-list"}),Lr(),Ar(),console.log("ViewWallets mounted!")},e};var Le,Ne,Hr=()=>{Ne.focus();let e=Ne.value.trim();!e||(Ne.value="",Tt(e))},Bn=_e((e,t)=>{It({done:!1,text:t,id:e})},500),jn=g(I(),({xid:e=""})=>St(e)),Gn=g(I(),Hr),Kn=g(tt(),({ev:e})=>{e.key==="Enter"&&Hr()}),Yn=g(tt(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&Bn(t,r)});g(je,({todoId:e})=>{se(Le,v({el:Le,xname:"todo",xid:e}))});g(Be,({todo:e})=>{$(Le,n(_r,{todo:e}))});var _r=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xclick:jn,xid:e.id}," X "),"\xA0",n("input",{xkeyup:Yn,xid:e.id,value:e.text})),Vr=()=>{let e=n("div",null,n("div",null,n("input",{xkeyup:Kn,xname:"new-item-text"}),"\xA0",n("button",{xclick:Gn},"Add")),n("ol",{xname:"items"}));return e.onMount=async()=>{Le=v({xname:"items"}),Ne=v({xname:"new-item-text"}),Ne.focus(),await Mt(),K(Le,...bt().map(t=>n(_r,{todo:t}))),console.log("ViewTodo mounted!")},e};var Jn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ve;g(I("migration-export:click"),()=>{let e=ie(),t=re();X(Ve,JSON.stringify({instruments:t,wallets:e},null,2)),Ve.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(ee(Ve,""));console.log({wallets:e,instruments:t}),await Rt(t),await $t(e),x(H,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var Fr=()=>{let e=n("div",{class:Jn},n("div",null,n(A,{xname:"migration-export"},"Export from LS")," ",n(A,{xname:"migration-import"},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{Ve=v({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Fe={home:{label:"Home",Component:Sr},wallets:{label:"Wallets",Component:Wr},instruments:{label:"Instruments",Component:Cr},todo:{label:"Todo",Component:Vr},migration:{label:"Data migration",Component:Fr}},oe=()=>new URLSearchParams(window.location.search).get("view")||"home",zr=()=>{let{Component:e,label:t}=Fe[oe()]||Fe.home;return{Component:e,label:t}};var Qn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,qr=()=>{let[,...e]=Object.entries(Fe);return n("div",{class:Qn},n(st,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(u,null,o>0?" | ":"",n(st,{view:t},r.label))))};Tr`
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

`;var Br;g(ze,()=>{let{Component:e}=zr();K(Br,n(e,null))});var jr=()=>{let e=n("div",{class:"app"},n(qr,null),n("hr",null),n("div",{xname:"current-view"}));return e.onMount=()=>{Br=v({xname:"current-view"}),console.log("App mounted!")},e};Ut();$(document.body,n(jr,null));wt();})();
