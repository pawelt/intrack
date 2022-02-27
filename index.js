(()=>{var Ee=(e,...t)=>{e.replaceChildren(...t);for(let r of t)r.onMount?.()},H=(e,t)=>{let r=e.appendChild(t);return t.onMount?.(),r},X=(e,t)=>{let r=e?.parentElement;if(!r)return null;let o=r.replaceChild(t,e);return t.onMount?.(),o},Ne=({el:e=document,sel:t="",xname:r,xid:o})=>{let a=r?`[data-xname="${r}"]`:"",s=o?`[data-xid="${o}"]`:"";return e.querySelector(`${t}${a}${s}`)},C=e=>{let t=()=>Ne({xname:e});return t.xname=e,t.toString=()=>e,t},Y=e=>{let t=r=>Ne({xname:e,xid:r});return t.xname=e,t.toString=()=>e,t},G=e=>{let t=r=>Ne({xname:e,el:r});return t.xname=e,t.toString=()=>e,t},xe=e=>{let t=r=>Ne({xid:e,el:r});return t.xid=e,t.toString=()=>e,t};var dn=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),n=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let o=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?o.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?o.dataset[dn(a.substring(5))]=""+s:a==="xname"||a==="xid"?o.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&o.setAttribute(a,""+s),o[a]=s)}),r.flat().forEach(a=>H(o,typeof a=="object"?a:document.createTextNode(a))),o},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(o=>H(r,typeof o=="object"?o:document.createTextNode(o))),r};var Et={};var Nt=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Et[`${t}:${r}`]=e),e},kt=(e="",t="")=>Et[`${e}:${t}`];var ee={},pn=1,h=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let o="event-"+pn++;return ee[o]=ee[o]||[],ee[o].push(t),{type:o,callback:t}},b=(e,t)=>{let r=0,{type:o}=e({});for(let a of ee[o]||[])a(t),r++;return r};var ye=(e="")=>t=>({type:e,payload:t}),T=ye(),Ge=ye(),je=e=>t=>{let r=t.target,{xclick:o,xkeyup:a,xkeydown:s}=r,{xname:i="",xid:c=""}=r.dataset,l={xname:i,xid:c,ev:t};return o&&e==="click"?b(ye(o.type),l):a&&e==="keyup"?b(ye(a.type),l):s&&e==="keydown"?b(ye(s.type),l):0},Lt=()=>{document.addEventListener("click",je("click")),document.addEventListener("keyup",je("keyup")),document.addEventListener("keydown",je("keydown"))};var Rt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:o})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??o;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},Ke=e=>b(Xe,{newUrl:new URL(e)}),Xe=e=>({type:"router:navigate",payload:e}),At=e=>{let t=""+e;window.history.pushState(null,"",t),Ke(t)},Ot=()=>{window.addEventListener("popstate",()=>Ke(window.location.href)),Ke(window.location.href)};var Pt="todos",q=[],Ye=e=>({type:"store:item-created",payload:e}),mn=e=>({type:"store:item-updated",payload:e}),qe=e=>({type:"store:item-deleted",payload:e}),Dt=()=>q,Wt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return q.push(t),Je().then(()=>b(Ye,{todo:t}))},$t=async e=>{let t=q.find(r=>r.id===e.id);return t?(Object.assign(t,e),Je().then(()=>b(mn,{todo:t}))):!1},Ut=async e=>{let t=q.findIndex(r=>r.id===e);return t<0?!1:(q.splice(t,1),Je().then(()=>b(qe,{todoId:e})))},_t=async()=>{q=JSON.parse(localStorage.getItem(Pt)||"[]"),console.log({todos:q})},Je=async()=>{localStorage.setItem(Pt,JSON.stringify(q))};var Bt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Vt=e=>fetch(`${Bt}?target=${e}`),Ht=(e,t)=>fetch(`${Bt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Ft=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},zt=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},Qe=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!zt(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Ht(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{Ft(e);let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ht(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{if(!zt(e))return e;let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,o=await(await Vt(r)).json(),{ISIN:a,LONG_NAME:s}=o.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e},fetchCurrentPrice:async e=>{Ft(e);let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Vt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),e}}];var Ze="instruments",O={},J=e=>({type:"store:instruments-updated",payload:e}),we=()=>Object.values(O),F=()=>O,fn=async e=>{if(O[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),O[t.code]=t,et().then(()=>b(J,{changes:[{instrument:t,op:"create"}]}))},hn=async(e,t)=>{let{code:r=""}=e;if(!O[r])return!1;let o=O[r];return Object.assign(o,e),o.latestUpdate=new Date().toISOString(),et().then(()=>t&&b(J,{changes:[{instrument:o,op:"update"}]}))},jt=async e=>{if(!O[e])return!1;let t=O[e];return delete O[e],et().then(()=>b(J,{changes:[{instrument:t,op:"delete"}]}))},Gt=async()=>{O=JSON.parse(localStorage.getItem(Ze)||"{}"),Object.values(O).forEach(e=>e.type||(e.type="F")),console.log({instruments:O})},et=async()=>{localStorage.setItem(Ze,JSON.stringify(O))},Kt=async e=>{localStorage.setItem(Ze,JSON.stringify(e)),O=e},Xt=window;Xt.quick_refresh=!1;var gn=()=>Xt.quick_refresh?.2:2,xn=10,tt=async()=>{let e=[];for(let t of we())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-gn()*60*1e3){let r=Qe.find(o=>o.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}try{await r.fetchCurrentPrice(t),await hn(t,!1),e.push({instrument:t,op:"update"})}catch{}}e.length&&b(J,{changes:e}),setTimeout(tt,xn*1e3)},Yt=async e=>{let t=Qe.find(o=>o.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(F()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await fn(r)};var qt=(e,t)=>{let r;return(...o)=>{clearTimeout(r),r=setTimeout(()=>e(...o),t)}};var $o=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),yn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),wn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var rt=e=>{let t=yn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},E=e=>wn.format(e),ve=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,o=typeof t=="string"?new Date(t):t,a=Math.floor((o.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var nt="wallets",W={},ot=e=>({type:"store:wallet-created",payload:e}),at=e=>({type:"store:wallet-updated",payload:e}),st=e=>({type:"store:wallet-deleted",payload:e}),ke=()=>Object.values(W),oe=()=>W,Jt=async e=>{if(W[e.name])return!1;let t={...e};return W[t.name]=t,ct().then(()=>b(ot,{wallet:t}))},it=async(e,t)=>{let{name:r=""}=e;return W[r]?(W[r]=e,ct().then(()=>b(at,{wallet:e,modifiedInstrumentId:t}))):!1},Qt=async e=>W[e]?(delete W[e],ct().then(()=>b(st,{name:e}))):!1,Zt=async()=>{W=JSON.parse(localStorage.getItem(nt)||"{}"),console.log({wallets:W})},ct=async()=>{localStorage.setItem(nt,JSON.stringify(W))},er=async e=>{localStorage.setItem(nt,JSON.stringify(e)),W=e},lt=e=>{let t=F();return ve(e.reduce((r,o)=>{let a=t[o.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Le=e=>{let t=F(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,p=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:p/s.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),o=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:o,totalPaid:a,changeValue:E(o-a),changePercent:E(o/a*100-100),updatedAgo:lt(e.instruments)}};function vn(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function bn(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var tr=function(){function e(r){var o=this;this._insertTag=function(a){var s;o.tags.length===0?o.insertionPoint?s=o.insertionPoint.nextSibling:o.prepend?s=o.container.firstChild:s=o.before:s=o.tags[o.tags.length-1].nextSibling,o.container.insertBefore(a,s),o.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(o){o.forEach(this._insertTag)},t.insert=function(o){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(bn(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=vn(a);try{i.insertRule(o,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(o));this.ctr++},t.flush=function(){this.tags.forEach(function(o){return o.parentNode&&o.parentNode.removeChild(o)}),this.tags=[],this.ctr=0},e}();var S="-ms-",ae="-moz-",m="-webkit-",Re="comm",se="rule",ie="decl";var rr="@import";var Ae="@keyframes";var nr=Math.abs,te=String.fromCharCode,or=Object.assign;function ar(e,t){return(((t<<2^I(e,0))<<2^I(e,1))<<2^I(e,2))<<2^I(e,3)}function Oe(e){return e.trim()}function sr(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function be(e,t){return e.indexOf(t)}function I(e,t){return e.charCodeAt(t)|0}function Q(e,t,r){return e.slice(t,r)}function N(e){return e.length}function ce(e){return e.length}function le(e,t){return t.push(e),e}function ir(e,t){return e.map(t).join("")}var Pe=1,ue=1,cr=0,k=0,w=0,pe="";function Te(e,t,r,o,a,s,i){return{value:e,root:t,parent:r,type:o,props:a,children:s,line:Pe,column:ue,length:i,return:""}}function me(e,t){return or(Te("",null,null,"",null,null,0),e,{length:-e.length},t)}function lr(){return w}function ur(){return w=k>0?I(pe,--k):0,ue--,w===10&&(ue=1,Pe--),w}function L(){return w=k<cr?I(pe,k++):0,ue++,w===10&&(ue=1,Pe++),w}function $(){return I(pe,k)}function Se(){return k}function fe(e,t){return Q(pe,e,t)}function de(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function De(e){return Pe=ue=1,cr=N(pe=e),k=0,[]}function We(e){return pe="",e}function he(e){return Oe(fe(k-1,ut(e===91?e+2:e===40?e+1:e)))}function dr(e){for(;(w=$())&&w<33;)L();return de(e)>2||de(w)>3?"":" "}function pr(e,t){for(;--t&&L()&&!(w<48||w>102||w>57&&w<65||w>70&&w<97););return fe(e,Se()+(t<6&&$()==32&&L()==32))}function ut(e){for(;L();)switch(w){case e:return k;case 34:case 39:e!==34&&e!==39&&ut(w);break;case 40:e===41&&ut(e);break;case 92:L();break}return k}function mr(e,t){for(;L()&&e+w!==47+10;)if(e+w===42+42&&$()===47)break;return"/*"+fe(t,k-1)+"*"+te(e===47?e:L())}function fr(e){for(;!de($());)L();return fe(e,k)}function xr(e){return We($e("",null,null,null,[""],e=De(e),0,[0],e))}function $e(e,t,r,o,a,s,i,c,l){for(var p=0,d=0,g=i,R=0,j=0,D=0,x=1,A=1,v=1,M=0,_="",ge=a,K=s,V=o,y=_;A;)switch(D=M,M=L()){case 40:if(D!=108&&y.charCodeAt(g-1)==58){be(y+=f(he(M),"&","&\f"),"&\f")!=-1&&(v=-1);break}case 34:case 39:case 91:y+=he(M);break;case 9:case 10:case 13:case 32:y+=dr(D);break;case 92:y+=pr(Se()-1,7);continue;case 47:switch($()){case 42:case 47:le(Tn(mr(L(),Se()),t,r),l);break;default:y+="/"}break;case 123*x:c[p++]=N(y)*v;case 125*x:case 59:case 0:switch(M){case 0:case 125:A=0;case 59+d:j>0&&N(y)-g&&le(j>32?gr(y+";",o,r,g-1):gr(f(y," ","")+";",o,r,g-2),l);break;case 59:y+=";";default:if(le(V=hr(y,t,r,p,d,a,c,_,ge=[],K=[],g),s),M===123)if(d===0)$e(y,t,V,V,ge,s,g,c,K);else switch(R){case 100:case 109:case 115:$e(e,V,V,o&&le(hr(e,V,V,0,0,a,c,_,a,ge=[],g),K),a,K,g,c,o?ge:K);break;default:$e(y,V,V,V,[""],K,0,c,K)}}p=d=j=0,x=v=1,_=y="",g=i;break;case 58:g=1+N(y),j=D;default:if(x<1){if(M==123)--x;else if(M==125&&x++==0&&ur()==125)continue}switch(y+=te(M),M*x){case 38:v=d>0?1:(y+="\f",-1);break;case 44:c[p++]=(N(y)-1)*v,v=1;break;case 64:$()===45&&(y+=he(L())),R=$(),d=g=N(_=y+=fr(Se())),M++;break;case 45:D===45&&N(y)==2&&(x=0)}}return s}function hr(e,t,r,o,a,s,i,c,l,p,d){for(var g=a-1,R=a===0?s:[""],j=ce(R),D=0,x=0,A=0;D<o;++D)for(var v=0,M=Q(e,g+1,g=nr(x=i[D])),_=e;v<j;++v)(_=Oe(x>0?R[v]+" "+M:f(M,/&\f/g,R[v])))&&(l[A++]=_);return Te(e,t,r,a===0?se:c,l,p,d)}function Tn(e,t,r){return Te(e,t,r,Re,te(lr()),Q(e,2,-2),0)}function gr(e,t,r,o){return Te(e,t,r,ie,Q(e,0,o),Q(e,o+1,-1),o)}function dt(e,t){switch(ar(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+ae+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(N(e)-1-t>6)switch(I(e,t+1)){case 109:if(I(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+ae+(I(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~be(e,"stretch")?dt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(I(e,t+1)!==115)break;case 6444:switch(I(e,N(e)-3-(~be(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(I(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(I(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function Z(e,t){for(var r="",o=ce(e),a=0;a<o;a++)r+=t(e[a],a,e,t)||"";return r}function yr(e,t,r,o){switch(e.type){case rr:case ie:return e.return=e.return||e.value;case Re:return"";case Ae:return e.return=e.value+"{"+Z(e.children,o)+"}";case se:e.value=e.props.join(",")}return N(r=Z(e.children,o))?e.return=e.value+"{"+r+"}":""}function wr(e){var t=ce(e);return function(r,o,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,o,a,s)||"";return i}}function vr(e){return function(t){t.root||(t=t.return)&&e(t)}}function br(e,t,r,o){if(e.length>-1&&!e.return)switch(e.type){case ie:e.return=dt(e.value,e.length);break;case Ae:return Z([me(e,{value:f(e.value,"@","@"+m)})],o);case se:if(e.length)return ir(e.props,function(a){switch(sr(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Z([me(e,{props:[f(a,/:(read-\w+)/,":"+ae+"$1")]})],o);case"::placeholder":return Z([me(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),me(e,{props:[f(a,/:(plac\w+)/,":"+ae+"$1")]}),me(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],o)}return""})}}function Sn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Tr=Sn;var In=function(t,r,o){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[o]=1),!de(s);)L();return fe(t,k)},Mn=function(t,r){var o=-1,a=44;do switch(de(a)){case 0:a===38&&$()===12&&(r[o]=1),t[o]+=In(k-1,r,o);break;case 2:t[o]+=he(a);break;case 4:if(a===44){t[++o]=$()===58?"&\f":"",r[o]=t[o].length;break}default:t[o]+=te(a)}while(a=L());return t},Cn=function(t,r){return We(Mn(De(t),r))},Sr=new WeakMap,En=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,o=t.parent,a=t.column===o.column&&t.line===o.line;o.type!=="rule";)if(o=o.parent,!o)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!Sr.get(o))&&!a){Sr.set(t,!0);for(var s=[],i=Cn(r,s),c=o.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},Nn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var kn=[br],Ln=function(t){var r=t.key;if(r==="css"){var o=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(o,function(x){var A=x.getAttribute("data-emotion");A.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var a=t.stylisPlugins||kn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var A=x.getAttribute("data-emotion").split(" "),v=1;v<A.length;v++)s[A[v]]=!0;c.push(x)});var l,p=[En,Nn];{var d,g=[yr,vr(function(x){d.insert(x)})],R=wr(p.concat(a,g)),j=function(A){return Z(xr(A),R)};l=function(A,v,M,_){d=M,j(A?A+"{"+v.styles+"}":v.styles),_&&(D.inserted[v.name]=!0)}}var D={key:r,sheet:new tr({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},Ir=Ln;function Rn(e){for(var t=0,r,o=0,a=e.length;a>=4;++o,a-=4)r=e.charCodeAt(o)&255|(e.charCodeAt(++o)&255)<<8|(e.charCodeAt(++o)&255)<<16|(e.charCodeAt(++o)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(o+2)&255)<<16;case 2:t^=(e.charCodeAt(o+1)&255)<<8;case 1:t^=e.charCodeAt(o)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Mr=Rn;var An={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Cr=An;var On=/[A-Z]|^ms/g,Pn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Lr=function(t){return t.charCodeAt(1)===45},Er=function(t){return t!=null&&typeof t!="boolean"},pt=Tr(function(e){return Lr(e)?e:e.replace(On,"-$&").toLowerCase()}),Nr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(Pn,function(o,a,s){return z={name:a,styles:s,next:z},a})}return Cr[t]!==1&&!Lr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ie(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return z={name:r.name,styles:r.styles,next:z},r.name;if(r.styles!==void 0){var o=r.next;if(o!==void 0)for(;o!==void 0;)z={name:o.name,styles:o.styles,next:z},o=o.next;var a=r.styles+";";return a}return Dn(e,t,r)}case"function":{if(e!==void 0){var s=z,i=r(e);return z=s,Ie(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function Dn(e,t,r){var o="";if(Array.isArray(r))for(var a=0;a<r.length;a++)o+=Ie(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?o+=s+"{"+t[i]+"}":Er(i)&&(o+=pt(s)+":"+Nr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)Er(i[c])&&(o+=pt(s)+":"+Nr(s,i[c])+";");else{var l=Ie(e,t,i);switch(s){case"animation":case"animationName":{o+=pt(s)+":"+l+";";break}default:o+=s+"{"+l+"}"}}}return o}var kr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var z,Ue=function(t,r,o){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";z=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ie(o,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ie(o,r,t[c]),a&&(s+=i[c]);var l;kr.lastIndex=0;for(var p="",d;(d=kr.exec(s))!==null;)p+="-"+d[1];var g=Mr(s)+p;return{name:g,styles:s,next:z}};var Wn=!0;function mt(e,t,r){var o="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):o+=a+" "}),o}var Rr=function(t,r,o){var a=t.key+"-"+r.name;if((o===!1||Wn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function Ar(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function Or(e,t,r){var o=[],a=mt(e,o,r);return o.length<2?r:a+t(o)}var $n=function(t){var r=Ir(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var o=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ue(p,r.registered,void 0);return Rr(r,g,!1),r.key+"-"+g.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ue(p,r.registered),R="animation-"+g.name;return Ar(r,{name:g.name,styles:"@keyframes "+R+"{"+g.styles+"}"}),R},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Ue(p,r.registered);Ar(r,g)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return Or(r.registered,o,Un(p))};return{css:o,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:mt.bind(null,r.registered),merge:Or.bind(null,r.registered,o)}},Un=function e(t){for(var r="",o=0;o<t.length;o++){var a=t[o];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},Pr=$n;var B=Pr({key:"css"}),Ha=B.flush,Fa=B.hydrate,Dr=B.cx,za=B.merge,Ba=B.getRegisteredStyles,Wr=B.injectGlobal,ja=B.keyframes,U=B.css,Ga=B.sheet,Ka=B.cache;var _n=U`
  cursor: pointer;
`,Vn=U`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,P=(e,...t)=>{let{class:r="",...o}={...e};o.disabled||delete o.disabled;let a=`${o.variant==="text"?Vn:_n} ${r}`;return n("button",{class:a,...o},t)},ft=(e,...t)=>{let r={...e},{view:o}=e;return o&&(r.href=""+Rt({searchSet:{view:o}})),n("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&At(s)},...r},t)};var $r=C("view-home"),Ur=G("xxx"),_r=G("yyy"),Vr=()=>{let e=kt($r.xname),t=Nt(n("div",{xname:$r},"Home rendered ",n("strong",{xname:Ur},+(Ur(e)?.innerHTML||0)+1)," times.",n("br",null),"This is a persistent input: ",_r(e)||n("input",{xname:_r,value:"test "}),n("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),n("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=C("instrument-list"),Hr=Y("instrument-row"),ht=C("add-instrument"),Ve=C("new-instrument-source"),Hn=U`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='${Ve.xname}'] {
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
`;h(J,({changes:e})=>{if(re()==="instruments")for(let t of e){let r=Hr(t.instrument.code);switch(t.op){case"create":H(_e(),n(gt,{instrument:t.instrument}));break;case"update":X(r,n(gt,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var Fr=()=>Ve().value="",Fn=h(T,Fr),zn=h(T,async()=>{ht().disabled=!0;try{await Yt(Ve().value)}catch(e){alert(e)}ht().disabled=!1,Fr()}),Bn=h(T,async({xid:e=""})=>{let{name:t}=F()[e]||{};!t||!confirm(`Remove instrument:  
${t} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await jt(e)}),jn=()=>n("div",null,"Paste the URL of the instrument you want to track. Supported websites:",n("ul",null,n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",n("small",null,"( for example:"," ",n("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),n("li",null,n("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",n("small",null,"( for example:"," ",n("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),Gn=()=>n("div",null,n("input",{xname:Ve}),"  ",n(P,{xclick:zn,xname:ht},"Add instrument"),"  ",n(P,{xclick:Fn,variant:"text"},"Clear")),gt=({instrument:e})=>n("tr",{xname:Hr,xid:e.code},n("td",null,n("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",n("strong",null,e.name))),n("td",{class:"right"},n("strong",null,e.latestPrice.toFixed(2))),n("td",null,e.code),n("td",null,e.isin),n("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},ve(e.latestUpdate)),n("td",null,n(P,{xclick:Bn,xid:e.code,variant:"text"},"Delete"))),zr=()=>{let e=n("div",{class:Hn},n(jn,null),n(Gn,null),n("h2",{class:"title"},"Tracked instruments"),n("table",{xname:_e},we().map(t=>n(gt,{instrument:t}))));return e.onMount=()=>{Br(),console.log("ViewInstruments mounted!")},e},Br=()=>{re()==="instruments"&&(_e().querySelectorAll("[data-latest-update]").forEach(e=>e.innerHTML=ve(e.dataset.latestUpdate||"")),setTimeout(Br,5e3))};var He=C("new-wallet-name"),xt=C("wallet-list"),ne=Y("wallet-block"),yt=Y("wallet-title"),wt=Y("wallet-total"),vt=Y("wallet-instruments"),bt=Y("updated-ago"),jr=G("wallet-instrument-list"),Tt=G("wallet-new-total-price"),St=G("wallet-new-unit-price"),It=G("wallet-new-date"),Mt=G("wallet-new-instrument"),Me={},Kn=U`
  -label: view-wallets;

  [data-xname='${He.xname}'] {
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
`,Gr=()=>{He().value=""},Kr=e=>{Tt(e).value="",St(e).value="",It(e).value=rt(new Date),Mt(e).value=""},Xr=e=>{X(wt(e.name),n(Yr,{wd:e})),X(yt(e.name),n(qr,{wd:e}))};h(J,({changes:e=[]}={})=>{if(re()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of ke()){let o=r.instruments.filter(i=>t.some(c=>c.instrument.code===i.code));if(!o.length)continue;let a=Le(r),s=ne(r.name);o.forEach(i=>{let c=a.instruments.find(l=>l.id==i.id);c&&X(xe(`${r.name}:${i.id}`)(s),n(Ct,{ins:c,walletName:a.name}))}),Xr(a)}});h(at,({wallet:e,modifiedInstrumentId:t})=>{let r=Le(e),o=ne(e.name);r.instruments.some(a=>a.id===t)?(H(jr(o),n(Ct,{ins:r.instruments.slice(-1)[0],walletName:r.name})),Kr(o)):t&&xe(`${e.name}:${t}`)(o).remove(),Xr(r)});h(ot,({wallet:e})=>{Me[e.name]=!0,Gr(),H(xt(),n(Jr,{wallet:e}))});h(st,({name:e})=>{ne(e)?.remove()});var Xn=h(T,({xid:e=""})=>{Me[e]=!Me[e],vt(e).classList.toggle("expanded",Me[e])}),Yn=h(T,Gr),qn=h(T,({xid:e=""})=>{Kr(ne(e))}),Jn=h(T,async()=>{let e=He().value.trim();!e||await Jt({name:e,comment:"",instruments:[]})}),Qn=h(T,async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet:  ${e} 
?`)||await Qt(e)}),Zn=h(T,async({xid:e=""})=>{let t=oe()[e];if(!t)return;let r=""+Date.now(),o=ne(e);t.instruments.push({id:r,code:Mt(o).value,date:It(o).value,totalPrice:+Tt(o).value,unitPrice:+St(o).value}),await it(t,r)}),eo=h(T,async({xid:e=""})=>{let[t,r]=e.split(":"),o=oe()[t],a=o?.instruments.findIndex(({id:i})=>""+i===r);if(!o||a<0)return;let s=F()[o.instruments[a].code]?.name;!confirm(`Delete:  ${s} 
from:     ${o.name} 
?`)||(o.instruments.splice(a,1),await it(o,r))}),Yr=({wd:e})=>n("tr",{xname:wt,xid:e.name},n("td",{class:"instrument-name"},"Total"),n("td",{class:"price"},e.changeValue),n("td",{class:"percent"},e.changePercent),n("td",{class:"price"},E(e.totalValue)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"price"},E(e.totalPaid)),n("td",{class:"price"}),n("td",{class:"price"}),n("td",{class:"actions"})),qr=({wd:e})=>n("div",{xname:yt,xid:e.name},n("div",{xclick:Xn,class:"toggle-instruments",xid:e.name}),n("div",{class:"name"},e.name),n("div",{xname:bt,xid:e.name},e.updatedAgo),n(P,{variant:"text",class:"delete-wallet",xid:e.name,xclick:Qn},"Delete"),n("div",{class:"summary"},n("div",null,n("b",null,e.changeValue)),n("div",null,n("b",null,e.changePercent,"%")),n("div",null,"Value ",n("b",null,E(e.totalValue))),n("div",null,"Paid ",n("b",null,E(e.totalPaid))))),Ct=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return n("tr",{xid:r},n("td",{class:"instrument-name"},n("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),n("td",{class:"price"},E(e.currentTotal-e.paidTotal)),n("td",{class:"percent"},E(e.change)),n("td",{class:"price"},E(e.currentTotal)),n("td",{class:"price"},E(e.currentUnit)),n("td",{class:"price"},E(e.unitCount)),n("td",{class:"price"},E(e.paidTotal)),n("td",{class:"price"},E(e.paidUnit)),n("td",{class:"date"},e.paidDate),n("td",{class:"actions"},n(P,{xclick:eo,xid:r,variant:"text"},"Delete")))},to=({wallet:e})=>n("tr",null,n("td",null,n("select",{xname:Mt,xid:e.name,class:""},n("option",{value:""}),we().map(t=>n("option",{value:t.code},"(",t.type,") ",t.name)))),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:Tt,xid:e.name,class:""})),n("td",null),n("td",null),n("td",null),n("td",{class:"price"},n("input",{type:"number",xname:St,xid:e.name,class:""})),n("td",{class:"date"},n("input",{type:"date",xname:It,xid:e.name,pattern:"yyyy-mm-dd",value:rt(new Date),class:""})),n("td",{class:"actions"},n(P,{xclick:Zn,xid:e.name},"Add"),n(P,{xclick:qn,xid:e.name,variant:"text"},"Clear"))),Jr=({wallet:e})=>{let t=Le(e);return n("div",{xname:ne,xid:e.name},n(qr,{wd:t}),n("table",{xname:vt,xid:e.name,class:Dr({expanded:Me[e.name]})},n("thead",null,n("tr",null,n("th",{class:"instrument-name"},"Instrument"),n("th",{class:"price"},"Change"),n("th",{class:"percent"},"%"),n("th",{class:"price"},"Total value"),n("th",{class:"price"},"Unit value"),n("th",{class:"price"},"Unit count"),n("th",{class:"price"},"Total price"),n("th",{class:"price"},"Unit price"),n("th",{class:"date"},"Date"),n("th",{class:"actions"}))),n("tbody",{xname:jr},t.instruments.map(r=>n(Ct,{ins:r,walletName:t.name}))),n("tfoot",null,n(Yr,{wd:t}),n(to,{wallet:e}))))},Qr=()=>{let e=n("div",{class:Kn},n("div",null,n("input",{xname:He}),"  ",n(P,{xclick:Jn},"Create wallet"),"  ",n(P,{xclick:Yn,variant:"text"},"Clear")),n("div",{xname:xt},ke().map(t=>n(Jr,{wallet:t}))));return e.onMount=()=>{Zr(),console.log("ViewWallets mounted!")},e},Zr=()=>{re()==="wallets"&&(ke().forEach(e=>bt(e.name).innerHTML=lt(e.instruments)),setTimeout(Zr,5*1e3))};var en=C("items"),tn=C("new-todo-text"),Fe,Ce,rn=()=>{Ce.focus();let e=Ce.value.trim();!e||(Ce.value="",Wt(e))},ro=qt((e,t)=>{$t({done:!1,text:t,id:e})},500),no=h(T,({xid:e=""})=>Ut(e)),oo=h(T,rn),ao=h(Ge,({ev:e})=>e.key==="Enter"&&rn()),so=h(Ge,({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&ro(t,r)});h(qe,({todoId:e})=>xe(e)(Fe).remove());h(Ye,({todo:e})=>H(Fe,n(nn,{todo:e})));var nn=({todo:e})=>n("li",{xname:"todo",xid:e.id},n("button",{xclick:no,xid:e.id}," X "),"\xA0",n("input",{xkeyup:so,xid:e.id,value:e.text})),on=()=>{let e=n("div",null,n("input",{xkeyup:ao,xname:tn}),"\xA0",n("button",{xclick:oo},"Add"),n("ol",{xname:en}));return e.onMount=async()=>{Fe=en(),Ce=tn(),Ce.focus(),await _t(),Ee(Fe,...Dt().map(t=>n(nn,{todo:t}))),console.log("ViewTodo mounted!")},e};var io=U`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,ze,co=h(T,()=>{let e=oe(),t=F();ze.value=JSON.stringify({instruments:t,wallets:e},null,2),ze.select()}),lo=h(T,async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(ze?.value||"");console.log("IMPORTED:",{wallets:e,instruments:t}),await Kt(t),await er(e)}catch(e){alert("Failed to load data: "+e)}}),an=()=>{let e=n("div",{class:io},n("div",null,n(P,{xclick:co},"Export from LS")," ",n(P,{xclick:lo},"Import to LS")),n("textarea",{xname:"buffer"}));return e.onMount=()=>{ze=C("buffer")(),console.log("ViewMigration mounted!")},e};var Be={home:{label:"Home",Component:Vr},wallets:{label:"Wallets",Component:Qr},instruments:{label:"Instruments",Component:zr},todo:{label:"Todo",Component:on},migration:{label:"Data migration",Component:an}},re=()=>new URLSearchParams(window.location.search).get("view")||"home",sn=()=>{let{Component:e,label:t}=Be[re()]||Be.home;return{Component:e,label:t}};var uo=U`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,cn=()=>{let[,...e]=Object.entries(Be);return n("div",{class:uo},n(ft,{href:location.pathname},n("h1",null,"Investment tracker")),e.map(([t,r],o)=>n(u,null,o>0?" | ":"",n(ft,{view:t},r.label))))};Wr`
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

`;var ln=C("current-view");h(Xe,()=>{let{Component:e}=sn();Ee(ln(),n(e,null))});var un=()=>{let e=n("div",{class:"app"},n(cn,null),n("hr",null),n("div",{xname:ln}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Gt(),Zt()]).then(()=>{tt(),Lt(),X(document.getElementById("app"),n(un,null)),Ot()});})();
