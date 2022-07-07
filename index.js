(()=>{var Ce=(e,...t)=>{e.replaceChildren(...t);for(let r of t)r.onMount?.()},H=(e,t)=>{let r=e.appendChild(t);return t.onMount?.(),r},G=(e,t)=>{let r=e?.parentElement;if(!r)return null;let o=r.replaceChild(t,e);return t.onMount?.(),o},Ee=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},k=e=>{let t=()=>Ee({xname:e});return t.xname=e,t.toString=()=>e,t},K=e=>{let t=r=>Ee({xname:e,xid:r});return t.xname=e,t.toString=()=>e,t},X=e=>{let t=r=>Ee({xname:e,el:r});return t.xname=e,t.toString=()=>e,t},xe=e=>{let t=r=>Ee({xid:e,el:r});return t.xid=e,t.toString=()=>e,t};var un=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);for(let[a,s]of Object.entries(t||{}))a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[un(a.substring(5))]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&o.setAttribute(a,""+s),o[a]=s);for(let a of r.flat())H(o,typeof a=="object"?a:document.createTextNode(a));return o},u=(e,...t)=>{let r=document.createDocumentFragment();for(let o of t.flat())H(r,typeof o=="object"?o:document.createTextNode(o));return r};var Ct={};var Et=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Ct[`${t}:${r}`]=e),e},Lt=(e="",t="")=>Ct[`${e}:${t}`];var ee={},dn=1,h=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let o="event-"+dn++;return ee[o]=ee[o]||[],ee[o].push(t),{type:o,callback:t}},b=(e,t)=>{let r=0,{type:o}=e({});for(let a of ee[o]||[])a(t),r++;return r};var ye=(e="")=>t=>({type:e,payload:t}),S=ye(),qe=ye(),Xe=e=>t=>{let r=t.target,{xclick:o,xkeyup:a,xkeydown:s}=r,{xname:i="",xid:c=""}=r.dataset,l={xname:i,xid:c,ev:t};return o&&e==="click"?b(ye(o.type),l):a&&e==="keyup"?b(ye(a.type),l):s&&e==="keydown"?b(ye(s.type),l):0},Rt=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var Ot=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Ge=e=>b(Ke,{newUrl:new URL(e)}),Ke=e=>({type:"router:navigate",payload:e}),At=e=>{let t=""+e;window.history.pushState(null,"",t),Ge(t)},Pt=()=>{window.addEventListener("popstate",()=>Ge(window.location.href)),Ge(window.location.href)};var Dt="todos",Y=[],Ye=e=>({type:"store:item-created",payload:e}),pn=e=>({type:"store:item-updated",payload:e}),Je=e=>({type:"store:item-deleted",payload:e}),Wt=()=>Y,$t=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Qe().then(()=>b(Ye,{todo:t}))},Ut=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Qe().then(()=>b(pn,{todo:t}))):!1},Vt=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Qe().then(()=>b(Je,{todoId:e})))},_t=async()=>{Y=JSON.parse(localStorage.getItem(Dt)||"[]"),console.log({todos:Y})},Qe=async()=>{localStorage.setItem(Dt,JSON.stringify(Y))};var zt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",mn=e=>fetch(`${zt}?target=${e}`),Ze=(e,t)=>fetch(`${zt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Ht=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},Ft=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},et=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Ft(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ze(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{Ht(e);let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ze(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("product/funds/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!Ft(e))return e;let[,t,r]=e.sourceUrl.match(/funds\/([^/.]+)\.([^/.]+)/)||[],o=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}.${r}`,s=((await(await Ze(o,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1];return Object.assign(e,{name:s,isin:t,code:r,type:"F"}),e},fetchCurrentPrice:async e=>{Ht(e);let t=`https://live.euronext.com/intraday_chart/getChartData/${e.isin}.${e.code}/1M`,r=await(await mn(t)).json();return e.latestPrice=+r.pop().price.toFixed(2),e}}];var tt="instruments",P={},J=e=>({type:"store:instruments-updated",payload:e}),ve=()=>Object.values(P),F=()=>P,fn=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,rt().then(()=>b(J,{changes:[{instrument:t,op:"create"}]}))},hn=async(e,t)=>{let{code:r=""}=e;if(!P[r])return!1;let o=P[r];return Object.assign(o,e),o.latestUpdate=new Date().toISOString(),rt().then(()=>t&&b(J,{changes:[{instrument:o,op:"update"}]}))},jt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],rt().then(()=>b(J,{changes:[{instrument:t,op:"delete"}]}))},Xt=async()=>{P=JSON.parse(localStorage.getItem(tt)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},rt=async()=>{localStorage.setItem(tt,JSON.stringify(P))},qt=async e=>{localStorage.setItem(tt,JSON.stringify(e)),P=e},gn=Object.assign(window,{fetchUpdatesFreq:5}),xn=()=>gn.fetchUpdatesFreq,yn=5,Bt=0,we=async(e=xn())=>{clearTimeout(Bt);let t=[];for(let r of ve())if(!r.latestUpdate||new Date(r.latestUpdate).getTime()<Date.now()-e*60*1e3){let o=et.find(a=>a.name===r.sourceName);if(!o){console.log("Error: source not found:",r);continue}try{await o.fetchCurrentPrice(r),await hn(r,!1),t.push({instrument:r,op:"update"})}catch{}}t.length&&b(J,{changes:t}),Bt=setTimeout(we,yn*1e3)},Gt=async e=>{let t=et.find(o=>o.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(F()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await fn(r)};var Kt=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var Vo=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),vn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),wn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var nt=e=>{let t=vn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},N=e=>wn.format(e),be=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,o=typeof t=="string"?new Date(t):t,a=Math.floor((o.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var ot="wallets",W={},at=e=>({type:"store:wallet-created",payload:e}),st=e=>({type:"store:wallet-updated",payload:e}),it=e=>({type:"store:wallet-deleted",payload:e}),Le=()=>Object.values(W),oe=()=>W,Yt=async e=>{if(W[e.name])return!1;let t={...e};return W[t.name]=t,lt().then(()=>b(at,{wallet:t}))},ct=async(e,t)=>{let{name:r=""}=e;return W[r]?(W[r]=e,lt().then(()=>b(st,{wallet:e,modifiedInstrumentId:t}))):!1},Jt=async e=>W[e]?(delete W[e],lt().then(()=>b(it,{name:e}))):!1,Qt=async()=>{W=JSON.parse(localStorage.getItem(ot)||"{}"),console.log({wallets:W})},lt=async()=>{localStorage.setItem(ot,JSON.stringify(W))},Zt=async e=>{localStorage.setItem(ot,JSON.stringify(e)),W=e},ut=e=>{let t=F();return be(e.reduce((r,o)=>{let a=t[o.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Re=e=>{let t=F(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,p=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:p/s.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),o=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:o,totalPaid:a,changeValue:N(o-a),changePercent:N(o/a*100-100),updatedAgo:ut(e.instruments)}};function bn(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Sn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var er=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Sn(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=bn(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var T="-ms-",ae="-moz-",m="-webkit-",Oe="comm",se="rule",ie="decl";var tr="@import";var Ae="@keyframes";var rr=Math.abs,te=String.fromCharCode,nr=Object.assign;function or(e,t){return(((t<<2^I(e,0))<<2^I(e,1))<<2^I(e,2))<<2^I(e,3)}function Pe(e){return e.trim()}function ar(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function Se(e,t){return e.indexOf(t)}function I(e,t){return e.charCodeAt(t)|0}function Q(e,t,r){return e.slice(t,r)}function C(e){return e.length}function ce(e){return e.length}function le(e,t){return t.push(e),e}function sr(e,t){return e.map(t).join("")}var De=1,ue=1,ir=0,E=0,v=0,pe="";function Te(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:De,column:ue,length:i,return:""}}function me(e,t){return nr(Te("",null,null,"",null,null,0),e,{length:-e.length},t)}function cr(){return v}function lr(){return v=E>0?I(pe,--E):0,ue--,v===10&&(ue=1,De--),v}function L(){return v=E<ir?I(pe,E++):0,ue++,v===10&&(ue=1,De++),v}function $(){return I(pe,E)}function Ie(){return E}function fe(e,t){return Q(pe,e,t)}function de(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function We(e){return De=ue=1,ir=C(pe=e),E=0,[]}function $e(e){return pe="",e}function he(e){return Pe(fe(E-1,dt(e===91?e+2:e===40?e+1:e)))}function ur(e){for(;(v=$())&&v<33;)L();return de(e)>2||de(v)>3?"":" "}function dr(e,t){for(;--t&&L()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return fe(e,Ie()+(t<6&&$()==32&&L()==32))}function dt(e){for(;L();)switch(v){case e:return E;case 34:case 39:e!==34&&e!==39&&dt(v);break;case 40:e===41&&dt(e);break;case 92:L();break}return E}function pr(e,t){for(;L()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+fe(t,E-1)+"*"+te(e===47?e:L())}function mr(e){for(;!de($());)L();return fe(e,E)}function gr(e){return $e(Ue("",null,null,null,[""],e=We(e),0,[0],e))}function Ue(e,t,r,o,a,s,i,c,l){for(var p=0,d=0,g=i,O=0,j=0,D=0,x=1,A=1,w=1,M=0,V="",ge=a,q=s,_=o,y=V;A;)switch(D=M,M=L()){case 40:if(D!=108&&y.charCodeAt(g-1)==58){Se(y+=f(he(M),"&","&\f"),"&\f")!=-1&&(w=-1);break}case 34:case 39:case 91:y+=he(M);break;case 9:case 10:case 13:case 32:y+=ur(D);break;case 92:y+=dr(Ie()-1,7);continue;case 47:switch($()){case 42:case 47:le(Tn(pr(L(),Ie()),t,r),l);break;default:y+="/"}break;case 123*x:c[p++]=C(y)*w;case 125*x:case 59:case 0:switch(M){case 0:case 125:A=0;case 59+d:j>0&&C(y)-g&&le(j>32?hr(y+";",o,r,g-1):hr(f(y," ","")+";",o,r,g-2),l);break;case 59:y+=";";default:if(le(_=fr(y,t,r,p,d,a,c,V,ge=[],q=[],g),s),M===123)if(d===0)Ue(y,t,_,_,ge,s,g,c,q);else switch(O){case 100:case 109:case 115:Ue(e,_,_,o&&le(fr(e,_,_,0,0,a,c,V,a,ge=[],g),q),a,q,g,c,o?ge:q);break;default:Ue(y,_,_,_,[""],q,0,c,q)}}p=d=j=0,x=w=1,V=y="",g=i;break;case 58:g=1+C(y),j=D;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&lr()==125)continue}switch(y+=te(M),M*x){case 38:w=d>0?1:(y+="\f",-1);break;case 44:c[p++]=(C(y)-1)*w,w=1;break;case 64:$()===45&&(y+=he(L())),O=$(),d=g=C(V=y+=mr(Ie())),M++;break;case 45:D===45&&C(y)==2&&(x=0)}}return s}function fr(e,t,r,o,a,s,i,c,l,p,d){for(var g=a-1,O=a===0?s:[""],j=ce(O),D=0,x=0,A=0;D<o;++D)for(var w=0,M=Q(e,g+1,g=rr(x=i[D])),V=e;w<j;++w)(V=Pe(x>0?O[w]+" "+M:f(M,/&\f/g,O[w])))&&(l[A++]=V);return Te(e,t,r,a===0?se:c,l,p,d)}function Tn(e,t,r){return Te(e,t,r,Oe,te(cr()),Q(e,2,-2),0)}function hr(e,t,r,o){return Te(e,t,r,ie,Q(e,0,o),Q(e,o+1,-1),o)}function pt(e,t){switch(or(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ae+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(C(e)-1-t>6)switch(I(e,t+1)){case 109:if(I(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ae+(I(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Se(e,"stretch")?pt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(I(e,t+1)!==115)break;case 6444:switch(I(e,C(e)-3-(~Se(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(I(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(I(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function Z(e,t){for(var r="",o=ce(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function xr(e,t,r,o){switch(e.type){case tr:case ie:return e.return=e.return||e.value;case Oe:return"";case Ae:return e.return=e.value+"{"+Z(e.children,o)+"}";case se:e.value=e.props.join(",")}return C(r=Z(e.children,o))?e.return=e.value+"{"+r+"}":""}function yr(e){var t=ce(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function vr(e){return function(t){t.root||(t=t.return)&&e(t)}}function wr(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case ie:e.return=pt(e.value,e.length);break;case Ae:return Z([me(e,{value:f(e.value,"@","@"+m)})],o);case se:if(e.length)return sr(e.props,function(a){switch(ar(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Z([me(e,{props:[f(a,/:(read-\w+)/,":"+ae+"$1")]})],o);case"::placeholder":return Z([me(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),me(e,{props:[f(a,/:(plac\w+)/,":"+ae+"$1")]}),me(e,{props:[f(a,/:(plac\w+)/,T+"input-$1")]})],o)}return""})}}function In(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var br=In;var Mn=function(t,r,o){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[o]=1),!de(s);)L();return fe(t,E)},kn=function(t,r){var o=-1,a=44;do switch(de(a)){case 0:a===38&&$()===12&&(r[o]=1),t[o]+=Mn(E-1,r,o);break;case 2:t[o]+=he(a);break;case 4:if(a===44){t[++o]=$()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=te(a)}while(a=L());return t},Nn=function(t,r){return $e(kn(We(t),r))},Sr=new WeakMap,Cn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!Sr.get(o))&&!a){Sr.set(t,!0);for(var s=[],i=Nn(r,s),c=o.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},En=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var Ln=[wr],Rn=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(x){var A=x.getAttribute("data-emotion");A.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||Ln,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var A=x.getAttribute("data-emotion").split(" "),w=1;w<A.length;w++)s[A[w]]=!0;c.push(x)});var l,p=[Cn,En];{var d,g=[xr,vr(function(x){d.insert(x)})],O=yr(p.concat(a,g)),j=function(A){return Z(gr(A),O)};l=function(A,w,M,V){d=M,j(A?A+"{"+w.styles+"}":w.styles),V&&(D.inserted[w.name]=!0)}}var D={key:r,sheet:new er({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},Tr=Rn;function On(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Ir=On;var An={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Mr=An;var Pn=/[A-Z]|^ms/g,Dn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Er=function(t){return t.charCodeAt(1)===45},kr=function(t){return t!=null&&typeof t!="boolean"},mt=br(function(e){return Er(e)?e:e.replace(Pn,"-$&").toLowerCase()}),Nr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Dn,function(o,a,s){return z={name:a,styles:s,next:z},a})}return Mr[t]!==1&&!Er(t)&&typeof r=="number"&&r!==0?r+"px":r};function Me(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)z={name:o.name,styles:o.styles,next:z},o=o.next;var a=r.styles+";";return a}return Wn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Me(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function Wn(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=Me(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":kr(i)&&(o+=mt(s)+":"+Nr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)kr(i[c])&&(o+=mt(s)+":"+Nr(s,i[c])+";");else{var l=Me(e,t,i);switch(s){case"animation":case"animationName":{o+=mt(s)+":"+l+";";break}default:o+=s+"{"+l+"}"}}}return o}var Cr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,Ve=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Me(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Me(o,r,t[c]),a&&(s+=i[c]);var l;Cr.lastIndex=0;for(var p="",d;(d=Cr.exec(s))!==null;)p+="-"+d[1];var g=Ir(s)+p;return{name:g,styles:s,next:z}};var $n=!0;function ft(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var Un=function(t,r,o){var a=t.key+"-"+r.name;(o===!1||$n===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles)},Lr=function(t,r,o){Un(t,r,o);var a=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function Rr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Or(e,t,r){var o=[],a=ft(e,o,r);return o.length<2?r:a+t(o)}var Vn=function(t){var r=Tr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered,void 0);return Lr(r,g,!1),r.key+"-"+g.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered),O="animation-"+g.name;return Rr(r,{name:g.name,styles:"@keyframes "+O+"{"+g.styles+"}"}),O},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ve(p,r.registered);Rr(r,g)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return Or(r.registered,o,_n(p))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ft.bind(null,r.registered),merge:Or.bind(null,r.registered,o)}},_n=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},Ar=Vn;var B=Ar({key:"css"}),za=B.flush,Ba=B.hydrate,Pr=B.cx,ja=B.merge,Xa=B.getRegisteredStyles,Dr=B.injectGlobal,qa=B.keyframes,U=B.css,Ga=B.sheet,Ka=B.cache;var Hn=U`
  cursor: pointer;
