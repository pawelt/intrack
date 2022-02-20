(()=>{var B=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},K=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},Fe=(e,t,r)=>{let n=e.replaceChild(t,r);return t.onMount&&t.onMount(),n},Ne=(e,t)=>e.removeChild(t),j=({el:e=document,sel:t="",xname:r,xid:n})=>{let s=r?`[data-xname="${r}"]`:"",a=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${s}${a}`)},S=({el:e=document,sel:t="",xname:r,xid:n})=>{let s=r?`[data-xname="${r}"]`:"",a=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${s}${a}`)},pt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=j(e);n&&(n.innerHTML=""+t)},mt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=j(e);return n?.innerHTML!==void 0?n.innerHTML:t},Z=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=j(e);n&&(n.value=""+t)},X=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=j(e);return n?n.value:t},ft=()=>{let e=document.activeElement;return{$el:e,focus:()=>e?.focus?.()}},ht=(e,t,r)=>{t.querySelectorAll(e).forEach(n=>{let{xname:s,xid:a}=n.dataset;if(!s||!a)return;let i=j({el:r,xname:s,xid:a});if(!i)return;let c=i.parentElement;!c||Fe(c,n,i)})};var _r=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([s,a])=>{s.startsWith("on")&&typeof a=="function"?n.addEventListener(s.substring(2).toLowerCase(),a):s.startsWith("data-")?n.dataset[_r(s.substring(5))]=""+a:s==="xname"||s==="xid"?n.dataset[s]=""+a:(n.setAttribute(s,""+a),n[s]=a)}),r.flat().forEach(s=>B(n,typeof s=="object"?s:document.createTextNode(s))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>B(r,typeof n=="object"?n:document.createTextNode(n))),r};var ee={},Vr=1,g=(e,t)=>{let{type:r}=e({});if(r)return ee[r]=ee[r]||[],ee[r].push(t),{type:r,callback:t};let n="event-"+Vr++;return ee[n]=ee[n]||[],ee[n].push(t),{type:n,callback:t}},y=(e,t)=>{let r=0,{type:n}=e({});for(let s of ee[n]||[])s(t),r++;return r};var gt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let s=new URL(""+e);s.pathname=t??s.pathname;let a=r??n;if(!a)return s;let i=new URLSearchParams(r?s.search:"");for(let c in a){let l=a[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return s.search=""+i,s},ze=e=>({type:"router:navigate",payload:e}),qe=e=>{y(ze,{newUrl:new URL(e)})},xt=e=>{let t=""+e;window.history.pushState(null,"",t),qe(t)};var yt=()=>qe(window.location.href);window.addEventListener("popstate",()=>qe(window.location.href));var wt="todos",Y=[],Be=e=>({type:"store:item-created",payload:e}),Wr=e=>({type:"store:item-updated",payload:e}),je=e=>({type:"store:item-deleted",payload:e}),vt=()=>Y,bt=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Y.push(t),Ge().then(()=>y(Be,{todo:t}))},Tt=async e=>{let t=Y.find(r=>r.id===e.id);return t?(Object.assign(t,e),Ge().then(()=>y(Wr,{todo:t}))):!1},St=async e=>{let t=Y.findIndex(r=>r.id===e);return t<0?!1:(Y.splice(t,1),Ge().then(()=>y(je,{todoId:e})))},It=async()=>{Y=JSON.parse(localStorage.getItem(wt)||"[]"),console.log({todos:Y})},Ge=async()=>{localStorage.setItem(wt,JSON.stringify(Y))};var Mt=e=>fetch(`https://it.nottycanvas.com?target=${e}`),Ct=(e,t)=>fetch(`https://it.nottycanvas.com?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Le=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,s=((await(await Ct(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],a=t.replace(/-.+$/,"");return Object.assign(e,{name:s,isin:a,code:t,type:"S"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await Ct(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{try{if(!e.sourceUrl){alert("Error: empty source URL");return}let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await Mt(r)).json(),{ISIN:s,LONG_NAME:a}=n.rows[0].values;return Object.assign(e,{name:a,isin:s,code:t,type:"F"}),e}catch(t){alert("Failed to fetch initial data: "+t);return}},fetchCurrentPrice:async e=>{try{if(!e.code){console.log("Error: instrument code is missing in:",e);return}let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await Mt(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),!0}catch(t){return alert("Failed to fetch current price: "+t),!1}}}];var Ke="instruments",P={},U=e=>({type:"store:instruments-updated",payload:e}),ye=()=>Object.values(P),te=()=>P,Et=async e=>{if(P[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),P[t.code]=t,Ye().then(()=>y(U,{changes:[{instrument:t,op:"create"}]}))},Fr=async e=>{let{code:t=""}=e;if(!P[t])return!1;let r=P[t];return Object.assign(r,e),r.latestUpdate=new Date().toISOString(),Ye().then(()=>y(U,{changes:[{instrument:r,op:"update"}]}))},kt=async e=>{if(!P[e])return!1;let t=P[e];return delete P[e],Ye().then(()=>y(U,{changes:[{instrument:t,op:"delete"}]}))},zr=async()=>{P=JSON.parse(localStorage.getItem(Ke)||"{}"),Object.values(P).forEach(e=>e.type||(e.type="F")),console.log({instruments:P})},Ye=async()=>{localStorage.setItem(Ke,JSON.stringify(P))},Nt=async e=>{localStorage.setItem(Ke,JSON.stringify(e)),P=e},Lt=window;Lt.quick_refresh=!1;var qr=Lt.quick_refresh?.2:2,Br=10,Rt=async()=>{let e=[];for(let t of ye())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-qr*60*1e3){let r=Le.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}await r.fetchCurrentPrice(t)&&(await Fr(t),e.push({instrument:t,op:"update"}))}e.length&&y(U,{changes:e}),setTimeout(Rt,Br*1e3)};zr().then(()=>y(U,{changes:[]})).then(Rt);var Je="wallets",W={},jr=e=>({type:"store:wallet-created",payload:e}),Gr=e=>({type:"store:wallet-updated",payload:e}),Kr=e=>({type:"store:wallets-updated",payload:e});var Qe=()=>Object.values(W),we=()=>W,At=async e=>{if(W[e.name])return!1;let t={...e};return W[t.name]=t,Pt().then(()=>y(jr,{wallet:t}))},Ze=async e=>{let{name:t=""}=e;return W[t]?(W[t]=e,Pt().then(()=>y(Gr,{wallet:e}))):!1};var Yr=async()=>{W=JSON.parse(localStorage.getItem(Je)||"{}"),console.log({wallets:W})},Pt=async()=>{localStorage.setItem(Je,JSON.stringify(W))},Ot=async e=>{localStorage.setItem(Je,JSON.stringify(e)),W=e};Yr().then(()=>y(Kr,{}));var oe=e=>t=>({type:e,payload:t}),I=(e="")=>oe(e),et=(e="")=>oe(e),Xe=e=>t=>{let r=t.target,{xname:n="",xid:s=""}=r.dataset,{xclick:a,xkeyup:i,xkeydown:c}=r,l={xname:n,xid:s,ev:t};a&&e==="click"?y(oe(a.type),l):i&&e==="keyup"?y(oe(i.type),l):c&&e==="keydown"?y(oe(c.type),l):n&&y(oe(`${n}:${e}`),l)},Dt=()=>{document.addEventListener("click",Xe("click")),document.addEventListener("keyup",Xe("keyup")),document.addEventListener("keydown",Xe("keydown"))};var $t={};var Ut=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&($t[`${t}:${r}`]=e),e},Ht=(e="",t="")=>$t[`${e}:${t}`];function Jr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Qr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var _t=function(){function e(r){var n=this;this._insertTag=function(s){var a;n.tags.length===0?n.insertionPoint?a=n.insertionPoint.nextSibling:n.prepend?a=n.container.firstChild:a=n.before:a=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(s,a),n.tags.push(s)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Qr(this));var s=this.tags[this.tags.length-1];if(!1)var a;if(this.isSpeedy){var i=Jr(s);try{i.insertRule(n,i.cssRules.length)}catch{}}else s.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var T="-ms-",se="-moz-",m="-webkit-",Re="comm",ae="rule",ie="decl";var Vt="@import";var Ae="@keyframes";var Wt=Math.abs,re=String.fromCharCode,Ft=Object.assign;function zt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Pe(e){return e.trim()}function qt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ve(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function J(e,t,r){return e.slice(t,r)}function k(e){return e.length}function ce(e){return e.length}function le(e,t){return t.push(e),e}function Bt(e,t){return e.map(t).join("")}var Oe=1,ue=1,jt=0,N=0,v=0,pe="";function be(e,t,r,n,s,a,i){return{value:e,root:t,parent:r,type:n,props:s,children:a,line:Oe,column:ue,length:i,return:""}}function me(e,t){return Ft(be("",null,null,"",null,null,0),e,{length:-e.length},t)}function Gt(){return v}function Kt(){return v=N>0?M(pe,--N):0,ue--,v===10&&(ue=1,Oe--),v}function L(){return v=N<jt?M(pe,N++):0,ue++,v===10&&(ue=1,Oe++),v}function $(){return M(pe,N)}function Te(){return N}function fe(e,t){return J(pe,e,t)}function de(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function De(e){return Oe=ue=1,jt=k(pe=e),N=0,[]}function $e(e){return pe="",e}function he(e){return Pe(fe(N-1,tt(e===91?e+2:e===40?e+1:e)))}function Yt(e){for(;(v=$())&&v<33;)L();return de(e)>2||de(v)>3?"":" "}function Jt(e,t){for(;--t&&L()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return fe(e,Te()+(t<6&&$()==32&&L()==32))}function tt(e){for(;L();)switch(v){case e:return N;case 34:case 39:e!==34&&e!==39&&tt(v);break;case 40:e===41&&tt(e);break;case 92:L();break}return N}function Qt(e,t){for(;L()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+fe(t,N-1)+"*"+re(e===47?e:L())}function Zt(e){for(;!de($());)L();return fe(e,N)}function tr(e){return $e(Ue("",null,null,null,[""],e=De(e),0,[0],e))}function Ue(e,t,r,n,s,a,i,c,l){for(var p=0,d=0,h=i,R=0,q=0,O=0,x=1,A=1,b=1,C=0,_="",xe=s,G=a,V=n,w=_;A;)switch(O=C,C=L()){case 40:if(O!=108&&w.charCodeAt(h-1)==58){ve(w+=f(he(C),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=he(C);break;case 9:case 10:case 13:case 32:w+=Yt(O);break;case 92:w+=Jt(Te()-1,7);continue;case 47:switch($()){case 42:case 47:le(Zr(Qt(L(),Te()),t,r),l);break;default:w+="/"}break;case 123*x:c[p++]=k(w)*b;case 125*x:case 59:case 0:switch(C){case 0:case 125:A=0;case 59+d:q>0&&k(w)-h&&le(q>32?er(w+";",n,r,h-1):er(f(w," ","")+";",n,r,h-2),l);break;case 59:w+=";";default:if(le(V=Xt(w,t,r,p,d,s,c,_,xe=[],G=[],h),a),C===123)if(d===0)Ue(w,t,V,V,xe,a,h,c,G);else switch(R){case 100:case 109:case 115:Ue(e,V,V,n&&le(Xt(e,V,V,0,0,s,c,_,s,xe=[],h),G),s,G,h,c,n?xe:G);break;default:Ue(w,V,V,V,[""],G,0,c,G)}}p=d=q=0,x=b=1,_=w="",h=i;break;case 58:h=1+k(w),q=O;default:if(x<1){if(C==123)--x;else if(C==125&&x++==0&&Kt()==125)continue}switch(w+=re(C),C*x){case 38:b=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(k(w)-1)*b,b=1;break;case 64:$()===45&&(w+=he(L())),R=$(),d=h=k(_=w+=Zt(Te())),C++;break;case 45:O===45&&k(w)==2&&(x=0)}}return a}function Xt(e,t,r,n,s,a,i,c,l,p,d){for(var h=s-1,R=s===0?a:[""],q=ce(R),O=0,x=0,A=0;O<n;++O)for(var b=0,C=J(e,h+1,h=Wt(x=i[O])),_=e;b<q;++b)(_=Pe(x>0?R[b]+" "+C:f(C,/&\f/g,R[b])))&&(l[A++]=_);return be(e,t,r,s===0?ae:c,l,p,d)}function Zr(e,t,r){return be(e,t,r,Re,re(Gt()),J(e,2,-2),0)}function er(e,t,r,n){return be(e,t,r,ie,J(e,0,n),J(e,n+1,-1),n)}function rt(e,t){switch(zt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+se+e+T+e+e;case 6828:case 4268:return m+e+T+e+e;case 6165:return m+e+T+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return m+e+T+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+T+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+T+f(e,"shrink","negative")+e;case 5292:return m+e+T+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+T+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+se+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ve(e,"stretch")?rt(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~ve(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+T+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+T+e+e}return e}function Q(e,t){for(var r="",n=ce(e),s=0;s<n;s++)r+=t(e[s],s,e,t)||"";return r}function rr(e,t,r,n){switch(e.type){case Vt:case ie:return e.return=e.return||e.value;case Re:return"";case Ae:return e.return=e.value+"{"+Q(e.children,n)+"}";case ae:e.value=e.props.join(",")}return k(r=Q(e.children,n))?e.return=e.value+"{"+r+"}":""}function nr(e){var t=ce(e);return function(r,n,s,a){for(var i="",c=0;c<t;c++)i+=e[c](r,n,s,a)||"";return i}}function or(e){return function(t){t.root||(t=t.return)&&e(t)}}function sr(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case ie:e.return=rt(e.value,e.length);break;case Ae:return Q([me(e,{value:f(e.value,"@","@"+m)})],n);case ae:if(e.length)return Bt(e.props,function(s){switch(qt(s,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Q([me(e,{props:[f(s,/:(read-\w+)/,":"+se+"$1")]})],n);case"::placeholder":return Q([me(e,{props:[f(s,/:(plac\w+)/,":"+m+"input-$1")]}),me(e,{props:[f(s,/:(plac\w+)/,":"+se+"$1")]}),me(e,{props:[f(s,/:(plac\w+)/,T+"input-$1")]})],n)}return""})}}function Xr(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var ar=Xr;var en=function(t,r,n){for(var s=0,a=0;s=a,a=$(),s===38&&a===12&&(r[n]=1),!de(a);)L();return fe(t,N)},tn=function(t,r){var n=-1,s=44;do switch(de(s)){case 0:s===38&&$()===12&&(r[n]=1),t[n]+=en(N-1,r,n);break;case 2:t[n]+=he(s);break;case 4:if(s===44){t[++n]=$()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=re(s)}while(s=L());return t},rn=function(t,r){return $e(tn(De(t),r))},ir=new WeakMap,nn=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,s=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!ir.get(n))&&!s){ir.set(t,!0);for(var a=[],i=rn(r,a),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=a[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},on=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var sn=[sr],an=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(x){var A=x.getAttribute("data-emotion");A.indexOf(" ")!==-1&&(document.head.appendChild(x),x.setAttribute("data-s",""))})}var s=t.stylisPlugins||sn,a={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(x){for(var A=x.getAttribute("data-emotion").split(" "),b=1;b<A.length;b++)a[A[b]]=!0;c.push(x)});var l,p=[nn,on];{var d,h=[rr,or(function(x){d.insert(x)})],R=nr(p.concat(s,h)),q=function(A){return Q(tr(A),R)};l=function(A,b,C,_){d=C,q(A?A+"{"+b.styles+"}":b.styles),_&&(O.inserted[b.name]=!0)}}var O={key:r,sheet:new _t({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:a,registered:{},insert:l};return O.sheet.hydrate(c),O},cr=an;function cn(e){for(var t=0,r,n=0,s=e.length;s>=4;++n,s-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(s){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var lr=cn;var ln={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},ur=ln;var un=/[A-Z]|^ms/g,dn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,fr=function(t){return t.charCodeAt(1)===45},dr=function(t){return t!=null&&typeof t!="boolean"},nt=ar(function(e){return fr(e)?e:e.replace(un,"-$&").toLowerCase()}),pr=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(dn,function(n,s,a){return F={name:s,styles:a,next:F},s})}return ur[t]!==1&&!fr(t)&&typeof r=="number"&&r!==0?r+"px":r};function Se(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var s=r.styles+";";return s}return pn(e,t,r)}case"function":{if(e!==void 0){var a=F,i=r(e);return F=a,Se(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function pn(e,t,r){var n="";if(Array.isArray(r))for(var s=0;s<r.length;s++)n+=Se(e,t,r[s])+";";else for(var a in r){var i=r[a];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=a+"{"+t[i]+"}":dr(i)&&(n+=nt(a)+":"+pr(a,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)dr(i[c])&&(n+=nt(a)+":"+pr(a,i[c])+";");else{var l=Se(e,t,i);switch(a){case"animation":case"animationName":{n+=nt(a)+":"+l+";";break}default:n+=a+"{"+l+"}"}}}return n}var mr=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,He=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var s=!0,a="";F=void 0;var i=t[0];i==null||i.raw===void 0?(s=!1,a+=Se(n,r,i)):a+=i[0];for(var c=1;c<t.length;c++)a+=Se(n,r,t[c]),s&&(a+=i[c]);var l;mr.lastIndex=0;for(var p="",d;(d=mr.exec(a))!==null;)p+="-"+d[1];var h=lr(a)+p;return{name:h,styles:a,next:F}};var mn=!0;function ot(e,t,r){var n="";return r.split(" ").forEach(function(s){e[s]!==void 0?t.push(e[s]+";"):n+=s+" "}),n}var hr=function(t,r,n){var s=t.key+"-"+r.name;if((n===!1||mn===!1)&&t.registered[s]===void 0&&(t.registered[s]=r.styles),t.inserted[r.name]===void 0){var a=r;do{var i=t.insert(r===a?"."+s:"",a,t.sheet,!0);a=a.next}while(a!==void 0)}};function gr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function xr(e,t,r){var n=[],s=ot(e,n,r);return n.length<2?r:s+t(n)}var fn=function(t){var r=cr(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered,void 0);return hr(r,h,!1),r.key+"-"+h.name},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered),R="animation-"+h.name;return gr(r,{name:h.name,styles:"@keyframes "+R+"{"+h.styles+"}"}),R},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=He(p,r.registered);gr(r,h)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return xr(r.registered,n,hn(p))};return{css:n,cx:i,injectGlobal:a,keyframes:s,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:ot.bind(null,r.registered),merge:xr.bind(null,r.registered,n)}},hn=function e(t){for(var r="",n=0;n<t.length;n++){var s=t[n];if(s!=null){var a=void 0;switch(typeof s){case"boolean":break;case"object":{if(Array.isArray(s))a=e(s);else{a="";for(var i in s)s[i]&&i&&(a&&(a+=" "),a+=i)}break}default:a=s}a&&(r&&(r+=" "),r+=a)}}return r},yr=fn;var z=yr({key:"css"}),ls=z.flush,us=z.hydrate,wr=z.cx,ds=z.merge,ps=z.getRegisteredStyles,vr=z.injectGlobal,ms=z.keyframes,H=z.css,fs=z.sheet,hs=z.cache;var gn=H`
  cursor: pointer;
`,xn=H`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,D=(e,...t)=>{let r={...e};return r.disabled||delete r.disabled,o("button",{class:r.variant==="text"?xn:gn,...r},t)},st=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+gt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:s=>{s.preventDefault();let{href:a}=s.currentTarget;a&&a!==window.location.href&&xt(a)},...r},t)};var br="view-home",Tr=()=>{let e=Ht(br),t=Ut(o("div",{xname:br},"Home rendered ",o("strong",{xname:"xxx"},+mt({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",j({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var _e=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var Ss=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),yn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),wn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var at=e=>{let t=yn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},E=e=>wn.format(e),Ie=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,s=Math.floor((n.getTime()-r.getTime())/1e3),a=Math.floor(s/3600),i=Math.floor((s-a*3600)/60),c=s-a*3600-i*60,l=`${a>0?a+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var vn=H`
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
`,lt,ge,Sr=({changes:e})=>{if(ne()==="instruments")if(!e.length)K(ge,...ye().map(t=>o(it,{instrument:t})));else for(let t of e){let r=j({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":B(ge,o(it,{instrument:t.instrument}));break;case"update":r&&Fe(ge,o(it,{instrument:t.instrument}),r);break;case"delete":r&&Ne(ge,r);break}}};g(U,Sr);var ct=()=>lt.value="",bn=g(I(),ct),Tn=g(I(),async()=>{let e=lt.value,t=Le.find(n=>n.matchSource(e));if(!t){alert("Unrecognised URL");return}let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name){alert("Failed to fetch instrument data");return}if(te()[r.code||""]){ct();return}if(!await t.fetchCurrentPrice(r)){alert("Failed to fetch instrument data");return}await Et(r),ct()}),Sn=g(I(),async({xid:e})=>{!e||!confirm("Removing instrument:  "+e+`
It will NOT be removed from wallets (you will need to do it manually)`)||await kt(e)}),it=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Ie(e.latestUpdate)),o("td",null,o(D,{xclick:Sn,xid:e.code,variant:"text"},"Delete"))),Ir=()=>{let e=o("div",{class:vn},o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),o("div",null,o("input",{xname:"new-instrument"}),"  ",o(D,{xclick:Tn},"Add instrument"),"  ",o(D,{xclick:bn,variant:"text"},"Clear")),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"}));return e.onMount=()=>{lt=S({xname:"new-instrument"}),ge=S({xname:"instrument-list"}),Sr({changes:[]}),Mr(),console.log("ViewInstruments mounted!")},e},Mr=()=>{ne()==="instruments"&&(ge.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Ie(t.dataset.latestUpdate||"")}),setTimeout(Mr,5e3))};var In=H`
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
`,dt,ut,Me={},Cr=()=>{dt.value=""},Er=e=>{Z({el:e,xname:"wallet-new-total-price"},""),Z({el:e,xname:"wallet-new-unit-price"},""),Z({el:e,xname:"wallet-new-date"},at(new Date)),Z({el:e,xname:"wallet-new-instrument"},"")},Ce=({changes:e}={})=>{if(ne()!=="wallets")return;let t=o(u,null,Qe().map(n=>o(Rn,{wallet:n}))),r=ft();ht(".new-instrument-field",ut,t),K(ut,t),r.focus()};g(U,_e(Ce,500));var Mn=g(I(),async()=>{let e=dt?.value||"";if(!e)return;await At({name:e,comment:"",instruments:[]}),Cr(),Me[e]=!0,Ce()}),Cn=g(I(),Cr),En=g(I(),({xid:e=""})=>{Me[e]=!Me[e],S({xname:"instruments",xid:e}).classList.toggle("expanded",Me[e])}),kn=g(I(),({xid:e=""})=>{Er(S({xname:"wallet",xid:e}))}),Nn=g(I(),({xid:e=""})=>{let[t,r]=e.split(":"),n=we()[t],s=n.instruments.find(({id:a})=>""+a===r);!n||!confirm(`Delete instrument ${s?.code} from wallet ${n.name}?`)||(n.instruments=n.instruments.filter(({id:a})=>""+a!==r),Ze(n),Ce())}),Ln=g(I(),({xid:e=""})=>{let t=we()[e];if(!t){alert("Wallet "+e+" not found");return}let r=S({xname:"wallet",xid:e});t.instruments.push({id:Date.now(),code:X({el:r,xname:"wallet-new-instrument"},""),date:X({el:r,xname:"wallet-new-date"},""),totalPrice:+X({el:r,xname:"wallet-new-total-price"},""),unitPrice:+X({el:r,xname:"wallet-new-unit-price"},"")}),Ze(t),Er(r),Ce()}),kr=e=>{let t=te();return Ie(e.reduce((r,n)=>{let s=t[n.code]?.latestUpdate||"";return r<s?r:s},new Date("2030-01-01").toISOString()))},Nr=()=>{ne()==="wallets"&&(Qe().forEach(e=>pt({xname:"updated-ago",xid:e.name},kr(e.instruments))),setTimeout(Nr,5*1e3))},Rn=({wallet:e})=>{let t=te(),r=e.instruments.map(i=>{let c=t[i.code]?.latestPrice||0,l=i.totalPrice/i.unitPrice,p=c*l;return{id:i.id,instrumentName:t[i.code]?.name??"???",instrumentUrl:t[i.code]?.sourceUrl,instrumentType:t[i.code]?.type,change:p/i.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:i.totalPrice,paidUnit:i.unitPrice,paidDate:i.date,updatedAt:t[i.code]?.latestUpdate||""}}),n=r.reduce((i,c)=>i+c.currentTotal,0),s=r.reduce((i,c)=>i+c.paidTotal,0),a=kr(e.instruments);return o("div",{xname:"wallet",xid:e.name},o("div",{class:"title"},o("div",{xclick:En,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},a),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,E(n-s)),"\xA0(",o("b",null,E(n/s*100-100),"%"),")"),o("div",{class:""},"Value ",o("b",null,E(n))),o("div",{class:""},"Paid ",o("b",null,E(s))))),o("table",{xname:"instruments",xid:e.name,class:wr({expanded:Me[e.name]})},o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"})),r.map(i=>o("tr",null,o("td",{class:"instrument-name"},o("a",{href:i.instrumentUrl,target:"_blank"},"(",i.instrumentType,") ",i.instrumentName)),o("td",{class:"price"},E(i.currentTotal-i.paidTotal)),o("td",{class:"percent"},E(i.change)),o("td",{class:"price"},E(i.currentTotal)),o("td",{class:"price"},E(i.currentUnit)),o("td",{class:"price"},E(i.unitCount)),o("td",{class:"price"},E(i.paidTotal)),o("td",{class:"price"},E(i.paidUnit)),o("td",{class:"date"},i.paidDate),o("td",{class:"actions"},o(D,{xclick:Nn,xid:`${e.name}:${i.id}`,variant:"text"},"Delete")))),o("tr",{class:"total"},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},E(n-s)),o("td",{class:"percent"},E(n/s*100-100)),o("td",{class:"price"},E(n)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},E(s)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:"new-instrument-field"},o("option",{value:""}),ye().map(i=>o("option",{value:i.code},"(",i.type,") ",i.name)))),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:"new-instrument-field"})),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:"new-instrument-field"})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:at(new Date),class:"new-instrument-field"})),o("td",{class:"actions"},o(D,{xclick:Ln,xid:e.name},"Add"),o(D,{xclick:kn,xid:e.name,variant:"text"},"Clear")))))},Lr=()=>{let e=o("div",{class:In},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(D,{xclick:Mn},"Create wallet"),"  ",o(D,{xclick:Cn,variant:"text"},"Clear")),o("div",{xname:"wallet-list"}));return e.onMount=()=>{dt=S({xname:"new-wallet-name"}),ut=S({xname:"wallet-list"}),Ce(),Nr(),console.log("ViewWallets mounted!")},e};var ke,Ee,Rr=()=>{Ee.focus();let e=Ee.value.trim();!e||(Ee.value="",bt(e))},An=_e((e,t)=>{Tt({done:!1,text:t,id:e})},500),Pn=g(I(),({xid:e=""})=>St(e)),On=g(I(),Rr),Dn=g(et(),({ev:e})=>{e.key==="Enter"&&Rr()}),$n=g(et(),({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&An(t,r)});g(je,({todoId:e})=>{Ne(ke,S({el:ke,xname:"todo",xid:e}))});g(Be,({todo:e})=>{B(ke,o(Ar,{todo:e}))});var Ar=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Pn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:$n,xid:e.id,value:e.text})),Pr=()=>{let e=o("div",null,o("div",null,o("input",{xkeyup:Dn,xname:"new-item-text"}),"\xA0",o("button",{xclick:On},"Add")),o("ol",{xname:"items"}));return e.onMount=async()=>{ke=S({xname:"items"}),Ee=S({xname:"new-item-text"}),Ee.focus(),await It(),K(ke,...vt().map(t=>o(Ar,{todo:t}))),console.log("ViewTodo mounted!")},e};var Un=H`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 400px;
  }
`,Ve;g(I("migration-export:click"),()=>{let e=we(),t=te();Z(Ve,JSON.stringify({instruments:t,wallets:e},null,2)),Ve.select()});g(I("migration-import:click"),async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(X(Ve,""));console.log({wallets:e,instruments:t}),await Nt(t),await Ot(e),y(U,{changes:[]})}catch(e){alert("Failed to load data: "+e)}});var Or=()=>{let e=o("div",{class:Un},o("div",null,o(D,{xname:"migration-export"},"Export from LS")," ",o(D,{xname:"migration-import"},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{Ve=S({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var We={home:{label:"Home",Component:Tr},wallets:{label:"Wallets",Component:Lr},instruments:{label:"Instruments",Component:Ir},todo:{label:"Todo",Component:Pr},migration:{label:"Data migration",Component:Or}},ne=()=>new URLSearchParams(window.location.search).get("view")||"home",Dr=()=>{let{Component:e,label:t}=We[ne()]||We.home;return{Component:e,label:t}};var Hn=H`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,$r=()=>{let[,...e]=Object.entries(We);return o("div",{class:Hn},o(st,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(st,{view:t},r.label))))};vr`
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

`;var Ur;g(ze,()=>{let{Component:e}=Dr();K(Ur,o(e,null))});var Hr=()=>{let e=o("div",{class:"app"},o($r,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{Ur=S({xname:"current-view"}),console.log("App mounted!")},e};Dt();B(document.body,o(Hr,null));yt();})();
