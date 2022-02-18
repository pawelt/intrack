(()=>{var B=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},We=(e,t,r)=>{let n=e.replaceChild(t,r);return t.onMount&&t.onMount(),n},Ce=(e,t)=>e.removeChild(t),j=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},S=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},pt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=j(e);n&&(n.innerHTML=""+t)},mt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=j(e);return n?.innerHTML!==void 0?n.innerHTML:t},Z=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=j(e);n&&(n.value=""+t)},X=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=j(e);return n?n.value:t},ft=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},ht=(e,t,r)=>{t.querySelectorAll(e).forEach(n=>{let{xname:a,xid:s}=n.dataset;if(!a||!s)return;let i=j({el:r,xname:a,xid:s});if(!i)return;let c=i.parentElement;!c||We(c,n,i)})};var u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>B(r,typeof n=="object"?n:document.createTextNode(n))),r},_r=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[_r(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:n.setAttribute(a,""+s)}),r.flat().forEach(a=>B(n,typeof a=="object"?a:document.createTextNode(a))),n};var Ee={},w=(e,t)=>{let{type:r}=e({});for(let n of Ee[r]||[])n(t);return!0},g=(e,t)=>{let{type:r}=e({});return Ee[r]=Ee[r]||[],Ee[r].push(t),!0};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Fe=e=>({type:"router:navigate",payload:e}),ze=e=>{w(Fe,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),ze(t)};var yt=()=>ze(window.location.href);window.addEventListener("popstate",()=>ze(window.location.href));var wt="todos",Y=[],qe=e=>({type:"store:item-created",payload:e}),Vr=e=>({type:"store:item-updated",payload:e}),Be=e=>({type:"store:item-deleted",payload:e}),vt=()=>Y,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),je().then(()=>w(qe,{todo:t}))},Tt=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),je().then(()=>w(Vr,{todo:t}))):!1},St=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),je().then(()=>w(Be,{todoId:e})))},It=async()=>{Y=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:Y})},je=async()=>{localStorage.setItem(wt,JSON.stringify(Y))};var Mt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),Ct=(e,t)=>fetch(`https://it.nottycanvas.com?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),ke=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Mt(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ge="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),he=()=>Object.values(P),ee=()=>P,Et=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ke().then(()=>w(U,{changes:[{instrument:e,op:"create"}]}))},Hr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ke().then(()=>w(U,{changes:[{instrument:r,op:"update"}]}))},kt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ke().then(()=>w(U,{changes:[{instrument:t,op:"delete"}]}))},Wr=async()=>{P=JSON.parse(localStorage.getItem(Ge)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ke=async()=>{localStorage.setItem(Ge,JSON.stringify(P))},Lt=async e=>{localStorage.setItem(Ge,JSON.stringify(e)),P=e},Fr=2,zr=10,Nt=async()=>{let e=[];for(let t of he())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Fr*60*1e3){let r=ke.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Hr(t),e.push({instrument:t,op:"update"}))}e.length&&w(U,{changes:e}),setTimeout(Nt,zr*1e3)};Wr().then(()=>w(U,{})).then(Nt);var Ye="wallets",W={},qr=e=>({type:"store:wallet-created",payload:e}),Br=e=>({type:"store:wallet-updated",payload:e}),jr=e=>({type:"store:wallets-updated",payload:e});var Je=()=>Object.values(W),ge=()=>W,Rt=async e=>{if(W[e.name])return!1;let t={...e};return W[t.name]=t,At().then(()=>w(qr,{wallet:t}))},Qe=async e=>{let{name:t=""}=e;return W[t]?(W[t]=e,At().then(()=>w(Br,{wallet:e}))):!1};var Gr=async()=>{W=JSON.parse(localStorage.getItem(Ye)||"{}"),console.log({wallets:W})},At=async()=>{localStorage.setItem(Ye,JSON.stringify(W))},Pt=async e=>{localStorage.setItem(Ye,JSON.stringify(e)),W=e};Gr().then(()=>w(jr,{}));var Xe=e=>t=>({type:e,payload:t}),Ze=e=>t=>{let r=t.target,{xname:n="",xid:a=""}=r.dataset;n&&w(Xe(`${n}:${e}`),{xname:n,xid:a,ev:t})},I=e=>Xe(e),et=e=>Xe(e),Ot=()=>{document.addEventListener("click",Ze("click")),document.addEventListener("keyup",Ze("keyup")),document.addEventListener("keydown",Ze("keydown"))};var Dt={};var $t=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Dt[`${t}:${r}`]=e),e},Ut=(e="",t="")=>Dt[`${e}:${t}`];function Kr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Yr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var _t=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Yr(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=Kr(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var T="-ms-",re="-moz-",m="-webkit-",Le="comm",ne="rule",oe="decl";var Vt="@import";var Ne="@keyframes";var Ht=Math.abs,te=String.fromCharCode,Wt=Object.assign;function Ft(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Re(e){return e.trim()}function zt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function xe(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function k(e){return e.length}function ae(e){return e.length}function se(e,t){return t.push(e),e}function qt(e,t){return e.map(t).join("")}var Ae=1,ie=1,Bt=0,L=0,v=0,le="";function ye(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:Ae,column:ie,length:i,return:""}}function ue(e,t){return Wt(ye("",null,null,"",null,null,0),e,{length:-e.length},t)}function jt(){return v}function Gt(){return v=L>0?M(le,--L):0,ie--,v===10&&(ie=1,Ae--),v}function N(){return v=L<Bt?M(le,L++):0,ie++,v===10&&(ie=1,Ae++),v}function $(){return M(le,L)}function we(){return L}function de(e,t){return J(le,e,t)}function ce(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Pe(e){return Ae=ie=1,Bt=k(le=e),L=0,[]}function Oe(e){return le="",e}function pe(e){return Re(de(L-1,tt(e===91?e+2:e===40?e+1:e)))}function Kt(e){for(;(v=$())&&v<33;)N();return ce(e)>2||ce(v)>3?"":" "}function Yt(e,t){for(;--t&&N()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return de(e,we()+(t<6&&$()==32&&N()==32))}function tt(e){for(;N();)switch(v){case e:return L;case 34:case 39:e!==34&&e!==39&&tt(v);break;case 40:e===41&&tt(e);break;case 92:N();break}return L}function Jt(e,t){for(;N()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+de(t,L-1)+"*"+te(e===47?e:N())}function Qt(e){for(;!ce($());)N();return de(e,L)}function er(e){return Oe(De("",null,null,null,[""],e=Pe(e),0,[0],e))}function De(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,h=i,R=0,q=0,O=0,x=1,A=1,b=1,C=0,V="",fe=a,G=s,H=n,y=V;A;)switch(O=C,C=N()){case 40:if(O!=108&&y.charCodeAt(h-1)==58){xe(y+=f(pe(C),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:y+=pe(C);break;case 9:case 10:case 13:case 32:y+=Kt(O);break;case 92:y+=Yt(we()-1,7);continue;case 47:switch($()){case 42:case 47:se(Jr(Jt(N(),we()),t,r),l);break;default:y+="/"}break;case 123*x:c[p++]=k(y)*b;case 125*x:case 59:case 0:switch(C){case 0:case 125:A=0;case 59+d:q>0&&k(y)-h&&se(q>32?Xt(y+";",n,r,h-1):Xt(f(y," ","")+";",n,r,h-2),l);break;case 59:y+=";";default:if(se(H=Zt(y,t,r,p,d,a,c,V,fe=[],G=[],h),s),C===123)if(d===0)De(y,t,H,H,fe,s,h,c,G);else switch(R){case 100:case 109:case 115:De(e,H,H,n&&se(Zt(e,H,H,0,0,a,c,V,a,fe=[],h),G),a,G,h,c,n?fe:G);break;default:De(y,H,H,H,[""],G,0,c,G)}}p=d=q=0,x=b=1,V=y="",h=i;break;case 58:h=1+k(y),q=O;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Gt()==125)continue}switch(y+=te(C),C*x){case 38:b=d>0?1:(y+="\f",-1);break;case 44:c[p++]=(k(y)-1)*b,b=1;break;case 64:$()===45&&(y+=pe(N())),R=$(),d=h=k(V=y+=Qt(we())),C++;break;case 45:O===45&&k(y)==2&&(x=0)}}return s}function Zt(e,t,r,n,a,s,i,c,l,p,d){for(var h=a-1,R=a===0?s:[""],q=ae(R),O=0,x=0,A=0;O<n;++O)for(var b=0,C=J(e,h+1,h=Ht(x=i[O])),V=e;b<q;++b)(V=Re(x>0?R[b]+" "+C:f(C,/&\f/g,R[b])))&&(l[A++]=V);return ye(e,t,r,a===0?ne:c,l,p,d)}function Jr(e,t,r){return ye(e,t,r,Le,te(jt()),J(e,2,-2),0)}function Xt(e,t,r,n){return ye(e,t,r,oe,J(e,0,n),J(e,n+1,-1),n)}function rt(e,t){switch(Ft(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+re+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+re+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~xe(e,"stretch")?rt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~xe(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function Q(e,t){for(var r="",n=ae(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function tr(e,t,r,n){switch(e.type){case Vt:case oe:return e.return=e.return||e.value;case Le:return"";case Ne:return e.return=e.value+"{"+Q(e.children,n)+"}";case ne:e.value=e.props.join(",")}return k(r=Q(e.children,n))?e.return=e.value+"{"+r+"}":""}function rr(e){var t=ae(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function nr(e){return function(t){t.root||(t=t.return)&&e(t)}}function or(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case oe:e.return=rt(e.value,e.length);break;case Ne:return Q([ue(e,{value:f(e.value,"@","@"+m)})],n);case ne:if(e.length)return qt(e.props,function(a){switch(zt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([ue(e,{props:[f(a,/:(read-\w+)/,":"+re+"$1")]})],n);case"::placeholder":return Q([ue(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),ue(e,{props:[f(a,/:(plac\w+)/,":"+re+"$1")]}),ue(e,{props:[f(a,/:(plac\w+)/,T+"input-$1")]})],n)}return""})}}function Qr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var ar=Qr;var Zr=function(t,r,n){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[n]=1),!ce(s);)N();return de(t,L)},Xr=function(t,r){var n=-1,a=44;do switch(ce(a)){case 0:a===38&&$()===12&&(r[n]=1),t[n]+=Zr(L-1,r,n);break;case 2:t[n]+=pe(a);break;case 4:if(a===44){t[++n]=$()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=te(a)}while(a=N());return t},en=function(t,r){return Oe(Xr(Pe(t),r))},sr=new WeakMap,tn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!sr.get(n))&&!a){sr.set(t,!0);for(var s=[],i=en(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},rn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var nn=[or],on=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var A=x.getAttribute("data-emotion");A.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||nn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var A=x.getAttribute("data-emotion").split(" "),b=1;b<A.length;b++)s[A[b]]=!0;c.push(x)});var l,p=[tn,rn];{var d,h=[tr,nr(function(x){d.insert(x)})],R=rr(p.concat(a,h)),q=function(A){return Q(er(A),R)};l=function(A,b,C,V){d=C,q(A?A+"{"+b.styles+"}":b.styles),V&&(O.inserted[b.name]=!0)}}var O={key:r,sheet:new _t({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return O.sheet.hydrate(c),O},ir=on;function an(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var cr=an;var sn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},lr=sn;var cn=/[A-Z]|^ms/g,ln=/_EMO_([^_]+?)_([^]*?)_EMO_/g,mr=function(t){return t.charCodeAt(1)===45},ur=function(t){return t!=null&&typeof t!="boolean"},nt=ar(function(e){return mr(e)?e:e.replace(cn,"-$&").toLowerCase()}),dr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(ln,function(n,a,s){return F={name:a,styles:s,next:F},a})}return lr[t]!==1&&!mr(t)&&typeof r=="number"&&r!==0?r+"px":r};function ve(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var a=r.styles+";";return a}return un(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,ve(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function un(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=ve(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":ur(i)&&(n+=nt(s)+":"+dr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)ur(i[c])&&(n+=nt(s)+":"+dr(s,i[c])+";");else{var l=ve(e,t,i);switch(s){case"animation":case"animationName":{n+=nt(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var pr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,$e=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=ve(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=ve(n,r,t[c]),a&&(s+=i[c]);var l;pr.lastIndex=0;for(var p="",d;(d=pr.exec(s))!==null;)p+="-"+d[1];var h=cr(s)+p;return{name:h,styles:s,next:F}};var dn=!0;function ot(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var fr=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||dn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function hr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function gr(e,t,r){var n=[],a=ot(e,n,r);return n.length<2?r:a+t(n)}var pn=function(t){var r=ir(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered,void 0);return fr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered),R="animation-"+h.name;return hr(r,{name:h.name,styles:"@keyframes "+R+"{"+h.styles+"}"}),R},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered);hr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return gr(r.registered,n,mn(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ot.bind(null,r.registered),merge:gr.bind(null,r.registered,n)}},mn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},xr=pn;var z=xr({key:"css"}),Go=z.flush,Ko=z.hydrate,yr=z.cx,Yo=z.merge,Jo=z.getRegisteredStyles,wr=z.injectGlobal,Qo=z.keyframes,_=z.css,Zo=z.sheet,Xo=z.cache;var fn=_`
  cursor: pointer;
`,hn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,o("button",{class:r.variant==="text"?hn:fn,...r},t)},at=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+gt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&xt(s)},...r},t)};var vr="view-home",br=()=>{let e=Ut(vr),t=$t(o("div",{xname:vr},"Home rendered ",o("strong",{xname:"xxx"},+mt({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Ue=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var ca=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),gn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),xn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var st=e=>{let t=gn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},E=e=>xn.format(e),be=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var yn=_`
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
`,lt,me,Tr=({changes:e}={})=>{if(Te()==="instruments"){if(!e){K(me,...he().map(t=>o(it,{instrument:t})));return}for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":B(me,o(it,{instrument:t.instrument}));break;case"update":r&&We(me,o(it,{instrument:t.instrument}),r);break;case"delete":r&&Ce(me,r);break}}}},ct=()=>lt.value="";g(U,Tr);g(I("clear-new-instrument:click"),ct);g(I("add-new-instrument:click"),async()=>{let e=lt.value,t=ke.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){ct();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Et(r),ct()});g(I("instrument-delete:click"),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await kt(e)});var it=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},be(e.latestUpdate)),o("td",null,o(D,{xname:"instrument-delete",xid:e.code,variant:"text"},"Delete"))),Sr=()=>{let e=o("div",{class:yn},o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),o("div",null,o("input",{xname:"new-instrument"}),"  ",o(D,{xname:"add-new-instrument"},"Add instrument"),"  ",o(D,{xname:"clear-new-instrument",variant:"text"},"Clear")),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"}));return e.onMount=()=>{lt=S({xname:"new-instrument"}),me=S({xname:"instrument-list"}),Tr(),Ir(),console.log("ViewInstruments mounted!")},e},Ir=()=>{me.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=be(t.dataset.latestUpdate||"")}),setTimeout(Ir,5e3)};var wn=_`
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
`,dt,ut,_e={},Mr=()=>{dt.value=""},Se=({changes:e}={})=>{if(Te()!=="wallets")return;let t=o(u,null,Je().map(n=>o(vn,{wallet:n}))),r=ft();ht(".new-instrument-field",ut,t),K(ut,t),r.focus()};g(I("add-new-wallet:click"),async()=>{let e=dt?.value||"";if(!e)return;if(!await Rt({name:e,comment:"",instruments:[]})){alert("Failed to create a wallet");return}Mr(),Se()});g(I("clear-new-wallet:click"),()=>{Mr()});g(I("toggle-instruments:click"),({xid:e=""})=>{_e[e]=!_e[e],S({xname:"instruments",xid:e}).classList.toggle("expanded",_e[e])});var Cr=e=>{Z({el:e,xname:"wallet-new-total-price"},""),Z({el:e,xname:"wallet-new-unit-price"},""),Z({el:e,xname:"wallet-new-date"},st(new Date)),Z({el:e,xname:"wallet-new-instrument"},"")};g(I("wallet-new-clear-instrument:click"),({xid:e=""})=>{Cr(S({xname:"wallet",xid:e}))});g(I("wallet-delete-instrument:click"),({xid:e=""})=>{let[t,r]=e.split(":"),n=ge()[t],a=n.instruments.find(({id:s})=>""+s===r);!n||!confirm(`Delete instrument ${a?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:s})=>""+s!==r),Qe(n),Se())});g(I("wallet-new-add-instrument:click"),({xid:e=""})=>{let t=ge()[e];if(!t){alert("Wallet "+e+" not found");return}let r=S({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:X({el:r,xname:"wallet-new-instrument"},""),date:X({el:r,xname:"wallet-new-date"},""),totalPrice:+X({el:r,xname:"wallet-new-total-price"},""),unitPrice:+X({el:r,xname:"wallet-new-unit-price"},"")}),Qe(t),Cr(r),Se()});g(U,Ue(Se,500));var Er=e=>{let t=ee();return be(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},kr=()=>{Je().forEach(e=>pt({xname:"updated-ago",xid:e.name},Er(e.instruments))),setTimeout(kr,5*1e3)},vn=({wallet:e})=>{let t=ee(),r=e.instruments.map(i=>{let c=t[i.code]?.latestPrice||0,l=i.totalPrice/i.unitPrice,p=c*l;return{id:i.id,instrumentName:t[i.code]?.name??"???",instrumentUrl:t[i.code]?.sourceUrl,instrumentType:t[i.code]?.type,change:p/i.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:i.totalPrice,paidUnit:i.unitPrice,paidDate:i.date,updatedAt:t[i.code]?.latestUpdate||""}}),n=r.reduce((i,c)=>i+c.currentTotal,0),a=r.reduce((i,c)=>i+c.paidTotal,0),s=Er(e.instruments);return o("div",{xname:"wallet",xid:e.name},o("div",{class:"title"},o("div",{xname:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},s),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,E(n-a)),"\xA0(",o("b",null,E(n/a*100-100),"%"),")"),o("div",{class:""},"Value ",o("b",null,E(n))),o("div",{class:""},"Paid ",o("b",null,E(a))))),o("table",{xname:"instruments",xid:e.name,class:yr({expanded:_e[e.name]})},o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"})),r.map(i=>o("tr",null,o("td",{class:"instrument-name"},o("a",{href:i.instrumentUrl,target:"_blank"},"(",i.instrumentType,") ",i.instrumentName)),o("td",{class:"price"},E(i.currentTotal-i.paidTotal)),o("td",{class:"percent"},E(i.change)),o("td",{class:"price"},E(i.currentTotal)),o("td",{class:"price"},E(i.currentUnit)),o("td",{class:"price"},E(i.unitCount)),o("td",{class:"price"},E(i.paidTotal)),o("td",{class:"price"},E(i.paidUnit)),o("td",{class:"date"},i.paidDate),o("td",{class:"actions"},o(D,{xname:"wallet-delete-instrument",xid:`${e.name}:${i.id}`,variant:"text"},"Delete")))),o("tr",{class:"total"},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},E(n-a)),o("td",{class:"percent"},E(n/a*100-100)),o("td",{class:"price"},E(n)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},E(a)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),he().map(i=>o("option",{value:i.code},"(",i.type,") ",i.name)))),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:st(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(D,{xname:"wallet-new-add-instrument",xid:e.name},"Add"),o(D,{xname:"wallet-new-clear-instrument",xid:e.name,variant:"text"},"Clear")))))},Lr=()=>{let e=o("div",{class:wn},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(D,{xname:"add-new-wallet"},"Create wallet"),"  ",o(D,{xname:"clear-new-wallet",variant:"text"},"Clear")),o("div",{xname:"wallet-list"}));return e.onMount=()=>{dt=S({xname:"new-wallet-name"}),ut=S({xname:"wallet-list"}),Se(),kr(),console.log("ViewWallets mounted!")},e};var Me,Ie,Nr=()=>{Ie.focus();let e=Ie.value.trim();!e||(Ie.value="",bt(e))},bn=Ue((e,t)=>{Tt({done:!1,text:t,id:e})},500);g(I("todo-delete:click"),({xid:e=""})=>{St(e)});g(I("create-todo:click"),()=>{Nr()});g(et("new-item-text:keyup"),({ev:e})=>{e.key==="Enter"&&Nr()});g(et("todo-text:keyup"),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&bn(t,r)});g(Be,({todoId:e})=>{Ce(Me,S({el:Me,xname:"todo",xid:e}))});g(qe,({todo:e})=>{B(Me,o(Rr,{todo:e}))});var Rr=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xname:"todo-delete",xid:e.id}," X "),"\xA0",o("input",{xname:"todo-text",xid:e.id,value:e.text})),Ar=()=>{let e=o("div",null,o("div",null,o("input",{xname:"new-item-text"}),"\xA0",o("button",{xname:"create-todo"},"Add")),o("ol",{xname:"items"}));return e.onMount=async()=>{Me=S({xname:"items"}),Ie=S({xname:"new-item-text"}),Ie.focus(),await It(),K(Me,...vt().map(t=>o(Rr,{todo:t}))),console.log("ViewTodo mounted!")},e};var Tn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ve;g(I("migration-export:click"),()=>{let e=ge(),t=ee();Z(Ve,JSON.stringify({instruments:t,wallets:e},null,2)),Ve.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(X(Ve,""));console.log({wallets:e,instruments:t}),await Lt(t),await Pt(e),w(U,{})}catch(e){alert("Failed to load data: "+e)}});var Pr=()=>{let e=o("div",{class:Tn},o("div",null,o(D,{xname:"migration-export"},"Export from LS")," ",o(D,{xname:"migration-import"},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{Ve=S({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var He={home:{label:"Home",Component:br},wallets:{label:"Wallets",Component:Lr},instruments:{label:"Instruments",Component:Sr},todo:{label:"Todo",Component:Ar},migration:{label:"Data migration",Component:Pr}},Te=()=>new URLSearchParams(window.location.search).get("view")||"home",Or=()=>{let{Component:e,label:t}=He[Te()]||He.home;return{Component:e,label:t}};var Sn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Dr=()=>{let[,...e]=Object.entries(He);return o("div",{class:Sn},o(at,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(at,{view:t},r.label))))};wr`
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

`;var $r;g(Fe,()=>{let{Component:e}=Or();K($r,o(e,null))});var Ur=()=>{let e=o("div",{class:"app"},o(Dr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{$r=S({xname:"current-view"}),console.log("App mounted!")},e};Ot();B(document.body,o(Ur,null));yt();})();
