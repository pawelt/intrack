(()=>{var B=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},ze=(e,t,r)=>{let n=e.replaceChild(t,r);return t.onMount&&t.onMount(),n},Le=(e,t)=>e.removeChild(t),j=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},T=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},mt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=j(e);n&&(n.innerHTML=""+t)},ft=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=j(e);return n?.innerHTML!==void 0?n.innerHTML:t},Z=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=j(e);n&&(n.value=""+t)},X=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=j(e);return n?n.value:t},ht=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},gt=(e,t,r)=>{t.querySelectorAll(e).forEach(n=>{let{xname:a,xid:s}=n.dataset;if(!a||!s)return;let i=j({el:r,xname:a,xid:s});if(!i)return;let c=i.parentElement;!c||ze(c,n,i)})};var Vr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[Vr(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s)}),r.flat().forEach(a=>B(n,typeof a=="object"?a:document.createTextNode(a))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>B(r,typeof n=="object"?n:document.createTextNode(n))),r};var ee={},Fr=1,g=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let n="event-"+Fr++;return ee[n]=ee[n]||[],ee[n].push(t),{type:n,callback:t}},x=(e,t)=>{let r=0,{type:n}=e({});for(let a of ee[n]||[])a(t),r++;return r};var xt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(d=>i.append(c,d))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},qe=e=>({type:"router:navigate",payload:e}),Be=e=>{x(qe,{newUrl:new URL(e)})},yt=e=>{let t=""+e;window.history.pushState(null,"",t),Be(t)};var wt=()=>Be(window.location.href);window.addEventListener("popstate",()=>Be(window.location.href));var vt="todos",Y=[],je=e=>({type:"store:item-created",payload:e}),zr=e=>({type:"store:item-updated",payload:e}),Ge=e=>({type:"store:item-deleted",payload:e}),bt=()=>Y,Tt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Ke().then(()=>x(je,{todo:t}))},It=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Ke().then(()=>x(zr,{todo:t}))):!1},St=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Ke().then(()=>x(Ge,{todoId:e})))},Mt=async()=>{Y=JSON.parse(localStorage.getItem(vt)||"[]"),console.log({todos:Y})},Ke=async()=>{localStorage.setItem(vt,JSON.stringify(Y))};var kt=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Ct=e=>fetch(`${kt}?target=${e}`),Et=(e,t)=>fetch(`${kt}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Re=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await Et(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Et(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Ct(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Ct(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ye="instruments",P={},W=e=>({type:"store:instruments-updated",payload:e}),we=()=>Object.values(P),te=()=>P,Nt=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Je().then(()=>x(W,{changes:[{instrument:t,op:"create"}]}))},qr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Je().then(()=>x(W,{changes:[{instrument:r,op:"update"}]}))},Lt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Je().then(()=>x(W,{changes:[{instrument:t,op:"delete"}]}))},Br=async()=>{P=JSON.parse(localStorage.getItem(Ye)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Je=async()=>{localStorage.setItem(Ye,JSON.stringify(P))},Rt=async e=>{localStorage.setItem(Ye,JSON.stringify(e)),P=e},Pt=window;Pt.quick_refresh=!1;var jr=Pt.quick_refresh?.2:2,Gr=10,At=async()=>{let e=[];for(let t of we())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-jr*60*1e3){let r=Re.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await qr(t),e.push({instrument:t,op:"update"}))}e.length&&x(W,{changes:e}),setTimeout(At,Gr*1e3)};Br().then(()=>x(W,{changes:[]})).then(At);var Qe="wallets",$={},Kr=e=>({type:"store:wallet-created",payload:e}),Yr=e=>({type:"store:wallet-updated",payload:e}),Jr=e=>({type:"store:wallets-updated",payload:e}),Qr=e=>({type:"store:wallet-deleted",payload:e}),Ze=()=>Object.values($),oe=()=>$,Ot=async e=>{if($[e.name])return!1;let t={...e};return $[t.name]=t,et().then(()=>x(Kr,{wallet:t}))},Xe=async e=>{let{name:t=""}=e;return $[t]?($[t]=e,et().then(()=>x(Yr,{wallet:e}))):!1},Dt=async e=>$[e]?(delete $[e],et().then(()=>x(Qr,{name:e}))):!1,Zr=async()=>{$=JSON.parse(localStorage.getItem(Qe)||"{}"),console.log({wallets:$})},et=async()=>{localStorage.setItem(Qe,JSON.stringify($))},$t=async e=>{localStorage.setItem(Qe,JSON.stringify(e)),$=e};Zr().then(()=>x(Jr,{}));var ae=e=>t=>({type:e,payload:t}),I=(e="")=>ae(e),rt=(e="")=>ae(e),tt=e=>t=>{let r=t.target,{xname:n="",xid:a=""}=r.dataset,{xclick:s,xkeyup:i,xkeydown:c}=r,l={xname:n,xid:a,ev:t};s&&e==="click"?x(ae(s.type),l):i&&e==="keyup"?x(ae(i.type),l):c&&e==="keydown"?x(ae(c.type),l):n&&x(ae(`${n}:${e}`),l)},Ut=()=>{document.addEventListener("click",tt("click")),document.addEventListener("keyup",tt("keyup")),document.addEventListener("keydown",tt("keydown"))};var Wt={};var Ht=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(Wt[`${t}:${r}`]=e),e},_t=(e="",t="")=>Wt[`${e}:${t}`];function Xr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function en(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Vt=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(en(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=Xr(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",se="-moz-",m="-webkit-",Pe="comm",ie="rule",ce="decl";var Ft="@import";var Ae="@keyframes";var zt=Math.abs,re=String.fromCharCode,qt=Object.assign;function Bt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Oe(e){return e.trim()}function jt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ve(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function E(e){return e.length}function le(e){return e.length}function ue(e,t){return t.push(e),e}function Gt(e,t){return e.map(t).join("")}var De=1,pe=1,Kt=0,k=0,v=0,me="";function be(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:De,column:pe,length:i,return:""}}function fe(e,t){return qt(be("",null,null,"",null,null,0),e,{length:-e.length},t)}function Yt(){return v}function Jt(){return v=k>0?M(me,--k):0,pe--,v===10&&(pe=1,De--),v}function N(){return v=k<Kt?M(me,k++):0,pe++,v===10&&(pe=1,De++),v}function U(){return M(me,k)}function Te(){return k}function he(e,t){return J(me,e,t)}function de(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function $e(e){return De=pe=1,Kt=E(me=e),k=0,[]}function Ue(e){return me="",e}function ge(e){return Oe(he(k-1,nt(e===91?e+2:e===40?e+1:e)))}function Qt(e){for(;(v=U())&&v<33;)N();return de(e)>2||de(v)>3?"":" "}function Zt(e,t){for(;--t&&N()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return he(e,Te()+(t<6&&U()==32&&N()==32))}function nt(e){for(;N();)switch(v){case e:return k;case 34:case 39:e!==34&&e!==39&&nt(v);break;case 40:e===41&&nt(e);break;case 92:N();break}return k}function Xt(e,t){for(;N()&&e+v!==47+10;)if(e+v===42+42&&U()===47)break;return"/*"+he(t,k-1)+"*"+re(e===47?e:N())}function er(e){for(;!de(U());)N();return he(e,k)}function nr(e){return Ue(We("",null,null,null,[""],e=$e(e),0,[0],e))}function We(e,t,r,n,a,s,i,c,l){for(var d=0,p=0,h=i,L=0,q=0,D=0,y=1,R=1,b=1,C=0,_="",ye=a,G=s,V=n,w=_;R;)switch(D=C,C=N()){case 40:if(D!=108&&w.charCodeAt(h-1)==58){ve(w+=f(ge(C),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=ge(C);break;case 9:case 10:case 13:case 32:w+=Qt(D);break;case 92:w+=Zt(Te()-1,7);continue;case 47:switch(U()){case 42:case 47:ue(tn(Xt(N(),Te()),t,r),l);break;default:w+="/"}break;case 123*y:c[d++]=E(w)*b;case 125*y:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+p:q>0&&E(w)-h&&ue(q>32?rr(w+";",n,r,h-1):rr(f(w," ","")+";",n,r,h-2),l);break;case 59:w+=";";default:if(ue(V=tr(w,t,r,d,p,a,c,_,ye=[],G=[],h),s),C===123)if(p===0)We(w,t,V,V,ye,s,h,c,G);else switch(L){case 100:case 109:case 115:We(e,V,V,n&&ue(tr(e,V,V,0,0,a,c,_,a,ye=[],h),G),a,G,h,c,n?ye:G);break;default:We(w,V,V,V,[""],G,0,c,G)}}d=p=q=0,y=b=1,_=w="",h=i;break;case 58:h=1+E(w),q=D;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&Jt()==125)continue}switch(w+=re(C),C*y){case 38:b=p>0?1:(w+="\f",-1);break;case 44:c[d++]=(E(w)-1)*b,b=1;break;case 64:U()===45&&(w+=ge(N())),L=U(),p=h=E(_=w+=er(Te())),C++;break;case 45:D===45&&E(w)==2&&(y=0)}}return s}function tr(e,t,r,n,a,s,i,c,l,d,p){for(var h=a-1,L=a===0?s:[""],q=le(L),D=0,y=0,R=0;D<n;++D)for(var b=0,C=J(e,h+1,h=zt(y=i[D])),_=e;b<q;++b)(_=Oe(y>0?L[b]+" "+C:f(C,/&\f/g,L[b])))&&(l[R++]=_);return be(e,t,r,a===0?ie:c,l,d,p)}function tn(e,t,r){return be(e,t,r,Pe,re(Yt()),J(e,2,-2),0)}function rr(e,t,r,n){return be(e,t,r,ce,J(e,0,n),J(e,n+1,-1),n)}function ot(e,t){switch(Bt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+se+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(E(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+se+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ve(e,"stretch")?ot(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,E(e)-3-(~ve(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function Q(e,t){for(var r="",n=le(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function or(e,t,r,n){switch(e.type){case Ft:case ce:return e.return=e.return||e.value;case Pe:return"";case Ae:return e.return=e.value+"{"+Q(e.children,n)+"}";case ie:e.value=e.props.join(",")}return E(r=Q(e.children,n))?e.return=e.value+"{"+r+"}":""}function ar(e){var t=le(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function sr(e){return function(t){t.root||(t=t.return)&&e(t)}}function ir(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ce:e.return=ot(e.value,e.length);break;case Ae:return Q([fe(e,{value:f(e.value,"@","@"+m)})],n);case ie:if(e.length)return Gt(e.props,function(a){switch(jt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([fe(e,{props:[f(a,/:(read-\w+)/,":"+se+"$1")]})],n);case"::placeholder":return Q([fe(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,":"+se+"$1")]}),fe(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function rn(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var cr=rn;var nn=function(t,r,n){for(var a=0,s=0;a=s,s=U(),a===38&&s===12&&(r[n]=1),!de(s);)N();return he(t,k)},on=function(t,r){var n=-1,a=44;do switch(de(a)){case 0:a===38&&U()===12&&(r[n]=1),t[n]+=nn(k-1,r,n);break;case 2:t[n]+=ge(a);break;case 4:if(a===44){t[++n]=U()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=re(a)}while(a=N());return t},an=function(t,r){return Ue(on($e(t),r))},lr=new WeakMap,sn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!lr.get(n))&&!a){lr.set(t,!0);for(var s=[],i=an(r,s),c=n.props,l=0,d=0;l<i.length;l++)for(var p=0;p<c.length;p++,d++)t.props[d]=s[l]?i[l].replace(/&\f/g,c[p]):c[p]+" "+i[l]}}},cn=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var ln=[ir],un=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(y){var R=y.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var a=t.stylisPlugins||ln,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var R=y.getAttribute("data-emotion").split(" "),b=1;b<R.length;b++)s[R[b]]=!0;c.push(y)});var l,d=[sn,cn];{var p,h=[or,sr(function(y){p.insert(y)})],L=ar(d.concat(a,h)),q=function(R){return Q(nr(R),L)};l=function(R,b,C,_){p=C,q(R?R+"{"+b.styles+"}":b.styles),_&&(D.inserted[b.name]=!0)}}var D={key:r,sheet:new Vt({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},ur=un;function pn(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var pr=pn;var dn={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},dr=dn;var mn=/[A-Z]|^ms/g,fn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,gr=function(t){return t.charCodeAt(1)===45},mr=function(t){return t!=null&&typeof t!="boolean"},at=cr(function(e){return gr(e)?e:e.replace(mn,"-$&").toLowerCase()}),fr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(fn,function(n,a,s){return F={name:a,styles:s,next:F},a})}return dr[t]!==1&&!gr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Ie(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var a=r.styles+";";return a}return hn(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,Ie(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var d=t[r];return d!==void 0?d:r}function hn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=Ie(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":mr(i)&&(n+=at(s)+":"+fr(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)mr(i[c])&&(n+=at(s)+":"+fr(s,i[c])+";");else{var l=Ie(e,t,i);switch(s){case"animation":case"animationName":{n+=at(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var hr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,He=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=Ie(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=Ie(n,r,t[c]),a&&(s+=i[c]);var l;hr.lastIndex=0;for(var d="",p;(p=hr.exec(s))!==null;)d+="-"+p[1];var h=pr(s)+d;return{name:h,styles:s,next:F}};var gn=!0;function st(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var xr=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||gn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function yr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function wr(e,t,r){var n=[],a=st(e,n,r);return n.length<2?r:a+t(n)}var xn=function(t){var r=ur(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=He(d,r.registered,void 0);return xr(r,h,!1),r.key+"-"+h.name},a=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=He(d,r.registered),L="animation-"+h.name;return yr(r,{name:h.name,styles:"@keyframes "+L+"{"+h.styles+"}"}),L},s=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];var h=He(d,r.registered);yr(r,h)},i=function(){for(var l=arguments.length,d=new Array(l),p=0;p<l;p++)d[p]=arguments[p];return wr(r.registered,n,yn(d))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(d){r.inserted[d]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:st.bind(null,r.registered),merge:wr.bind(null,r.registered,n)}},yn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},vr=xn;var z=vr({key:"css"}),ba=z.flush,Ta=z.hydrate,br=z.cx,Ia=z.merge,Sa=z.getRegisteredStyles,Tr=z.injectGlobal,Ma=z.keyframes,H=z.css,Ca=z.sheet,Ea=z.cache;var wn=H`
  cursor: pointer;
`,vn=H`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?vn:wn} ${r}`;return o("button",{class:a,...n},t)},it=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+xt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&yt(s)},...r},t)};var Ir="view-home",Sr=()=>{let e=_t(Ir),t=Ht(o("div",{xname:Ir},"Home rendered ",o("strong",{xname:"xxx"},+ft({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var Da=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),bn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),Tn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var ct=e=>{let t=bn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},O=e=>Tn.format(e),Se=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var In=H`
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
`,pt,xe,Mr=({changes:e})=>{if(ne()==="instruments")if(!e.length)K(xe,o(Nn,null));else for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":B(xe,o(ut,{instrument:t.instrument}));break;case"update":r&&ze(xe,o(ut,{instrument:t.instrument}),r);break;case"delete":r&&Le(xe,r);break}}};g(W,Mr);var lt=()=>pt.value="",Sn=g(I(),lt),Mn=g(I(),async()=>{let e=pt.value,t=Re.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(te()[r.code||""]){lt();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Nt(r),lt()}),Cn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await Lt(e)}),En=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),kn=()=>o("div",null,o("input",{xname:"new-instrument"}),"  ",o(A,{xclick:Mn},"Add instrument"),"  ",o(A,{xclick:Sn,variant:"text"},"Clear")),Nn=()=>o(u,null,we().map(e=>o(ut,{instrument:e}))),ut=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Se(e.latestUpdate)),o("td",null,o(A,{xclick:Cn,xid:e.code,variant:"text"},"Delete"))),Cr=()=>{let e=o("div",{class:In},o(En,null),o(kn,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"}));return e.onMount=()=>{pt=T({xname:"new-instrument"}),xe=T({xname:"instrument-list"}),Mr({changes:[]}),Er(),console.log("ViewInstruments mounted!")},e},Er=()=>{ne()==="instruments"&&(xe.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Se(t.dataset.latestUpdate||"")}),setTimeout(Er,5e3))};var Ln=H`
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
    .title {
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
      .total {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,dt,Ce,Me={},kr=()=>{dt.value=""},Nr=e=>{Z({el:e,xname:"wallet-new-total-price"},""),Z({el:e,xname:"wallet-new-unit-price"},""),Z({el:e,xname:"wallet-new-date"},ct(new Date)),Z({el:e,xname:"wallet-new-instrument"},"")},Ee=({changes:e}={})=>{if(ne()!=="wallets")return;let t=o(u,null,Ze().map(n=>o(zn,{wallet:n}))),r=ht();gt(".new-instrument-field",Ce,t),K(Ce,t),r.focus()};g(W,_e(Ee,500));var Rn=g(I(),async()=>{let e=dt?.value||"";if(!e)return;await Ot({name:e,comment:"",instruments:[]}),kr(),Me[e]=!0,Ee()}),Pn=g(I(),kr),An=g(I(),({xid:e=""})=>{Me[e]=!Me[e],T({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),On=g(I(),({xid:e=""})=>{Nr(T({xname:"wallet",xid:e}))}),Dn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),n=oe()[t],a=n.instruments.find(({id:s})=>""+s===r);!n||!confirm(`Delete instrument ${a?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:s})=>""+s!==r),Xe(n),Ee())}),$n=g(I(),async({xid:e=""})=>{!oe()[e]||!confirm(`Delete wallet ${e}?`)||(await Dt(e),Ce.removeChild(T({el:Ce,xname:"wallet",xid:e})))}),Un=g(I(),({xid:e=""})=>{let t=oe()[e];if(!t){alert("Wallet "+e+" not found");return}let r=T({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:X({el:r,xname:"wallet-new-instrument"},""),date:X({el:r,xname:"wallet-new-date"},""),totalPrice:+X({el:r,xname:"wallet-new-total-price"},""),unitPrice:+X({el:r,xname:"wallet-new-unit-price"},"")}),Xe(t),Nr(r),Ee()}),Lr=e=>{let t=te();return Se(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},Rr=()=>{ne()==="wallets"&&(Ze().forEach(e=>mt({xname:"updated-ago",xid:e.name},Lr(e.instruments))),setTimeout(Rr,5*1e3))},Wn=e=>{let t=te(),r=e.instruments.map(i=>{let c=t[i.code]?.latestPrice||0,l=i.totalPrice/i.unitPrice,d=c*l;return{id:i.id,instrumentName:t[i.code]?.name??"???",instrumentUrl:t[i.code]?.sourceUrl,instrumentType:t[i.code]?.type,change:d/i.totalPrice*100-100,currentTotal:d,currentUnit:c,unitCount:l,paidTotal:i.totalPrice,paidUnit:i.unitPrice,paidDate:i.date,updatedAt:t[i.code]?.latestUpdate||""}}),n=r.reduce((i,c)=>i+c.currentTotal,0),a=r.reduce((i,c)=>i+c.paidTotal,0),s=Lr(e.instruments);return{name:e.name,instruments:r,updatedAgo:s,totalValue:n,totalPaid:a,changeValue:O(n-a),changePercent:O(n/a*100-100)}},Hn=({wd:e})=>o("tr",{class:"total"},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},O(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},O(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),_n=({wd:e})=>o("div",{class:"title"},o("div",{xclick:An,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),o(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:$n},"Delete"),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,e.changeValue),"\xA0(",o("b",null,e.changePercent,"%"),")"),o("div",{class:""},"Value ",o("b",null,O(e.totalValue))),o("div",{class:""},"Paid ",o("b",null,O(e.totalPaid))))),Vn=({ins:e,walletName:t})=>o("tr",null,o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},O(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},O(e.change)),o("td",{class:"price"},O(e.currentTotal)),o("td",{class:"price"},O(e.currentUnit)),o("td",{class:"price"},O(e.unitCount)),o("td",{class:"price"},O(e.paidTotal)),o("td",{class:"price"},O(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(A,{xclick:Dn,xid:`${t}:${e.id}`,variant:"text"},"Delete"))),Fn=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),we().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:ct(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(A,{xclick:Un,xid:e.name},"Add"),o(A,{xclick:On,xid:e.name,variant:"text"},"Clear"))),zn=({wallet:e})=>{let t=Wn(e);return o("div",{xname:"wallet",xid:e.name},o(_n,{wd:t}),o("table",{xname:"instruments",xid:e.name,class:br({expanded:Me[e.name]})},o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"})),t.instruments.map(r=>o(Vn,{ins:r,walletName:t.name})),o(Hn,{wd:t}),o(Fn,{wallet:e})))},Pr=()=>{let e=o("div",{class:Ln},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(A,{xclick:Rn},"Create wallet"),"  ",o(A,{xclick:Pn,variant:"text"},"Clear")),o("div",{xname:"wallet-list"}));return e.onMount=()=>{dt=T({xname:"new-wallet-name"}),Ce=T({xname:"wallet-list"}),Ee(),Rr(),console.log("ViewWallets mounted!")},e};var Ne,ke,Ar=()=>{ke.focus();let e=ke.value.trim();!e||(ke.value="",Tt(e))},qn=_e((e,t)=>{It({done:!1,text:t,id:e})},500),Bn=g(I(),({xid:e=""})=>St(e)),jn=g(I(),Ar),Gn=g(rt(),({ev:e})=>{e.key==="Enter"&&Ar()}),Kn=g(rt(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&qn(t,r)});g(Ge,({todoId:e})=>{Le(Ne,T({el:Ne,xname:"todo",xid:e}))});g(je,({todo:e})=>{B(Ne,o(Or,{todo:e}))});var Or=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Bn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:Kn,xid:e.id,value:e.text})),Dr=()=>{let e=o("div",null,o("div",null,o("input",{xkeyup:Gn,xname:"new-item-text"}),"\xA0",o("button",{xclick:jn},"Add")),o("ol",{xname:"items"}));return e.onMount=async()=>{Ne=T({xname:"items"}),ke=T({xname:"new-item-text"}),ke.focus(),await Mt(),K(Ne,...bt().map(t=>o(Or,{todo:t}))),console.log("ViewTodo mounted!")},e};var Yn=H`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ve;g(I("migration-export:click"),()=>{let e=oe(),t=te();Z(Ve,JSON.stringify({instruments:t,wallets:e},null,2)),Ve.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(X(Ve,""));console.log({wallets:e,instruments:t}),await Rt(t),await $t(e),x(W,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var $r=()=>{let e=o("div",{class:Yn},o("div",null,o(A,{xname:"migration-export"},"Export from LS")," ",o(A,{xname:"migration-import"},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{Ve=T({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var Fe={home:{label:"Home",Component:Sr},wallets:{label:"Wallets",Component:Pr},instruments:{label:"Instruments",Component:Cr},todo:{label:"Todo",Component:Dr},migration:{label:"Data migration",Component:$r}},ne=()=>new URLSearchParams(window.location.search).get("view")||"home",Ur=()=>{let{Component:e,label:t}=Fe[ne()]||Fe.home;return{Component:e,label:t}};var Jn=H`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Wr=()=>{let[,...e]=Object.entries(Fe);return o("div",{class:Jn},o(it,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(it,{view:t},r.label))))};Tr`
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

`;var Hr;g(qe,()=>{let{Component:e}=Ur();K(Hr,o(e,null))});var _r=()=>{let e=o("div",{class:"app"},o(Wr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{Hr=T({xname:"current-view"}),console.log("App mounted!")},e};Ut();B(document.body,o(_r,null));wt();})();
