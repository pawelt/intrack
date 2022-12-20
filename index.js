"use strict";(()=>{var se=(e,...t)=>{e.replaceChildren(...t)},Rt=(e,...t)=>{e.append(...t)},ee=(e,t)=>e.appendChild(t),G=(e,t)=>{let r=e?.parentElement;return r?r.replaceChild(t,e):null},Re=({el:e=document,sel:t="",xname:r,xid:n})=>{let o=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${o}${s}`)},N=e=>{let t=()=>Re({xname:e});return t.xname=e,t.toString=()=>e,t},Y=e=>{let t=r=>Re({xname:e,xid:r});return t.xname=e,t.toString=()=>e,t},j=e=>{let t=r=>Re({xname:e,el:r});return t.xname=e,t.toString=()=>e,t},we=e=>{let t=r=>Re({xid:e,el:r});return t.xid=e,t.toString=()=>e,t};var mn=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),Ot=(e,t)=>(t.children&&Rt(e,...[t.children].flat(1)),e);customElements.define("nof-elem",class extends HTMLElement{connectedCallback(){let e=this;se(e,e.elem),this.isConnected&&e.onMount?.(e,e.props)}disconnectedCallback(){let e=this;e.onUnMount?.(e,e.props)}});var fn=customElements.get("nof-elem"),u=(e,t)=>{if(typeof e=="function"){let n=e(t);if(!e.onMount&&!e.onUnMount)return n;let o=new fn;return o.elem=n,o.props=t,o.onMount=e.onMount,o.onUnMount=e.onUnMount,o}let r=document.createElement(e);for(let[n,o]of Object.entries(t||{}))n.startsWith("on")&&typeof o=="function"?r.addEventListener(n.substring(2).toLowerCase(),o):n.startsWith("data-")?r.dataset[mn(n.substring(5))]=""+o:n==="xname"||n==="xid"?r.dataset[n]=""+o:n==="style"?typeof o=="object"?Object.assign(r.style,o):r.style=o:n==="children"||(["string","number","boolean"].includes(typeof o)&&r.setAttribute(n,""+o),r[n]=o);return Ot(r,t)},d=e=>Ot(document.createDocumentFragment(),e),a=u,p=u,Ke=d;var At={};var Pt=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(At[`${t}:${r}`]=e),e},Dt=(e="",t="")=>At[`${e}:${t}`];var te={},hn=1,x=(e,t)=>{let{type:r}=e({});if(r)return te[r]=te[r]||[],te[r].push(t),{type:r,callback:t};let n="event-"+hn++;return te[n]=te[n]||[],te[n].push(t),{type:n,callback:t}},S=(e,t)=>{let r=0,{type:n}=e({});for(let o of te[n]||[])o(t),r++;return r};var ve=(e="")=>t=>({type:e,payload:t}),I=ve(),Ye=ve(),Ge=e=>t=>{let r=t.target,{xclick:n,xkeyup:o,xkeydown:s}=r,{xname:i="",xid:c=""}=r.dataset,l={xname:i,xid:c,ev:t};return n&&e==="click"?S(ve(n.type),l):o&&e==="keyup"?S(ve(o.type),l):s&&e==="keydown"?S(ve(s.type),l):0},Wt=()=>{document.addEventListener("click",Ge("click")),document.addEventListener("keyup",Ge("keyup")),document.addEventListener("keydown",Ge("keydown"))};var $t=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let o=new URL(""+e);o.pathname=t??o.pathname;let s=r??n;if(!s)return o;let i=new URLSearchParams(r?o.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(f=>i.append(c,f))):l!==void 0?i.set(c,l):i.delete(c)}return o.search=""+i,o},Je=e=>S(Qe,{newUrl:new URL(e)}),Qe=e=>({type:"router:navigate",payload:e}),Ut=e=>{let t=""+e;window.history.pushState(null,"",t),Je(t)},Vt=()=>{window.addEventListener("popstate",()=>Je(window.location.href)),Je(window.location.href)};var _t="todos",J=[],Ze=e=>({type:"store:item-created",payload:e}),gn=e=>({type:"store:item-updated",payload:e}),et=e=>({type:"store:item-deleted",payload:e}),Ht=()=>J,Ft=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return J.push(t),tt().then(()=>S(Ze,{todo:t}))},zt=async e=>{let t=J.find(r=>r.id===e.id);return t?(Object.assign(t,e),tt().then(()=>S(gn,{todo:t}))):!1},Bt=async e=>{let t=J.findIndex(r=>r.id===e);return t<0?!1:(J.splice(t,1),tt().then(()=>S(et,{todoId:e})))},Xt=async()=>{J=JSON.parse(localStorage.getItem(_t)||"[]"),console.log({todos:J})},tt=async()=>{localStorage.setItem(_t,JSON.stringify(J))};var xn=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",qt=(e,t)=>fetch(`${xn}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),jt=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},Kt=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},rt=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Kt(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,o=((await(await qt(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:o,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{jt(e);let t=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${e.isin}-recent.json?${Date.now()}`,n=(await(await fetch(t)).json())?.data?.pop()||{time:"0",price:0};return e.latestPrice=n.price,e.latestTimestamp=new Date(n.time).toISOString(),e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("product/funds/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Kt(e))return e;let[,t,r]=e.sourceUrl.match(/funds\/([^/.]+)\.([^/.]+)/)||[],n=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}.${r}`,s=((await(await qt(n,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1];return Object.assign(e,{name:s,isin:t,code:r,type:"F"}),e},fetchCurrentPrice:async e=>{jt(e);let t=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${e.isin}-recent.json?${Date.now()}`,n=(await(await fetch(t)).json())?.data?.pop()||{time:"0",price:0};return e.latestPrice=n.price,e.latestTimestamp=new Date(n.time).toISOString(),e}}];var nt="instruments",W={},Q=e=>({type:"store:instruments-updated",payload:e}),Ee=()=>Object.values(W),z=()=>W,yn=async e=>{if(W[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),W[t.code]=t,ot().then(()=>S(Q,{changes:[{instrument:t,op:"create"}]}))},wn=async(e,t)=>{let{code:r=""}=e;if(!W[r])return!1;let n=W[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),ot().then(()=>t&&S(Q,{changes:[{instrument:n,op:"update"}]}))},Yt=async e=>{if(!W[e])return!1;let t=W[e];return delete W[e],ot().then(()=>S(Q,{changes:[{instrument:t,op:"delete"}]}))},Jt=async()=>{W=JSON.parse(localStorage.getItem(nt)||"{}"),Object.values(W).forEach(e=>e.type||(e.type="F")),console.log({instruments:W})},ot=async()=>{localStorage.setItem(nt,JSON.stringify(W))},Qt=async e=>{localStorage.setItem(nt,JSON.stringify(e)),W=e},vn=Object.assign(window,{fetchUpdatesFreq:5}),En=()=>vn.fetchUpdatesFreq,bn=5,Gt=0,be=async(e=En())=>{clearTimeout(Gt);let t=[];for(let r of Ee())if(!r.latestUpdate||new Date(r.latestUpdate).getTime()<Date.now()-e*60*1e3){let n=rt.find(o=>o.name===r.sourceName);if(!n){console.log("Error: source not found:",r);continue}try{await n.fetchCurrentPrice(r),await wn(r,!1),t.push({instrument:r,op:"update"})}catch{}}t.length&&S(Q,{changes:t}),Gt=setTimeout(be,bn*1e3)},Zt=async e=>{let t=rt.find(n=>n.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(z()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await yn(r)};var er=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var ra=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),Tn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),Sn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var at=e=>{let t=Tn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},L=e=>Sn.format(e),Te=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,o=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(o/3600),i=Math.floor((o-s*3600)/60),c=o-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var st="wallets",U={},it=e=>({type:"store:wallet-created",payload:e}),ct=e=>({type:"store:wallet-updated",payload:e}),lt=e=>({type:"store:wallet-deleted",payload:e}),Oe=()=>Object.values(U),ie=()=>U,tr=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,pt().then(()=>S(it,{wallet:t}))},ut=async(e,t)=>{let{name:r=""}=e;return U[r]?(U[r]=e,pt().then(()=>S(ct,{wallet:e,modifiedInstrumentId:t}))):!1},rr=async e=>U[e]?(delete U[e],pt().then(()=>S(lt,{name:e}))):!1,nr=async()=>{U=JSON.parse(localStorage.getItem(st)||"{}"),console.log({wallets:U})},pt=async()=>{localStorage.setItem(st,JSON.stringify(U))},or=async e=>{localStorage.setItem(st,JSON.stringify(e)),U=e},dt=e=>{let t=z();return Te(e.reduce((r,n)=>{let o=t[n.code]?.latestUpdate||"";return r<o?r:o},new Date("2030-01-01").toISOString()))},Ae=e=>{let t=z(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,f=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:f/s.totalPrice*100-100,currentTotal:f,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),o=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:o,changeValue:L(n-o),changePercent:L(n/o*100-100),updatedAgo:dt(e.instruments)}};function In(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Mn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var ar=function(){function e(r){var n=this;this._insertTag=function(o){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(o,s),n.tags.push(o)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Mn(this));var o=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=In(o);try{i.insertRule(n,i.cssRules.length)}catch{}}else o.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var M="-ms-",Se="-moz-",g="-webkit-",Pe="comm",ce="rule",le="decl";var sr="@import";var De="@keyframes";var ir=Math.abs,re=String.fromCharCode,cr=Object.assign;function lr(e,t){return E(e,0)^45?(((t<<2^E(e,0))<<2^E(e,1))<<2^E(e,2))<<2^E(e,3):0}function We(e){return e.trim()}function mt(e,t){return(e=t.exec(e))?e[0]:e}function h(e,t,r){return e.replace(t,r)}function Ie(e,t){return e.indexOf(t)}function E(e,t){return e.charCodeAt(t)|0}function Z(e,t,r){return e.slice(t,r)}function R(e){return e.length}function ue(e){return e.length}function pe(e,t){return t.push(e),e}function ft(e,t){return e.map(t).join("")}var $e=1,de=1,ur=0,O=0,b=0,fe="";function Me(e,t,r,n,o,s,i){return{value:e,root:t,parent:r,type:n,props:o,children:s,line:$e,column:de,length:i,return:""}}function he(e,t){return cr(Me("",null,null,"",null,null,0),e,{length:-e.length},t)}function pr(){return b}function dr(){return b=O>0?E(fe,--O):0,de--,b===10&&(de=1,$e--),b}function A(){return b=O<ur?E(fe,O++):0,de++,b===10&&(de=1,$e++),b}function V(){return E(fe,O)}function ke(){return O}function ge(e,t){return Z(fe,e,t)}function me(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ue(e){return $e=de=1,ur=R(fe=e),O=0,[]}function Ve(e){return fe="",e}function xe(e){return We(ge(O-1,ht(e===91?e+2:e===40?e+1:e)))}function mr(e){for(;(b=V())&&b<33;)A();return me(e)>2||me(b)>3?"":" "}function fr(e,t){for(;--t&&A()&&!(b<48||b>102||b>57&&b<65||b>70&&b<97););return ge(e,ke()+(t<6&&V()==32&&A()==32))}function ht(e){for(;A();)switch(b){case e:return O;case 34:case 39:e!==34&&e!==39&&ht(b);break;case 40:e===41&&ht(e);break;case 92:A();break}return O}function hr(e,t){for(;A()&&e+b!==47+10;)if(e+b===42+42&&V()===47)break;return"/*"+ge(t,O-1)+"*"+re(e===47?e:A())}function gr(e){for(;!me(V());)A();return ge(e,O)}function wr(e){return Ve(_e("",null,null,null,[""],e=Ue(e),0,[0],e))}function _e(e,t,r,n,o,s,i,c,l){for(var f=0,m=0,y=i,C=0,q=0,$=0,w=1,D=1,T=1,k=0,H="",ye=o,K=s,F=n,v=H;D;)switch($=k,k=A()){case 40:if($!=108&&E(v,y-1)==58){Ie(v+=h(xe(k),"&","&\f"),"&\f")!=-1&&(T=-1);break}case 34:case 39:case 91:v+=xe(k);break;case 9:case 10:case 13:case 32:v+=mr($);break;case 92:v+=fr(ke()-1,7);continue;case 47:switch(V()){case 42:case 47:pe(kn(hr(A(),ke()),t,r),l);break;default:v+="/"}break;case 123*w:c[f++]=R(v)*T;case 125*w:case 59:case 0:switch(k){case 0:case 125:D=0;case 59+m:q>0&&R(v)-y&&pe(q>32?yr(v+";",n,r,y-1):yr(h(v," ","")+";",n,r,y-2),l);break;case 59:v+=";";default:if(pe(F=xr(v,t,r,f,m,o,c,H,ye=[],K=[],y),s),k===123)if(m===0)_e(v,t,F,F,ye,s,y,c,K);else switch(C===99&&E(v,3)===110?100:C){case 100:case 109:case 115:_e(e,F,F,n&&pe(xr(e,F,F,0,0,o,c,H,o,ye=[],y),K),o,K,y,c,n?ye:K);break;default:_e(v,F,F,F,[""],K,0,c,K)}}f=m=q=0,w=T=1,H=v="",y=i;break;case 58:y=1+R(v),q=$;default:if(w<1){if(k==123)--w;else if(k==125&&w++==0&&dr()==125)continue}switch(v+=re(k),k*w){case 38:T=m>0?1:(v+="\f",-1);break;case 44:c[f++]=(R(v)-1)*T,T=1;break;case 64:V()===45&&(v+=xe(A())),C=V(),m=y=R(H=v+=gr(ke())),k++;break;case 45:$===45&&R(v)==2&&(w=0)}}return s}function xr(e,t,r,n,o,s,i,c,l,f,m){for(var y=o-1,C=o===0?s:[""],q=ue(C),$=0,w=0,D=0;$<n;++$)for(var T=0,k=Z(e,y+1,y=ir(w=i[$])),H=e;T<q;++T)(H=We(w>0?C[T]+" "+k:h(k,/&\f/g,C[T])))&&(l[D++]=H);return Me(e,t,r,o===0?ce:c,l,f,m)}function kn(e,t,r){return Me(e,t,r,Pe,re(pr()),Z(e,2,-2),0)}function yr(e,t,r,n){return Me(e,t,r,le,Z(e,0,n),Z(e,n+1,-1),n)}function ne(e,t){for(var r="",n=ue(e),o=0;o<n;o++)r+=t(e[o],o,e,t)||"";return r}function vr(e,t,r,n){switch(e.type){case sr:case le:return e.return=e.return||e.value;case Pe:return"";case De:return e.return=e.value+"{"+ne(e.children,n)+"}";case ce:e.value=e.props.join(",")}return R(r=ne(e.children,n))?e.return=e.value+"{"+r+"}":""}function Er(e){var t=ue(e);return function(r,n,o,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,o,s)||"";return i}}function br(e){return function(t){t.root||(t=t.return)&&e(t)}}function Nn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Tr=Nn;var Cn=function(t,r,n){for(var o=0,s=0;o=s,s=V(),o===38&&s===12&&(r[n]=1),!me(s);)A();return ge(t,O)},Ln=function(t,r){var n=-1,o=44;do switch(me(o)){case 0:o===38&&V()===12&&(r[n]=1),t[n]+=Cn(O-1,r,n);break;case 2:t[n]+=xe(o);break;case 4:if(o===44){t[++n]=V()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=re(o)}while(o=A());return t},Rn=function(t,r){return Ve(Ln(Ue(t),r))},Sr=new WeakMap,On=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,o=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!Sr.get(n))&&!o){Sr.set(t,!0);for(var s=[],i=Rn(r,s),c=n.props,l=0,f=0;l<i.length;l++)for(var m=0;m<c.length;m++,f++)t.props[f]=s[l]?i[l].replace(/&\f/g,c[m]):c[m]+" "+i[l]}}},An=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function Ir(e,t){switch(lr(e,t)){case 5103:return g+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return g+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return g+e+Se+e+M+e+e;case 6828:case 4268:return g+e+M+e+e;case 6165:return g+e+M+"flex-"+e+e;case 5187:return g+e+h(e,/(\w+).+(:[^]+)/,g+"box-$1$2"+M+"flex-$1$2")+e;case 5443:return g+e+M+"flex-item-"+h(e,/flex-|-self/,"")+e;case 4675:return g+e+M+"flex-line-pack"+h(e,/align-content|flex-|-self/,"")+e;case 5548:return g+e+M+h(e,"shrink","negative")+e;case 5292:return g+e+M+h(e,"basis","preferred-size")+e;case 6060:return g+"box-"+h(e,"-grow","")+g+e+M+h(e,"grow","positive")+e;case 4554:return g+h(e,/([^-])(transform)/g,"$1"+g+"$2")+e;case 6187:return h(h(h(e,/(zoom-|grab)/,g+"$1"),/(image-set)/,g+"$1"),e,"")+e;case 5495:case 3959:return h(e,/(image-set\([^]*)/,g+"$1$`$1");case 4968:return h(h(e,/(.+:)(flex-)?(.*)/,g+"box-pack:$3"+M+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+g+e+e;case 4095:case 3583:case 4068:case 2532:return h(e,/(.+)-inline(.+)/,g+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(R(e)-1-t>6)switch(E(e,t+1)){case 109:if(E(e,t+4)!==45)break;case 102:return h(e,/(.+:)(.+)-([^]+)/,"$1"+g+"$2-$3$1"+Se+(E(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Ie(e,"stretch")?Ir(h(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(E(e,t+1)!==115)break;case 6444:switch(E(e,R(e)-3-(~Ie(e,"!important")&&10))){case 107:return h(e,":",":"+g)+e;case 101:return h(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+g+(E(e,14)===45?"inline-":"")+"box$3$1"+g+"$2$3$1"+M+"$2box$3")+e}break;case 5936:switch(E(e,t+11)){case 114:return g+e+M+h(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return g+e+M+h(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return g+e+M+h(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return g+e+M+e+e}return e}var Pn=function(t,r,n,o){if(t.length>-1&&!t.return)switch(t.type){case le:t.return=Ir(t.value,t.length);break;case De:return ne([he(t,{value:h(t.value,"@","@"+g)})],o);case ce:if(t.length)return ft(t.props,function(s){switch(mt(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return ne([he(t,{props:[h(s,/:(read-\w+)/,":"+Se+"$1")]})],o);case"::placeholder":return ne([he(t,{props:[h(s,/:(plac\w+)/,":"+g+"input-$1")]}),he(t,{props:[h(s,/:(plac\w+)/,":"+Se+"$1")]}),he(t,{props:[h(s,/:(plac\w+)/,M+"input-$1")]})],o)}return""})}},Dn=[Pn],Wn=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(w){var D=w.getAttribute("data-emotion");D.indexOf(" ")!==-1&&(document.head.appendChild(w),w.setAttribute("data-s",""))})}var o=t.stylisPlugins||Dn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(w){for(var D=w.getAttribute("data-emotion").split(" "),T=1;T<D.length;T++)s[D[T]]=!0;c.push(w)});var l,f=[On,An];{var m,y=[vr,br(function(w){m.insert(w)})],C=Er(f.concat(o,y)),q=function(D){return ne(wr(D),C)};l=function(D,T,k,H){m=k,q(D?D+"{"+T.styles+"}":T.styles),H&&($.inserted[T.name]=!0)}}var $={key:r,sheet:new ar({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return $.sheet.hydrate(c),$},Mr=Wn;function $n(e){for(var t=0,r,n=0,o=e.length;o>=4;++n,o-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var kr=$n;var Un={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Nr=Un;var Vn=/[A-Z]|^ms/g,_n=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Or=function(t){return t.charCodeAt(1)===45},Cr=function(t){return t!=null&&typeof t!="boolean"},gt=Tr(function(e){return Or(e)?e:e.replace(Vn,"-$&").toLowerCase()}),Lr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(_n,function(n,o,s){return B={name:o,styles:s,next:B},o})}return Nr[t]!==1&&!Or(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ne(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return B={name:r.name,styles:r.styles,next:B},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)B={name:n.name,styles:n.styles,next:B},n=n.next;var o=r.styles+";";return o}return Hn(e,t,r)}case"function":{if(e!==void 0){var s=B,i=r(e);return B=s,Ne(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var f=t[r];return f!==void 0?f:r}function Hn(e,t,r){var n="";if(Array.isArray(r))for(var o=0;o<r.length;o++)n+=Ne(e,t,r[o])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":Cr(i)&&(n+=gt(s)+":"+Lr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)Cr(i[c])&&(n+=gt(s)+":"+Lr(s,i[c])+";");else{var l=Ne(e,t,i);switch(s){case"animation":case"animationName":{n+=gt(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var Rr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var B,He=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var o=!0,s="";B=void 0;var i=t[0];i==null||i.raw===void 0?(o=!1,s+=Ne(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ne(n,r,t[c]),o&&(s+=i[c]);var l;Rr.lastIndex=0;for(var f="",m;(m=Rr.exec(s))!==null;)f+="-"+m[1];var y=kr(s)+f;return{name:y,styles:s,next:B}};var Fn=!0;function xt(e,t,r){var n="";return r.split(" ").forEach(function(o){e[o]!==void 0?t.push(e[o]+";"):n+=o+" "}),n}var zn=function(t,r,n){var o=t.key+"-"+r.name;(n===!1||Fn===!1)&&t.registered[o]===void 0&&(t.registered[o]=r.styles)},Ar=function(t,r,n){zn(t,r,n);var o=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+o:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function Pr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Dr(e,t,r){var n=[],o=xt(e,n,r);return n.length<2?r:o+t(n)}var Bn=function(t){var r=Mr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,f=new Array(l),m=0;m<l;m++)f[m]=arguments[m];var y=He(f,r.registered,void 0);return Ar(r,y,!1),r.key+"-"+y.name},o=function(){for(var l=arguments.length,f=new Array(l),m=0;m<l;m++)f[m]=arguments[m];var y=He(f,r.registered),C="animation-"+y.name;return Pr(r,{name:y.name,styles:"@keyframes "+C+"{"+y.styles+"}"}),C},s=function(){for(var l=arguments.length,f=new Array(l),m=0;m<l;m++)f[m]=arguments[m];var y=He(f,r.registered);Pr(r,y)},i=function(){for(var l=arguments.length,f=new Array(l),m=0;m<l;m++)f[m]=arguments[m];return Dr(r.registered,n,Xn(f))};return{css:n,cx:i,injectGlobal:s,keyframes:o,hydrate:function(l){l.forEach(function(f){r.inserted[f]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:xt.bind(null,r.registered),merge:Dr.bind(null,r.registered,n)}},Xn=function e(t){for(var r="",n=0;n<t.length;n++){var o=t[n];if(o!=null){var s=void 0;switch(typeof o){case"boolean":break;case"object":{if(Array.isArray(o))s=e(o);else{s="";for(var i in o)o[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=o}s&&(r&&(r+=" "),r+=s)}}return r},Wr=Bn;var X=Wr({key:"css"}),xs=X.flush,ys=X.hydrate,$r=X.cx,ws=X.merge,vs=X.getRegisteredStyles,Ur=X.injectGlobal,Es=X.keyframes,_=X.css,bs=X.sheet,Ts=X.cache;var qn=_`
  cursor: pointer;
`,jn=_`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,P=({children:e,...t})=>{let{class:r="",...n}={...t};n.disabled||delete n.disabled;let o=`${n.variant==="text"?jn:qn} ${r}`;return a("button",{class:o,...n,children:e})},yt=({children:e,...t})=>{let r={...t},{view:n}=t;return n&&(r.href=""+$t({searchSet:{view:n}})),a("a",{"data-to":r.href,onClick:o=>{o.preventDefault();let{href:s}=o.currentTarget;s&&s!==window.location.href&&Ut(s)},...r,children:e})};var Vr=N("view-home"),_r=j("xxx"),Hr=j("yyy"),Fr=()=>{let e=Dt(Vr.xname),t=Pt(p("div",{xname:Vr,children:["Home rendered ",a("strong",{xname:_r,children:+(_r(e)?.innerHTML||0)+1})," times.",a("br",{}),"This is a persistent input: ",Hr(e)||a("input",{xname:Hr,value:"test "}),a("p",{children:"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."}),a("p",{children:"Start with defining some instruments, then add them to a wallet."})]}));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var Fe=N("instrument-list"),zr=Y("instrument-row"),wt=N("add-instrument"),ze=N("new-instrument-source"),Kn=_`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='${ze.xname}'] {
    width: 500px;
    font-size: 0.8rem;
  }
  [data-xname='${Fe.xname}'] {
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
`;x(Q,({changes:e})=>{if(oe()==="instruments")for(let t of e){let r=zr(t.instrument.code);switch(t.op){case"create":ee(Fe(),a(vt,{instrument:t.instrument}));break;case"update":G(r,a(vt,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var Br=()=>ze().value="",Gn=x(I,Br),Yn=x(I,async()=>{wt().disabled=!0;try{await Zt(ze().value)}catch(e){alert(e)}wt().disabled=!1,Br()}),Jn=x(I,async({xid:e=""})=>{let{name:t}=z()[e]||{};!t||!confirm(`Remove instrument:  
${t} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await Yt(e)}),Qn=()=>p("div",{children:["Paste the URL of the instrument you want to track. Supported websites:",p("ul",{children:[p("li",{children:[a("a",{href:"https://live.euronext.com/en",children:"oslobors funds"})," ",p("small",{children:["( for example:"," ",a("a",{href:"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF",target:"_blank",children:"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF"})," ",")"]})]}),p("li",{children:[a("a",{href:"https://live.euronext.com/en",children:"oslobors stocks"})," ",p("small",{children:["( for example:"," ",a("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK",target:"_blank",children:"https://live.euronext.com/en/product/equities/NO0010823131-MERK"})," ",")"]})]})]})]}),Zn=()=>p("div",{children:[a("input",{xname:ze}),"  ",a(P,{xclick:Yn,xname:wt,children:"Add instrument"}),"  ",a(P,{xclick:Gn,variant:"text",children:"Clear"})]}),vt=({instrument:e})=>p("tr",{xname:zr,xid:e.code,children:[a("td",{children:p("a",{href:e.sourceUrl,target:"_blank",children:["(",e.type,") ",a("strong",{children:e.name})]})}),a("td",{class:"right",children:a("strong",{children:e.latestPrice.toFixed(2)})}),a("td",{children:e.code}),a("td",{children:e.isin}),a("td",{class:"updatedAgo","data-latest-update":e.latestUpdate,children:Te(e.latestUpdate)}),a("td",{children:new Date(e.latestTimestamp).toLocaleString()}),a("td",{children:a(P,{xclick:Jn,xid:e.code,variant:"text",children:"Delete"})})]}),Xr=()=>{let e=p("div",{class:Kn,children:[a(Qn,{}),a(Zn,{}),a("h2",{class:"title",children:"Tracked instruments"}),a("table",{xname:Fe,children:Ee().map(t=>a(vt,{instrument:t}))})]});return e.onMount=()=>{qr(),console.log("ViewInstruments mounted!")},e},qr=()=>{oe()==="instruments"&&(Fe().querySelectorAll("[data-latest-update]").forEach(e=>e.innerHTML=Te(e.dataset.latestUpdate||"")),setTimeout(qr,5e3))};var Be=N("new-wallet-name"),Et=N("wallet-list"),ae=Y("wallet-block"),bt=Y("wallet-title"),Tt=Y("wallet-total"),St=Y("wallet-instruments"),It=Y("updated-ago"),jr=j("wallet-instrument-list"),Mt=j("wallet-new-total-price"),kt=j("wallet-new-unit-price"),Nt=j("wallet-new-date"),Ct=j("wallet-new-instrument"),Ce={},eo=_`
  -label: view-wallets;

  [data-xname='${Be.xname}'] {
    width: 200px;
    font-size: 0.8rem;
  }

  [data-xname='${Et.xname}'] {
    width: 100%;
    margin-top: 10px;
  }

  [data-xname='${ae.xname}'] {
    margin-bottom: 2rem;
    [data-xname='${bt.xname}'] {
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
      [data-xname='${It.xname}'] {
        display: inline-block;
        font-size: 0.85rem;
      }
      .summary {
        font-size: 0.85rem;
        & > div {
          display: inline-block;
          margin-right: 1.5rem;
        }
        & > div:first-of-type {
          width: 85px;
        }
      }
    }
    [data-xname='${St.xname}'] {
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
      [data-xname='${Tt.xname}'] {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,Kr=()=>Be().value="",Gr=e=>{Mt(e).value="",kt(e).value="",Nt(e).value=at(new Date),Ct(e).value=""},Yr=e=>{G(Tt(e.name),a(Jr,{wd:e})),G(bt(e.name),a(Qr,{wd:e}))};x(Q,({changes:e=[]}={})=>{if(oe()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(t.length)for(let r of Oe()){let n=r.instruments.filter(i=>t.some(c=>c.instrument.code===i.code));if(!n.length)continue;let o=Ae(r),s=ae(r.name);n.forEach(i=>{let c=o.instruments.find(l=>l.id==i.id);c&&G(we(`${r.name}:${i.id}`)(s),a(Lt,{ins:c,walletName:o.name}))}),Yr(o)}});x(ct,({wallet:e,modifiedInstrumentId:t})=>{let r=Ae(e),n=ae(e.name);r.instruments.some(o=>o.id===t)?(ee(jr(n),a(Lt,{ins:r.instruments.slice(-1)[0],walletName:r.name})),Gr(n)):t&&we(`${e.name}:${t}`)(n).remove(),Yr(r)});x(it,({wallet:e})=>{Ce[e.name]=!0,Kr(),ee(Et(),a(Zr,{wallet:e}))});x(lt,({name:e})=>ae(e)?.remove());var to=x(I,({xid:e=""})=>{Ce[e]=!Ce[e],St(e).classList.toggle("expanded",Ce[e])}),ro=x(I,Kr),no=x(I,({xid:e=""})=>Gr(ae(e))),oo=x(I,async()=>{let e=Be().value.trim();e&&await tr({name:e,comment:"",instruments:[]})}),ao=x(I,async({xid:e=""})=>{ie()[e]&&confirm(`Delete wallet:  ${e} 
?`)&&await rr(e)}),so=x(I,async({xid:e=""})=>{let t=ie()[e];if(!t)return;let r=""+Date.now(),n=ae(e);t.instruments.push({id:r,code:Ct(n).value,date:Nt(n).value,totalPrice:+Mt(n).value,unitPrice:+kt(n).value}),await ut(t,r)}),io=x(I,async({xid:e=""})=>{let[t,r]=e.split(":"),n=ie()[t],o=n?.instruments.findIndex(({id:i})=>""+i===r);if(!n||o<0)return;let s=z()[n.instruments[o].code]?.name;confirm(`Delete:  ${s} 
from:     ${n.name} 
?`)&&(n.instruments.splice(o,1),await ut(n,r))}),co=x(I,async()=>{be(0)}),Jr=({wd:e})=>p("tr",{xname:Tt,xid:e.name,children:[a("td",{class:"instrument-name",children:"Total"}),a("td",{class:"price",children:e.changeValue}),a("td",{class:"percent",children:e.changePercent}),a("td",{class:"price",children:L(e.totalValue)}),a("td",{class:"price"}),a("td",{class:"price"}),a("td",{class:"price",children:L(e.totalPaid)}),a("td",{class:"price"}),a("td",{class:"price"}),a("td",{class:"actions"})]}),Qr=({wd:e})=>p("div",{xname:bt,xid:e.name,children:[a("div",{xclick:to,class:"toggle-instruments",xid:e.name}),a("div",{class:"name",children:e.name}),a("div",{xname:It,xid:e.name,children:e.updatedAgo}),a(P,{variant:"text",class:"delete-wallet",xid:e.name,xclick:ao,children:"Delete"}),p("div",{class:"summary",children:[a("div",{children:a("b",{children:e.changeValue})}),a("div",{children:p("b",{children:[e.changePercent,"%"]})}),p("div",{children:["Value ",a("b",{children:L(e.totalValue)})]}),p("div",{children:["Paid ",a("b",{children:L(e.totalPaid)})]})]})]}),Lt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return p("tr",{xid:r,children:[a("td",{class:"instrument-name",children:p("a",{href:e.instrumentUrl,target:"_blank",children:["(",e.instrumentType,") ",e.instrumentName]})}),a("td",{class:"price",children:L(e.currentTotal-e.paidTotal)}),a("td",{class:"percent",children:L(e.change)}),a("td",{class:"price",children:L(e.currentTotal)}),a("td",{class:"price",children:L(e.currentUnit)}),a("td",{class:"price",children:L(e.unitCount)}),a("td",{class:"price",children:L(e.paidTotal)}),a("td",{class:"price",children:L(e.paidUnit)}),a("td",{class:"date",children:e.paidDate}),a("td",{class:"actions",children:a(P,{xclick:io,xid:r,variant:"text",children:"Delete"})})]})},lo=({wallet:e})=>p("tr",{children:[a("td",{children:p("select",{xname:Ct,xid:e.name,class:"",children:[a("option",{value:""}),Ee().map(t=>p("option",{value:t.code,children:["(",t.type,") ",t.name]}))]})}),a("td",{}),a("td",{}),a("td",{class:"price",children:a("input",{type:"number",xname:Mt,xid:e.name,class:""})}),a("td",{}),a("td",{}),a("td",{}),a("td",{class:"price",children:a("input",{type:"number",xname:kt,xid:e.name,class:""})}),a("td",{class:"date",children:a("input",{type:"date",xname:Nt,xid:e.name,pattern:"yyyy-mm-dd",value:at(new Date),class:""})}),p("td",{class:"actions",children:[a(P,{xclick:so,xid:e.name,children:"Add"}),a(P,{xclick:no,xid:e.name,variant:"text",children:"Clear"})]})]}),Zr=({wallet:e})=>{let t=Ae(e);return p("div",{xname:ae,xid:e.name,children:[a(Qr,{wd:t}),p("table",{xname:St,xid:e.name,class:$r({expanded:Ce[e.name]}),children:[a("thead",{children:p("tr",{children:[a("th",{class:"instrument-name",children:"Instrument"}),a("th",{class:"price",children:"Change"}),a("th",{class:"percent",children:"%"}),a("th",{class:"price",children:"Total value"}),a("th",{class:"price",children:"Unit value"}),a("th",{class:"price",children:"Unit count"}),a("th",{class:"price",children:"Total price"}),a("th",{class:"price",children:"Unit price"}),a("th",{class:"date",children:"Date"}),a("th",{class:"actions"})]})}),a("tbody",{xname:jr,children:t.instruments.map(r=>a(Lt,{ins:r,walletName:t.name}))}),p("tfoot",{children:[a(Jr,{wd:t}),a(lo,{wallet:e})]})]})]})},en=()=>{let e=p("div",{class:eo,children:[p("div",{children:[a("input",{xname:Be}),"\xA0",a(P,{xclick:oo,children:"Create wallet"}),a(P,{xclick:ro,variant:"text",children:"Clear"}),"\xA0\xA0\xA0\xA0\xA0\xA0\xA0",a(P,{xclick:co,variant:"text",children:"Fetch instrument data now"})]}),a("div",{xname:Et,children:Oe().map(t=>a(Zr,{wallet:t}))})]});return e.onMount=()=>{tn(),console.log("ViewWallets mounted!")},e},tn=()=>{oe()==="wallets"&&(Oe().forEach(e=>It(e.name).innerHTML=dt(e.instruments)),setTimeout(tn,5*1e3))};var rn=N("items"),nn=N("new-todo-text"),Xe,Le,on=()=>{Le.focus();let e=Le.value.trim();e&&(Le.value="",Ft(e))},uo=er((e,t)=>{zt({done:!1,text:t,id:e})},500),po=x(I,({xid:e=""})=>Bt(e)),mo=x(I,on),fo=x(Ye,({ev:e})=>e.key==="Enter"&&on()),ho=x(Ye,({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&uo(t,r)});x(et,({todoId:e})=>we(e)(Xe).remove());x(Ze,({todo:e})=>ee(Xe,a(an,{todo:e})));var an=({todo:e})=>p("li",{xname:"todo",xid:e.id,children:[a("button",{xclick:po,xid:e.id,children:" X "}),"\xA0",a("input",{xkeyup:ho,xid:e.id,value:e.text})]}),sn=()=>{let e=p("div",{children:[a("input",{xkeyup:fo,xname:nn}),"\xA0",a("button",{xclick:mo,children:"Add"}),a("ol",{xname:rn})]});return e.onMount=async()=>{Xe=rn(),Le=nn(),Le.focus(),await Xt(),se(Xe,...Ht().map(t=>a(an,{todo:t}))),console.log("ViewTodo mounted!")},e};var go=_`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,qe,xo=x(I,()=>{let e=ie(),t=z();qe.value=JSON.stringify({instruments:t,wallets:e},null,2),qe.select()}),yo=x(I,async()=>{if(confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(qe?.value||"");console.log("IMPORTED:",{wallets:e,instruments:t}),await Qt(t),await or(e)}catch(e){alert("Failed to load data: "+e)}}),cn=()=>{let e=p("div",{class:go,children:[p("div",{children:[a(P,{xclick:xo,children:"Export from LS"})," ",a(P,{xclick:yo,children:"Import to LS"})]}),a("textarea",{xname:"buffer"})]});return e.onMount=()=>{qe=N("buffer")(),console.log("ViewMigration mounted!")},e};var je={home:{label:"Home",Component:Fr},wallets:{label:"Wallets",Component:en},instruments:{label:"Instruments",Component:Xr},todo:{label:"Todo",Component:sn},migration:{label:"Data migration",Component:cn}},oe=()=>new URLSearchParams(window.location.search).get("view")||"home",ln=()=>je[oe()]||je.home;var wo=_`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,un=()=>{let[,...e]=Object.entries(je);return p("div",{class:wo,children:[a(yt,{href:location.pathname,children:a("h1",{children:"Investment tracker"})}),a(Ke,{children:e.map(([t,r],n)=>p(Ke,{children:[n>0?" | ":"",a(yt,{view:t,children:r.label})]}))})]})};Ur`
  html, body {
    height: 100vh;
  }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    width: 1000px;
    margin: 0 auto;
    overflow-y: scroll;
  }
  .app {
    min-width: 1000px;
  }
  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
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

`;var pn=N("current-view");x(Qe,()=>{let{Component:e}=ln();se(pn(),a(e,{}))});var dn=()=>{let e=p("div",{class:"app",children:[a(un,{}),a("hr",{}),a("div",{xname:pn})]});return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Jt(),nr()]).then(()=>{be(),Wt(),G(document.getElementById("app"),a(dn,{})),Vt()});})();
