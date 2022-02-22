(()=>{var $=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},Ce=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},ne=(e,t)=>{let r=e?.parentElement;if(!r)return null;let n=r.replaceChild(t,e);return t.onMount&&t.onMount(),n},j=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},y=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},ft=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=j(e);n&&(n.innerHTML=""+t)},ht=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=j(e);return n?.innerHTML!==void 0?n.innerHTML:t},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=j(e);n&&(n.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=j(e);return n?n.value:t};var zr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[zr(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s)}),r.flat().forEach(a=>$(n,typeof a=="object"?a:document.createTextNode(a))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>$(r,typeof n=="object"?n:document.createTextNode(n))),r};var X={},qr=1,g=(e,t)=>{let{type:r}=e({});if(r)return X[r]=X[r]||[],X[r].push(t),{type:r,callback:t};let n="event-"+qr++;return X[n]=X[n]||[],X[n].push(t),{type:n,callback:t}},v=(e,t)=>{let r=0,{type:n}=e({});for(let a of X[n]||[])a(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Ve=e=>({type:"router:navigate",payload:e}),Fe=e=>{v(Ve,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),Fe(t)};var yt=()=>Fe(window.location.href);window.addEventListener("popstate",()=>Fe(window.location.href));var wt="todos",G=[],ze=e=>({type:"store:item-created",payload:e}),Br=e=>({type:"store:item-updated",payload:e}),qe=e=>({type:"store:item-deleted",payload:e}),vt=()=>G,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return G.push(t),Be().then(()=>v(ze,{todo:t}))},Tt=async e=>{let t=G.find(r=>r.id===e.id);return t?(Object.assign(t,e),Be().then(()=>v(Br,{todo:t}))):!1},It=async e=>{let t=G.findIndex(r=>r.id===e);return t<0?!1:(G.splice(t,1),Be().then(()=>v(qe,{todoId:e})))},St=async()=>{G=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:G})},Be=async()=>{localStorage.setItem(wt,JSON.stringify(G))};var kt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Mt=e=>fetch(`${kt}?target=${e}`),Ct=(e,t)=>fetch(`${kt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),ke=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Mt(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var je="instruments",P={},K=e=>({type:"store:instruments-updated",payload:e}),ye=()=>Object.values(P),ee=()=>P,Nt=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ge().then(()=>v(K,{changes:[{instrument:t,op:"create"}]}))},jr=async(e,t)=>{let{code:r=""}=e;if(!P[r])return!1;let n=P[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),Ge().then(()=>t&&v(K,{changes:[{instrument:n,op:"update"}]}))},Et=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ge().then(()=>v(K,{changes:[{instrument:t,op:"delete"}]}))},Lt=async()=>{P=JSON.parse(localStorage.getItem(je)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ge=async()=>{localStorage.setItem(je,JSON.stringify(P))},Rt=async e=>{localStorage.setItem(je,JSON.stringify(e)),P=e},Pt=window;Pt.quick_refresh=!1;var Gr=()=>Pt.quick_refresh?.2:2,Kr=10,Ke=async()=>{let e=[];for(let t of ye())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Gr()*60*1e3){let r=ke.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await jr(t,!1),e.push({instrument:t,op:"update"}))}e.length&&v(K,{changes:e}),setTimeout(Ke,Kr*1e3)};var Ye="wallets",U={},Yr=e=>({type:"store:wallet-created",payload:e}),Jr=e=>({type:"store:wallet-updated",payload:e});var Qr=e=>({type:"store:wallet-deleted",payload:e}),Ne=()=>Object.values(U),oe=()=>U,At=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,Qe().then(()=>v(Yr,{wallet:t}))},Je=async e=>{let{name:t=""}=e;return U[t]?(U[t]=e,Qe().then(()=>v(Jr,{wallet:e}))):!1},Ot=async e=>U[e]?(delete U[e],Qe().then(()=>v(Qr,{name:e}))):!1,Dt=async()=>{U=JSON.parse(localStorage.getItem(Ye)||"{}"),console.log({wallets:U})},Qe=async()=>{localStorage.setItem(Ye,JSON.stringify(U))},$t=async e=>{localStorage.setItem(Ye,JSON.stringify(e)),U=e};var ae=e=>t=>({type:e,payload:t}),I=(e="")=>ae(e),Xe=(e="")=>ae(e),Ze=e=>t=>{let r=t.target,{xname:n="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:n,xid:a,ev:t};s&&e==="click"?v(ae(s.type),l):i&&e==="keyup"?v(ae(i.type),l):c&&e==="keydown"?v(ae(c.type),l):n&&v(ae(`${n}:${e}`),l)},Ut=()=>{document.addEventListener("click",Ze("click")),document.addEventListener("keyup",Ze("keyup")),document.addEventListener("keydown",Ze("keydown"))};var Wt={};var _t=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Wt[`${t}:${r}`]=e),e},Ht=(e="",t="")=>Wt[`${e}:${t}`];function Zr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Xr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Vt=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Xr(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=Zr(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",se="-moz-",m="-webkit-",Ee="comm",ie="rule",ce="decl";var Ft="@import";var Le="@keyframes";var zt=Math.abs,te=String.fromCharCode,qt=Object.assign;function Bt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Re(e){return e.trim()}function jt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function we(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function k(e){return e.length}function le(e){return e.length}function ue(e,t){return t.push(e),e}function Gt(e,t){return e.map(t).join("")}var Pe=1,de=1,Kt=0,N=0,b=0,me="";function ve(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:Pe,column:de,length:i,return:""}}function fe(e,t){return qt(ve("",null,null,"",null,null,0),e,{length:-e.length},t)}function Yt(){return b}function Jt(){return b=N>0?M(me,--N):0,de--,b===10&&(de=1,Pe--),b}function E(){return b=N<Kt?M(me,N++):0,de++,b===10&&(de=1,Pe++),b}function W(){return M(me,N)}function be(){return N}function he(e,t){return Y(me,e,t)}function pe(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ae(e){return Pe=de=1,Kt=k(me=e),N=0,[]}function Oe(e){return me="",e}function ge(e){return Re(he(N-1,et(e===91?e+2:e===40?e+1:e)))}function Qt(e){for(;(b=W())&&b<33;)E();return pe(e)>2||pe(b)>3?"":" "}function Zt(e,t){for(;--t&&E()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return he(e,be()+(t<6&&W()==32&&E()==32))}function et(e){for(;E();)switch(b){case e:return N;case 34:case 39:e!==34&&e!==39&&et(b);break;case 40:e===41&&et(e);break;case 92:E();break}return N}function Xt(e,t){for(;E()&&e+b!==47+10;)if(e+b===42+42&&W()===47)break;return"/*"+he(t,N-1)+"*"+te(e===47?e:E())}function er(e){for(;!pe(W());)E();return he(e,N)}function nr(e){return Oe(De("",null,null,null,[""],e=Ae(e),0,[0],e))}function De(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,h=i,L=0,q=0,D=0,x=1,R=1,T=1,C=0,H="",xe=a,B=s,V=n,w=H;R;)switch(D=C,C=E()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){we(w+=f(ge(C),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:w+=ge(C);break;case 9:case 10:case 13:case 32:w+=Qt(D);break;case 92:w+=Zt(be()-1,7);continue;case 47:switch(W()){case 42:case 47:ue(en(Xt(E(),be()),t,r),l);break;default:w+="/"}break;case 123*x:c[p++]=k(w)*T;case 125*x:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+d:q>0&&k(w)-h&&ue(q>32?rr(w+";",n,r,h-1):rr(f(w," ","")+";",n,r,h-2),l);break;case 59:w+=";";default:if(ue(V=tr(w,t,r,p,d,a,c,H,xe=[],B=[],h),s),C===123)if(d===0)De(w,t,V,V,xe,s,h,c,B);else switch(L){case 100:case 109:case 115:De(e,V,V,n&&ue(tr(e,V,V,0,0,a,c,H,a,xe=[],h),B),a,B,h,c,n?xe:B);break;default:De(w,V,V,V,[""],B,0,c,B)}}p=d=q=0,x=T=1,H=w="",h=i;break;case 58:h=1+k(w),q=D;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Jt()==125)continue}switch(w+=te(C),C*x){case 38:T=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(k(w)-1)*T,T=1;break;case 64:W()===45&&(w+=ge(E())),L=W(),d=h=k(H=w+=er(be())),C++;break;case 45:D===45&&k(w)==2&&(x=0)}}return s}function tr(e,t,r,n,a,s,i,c,l,p,d){for(var h=a-1,L=a===0?s:[""],q=le(L),D=0,x=0,R=0;D<n;++D)for(var T=0,C=Y(e,h+1,h=zt(x=i[D])),H=e;T<q;++T)(H=Re(x>0?L[T]+" "+C:f(C,/&\f/g,L[T])))&&(l[R++]=H);return ve(e,t,r,a===0?ie:c,l,p,d)}function en(e,t,r){return ve(e,t,r,Ee,te(Yt()),Y(e,2,-2),0)}function rr(e,t,r,n){return ve(e,t,r,ce,Y(e,0,n),Y(e,n+1,-1),n)}function tt(e,t){switch(Bt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+se+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+se+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~we(e,"stretch")?tt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~we(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",n=le(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function or(e,t,r,n){switch(e.type){case Ft:case ce:return e.return=e.return||e.value;case Ee:return"";case Le:return e.return=e.value+"{"+J(e.children,n)+"}";case ie:e.value=e.props.join(",")}return k(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function ar(e){var t=le(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function sr(e){return function(t){t.root||(t=t.return)&&e(t)}}function ir(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ce:e.return=tt(e.value,e.length);break;case Le:return J([fe(e,{value:f(e.value,"@","@"+m)})],n);case ie:if(e.length)return Gt(e.props,function(a){switch(jt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([fe(e,{props:[f(a,/:(read-\w+)/,":"+se+"$1")]})],n);case"::placeholder":return J([fe(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,":"+se+"$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function tn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var cr=tn;var rn=function(t,r,n){for(var a=0,s=0;a=s,s=W(),a===38&&s===12&&(r[n]=1),!pe(s);)E();return he(t,N)},nn=function(t,r){var n=-1,a=44;do switch(pe(a)){case 0:a===38&&W()===12&&(r[n]=1),t[n]+=rn(N-1,r,n);break;case 2:t[n]+=ge(a);break;case 4:if(a===44){t[++n]=W()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=te(a)}while(a=E());return t},on=function(t,r){return Oe(nn(Ae(t),r))},lr=new WeakMap,an=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!lr.get(n))&&!a){lr.set(t,!0);for(var s=[],i=on(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},sn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var cn=[ir],ln=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var R=x.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||cn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var R=x.getAttribute("data-emotion").split(" "),T=1;T<R.length;T++)s[R[T]]=!0;c.push(x)});var l,p=[an,sn];{var d,h=[or,sr(function(x){d.insert(x)})],L=ar(p.concat(a,h)),q=function(R){return J(nr(R),L)};l=function(R,T,C,H){d=C,q(R?R+"{"+T.styles+"}":T.styles),H&&(D.inserted[T.name]=!0)}}var D={key:r,sheet:new Vt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},ur=ln;function un(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var dr=un;var dn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},pr=dn;var pn=/[A-Z]|^ms/g,mn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,gr=function(t){return t.charCodeAt(1)===45},mr=function(t){return t!=null&&typeof t!="boolean"},rt=cr(function(e){return gr(e)?e:e.replace(pn,"-$&").toLowerCase()}),fr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(mn,function(n,a,s){return F={name:a,styles:s,next:F},a})}return pr[t]!==1&&!gr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Te(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var a=r.styles+";";return a}return fn(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,Te(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function fn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Te(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":mr(i)&&(n+=rt(s)+":"+fr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)mr(i[c])&&(n+=rt(s)+":"+fr(s,i[c])+";");else{var l=Te(e,t,i);switch(s){case"animation":case"animationName":{n+=rt(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var hr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,$e=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Te(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Te(n,r,t[c]),a&&(s+=i[c]);var l;hr.lastIndex=0;for(var p="",d;(d=hr.exec(s))!==null;)p+="-"+d[1];var h=dr(s)+p;return{name:h,styles:s,next:F}};var hn=!0;function nt(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var xr=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||hn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function yr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function wr(e,t,r){var n=[],a=nt(e,n,r);return n.length<2?r:a+t(n)}var gn=function(t){var r=ur(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered,void 0);return xr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered),L="animation-"+h.name;return yr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered);yr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return wr(r.registered,n,xn(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:nt.bind(null,r.registered),merge:wr.bind(null,r.registered,n)}},xn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},vr=gn;var z=vr({key:"css"}),ga=z.flush,xa=z.hydrate,br=z.cx,ya=z.merge,wa=z.getRegisteredStyles,Tr=z.injectGlobal,va=z.keyframes,_=z.css,ba=z.sheet,Ta=z.cache;var yn=_`
  cursor: pointer;
`,wn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?wn:yn} ${r}`;return o("button",{class:a,...n},t)},ot=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+gt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&xt(s)},...r},t)};var Ir="view-home",Sr=()=>{let e=Ht(Ir),t=_t(o("div",{xname:Ir},"Home rendered ",o("strong",{xname:"xxx"},+ht({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Mr=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var La=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),vn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),bn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var at=e=>{let t=vn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},O=e=>bn.format(e),Ie=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var Tn=_`
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
`,ct,lt;g(K,({changes:e})=>{if(re()==="instruments")for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":$(lt,o(it,{instrument:t.instrument}));break;case"update":ne(r,o(it,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var st=()=>ct.value="",In=g(I(),st),Sn=g(I(),async()=>{let e=ct.value,t=ke.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(ee()[r.code||""]){st();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Nt(r),st()}),Mn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Et(e)}),Cn=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),kn=()=>o("div",null,o("input",{xname:"new-instrument"}),"  ",o(A,{xclick:Sn},"Add instrument"),"  ",o(A,{xclick:In,variant:"text"},"Clear")),it=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Ie(e.latestUpdate)),o("td",null,o(A,{xclick:Mn,xid:e.code,variant:"text"},"Delete"))),Cr=()=>{let e=o("div",{class:Tn},o(Cn,null),o(kn,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"},ye().map(t=>o(it,{instrument:t}))));return e.onMount=()=>{ct=y({xname:"new-instrument"}),lt=y({xname:"instrument-list"}),kr(),console.log("ViewInstruments mounted!")},e},kr=()=>{re()==="instruments"&&(lt.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Ie(t.dataset.latestUpdate||"")}),setTimeout(kr,5e3))};var Nn=_`
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
`,ut,dt,Se={},Nr=()=>{ut.value=""},Er=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},at(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")},pt=e=>{ne(y({xname:"wallet-total",xid:e.name}),o(Pr,{wd:e})),ne(y({xname:"wallet-title",xid:e.name}),o(Ar,{wd:e}))};g(K,({changes:e=[]}={})=>{if(re()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of Ne()){let n=r.instruments.filter(s=>t.some(i=>i.instrument.code===s.code));if(!n.length)continue;let a=Ue(r);n.forEach(s=>{let i=`${r.name}:${s.id}`,c=y({xid:i}),l=a.instruments.find(p=>p.id==s.id);l&&ne(c,o(mt,{ins:l,walletName:a.name}))}),pt(a)}});var En=g(I(),Nr),Ln=g(I(),({xid:e=""})=>{Er(y({xname:"wallet",xid:e}))}),Rn=g(I(),({xid:e=""})=>{Se[e]=!Se[e],y({xname:"instruments",xid:e}).classList.toggle("expanded",Se[e])}),Pn=g(I(),async()=>{let e=ut?.value||"";if(!e)return;let t={name:e,comment:"",instruments:[]};await At(t),Nr(),Se[e]=!0,$(dt,o(Or,{wallet:t}))}),An=g(I(),async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet ${e}?`)||(await Ot(e),y({el:dt,xname:"wallet",xid:e})?.remove())}),On=g(I(),({xid:e=""})=>{let t=oe()[e];if(!t)return;let r=y({xname:"wallet",xid:e}),n={id:""+Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")};t.instruments.push(n),Je(t);let a=Ue(t);pt(a),Er(r),$(y({el:r,xname:"instrument-list"}),o(mt,{ins:a.instruments.slice(-1)[0],walletName:a.name}))}),Dn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),n=oe()[t];if(!n)return;let a=n.instruments.find(({id:s})=>""+s===r);!confirm(`Delete instrument ${a?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:s})=>""+s!==r),Je(n),pt(Ue(n)),y({xid:e}).remove())}),Lr=e=>{let t=ee();return Ie(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Rr=()=>{re()==="wallets"&&(Ne().forEach(e=>ft({xname:"updated-ago",xid:e.name},Lr(e.instruments))),setTimeout(Rr,5*1e3))},Ue=e=>{let t=ee(),r=e.instruments.map(s=>{let i=t[s.code]?.latestPrice||0,c=s.totalPrice/s.unitPrice,l=i*c;return{id:s.id,instrumentName:t[s.code]?.name??"???",instrumentUrl:t[s.code]?.sourceUrl,instrumentType:t[s.code]?.type,change:l/s.totalPrice*100-100,currentTotal:l,currentUnit:i,unitCount:c,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:t[s.code]?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:a,changeValue:O(n-a),changePercent:O(n/a*100-100),updatedAgo:Lr(e.instruments)}},Pr=({wd:e})=>o("tr",{xname:"wallet-total",xid:e.name},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},O(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},O(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),Ar=({wd:e})=>o("div",{xname:"wallet-title",xid:e.name},o("div",{xclick:Rn,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),o(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:An},"Delete"),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,e.changeValue),"\xA0(",o("b",null,e.changePercent,"%"),")"),o("div",{class:""},"Value ",o("b",null,O(e.totalValue))),o("div",{class:""},"Paid ",o("b",null,O(e.totalPaid))))),mt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return o("tr",{xid:r},o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},O(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},O(e.change)),o("td",{class:"price"},O(e.currentTotal)),o("td",{class:"price"},O(e.currentUnit)),o("td",{class:"price"},O(e.unitCount)),o("td",{class:"price"},O(e.paidTotal)),o("td",{class:"price"},O(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(A,{xclick:Dn,xid:r,variant:"text"},"Delete")))},$n=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),ye().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:at(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(A,{xclick:On,xid:e.name},"Add"),o(A,{xclick:Ln,xid:e.name,variant:"text"},"Clear"))),Or=({wallet:e})=>{let t=Ue(e);return o("div",{xname:"wallet",xid:e.name},o(Ar,{wd:t}),o("table",{xname:"instruments",xid:e.name,class:br({expanded:Se[e.name]})},o("thead",null,o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"}))),o("tbody",{xname:"instrument-list"},t.instruments.map(r=>o(mt,{ins:r,walletName:t.name}))),o("tfoot",null,o(Pr,{wd:t}),o($n,{wallet:e}))))},Dr=()=>{let e=o("div",{class:Nn},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(A,{xclick:Pn},"Create wallet"),"  ",o(A,{xclick:En,variant:"text"},"Clear")),o("div",{xname:"wallet-list"},Ne().map(t=>o(Or,{wallet:t}))));return e.onMount=()=>{ut=y({xname:"new-wallet-name"}),dt=y({xname:"wallet-list"}),Rr(),console.log("ViewWallets mounted!")},e};var We,Me,$r=()=>{Me.focus();let e=Me.value.trim();!e||(Me.value="",bt(e))},Un=Mr((e,t)=>{Tt({done:!1,text:t,id:e})},500),Wn=g(I(),({xid:e=""})=>It(e)),_n=g(I(),$r),Hn=g(Xe(),({ev:e})=>e.key==="Enter"&&$r()),Vn=g(Xe(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&Un(t,r)});g(qe,({todoId:e})=>y({el:We,xname:"todo",xid:e}).remove());g(ze,({todo:e})=>$(We,o(Ur,{todo:e})));var Ur=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Wn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:Vn,xid:e.id,value:e.text})),Wr=()=>{let e=o("div",null,o("input",{xkeyup:Hn,xname:"new-item-text"}),"\xA0",o("button",{xclick:_n},"Add"),o("ol",{xname:"items"}));return e.onMount=async()=>{We=y({xname:"items"}),Me=y({xname:"new-item-text"}),Me.focus(),await St(),Ce(We,...vt().map(t=>o(Ur,{todo:t}))),console.log("ViewTodo mounted!")},e};var Fn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,_e,zn=g(I(),()=>{let e=oe(),t=ee();Q(_e,JSON.stringify({instruments:t,wallets:e},null,2)),_e.select()}),qn=g(I(),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(_e,""));console.log("IMPORTED:",{wallets:e,instruments:t}),await Rt(t),await $t(e)}catch(e){alert("Failed to load data: "+e)}}),_r=()=>{let e=o("div",{class:Fn},o("div",null,o(A,{xclick:zn},"Export from LS")," ",o(A,{xclick:qn},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{_e=y({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var He={home:{label:"Home",Component:Sr},wallets:{label:"Wallets",Component:Dr},instruments:{label:"Instruments",Component:Cr},todo:{label:"Todo",Component:Wr},migration:{label:"Data migration",Component:_r}},re=()=>new URLSearchParams(window.location.search).get("view")||"home",Hr=()=>{let{Component:e,label:t}=He[re()]||He.home;return{Component:e,label:t}};var Bn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Vr=()=>{let[,...e]=Object.entries(He);return o("div",{class:Bn},o(ot,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(ot,{view:t},r.label))))};Tr`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 1000px;
    margin: 0 auto;
    overflow-y: scroll;
  }
  .app {
    min-width: 1000px;
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

`;g(Ve,()=>{let{Component:e}=Hr();Ce(y({xname:"current-view"}),o(e,null))});var Fr=()=>{let e=o("div",{class:"app"},o(Vr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Lt(),Dt()]).then(()=>{Ke(),Ut(),$(document.body,o(Fr,null)),yt()});})();
