(()=>{var B=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},Fe=(e,t,r)=>{let o=e.replaceChild(t,r);return t.onMount&&t.onMount(),o},Ne=(e,t)=>e.removeChild(t),j=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},I=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},dt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let o=j(e);o&&(o.innerHTML=""+t)},mt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let o=j(e);return o?.innerHTML!==void 0?o.innerHTML:t},Z=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let o=j(e);o&&(o.value=""+t)},X=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let o=j(e);return o?o.value:t},ft=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},ht=(e,t,r)=>{t.querySelectorAll(e).forEach(o=>{let{xname:a,xid:s}=o.dataset;if(!a||!s)return;let i=j({el:r,xname:a,xid:s});if(!i)return;let c=i.parentElement;!c||Fe(c,o,i)})};var Hr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[Hr(a.substring(5))]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:(o.setAttribute(a,""+s),o[a]=s)}),r.flat().forEach(a=>B(o,typeof a=="object"?a:document.createTextNode(a))),o},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>B(r,typeof o=="object"?o:document.createTextNode(o))),r};var ee={},_r=1,g=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let o="event-"+_r++;return ee[o]=ee[o]||[],ee[o].push(t),{type:o,callback:t}},y=(e,t)=>{let r=0,{type:o}=e({});for(let a of ee[o]||[])a(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(d=>i.append(c,d))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},ze=e=>({type:"router:navigate",payload:e}),qe=e=>{y(ze,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),qe(t)};var yt=()=>qe(window.location.href);window.addEventListener("popstate",()=>qe(window.location.href));var wt="todos",Y=[],Be=e=>({type:"store:item-created",payload:e}),Vr=e=>({type:"store:item-updated",payload:e}),je=e=>({type:"store:item-deleted",payload:e}),vt=()=>Y,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Ge().then(()=>y(Be,{todo:t}))},Tt=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Ge().then(()=>y(Vr,{todo:t}))):!1},It=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Ge().then(()=>y(je,{todoId:e})))},St=async()=>{Y=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:Y})},Ge=async()=>{localStorage.setItem(wt,JSON.stringify(Y))};var Mt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),Ct=(e,t)=>fetch(`https://it.nottycanvas.com?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Le=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Mt(r)).json(),{ISIN:a,LONG_NAME:s}=o.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ke="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),ye=()=>Object.values(P),te=()=>P,Et=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ye().then(()=>y(U,{changes:[{instrument:t,op:"create"}]}))},Fr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ye().then(()=>y(U,{changes:[{instrument:r,op:"update"}]}))},kt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ye().then(()=>y(U,{changes:[{instrument:t,op:"delete"}]}))},zr=async()=>{P=JSON.parse(localStorage.getItem(Ke)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ye=async()=>{localStorage.setItem(Ke,JSON.stringify(P))},Nt=async e=>{localStorage.setItem(Ke,JSON.stringify(e)),P=e},Lt=window;Lt.quick_refresh=!1;var qr=Lt.quick_refresh?.2:2,Br=10,Rt=async()=>{let e=[];for(let t of ye())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-qr*60*1e3){let r=Le.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Fr(t),e.push({instrument:t,op:"update"}))}e.length&&y(U,{changes:e}),setTimeout(Rt,Br*1e3)};zr().then(()=>y(U,{changes:[]})).then(Rt);var Je="wallets",V={},jr=e=>({type:"store:wallet-created",payload:e}),Gr=e=>({type:"store:wallet-updated",payload:e}),Kr=e=>({type:"store:wallets-updated",payload:e});var Qe=()=>Object.values(V),we=()=>V,Pt=async e=>{if(V[e.name])return!1;let t={...e};return V[t.name]=t,At().then(()=>y(jr,{wallet:t}))},Ze=async e=>{let{name:t=""}=e;return V[t]?(V[t]=e,At().then(()=>y(Gr,{wallet:e}))):!1};var Yr=async()=>{V=JSON.parse(localStorage.getItem(Je)||"{}"),console.log({wallets:V})},At=async()=>{localStorage.setItem(Je,JSON.stringify(V))},Ot=async e=>{localStorage.setItem(Je,JSON.stringify(e)),V=e};Yr().then(()=>y(Kr,{}));var oe=e=>t=>({type:e,payload:t}),S=(e="")=>oe(e),et=(e="")=>oe(e),Xe=e=>t=>{let r=t.target,{xname:o="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:o,xid:a,ev:t};s&&e==="click"?y(oe(s.type),l):i&&e==="keyup"?y(oe(i.type),l):c&&e==="keydown"?y(oe(c.type),l):o&&y(oe(`${o}:${e}`),l)},Dt=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var $t={};var Ut=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&($t[`${t}:${r}`]=e),e},Wt=(e="",t="")=>$t[`${e}:${t}`];function Jr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Qr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Ht=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Qr(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=Jr(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var T="-ms-",ae="-moz-",m="-webkit-",Re="comm",se="rule",ie="decl";var _t="@import";var Pe="@keyframes";var Vt=Math.abs,re=String.fromCharCode,Ft=Object.assign;function zt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Ae(e){return e.trim()}function qt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ve(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function E(e){return e.length}function ce(e){return e.length}function le(e,t){return t.push(e),e}function Bt(e,t){return e.map(t).join("")}var Oe=1,ue=1,jt=0,k=0,v=0,de="";function be(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:Oe,column:ue,length:i,return:""}}function me(e,t){return Ft(be("",null,null,"",null,null,0),e,{length:-e.length},t)}function Gt(){return v}function Kt(){return v=k>0?M(de,--k):0,ue--,v===10&&(ue=1,Oe--),v}function N(){return v=k<jt?M(de,k++):0,ue++,v===10&&(ue=1,Oe++),v}function $(){return M(de,k)}function Te(){return k}function fe(e,t){return J(de,e,t)}function pe(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function De(e){return Oe=ue=1,jt=E(de=e),k=0,[]}function $e(e){return de="",e}function he(e){return Ae(fe(k-1,tt(e===91?e+2:e===40?e+1:e)))}function Yt(e){for(;(v=$())&&v<33;)N();return pe(e)>2||pe(v)>3?"":" "}function Jt(e,t){for(;--t&&N()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return fe(e,Te()+(t<6&&$()==32&&N()==32))}function tt(e){for(;N();)switch(v){case e:return k;case 34:case 39:e!==34&&e!==39&&tt(v);break;case 40:e===41&&tt(e);break;case 92:N();break}return k}function Qt(e,t){for(;N()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+fe(t,k-1)+"*"+re(e===47?e:N())}function Zt(e){for(;!pe($());)N();return fe(e,k)}function tr(e){return $e(Ue("",null,null,null,[""],e=De(e),0,[0],e))}function Ue(e,t,r,o,a,s,i,c,l){for(var d=0,p=0,h=i,L=0,q=0,O=0,x=1,R=1,b=1,C=0,H="",xe=a,G=s,_=o,w=H;R;)switch(O=C,C=N()){case 40:if(O!=108&&w.charCodeAt(h-1)==58){ve(w+=f(he(C),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=he(C);break;case 9:case 10:case 13:case 32:w+=Yt(O);break;case 92:w+=Jt(Te()-1,7);continue;case 47:switch($()){case 42:case 47:le(Zr(Qt(N(),Te()),t,r),l);break;default:w+="/"}break;case 123*x:c[d++]=E(w)*b;case 125*x:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+p:q>0&&E(w)-h&&le(q>32?er(w+";",o,r,h-1):er(f(w," ","")+";",o,r,h-2),l);break;case 59:w+=";";default:if(le(_=Xt(w,t,r,d,p,a,c,H,xe=[],G=[],h),s),C===123)if(p===0)Ue(w,t,_,_,xe,s,h,c,G);else switch(L){case 100:case 109:case 115:Ue(e,_,_,o&&le(Xt(e,_,_,0,0,a,c,H,a,xe=[],h),G),a,G,h,c,o?xe:G);break;default:Ue(w,_,_,_,[""],G,0,c,G)}}d=p=q=0,x=b=1,H=w="",h=i;break;case 58:h=1+E(w),q=O;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Kt()==125)continue}switch(w+=re(C),C*x){case 38:b=p>0?1:(w+="\f",-1);break;case 44:c[d++]=(E(w)-1)*b,b=1;break;case 64:$()===45&&(w+=he(N())),L=$(),p=h=E(H=w+=Zt(Te())),C++;break;case 45:O===45&&E(w)==2&&(x=0)}}return s}function Xt(e,t,r,o,a,s,i,c,l,d,p){for(var h=a-1,L=a===0?s:[""],q=ce(L),O=0,x=0,R=0;O<o;++O)for(var b=0,C=J(e,h+1,h=Vt(x=i[O])),H=e;b<q;++b)(H=Ae(x>0?L[b]+" "+C:f(C,/&\f/g,L[b])))&&(l[R++]=H);return be(e,t,r,a===0?se:c,l,d,p)}function Zr(e,t,r){return be(e,t,r,Re,re(Gt()),J(e,2,-2),0)}function er(e,t,r,o){return be(e,t,r,ie,J(e,0,o),J(e,o+1,-1),o)}function rt(e,t){switch(zt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ae+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ae+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ve(e,"stretch")?rt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,E(e)-3-(~ve(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function Q(e,t){for(var r="",o=ce(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function rr(e,t,r,o){switch(e.type){case _t:case ie:return e.return=e.return||e.value;case Re:return"";case Pe:return e.return=e.value+"{"+Q(e.children,o)+"}";case se:e.value=e.props.join(",")}return E(r=Q(e.children,o))?e.return=e.value+"{"+r+"}":""}function nr(e){var t=ce(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function or(e){return function(t){t.root||(t=t.return)&&e(t)}}function ar(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case ie:e.return=rt(e.value,e.length);break;case Pe:return Q([me(e,{value:f(e.value,"@","@"+m)})],o);case se:if(e.length)return Bt(e.props,function(a){switch(qt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([me(e,{props:[f(a,/:(read-\w+)/,":"+ae+"$1")]})],o);case"::placeholder":return Q([me(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),me(e,{props:[f(a,/:(plac\w+)/,":"+ae+"$1")]}),me(e,{props:[f(a,/:(plac\w+)/,T+"input-$1")]})],o)}return""})}}function Xr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var sr=Xr;var en=function(t,r,o){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[o]=1),!pe(s);)N();return fe(t,k)},tn=function(t,r){var o=-1,a=44;do switch(pe(a)){case 0:a===38&&$()===12&&(r[o]=1),t[o]+=en(k-1,r,o);break;case 2:t[o]+=he(a);break;case 4:if(a===44){t[++o]=$()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=re(a)}while(a=N());return t},rn=function(t,r){return $e(tn(De(t),r))},ir=new WeakMap,nn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!ir.get(o))&&!a){ir.set(t,!0);for(var s=[],i=rn(r,s),c=o.props,l=0,d=0;l<i.length;l++)for(var p=0;p<c.length;p++,d++)t.props[d]=s[l]?i[l].replace(/&\f/g,c[p]):c[p]+" "+i[l]}}},on=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var an=[ar],sn=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(x){var R=x.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||an,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var R=x.getAttribute("data-emotion").split(" "),b=1;b<R.length;b++)s[R[b]]=!0;c.push(x)});var l,d=[nn,on];{var p,h=[rr,or(function(x){p.insert(x)})],L=nr(d.concat(a,h)),q=function(R){return Q(tr(R),L)};l=function(R,b,C,H){p=C,q(R?R+"{"+b.styles+"}":b.styles),H&&(O.inserted[b.name]=!0)}}var O={key:r,sheet:new Ht({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return O.sheet.hydrate(c),O},cr=sn;function cn(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var lr=cn;var ln={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ur=ln;var un=/[A-Z]|^ms/g,pn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,fr=function(t){return t.charCodeAt(1)===45},pr=function(t){return t!=null&&typeof t!="boolean"},nt=sr(function(e){return fr(e)?e:e.replace(un,"-$&").toLowerCase()}),dr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(pn,function(o,a,s){return F={name:a,styles:s,next:F},a})}return ur[t]!==1&&!fr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ie(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)F={name:o.name,styles:o.styles,next:F},o=o.next;var a=r.styles+";";return a}return dn(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,Ie(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var d=t[r];return d!==void 0?d:r}function dn(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=Ie(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":pr(i)&&(o+=nt(s)+":"+dr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)pr(i[c])&&(o+=nt(s)+":"+dr(s,i[c])+";");else{var l=Ie(e,t,i);switch(s){case"animation":case"animationName":{o+=nt(s)+":"+l+";";break}default:o+=s+"{"+l+"}"}}}return o}var mr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,We=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ie(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ie(o,r,t[c]),a&&(s+=i[c]);var l;mr.lastIndex=0;for(var d="",p;(p=mr.exec(s))!==null;)d+="-"+p[1];var h=lr(s)+d;return{name:h,styles:s,next:F}};var mn=!0;function ot(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var hr=function(t,r,o){var a=t.key+"-"+r.name;if((o===!1||mn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function gr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function xr(e,t,r){var o=[],a=ot(e,o,r);return o.length<2?r:a+t(o)}var fn=function(t){var r=cr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=We(d,r.registered,void 0);return hr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=We(d,r.registered),L="animation-"+h.name;return gr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=We(d,r.registered);gr(r,h)},i=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];return xr(r.registered,o,hn(d))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(d){r.inserted[d]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ot.bind(null,r.registered),merge:xr.bind(null,r.registered,o)}},hn=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},yr=fn;var z=yr({key:"css"}),xa=z.flush,ya=z.hydrate,wr=z.cx,wa=z.merge,va=z.getRegisteredStyles,vr=z.injectGlobal,ba=z.keyframes,W=z.css,Ta=z.sheet,Ia=z.cache;var gn=W`
  cursor: pointer;
`,xn=W`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,n("button",{class:r.variant==="text"?xn:gn,...r},t)},at=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+gt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&xt(s)},...r},t)};var br="view-home",Tr=()=>{let e=Wt(br),t=Ut(n("div",{xname:br},"Home rendered ",n("strong",{xname:"xxx"},+mt({el:e,xname:"xxx"},0)+1)," times.",n("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||n("input",{xname:"yyy",value:"test "}),n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var He=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var Ra=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),yn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),wn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var st=e=>{let t=yn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},A=e=>wn.format(e),Se=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,o=typeof t=="string"?new Date(t):t,a=Math.floor((o.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var vn=W`
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
`,lt,ge,Ir=({changes:e})=>{if(ne()==="instruments")if(!e.length)K(ge,n(Cn,null));else for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":B(ge,n(ct,{instrument:t.instrument}));break;case"update":r&&Fe(ge,n(ct,{instrument:t.instrument}),r);break;case"delete":r&&Ne(ge,r);break}}};g(U,Ir);var it=()=>lt.value="",bn=g(S(),it),Tn=g(S(),async()=>{let e=lt.value,t=Le.find(o=>o.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(te()[r.code||""]){it();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Et(r),it()}),In=g(S(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await kt(e)}),Sn=()=>n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),Mn=()=>n("div",null,n("input",{xname:"new-instrument"}),"  ",n(D,{xclick:Tn},"Add instrument"),"  ",n(D,{xclick:bn,variant:"text"},"Clear")),Cn=()=>n(u,null,ye().map(e=>n(ct,{instrument:e}))),ct=({instrument:e})=>n("tr",{xname:"instrument",xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",null,e.isin),n("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Se(e.latestUpdate)),n("td",null,n(D,{xclick:In,xid:e.code,variant:"text"},"Delete"))),Sr=()=>{let e=n("div",{class:vn},n(Sn,null),n(Mn,null),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:"instrument-list"}));return e.onMount=()=>{lt=I({xname:"new-instrument"}),ge=I({xname:"instrument-list"}),Ir({changes:[]}),Mr(),console.log("ViewInstruments mounted!")},e},Mr=()=>{ne()==="instruments"&&(ge.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Se(t.dataset.latestUpdate||"")}),setTimeout(Mr,5e3))};var En=W`
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
    .title {
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
      .total {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,pt,ut,Me={},Cr=()=>{pt.value=""},Er=e=>{Z({el:e,xname:"wallet-new-total-price"},""),Z({el:e,xname:"wallet-new-unit-price"},""),Z({el:e,xname:"wallet-new-date"},st(new Date)),Z({el:e,xname:"wallet-new-instrument"},"")},Ce=({changes:e}={})=>{if(ne()!=="wallets")return;let t=n(u,null,Qe().map(o=>n(Hn,{wallet:o}))),r=ft();ht(".new-instrument-field",ut,t),K(ut,t),r.focus()};g(U,He(Ce,500));var kn=g(S(),async()=>{let e=pt?.value||"";if(!e)return;await Pt({name:e,comment:"",instruments:[]}),Cr(),Me[e]=!0,Ce()}),Nn=g(S(),Cr),Ln=g(S(),({xid:e=""})=>{Me[e]=!Me[e],I({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),Rn=g(S(),({xid:e=""})=>{Er(I({xname:"wallet",xid:e}))}),Pn=g(S(),({xid:e=""})=>{let[t,r]=e.split(":"),o=we()[t],a=o.instruments.find(({id:s})=>""+s===r);!o||!confirm(`Delete instrument ${a?.code} from wallet ${o.name}?`)||(o.instruments=o.instruments.filter(({id:s})=>""+s!==r),Ze(o),Ce())}),An=g(S(),({xid:e=""})=>{let t=we()[e];if(!t){alert("Wallet "+e+" not found");return}let r=I({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:X({el:r,xname:"wallet-new-instrument"},""),date:X({el:r,xname:"wallet-new-date"},""),totalPrice:+X({el:r,xname:"wallet-new-total-price"},""),unitPrice:+X({el:r,xname:"wallet-new-unit-price"},"")}),Ze(t),Er(r),Ce()}),kr=e=>{let t=te();return Se(e.reduce((r,o)=>{let a=t[o.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Nr=()=>{ne()==="wallets"&&(Qe().forEach(e=>dt({xname:"updated-ago",xid:e.name},kr(e.instruments))),setTimeout(Nr,5*1e3))},On=e=>{let t=te(),r=e.instruments.map(i=>{let c=t[i.code]?.latestPrice||0,l=i.totalPrice/i.unitPrice,d=c*l;return{id:i.id,instrumentName:t[i.code]?.name??"???",instrumentUrl:t[i.code]?.sourceUrl,instrumentType:t[i.code]?.type,change:d/i.totalPrice*100-100,currentTotal:d,currentUnit:c,unitCount:l,paidTotal:i.totalPrice,paidUnit:i.unitPrice,paidDate:i.date,updatedAt:t[i.code]?.latestUpdate||""}}),o=r.reduce((i,c)=>i+c.currentTotal,0),a=r.reduce((i,c)=>i+c.paidTotal,0),s=kr(e.instruments);return{name:e.name,instruments:r,updatedAgo:s,totalValue:o,totalPaid:a,changeValue:A(o-a),changePercent:A(o/a*100-100)}},Dn=({wd:e})=>n("tr",{class:"total"},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},e.changeValue),n("td",{class:"percent"},e.changePercent),n("td",{class:"price"},A(e.totalValue)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"},A(e.totalPaid)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"actions"})),$n=({wd:e})=>n("div",{class:"title"},n("div",{xclick:Ln,class:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),n("div",{class:"summary"},n("div",{class:""},"Change\xA0",n("b",null,e.changeValue),"\xA0(",n("b",null,e.changePercent,"%"),")"),n("div",{class:""},"Value ",n("b",null,A(e.totalValue))),n("div",{class:""},"Paid ",n("b",null,A(e.totalPaid))))),Un=({ins:e,walletName:t})=>n("tr",null,n("td",{class:"instrument-name"},n("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),n("td",{class:"price"},A(e.currentTotal-e.paidTotal)),n("td",{class:"percent"},A(e.change)),n("td",{class:"price"},A(e.currentTotal)),n("td",{class:"price"},A(e.currentUnit)),n("td",{class:"price"},A(e.unitCount)),n("td",{class:"price"},A(e.paidTotal)),n("td",{class:"price"},A(e.paidUnit)),n("td",{class:"date"},e.paidDate),n("td",{class:"actions"},n(D,{xclick:Pn,xid:`${t}:${e.id}`,variant:"text"},"Delete"))),Wn=({wallet:e})=>n("tr",null,n("td",null,n("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},n("option",{value:""}),ye().map(t=>n("option",{value:t.code},"(",t.type,") ",t.name)))),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),n("td",{class:"date"},n("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:st(new Date),class:"new-instrument-field"})),n("td",{class:"actions"},n(D,{xclick:An,xid:e.name},"Add"),n(D,{xclick:Rn,xid:e.name,variant:"text"},"Clear"))),Hn=({wallet:e})=>{let t=On(e);return n("div",{xname:"wallet",xid:e.name},n($n,{wd:t}),n("table",{xname:"instruments",xid:e.name,class:wr({expanded:Me[e.name]})},n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"})),t.instruments.map(r=>n(Un,{ins:r,walletName:t.name})),n(Dn,{wd:t}),n(Wn,{wallet:e})))},Lr=()=>{let e=n("div",{class:En},n("div",null,n("input",{xname:"new-wallet-name"}),"  ",n(D,{xclick:kn},"Create wallet"),"  ",n(D,{xclick:Nn,variant:"text"},"Clear")),n("div",{xname:"wallet-list"}));return e.onMount=()=>{pt=I({xname:"new-wallet-name"}),ut=I({xname:"wallet-list"}),Ce(),Nr(),console.log("ViewWallets mounted!")},e};var ke,Ee,Rr=()=>{Ee.focus();let e=Ee.value.trim();!e||(Ee.value="",bt(e))},_n=He((e,t)=>{Tt({done:!1,text:t,id:e})},500),Vn=g(S(),({xid:e=""})=>It(e)),Fn=g(S(),Rr),zn=g(et(),({ev:e})=>{e.key==="Enter"&&Rr()}),qn=g(et(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&_n(t,r)});g(je,({todoId:e})=>{Ne(ke,I({el:ke,xname:"todo",xid:e}))});g(Be,({todo:e})=>{B(ke,n(Pr,{todo:e}))});var Pr=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xclick:Vn,xid:e.id}," X "),"\xA0",n("input",{xkeyup:qn,xid:e.id,value:e.text})),Ar=()=>{let e=n("div",null,n("div",null,n("input",{xkeyup:zn,xname:"new-item-text"}),"\xA0",n("button",{xclick:Fn},"Add")),n("ol",{xname:"items"}));return e.onMount=async()=>{ke=I({xname:"items"}),Ee=I({xname:"new-item-text"}),Ee.focus(),await St(),K(ke,...vt().map(t=>n(Pr,{todo:t}))),console.log("ViewTodo mounted!")},e};var Bn=W`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,_e;g(S("migration-export:click"),()=>{let e=we(),t=te();Z(_e,JSON.stringify({instruments:t,wallets:e},null,2)),_e.select()});g(S("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(X(_e,""));console.log({wallets:e,instruments:t}),await Nt(t),await Ot(e),y(U,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var Or=()=>{let e=n("div",{class:Bn},n("div",null,n(D,{xname:"migration-export"},"Export from LS")," ",n(D,{xname:"migration-import"},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{_e=I({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Ve={home:{label:"Home",Component:Tr},wallets:{label:"Wallets",Component:Lr},instruments:{label:"Instruments",Component:Sr},todo:{label:"Todo",Component:Ar},migration:{label:"Data migration",Component:Or}},ne=()=>new URLSearchParams(window.location.search).get("view")||"home",Dr=()=>{let{Component:e,label:t}=Ve[ne()]||Ve.home;return{Component:e,label:t}};var jn=W`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,$r=()=>{let[,...e]=Object.entries(Ve);return n("div",{class:jn},n(at,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(u,null,o>0?" | ":"",n(at,{view:t},r.label))))};vr`
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

`;var Ur;g(ze,()=>{let{Component:e}=Dr();K(Ur,n(e,null))});var Wr=()=>{let e=n("div",{class:"app"},n($r,null),n("hr",null),n("div",{xname:"current-view"}));return e.onMount=()=>{Ur=I({xname:"current-view"}),console.log("App mounted!")},e};Dt();B(document.body,n(Wr,null));yt();})();
