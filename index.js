(()=>{var j=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},G=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},Ve=(e,t,r)=>{let o=e.replaceChild(t,r);return t.onMount&&t.onMount(),o},Me=(e,t)=>e.removeChild(t),me=({el:e=document,sel:t="",xname:r,xid:o})=>{let s=`[data-xname="${r}"]`,a=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${s}${a}`)},T=({el:e=document,sel:t="",xname:r,xid:o})=>{let s=`[data-xname="${r}"]`,a=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${s}${a}`)},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let o=me(e);o&&(o.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let o=me(e);return o?o.value:t},dt=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},pt=(e,t,r)=>{t.querySelectorAll(e).forEach(o=>{let{xname:s,xid:a}=o.dataset;if(!s||!a)return;let i=me({el:r,xname:s,xid:a});if(!i)return;let c=i.parentElement;!c||Ve(c,o,i)})};var l=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>j(r,typeof o=="object"?o:document.createTextNode(o))),r},n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([s,a])=>{s.startsWith("on")&&typeof a=="function"?o.addEventListener(s.substring(2).toLowerCase(),a):s.startsWith("data-")?o.dataset[s.substring(5)]=""+a:s==="xname"||s==="xid"?o.dataset[s]=""+a:o.setAttribute(s,""+a)}),r.flat().forEach(s=>j(o,typeof s=="object"?s:document.createTextNode(s))),o};var ke={},y=(e,t)=>{let{type:r}=e({});for(let o of ke[r]||[])o(t);return!0},g=(e,t)=>{let{type:r}=e({});return ke[r]=ke[r]||[],ke[r].push(t),!0};var mt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let s=new URL(""+e);s.pathname=t??s.pathname;let a=r??o;if(!a)return s;let i=new URLSearchParams(r?s.search:"");for(let c in a){let u=a[c];Array.isArray(u)?(i.delete(c),u.forEach(p=>i.append(c,p))):u!==void 0?i.set(c,u):i.delete(c)}return s.search=""+i,s},We=e=>({type:"router:navigate",payload:e}),Fe=e=>{y(We,{newUrl:new URL(e)})},ft=e=>{let t=""+e;window.history.pushState(null,"",t),Fe(t)};var ht=()=>Fe(window.location.href);window.addEventListener("popstate",()=>Fe(window.location.href));var gt="todos",K=[],He=e=>({type:"store:item-created",payload:e}),Rr=e=>({type:"store:item-updated",payload:e}),ze=e=>({type:"store:item-deleted",payload:e}),xt=()=>K,wt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return K.push(t),Be().then(()=>y(He,{todo:t}))},yt=async e=>{let t=K.find(r=>r.id===e.id);return t?(Object.assign(t,e),Be().then(()=>y(Rr,{todo:t}))):!1},vt=async e=>{let t=K.findIndex(r=>r.id===e);return t<0?!1:(K.splice(t,1),Be().then(()=>y(ze,{todoId:e})))},bt=async()=>{K=JSON.parse(localStorage.getItem(gt)||"[]"),console.log({todos:K})},Be=async()=>{localStorage.setItem(gt,JSON.stringify(K))};var Tt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),St=(e,t)=>fetch(`https://it.nottycanvas.com?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),fe=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)\/overview/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,s=((await(await St(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],a=t.replace(/-.+$/,"");return Object.assign(e,{name:s,isin:a,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await St(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Tt(r)).json(),{ISIN:s,LONG_NAME:a}=o.rows[0].values;return Object.assign(e,{name:a,isin:s,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Tt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}],Or={sourceUrl:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview"};fe[0].fetchInitialData(Or);var je="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),he=()=>Object.values(P),ee=()=>P,It=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,qe().then(()=>y(U,{changes:[{instrument:e,op:"create"}]}))},Pr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),qe().then(()=>y(U,{changes:[{instrument:r,op:"update"}]}))},Ct=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],qe().then(()=>y(U,{changes:[{instrument:t,op:"delete"}]}))},Ar=async()=>{P=JSON.parse(localStorage.getItem(je)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},qe=async()=>{localStorage.setItem(je,JSON.stringify(P))},Mt=async e=>{localStorage.setItem(je,JSON.stringify(e)),P=e},Dr=2,$r=10,kt=async()=>{let e=[];for(let t of he())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Dr*60*1e3){let r=fe.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Pr(t),e.push({instrument:t,op:"update"}))}e.length&&y(U,{changes:e}),setTimeout(kt,$r*1e3)};kt();Ar().then(()=>y(U,{}));var Ge="wallets",F={},Ke=e=>({type:"store:wallet-created",payload:e}),Ur=e=>({type:"store:wallet-updated",payload:e}),_r=e=>({type:"store:wallets-updated",payload:e});var Et=()=>Object.values(F),ge=()=>F,Nt=async e=>{if(F[e.name])return!1;let t={...e};return F[t.name]=t,Lt().then(()=>y(Ke,{wallet:t}))},Ye=async e=>{let{name:t=""}=e;return F[t]?(F[t]=e,Lt().then(()=>y(Ur,{wallet:e}))):!1};var Vr=async()=>{F=JSON.parse(localStorage.getItem(Ge)||"{}"),console.log({wallets:F})},Lt=async()=>{localStorage.setItem(Ge,JSON.stringify(F))},Rt=async e=>{localStorage.setItem(Ge,JSON.stringify(e)),F=e};Vr().then(()=>y(_r,{}));var Qe=e=>t=>({type:e,payload:t}),Je=e=>t=>{let r=t.target,{xname:o="",xid:s=""}=r.dataset;o&&y(Qe(`${o}:${e}`),{xname:o,xid:s,ev:t})},I=e=>Qe(e),Ze=e=>Qe(e),Ot=()=>{document.addEventListener("click",Je("click")),document.addEventListener("keyup",Je("keyup")),document.addEventListener("keydown",Je("keydown"))};function Wr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Fr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Pt=function(){function e(r){var o=this;this._insertTag=function(s){var a;o.tags.length===0?o.insertionPoint?a=o.insertionPoint.nextSibling:o.prepend?a=o.container.firstChild:a=o.before:a=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(s,a),o.tags.push(s)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Fr(this));var s=this.tags[this.tags.length-1];if(!1)var a;if(this.isSpeedy){var i=Wr(s);try{i.insertRule(o,i.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var S="-ms-",te="-moz-",m="-webkit-",Ee="comm",re="rule",ne="decl";var At="@import";var Ne="@keyframes";var Dt=Math.abs,X=String.fromCharCode,$t=Object.assign;function Ut(e,t){return(((t<<2^C(e,0))<<2^C(e,1))<<2^C(e,2))<<2^C(e,3)}function Le(e){return e.trim()}function _t(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function xe(e,t){return e.indexOf(t)}function C(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function E(e){return e.length}function oe(e){return e.length}function ae(e,t){return t.push(e),e}function Vt(e,t){return e.map(t).join("")}var Re=1,se=1,Wt=0,N=0,v=0,ce="";function we(e,t,r,o,s,a,i){return{value:e,root:t,parent:r,type:o,props:s,children:a,line:Re,column:se,length:i,return:""}}function le(e,t){return $t(we("",null,null,"",null,null,0),e,{length:-e.length},t)}function Ft(){return v}function Ht(){return v=N>0?C(ce,--N):0,se--,v===10&&(se=1,Re--),v}function L(){return v=N<Wt?C(ce,N++):0,se++,v===10&&(se=1,Re++),v}function $(){return C(ce,N)}function ye(){return N}function ue(e,t){return Y(ce,e,t)}function ie(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Oe(e){return Re=se=1,Wt=E(ce=e),N=0,[]}function Pe(e){return ce="",e}function de(e){return Le(ue(N-1,Xe(e===91?e+2:e===40?e+1:e)))}function zt(e){for(;(v=$())&&v<33;)L();return ie(e)>2||ie(v)>3?"":" "}function Bt(e,t){for(;--t&&L()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return ue(e,ye()+(t<6&&$()==32&&L()==32))}function Xe(e){for(;L();)switch(v){case e:return N;case 34:case 39:e!==34&&e!==39&&Xe(v);break;case 40:e===41&&Xe(e);break;case 92:L();break}return N}function jt(e,t){for(;L()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+ue(t,N-1)+"*"+X(e===47?e:L())}function qt(e){for(;!ie($());)L();return ue(e,N)}function Yt(e){return Pe(Ae("",null,null,null,[""],e=Oe(e),0,[0],e))}function Ae(e,t,r,o,s,a,i,c,u){for(var p=0,d=0,h=i,R=0,B=0,A=0,x=1,O=1,b=1,M=0,V="",pe=s,q=a,W=o,w=V;O;)switch(A=M,M=L()){case 40:if(A!=108&&w.charCodeAt(h-1)==58){xe(w+=f(de(M),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=de(M);break;case 9:case 10:case 13:case 32:w+=zt(A);break;case 92:w+=Bt(ye()-1,7);continue;case 47:switch($()){case 42:case 47:ae(Hr(jt(L(),ye()),t,r),u);break;default:w+="/"}break;case 123*x:c[p++]=E(w)*b;case 125*x:case 59:case 0:switch(M){case 0:case 125:O=0;case 59+d:B>0&&E(w)-h&&ae(B>32?Kt(w+";",o,r,h-1):Kt(f(w," ","")+";",o,r,h-2),u);break;case 59:w+=";";default:if(ae(W=Gt(w,t,r,p,d,s,c,V,pe=[],q=[],h),a),M===123)if(d===0)Ae(w,t,W,W,pe,a,h,c,q);else switch(R){case 100:case 109:case 115:Ae(e,W,W,o&&ae(Gt(e,W,W,0,0,s,c,V,s,pe=[],h),q),s,q,h,c,o?pe:q);break;default:Ae(w,W,W,W,[""],q,0,c,q)}}p=d=B=0,x=b=1,V=w="",h=i;break;case 58:h=1+E(w),B=A;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&Ht()==125)continue}switch(w+=X(M),M*x){case 38:b=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(E(w)-1)*b,b=1;break;case 64:$()===45&&(w+=de(L())),R=$(),d=h=E(V=w+=qt(ye())),M++;break;case 45:A===45&&E(w)==2&&(x=0)}}return a}function Gt(e,t,r,o,s,a,i,c,u,p,d){for(var h=s-1,R=s===0?a:[""],B=oe(R),A=0,x=0,O=0;A<o;++A)for(var b=0,M=Y(e,h+1,h=Dt(x=i[A])),V=e;b<B;++b)(V=Le(x>0?R[b]+" "+M:f(M,/&\f/g,R[b])))&&(u[O++]=V);return we(e,t,r,s===0?re:c,u,p,d)}function Hr(e,t,r){return we(e,t,r,Ee,X(Ft()),Y(e,2,-2),0)}function Kt(e,t,r,o){return we(e,t,r,ne,Y(e,0,o),Y(e,o+1,-1),o)}function et(e,t){switch(Ut(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+te+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(C(e,t+1)){case 109:if(C(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+te+(C(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~xe(e,"stretch")?et(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(C(e,t+1)!==115)break;case 6444:switch(C(e,E(e)-3-(~xe(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(C(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(C(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",o=oe(e),s=0;s<o;s++)r+=t(e[s],s,e,t)||"";return r}function Jt(e,t,r,o){switch(e.type){case At:case ne:return e.return=e.return||e.value;case Ee:return"";case Ne:return e.return=e.value+"{"+J(e.children,o)+"}";case re:e.value=e.props.join(",")}return E(r=J(e.children,o))?e.return=e.value+"{"+r+"}":""}function Qt(e){var t=oe(e);return function(r,o,s,a){for(var i="",c=0;c<t;c++)i+=e[c](r,o,s,a)||"";return i}}function Zt(e){return function(t){t.root||(t=t.return)&&e(t)}}function Xt(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case ne:e.return=et(e.value,e.length);break;case Ne:return J([le(e,{value:f(e.value,"@","@"+m)})],o);case re:if(e.length)return Vt(e.props,function(s){switch(_t(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([le(e,{props:[f(s,/:(read-\w+)/,":"+te+"$1")]})],o);case"::placeholder":return J([le(e,{props:[f(s,/:(plac\w+)/,":"+m+"input-$1")]}),le(e,{props:[f(s,/:(plac\w+)/,":"+te+"$1")]}),le(e,{props:[f(s,/:(plac\w+)/,S+"input-$1")]})],o)}return""})}}function zr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var er=zr;var Br=function(t,r,o){for(var s=0,a=0;s=a,a=$(),s===38&&a===12&&(r[o]=1),!ie(a);)L();return ue(t,N)},jr=function(t,r){var o=-1,s=44;do switch(ie(s)){case 0:s===38&&$()===12&&(r[o]=1),t[o]+=Br(N-1,r,o);break;case 2:t[o]+=de(s);break;case 4:if(s===44){t[++o]=$()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=X(s)}while(s=L());return t},qr=function(t,r){return Pe(jr(Oe(t),r))},tr=new WeakMap,Gr=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,s=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!tr.get(o))&&!s){tr.set(t,!0);for(var a=[],i=qr(r,a),c=o.props,u=0,p=0;u<i.length;u++)for(var d=0;d<c.length;d++,p++)t.props[p]=a[u]?i[u].replace(/&\f/g,c[d]):c[d]+" "+i[u]}}},Kr=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var Yr=[Xt],Jr=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(x){var O=x.getAttribute("data-emotion");O.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var s=t.stylisPlugins||Yr,a={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var O=x.getAttribute("data-emotion").split(" "),b=1;b<O.length;b++)a[O[b]]=!0;c.push(x)});var u,p=[Gr,Kr];{var d,h=[Jt,Zt(function(x){d.insert(x)})],R=Qt(p.concat(s,h)),B=function(O){return J(Yt(O),R)};u=function(O,b,M,V){d=M,B(O?O+"{"+b.styles+"}":b.styles),V&&(A.inserted[b.name]=!0)}}var A={key:r,sheet:new Pt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:a,registered:{},insert:u};return A.sheet.hydrate(c),A},rr=Jr;function Qr(e){for(var t=0,r,o=0,s=e.length;s>=4;++o,s-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(s){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var nr=Qr;var Zr={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},or=Zr;var Xr=/[A-Z]|^ms/g,en=/_EMO_([^_]+?)_([^]*?)_EMO_/g,cr=function(t){return t.charCodeAt(1)===45},ar=function(t){return t!=null&&typeof t!="boolean"},tt=er(function(e){return cr(e)?e:e.replace(Xr,"-$&").toLowerCase()}),sr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(en,function(o,s,a){return H={name:s,styles:a,next:H},s})}return or[t]!==1&&!cr(t)&&typeof r=="number"&&r!==0?r+"px":r};function ve(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return H={name:r.name,styles:r.styles,next:H},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)H={name:o.name,styles:o.styles,next:H},o=o.next;var s=r.styles+";";return s}return tn(e,t,r)}case"function":{if(e!==void 0){var a=H,i=r(e);return H=a,ve(e,t,i)}break}case"string":if(!1)var c,u;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function tn(e,t,r){var o="";if(Array.isArray(r))for(var s=0;s<r.length;s++)o+=ve(e,t,r[s])+";";else for(var a in r){var i=r[a];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=a+"{"+t[i]+"}":ar(i)&&(o+=tt(a)+":"+sr(a,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)ar(i[c])&&(o+=tt(a)+":"+sr(a,i[c])+";");else{var u=ve(e,t,i);switch(a){case"animation":case"animationName":{o+=tt(a)+":"+u+";";break}default:o+=a+"{"+u+"}"}}}return o}var ir=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var H,De=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var s=!0,a="";H=void 0;var i=t[0];i==null||i.raw===void 0?(s=!1,a+=ve(o,r,i)):a+=i[0];for(var c=1;c<t.length;c++)a+=ve(o,r,t[c]),s&&(a+=i[c]);var u;ir.lastIndex=0;for(var p="",d;(d=ir.exec(a))!==null;)p+="-"+d[1];var h=nr(a)+p;return{name:h,styles:a,next:H}};var rn=!0;function rt(e,t,r){var o="";return r.split(" ").forEach(function(s){e[s]!==void 0?t.push(e[s]+";"):o+=s+" "}),o}var lr=function(t,r,o){var s=t.key+"-"+r.name;if((o===!1||rn===!1)&&t.registered[s]===void 0&&(t.registered[s]=r.styles),t.inserted[r.name]===void 0){var a=r;do{var i=t.insert(r===a?"."+s:"",a,t.sheet,!0);a=a.next}while(a!==void 0)}};function ur(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function dr(e,t,r){var o=[],s=rt(e,o,r);return o.length<2?r:s+t(o)}var nn=function(t){var r=rr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered,void 0);return lr(r,h,!1),r.key+"-"+h.name},s=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered),R="animation-"+h.name;return ur(r,{name:h.name,styles:"@keyframes "+R+"{"+h.styles+"}"}),R},a=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];var h=De(p,r.registered);ur(r,h)},i=function(){for(var u=arguments.length,p=new Array(u),d=0;d<u;d++)p[d]=arguments[d];return dr(r.registered,o,on(p))};return{css:o,cx:i,injectGlobal:a,keyframes:s,hydrate:function(u){u.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:rt.bind(null,r.registered),merge:dr.bind(null,r.registered,o)}},on=function e(t){for(var r="",o=0;o<t.length;o++){var s=t[o];if(s!=null){var a=void 0;switch(typeof s){case"boolean":break;case"object":{if(Array.isArray(s))a=e(s);else{a="";for(var i in s)s[i]&&i&&(a&&(a+=" "),a+=i)}break}default:a=s}a&&(r&&(r+=" "),r+=a)}}return r},pr=nn;var z=pr({key:"css"}),_o=z.flush,Vo=z.hydrate,mr=z.cx,Wo=z.merge,Fo=z.getRegisteredStyles,fr=z.injectGlobal,Ho=z.keyframes,_=z.css,zo=z.sheet,Bo=z.cache;var an=_`
  cursor: pointer;
`,sn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,n("button",{class:r.variant==="text"?sn:an,...r},t)},nt=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+mt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:s=>{s.preventDefault();let{href:a}=s.currentTarget;a&&a!==window.location.href&&ft(a)},...r},t)};var hr=()=>{let e=n("div",null,n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet."));return e.onMount=()=>{console.log("ViewHome mounted!")},e};var gr=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var cn=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),ln=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),un=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2}),xr=e=>cn.format(typeof e=="string"?new Date(e):e),ot=e=>{let t=ln.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},k=e=>un.format(e);var dn=_`
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
`,it,be,wr=({changes:e}={})=>{if(Te()==="instruments"){if(!e){G(be,...he().map(t=>n(at,{instrument:t})));return}for(let t of e){let r=me({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":j(be,n(at,{instrument:t.instrument}));break;case"update":r&&Ve(be,n(at,{instrument:t.instrument}),r);break;case"delete":r&&Me(be,r);break}}}},st=()=>it.value="";g(U,wr);g(I("clear-new-instrument:click"),st);g(I("add-new-instrument:click"),async()=>{let e=it.value,t=fe.find(o=>o.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){st();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await It(r),st()});g(I("instrument-delete:click"),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Ct(e)});var at=({instrument:e})=>n("tr",{xname:"instrument",xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",{class:"small"},xr(e.latestUpdate)),n("td",null,n(D,{xname:"instrument-delete",xid:e.code,variant:"text"},"Delete"))),yr=()=>{let e=n("div",{class:dn},n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),n("div",null,n("input",{xname:"new-instrument"}),"  ",n(D,{xname:"add-new-instrument"},"Add instrument"),"  ",n(D,{xname:"clear-new-instrument",variant:"text"},"Clear")),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:"instrument-list"}));return e.onMount=()=>{it=T({xname:"new-instrument"}),be=T({xname:"instrument-list"}),wr(),console.log("ViewInstruments mounted!")},e};var pn=_`
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
`,lt,ut,ct,$e={},vr=()=>{lt.value="",ut.value=""},Se=()=>{if(Te()!=="wallets")return;let e=n(l,null,Et().map(r=>n(mn,{wallet:r}))),t=dt();pt(".new-instrument-field",ct,e),G(ct,e),t.focus()};g(I("add-new-wallet:click"),async()=>{let e=lt?.value||"",t=ut?.value||"";if(!e)return;if(!await Nt({name:e,comment:t,instruments:[]})){alert("Failed to create a wallet");return}vr()});g(I("clear-new-wallet:click"),()=>{vr()});g(I("toggle-instruments:click"),({xid:e=""})=>{$e[e]=!$e[e],T({xname:"instruments",xid:e}).classList.toggle("expanded",$e[e])});var br=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},ot(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")};g(I("wallet-new-clear-instrument:click"),({xid:e=""})=>{br(T({xname:"wallet",xid:e}))});g(I("wallet-delete-instrument:click"),({xid:e=""})=>{let[t,r]=e.split(":"),o=ge()[t],s=o.instruments.find(({id:a})=>""+a===r);!o||!confirm(`Delete instrument ${s?.code} from wallet ${o.name}?`)||(o.instruments=o.instruments.filter(({id:a})=>""+a!==r),Ye(o),Se())});g(I("wallet-new-add-instrument:click"),({xid:e=""})=>{let t=ge()[e];if(!t){alert("Wallet "+e+" not found");return}let r=T({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")}),Ye(t),br(r),Se()});g(Ke,Se);g(U,Se);var mn=({wallet:e})=>{let t=ee(),r=e.instruments.map(a=>{let i=t[a.code]?.latestPrice||0,c=a.totalPrice/a.unitPrice,u=i*c;return{id:a.id,instrumentName:t[a.code]?.name??"???",instrumentUrl:t[a.code]?.sourceUrl,instrumentType:t[a.code]?.type,change:u/a.totalPrice*100-100,currentTotal:u,currentUnit:i,unitCount:c,paidTotal:a.totalPrice,paidUnit:a.unitPrice,paidDate:a.date}}),o=r.reduce((a,i)=>a+i.currentTotal,0),s=r.reduce((a,i)=>a+i.paidTotal,0);return n("div",{xname:"wallet",xid:e.name},n("div",{class:"title"},n("div",{xname:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{class:"comment"},e.comment),n("div",{class:"summary"},n("div",{class:""},"Change\xA0",n("b",null,k(o-s)),"\xA0(",n("b",null,k(o/s*100-100),"%"),")"),n("div",{class:""},"Value ",n("b",null,k(o))),n("div",{class:""},"Paid ",n("b",null,k(s))))),n("table",{xname:"instruments",xid:e.name,class:mr({expanded:$e[e.name]})},n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"})),r.map(a=>n("tr",null,n("td",{class:"instrument-name"},n("a",{href:a.instrumentUrl,target:"_blank"},"(",a.instrumentType,") ",a.instrumentName)),n("td",{class:"price"},k(a.currentTotal-a.paidTotal)),n("td",{class:"percent"},k(a.change)),n("td",{class:"price"},k(a.currentTotal)),n("td",{class:"price"},k(a.paidTotal)),n("td",{class:"price"},k(a.currentUnit)),n("td",{class:"price"},k(a.unitCount)),n("td",{class:"price"},k(a.paidUnit)),n("td",{class:"date"},a.paidDate),n("td",{class:"actions"},n(D,{xname:"wallet-delete-instrument",xid:`${e.name}:${a.id}`,variant:"text"},"Delete")))),n("tr",{class:"total"},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},k(o-s)),n("td",{class:"percent"},k(o/s*100-100)),n("td",{class:"price"},k(o)),n("td",{class:"price"},k(s)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"date"}),n("td",{class:"actions"})),n("tr",null,n("td",null,n("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},n("option",{value:""}),he().map(a=>n("option",{value:a.code},"(",a.type,") ",a.name)))),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),n("td",{class:"date"},n("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:ot(new Date),class:"new-instrument-field"})),n("td",{class:"actions"},n(D,{xname:"wallet-new-add-instrument",xid:e.name},"Add"),n(D,{xname:"wallet-new-clear-instrument",xid:e.name,variant:"text"},"Clear")))))},Tr=()=>{let e=n("div",{class:pn},n("div",null,n("input",{xname:"new-wallet-name"}),"  ",n("input",{xname:"new-wallet-comment"}),"  ",n(D,{xname:"add-new-wallet"},"Create wallet"),"  ",n(D,{xname:"clear-new-wallet",variant:"text"},"Clear")),n("div",{xname:"wallet-list"}));return e.onMount=()=>{lt=T({xname:"new-wallet-name"}),ut=T({xname:"new-wallet-comment"}),ct=T({xname:"wallet-list"}),Se(),console.log("ViewWallets mounted!")},e};var Ce,Ie,Sr=()=>{Ie.focus();let e=Ie.value.trim();!e||(Ie.value="",wt(e))},fn=gr((e,t)=>{yt({done:!1,text:t,id:e})},500);g(I("todo-delete:click"),({xid:e=""})=>{vt(e)});g(I("create-todo:click"),()=>{Sr()});g(Ze("new-item-text:keyup"),({ev:e})=>{e.key==="Enter"&&Sr()});g(Ze("todo-text:keyup"),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&fn(t,r)});g(ze,({todoId:e})=>{Me(Ce,T({el:Ce,xname:"todo",xid:e}))});g(He,({todo:e})=>{j(Ce,n(Ir,{todo:e}))});var Ir=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xname:"todo-delete",xid:e.id}," X "),"\xA0",n("input",{xname:"todo-text",xid:e.id,value:e.text})),Cr=()=>{let e=n("div",null,n("div",null,n("input",{xname:"new-item-text"}),"\xA0",n("button",{xname:"create-todo"},"Add")),n("ol",{xname:"items"}));return e.onMount=async()=>{Ce=T({xname:"items"}),Ie=T({xname:"new-item-text"}),Ie.focus(),await bt(),G(Ce,...xt().map(t=>n(Ir,{todo:t}))),console.log("ViewTodo mounted!")},e};var hn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ue;g(I("migration-export:click"),()=>{let e=ge(),t=ee();Q(Ue,JSON.stringify({instruments:t,wallets:e},null,2)),Ue.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(Ue,""));console.log({wallets:e,instruments:t}),await Mt(t),await Rt(e),y(U,{})}catch(e){alert("Failed to load data: "+e)}});var Mr=()=>{let e=n("div",{class:hn},n("div",null,n(D,{xname:"migration-export"},"Export from LS")," ",n(D,{xname:"migration-import"},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{Ue=T({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var _e={home:{label:"Home",Component:hr},instruments:{label:"Instruments",Component:yr},wallets:{label:"Wallets",Component:Tr},todo:{label:"Todo",Component:Cr},migration:{label:"Data migration",Component:Mr}},Te=()=>new URLSearchParams(window.location.search).get("view")||"home",kr=()=>{let{Component:e,label:t}=_e[Te()]||_e.home;return{Component:e,label:t}};var gn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Er=()=>{let[,...e]=Object.entries(_e);return n("div",{class:gn},n(nt,{href:"/"},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(l,null,o>0?" | ":"",n(nt,{view:t},r.label))))};fr`
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

`;var Nr;g(We,()=>{let{Component:e}=kr();G(Nr,n(e,null))});var Lr=()=>{let e=n("div",{class:"app"},n(Er,null),n("hr",null),n("div",{xname:"current-view"}));return e.onMount=()=>{Nr=T({xname:"current-view"}),console.log("App mounted!")},e};Ot();j(document.body,n(Lr,null));ht();})();