`,Fn=U`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,R=(e,...t)=>{let{class:r="",...o}={...e};o.disabled||delete o.disabled;let a=`${o.variant==="text"?Fn:Hn} ${r}`;return n("button",{class:a,...o},t)},ht=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+Ot({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&At(s)},...r},t)};var Wr=k("view-home"),$r=X("xxx"),Ur=X("yyy"),Vr=()=>{let e=Lt(Wr.xname),t=Et(n("div",{xname:Wr},"Home rendered ",n("strong",{xname:$r},+($r(e)?.innerHTML||0)+1)," times.",n("br",null),"This is a persistent input: ",Ur(e)||n("input",{xname:Ur,value:"test "}),n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=k("instrument-list"),_r=K("instrument-row"),gt=k("add-instrument"),He=k("new-instrument-source"),zn=U`
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
`;h(J,({changes:e})=>{if(re()==="instruments")for(let t of e){let r=_r(t.instrument.code);switch(t.op){case"create":H(_e(),n(xt,{instrument:t.instrument}));break;case"update":G(r,n(xt,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var Hr=()=>He().value="",Bn=h(S,Hr),jn=h(S,async()=>{gt().disabled=!0;try{await Gt(He().value)}catch(e){alert(e)}gt().disabled=!1,Hr()}),Xn=h(S,async({xid:e=""})=>{let{name:t}=F()[e]||{};!t||!confirm(`Remove instrument:  
${t} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await jt(e)}),qn=()=>n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF",target:"_blank"},"https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK")," ",")")))),Gn=()=>n("div",null,n("input",{xname:He}),"  ",n(R,{xclick:jn,xname:gt},"Add instrument"),"  ",n(R,{xclick:Bn,variant:"text"},"Clear")),xt=({instrument:e})=>n("tr",{xname:_r,xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",null,e.isin),n("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},be(e.latestUpdate)),n("td",null,n(R,{xclick:Xn,xid:e.code,variant:"text"},"Delete"))),Fr=()=>{let e=n("div",{class:zn},n(qn,null),n(Gn,null),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:_e},ve().map(t=>n(xt,{instrument:t}))));return e.onMount=()=>{zr(),console.log("ViewInstruments mounted!")},e},zr=()=>{re()==="instruments"&&(_e().querySelectorAll("[data-latest-update]").forEach(e=>e.innerHTML=be(e.dataset.latestUpdate||"")),setTimeout(zr,5e3))};var Fe=k("new-wallet-name"),yt=k("wallet-list"),ne=K("wallet-block"),vt=K("wallet-title"),wt=K("wallet-total"),bt=K("wallet-instruments"),St=K("updated-ago"),Br=X("wallet-instrument-list"),Tt=X("wallet-new-total-price"),It=X("wallet-new-unit-price"),Mt=X("wallet-new-date"),kt=X("wallet-new-instrument"),ke={},Kn=U`
  -label: view-wallets;

  [data-xname='${Fe.xname}'] {
    width: 200px;
    font-size: 0.8rem;
  }

  [data-xname='${yt.xname}'] {
    width: 100%;
    margin-top: 10px;
  }

  [data-xname='${ne.xname}'] {
    margin-bottom: 2rem;
    [data-xname='${vt.xname}'] {
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
      [data-xname='${St.xname}'] {
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
    [data-xname='${bt.xname}'] {
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
`,jr=()=>Fe().value="",Xr=e=>{Tt(e).value="",It(e).value="",Mt(e).value=nt(new Date),kt(e).value=""},qr=e=>{G(wt(e.name),n(Gr,{wd:e})),G(vt(e.name),n(Kr,{wd:e}))};h(J,({changes:e=[]}={})=>{if(re()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of Le()){let o=r.instruments.filter(i=>t.some(c=>c.instrument.code===i.code));if(!o.length)continue;let a=Re(r),s=ne(r.name);o.forEach(i=>{let c=a.instruments.find(l=>l.id==i.id);c&&G(xe(`${r.name}:${i.id}`)(s),n(Nt,{ins:c,walletName:a.name}))}),qr(a)}});h(st,({wallet:e,modifiedInstrumentId:t})=>{let r=Re(e),o=ne(e.name);r.instruments.some(a=>a.id===t)?(H(Br(o),n(Nt,{ins:r.instruments.slice(-1)[0],walletName:r.name})),Xr(o)):t&&xe(`${e.name}:${t}`)(o).remove(),qr(r)});h(at,({wallet:e})=>{ke[e.name]=!0,jr(),H(yt(),n(Yr,{wallet:e}))});h(it,({name:e})=>ne(e)?.remove());var Yn=h(S,({xid:e=""})=>{ke[e]=!ke[e],bt(e).classList.toggle("expanded",ke[e])}),Jn=h(S,jr),Qn=h(S,({xid:e=""})=>Xr(ne(e))),Zn=h(S,async()=>{let e=Fe().value.trim();!e||await Yt({name:e,comment:"",instruments:[]})}),eo=h(S,async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet:  ${e} 
?`)||await Jt(e)}),to=h(S,async({xid:e=""})=>{let t=oe()[e];if(!t)return;let r=""+Date.now(),o=ne(e);t.instruments.push({id:r,code:kt(o).value,date:Mt(o).value,totalPrice:+Tt(o).value,unitPrice:+It(o).value}),await ct(t,r)}),ro=h(S,async({xid:e=""})=>{let[t,r]=e.split(":"),o=oe()[t],a=o?.instruments.findIndex(({id:i})=>""+i===r);if(!o||a<0)return;let s=F()[o.instruments[a].code]?.name;!confirm(`Delete:  ${s} 
from:     ${o.name} 
?`)||(o.instruments.splice(a,1),await ct(o,r))}),no=h(S,async()=>{we(0)}),Gr=({wd:e})=>n("tr",{xname:wt,xid:e.name},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},e.changeValue),n("td",{class:"percent"},e.changePercent),n("td",{class:"price"},N(e.totalValue)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"},N(e.totalPaid)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"actions"})),Kr=({wd:e})=>n("div",{xname:vt,xid:e.name},n("div",{xclick:Yn,class:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{xname:St,xid:e.name},e.updatedAgo),n(R,{variant:"text",class:"delete-wallet",xid:e.name,xclick:eo},"Delete"),n("div",{class:"summary"},n("div",null,n("b",null,e.changeValue)),n("div",null,n("b",null,e.changePercent,"%")),n("div",null,"Value ",n("b",null,N(e.totalValue))),n("div",null,"Paid ",n("b",null,N(e.totalPaid))))),Nt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return n("tr",{xid:r},n("td",{class:"instrument-name"},n("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),n("td",{class:"price"},N(e.currentTotal-e.paidTotal)),n("td",{class:"percent"},N(e.change)),n("td",{class:"price"},N(e.currentTotal)),n("td",{class:"price"},N(e.currentUnit)),n("td",{class:"price"},N(e.unitCount)),n("td",{class:"price"},N(e.paidTotal)),n("td",{class:"price"},N(e.paidUnit)),n("td",{class:"date"},e.paidDate),n("td",{class:"actions"},n(R,{xclick:ro,xid:r,variant:"text"},"Delete")))},oo=({wallet:e})=>n("tr",null,n("td",null,n("select",{xname:kt,xid:e.name,class:""},n("option",{value:""}),ve().map(t=>n("option",{value:t.code},"(",t.type,") ",t.name)))),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:Tt,xid:e.name,class:""})),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:It,xid:e.name,class:""})),n("td",{class:"date"},n("input",{type:"date",xname:Mt,xid:e.name,pattern:"yyyy-mm-dd",value:nt(new Date),class:""})),n("td",{class:"actions"},n(R,{xclick:to,xid:e.name},"Add"),n(R,{xclick:Qn,xid:e.name,variant:"text"},"Clear"))),Yr=({wallet:e})=>{let t=Re(e);return n("div",{xname:ne,xid:e.name},n(Kr,{wd:t}),n("table",{xname:bt,xid:e.name,class:Pr({expanded:ke[e.name]})},n("thead",null,n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"}))),n("tbody",{xname:Br},t.instruments.map(r=>n(Nt,{ins:r,walletName:t.name}))),n("tfoot",null,n(Gr,{wd:t}),n(oo,{wallet:e}))))},Jr=()=>{let e=n("div",{class:Kn},n("div",null,n("input",{xname:Fe}),"\xA0",n(R,{xclick:Zn},"Create wallet"),n(R,{xclick:Jn,variant:"text"},"Clear"),"\xA0\xA0\xA0\xA0\xA0\xA0\xA0",n(R,{xclick:no,variant:"text"},"Fetch instrument data now")),n("div",{xname:yt},Le().map(t=>n(Yr,{wallet:t}))));return e.onMount=()=>{Qr(),console.log("ViewWallets mounted!")},e},Qr=()=>{re()==="wallets"&&(Le().forEach(e=>St(e.name).innerHTML=ut(e.instruments)),setTimeout(Qr,5*1e3))};var Zr=k("items"),en=k("new-todo-text"),ze,Ne,tn=()=>{Ne.focus();let e=Ne.value.trim();!e||(Ne.value="",$t(e))},ao=Kt((e,t)=>{Ut({done:!1,text:t,id:e})},500),so=h(S,({xid:e=""})=>Vt(e)),io=h(S,tn),co=h(qe,({ev:e})=>e.key==="Enter"&&tn()),lo=h(qe,({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&ao(t,r)});h(Je,({todoId:e})=>xe(e)(ze).remove());h(Ye,({todo:e})=>H(ze,n(rn,{todo:e})));var rn=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xclick:so,xid:e.id}," X "),"\xA0",n("input",{xkeyup:lo,xid:e.id,value:e.text})),nn=()=>{let e=n("div",null,n("input",{xkeyup:co,xname:en}),"\xA0",n("button",{xclick:io},"Add"),n("ol",{xname:Zr}));return e.onMount=async()=>{ze=Zr(),Ne=en(),Ne.focus(),await _t(),Ce(ze,...Wt().map(t=>n(rn,{todo:t}))),console.log("ViewTodo mounted!")},e};var uo=U`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,Be,po=h(S,()=>{let e=oe(),t=F();Be.value=JSON.stringify({instruments:t,wallets:e},null,2),Be.select()}),mo=h(S,async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(Be?.value||"");console.log("IMPORTED:",{wallets:e,instruments:t}),await qt(t),await Zt(e)}catch(e){alert("Failed to load data: "+e)}}),on=()=>{let e=n("div",{class:uo},n("div",null,n(R,{xclick:po},"Export from LS")," ",n(R,{xclick:mo},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{Be=k("buffer")(),console.log("ViewMigration mounted!")},e};var je={home:{label:"Home",Component:Vr},wallets:{label:"Wallets",Component:Jr},instruments:{label:"Instruments",Component:Fr},todo:{label:"Todo",Component:nn},migration:{label:"Data migration",Component:on}},re=()=>new URLSearchParams(window.location.search).get("view")||"home",an=()=>je[re()]||je.home;var fo=U`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,sn=()=>{let[,...e]=Object.entries(je);return n("div",{class:fo},n(ht,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(u,null,o>0?" | ":"",n(ht,{view:t},r.label))))};Dr`
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

`;var cn=k("current-view");h(Ke,()=>{let{Component:e}=an();Ce(cn(),n(e,null))});var ln=()=>{let e=n("div",{class:"app"},n(sn,null),n("hr",null),n("div",{xname:cn}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Xt(),Qt()]).then(()=>{we(),Rt(),G(document.getElementById("app"),n(ln,null)),Pt()});fetch("https://raw.githubusercontent.com/pawelt/intrack-data/master/data/NO0010732852-recent.json").then(e=>e.json()).then(e=>console.log(123,e));})();
