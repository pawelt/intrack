(()=>{var $=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},ke=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},re=(e,t)=>{let r=e?.parentElement;if(!r)return null;let n=r.replaceChild(t,e);return t.onMount&&t.onMount(),n},j=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},g=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},ht=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=j(e);n&&(n.innerHTML=""+t)},xt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=j(e);return n?.innerHTML!==void 0?n.innerHTML:t},Q=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=j(e);n&&(n.value=""+t)},Z=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=j(e);return n?n.value:t};var jr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[jr(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s)}),r.flat().forEach(a=>$(n,typeof a=="object"?a:document.createTextNode(a))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>$(r,typeof n=="object"?n:document.createTextNode(n))),r};var X={},Gr=1,x=(e,t)=>{let{type:r}=e({});if(r)return X[r]=X[r]||[],X[r].push(t),{type:r,callback:t};let n="event-"+Gr++;return X[n]=X[n]||[],X[n].push(t),{type:n,callback:t}},v=(e,t)=>{let r=0,{type:n}=e({});for(let a of X[n]||[])a(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},He=e=>({type:"router:navigate",payload:e}),Ve=e=>{v(He,{newUrl:new URL(e)})},yt=e=>{let t=""+e;window.history.pushState(null,"",t),Ve(t)};var wt=()=>Ve(window.location.href);window.addEventListener("popstate",()=>Ve(window.location.href));var vt="todos",G=[],Fe=e=>({type:"store:item-created",payload:e}),Kr=e=>({type:"store:item-updated",payload:e}),ze=e=>({type:"store:item-deleted",payload:e}),bt=()=>G,Tt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return G.push(t),qe().then(()=>v(Fe,{todo:t}))},It=async e=>{let t=G.find(r=>r.id===e.id);return t?(Object.assign(t,e),qe().then(()=>v(Kr,{todo:t}))):!1},St=async e=>{let t=G.findIndex(r=>r.id===e);return t<0?!1:(G.splice(t,1),qe().then(()=>v(ze,{todoId:e})))},Mt=async()=>{G=JSON.parse(localStorage.getItem(vt)||"[]"),console.log({todos:G})},qe=async()=>{localStorage.setItem(vt,JSON.stringify(G))};var Lt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Ct=e=>fetch(`${Lt}?target=${e}`),kt=(e,t)=>fetch(`${Lt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Et=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},Nt=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},Be=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Nt(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await kt(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{Et(e);let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await kt(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{if(!Nt(e))return e;let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Ct(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e},fetchCurrentPrice:async e=>{Et(e);let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Ct(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),e}}];var je="instruments",A={},K=e=>({type:"store:instruments-updated",payload:e}),ye=()=>Object.values(A),ne=()=>A,Yr=async e=>{if(A[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),A[t.code]=t,Ge().then(()=>v(K,{changes:[{instrument:t,op:"create"}]}))},Jr=async(e,t)=>{let{code:r=""}=e;if(!A[r])return!1;let n=A[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),Ge().then(()=>t&&v(K,{changes:[{instrument:n,op:"update"}]}))},Rt=async e=>{if(!A[e])return!1;let t=A[e];return delete A[e],Ge().then(()=>v(K,{changes:[{instrument:t,op:"delete"}]}))},Pt=async()=>{A=JSON.parse(localStorage.getItem(je)||"{}"),Object.values(A).forEach(e=>e.type||(e.type="F")),console.log({instruments:A})},Ge=async()=>{localStorage.setItem(je,JSON.stringify(A))},At=async e=>{localStorage.setItem(je,JSON.stringify(e)),A=e},Ot=window;Ot.quick_refresh=!1;var Qr=()=>Ot.quick_refresh?.2:2,Zr=10,Ke=async()=>{let e=[];for(let t of ye())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Qr()*60*1e3){let r=Be.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}try{await r.fetchCurrentPrice(t),await Jr(t,!1),e.push({instrument:t,op:"update"})}catch{}}e.length&&v(K,{changes:e}),setTimeout(Ke,Zr*1e3)},Dt=async e=>{let t=Be.find(n=>n.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(ne()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await Yr(r)};var $t=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var mo=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),Xr=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),en=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var Ye=e=>{let t=Xr.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},k=e=>en.format(e),we=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var Je="wallets",U={},tn=e=>({type:"store:wallet-created",payload:e}),rn=e=>({type:"store:wallet-updated",payload:e});var nn=e=>({type:"store:wallet-deleted",payload:e}),Ee=()=>Object.values(U),oe=()=>U,Ut=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,Ze().then(()=>v(tn,{wallet:t}))},Qe=async e=>{let{name:t=""}=e;return U[t]?(U[t]=e,Ze().then(()=>v(rn,{wallet:e}))):!1},Wt=async e=>U[e]?(delete U[e],Ze().then(()=>v(nn,{name:e}))):!1,_t=async()=>{U=JSON.parse(localStorage.getItem(Je)||"{}"),console.log({wallets:U})},Ze=async()=>{localStorage.setItem(Je,JSON.stringify(U))},Ht=async e=>{localStorage.setItem(Je,JSON.stringify(e)),U=e},Xe=e=>{let t=ne();return we(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},ve=e=>{let t=ne(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,p=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:p/s.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:a,changeValue:k(n-a),changePercent:k(n/a*100-100),updatedAgo:Xe(e.instruments)}};var ae=e=>t=>({type:e,payload:t}),I=(e="")=>ae(e),tt=(e="")=>ae(e),et=e=>t=>{let r=t.target,{xname:n="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:n,xid:a,ev:t};s&&e==="click"?v(ae(s.type),l):i&&e==="keyup"?v(ae(i.type),l):c&&e==="keydown"?v(ae(c.type),l):n&&v(ae(`${n}:${e}`),l)},Vt=()=>{document.addEventListener("click",et("click")),document.addEventListener("keyup",et("keyup")),document.addEventListener("keydown",et("keydown"))};var Ft={};var zt=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Ft[`${t}:${r}`]=e),e},qt=(e="",t="")=>Ft[`${e}:${t}`];function on(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function an(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Bt=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(an(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=on(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",se="-moz-",m="-webkit-",Ne="comm",ie="rule",ce="decl";var jt="@import";var Le="@keyframes";var Gt=Math.abs,ee=String.fromCharCode,Kt=Object.assign;function Yt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Re(e){return e.trim()}function Jt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function be(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function E(e){return e.length}function le(e){return e.length}function ue(e,t){return t.push(e),e}function Qt(e,t){return e.map(t).join("")}var Pe=1,de=1,Zt=0,N=0,b=0,me="";function Te(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:Pe,column:de,length:i,return:""}}function fe(e,t){return Kt(Te("",null,null,"",null,null,0),e,{length:-e.length},t)}function Xt(){return b}function er(){return b=N>0?M(me,--N):0,de--,b===10&&(de=1,Pe--),b}function L(){return b=N<Zt?M(me,N++):0,de++,b===10&&(de=1,Pe++),b}function W(){return M(me,N)}function Ie(){return N}function he(e,t){return Y(me,e,t)}function pe(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ae(e){return Pe=de=1,Zt=E(me=e),N=0,[]}function Oe(e){return me="",e}function xe(e){return Re(he(N-1,rt(e===91?e+2:e===40?e+1:e)))}function tr(e){for(;(b=W())&&b<33;)L();return pe(e)>2||pe(b)>3?"":" "}function rr(e,t){for(;--t&&L()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return he(e,Ie()+(t<6&&W()==32&&L()==32))}function rt(e){for(;L();)switch(b){case e:return N;case 34:case 39:e!==34&&e!==39&&rt(b);break;case 40:e===41&&rt(e);break;case 92:L();break}return N}function nr(e,t){for(;L()&&e+b!==47+10;)if(e+b===42+42&&W()===47)break;return"/*"+he(t,N-1)+"*"+ee(e===47?e:L())}function or(e){for(;!pe(W());)L();return he(e,N)}function ir(e){return Oe(De("",null,null,null,[""],e=Ae(e),0,[0],e))}function De(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,h=i,R=0,q=0,D=0,y=1,P=1,T=1,C=0,H="",ge=a,B=s,V=n,w=H;P;)switch(D=C,C=L()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){be(w+=f(xe(C),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:w+=xe(C);break;case 9:case 10:case 13:case 32:w+=tr(D);break;case 92:w+=rr(Ie()-1,7);continue;case 47:switch(W()){case 42:case 47:ue(sn(nr(L(),Ie()),t,r),l);break;default:w+="/"}break;case 123*y:c[p++]=E(w)*T;case 125*y:case 59:case 0:switch(C){case 0:case 125:P=0;case 59+d:q>0&&E(w)-h&&ue(q>32?sr(w+";",n,r,h-1):sr(f(w," ","")+";",n,r,h-2),l);break;case 59:w+=";";default:if(ue(V=ar(w,t,r,p,d,a,c,H,ge=[],B=[],h),s),C===123)if(d===0)De(w,t,V,V,ge,s,h,c,B);else switch(R){case 100:case 109:case 115:De(e,V,V,n&&ue(ar(e,V,V,0,0,a,c,H,a,ge=[],h),B),a,B,h,c,n?ge:B);break;default:De(w,V,V,V,[""],B,0,c,B)}}p=d=q=0,y=T=1,H=w="",h=i;break;case 58:h=1+E(w),q=D;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&er()==125)continue}switch(w+=ee(C),C*y){case 38:T=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(E(w)-1)*T,T=1;break;case 64:W()===45&&(w+=xe(L())),R=W(),d=h=E(H=w+=or(Ie())),C++;break;case 45:D===45&&E(w)==2&&(y=0)}}return s}function ar(e,t,r,n,a,s,i,c,l,p,d){for(var h=a-1,R=a===0?s:[""],q=le(R),D=0,y=0,P=0;D<n;++D)for(var T=0,C=Y(e,h+1,h=Gt(y=i[D])),H=e;T<q;++T)(H=Re(y>0?R[T]+" "+C:f(C,/&\f/g,R[T])))&&(l[P++]=H);return Te(e,t,r,a===0?ie:c,l,p,d)}function sn(e,t,r){return Te(e,t,r,Ne,ee(Xt()),Y(e,2,-2),0)}function sr(e,t,r,n){return Te(e,t,r,ce,Y(e,0,n),Y(e,n+1,-1),n)}function nt(e,t){switch(Yt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+se+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+se+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~be(e,"stretch")?nt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,E(e)-3-(~be(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",n=le(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function cr(e,t,r,n){switch(e.type){case jt:case ce:return e.return=e.return||e.value;case Ne:return"";case Le:return e.return=e.value+"{"+J(e.children,n)+"}";case ie:e.value=e.props.join(",")}return E(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function lr(e){var t=le(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function ur(e){return function(t){t.root||(t=t.return)&&e(t)}}function dr(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ce:e.return=nt(e.value,e.length);break;case Le:return J([fe(e,{value:f(e.value,"@","@"+m)})],n);case ie:if(e.length)return Qt(e.props,function(a){switch(Jt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([fe(e,{props:[f(a,/:(read-\w+)/,":"+se+"$1")]})],n);case"::placeholder":return J([fe(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,":"+se+"$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function cn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var pr=cn;var ln=function(t,r,n){for(var a=0,s=0;a=s,s=W(),a===38&&s===12&&(r[n]=1),!pe(s);)L();return he(t,N)},un=function(t,r){var n=-1,a=44;do switch(pe(a)){case 0:a===38&&W()===12&&(r[n]=1),t[n]+=ln(N-1,r,n);break;case 2:t[n]+=xe(a);break;case 4:if(a===44){t[++n]=W()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=ee(a)}while(a=L());return t},dn=function(t,r){return Oe(un(Ae(t),r))},mr=new WeakMap,pn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!mr.get(n))&&!a){mr.set(t,!0);for(var s=[],i=dn(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},mn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var fn=[dr],hn=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(y){var P=y.getAttribute("data-emotion");P.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var a=t.stylisPlugins||fn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var P=y.getAttribute("data-emotion").split(" "),T=1;T<P.length;T++)s[P[T]]=!0;c.push(y)});var l,p=[pn,mn];{var d,h=[cr,ur(function(y){d.insert(y)})],R=lr(p.concat(a,h)),q=function(P){return J(ir(P),R)};l=function(P,T,C,H){d=C,q(P?P+"{"+T.styles+"}":T.styles),H&&(D.inserted[T.name]=!0)}}var D={key:r,sheet:new Bt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},fr=hn;function xn(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var hr=xn;var gn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},xr=gn;var yn=/[A-Z]|^ms/g,wn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,vr=function(t){return t.charCodeAt(1)===45},gr=function(t){return t!=null&&typeof t!="boolean"},ot=pr(function(e){return vr(e)?e:e.replace(yn,"-$&").toLowerCase()}),yr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(wn,function(n,a,s){return F={name:a,styles:s,next:F},a})}return xr[t]!==1&&!vr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Se(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var a=r.styles+";";return a}return vn(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,Se(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function vn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Se(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":gr(i)&&(n+=ot(s)+":"+yr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)gr(i[c])&&(n+=ot(s)+":"+yr(s,i[c])+";");else{var l=Se(e,t,i);switch(s){case"animation":case"animationName":{n+=ot(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var wr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,$e=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Se(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Se(n,r,t[c]),a&&(s+=i[c]);var l;wr.lastIndex=0;for(var p="",d;(d=wr.exec(s))!==null;)p+="-"+d[1];var h=hr(s)+p;return{name:h,styles:s,next:F}};var bn=!0;function at(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var br=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||bn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function Tr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Ir(e,t,r){var n=[],a=at(e,n,r);return n.length<2?r:a+t(n)}var Tn=function(t){var r=fr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered,void 0);return br(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered),R="animation-"+h.name;return Tr(r,{name:h.name,styles:"@keyframes "+R+"{"+h.styles+"}"}),R},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=$e(p,r.registered);Tr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return Ir(r.registered,n,In(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:at.bind(null,r.registered),merge:Ir.bind(null,r.registered,n)}},In=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},Sr=Tn;var z=Sr({key:"css"}),Ea=z.flush,Na=z.hydrate,Mr=z.cx,La=z.merge,Ra=z.getRegisteredStyles,Cr=z.injectGlobal,Pa=z.keyframes,_=z.css,Aa=z.sheet,Oa=z.cache;var Sn=_`
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
`,O=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?Mn:Sn} ${r}`;return o("button",{class:a,...n},t)},st=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+gt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&yt(s)},...r},t)};var kr="view-home",Er=()=>{let e=qt(kr),t=zt(o("div",{xname:kr},"Home rendered ",o("strong",{xname:"xxx"},+xt({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Cn=_`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='new-instrument-source'] {
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
`,lt,it,ut;x(K,({changes:e})=>{if(te()==="instruments")for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":$(ut,o(ct,{instrument:t.instrument}));break;case"update":re(r,o(ct,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var Nr=()=>lt.value="",kn=x(I(),Nr),En=x(I(),async()=>{it.disabled=!0;try{await Dt(lt.value)}catch(e){alert(e)}it.disabled=!1,Nr()}),Nn=x(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Rt(e)}),Ln=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),Rn=()=>o("div",null,o("input",{xname:"new-instrument-source"}),"  ",o(O,{xclick:En,xname:"add-instrument"},"Add instrument"),"  ",o(O,{xclick:kn,variant:"text"},"Clear")),ct=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},we(e.latestUpdate)),o("td",null,o(O,{xclick:Nn,xid:e.code,variant:"text"},"Delete"))),Lr=()=>{let e=o("div",{class:Cn},o(Ln,null),o(Rn,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"},ye().map(t=>o(ct,{instrument:t}))));return e.onMount=()=>{lt=g({xname:"new-instrument-source"}),it=g({xname:"add-instrument"}),ut=g({xname:"instrument-list"}),Rr(),console.log("ViewInstruments mounted!")},e},Rr=()=>{te()==="instruments"&&(ut.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=we(t.dataset.latestUpdate||"")}),setTimeout(Rr,5e3))};var Pn=_`
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
`,dt,pt,Me={},Pr=()=>{dt.value=""},Ar=e=>{Q({el:e,xname:"wallet-new-total-price"},""),Q({el:e,xname:"wallet-new-unit-price"},""),Q({el:e,xname:"wallet-new-date"},Ye(new Date)),Q({el:e,xname:"wallet-new-instrument"},"")},mt=e=>{re(g({xname:"wallet-total",xid:e.name}),o(Or,{wd:e})),re(g({xname:"wallet-title",xid:e.name}),o(Dr,{wd:e}))};x(K,({changes:e=[]}={})=>{if(te()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of Ee()){let n=r.instruments.filter(s=>t.some(i=>i.instrument.code===s.code));if(!n.length)continue;let a=ve(r);n.forEach(s=>{let i=`${r.name}:${s.id}`,c=g({xid:i}),l=a.instruments.find(p=>p.id==s.id);l&&re(c,o(ft,{ins:l,walletName:a.name}))}),mt(a)}});var An=x(I(),Pr),On=x(I(),({xid:e=""})=>{Ar(g({xname:"wallet",xid:e}))}),Dn=x(I(),({xid:e=""})=>{Me[e]=!Me[e],g({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),$n=x(I(),async()=>{let e=dt?.value||"";if(!e)return;let t={name:e,comment:"",instruments:[]};await Ut(t),Pr(),Me[e]=!0,$(pt,o($r,{wallet:t}))}),Un=x(I(),async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet ${e}?`)||(await Wt(e),g({el:pt,xname:"wallet",xid:e})?.remove())}),Wn=x(I(),({xid:e=""})=>{let t=oe()[e];if(!t)return;let r=g({xname:"wallet",xid:e}),n={id:""+Date.now(),code:Z({el:r,xname:"wallet-new-instrument"},""),date:Z({el:r,xname:"wallet-new-date"},""),totalPrice:+Z({el:r,xname:"wallet-new-total-price"},""),unitPrice:+Z({el:r,xname:"wallet-new-unit-price"},"")};t.instruments.push(n),Qe(t);let a=ve(t);mt(a),Ar(r),$(g({el:r,xname:"instrument-list"}),o(ft,{ins:a.instruments.slice(-1)[0],walletName:a.name}))}),_n=x(I(),({xid:e=""})=>{let[t,r]=e.split(":"),n=oe()[t];if(!n)return;let a=n.instruments.find(({id:s})=>""+s===r);!confirm(`Delete instrument ${a?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:s})=>""+s!==r),Qe(n),mt(ve(n)),g({xid:e}).remove())}),Or=({wd:e})=>o("tr",{xname:"wallet-total",xid:e.name},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},k(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},k(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),Dr=({wd:e})=>o("div",{xname:"wallet-title",xid:e.name},o("div",{xclick:Dn,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),o(O,{variant:"text",class:"delete-wallet",xid:e.name,xclick:Un},"Delete"),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,e.changeValue),"\xA0(",o("b",null,e.changePercent,"%"),")"),o("div",{class:""},"Value ",o("b",null,k(e.totalValue))),o("div",{class:""},"Paid ",o("b",null,k(e.totalPaid))))),ft=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return o("tr",{xid:r},o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},k(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},k(e.change)),o("td",{class:"price"},k(e.currentTotal)),o("td",{class:"price"},k(e.currentUnit)),o("td",{class:"price"},k(e.unitCount)),o("td",{class:"price"},k(e.paidTotal)),o("td",{class:"price"},k(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(O,{xclick:_n,xid:r,variant:"text"},"Delete")))},Hn=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),ye().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:Ye(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(O,{xclick:Wn,xid:e.name},"Add"),o(O,{xclick:On,xid:e.name,variant:"text"},"Clear"))),$r=({wallet:e})=>{let t=ve(e);return o("div",{xname:"wallet",xid:e.name},o(Dr,{wd:t}),o("table",{xname:"instruments",xid:e.name,class:Mr({expanded:Me[e.name]})},o("thead",null,o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"}))),o("tbody",{xname:"instrument-list"},t.instruments.map(r=>o(ft,{ins:r,walletName:t.name}))),o("tfoot",null,o(Or,{wd:t}),o(Hn,{wallet:e}))))},Ur=()=>{let e=o("div",{class:Pn},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(O,{xclick:$n},"Create wallet"),"  ",o(O,{xclick:An,variant:"text"},"Clear")),o("div",{xname:"wallet-list"},Ee().map(t=>o($r,{wallet:t}))));return e.onMount=()=>{dt=g({xname:"new-wallet-name"}),pt=g({xname:"wallet-list"}),Wr(),console.log("ViewWallets mounted!")},e},Wr=()=>{te()==="wallets"&&(Ee().forEach(e=>ht({xname:"updated-ago",xid:e.name},Xe(e.instruments))),setTimeout(Wr,5*1e3))};var Ue,Ce,_r=()=>{Ce.focus();let e=Ce.value.trim();!e||(Ce.value="",Tt(e))},Vn=$t((e,t)=>{It({done:!1,text:t,id:e})},500),Fn=x(I(),({xid:e=""})=>St(e)),zn=x(I(),_r),qn=x(tt(),({ev:e})=>e.key==="Enter"&&_r()),Bn=x(tt(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&Vn(t,r)});x(ze,({todoId:e})=>g({el:Ue,xname:"todo",xid:e}).remove());x(Fe,({todo:e})=>$(Ue,o(Hr,{todo:e})));var Hr=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Fn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:Bn,xid:e.id,value:e.text})),Vr=()=>{let e=o("div",null,o("input",{xkeyup:qn,xname:"new-item-text"}),"\xA0",o("button",{xclick:zn},"Add"),o("ol",{xname:"items"}));return e.onMount=async()=>{Ue=g({xname:"items"}),Ce=g({xname:"new-item-text"}),Ce.focus(),await Mt(),ke(Ue,...bt().map(t=>o(Hr,{todo:t}))),console.log("ViewTodo mounted!")},e};var jn=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,We,Gn=x(I(),()=>{let e=oe(),t=ne();Q(We,JSON.stringify({instruments:t,wallets:e},null,2)),We.select()}),Kn=x(I(),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Z(We,""));console.log("IMPORTED:",{wallets:e,instruments:t}),await At(t),await Ht(e)}catch(e){alert("Failed to load data: "+e)}}),Fr=()=>{let e=o("div",{class:jn},o("div",null,o(O,{xclick:Gn},"Export from LS")," ",o(O,{xclick:Kn},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{We=g({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var _e={home:{label:"Home",Component:Er},wallets:{label:"Wallets",Component:Ur},instruments:{label:"Instruments",Component:Lr},todo:{label:"Todo",Component:Vr},migration:{label:"Data migration",Component:Fr}},te=()=>new URLSearchParams(window.location.search).get("view")||"home",zr=()=>{let{Component:e,label:t}=_e[te()]||_e.home;return{Component:e,label:t}};var Yn=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,qr=()=>{let[,...e]=Object.entries(_e);return o("div",{class:Yn},o(st,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(st,{view:t},r.label))))};Cr`
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

`;x(He,()=>{let{Component:e}=zr();ke(g({xname:"current-view"}),o(e,null))});var Br=()=>{let e=o("div",{class:"app"},o(qr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Pt(),_t()]).then(()=>{Ke(),Vt(),$(document.body,o(Br,null)),wt()});})();
