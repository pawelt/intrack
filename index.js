(()=>{var G=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},q=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},_e=(e,t,r)=>{let n=e.replaceChild(t,r);return t.onMount&&t.onMount(),n},Ce=(e,t)=>e.removeChild(t),me=({el:e=document,sel:t="",xname:r,xid:n})=>{let s=`[data-xname="${r}"]`,a=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${s}${a}`)},T=({el:e=document,sel:t="",xname:r,xid:n})=>{let s=`[data-xname="${r}"]`,a=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${s}${a}`)},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=me(e);n&&(n.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=me(e);return n?n.value:t},dt=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},pt=(e,t,r)=>{t.querySelectorAll(e).forEach(n=>{let{xname:s,xid:a}=n.dataset;if(!s||!a)return;let i=me({el:r,xname:s,xid:a});if(!i)return;let c=i.parentElement;!c||_e(c,n,i)})};var l=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>G(r,typeof n=="object"?n:document.createTextNode(n))),r},o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([s,a])=>{s.startsWith("on")&&typeof a=="function"?n.addEventListener(s.substring(2).toLowerCase(),a):s.startsWith("data-")?n.dataset[s.substring(5)]=""+a:s==="xname"||s==="xid"?n.dataset[s]=""+a:n.setAttribute(s,""+a)}),r.flat().forEach(s=>G(n,typeof s=="object"?s:document.createTextNode(s))),n};var Me={},y=(e,t)=>{let{type:r}=e({});for(let n of Me[r]||[])n(t);return!0},g=(e,t)=>{let{type:r}=e({});return Me[r]=Me[r]||[],Me[r].push(t),!0};var mt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let s=new URL(""+e);s.pathname=t??s.pathname;let a=r??n;if(!a)return s;let i=new URLSearchParams(r?s.search:"");for(let c in a){let u=a[c];Array.isArray(u)?(i.delete(c),u.forEach(p=>i.append(c,p))):u!==void 0?i.set(c,u):i.delete(c)}return s.search=""+i,s},We=e=>({type:"router:navigate",payload:e}),Fe=e=>{y(We,{newUrl:new URL(e)})},ft=e=>{let t=""+e;window.history.pushState(null,"",t),Fe(t)};var ht=()=>Fe(window.location.href);window.addEventListener("popstate",()=>Fe(window.location.href));var gt="todos",K=[],He=e=>({type:"store:item-created",payload:e}),Lr=e=>({type:"store:item-updated",payload:e}),ze=e=>({type:"store:item-deleted",payload:e}),xt=()=>K,wt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return K.push(t),Be().then(()=>y(He,{todo:t}))},yt=async e=>{let t=K.find(r=>r.id===e.id);return t?(Object.assign(t,e),Be().then(()=>y(Lr,{todo:t}))):!1},vt=async e=>{let t=K.findIndex(r=>r.id===e);return t<0?!1:(K.splice(t,1),Be().then(()=>y(ze,{todoId:e})))},bt=async()=>{K=JSON.parse(localStorage.getItem(gt)||"[]"),console.log({todos:K})},Be=async()=>{localStorage.setItem(gt,JSON.stringify(K))};var Tt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),ke=[{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Tt(r)).json(),{ISIN:s,LONG_NAME:a}=n.rows[0].values;return Object.assign(e,{name:a,isin:s,code:t}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Tt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ge="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),fe=()=>Object.values(P),ee=()=>P,St=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,je().then(()=>y(U,{changes:[{instrument:e,op:"create"}]}))},Rr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),je().then(()=>y(U,{changes:[{instrument:r,op:"update"}]}))},It=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],je().then(()=>y(U,{changes:[{instrument:t,op:"delete"}]}))},Or=async()=>{P=JSON.parse(localStorage.getItem(Ge)||"{}"),console.log({instruments:P})},je=async()=>{localStorage.setItem(Ge,JSON.stringify(P))},Ct=async e=>{localStorage.setItem(Ge,JSON.stringify(e)),P=e},Ar=2,Pr=10,Mt=async()=>{let e=[];for(let t of fe())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Ar*60*1e3){let r=ke.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Rr(t),e.push({instrument:t,op:"update"}))}e.length&&y(U,{changes:e}),setTimeout(Mt,Pr*1e3)};Mt();Or().then(()=>y(U,{}));var qe="wallets",F={},Ke=e=>({type:"store:wallet-created",payload:e}),Dr=e=>({type:"store:wallet-updated",payload:e}),$r=e=>({type:"store:wallets-updated",payload:e});var kt=()=>Object.values(F),he=()=>F,Et=async e=>{if(F[e.name])return!1;let t={...e};return F[t.name]=t,Nt().then(()=>y(Ke,{wallet:t}))},Ye=async e=>{let{name:t=""}=e;return F[t]?(F[t]=e,Nt().then(()=>y(Dr,{wallet:e}))):!1};var Ur=async()=>{F=JSON.parse(localStorage.getItem(qe)||"{}"),console.log({wallets:F})},Nt=async()=>{localStorage.setItem(qe,JSON.stringify(F))},Lt=async e=>{localStorage.setItem(qe,JSON.stringify(e)),F=e};Ur().then(()=>y($r,{}));var Qe=e=>t=>({type:e,payload:t}),Je=e=>t=>{let r=t.target,{xname:n="",xid:s=""}=r.dataset;n&&y(Qe(`${n}:${e}`),{xname:n,xid:s,ev:t})},I=e=>Qe(e),Ze=e=>Qe(e),Rt=()=>{document.addEventListener("click",Je("click")),document.addEventListener("keyup",Je("keyup")),document.addEventListener("keydown",Je("keydown"))};function Vr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function _r(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Ot=function(){function e(r){var n=this;this._insertTag=function(s){var a;n.tags.length===0?n.insertionPoint?a=n.insertionPoint.nextSibling:n.prepend?a=n.container.firstChild:a=n.before:a=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(s,a),n.tags.push(s)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(_r(this));var s=this.tags[this.tags.length-1];if(!1)var a;if(this.isSpeedy){var i=Vr(s);try{i.insertRule(n,i.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",te="-moz-",m="-webkit-",Ee="comm",re="rule",ne="decl";var At="@import";var Ne="@keyframes";var Pt=Math.abs,X=String.fromCharCode,Dt=Object.assign;function $t(e,t){return(((t<<2^C(e,0))<<2^C(e,1))<<2^C(e,2))<<2^C(e,3)}function Le(e){return e.trim()}function Ut(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ge(e,t){return e.indexOf(t)}function C(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function E(e){return e.length}function oe(e){return e.length}function ae(e,t){return t.push(e),e}function Vt(e,t){return e.map(t).join("")}var Re=1,se=1,_t=0,N=0,v=0,ce="";function xe(e,t,r,n,s,a,i){return{value:e,root:t,parent:r,type:n,props:s,children:a,line:Re,column:se,length:i,return:""}}function le(e,t){return Dt(xe("",null,null,"",null,null,0),e,{length:-e.length},t)}function Wt(){return v}function Ft(){return v=N>0?C(ce,--N):0,se--,v===10&&(se=1,Re--),v}function L(){return v=N<_t?C(ce,N++):0,se++,v===10&&(se=1,Re++),v}function $(){return C(ce,N)}function we(){return N}function ue(e,t){return Y(ce,e,t)}function ie(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Oe(e){return Re=se=1,_t=E(ce=e),N=0,[]}function Ae(e){return ce="",e}function de(e){return Le(ue(N-1,Xe(e===91?e+2:e===40?e+1:e)))}function Ht(e){for(;(v=$())&&v<33;)L();return ie(e)>2||ie(v)>3?"":" "}function zt(e,t){for(;--t&&L()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return ue(e,we()+(t<6&&$()==32&&L()==32))}function Xe(e){for(;L();)switch(v){case e:return N;case 34:case 39:e!==34&&e!==39&&Xe(v);break;case 40:e===41&&Xe(e);break;case 92:L();break}return N}function Bt(e,t){for(;L()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+ue(t,N-1)+"*"+X(e===47?e:L())}function Gt(e){for(;!ie($());)L();return ue(e,N)}function Kt(e){return Ae(Pe("",null,null,null,[""],e=Oe(e),0,[0],e))}function Pe(e,t,r,n,s,a,i,c,u){for(var p=0,d=0,h=i,R=0,B=0,A=0,x=1,O=1,b=1,M=0,_="",pe=s,j=a,W=n,w=_;O;)switch(A=M,M=L()){case 40:if(A!=108&&w.charCodeAt(h-1)==58){ge(w+=f(de(M),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=de(M);break;case 9:case 10:case 13:case 32:w+=Ht(A);break;case 92:w+=zt(we()-1,7);continue;case 47:switch($()){case 42:case 47:ae(Wr(Bt(L(),we()),t,r),u);break;default:w+="/"}break;case 123*x:c[p++]=E(w)*b;case 125*x:case 59:case 0:switch(M){case 0:case 125:O=0;case 59+d:B>0&&E(w)-h&&ae(B>32?qt(w+";",n,r,h-1):qt(f(w," ","")+";",n,r,h-2),u);break;case 59:w+=";";default:if(ae(W=jt(w,t,r,p,d,s,c,_,pe=[],j=[],h),a),M===123)if(d===0)Pe(w,t,W,W,pe,a,h,c,j);else switch(R){case 100:case 109:case 115:Pe(e,W,W,n&&ae(jt(e,W,W,0,0,s,c,_,s,pe=[],h),j),s,j,h,c,n?pe:j);break;default:Pe(w,W,W,W,[""],j,0,c,j)}}p=d=B=0,x=b=1,_=w="",h=i;break;case 58:h=1+E(w),B=A;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&Ft()==125)continue}switch(w+=X(M),M*x){case 38:b=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(E(w)-1)*b,b=1;break;case 64:$()===45&&(w+=de(L())),R=$(),d=h=E(_=w+=Gt(we())),M++;break;case 45:A===45&&E(w)==2&&(x=0)}}return a}function jt(e,t,r,n,s,a,i,c,u,p,d){for(var h=s-1,R=s===0?a:[""],B=oe(R),A=0,x=0,O=0;A<n;++A)for(var b=0,M=Y(e,h+1,h=Pt(x=i[A])),_=e;b<B;++b)(_=Le(x>0?R[b]+" "+M:f(M,/&\f/g,R[b])))&&(u[O++]=_);return xe(e,t,r,s===0?re:c,u,p,d)}function Wr(e,t,r){return xe(e,t,r,Ee,X(Wt()),Y(e,2,-2),0)}function qt(e,t,r,n){return xe(e,t,r,ne,Y(e,0,n),Y(e,n+1,-1),n)}function et(e,t){switch($t(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+te+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(C(e,t+1)){case 109:if(C(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+te+(C(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ge(e,"stretch")?et(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(C(e,t+1)!==115)break;case 6444:switch(C(e,E(e)-3-(~ge(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(C(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(C(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",n=oe(e),s=0;s<n;s++)r+=t(e[s],s,e,t)||"";return r}function Yt(e,t,r,n){switch(e.type){case At:case ne:return e.return=e.return||e.value;case Ee:return"";case Ne:return e.return=e.value+"{"+J(e.children,n)+"}";case re:e.value=e.props.join(",")}return E(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function Jt(e){var t=oe(e);return function(r,n,s,a){for(var i="",c=0;c<t;c++)i+=e[c](r,n,s,a)||"";return i}}function Qt(e){return function(t){t.root||(t=t.return)&&e(t)}}function Zt(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ne:e.return=et(e.value,e.length);break;case Ne:return J([le(e,{value:f(e.value,"@","@"+m)})],n);case re:if(e.length)return Vt(e.props,function(s){switch(Ut(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([le(e,{props:[f(s,/:(read-\w+)/,":"+te+"$1")]})],n);case"::placeholder":return J([le(e,{props:[f(s,/:(plac\w+)/,":"+m+"input-$1")]}),le(e,{props:[f(s,/:(plac\w+)/,":"+te+"$1")]}),le(e,{props:[f(s,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function Fr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Xt=Fr;var Hr=function(t,r,n){for(var s=0,a=0;s=a,a=$(),s===38&&a===12&&(r[n]=1),!ie(a);)L();return ue(t,N)},zr=function(t,r){var n=-1,s=44;do switch(ie(s)){case 0:s===38&&$()===12&&(r[n]=1),t[n]+=Hr(N-1,r,n);break;case 2:t[n]+=de(s);break;case 4:if(s===44){t[++n]=$()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=X(s)}while(s=L());return t},Br=function(t,r){return Ae(zr(Oe(t),r))},er=new WeakMap,Gr=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,s=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!er.get(n))&&!s){er.set(t,!0);for(var a=[],i=Br(r,a),c=n.props,u=0,p=0;u<i.length;u++)for(var d=0;d<c.length;d++,p++)t.props[p]=a[u]?i[u].replace(/&\f/g,c[d]):c[d]+" "+i[u]}}},jr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var qr=[Zt],Kr=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var O=x.getAttribute("data-emotion");O.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var s=t.stylisPlugins||qr,a={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var O=x.getAttribute("data-emotion").split(" "),b=1;b<O.length;b++)a[O[b]]=!0;c.push(x)});var u,p=[Gr,jr];{var d,h=[Yt,Qt(function(x){d.insert(x)})],R=Jt(p.concat(s,h)),B=function(O){return J(Kt(O),R)};u=function(O,b,M,_){d=M,B(O?O+"{"+b.styles+"}":b.styles),_&&(A.inserted[b.name]=!0)}}var A={key:r,sheet:new Ot({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:a,registered:{},insert:u};return A.sheet.hydrate(c),A},tr=Kr;function Yr(e){for(var t=0,r,n=0,s=e.length;s>=4;++n,s-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(s){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var rr=Yr;var Jr={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},nr=Jr;var Qr=/[A-Z]|^ms/g,Zr=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ir=function(t){return t.charCodeAt(1)===45},or=function(t){return t!=null&&typeof t!="boolean"},tt=Xt(function(e){return ir(e)?e:e.replace(Qr,"-$&").toLowerCase()}),ar=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Zr,function(n,s,a){return H={name:s,styles:a,next:H},s})}return nr[t]!==1&&!ir(t)&&typeof r=="number"&&r!==0?r+"px":r};function ye(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return H={name:r.name,styles:r.styles,next:H},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)H={name:n.name,styles:n.styles,next:H},n=n.next;var s=r.styles+";";return s}return Xr(e,t,r)}case"function":{if(e!==void 0){var a=H,i=r(e);return H=a,ye(e,t,i)}break}case"string":if(!1)var c,u;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function Xr(e,t,r){var n="";if(Array.isArray(r))for(var s=0;s<r.length;s++)n+=ye(e,t,r[s])+";";else for(var a in r){var i=r[a];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=a+"{"+t[i]+"}":or(i)&&(n+=tt(a)+":"+ar(a,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)or(i[c])&&(n+=tt(a)+":"+ar(a,i[c])+";");else{var u=ye(e,t,i);switch(a){case"animation":case"animationName":{n+=tt(a)+":"+u+";";break}default:n+=a+"{"+u+"}"}}}return n}var sr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var H,De=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var s=!0,a="";H=void 0;var i=t[0];i==null||i.raw===void 0?(s=!1,a+=ye(n,r,i)):a+=i[0];for(var c=1;c<t.length;c++)a+=ye(n,r,t[c]),s&&(a+=i[c]);var u;sr.lastIndex=0;for(var p="",d;(d=sr.exec(a))!==null;)p+="-"+d[1];var h=rr(a)+p;return{name:h,styles:a,next:H}};var en=!0;function rt(e,t,r){var n="";return r.split(" ").forEach(function(s){e[s]!==void 0?t.push(e[s]+";"):n+=s+" "}),n}var cr=function(t,r,n){var s=t.key+"-"+r.name;if((n===!1||en===!1)&&t.registered[s]===void 0&&(t.registered[s]=r.styles),t.inserted[r.name]===void 0){var a=r;do{var i=t.insert(r===a?"."+s:"",a,t.sheet,!0);a=a.next}while(a!==void 0)}};function lr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function ur(e,t,r){var n=[],s=rt(e,n,r);return n.length<2?r:s+t(n)}var tn=function(t){var r=tr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered,void 0);return cr(r,h,!1),r.key+"-"+h.name},s=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered),R="animation-"+h.name;return lr(r,{name:h.name,styles:"@keyframes "+R+"{"+h.styles+"}"}),R},a=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered);lr(r,h)},i=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];return ur(r.registered,n,rn(p))};return{css:n,cx:i,injectGlobal:a,keyframes:s,hydrate:function(u){u.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:rt.bind(null,r.registered),merge:ur.bind(null,r.registered,n)}},rn=function e(t){for(var r="",n=0;n<t.length;n++){var s=t[n];if(s!=null){var a=void 0;switch(typeof s){case"boolean":break;case"object":{if(Array.isArray(s))a=e(s);else{a="";for(var i in s)s[i]&&i&&(a&&(a+=" "),a+=i)}break}default:a=s}a&&(r&&(r+=" "),r+=a)}}return r},dr=tn;var z=dr({key:"css"}),$o=z.flush,Uo=z.hydrate,pr=z.cx,Vo=z.merge,_o=z.getRegisteredStyles,mr=z.injectGlobal,Wo=z.keyframes,V=z.css,Fo=z.sheet,Ho=z.cache;var nn=V`
  cursor: pointer;
`,on=V`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,o("button",{class:r.variant==="text"?on:nn,...r},t)},nt=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+mt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:s=>{s.preventDefault();let{href:a}=s.currentTarget;a&&a!==window.location.href&&ft(a)},...r},t)};var fr=()=>{let e=o("div",null,o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet."));return e.onMount=()=>{console.log("ViewHome mounted!")},e};var hr=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var an=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),sn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),cn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2}),gr=e=>an.format(typeof e=="string"?new Date(e):e),ot=e=>{let t=sn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},k=e=>cn.format(e);var ln=V`
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
`,it,ve,xr=({changes:e}={})=>{if(be()==="instruments"){if(!e){q(ve,...fe().map(t=>o(at,{instrument:t})));return}for(let t of e){let r=me({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":G(ve,o(at,{instrument:t.instrument}));break;case"update":r&&_e(ve,o(at,{instrument:t.instrument}),r);break;case"delete":r&&Ce(ve,r);break}}}},st=()=>it.value="";g(U,xr);g(I("clear-new-instrument:click"),st);g(I("add-new-instrument:click"),async()=>{let e=it.value,t=ke.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){st();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await St(r),st()});g(I("instrument-delete:click"),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await It(e)});var at=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",{class:"small"},gr(e.latestUpdate)),o("td",null,o(D,{xname:"instrument-delete",xid:e.code,variant:"text"},"Delete"))),wr=()=>{let e=o("div",{class:ln},o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://www.euronext.com/nb/markets/oslo"},"oslobors / euronext")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")))),o("div",null,o("input",{xname:"new-instrument"}),"  ",o(D,{xname:"add-new-instrument"},"Add instrument"),"  ",o(D,{xname:"clear-new-instrument",variant:"text"},"Clear")),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"}));return e.onMount=()=>{it=T({xname:"new-instrument"}),ve=T({xname:"instrument-list"}),xr(),console.log("ViewInstruments mounted!")},e};var un=V`
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
`,lt,ut,ct,$e={},yr=()=>{lt.value="",ut.value=""},Te=()=>{if(be()!=="wallets")return;let e=o(l,null,kt().map(r=>o(dn,{wallet:r}))),t=dt();pt(".new-instrument-field",ct,e),q(ct,e),t.focus()};g(I("add-new-wallet:click"),async()=>{let e=lt?.value||"",t=ut?.value||"";if(!e)return;if(!await Et({name:e,comment:t,instruments:[]})){alert("Failed to create a wallet");return}yr()});g(I("clear-new-wallet:click"),()=>{yr()});g(I("toggle-instruments:click"),({xid:e=""})=>{$e[e]=!$e[e],T({xname:"instruments",xid:e}).classList.toggle("expanded",$e[e])});var vr=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},ot(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")};g(I("wallet-new-clear-instrument:click"),({xid:e=""})=>{vr(T({xname:"wallet",xid:e}))});g(I("wallet-delete-instrument:click"),({xid:e=""})=>{let[t,r]=e.split(":"),n=he()[t],s=n.instruments.find(({id:a})=>""+a===r);!n||!confirm(`Delete instrument ${s?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:a})=>""+a!==r),Ye(n),Te())});g(I("wallet-new-add-instrument:click"),({xid:e=""})=>{let t=he()[e];if(!t){alert("Wallet "+e+" not found");return}let r=T({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")}),Ye(t),vr(r),Te()});g(Ke,Te);g(U,Te);var dn=({wallet:e})=>{let t=ee(),r=e.instruments.map(a=>{let i=t[a.code]?.latestPrice||0,c=a.totalPrice/a.unitPrice,u=i*c;return{id:a.id,instrumentName:t[a.code]?.name??"???",instrumentUrl:t[a.code]?.sourceUrl,change:u/a.totalPrice*100-100,currentTotal:u,currentUnit:i,unitCount:c,paidTotal:a.totalPrice,paidUnit:a.unitPrice,paidDate:a.date}}),n=r.reduce((a,i)=>a+i.currentTotal,0),s=r.reduce((a,i)=>a+i.paidTotal,0);return o("div",{xname:"wallet",xid:e.name},o("div",{class:"title"},o("div",{xname:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{class:"comment"},e.comment),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,k(n-s)),"\xA0(",o("b",null,k(n/s*100-100),"%"),")"),o("div",{class:""},"Value ",o("b",null,k(n))),o("div",{class:""},"Paid ",o("b",null,k(s))))),o("table",{xname:"instruments",xid:e.name,class:pr({expanded:$e[e.name]})},o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"})),r.map(a=>o("tr",null,o("td",{class:"instrument-name"},o("a",{href:a.instrumentUrl,target:"_blank"},a.instrumentName)),o("td",{class:"price"},k(a.currentTotal-a.paidTotal)),o("td",{class:"percent"},k(a.change)),o("td",{class:"price"},k(a.currentTotal)),o("td",{class:"price"},k(a.paidTotal)),o("td",{class:"price"},k(a.currentUnit)),o("td",{class:"price"},k(a.unitCount)),o("td",{class:"price"},k(a.paidUnit)),o("td",{class:"date"},a.paidDate),o("td",{class:"actions"},o(D,{xname:"wallet-delete-instrument",xid:`${e.name}:${a.id}`,variant:"text"},"Delete")))),o("tr",{class:"total"},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},k(n-s)),o("td",{class:"percent"},k(n/s*100-100)),o("td",{class:"price"},k(n)),o("td",{class:"price"},k(s)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"date"}),o("td",{class:"actions"})),o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),fe().map(a=>o("option",{value:a.code},a.name)))),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:ot(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(D,{xname:"wallet-new-add-instrument",xid:e.name},"Add"),o(D,{xname:"wallet-new-clear-instrument",xid:e.name,variant:"text"},"Clear")))))},br=()=>{let e=o("div",{class:un},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o("input",{xname:"new-wallet-comment"}),"  ",o(D,{xname:"add-new-wallet"},"Create wallet"),"  ",o(D,{xname:"clear-new-wallet",variant:"text"},"Clear")),o("div",{xname:"wallet-list"}));return e.onMount=()=>{lt=T({xname:"new-wallet-name"}),ut=T({xname:"new-wallet-comment"}),ct=T({xname:"wallet-list"}),Te(),console.log("ViewWallets mounted!")},e};var Ie,Se,Tr=()=>{Se.focus();let e=Se.value.trim();!e||(Se.value="",wt(e))},pn=hr((e,t)=>{yt({done:!1,text:t,id:e})},500);g(I("todo-delete:click"),({xid:e=""})=>{vt(e)});g(I("create-todo:click"),()=>{Tr()});g(Ze("new-item-text:keyup"),({ev:e})=>{e.key==="Enter"&&Tr()});g(Ze("todo-text:keyup"),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&pn(t,r)});g(ze,({todoId:e})=>{Ce(Ie,T({el:Ie,xname:"todo",xid:e}))});g(He,({todo:e})=>{G(Ie,o(Sr,{todo:e}))});var Sr=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xname:"todo-delete",xid:e.id}," X "),"\xA0",o("input",{xname:"todo-text",xid:e.id,value:e.text})),Ir=()=>{let e=o("div",null,o("div",null,o("input",{xname:"new-item-text"}),"\xA0",o("button",{xname:"create-todo"},"Add")),o("ol",{xname:"items"}));return e.onMount=async()=>{Ie=T({xname:"items"}),Se=T({xname:"new-item-text"}),Se.focus(),await bt(),q(Ie,...xt().map(t=>o(Sr,{todo:t}))),console.log("ViewTodo mounted!")},e};var mn=V`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ue;g(I("migration-export:click"),()=>{let e=he(),t=ee();Q(Ue,JSON.stringify({instruments:t,wallets:e},null,2)),Ue.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(Ue,""));console.log({wallets:e,instruments:t}),await Ct(t),await Lt(e),y(U,{})}catch(e){alert("Failed to load data: "+e)}});var Cr=()=>{let e=o("div",{class:mn},o("div",null,o(D,{xname:"migration-export"},"Export from LS")," ",o(D,{xname:"migration-import"},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{Ue=T({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Ve={home:{label:"Home",Component:fr},instruments:{label:"Instruments",Component:wr},wallets:{label:"Wallets",Component:br},todo:{label:"Todo",Component:Ir},migration:{label:"Data migration",Component:Cr}},be=()=>new URLSearchParams(window.location.search).get("view")||"home",Mr=()=>{let{Component:e,label:t}=Ve[be()]||Ve.home;return{Component:e,label:t}};var fn=V`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,kr=()=>{let[,...e]=Object.entries(Ve);return o("div",{class:fn},o(nt,{href:"/"},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(l,null,n>0?" | ":"",o(nt,{view:t},r.label))))};mr`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    //margin: 0 auto;
    //width: 1000px;
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

`;var Er;g(We,()=>{let{Component:e}=Mr();q(Er,o(e,null))});var Nr=()=>{let e=o("div",{class:"app"},o(kr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{Er=T({xname:"current-view"}),console.log("App mounted!")},e};Rt();G(document.body,o(Nr,null));ht();})();
