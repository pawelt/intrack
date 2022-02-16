(()=>{var j=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},G=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},We=(e,t,r)=>{let o=e.replaceChild(t,r);return t.onMount&&t.onMount(),o},Ce=(e,t)=>e.removeChild(t),me=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=`[data-xname="${r}"]`,s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},S=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=`[data-xname="${r}"]`,s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let o=me(e);o&&(o.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let o=me(e);return o?o.value:t},dt=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},pt=(e,t,r)=>{t.querySelectorAll(e).forEach(o=>{let{xname:a,xid:s}=o.dataset;if(!a||!s)return;let i=me({el:r,xname:a,xid:s});if(!i)return;let c=i.parentElement;!c||We(c,o,i)})};var l=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>j(r,typeof o=="object"?o:document.createTextNode(o))),r},n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[a.substring(5)]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:o.setAttribute(a,""+s)}),r.flat().forEach(a=>j(o,typeof a=="object"?a:document.createTextNode(a))),o};var Me={},y=(e,t)=>{let{type:r}=e({});for(let o of Me[r]||[])o(t);return!0},g=(e,t)=>{let{type:r}=e({});return Me[r]=Me[r]||[],Me[r].push(t),!0};var mt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let u=s[c];Array.isArray(u)?(i.delete(c),u.forEach(p=>i.append(c,p))):u!==void 0?i.set(c,u):i.delete(c)}return a.search=""+i,a},Fe=e=>({type:"router:navigate",payload:e}),He=e=>{y(Fe,{newUrl:new URL(e)})},ft=e=>{let t=""+e;window.history.pushState(null,"",t),He(t)};var ht=()=>He(window.location.href);window.addEventListener("popstate",()=>He(window.location.href));var gt="todos",K=[],ze=e=>({type:"store:item-created",payload:e}),Lr=e=>({type:"store:item-updated",payload:e}),Be=e=>({type:"store:item-deleted",payload:e}),xt=()=>K,wt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return K.push(t),je().then(()=>y(ze,{todo:t}))},yt=async e=>{let t=K.find(r=>r.id===e.id);return t?(Object.assign(t,e),je().then(()=>y(Lr,{todo:t}))):!1},vt=async e=>{let t=K.findIndex(r=>r.id===e);return t<0?!1:(K.splice(t,1),je().then(()=>y(Be,{todoId:e})))},bt=async()=>{K=JSON.parse(localStorage.getItem(gt)||"[]"),console.log({todos:K})},je=async()=>{localStorage.setItem(gt,JSON.stringify(K))};var Tt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),St=(e,t)=>fetch(`https://it.nottycanvas.com?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),ke=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await St(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await St(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Tt(r)).json(),{ISIN:a,LONG_NAME:s}=o.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Tt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var qe="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),fe=()=>Object.values(P),ee=()=>P,It=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ge().then(()=>y(U,{changes:[{instrument:e,op:"create"}]}))},Or=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ge().then(()=>y(U,{changes:[{instrument:r,op:"update"}]}))},Ct=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ge().then(()=>y(U,{changes:[{instrument:t,op:"delete"}]}))},Rr=async()=>{P=JSON.parse(localStorage.getItem(qe)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ge=async()=>{localStorage.setItem(qe,JSON.stringify(P))},Mt=async e=>{localStorage.setItem(qe,JSON.stringify(e)),P=e},Pr=2,Ar=10,kt=async()=>{let e=[];for(let t of fe())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Pr*60*1e3){let r=ke.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Or(t),e.push({instrument:t,op:"update"}))}e.length&&y(U,{changes:e}),setTimeout(kt,Ar*1e3)};Rr().then(()=>y(U,{})).then(kt);var Ke="wallets",F={},Ye=e=>({type:"store:wallet-created",payload:e}),Dr=e=>({type:"store:wallet-updated",payload:e}),$r=e=>({type:"store:wallets-updated",payload:e});var Et=()=>Object.values(F),he=()=>F,Nt=async e=>{if(F[e.name])return!1;let t={...e};return F[t.name]=t,Lt().then(()=>y(Ye,{wallet:t}))},Je=async e=>{let{name:t=""}=e;return F[t]?(F[t]=e,Lt().then(()=>y(Dr,{wallet:e}))):!1};var Ur=async()=>{F=JSON.parse(localStorage.getItem(Ke)||"{}"),console.log({wallets:F})},Lt=async()=>{localStorage.setItem(Ke,JSON.stringify(F))},Ot=async e=>{localStorage.setItem(Ke,JSON.stringify(e)),F=e};Ur().then(()=>y($r,{}));var Ze=e=>t=>({type:e,payload:t}),Qe=e=>t=>{let r=t.target,{xname:o="",xid:a=""}=r.dataset;o&&y(Ze(`${o}:${e}`),{xname:o,xid:a,ev:t})},I=e=>Ze(e),Xe=e=>Ze(e),Rt=()=>{document.addEventListener("click",Qe("click")),document.addEventListener("keyup",Qe("keyup")),document.addEventListener("keydown",Qe("keydown"))};function _r(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Vr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Pt=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Vr(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=_r(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var T="-ms-",te="-moz-",m="-webkit-",Ee="comm",re="rule",ne="decl";var At="@import";var Ne="@keyframes";var Dt=Math.abs,X=String.fromCharCode,$t=Object.assign;function Ut(e,t){return(((t<<2^C(e,0))<<2^C(e,1))<<2^C(e,2))<<2^C(e,3)}function Le(e){return e.trim()}function _t(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ge(e,t){return e.indexOf(t)}function C(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function E(e){return e.length}function oe(e){return e.length}function ae(e,t){return t.push(e),e}function Vt(e,t){return e.map(t).join("")}var Oe=1,se=1,Wt=0,N=0,v=0,ce="";function xe(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:Oe,column:se,length:i,return:""}}function le(e,t){return $t(xe("",null,null,"",null,null,0),e,{length:-e.length},t)}function Ft(){return v}function Ht(){return v=N>0?C(ce,--N):0,se--,v===10&&(se=1,Oe--),v}function L(){return v=N<Wt?C(ce,N++):0,se++,v===10&&(se=1,Oe++),v}function $(){return C(ce,N)}function we(){return N}function ue(e,t){return Y(ce,e,t)}function ie(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Re(e){return Oe=se=1,Wt=E(ce=e),N=0,[]}function Pe(e){return ce="",e}function de(e){return Le(ue(N-1,et(e===91?e+2:e===40?e+1:e)))}function zt(e){for(;(v=$())&&v<33;)L();return ie(e)>2||ie(v)>3?"":" "}function Bt(e,t){for(;--t&&L()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return ue(e,we()+(t<6&&$()==32&&L()==32))}function et(e){for(;L();)switch(v){case e:return N;case 34:case 39:e!==34&&e!==39&&et(v);break;case 40:e===41&&et(e);break;case 92:L();break}return N}function jt(e,t){for(;L()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+ue(t,N-1)+"*"+X(e===47?e:L())}function qt(e){for(;!ie($());)L();return ue(e,N)}function Yt(e){return Pe(Ae("",null,null,null,[""],e=Re(e),0,[0],e))}function Ae(e,t,r,o,a,s,i,c,u){for(var p=0,d=0,h=i,O=0,B=0,A=0,x=1,R=1,b=1,M=0,V="",pe=a,q=s,W=o,w=V;R;)switch(A=M,M=L()){case 40:if(A!=108&&w.charCodeAt(h-1)==58){ge(w+=f(de(M),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=de(M);break;case 9:case 10:case 13:case 32:w+=zt(A);break;case 92:w+=Bt(we()-1,7);continue;case 47:switch($()){case 42:case 47:ae(Wr(jt(L(),we()),t,r),u);break;default:w+="/"}break;case 123*x:c[p++]=E(w)*b;case 125*x:case 59:case 0:switch(M){case 0:case 125:R=0;case 59+d:B>0&&E(w)-h&&ae(B>32?Kt(w+";",o,r,h-1):Kt(f(w," ","")+";",o,r,h-2),u);break;case 59:w+=";";default:if(ae(W=Gt(w,t,r,p,d,a,c,V,pe=[],q=[],h),s),M===123)if(d===0)Ae(w,t,W,W,pe,s,h,c,q);else switch(O){case 100:case 109:case 115:Ae(e,W,W,o&&ae(Gt(e,W,W,0,0,a,c,V,a,pe=[],h),q),a,q,h,c,o?pe:q);break;default:Ae(w,W,W,W,[""],q,0,c,q)}}p=d=B=0,x=b=1,V=w="",h=i;break;case 58:h=1+E(w),B=A;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&Ht()==125)continue}switch(w+=X(M),M*x){case 38:b=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(E(w)-1)*b,b=1;break;case 64:$()===45&&(w+=de(L())),O=$(),d=h=E(V=w+=qt(we())),M++;break;case 45:A===45&&E(w)==2&&(x=0)}}return s}function Gt(e,t,r,o,a,s,i,c,u,p,d){for(var h=a-1,O=a===0?s:[""],B=oe(O),A=0,x=0,R=0;A<o;++A)for(var b=0,M=Y(e,h+1,h=Dt(x=i[A])),V=e;b<B;++b)(V=Le(x>0?O[b]+" "+M:f(M,/&\f/g,O[b])))&&(u[R++]=V);return xe(e,t,r,a===0?re:c,u,p,d)}function Wr(e,t,r){return xe(e,t,r,Ee,X(Ft()),Y(e,2,-2),0)}function Kt(e,t,r,o){return xe(e,t,r,ne,Y(e,0,o),Y(e,o+1,-1),o)}function tt(e,t){switch(Ut(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+te+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(C(e,t+1)){case 109:if(C(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+te+(C(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ge(e,"stretch")?tt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(C(e,t+1)!==115)break;case 6444:switch(C(e,E(e)-3-(~ge(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(C(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(C(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function J(e,t){for(var r="",o=oe(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function Jt(e,t,r,o){switch(e.type){case At:case ne:return e.return=e.return||e.value;case Ee:return"";case Ne:return e.return=e.value+"{"+J(e.children,o)+"}";case re:e.value=e.props.join(",")}return E(r=J(e.children,o))?e.return=e.value+"{"+r+"}":""}function Qt(e){var t=oe(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function Zt(e){return function(t){t.root||(t=t.return)&&e(t)}}function Xt(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case ne:e.return=tt(e.value,e.length);break;case Ne:return J([le(e,{value:f(e.value,"@","@"+m)})],o);case re:if(e.length)return Vt(e.props,function(a){switch(_t(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([le(e,{props:[f(a,/:(read-\w+)/,":"+te+"$1")]})],o);case"::placeholder":return J([le(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),le(e,{props:[f(a,/:(plac\w+)/,":"+te+"$1")]}),le(e,{props:[f(a,/:(plac\w+)/,T+"input-$1")]})],o)}return""})}}function Fr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var er=Fr;var Hr=function(t,r,o){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[o]=1),!ie(s);)L();return ue(t,N)},zr=function(t,r){var o=-1,a=44;do switch(ie(a)){case 0:a===38&&$()===12&&(r[o]=1),t[o]+=Hr(N-1,r,o);break;case 2:t[o]+=de(a);break;case 4:if(a===44){t[++o]=$()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=X(a)}while(a=L());return t},Br=function(t,r){return Pe(zr(Re(t),r))},tr=new WeakMap,jr=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!tr.get(o))&&!a){tr.set(t,!0);for(var s=[],i=Br(r,s),c=o.props,u=0,p=0;u<i.length;u++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[u]?i[u].replace(/&\f/g,c[d]):c[d]+" "+i[u]}}},qr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var Gr=[Xt],Kr=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(x){var R=x.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||Gr,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var R=x.getAttribute("data-emotion").split(" "),b=1;b<R.length;b++)s[R[b]]=!0;c.push(x)});var u,p=[jr,qr];{var d,h=[Jt,Zt(function(x){d.insert(x)})],O=Qt(p.concat(a,h)),B=function(R){return J(Yt(R),O)};u=function(R,b,M,V){d=M,B(R?R+"{"+b.styles+"}":b.styles),V&&(A.inserted[b.name]=!0)}}var A={key:r,sheet:new Pt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:u};return A.sheet.hydrate(c),A},rr=Kr;function Yr(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var nr=Yr;var Jr={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},or=Jr;var Qr=/[A-Z]|^ms/g,Zr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,cr=function(t){return t.charCodeAt(1)===45},ar=function(t){return t!=null&&typeof t!="boolean"},rt=er(function(e){return cr(e)?e:e.replace(Qr,"-$&").toLowerCase()}),sr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Zr,function(o,a,s){return H={name:a,styles:s,next:H},a})}return or[t]!==1&&!cr(t)&&typeof r=="number"&&r!==0?r+"px":r};function ye(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return H={name:r.name,styles:r.styles,next:H},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)H={name:o.name,styles:o.styles,next:H},o=o.next;var a=r.styles+";";return a}return Xr(e,t,r)}case"function":{if(e!==void 0){var s=H,i=r(e);return H=s,ye(e,t,i)}break}case"string":if(!1)var c,u;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function Xr(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=ye(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":ar(i)&&(o+=rt(s)+":"+sr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)ar(i[c])&&(o+=rt(s)+":"+sr(s,i[c])+";");else{var u=ye(e,t,i);switch(s){case"animation":case"animationName":{o+=rt(s)+":"+u+";";break}default:o+=s+"{"+u+"}"}}}return o}var ir=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var H,De=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";H=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=ye(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=ye(o,r,t[c]),a&&(s+=i[c]);var u;ir.lastIndex=0;for(var p="",d;(d=ir.exec(s))!==null;)p+="-"+d[1];var h=nr(s)+p;return{name:h,styles:s,next:H}};var en=!0;function nt(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var lr=function(t,r,o){var a=t.key+"-"+r.name;if((o===!1||en===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function ur(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function dr(e,t,r){var o=[],a=nt(e,o,r);return o.length<2?r:a+t(o)}var tn=function(t){var r=rr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered,void 0);return lr(r,h,!1),r.key+"-"+h.name},a=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered),O="animation-"+h.name;return ur(r,{name:h.name,styles:"@keyframes "+O+"{"+h.styles+"}"}),O},s=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered);ur(r,h)},i=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];return dr(r.registered,o,rn(p))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(u){u.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:nt.bind(null,r.registered),merge:dr.bind(null,r.registered,o)}},rn=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},pr=tn;var z=pr({key:"css"}),$o=z.flush,Uo=z.hydrate,mr=z.cx,_o=z.merge,Vo=z.getRegisteredStyles,fr=z.injectGlobal,Wo=z.keyframes,_=z.css,Fo=z.sheet,Ho=z.cache;var nn=_`
  cursor: pointer;
`,on=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,n("button",{class:r.variant==="text"?on:nn,...r},t)},ot=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+mt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&ft(s)},...r},t)};var hr=()=>{let e=n("div",null,n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet."));return e.onMount=()=>{console.log("ViewHome mounted!")},e};var gr=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var an=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),sn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),cn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2}),$e=e=>an.format(typeof e=="string"?new Date(e):e),at=e=>{let t=sn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},k=e=>cn.format(e);var ln=_`
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
    .small {
      font-size: 0.9rem;
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
`,ct,ve,xr=({changes:e}={})=>{if(be()==="instruments"){if(!e){G(ve,...fe().map(t=>n(st,{instrument:t})));return}for(let t of e){let r=me({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":j(ve,n(st,{instrument:t.instrument}));break;case"update":r&&We(ve,n(st,{instrument:t.instrument}),r);break;case"delete":r&&Ce(ve,r);break}}}},it=()=>ct.value="";g(U,xr);g(I("clear-new-instrument:click"),it);g(I("add-new-instrument:click"),async()=>{let e=ct.value,t=ke.find(o=>o.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){it();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await It(r),it()});g(I("instrument-delete:click"),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Ct(e)});var st=({instrument:e})=>n("tr",{xname:"instrument",xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",{class:"small"},$e(e.latestUpdate)),n("td",null,n(D,{xname:"instrument-delete",xid:e.code,variant:"text"},"Delete"))),wr=()=>{let e=n("div",{class:ln},n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),n("div",null,n("input",{xname:"new-instrument"}),"  ",n(D,{xname:"add-new-instrument"},"Add instrument"),"  ",n(D,{xname:"clear-new-instrument",variant:"text"},"Clear")),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:"instrument-list"}));return e.onMount=()=>{ct=S({xname:"new-instrument"}),ve=S({xname:"instrument-list"}),xr(),console.log("ViewInstruments mounted!")},e};var un=_`
  -label: view-wallets;

  [data-xname='new-wallet-name'] {
    width: 200px;
    font-size: 0.8rem;
  }
  [data-xname='new-wallet-comment'] {
    width: 500px;
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

      [data-xname='toggle-instruments'] {
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
      .comment {
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
`,ut;var lt,Ue={},yr=()=>{ut.value=""},Te=()=>{if(be()!=="wallets")return;let e=n(l,null,Et().map(r=>n(dn,{wallet:r}))),t=dt();pt(".new-instrument-field",lt,e),G(lt,e),t.focus()};g(I("add-new-wallet:click"),async()=>{let e=ut?.value||"";if(!e)return;if(!await Nt({name:e,comment:"",instruments:[]})){alert("Failed to create a wallet");return}yr()});g(I("clear-new-wallet:click"),()=>{yr()});g(I("toggle-instruments:click"),({xid:e=""})=>{Ue[e]=!Ue[e],S({xname:"instruments",xid:e}).classList.toggle("expanded",Ue[e])});var vr=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},at(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")};g(I("wallet-new-clear-instrument:click"),({xid:e=""})=>{vr(S({xname:"wallet",xid:e}))});g(I("wallet-delete-instrument:click"),({xid:e=""})=>{let[t,r]=e.split(":"),o=he()[t],a=o.instruments.find(({id:s})=>""+s===r);!o||!confirm(`Delete instrument ${a?.code} from wallet ${o.name}?`)||(o.instruments=o.instruments.filter(({id:s})=>""+s!==r),Je(o),Te())});g(I("wallet-new-add-instrument:click"),({xid:e=""})=>{let t=he()[e];if(!t){alert("Wallet "+e+" not found");return}let r=S({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")}),Je(t),vr(r),Te()});g(Ye,Te);g(U,Te);var dn=({wallet:e})=>{let t=ee(),r=e.instruments.map(i=>{let c=t[i.code]?.latestPrice||0,u=i.totalPrice/i.unitPrice,p=c*u;return{id:i.id,instrumentName:t[i.code]?.name??"???",instrumentUrl:t[i.code]?.sourceUrl,instrumentType:t[i.code]?.type,change:p/i.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:u,paidTotal:i.totalPrice,paidUnit:i.unitPrice,paidDate:i.date,updatedAt:t[i.code]?.latestUpdate||""}}),o=r.reduce((i,c)=>i+c.currentTotal,0),a=r.reduce((i,c)=>i+c.paidTotal,0),s=$e(r.reduce((i,c)=>i<c.updatedAt?i:c.updatedAt,new Date("2030-01-01").toISOString()));return n("div",{xname:"wallet",xid:e.name},n("div",{class:"title"},n("div",{xname:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{class:"comment"},s),n("div",{class:"summary"},n("div",{class:""},"Change\xA0",n("b",null,k(o-a)),"\xA0(",n("b",null,k(o/a*100-100),"%"),")"),n("div",{class:""},"Value ",n("b",null,k(o))),n("div",{class:""},"Paid ",n("b",null,k(a))))),n("table",{xname:"instruments",xid:e.name,class:mr({expanded:Ue[e.name]})},n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"})),r.map(i=>n("tr",null,n("td",{class:"instrument-name"},n("a",{href:i.instrumentUrl,target:"_blank"},"(",i.instrumentType,") ",i.instrumentName)),n("td",{class:"price"},k(i.currentTotal-i.paidTotal)),n("td",{class:"percent"},k(i.change)),n("td",{class:"price"},k(i.currentTotal)),n("td",{class:"price"},k(i.currentUnit)),n("td",{class:"price"},k(i.unitCount)),n("td",{class:"price"},k(i.paidTotal)),n("td",{class:"price"},k(i.paidUnit)),n("td",{class:"date"},i.paidDate),n("td",{class:"actions"},n(D,{xname:"wallet-delete-instrument",xid:`${e.name}:${i.id}`,variant:"text"},"Delete")))),n("tr",{class:"total"},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},k(o-a)),n("td",{class:"percent"},k(o/a*100-100)),n("td",{class:"price"},k(o)),n("td",{class:"price"},k(a)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"date"}),n("td",{class:"actions"})),n("tr",null,n("td",null,n("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},n("option",{value:""}),fe().map(i=>n("option",{value:i.code},"(",i.type,") ",i.name)))),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),n("td",{class:"date"},n("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:at(new Date),class:"new-instrument-field"})),n("td",{class:"actions"},n(D,{xname:"wallet-new-add-instrument",xid:e.name},"Add"),n(D,{xname:"wallet-new-clear-instrument",xid:e.name,variant:"text"},"Clear")))))},br=()=>{let e=n("div",{class:un},n("div",null,n("input",{xname:"new-wallet-name"}),"  ",n(D,{xname:"add-new-wallet"},"Create wallet"),"  ",n(D,{xname:"clear-new-wallet",variant:"text"},"Clear")),n("div",{xname:"wallet-list"}));return e.onMount=()=>{ut=S({xname:"new-wallet-name"}),lt=S({xname:"wallet-list"}),Te(),console.log("ViewWallets mounted!")},e};var Ie,Se,Tr=()=>{Se.focus();let e=Se.value.trim();!e||(Se.value="",wt(e))},pn=gr((e,t)=>{yt({done:!1,text:t,id:e})},500);g(I("todo-delete:click"),({xid:e=""})=>{vt(e)});g(I("create-todo:click"),()=>{Tr()});g(Xe("new-item-text:keyup"),({ev:e})=>{e.key==="Enter"&&Tr()});g(Xe("todo-text:keyup"),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&pn(t,r)});g(Be,({todoId:e})=>{Ce(Ie,S({el:Ie,xname:"todo",xid:e}))});g(ze,({todo:e})=>{j(Ie,n(Sr,{todo:e}))});var Sr=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xname:"todo-delete",xid:e.id}," X "),"\xA0",n("input",{xname:"todo-text",xid:e.id,value:e.text})),Ir=()=>{let e=n("div",null,n("div",null,n("input",{xname:"new-item-text"}),"\xA0",n("button",{xname:"create-todo"},"Add")),n("ol",{xname:"items"}));return e.onMount=async()=>{Ie=S({xname:"items"}),Se=S({xname:"new-item-text"}),Se.focus(),await bt(),G(Ie,...xt().map(t=>n(Sr,{todo:t}))),console.log("ViewTodo mounted!")},e};var mn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,_e;g(I("migration-export:click"),()=>{let e=he(),t=ee();Q(_e,JSON.stringify({instruments:t,wallets:e},null,2)),_e.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(_e,""));console.log({wallets:e,instruments:t}),await Mt(t),await Ot(e),y(U,{})}catch(e){alert("Failed to load data: "+e)}});var Cr=()=>{let e=n("div",{class:mn},n("div",null,n(D,{xname:"migration-export"},"Export from LS")," ",n(D,{xname:"migration-import"},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{_e=S({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Ve={home:{label:"Home",Component:hr},wallets:{label:"Wallets",Component:br},instruments:{label:"Instruments",Component:wr},todo:{label:"Todo",Component:Ir},migration:{label:"Data migration",Component:Cr}},be=()=>new URLSearchParams(window.location.search).get("view")||"home",Mr=()=>{let{Component:e,label:t}=Ve[be()]||Ve.home;return{Component:e,label:t}};var fn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,kr=()=>{let[,...e]=Object.entries(Ve);return n("div",{class:fn},n(ot,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(l,null,o>0?" | ":"",n(ot,{view:t},r.label))))};fr`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    //margin: 0 auto;
    width: 1000px;
    margin: 0 auto;
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

`;var Er;g(Fe,()=>{let{Component:e}=Mr();G(Er,n(e,null))});var Nr=()=>{let e=n("div",{class:"app"},n(kr,null),n("hr",null),n("div",{xname:"current-view"}));return e.onMount=()=>{Er=S({xname:"current-view"}),console.log("App mounted!")},e};Rt();j(document.body,n(Nr,null));ht();})();
