(()=>{var Ce=(e,...t)=>{e.replaceChildren(...t);for(let r of t)r.onMount?.()},H=(e,t)=>{let r=e.appendChild(t);return t.onMount?.(),r},G=(e,t)=>{let r=e?.parentElement;if(!r)return null;let n=r.replaceChild(t,e);return t.onMount?.(),n},Ee=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},k=e=>{let t=()=>Ee({xname:e});return t.xname=e,t.toString=()=>e,t},K=e=>{let t=r=>Ee({xname:e,xid:r});return t.xname=e,t.toString=()=>e,t},X=e=>{let t=r=>Ee({xname:e,el:r});return t.xname=e,t.toString=()=>e,t},xe=e=>{let t=r=>Ee({xid:e,el:r});return t.xid=e,t.toString=()=>e,t};var ln=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);for(let[a,s]of Object.entries(t||{}))a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[ln(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s);for(let a of r.flat())H(n,typeof a=="object"?a:document.createTextNode(a));return n},u=(e,...t)=>{let r=document.createDocumentFragment();for(let n of t.flat())H(r,typeof n=="object"?n:document.createTextNode(n));return r};var Nt={};var Ct=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Nt[`${t}:${r}`]=e),e},Et=(e="",t="")=>Nt[`${e}:${t}`];var ee={},un=1,h=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let n="event-"+un++;return ee[n]=ee[n]||[],ee[n].push(t),{type:n,callback:t}},b=(e,t)=>{let r=0,{type:n}=e({});for(let a of ee[n]||[])a(t),r++;return r};var ye=(e="")=>t=>({type:e,payload:t}),S=ye(),qe=ye(),Xe=e=>t=>{let r=t.target,{xclick:n,xkeyup:a,xkeydown:s}=r,{xname:i="",xid:c=""}=r.dataset,l={xname:i,xid:c,ev:t};return n&&e==="click"?b(ye(n.type),l):a&&e==="keyup"?b(ye(a.type),l):s&&e==="keydown"?b(ye(s.type),l):0},Lt=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var Rt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Ge=e=>b(Ke,{newUrl:new URL(e)}),Ke=e=>({type:"router:navigate",payload:e}),Ot=e=>{let t=""+e;window.history.pushState(null,"",t),Ge(t)},At=()=>{window.addEventListener("popstate",()=>Ge(window.location.href)),Ge(window.location.href)};var Pt="todos",Y=[],Ye=e=>({type:"store:item-created",payload:e}),dn=e=>({type:"store:item-updated",payload:e}),Je=e=>({type:"store:item-deleted",payload:e}),Dt=()=>Y,Wt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Qe().then(()=>b(Ye,{todo:t}))},$t=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Qe().then(()=>b(dn,{todo:t}))):!1},Ut=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Qe().then(()=>b(Je,{todoId:e})))},Vt=async()=>{Y=JSON.parse(localStorage.getItem(Pt)||"[]"),console.log({todos:Y})},Qe=async()=>{localStorage.setItem(Pt,JSON.stringify(Y))};var pn=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com";var _t=(e,t)=>fetch(`${pn}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Ht=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},Ft=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},Ze=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Ft(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await _t(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{Ht(e);let t=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${e.isin}-recent.json?${Date.now()}`,n=(await(await fetch(t)).json())?.data?.pop()||{time:"0",price:0};return e.latestPrice=n.price,e.latestTimestamp=new Date(n.time).toISOString(),e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("product/funds/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Ft(e))return e;let[,t,r]=e.sourceUrl.match(/funds\/([^/.]+)\.([^/.]+)/)||[],n=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}.${r}`,s=((await(await _t(n,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1];return Object.assign(e,{name:s,isin:t,code:r,type:"F"}),e},fetchCurrentPrice:async e=>{Ht(e);let t=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${e.isin}-recent.json?${Date.now()}`,n=(await(await fetch(t)).json())?.data?.pop()||{time:"0",price:0};return e.latestPrice=n.price,e.latestTimestamp=new Date(n.time).toISOString(),e}}];var et="instruments",P={},J=e=>({type:"store:instruments-updated",payload:e}),we=()=>Object.values(P),F=()=>P,mn=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,tt().then(()=>b(J,{changes:[{instrument:t,op:"create"}]}))},fn=async(e,t)=>{let{code:r=""}=e;if(!P[r])return!1;let n=P[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),tt().then(()=>t&&b(J,{changes:[{instrument:n,op:"update"}]}))},Bt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],tt().then(()=>b(J,{changes:[{instrument:t,op:"delete"}]}))},jt=async()=>{P=JSON.parse(localStorage.getItem(et)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},tt=async()=>{localStorage.setItem(et,JSON.stringify(P))},Xt=async e=>{localStorage.setItem(et,JSON.stringify(e)),P=e},hn=Object.assign(window,{fetchUpdatesFreq:5}),gn=()=>hn.fetchUpdatesFreq,xn=5,zt=0,ve=async(e=gn())=>{clearTimeout(zt);let t=[];for(let r of we())if(!r.latestUpdate||new Date(r.latestUpdate).getTime()<Date.now()-e*60*1e3){let n=Ze.find(a=>a.name===r.sourceName);if(!n){console.log("Error: source not found:",r);continue}try{await n.fetchCurrentPrice(r),await fn(r,!1),t.push({instrument:r,op:"update"})}catch{}}t.length&&b(J,{changes:t}),zt=setTimeout(ve,xn*1e3)},qt=async e=>{let t=Ze.find(n=>n.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(F()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await mn(r)};var Gt=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var Uo=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),yn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),wn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var rt=e=>{let t=yn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},N=e=>wn.format(e),be=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var nt="wallets",W={},ot=e=>({type:"store:wallet-created",payload:e}),at=e=>({type:"store:wallet-updated",payload:e}),st=e=>({type:"store:wallet-deleted",payload:e}),Le=()=>Object.values(W),oe=()=>W,Kt=async e=>{if(W[e.name])return!1;let t={...e};return W[t.name]=t,ct().then(()=>b(ot,{wallet:t}))},it=async(e,t)=>{let{name:r=""}=e;return W[r]?(W[r]=e,ct().then(()=>b(at,{wallet:e,modifiedInstrumentId:t}))):!1},Yt=async e=>W[e]?(delete W[e],ct().then(()=>b(st,{name:e}))):!1,Jt=async()=>{W=JSON.parse(localStorage.getItem(nt)||"{}"),console.log({wallets:W})},ct=async()=>{localStorage.setItem(nt,JSON.stringify(W))},Qt=async e=>{localStorage.setItem(nt,JSON.stringify(e)),W=e},lt=e=>{let t=F();return be(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Re=e=>{let t=F(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,p=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:p/s.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:a,changeValue:N(n-a),changePercent:N(n/a*100-100),updatedAgo:lt(e.instruments)}};function vn(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function bn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Zt=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(bn(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=vn(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var T="-ms-",ae="-moz-",m="-webkit-",Oe="comm",se="rule",ie="decl";var er="@import";var Ae="@keyframes";var tr=Math.abs,te=String.fromCharCode,rr=Object.assign;function nr(e,t){return(((t<<2^I(e,0))<<2^I(e,1))<<2^I(e,2))<<2^I(e,3)}function Pe(e){return e.trim()}function or(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function Se(e,t){return e.indexOf(t)}function I(e,t){return e.charCodeAt(t)|0}function Q(e,t,r){return e.slice(t,r)}function C(e){return e.length}function ce(e){return e.length}function le(e,t){return t.push(e),e}function ar(e,t){return e.map(t).join("")}var De=1,ue=1,sr=0,E=0,w=0,pe="";function Te(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:De,column:ue,length:i,return:""}}function me(e,t){return rr(Te("",null,null,"",null,null,0),e,{length:-e.length},t)}function ir(){return w}function cr(){return w=E>0?I(pe,--E):0,ue--,w===10&&(ue=1,De--),w}function L(){return w=E<sr?I(pe,E++):0,ue++,w===10&&(ue=1,De++),w}function $(){return I(pe,E)}function Ie(){return E}function fe(e,t){return Q(pe,e,t)}function de(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function We(e){return De=ue=1,sr=C(pe=e),E=0,[]}function $e(e){return pe="",e}function he(e){return Pe(fe(E-1,ut(e===91?e+2:e===40?e+1:e)))}function lr(e){for(;(w=$())&&w<33;)L();return de(e)>2||de(w)>3?"":" "}function ur(e,t){for(;--t&&L()&&!(w<48||w>102||w>57&&w<65||w>70&&w<97););return fe(e,Ie()+(t<6&&$()==32&&L()==32))}function ut(e){for(;L();)switch(w){case e:return E;case 34:case 39:e!==34&&e!==39&&ut(w);break;case 40:e===41&&ut(e);break;case 92:L();break}return E}function dr(e,t){for(;L()&&e+w!==47+10;)if(e+w===42+42&&$()===47)break;return"/*"+fe(t,E-1)+"*"+te(e===47?e:L())}function pr(e){for(;!de($());)L();return fe(e,E)}function hr(e){return $e(Ue("",null,null,null,[""],e=We(e),0,[0],e))}function Ue(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,g=i,O=0,j=0,D=0,x=1,A=1,v=1,M=0,V="",ge=a,q=s,_=n,y=V;A;)switch(D=M,M=L()){case 40:if(D!=108&&y.charCodeAt(g-1)==58){Se(y+=f(he(M),"&","&\f"),"&\f")!=-1&&(v=-1);break}case 34:case 39:case 91:y+=he(M);break;case 9:case 10:case 13:case 32:y+=lr(D);break;case 92:y+=ur(Ie()-1,7);continue;case 47:switch($()){case 42:case 47:le(Sn(dr(L(),Ie()),t,r),l);break;default:y+="/"}break;case 123*x:c[p++]=C(y)*v;case 125*x:case 59:case 0:switch(M){case 0:case 125:A=0;case 59+d:j>0&&C(y)-g&&le(j>32?fr(y+";",n,r,g-1):fr(f(y," ","")+";",n,r,g-2),l);break;case 59:y+=";";default:if(le(_=mr(y,t,r,p,d,a,c,V,ge=[],q=[],g),s),M===123)if(d===0)Ue(y,t,_,_,ge,s,g,c,q);else switch(O){case 100:case 109:case 115:Ue(e,_,_,n&&le(mr(e,_,_,0,0,a,c,V,a,ge=[],g),q),a,q,g,c,n?ge:q);break;default:Ue(y,_,_,_,[""],q,0,c,q)}}p=d=j=0,x=v=1,V=y="",g=i;break;case 58:g=1+C(y),j=D;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&cr()==125)continue}switch(y+=te(M),M*x){case 38:v=d>0?1:(y+="\f",-1);break;case 44:c[p++]=(C(y)-1)*v,v=1;break;case 64:$()===45&&(y+=he(L())),O=$(),d=g=C(V=y+=pr(Ie())),M++;break;case 45:D===45&&C(y)==2&&(x=0)}}return s}function mr(e,t,r,n,a,s,i,c,l,p,d){for(var g=a-1,O=a===0?s:[""],j=ce(O),D=0,x=0,A=0;D<n;++D)for(var v=0,M=Q(e,g+1,g=tr(x=i[D])),V=e;v<j;++v)(V=Pe(x>0?O[v]+" "+M:f(M,/&\f/g,O[v])))&&(l[A++]=V);return Te(e,t,r,a===0?se:c,l,p,d)}function Sn(e,t,r){return Te(e,t,r,Oe,te(ir()),Q(e,2,-2),0)}function fr(e,t,r,n){return Te(e,t,r,ie,Q(e,0,n),Q(e,n+1,-1),n)}function dt(e,t){switch(nr(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ae+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(C(e)-1-t>6)switch(I(e,t+1)){case 109:if(I(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ae+(I(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Se(e,"stretch")?dt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(I(e,t+1)!==115)break;case 6444:switch(I(e,C(e)-3-(~Se(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(I(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(I(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function Z(e,t){for(var r="",n=ce(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function gr(e,t,r,n){switch(e.type){case er:case ie:return e.return=e.return||e.value;case Oe:return"";case Ae:return e.return=e.value+"{"+Z(e.children,n)+"}";case se:e.value=e.props.join(",")}return C(r=Z(e.children,n))?e.return=e.value+"{"+r+"}":""}function xr(e){var t=ce(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function yr(e){return function(t){t.root||(t=t.return)&&e(t)}}function wr(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ie:e.return=dt(e.value,e.length);break;case Ae:return Z([me(e,{value:f(e.value,"@","@"+m)})],n);case se:if(e.length)return ar(e.props,function(a){switch(or(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Z([me(e,{props:[f(a,/:(read-\w+)/,":"+ae+"$1")]})],n);case"::placeholder":return Z([me(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),me(e,{props:[f(a,/:(plac\w+)/,":"+ae+"$1")]}),me(e,{props:[f(a,/:(plac\w+)/,T+"input-$1")]})],n)}return""})}}function Tn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var vr=Tn;var In=function(t,r,n){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[n]=1),!de(s);)L();return fe(t,E)},Mn=function(t,r){var n=-1,a=44;do switch(de(a)){case 0:a===38&&$()===12&&(r[n]=1),t[n]+=In(E-1,r,n);break;case 2:t[n]+=he(a);break;case 4:if(a===44){t[++n]=$()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=te(a)}while(a=L());return t},kn=function(t,r){return $e(Mn(We(t),r))},br=new WeakMap,Nn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!br.get(n))&&!a){br.set(t,!0);for(var s=[],i=kn(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},Cn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var En=[wr],Ln=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var A=x.getAttribute("data-emotion");A.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||En,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var A=x.getAttribute("data-emotion").split(" "),v=1;v<A.length;v++)s[A[v]]=!0;c.push(x)});var l,p=[Nn,Cn];{var d,g=[gr,yr(function(x){d.insert(x)})],O=xr(p.concat(a,g)),j=function(A){return Z(hr(A),O)};l=function(A,v,M,V){d=M,j(A?A+"{"+v.styles+"}":v.styles),V&&(D.inserted[v.name]=!0)}}var D={key:r,sheet:new Zt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},Sr=Ln;function Rn(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Tr=Rn;var On={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Ir=On;var An=/[A-Z]|^ms/g,Pn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Cr=function(t){return t.charCodeAt(1)===45},Mr=function(t){return t!=null&&typeof t!="boolean"},pt=vr(function(e){return Cr(e)?e:e.replace(An,"-$&").toLowerCase()}),kr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Pn,function(n,a,s){return z={name:a,styles:s,next:z},a})}return Ir[t]!==1&&!Cr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Me(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)z={name:n.name,styles:n.styles,next:z},n=n.next;var a=r.styles+";";return a}return Dn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Me(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function Dn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Me(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":Mr(i)&&(n+=pt(s)+":"+kr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)Mr(i[c])&&(n+=pt(s)+":"+kr(s,i[c])+";");else{var l=Me(e,t,i);switch(s){case"animation":case"animationName":{n+=pt(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var Nr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,Ve=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Me(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Me(n,r,t[c]),a&&(s+=i[c]);var l;Nr.lastIndex=0;for(var p="",d;(d=Nr.exec(s))!==null;)p+="-"+d[1];var g=Tr(s)+p;return{name:g,styles:s,next:z}};var Wn=!0;function mt(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var $n=function(t,r,n){var a=t.key+"-"+r.name;(n===!1||Wn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles)},Er=function(t,r,n){$n(t,r,n);var a=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function Lr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Rr(e,t,r){var n=[],a=mt(e,n,r);return n.length<2?r:a+t(n)}var Un=function(t){var r=Sr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered,void 0);return Er(r,g,!1),r.key+"-"+g.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered),O="animation-"+g.name;return Lr(r,{name:g.name,styles:"@keyframes "+O+"{"+g.styles+"}"}),O},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered);Lr(r,g)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return Rr(r.registered,n,Vn(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:mt.bind(null,r.registered),merge:Rr.bind(null,r.registered,n)}},Vn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},Or=Un;var B=Or({key:"css"}),Fa=B.flush,za=B.hydrate,Ar=B.cx,Ba=B.merge,ja=B.getRegisteredStyles,Pr=B.injectGlobal,Xa=B.keyframes,U=B.css,qa=B.sheet,Ga=B.cache;var _n=U`
  cursor: pointer;
`,Hn=U`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,R=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?Hn:_n} ${r}`;return o("button",{class:a,...n},t)},ft=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+Rt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&Ot(s)},...r},t)};var Dr=k("view-home"),Wr=X("xxx"),$r=X("yyy"),Ur=()=>{let e=Et(Dr.xname),t=Ct(o("div",{xname:Dr},"Home rendered ",o("strong",{xname:Wr},+(Wr(e)?.innerHTML||0)+1)," times.",o("br",null),"This is a persistent input: ",$r(e)||o("input",{xname:$r,value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=k("instrument-list"),Vr=K("instrument-row"),ht=k("add-instrument"),He=k("new-instrument-source"),Fn=U`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='${He.xname}'] {
    width: 500px;
    font-size: 0.8rem;
  }
  [data-xname='${_e.xname}'] {
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
`;h(J,({changes:e})=>{if(re()==="instruments")for(let t of e){let r=Vr(t.instrument.code);switch(t.op){case"create":H(_e(),o(gt,{instrument:t.instrument}));break;case"update":G(r,o(gt,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var _r=()=>He().value="",zn=h(S,_r),Bn=h(S,async()=>{ht().disabled=!0;try{await qt(He().value)}catch(e){alert(e)}ht().disabled=!1,_r()}),jn=h(S,async({xid:e=""})=>{let{name:t}=F()[e]||{};!t||!confirm(`Remove instrument:  
${t} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await Bt(e)}),Xn=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF",target:"_blank"},"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK")," ",")")))),qn=()=>o("div",null,o("input",{xname:He}),"  ",o(R,{xclick:Bn,xname:ht},"Add instrument"),"  ",o(R,{xclick:zn,variant:"text"},"Clear")),gt=({instrument:e})=>o("tr",{xname:Vr,xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},be(e.latestUpdate)),o("td",null,new Date(e.latestTimestamp).toLocaleString()),o("td",null,o(R,{xclick:jn,xid:e.code,variant:"text"},"Delete"))),Hr=()=>{let e=o("div",{class:Fn},o(Xn,null),o(qn,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:_e},we().map(t=>o(gt,{instrument:t}))));return e.onMount=()=>{Fr(),console.log("ViewInstruments mounted!")},e},Fr=()=>{re()==="instruments"&&(_e().querySelectorAll("[data-latest-update]").forEach(e=>e.innerHTML=be(e.dataset.latestUpdate||"")),setTimeout(Fr,5e3))};var Fe=k("new-wallet-name"),xt=k("wallet-list"),ne=K("wallet-block"),yt=K("wallet-title"),wt=K("wallet-total"),vt=K("wallet-instruments"),bt=K("updated-ago"),zr=X("wallet-instrument-list"),St=X("wallet-new-total-price"),Tt=X("wallet-new-unit-price"),It=X("wallet-new-date"),Mt=X("wallet-new-instrument"),ke={},Gn=U`
  -label: view-wallets;

  [data-xname='${Fe.xname}'] {
    width: 200px;
    font-size: 0.8rem;
  }

  [data-xname='${xt.xname}'] {
    width: 100%;
    margin-top: 10px;
  }

  [data-xname='${ne.xname}'] {
    margin-bottom: 2rem;
    [data-xname='${yt.xname}'] {
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
      [data-xname='${bt.xname}'] {
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
    [data-xname='${vt.xname}'] {
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
      [data-xname='${wt.xname}'] {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,Br=()=>Fe().value="",jr=e=>{St(e).value="",Tt(e).value="",It(e).value=rt(new Date),Mt(e).value=""},Xr=e=>{G(wt(e.name),o(qr,{wd:e})),G(yt(e.name),o(Gr,{wd:e}))};h(J,({changes:e=[]}={})=>{if(re()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of Le()){let n=r.instruments.filter(i=>t.some(c=>c.instrument.code===i.code));if(!n.length)continue;let a=Re(r),s=ne(r.name);n.forEach(i=>{let c=a.instruments.find(l=>l.id==i.id);c&&G(xe(`${r.name}:${i.id}`)(s),o(kt,{ins:c,walletName:a.name}))}),Xr(a)}});h(at,({wallet:e,modifiedInstrumentId:t})=>{let r=Re(e),n=ne(e.name);r.instruments.some(a=>a.id===t)?(H(zr(n),o(kt,{ins:r.instruments.slice(-1)[0],walletName:r.name})),jr(n)):t&&xe(`${e.name}:${t}`)(n).remove(),Xr(r)});h(ot,({wallet:e})=>{ke[e.name]=!0,Br(),H(xt(),o(Kr,{wallet:e}))});h(st,({name:e})=>ne(e)?.remove());var Kn=h(S,({xid:e=""})=>{ke[e]=!ke[e],vt(e).classList.toggle("expanded",ke[e])}),Yn=h(S,Br),Jn=h(S,({xid:e=""})=>jr(ne(e))),Qn=h(S,async()=>{let e=Fe().value.trim();!e||await Kt({name:e,comment:"",instruments:[]})}),Zn=h(S,async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet:  ${e} 
?`)||await Yt(e)}),eo=h(S,async({xid:e=""})=>{let t=oe()[e];if(!t)return;let r=""+Date.now(),n=ne(e);t.instruments.push({id:r,code:Mt(n).value,date:It(n).value,totalPrice:+St(n).value,unitPrice:+Tt(n).value}),await it(t,r)}),to=h(S,async({xid:e=""})=>{let[t,r]=e.split(":"),n=oe()[t],a=n?.instruments.findIndex(({id:i})=>""+i===r);if(!n||a<0)return;let s=F()[n.instruments[a].code]?.name;!confirm(`Delete:  ${s} 
from:     ${n.name} 
?`)||(n.instruments.splice(a,1),await it(n,r))}),ro=h(S,async()=>{ve(0)}),qr=({wd:e})=>o("tr",{xname:wt,xid:e.name},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},N(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},N(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),Gr=({wd:e})=>o("div",{xname:yt,xid:e.name},o("div",{xclick:Kn,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:bt,xid:e.name},e.updatedAgo),o(R,{variant:"text",class:"delete-wallet",xid:e.name,xclick:Zn},"Delete"),o("div",{class:"summary"},o("div",null,o("b",null,e.changeValue)),o("div",null,o("b",null,e.changePercent,"%")),o("div",null,"Value ",o("b",null,N(e.totalValue))),o("div",null,"Paid ",o("b",null,N(e.totalPaid))))),kt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return o("tr",{xid:r},o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},N(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},N(e.change)),o("td",{class:"price"},N(e.currentTotal)),o("td",{class:"price"},N(e.currentUnit)),o("td",{class:"price"},N(e.unitCount)),o("td",{class:"price"},N(e.paidTotal)),o("td",{class:"price"},N(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(R,{xclick:to,xid:r,variant:"text"},"Delete")))},no=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:Mt,xid:e.name,class:""},o("option",{value:""}),we().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:St,xid:e.name,class:""})),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:Tt,xid:e.name,class:""})),o("td",{class:"date"},o("input",{type:"date",xname:It,xid:e.name,pattern:"yyyy-mm-dd",value:rt(new Date),class:""})),o("td",{class:"actions"},o(R,{xclick:eo,xid:e.name},"Add"),o(R,{xclick:Jn,xid:e.name,variant:"text"},"Clear"))),Kr=({wallet:e})=>{let t=Re(e);return o("div",{xname:ne,xid:e.name},o(Gr,{wd:t}),o("table",{xname:vt,xid:e.name,class:Ar({expanded:ke[e.name]})},o("thead",null,o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"}))),o("tbody",{xname:zr},t.instruments.map(r=>o(kt,{ins:r,walletName:t.name}))),o("tfoot",null,o(qr,{wd:t}),o(no,{wallet:e}))))},Yr=()=>{let e=o("div",{class:Gn},o("div",null,o("input",{xname:Fe}),"\xA0",o(R,{xclick:Qn},"Create wallet"),o(R,{xclick:Yn,variant:"text"},"Clear"),"\xA0\xA0\xA0\xA0\xA0\xA0\xA0",o(R,{xclick:ro,variant:"text"},"Fetch instrument data now")),o("div",{xname:xt},Le().map(t=>o(Kr,{wallet:t}))));return e.onMount=()=>{Jr(),console.log("ViewWallets mounted!")},e},Jr=()=>{re()==="wallets"&&(Le().forEach(e=>bt(e.name).innerHTML=lt(e.instruments)),setTimeout(Jr,5*1e3))};var Qr=k("items"),Zr=k("new-todo-text"),ze,Ne,en=()=>{Ne.focus();let e=Ne.value.trim();!e||(Ne.value="",Wt(e))},oo=Gt((e,t)=>{$t({done:!1,text:t,id:e})},500),ao=h(S,({xid:e=""})=>Ut(e)),so=h(S,en),io=h(qe,({ev:e})=>e.key==="Enter"&&en()),co=h(qe,({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&oo(t,r)});h(Je,({todoId:e})=>xe(e)(ze).remove());h(Ye,({todo:e})=>H(ze,o(tn,{todo:e})));var tn=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:ao,xid:e.id}," X "),"\xA0",o("input",{xkeyup:co,xid:e.id,value:e.text})),rn=()=>{let e=o("div",null,o("input",{xkeyup:io,xname:Zr}),"\xA0",o("button",{xclick:so},"Add"),o("ol",{xname:Qr}));return e.onMount=async()=>{ze=Qr(),Ne=Zr(),Ne.focus(),await Vt(),Ce(ze,...Dt().map(t=>o(tn,{todo:t}))),console.log("ViewTodo mounted!")},e};var lo=U`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,Be,uo=h(S,()=>{let e=oe(),t=F();Be.value=JSON.stringify({instruments:t,wallets:e},null,2),Be.select()}),po=h(S,async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Be?.value||"");console.log("IMPORTED:",{wallets:e,instruments:t}),await Xt(t),await Qt(e)}catch(e){alert("Failed to load data: "+e)}}),nn=()=>{let e=o("div",{class:lo},o("div",null,o(R,{xclick:uo},"Export from LS")," ",o(R,{xclick:po},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{Be=k("buffer")(),console.log("ViewMigration mounted!")},e};var je={home:{label:"Home",Component:Ur},wallets:{label:"Wallets",Component:Yr},instruments:{label:"Instruments",Component:Hr},todo:{label:"Todo",Component:rn},migration:{label:"Data migration",Component:nn}},re=()=>new URLSearchParams(window.location.search).get("view")||"home",on=()=>je[re()]||je.home;var mo=U`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,an=()=>{let[,...e]=Object.entries(je);return o("div",{class:mo},o(ft,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(ft,{view:t},r.label))))};Pr`
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

`;var sn=k("current-view");h(Ke,()=>{let{Component:e}=on();Ce(sn(),o(e,null))});var cn=()=>{let e=o("div",{class:"app"},o(an,null),o("hr",null),o("div",{xname:sn}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([jt(),Jt()]).then(()=>{ve(),Lt(),G(document.getElementById("app"),o(cn,null)),At()});})();
