(()=>{var $=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},ne=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},oe=(e,t)=>{let r=e.parentElement;if(!r)return null;let n=r.replaceChild(t,e);return t.onMount&&t.onMount(),n},G=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},y=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},ft=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=G(e);n&&(n.innerHTML=""+t)},ht=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=G(e);return n?.innerHTML!==void 0?n.innerHTML:t},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=G(e);n&&(n.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=G(e);return n?n.value:t};var Br=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[Br(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s)}),r.flat().forEach(a=>$(n,typeof a=="object"?a:document.createTextNode(a))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>$(r,typeof n=="object"?n:document.createTextNode(n))),r};var X={},jr=1,g=(e,t)=>{let{type:r}=e({});if(r)return X[r]=X[r]||[],X[r].push(t),{type:r,callback:t};let n="event-"+jr++;return X[n]=X[n]||[],X[n].push(t),{type:n,callback:t}},v=(e,t)=>{let r=0,{type:n}=e({});for(let a of X[n]||[])a(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Fe=e=>({type:"router:navigate",payload:e}),ze=e=>{v(Fe,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),ze(t)};var yt=()=>ze(window.location.href);window.addEventListener("popstate",()=>ze(window.location.href));var wt="todos",K=[],qe=e=>({type:"store:item-created",payload:e}),Gr=e=>({type:"store:item-updated",payload:e}),Be=e=>({type:"store:item-deleted",payload:e}),vt=()=>K,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return K.push(t),je().then(()=>v(qe,{todo:t}))},Tt=async e=>{let t=K.find(r=>r.id===e.id);return t?(Object.assign(t,e),je().then(()=>v(Gr,{todo:t}))):!1},It=async e=>{let t=K.findIndex(r=>r.id===e);return t<0?!1:(K.splice(t,1),je().then(()=>v(Be,{todoId:e})))},St=async()=>{K=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:K})},je=async()=>{localStorage.setItem(wt,JSON.stringify(K))};var kt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Mt=e=>fetch(`${kt}?target=${e}`),Ct=(e,t)=>fetch(`${kt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),ke=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Mt(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ge="instruments",P={},F=e=>({type:"store:instruments-updated",payload:e}),we=()=>Object.values(P),ee=()=>P,Nt=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ke().then(()=>v(F,{changes:[{instrument:t,op:"create"}]}))},Kr=async(e,t)=>{let{code:r=""}=e;if(!P[r])return!1;let n=P[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),Ke().then(()=>t&&v(F,{changes:[{instrument:n,op:"update"}]}))},Et=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ke().then(()=>v(F,{changes:[{instrument:t,op:"delete"}]}))},Lt=async()=>{P=JSON.parse(localStorage.getItem(Ge)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ke=async()=>{localStorage.setItem(Ge,JSON.stringify(P))},Rt=async e=>{localStorage.setItem(Ge,JSON.stringify(e)),P=e},Pt=window;Pt.quick_refresh=!1;var Yr=()=>Pt.quick_refresh?.2:2,Jr=10,Ye=async()=>{let e=[];for(let t of we())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Yr()*60*1e3){let r=ke.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Kr(t,!1),e.push({instrument:t,op:"update"}))}e.length&&v(F,{changes:e}),setTimeout(Ye,Jr*1e3)};var Je="wallets",U={},Qr=e=>({type:"store:wallet-created",payload:e}),Zr=e=>({type:"store:wallet-updated",payload:e});var Xr=e=>({type:"store:wallet-deleted",payload:e}),Ne=()=>Object.values(U),ae=()=>U,At=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,Ze().then(()=>v(Qr,{wallet:t}))},Qe=async e=>{let{name:t=""}=e;return U[t]?(U[t]=e,Ze().then(()=>v(Zr,{wallet:e}))):!1},Ot=async e=>U[e]?(delete U[e],Ze().then(()=>v(Xr,{name:e}))):!1,Dt=async()=>{U=JSON.parse(localStorage.getItem(Je)||"{}"),console.log({wallets:U})},Ze=async()=>{localStorage.setItem(Je,JSON.stringify(U))},$t=async e=>{localStorage.setItem(Je,JSON.stringify(e)),U=e};var se=e=>t=>({type:e,payload:t}),I=(e="")=>se(e),et=(e="")=>se(e),Xe=e=>t=>{let r=t.target,{xname:n="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:n,xid:a,ev:t};s&&e==="click"?v(se(s.type),l):i&&e==="keyup"?v(se(i.type),l):c&&e==="keydown"?v(se(c.type),l):n&&v(se(`${n}:${e}`),l)},Ut=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var Wt={};var _t=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Wt[`${t}:${r}`]=e),e},Ht=(e="",t="")=>Wt[`${e}:${t}`];function en(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function tn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Vt=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(tn(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=en(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",ie="-moz-",m="-webkit-",Ee="comm",ce="rule",le="decl";var Ft="@import";var Le="@keyframes";var zt=Math.abs,te=String.fromCharCode,qt=Object.assign;function Bt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Re(e){return e.trim()}function jt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ve(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function k(e){return e.length}function ue(e){return e.length}function de(e,t){return t.push(e),e}function Gt(e,t){return e.map(t).join("")}var Pe=1,pe=1,Kt=0,N=0,b=0,fe="";function be(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:Pe,column:pe,length:i,return:""}}function he(e,t){return qt(be("",null,null,"",null,null,0),e,{length:-e.length},t)}function Yt(){return b}function Jt(){return b=N>0?M(fe,--N):0,pe--,b===10&&(pe=1,Pe--),b}function E(){return b=N<Kt?M(fe,N++):0,pe++,b===10&&(pe=1,Pe++),b}function W(){return M(fe,N)}function Te(){return N}function ge(e,t){return Y(fe,e,t)}function me(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ae(e){return Pe=pe=1,Kt=k(fe=e),N=0,[]}function Oe(e){return fe="",e}function xe(e){return Re(ge(N-1,tt(e===91?e+2:e===40?e+1:e)))}function Qt(e){for(;(b=W())&&b<33;)E();return me(e)>2||me(b)>3?"":" "}function Zt(e,t){for(;--t&&E()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return ge(e,Te()+(t<6&&W()==32&&E()==32))}function tt(e){for(;E();)switch(b){case e:return N;case 34:case 39:e!==34&&e!==39&&tt(b);break;case 40:e===41&&tt(e);break;case 92:E();break}return N}function Xt(e,t){for(;E()&&e+b!==47+10;)if(e+b===42+42&&W()===47)break;return"/*"+ge(t,N-1)+"*"+te(e===47?e:E())}function er(e){for(;!me(W());)E();return ge(e,N)}function nr(e){return Oe(De("",null,null,null,[""],e=Ae(e),0,[0],e))}function De(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,h=i,L=0,B=0,D=0,x=1,R=1,T=1,C=0,H="",ye=a,j=s,V=n,w=H;R;)switch(D=C,C=E()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){ve(w+=f(xe(C),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:w+=xe(C);break;case 9:case 10:case 13:case 32:w+=Qt(D);break;case 92:w+=Zt(Te()-1,7);continue;case 47:switch(W()){case 42:case 47:de(rn(Xt(E(),Te()),t,r),l);break;default:w+="/"}break;case 123*x:c[p++]=k(w)*T;case 125*x:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+d:B>0&&k(w)-h&&de(B>32?rr(w+";",n,r,h-1):rr(f(w," ","")+";",n,r,h-2),l);break;case 59:w+=";";default:if(de(V=tr(w,t,r,p,d,a,c,H,ye=[],j=[],h),s),C===123)if(d===0)De(w,t,V,V,ye,s,h,c,j);else switch(L){case 100:case 109:case 115:De(e,V,V,n&&de(tr(e,V,V,0,0,a,c,H,a,ye=[],h),j),a,j,h,c,n?ye:j);break;default:De(w,V,V,V,[""],j,0,c,j)}}p=d=B=0,x=T=1,H=w="",h=i;break;case 58:h=1+k(w),B=D;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Jt()==125)continue}switch(w+=te(C),C*x){case 38:T=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(k(w)-1)*T,T=1;break;case 64:W()===45&&(w+=xe(E())),L=W(),d=h=k(H=w+=er(Te())),C++;break;case 45:D===45&&k(w)==2&&(x=0)}}return s}function tr(e,t,r,n,a,s,i,c,l,p,d){for(var h=a-1,L=a===0?s:[""],B=ue(L),D=0,x=0,R=0;D<n;++D)for(var T=0,C=Y(e,h+1,h=zt(x=i[D])),H=e;T<B;++T)(H=Re(x>0?L[T]+" "+C:f(C,/&\f/g,L[T])))&&(l[R++]=H);return be(e,t,r,a===0?ce:c,l,p,d)}function rn(e,t,r){return be(e,t,r,Ee,te(Yt()),Y(e,2,-2),0)}function rr(e,t,r,n){return be(e,t,r,le,Y(e,0,n),Y(e,n+1,-1),n)}function rt(e,t){switch(Bt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ie+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ie+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ve(e,"stretch")?rt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~ve(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",n=ue(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function or(e,t,r,n){switch(e.type){case Ft:case le:return e.return=e.return||e.value;case Ee:return"";case Le:return e.return=e.value+"{"+J(e.children,n)+"}";case ce:e.value=e.props.join(",")}return k(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function ar(e){var t=ue(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function sr(e){return function(t){t.root||(t=t.return)&&e(t)}}function ir(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case le:e.return=rt(e.value,e.length);break;case Le:return J([he(e,{value:f(e.value,"@","@"+m)})],n);case ce:if(e.length)return Gt(e.props,function(a){switch(jt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([he(e,{props:[f(a,/:(read-\w+)/,":"+ie+"$1")]})],n);case"::placeholder":return J([he(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),he(e,{props:[f(a,/:(plac\w+)/,":"+ie+"$1")]}),he(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function nn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var cr=nn;var on=function(t,r,n){for(var a=0,s=0;a=s,s=W(),a===38&&s===12&&(r[n]=1),!me(s);)E();return ge(t,N)},an=function(t,r){var n=-1,a=44;do switch(me(a)){case 0:a===38&&W()===12&&(r[n]=1),t[n]+=on(N-1,r,n);break;case 2:t[n]+=xe(a);break;case 4:if(a===44){t[++n]=W()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=te(a)}while(a=E());return t},sn=function(t,r){return Oe(an(Ae(t),r))},lr=new WeakMap,cn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!lr.get(n))&&!a){lr.set(t,!0);for(var s=[],i=sn(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},ln=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var un=[ir],dn=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var R=x.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||un,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var R=x.getAttribute("data-emotion").split(" "),T=1;T<R.length;T++)s[R[T]]=!0;c.push(x)});var l,p=[cn,ln];{var d,h=[or,sr(function(x){d.insert(x)})],L=ar(p.concat(a,h)),B=function(R){return J(nr(R),L)};l=function(R,T,C,H){d=C,B(R?R+"{"+T.styles+"}":T.styles),H&&(D.inserted[T.name]=!0)}}var D={key:r,sheet:new Vt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},ur=dn;function pn(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var dr=pn;var mn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pr=mn;var fn=/[A-Z]|^ms/g,hn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,gr=function(t){return t.charCodeAt(1)===45},mr=function(t){return t!=null&&typeof t!="boolean"},nt=cr(function(e){return gr(e)?e:e.replace(fn,"-$&").toLowerCase()}),fr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(hn,function(n,a,s){return z={name:a,styles:s,next:z},a})}return pr[t]!==1&&!gr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ie(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)z={name:n.name,styles:n.styles,next:z},n=n.next;var a=r.styles+";";return a}return gn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Ie(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function gn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Ie(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":mr(i)&&(n+=nt(s)+":"+fr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)mr(i[c])&&(n+=nt(s)+":"+fr(s,i[c])+";");else{var l=Ie(e,t,i);switch(s){case"animation":case"animationName":{n+=nt(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var hr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,$e=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ie(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ie(n,r,t[c]),a&&(s+=i[c]);var l;hr.lastIndex=0;for(var p="",d;(d=hr.exec(s))!==null;)p+="-"+d[1];var h=dr(s)+p;return{name:h,styles:s,next:z}};var xn=!0;function ot(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var xr=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||xn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function yr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function wr(e,t,r){var n=[],a=ot(e,n,r);return n.length<2?r:a+t(n)}var yn=function(t){var r=ur(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered,void 0);return xr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered),L="animation-"+h.name;return yr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered);yr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return wr(r.registered,n,wn(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ot.bind(null,r.registered),merge:wr.bind(null,r.registered,n)}},wn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},vr=yn;var q=vr({key:"css"}),xa=q.flush,ya=q.hydrate,br=q.cx,wa=q.merge,va=q.getRegisteredStyles,Tr=q.injectGlobal,ba=q.keyframes,_=q.css,Ta=q.sheet,Ia=q.cache;var vn=_`
  cursor: pointer;
`,bn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?bn:vn} ${r}`;return o("button",{class:a,...n},t)},at=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+gt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&xt(s)},...r},t)};var Ir="view-home",Sr=()=>{let e=Ht(Ir),t=_t(o("div",{xname:Ir},"Home rendered ",o("strong",{xname:"xxx"},+ht({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",G({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Mr=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var Ra=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),Tn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),In=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var st=e=>{let t=Tn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},O=e=>In.format(e),Se=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var Sn=_`
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
`,lt,Ue,Cr=({changes:e})=>{if(re()==="instruments")if(!e.length)ne(Ue,o(Ln,null));else for(let t of e){let r=G({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":$(Ue,o(ct,{instrument:t.instrument}));break;case"update":r&&oe(r,o(ct,{instrument:t.instrument}));break;case"delete":r?.remove();break}}};g(F,Cr);var it=()=>lt.value="",Mn=g(I(),it),Cn=g(I(),async()=>{let e=lt.value,t=ke.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){it();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Nt(r),it()}),kn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Et(e)}),Nn=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),En=()=>o("div",null,o("input",{xname:"new-instrument"}),"  ",o(A,{xclick:Cn},"Add instrument"),"  ",o(A,{xclick:Mn,variant:"text"},"Clear")),Ln=()=>o(u,null,we().map(e=>o(ct,{instrument:e}))),ct=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Se(e.latestUpdate)),o("td",null,o(A,{xclick:kn,xid:e.code,variant:"text"},"Delete"))),kr=()=>{let e=o("div",{class:Sn},o(Nn,null),o(En,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"}));return e.onMount=()=>{lt=y({xname:"new-instrument"}),Ue=y({xname:"instrument-list"}),Cr({changes:[]}),Nr(),console.log("ViewInstruments mounted!")},e},Nr=()=>{re()==="instruments"&&(Ue.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Se(t.dataset.latestUpdate||"")}),setTimeout(Nr,5e3))};var Rn=_`
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
`,ut,dt,Me={},Er=()=>{ut.value=""},Lr=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},st(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")},pt=e=>{oe(y({xname:"wallet-total",xid:e.name}),o(Ar,{wd:e})),oe(y({xname:"wallet-title",xid:e.name}),o(Or,{wd:e}))};g(F,({changes:e=[]}={})=>{if(re()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of Ne()){let n=r.instruments.filter(s=>t.some(i=>i.instrument.code===s.code));if(!n.length)continue;let a=We(r);n.forEach(s=>{let i=`${r.name}:${s.id}`,c=y({xid:i}),l=a.instruments.find(p=>p.id==s.id);c&&l&&oe(c,o(mt,{ins:l,walletName:a.name}))}),pt(a)}});var Pn=g(I(),Er),An=g(I(),({xid:e=""})=>{Lr(y({xname:"wallet",xid:e}))}),On=g(I(),({xid:e=""})=>{Me[e]=!Me[e],y({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),Dn=g(I(),async()=>{let e=ut?.value||"";if(!e)return;let t={name:e,comment:"",instruments:[]};await At(t),Er(),Me[e]=!0,$(dt,o(Dr,{wallet:t}))}),$n=g(I(),async({xid:e=""})=>{!ae()[e]||!confirm(`Delete wallet ${e}?`)||(await Ot(e),y({el:dt,xname:"wallet",xid:e}).remove())}),Un=g(I(),({xid:e=""})=>{let t=ae()[e];if(!t){alert("Wallet "+e+" not found");return}let r=y({xname:"wallet",xid:e}),n={id:Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")};t.instruments.push(n),Qe(t);let a=We(t);pt(a),Lr(r),$(y({el:r,xname:"instrument-list"}),o(mt,{ins:a.instruments.slice(-1)[0],walletName:a.name}))}),Wn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),n=ae()[t],a=n.instruments.find(({id:s})=>""+s===r);!n||!confirm(`Delete instrument ${a?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:s})=>""+s!==r),Qe(n),pt(We(n)),y({xid:e}).remove())}),Rr=e=>{let t=ee();return Se(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Pr=()=>{re()==="wallets"&&(Ne().forEach(e=>ft({xname:"updated-ago",xid:e.name},Rr(e.instruments))),setTimeout(Pr,5*1e3))},We=e=>{let t=ee(),r=e.instruments.map(s=>{let i=t[s.code]?.latestPrice||0,c=s.totalPrice/s.unitPrice,l=i*c;return{id:s.id,instrumentName:t[s.code]?.name??"???",instrumentUrl:t[s.code]?.sourceUrl,instrumentType:t[s.code]?.type,change:l/s.totalPrice*100-100,currentTotal:l,currentUnit:i,unitCount:c,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:t[s.code]?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:a,changeValue:O(n-a),changePercent:O(n/a*100-100),updatedAgo:Rr(e.instruments)}},Ar=({wd:e})=>o("tr",{xname:"wallet-total",xid:e.name},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},O(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},O(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),Or=({wd:e})=>o("div",{xname:"wallet-title",xid:e.name},o("div",{xclick:On,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),o(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:$n},"Delete"),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,e.changeValue),"\xA0(",o("b",null,e.changePercent,"%"),")"),o("div",{class:""},"Value ",o("b",null,O(e.totalValue))),o("div",{class:""},"Paid ",o("b",null,O(e.totalPaid))))),mt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return o("tr",{xid:r},o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},O(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},O(e.change)),o("td",{class:"price"},O(e.currentTotal)),o("td",{class:"price"},O(e.currentUnit)),o("td",{class:"price"},O(e.unitCount)),o("td",{class:"price"},O(e.paidTotal)),o("td",{class:"price"},O(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(A,{xclick:Wn,xid:r,variant:"text"},"Delete")))},_n=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),we().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:st(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(A,{xclick:Un,xid:e.name},"Add"),o(A,{xclick:An,xid:e.name,variant:"text"},"Clear"))),Dr=({wallet:e})=>{let t=We(e);return o("div",{xname:"wallet",xid:e.name},o(Or,{wd:t}),o("table",{xname:"instruments",xid:e.name,class:br({expanded:Me[e.name]})},o("thead",null,o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"}))),o("tbody",{xname:"instrument-list"},t.instruments.map(r=>o(mt,{ins:r,walletName:t.name}))),o("tfoot",null,o(Ar,{wd:t}),o(_n,{wallet:e}))))},$r=()=>{let e=o("div",{class:Rn},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(A,{xclick:Dn},"Create wallet"),"  ",o(A,{xclick:Pn,variant:"text"},"Clear")),o("div",{xname:"wallet-list"},Ne().map(t=>o(Dr,{wallet:t}))));return e.onMount=()=>{ut=y({xname:"new-wallet-name"}),dt=y({xname:"wallet-list"}),Pr(),console.log("ViewWallets mounted!")},e};var _e,Ce,Ur=()=>{Ce.focus();let e=Ce.value.trim();!e||(Ce.value="",bt(e))},Hn=Mr((e,t)=>{Tt({done:!1,text:t,id:e})},500),Vn=g(I(),({xid:e=""})=>It(e)),Fn=g(I(),Ur),zn=g(et(),({ev:e})=>{e.key==="Enter"&&Ur()}),qn=g(et(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&Hn(t,r)});g(Be,({todoId:e})=>{y({el:_e,xname:"todo",xid:e}).remove()});g(qe,({todo:e})=>{$(_e,o(Wr,{todo:e}))});var Wr=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Vn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:qn,xid:e.id,value:e.text})),_r=()=>{let e=o("div",null,o("div",null,o("input",{xkeyup:zn,xname:"new-item-text"}),"\xA0",o("button",{xclick:Fn},"Add")),o("ol",{xname:"items"}));return e.onMount=async()=>{_e=y({xname:"items"}),Ce=y({xname:"new-item-text"}),Ce.focus(),await St(),ne(_e,...vt().map(t=>o(Wr,{todo:t}))),console.log("ViewTodo mounted!")},e};var Bn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,He;g(I("migration-export:click"),()=>{let e=ae(),t=ee();Q(He,JSON.stringify({instruments:t,wallets:e},null,2)),He.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(He,""));console.log({wallets:e,instruments:t}),await Rt(t),await $t(e),v(F,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var Hr=()=>{let e=o("div",{class:Bn},o("div",null,o(A,{xname:"migration-export"},"Export from LS")," ",o(A,{xname:"migration-import"},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{He=y({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Ve={home:{label:"Home",Component:Sr},wallets:{label:"Wallets",Component:$r},instruments:{label:"Instruments",Component:kr},todo:{label:"Todo",Component:_r},migration:{label:"Data migration",Component:Hr}},re=()=>new URLSearchParams(window.location.search).get("view")||"home",Vr=()=>{let{Component:e,label:t}=Ve[re()]||Ve.home;return{Component:e,label:t}};var jn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Fr=()=>{let[,...e]=Object.entries(Ve);return o("div",{class:jn},o(at,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(at,{view:t},r.label))))};Tr`
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

`;var zr;g(Fe,()=>{let{Component:e}=Vr();ne(zr,o(e,null))});var qr=()=>{let e=o("div",{class:"app"},o(Fr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{zr=y({xname:"current-view"}),console.log("App mounted!")},e};Promise.all([Lt(),Dt()]).then(()=>{Ye(),Ut(),$(document.body,o(qr,null)),yt()});})();
