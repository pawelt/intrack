"use strict";(()=>{var yt=(E,...S)=>{E.replaceChildren(...S);for(let T of S)T.onMount?.()},$e=(E,S)=>{let T=E.appendChild(S);return S.onMount?.(),T},Ue=(E,S)=>{let T=E?.parentElement;if(!T)return null;let I=T.replaceChild(S,E);return S.onMount?.(),I},wt=({el:E=document,sel:S="",xname:T,xid:I})=>{let M=T?`[data-xname="${T}"]`:"",k=I?`[data-xid="${I}"]`:"";return E.querySelector(`${S}${M}${k}`)},K=E=>{let S=()=>wt({xname:E});return S.xname=E,S.toString=()=>E,S},Ve=E=>{let S=T=>wt({xname:E,xid:T});return S.xname=E,S.toString=()=>E,S},De=E=>{let S=T=>wt({xname:E,el:T});return S.xname=E,S.toString=()=>E,S},st=E=>{let S=T=>wt({xid:E,el:T});return S.xid=E,S.toString=()=>E,S};var Dr={};var Wr=E=>{let{xname:S="",xid:T=""}=E.dataset;return(S||T)&&(Dr[`${S}:${T}`]=E),E},$r=(E="",S="")=>Dr[`${E}:${S}`];var ze={},$o=1,$=(E,S)=>{let{type:T}=E({});if(T)return ze[T]=ze[T]||[],ze[T].push(S),{type:T,callback:S};let I="event-"+$o++;return ze[I]=ze[I]||[],ze[I].push(S),{type:I,callback:S}},B=(E,S)=>{let T=0,{type:I}=E({});for(let M of ze[I]||[])M(S),T++;return T};var it=(E="")=>S=>({type:E,payload:S}),j=it(),$t=it(),Wt=E=>S=>{let T=S.target,{xclick:I,xkeyup:M,xkeydown:k}=T,{xname:N="",xid:C=""}=T.dataset,L={xname:N,xid:C,ev:S};return I&&E==="click"?B(it(I.type),L):M&&E==="keyup"?B(it(M.type),L):k&&E==="keydown"?B(it(k.type),L):0},Ur=()=>{document.addEventListener("click",Wt("click")),document.addEventListener("keyup",Wt("keyup")),document.addEventListener("keydown",Wt("keydown"))};var Vr=({url:E=window.location.href,pathname:S,searchAdd:T,searchSet:I})=>{let M=new URL(""+E);M.pathname=S??M.pathname;let k=T??I;if(!k)return M;let N=new URLSearchParams(T?M.search:"");for(let C in k){let L=k[C];Array.isArray(L)?(N.delete(C),L.forEach(P=>N.append(C,P))):L!==void 0?N.set(C,L):N.delete(C)}return M.search=""+N,M},Ut=E=>B(Vt,{newUrl:new URL(E)}),Vt=E=>({type:"router:navigate",payload:E}),_r=E=>{let S=""+E;window.history.pushState(null,"",S),Ut(S)},Hr=()=>{window.addEventListener("popstate",()=>Ut(window.location.href)),Ut(window.location.href)};var Fr="todos",_e=[],_t=E=>({type:"store:item-created",payload:E}),Uo=E=>({type:"store:item-updated",payload:E}),Ht=E=>({type:"store:item-deleted",payload:E}),zr=()=>_e,Br=async E=>{let S={text:E,done:!1,id:new Date().toISOString()};return _e.push(S),Ft().then(()=>B(_t,{todo:S}))},jr=async E=>{let S=_e.find(T=>T.id===E.id);return S?(Object.assign(S,E),Ft().then(()=>B(Uo,{todo:S}))):!1},Xr=async E=>{let S=_e.findIndex(T=>T.id===E);return S<0?!1:(_e.splice(S,1),Ft().then(()=>B(Ht,{todoId:E})))},qr=async()=>{_e=JSON.parse(localStorage.getItem(Fr)||"[]"),console.log({todos:_e})},Ft=async()=>{localStorage.setItem(Fr,JSON.stringify(_e))};var Vo=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",Kr=(E,S)=>fetch(`${Vo}?target=${E}`,{method:"POST",body:S,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),Gr=E=>{if(!E.code)throw new Error(`Error: instrument code is missing in: ${E.name}`)},Yr=E=>{if(!E.sourceUrl)throw new Error("Error: empty source URL");return!0},zt=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:E=>E.includes("product/equities/")&&E.includes("live.euronext.com/"),fetchInitialData:async E=>{if(!Yr(E))return E;let S=(E.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],T=`https://live.euronext.com/en/ajax/getDetailedQuote/${S}`,M=((await(await Kr(T,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],k=S.replace(/-.+$/,"");return Object.assign(E,{name:M,isin:k,code:S,type:"S"}),E},fetchCurrentPrice:async E=>{Gr(E);let S=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${E.isin}-recent.json?${Date.now()}`,I=(await(await fetch(S)).json())?.data?.pop()||{time:"0",price:0};return E.latestPrice=I.price,E.latestTimestamp=new Date(I.time).toISOString(),E}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:E=>E.includes("product/funds/")&&E.includes("live.euronext.com/"),fetchInitialData:async E=>{if(!Yr(E))return E;let[,S,T]=E.sourceUrl.match(/funds\/([^/.]+)\.([^/.]+)/)||[],I=`https://live.euronext.com/en/ajax/getDetailedQuote/${S}.${T}`,k=((await(await Kr(I,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1];return Object.assign(E,{name:k,isin:S,code:T,type:"F"}),E},fetchCurrentPrice:async E=>{Gr(E);let S=`https://raw.githubusercontent.com/pawelt/intrack-data/master/data/${E.isin}-recent.json?${Date.now()}`,I=(await(await fetch(S)).json())?.data?.pop()||{time:"0",price:0};return E.latestPrice=I.price,E.latestTimestamp=new Date(I.time).toISOString(),E}}];var Bt="instruments",Te={},He=E=>({type:"store:instruments-updated",payload:E}),ct=()=>Object.values(Te),Re=()=>Te,_o=async E=>{if(Te[E.code])return!1;let S={...E};return S.latestUpdate=new Date().toISOString(),Te[S.code]=S,jt().then(()=>B(He,{changes:[{instrument:S,op:"create"}]}))},Ho=async(E,S)=>{let{code:T=""}=E;if(!Te[T])return!1;let I=Te[T];return Object.assign(I,E),I.latestUpdate=new Date().toISOString(),jt().then(()=>S&&B(He,{changes:[{instrument:I,op:"update"}]}))},Qr=async E=>{if(!Te[E])return!1;let S=Te[E];return delete Te[E],jt().then(()=>B(He,{changes:[{instrument:S,op:"delete"}]}))},Zr=async()=>{Te=JSON.parse(localStorage.getItem(Bt)||"{}"),Object.values(Te).forEach(E=>E.type||(E.type="F")),console.log({instruments:Te})},jt=async()=>{localStorage.setItem(Bt,JSON.stringify(Te))},en=async E=>{localStorage.setItem(Bt,JSON.stringify(E)),Te=E},Fo=Object.assign(window,{fetchUpdatesFreq:5}),zo=()=>Fo.fetchUpdatesFreq,Bo=5,Jr=0,lt=async(E=zo())=>{clearTimeout(Jr);let S=[];for(let T of ct())if(!T.latestUpdate||new Date(T.latestUpdate).getTime()<Date.now()-E*60*1e3){let I=zt.find(M=>M.name===T.sourceName);if(!I){console.log("Error: source not found:",T);continue}try{await I.fetchCurrentPrice(T),await Ho(T,!1),S.push({instrument:T,op:"update"})}catch{}}S.length&&B(He,{changes:S}),Jr=setTimeout(lt,Bo*1e3)},tn=async E=>{let S=zt.find(I=>I.matchSource(E));if(!S)throw new Error("Unrecognised URL");let T={sourceUrl:E,sourceName:S.name};if(await S.fetchInitialData(T),!T.name)throw new Error("Failed to fetch instrument data");if(Re()[T.code||""])throw new Error("Instrument already registered");await S.fetchCurrentPrice(T),await _o(T)};var rn=(E,S)=>{let T;return(...I)=>{clearTimeout(T),T=setTimeout(()=>E(...I),S)}};var Ts=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),jo=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),Xo=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var Xt=E=>{let S=jo.formatToParts(typeof E=="string"?new Date(E):E);return`${S[4].value}-${S[2].value}-${S[0].value}`},Y=E=>Xo.format(E),ut=(E,S=new Date)=>{let T=typeof E=="string"?new Date(E):E,I=typeof S=="string"?new Date(S):S,M=Math.floor((I.getTime()-T.getTime())/1e3),k=Math.floor(M/3600),N=Math.floor((M-k*3600)/60),C=M-k*3600-N*60,L=`${k>0?k+"h":""} ${N>0?N+"m":""} ${C>0?C+"s":""}`.trim();return L?L+" ago":"just now"};var qt="wallets",Me={},Kt=E=>({type:"store:wallet-created",payload:E}),Gt=E=>({type:"store:wallet-updated",payload:E}),Yt=E=>({type:"store:wallet-deleted",payload:E}),vt=()=>Object.values(Me),Ke=()=>Me,nn=async E=>{if(Me[E.name])return!1;let S={...E};return Me[S.name]=S,Qt().then(()=>B(Kt,{wallet:S}))},Jt=async(E,S)=>{let{name:T=""}=E;return Me[T]?(Me[T]=E,Qt().then(()=>B(Gt,{wallet:E,modifiedInstrumentId:S}))):!1},on=async E=>Me[E]?(delete Me[E],Qt().then(()=>B(Yt,{name:E}))):!1,an=async()=>{Me=JSON.parse(localStorage.getItem(qt)||"{}"),console.log({wallets:Me})},Qt=async()=>{localStorage.setItem(qt,JSON.stringify(Me))},sn=async E=>{localStorage.setItem(qt,JSON.stringify(E)),Me=E},Zt=E=>{let S=Re();return ut(E.reduce((T,I)=>{let M=S[I.code]?.latestUpdate||"";return T<M?T:M},new Date("2030-01-01").toISOString()))},bt=E=>{let S=Re(),T=E.instruments.map(k=>{let N=S[k.code],C=N?.latestPrice||0,L=k.totalPrice/k.unitPrice,P=C*L;return{id:k.id,instrumentName:N?.name??"???",instrumentUrl:N?.sourceUrl,instrumentType:N?.type,change:P/k.totalPrice*100-100,currentTotal:P,currentUnit:C,unitCount:L,paidTotal:k.totalPrice,paidUnit:k.unitPrice,paidDate:k.date,updatedAt:N?.latestUpdate||""}}),I=T.reduce((k,N)=>k+N.currentTotal,0),M=T.reduce((k,N)=>k+N.paidTotal,0);return{name:E.name,instruments:T,totalValue:I,totalPaid:M,changeValue:Y(I-M),changePercent:Y(I/M*100-100),updatedAgo:Zt(E.instruments)}};function qo(E){if(E.sheet)return E.sheet;for(var S=0;S<document.styleSheets.length;S++)if(document.styleSheets[S].ownerNode===E)return document.styleSheets[S]}function Ko(E){var S=document.createElement("style");return S.setAttribute("data-emotion",E.key),E.nonce!==void 0&&S.setAttribute("nonce",E.nonce),S.appendChild(document.createTextNode("")),S.setAttribute("data-s",""),S}var cn=function(){function E(T){var I=this;this._insertTag=function(M){var k;I.tags.length===0?I.insertionPoint?k=I.insertionPoint.nextSibling:I.prepend?k=I.container.firstChild:k=I.before:k=I.tags[I.tags.length-1].nextSibling,I.container.insertBefore(M,k),I.tags.push(M)},this.isSpeedy=T.speedy===void 0?!0:T.speedy,this.tags=[],this.ctr=0,this.nonce=T.nonce,this.key=T.key,this.container=T.container,this.prepend=T.prepend,this.insertionPoint=T.insertionPoint,this.before=null}var S=E.prototype;return S.hydrate=function(I){I.forEach(this._insertTag)},S.insert=function(I){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Ko(this));var M=this.tags[this.tags.length-1];if(!1)var k;if(this.isSpeedy){var N=qo(M);try{N.insertRule(I,N.cssRules.length)}catch{}}else M.appendChild(document.createTextNode(I));this.ctr++},S.flush=function(){this.tags.forEach(function(I){return I.parentNode&&I.parentNode.removeChild(I)}),this.tags=[],this.ctr=0},E}();var X="-ms-",dt="-moz-",W="-webkit-",Et="comm",Ge="rule",Ye="decl";var ln="@import";var St="@keyframes";var un=Math.abs,Be=String.fromCharCode,dn=Object.assign;function pn(E,S){return H(E,0)^45?(((S<<2^H(E,0))<<2^H(E,1))<<2^H(E,2))<<2^H(E,3):0}function Tt(E){return E.trim()}function er(E,S){return(E=S.exec(E))?E[0]:E}function D(E,S,T){return E.replace(S,T)}function pt(E,S){return E.indexOf(S)}function H(E,S){return E.charCodeAt(S)|0}function Fe(E,S,T){return E.slice(S,T)}function J(E){return E.length}function Je(E){return E.length}function Qe(E,S){return S.push(E),E}function tr(E,S){return E.map(S).join("")}var It=1,Ze=1,mn=0,Q=0,F=0,tt="";function mt(E,S,T,I,M,k,N){return{value:E,root:S,parent:T,type:I,props:M,children:k,line:It,column:Ze,length:N,return:""}}function rt(E,S){return dn(mt("",null,null,"",null,null,0),E,{length:-E.length},S)}function fn(){return F}function hn(){return F=Q>0?H(tt,--Q):0,Ze--,F===10&&(Ze=1,It--),F}function Z(){return F=Q<mn?H(tt,Q++):0,Ze++,F===10&&(Ze=1,It++),F}function ke(){return H(tt,Q)}function ft(){return Q}function nt(E,S){return Fe(tt,E,S)}function et(E){switch(E){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Mt(E){return It=Ze=1,mn=J(tt=E),Q=0,[]}function kt(E){return tt="",E}function ot(E){return Tt(nt(Q-1,rr(E===91?E+2:E===40?E+1:E)))}function gn(E){for(;(F=ke())&&F<33;)Z();return et(E)>2||et(F)>3?"":" "}function xn(E,S){for(;--S&&Z()&&!(F<48||F>102||F>57&&F<65||F>70&&F<97););return nt(E,ft()+(S<6&&ke()==32&&Z()==32))}function rr(E){for(;Z();)switch(F){case E:return Q;case 34:case 39:E!==34&&E!==39&&rr(F);break;case 40:E===41&&rr(E);break;case 92:Z();break}return Q}function yn(E,S){for(;Z()&&E+F!==47+10;)if(E+F===42+42&&ke()===47)break;return"/*"+nt(S,Q-1)+"*"+Be(E===47?E:Z())}function wn(E){for(;!et(ke());)Z();return nt(E,Q)}function En(E){return kt(Nt("",null,null,null,[""],E=Mt(E),0,[0],E))}function Nt(E,S,T,I,M,k,N,C,L){for(var P=0,R=0,U=N,G=0,Pe=0,Ie=0,V=1,Se=1,z=1,q=0,Ce="",at=M,We=k,Le=I,_=Ce;Se;)switch(Ie=q,q=Z()){case 40:if(Ie!=108&&H(_,U-1)==58){pt(_+=D(ot(q),"&","&\f"),"&\f")!=-1&&(z=-1);break}case 34:case 39:case 91:_+=ot(q);break;case 9:case 10:case 13:case 32:_+=gn(Ie);break;case 92:_+=xn(ft()-1,7);continue;case 47:switch(ke()){case 42:case 47:Qe(Go(yn(Z(),ft()),S,T),L);break;default:_+="/"}break;case 123*V:C[P++]=J(_)*z;case 125*V:case 59:case 0:switch(q){case 0:case 125:Se=0;case 59+R:Pe>0&&J(_)-U&&Qe(Pe>32?bn(_+";",I,T,U-1):bn(D(_," ","")+";",I,T,U-2),L);break;case 59:_+=";";default:if(Qe(Le=vn(_,S,T,P,R,M,C,Ce,at=[],We=[],U),k),q===123)if(R===0)Nt(_,S,Le,Le,at,k,U,C,We);else switch(G===99&&H(_,3)===110?100:G){case 100:case 109:case 115:Nt(E,Le,Le,I&&Qe(vn(E,Le,Le,0,0,M,C,Ce,M,at=[],U),We),M,We,U,C,I?at:We);break;default:Nt(_,Le,Le,Le,[""],We,0,C,We)}}P=R=Pe=0,V=z=1,Ce=_="",U=N;break;case 58:U=1+J(_),Pe=Ie;default:if(V<1){if(q==123)--V;else if(q==125&&V++==0&&hn()==125)continue}switch(_+=Be(q),q*V){case 38:z=R>0?1:(_+="\f",-1);break;case 44:C[P++]=(J(_)-1)*z,z=1;break;case 64:ke()===45&&(_+=ot(Z())),G=ke(),R=U=J(Ce=_+=wn(ft())),q++;break;case 45:Ie===45&&J(_)==2&&(V=0)}}return k}function vn(E,S,T,I,M,k,N,C,L,P,R){for(var U=M-1,G=M===0?k:[""],Pe=Je(G),Ie=0,V=0,Se=0;Ie<I;++Ie)for(var z=0,q=Fe(E,U+1,U=un(V=N[Ie])),Ce=E;z<Pe;++z)(Ce=Tt(V>0?G[z]+" "+q:D(q,/&\f/g,G[z])))&&(L[Se++]=Ce);return mt(E,S,T,M===0?Ge:C,L,P,R)}function Go(E,S,T){return mt(E,S,T,Et,Be(fn()),Fe(E,2,-2),0)}function bn(E,S,T,I){return mt(E,S,T,Ye,Fe(E,0,I),Fe(E,I+1,-1),I)}function je(E,S){for(var T="",I=Je(E),M=0;M<I;M++)T+=S(E[M],M,E,S)||"";return T}function Sn(E,S,T,I){switch(E.type){case ln:case Ye:return E.return=E.return||E.value;case Et:return"";case St:return E.return=E.value+"{"+je(E.children,I)+"}";case Ge:E.value=E.props.join(",")}return J(T=je(E.children,I))?E.return=E.value+"{"+T+"}":""}function Tn(E){var S=Je(E);return function(T,I,M,k){for(var N="",C=0;C<S;C++)N+=E[C](T,I,M,k)||"";return N}}function In(E){return function(S){S.root||(S=S.return)&&E(S)}}function Yo(E){var S=Object.create(null);return function(T){return S[T]===void 0&&(S[T]=E(T)),S[T]}}var Mn=Yo;var Jo=function(S,T,I){for(var M=0,k=0;M=k,k=ke(),M===38&&k===12&&(T[I]=1),!et(k);)Z();return nt(S,Q)},Qo=function(S,T){var I=-1,M=44;do switch(et(M)){case 0:M===38&&ke()===12&&(T[I]=1),S[I]+=Jo(Q-1,T,I);break;case 2:S[I]+=ot(M);break;case 4:if(M===44){S[++I]=ke()===58?"&\f":"",T[I]=S[I].length;break}default:S[I]+=Be(M)}while(M=Z());return S},Zo=function(S,T){return kt(Qo(Mt(S),T))},kn=new WeakMap,ea=function(S){if(!(S.type!=="rule"||!S.parent||S.length<1)){for(var T=S.value,I=S.parent,M=S.column===I.column&&S.line===I.line;I.type!=="rule";)if(I=I.parent,!I)return;if(!(S.props.length===1&&T.charCodeAt(0)!==58&&!kn.get(I))&&!M){kn.set(S,!0);for(var k=[],N=Zo(T,k),C=I.props,L=0,P=0;L<N.length;L++)for(var R=0;R<C.length;R++,P++)S.props[P]=k[L]?N[L].replace(/&\f/g,C[R]):C[R]+" "+N[L]}}},ta=function(S){if(S.type==="decl"){var T=S.value;T.charCodeAt(0)===108&&T.charCodeAt(2)===98&&(S.return="",S.value="")}};function Nn(E,S){switch(pn(E,S)){case 5103:return W+"print-"+E+E;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return W+E+E;case 5349:case 4246:case 4810:case 6968:case 2756:return W+E+dt+E+X+E+E;case 6828:case 4268:return W+E+X+E+E;case 6165:return W+E+X+"flex-"+E+E;case 5187:return W+E+D(E,/(\w+).+(:[^]+)/,W+"box-$1$2"+X+"flex-$1$2")+E;case 5443:return W+E+X+"flex-item-"+D(E,/flex-|-self/,"")+E;case 4675:return W+E+X+"flex-line-pack"+D(E,/align-content|flex-|-self/,"")+E;case 5548:return W+E+X+D(E,"shrink","negative")+E;case 5292:return W+E+X+D(E,"basis","preferred-size")+E;case 6060:return W+"box-"+D(E,"-grow","")+W+E+X+D(E,"grow","positive")+E;case 4554:return W+D(E,/([^-])(transform)/g,"$1"+W+"$2")+E;case 6187:return D(D(D(E,/(zoom-|grab)/,W+"$1"),/(image-set)/,W+"$1"),E,"")+E;case 5495:case 3959:return D(E,/(image-set\([^]*)/,W+"$1$`$1");case 4968:return D(D(E,/(.+:)(flex-)?(.*)/,W+"box-pack:$3"+X+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+W+E+E;case 4095:case 3583:case 4068:case 2532:return D(E,/(.+)-inline(.+)/,W+"$1$2")+E;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(J(E)-1-S>6)switch(H(E,S+1)){case 109:if(H(E,S+4)!==45)break;case 102:return D(E,/(.+:)(.+)-([^]+)/,"$1"+W+"$2-$3$1"+dt+(H(E,S+3)==108?"$3":"$2-$3"))+E;case 115:return~pt(E,"stretch")?Nn(D(E,"stretch","fill-available"),S)+E:E}break;case 4949:if(H(E,S+1)!==115)break;case 6444:switch(H(E,J(E)-3-(~pt(E,"!important")&&10))){case 107:return D(E,":",":"+W)+E;case 101:return D(E,/(.+:)([^;!]+)(;|!.+)?/,"$1"+W+(H(E,14)===45?"inline-":"")+"box$3$1"+W+"$2$3$1"+X+"$2box$3")+E}break;case 5936:switch(H(E,S+11)){case 114:return W+E+X+D(E,/[svh]\w+-[tblr]{2}/,"tb")+E;case 108:return W+E+X+D(E,/[svh]\w+-[tblr]{2}/,"tb-rl")+E;case 45:return W+E+X+D(E,/[svh]\w+-[tblr]{2}/,"lr")+E}return W+E+X+E+E}return E}var ra=function(S,T,I,M){if(S.length>-1&&!S.return)switch(S.type){case Ye:S.return=Nn(S.value,S.length);break;case St:return je([rt(S,{value:D(S.value,"@","@"+W)})],M);case Ge:if(S.length)return tr(S.props,function(k){switch(er(k,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return je([rt(S,{props:[D(k,/:(read-\w+)/,":"+dt+"$1")]})],M);case"::placeholder":return je([rt(S,{props:[D(k,/:(plac\w+)/,":"+W+"input-$1")]}),rt(S,{props:[D(k,/:(plac\w+)/,":"+dt+"$1")]}),rt(S,{props:[D(k,/:(plac\w+)/,X+"input-$1")]})],M)}return""})}},na=[ra],oa=function(S){var T=S.key;if(T==="css"){var I=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(I,function(V){var Se=V.getAttribute("data-emotion");Se.indexOf(" ")!==-1&&(document.head.appendChild(V),V.setAttribute("data-s",""))})}var M=S.stylisPlugins||na,k={},N,C=[];N=S.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+T+' "]'),function(V){for(var Se=V.getAttribute("data-emotion").split(" "),z=1;z<Se.length;z++)k[Se[z]]=!0;C.push(V)});var L,P=[ea,ta];{var R,U=[Sn,In(function(V){R.insert(V)})],G=Tn(P.concat(M,U)),Pe=function(Se){return je(En(Se),G)};L=function(Se,z,q,Ce){R=q,Pe(Se?Se+"{"+z.styles+"}":z.styles),Ce&&(Ie.inserted[z.name]=!0)}}var Ie={key:T,sheet:new cn({key:T,container:N,nonce:S.nonce,speedy:S.speedy,prepend:S.prepend,insertionPoint:S.insertionPoint}),nonce:S.nonce,inserted:k,registered:{},insert:L};return Ie.sheet.hydrate(C),Ie},Cn=oa;function aa(E){for(var S=0,T,I=0,M=E.length;M>=4;++I,M-=4)T=E.charCodeAt(I)&255|(E.charCodeAt(++I)&255)<<8|(E.charCodeAt(++I)&255)<<16|(E.charCodeAt(++I)&255)<<24,T=(T&65535)*1540483477+((T>>>16)*59797<<16),T^=T>>>24,S=(T&65535)*1540483477+((T>>>16)*59797<<16)^(S&65535)*1540483477+((S>>>16)*59797<<16);switch(M){case 3:S^=(E.charCodeAt(I+2)&255)<<16;case 2:S^=(E.charCodeAt(I+1)&255)<<8;case 1:S^=E.charCodeAt(I)&255,S=(S&65535)*1540483477+((S>>>16)*59797<<16)}return S^=S>>>13,S=(S&65535)*1540483477+((S>>>16)*59797<<16),((S^S>>>15)>>>0).toString(36)}var Ln=aa;var sa={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Rn=sa;var ia=/[A-Z]|^ms/g,ca=/_EMO_([^_]+?)_([^]*?)_EMO_/g,Dn=function(S){return S.charCodeAt(1)===45},On=function(S){return S!=null&&typeof S!="boolean"},nr=Mn(function(E){return Dn(E)?E:E.replace(ia,"-$&").toLowerCase()}),An=function(S,T){switch(S){case"animation":case"animationName":if(typeof T=="string")return T.replace(ca,function(I,M,k){return Oe={name:M,styles:k,next:Oe},M})}return Rn[S]!==1&&!Dn(S)&&typeof T=="number"&&T!==0?T+"px":T};function ht(E,S,T){if(T==null)return"";if(T.__emotion_styles!==void 0)return T;switch(typeof T){case"boolean":return"";case"object":{if(T.anim===1)return Oe={name:T.name,styles:T.styles,next:Oe},T.name;if(T.styles!==void 0){var I=T.next;if(I!==void 0)for(;I!==void 0;)Oe={name:I.name,styles:I.styles,next:Oe},I=I.next;var M=T.styles+";";return M}return la(E,S,T)}case"function":{if(E!==void 0){var k=Oe,N=T(E);return Oe=k,ht(E,S,N)}break}case"string":if(!1)var C,L;break}if(S==null)return T;var P=S[T];return P!==void 0?P:T}function la(E,S,T){var I="";if(Array.isArray(T))for(var M=0;M<T.length;M++)I+=ht(E,S,T[M])+";";else for(var k in T){var N=T[k];if(typeof N!="object")S!=null&&S[N]!==void 0?I+=k+"{"+S[N]+"}":On(N)&&(I+=nr(k)+":"+An(k,N)+";");else if(Array.isArray(N)&&typeof N[0]=="string"&&(S==null||S[N[0]]===void 0))for(var C=0;C<N.length;C++)On(N[C])&&(I+=nr(k)+":"+An(k,N[C])+";");else{var L=ht(E,S,N);switch(k){case"animation":case"animationName":{I+=nr(k)+":"+L+";";break}default:I+=k+"{"+L+"}"}}}return I}var Pn=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var Oe,Ct=function(S,T,I){if(S.length===1&&typeof S[0]=="object"&&S[0]!==null&&S[0].styles!==void 0)return S[0];var M=!0,k="";Oe=void 0;var N=S[0];N==null||N.raw===void 0?(M=!1,k+=ht(I,T,N)):k+=N[0];for(var C=1;C<S.length;C++)k+=ht(I,T,S[C]),M&&(k+=N[C]);var L;Pn.lastIndex=0;for(var P="",R;(R=Pn.exec(k))!==null;)P+="-"+R[1];var U=Ln(k)+P;return{name:U,styles:k,next:Oe}};var ua=!0;function or(E,S,T){var I="";return T.split(" ").forEach(function(M){E[M]!==void 0?S.push(E[M]+";"):I+=M+" "}),I}var da=function(S,T,I){var M=S.key+"-"+T.name;(I===!1||ua===!1)&&S.registered[M]===void 0&&(S.registered[M]=T.styles)},Wn=function(S,T,I){da(S,T,I);var M=S.key+"-"+T.name;if(S.inserted[T.name]===void 0){var k=T;do{var N=S.insert(T===k?"."+M:"",k,S.sheet,!0);k=k.next}while(k!==void 0)}};function $n(E,S){if(E.inserted[S.name]===void 0)return E.insert("",S,E.sheet,!0)}function Un(E,S,T){var I=[],M=or(E,I,T);return I.length<2?T:M+S(I)}var pa=function(S){var T=Cn(S);T.sheet.speedy=function(C){this.isSpeedy=C},T.compat=!0;var I=function(){for(var L=arguments.length,P=new Array(L),R=0;R<L;R++)P[R]=arguments[R];var U=Ct(P,T.registered,void 0);return Wn(T,U,!1),T.key+"-"+U.name},M=function(){for(var L=arguments.length,P=new Array(L),R=0;R<L;R++)P[R]=arguments[R];var U=Ct(P,T.registered),G="animation-"+U.name;return $n(T,{name:U.name,styles:"@keyframes "+G+"{"+U.styles+"}"}),G},k=function(){for(var L=arguments.length,P=new Array(L),R=0;R<L;R++)P[R]=arguments[R];var U=Ct(P,T.registered);$n(T,U)},N=function(){for(var L=arguments.length,P=new Array(L),R=0;R<L;R++)P[R]=arguments[R];return Un(T.registered,I,ma(P))};return{css:I,cx:N,injectGlobal:k,keyframes:M,hydrate:function(L){L.forEach(function(P){T.inserted[P]=!0})},flush:function(){T.registered={},T.inserted={},T.sheet.flush()},sheet:T.sheet,cache:T,getRegisteredStyles:or.bind(null,T.registered),merge:Un.bind(null,T.registered,I)}},ma=function E(S){for(var T="",I=0;I<S.length;I++){var M=S[I];if(M!=null){var k=void 0;switch(typeof M){case"boolean":break;case"object":{if(Array.isArray(M))k=E(M);else{k="";for(var N in M)M[N]&&N&&(k&&(k+=" "),k+=N)}break}default:k=M}k&&(T&&(T+=" "),T+=k)}}return T},Vn=pa;var Ae=Vn({key:"css"}),Vi=Ae.flush,_i=Ae.hydrate,_n=Ae.cx,Hi=Ae.merge,Fi=Ae.getRegisteredStyles,Hn=Ae.injectGlobal,zi=Ae.keyframes,Ne=Ae.css,Bi=Ae.sheet,ji=Ae.cache;var fa=Ne`
  cursor: pointer;
`,ha=Ne`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,Ee=(E,...S)=>{let{class:T="",...I}={...E};I.disabled||delete I.disabled;let M=`${I.variant==="text"?ha:fa} ${T}`;return<button class={M}{...I}>{...S}</button>},Er=(E,...S)=>{let T={...E},{view:I}=E;return I&&(T.href=""+Vr({searchSet:{view:I}})),<a data-to={T.href}onClick={M=>{M.preventDefault();let{href:k}=M.currentTarget;k&&k!==window.location.href&&_r(k)}}{...T}>{...S}</a>};var Fn=K("view-home"),zn=De("xxx"),Bn=De("yyy"),jn=()=>{let E=$r(Fn.xname),S=Wr(<div xname={Fn}>Home rendered <strong xname={zn}>{+(zn(E)?.innerHTML||0)+1}</strong> times.<br/>This is a persistent input: {Bn(E)||<input xname={Bn}value="test "/>}<p>This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only.</p><p>Start with defining some instruments, then add them to a wallet.</p></div>);return S.onMount=()=>{console.log("ViewHome mounted!")},S};var Lt=K("instrument-list"),Xn=Ve("instrument-row"),Sr=K("add-instrument"),Rt=K("new-instrument-source"),ga=Ne`
  -label: view-instruments;

  .title {
    background-color: #cca;
    padding: 0.5rem 1rem;
    margin: 10px 0 0;
    font-size: 1.2rem;
    font-weight: normal;
  }

  [data-xname='${Rt.xname}'] {
    width: 500px;
    font-size: 0.8rem;
  }
  [data-xname='${Lt.xname}'] {
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
`;$(He,({changes:E})=>{if(Xe()==="instruments")for(let S of E){let T=Xn(S.instrument.code);switch(S.op){case"create":$e(Lt(),<Tr instrument={S.instrument}/>);break;case"update":Ue(T,<Tr instrument={S.instrument}/>);break;case"delete":T?.remove();break}}});var qn=()=>Rt().value="",xa=$(j,qn),ya=$(j,async()=>{Sr().disabled=!0;try{await tn(Rt().value)}catch(E){alert(E)}Sr().disabled=!1,qn()}),wa=$(j,async({xid:E=""})=>{let{name:S}=Re()[E]||{};!S||!confirm(`Remove instrument:  
${S} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await Qr(E)}),Ea=()=><div>Paste the URL of the instrument you want to track. Supported websites:<ul><li><a href="https://live.euronext.com/en">oslobors funds</a> <small>( for example: <a href="https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF"target="_blank">https://live.euronext.com/en/product/funds/NO0010748155.ODEIEND-WOMF</a> )</small></li><li><a href="https://live.euronext.com/en">oslobors stocks</a> <small>( for example: <a href="https://live.euronext.com/en/product/equities/NO0010823131-MERK"target="_blank">https://live.euronext.com/en/product/equities/NO0010823131-MERK</a> )</small></li></ul></div>,Sa=()=><div><input xname={Rt}/>  <Ee xclick={ya}xname={Sr}>Add instrument</Ee>  <Ee xclick={xa}variant="text">Clear</Ee></div>,Tr=({instrument:E})=><tr xname={Xn}xid={E.code}><td><a href={E.sourceUrl}target="_blank">({E.type}) <strong>{E.name}</strong></a></td><td class="right"><strong>{E.latestPrice.toFixed(2)}</strong></td><td>{E.code}</td><td>{E.isin}</td><td class="updatedAgo"data-latest-update={E.latestUpdate}>{ut(E.latestUpdate)}</td><td>{new Date(E.latestTimestamp).toLocaleString()}</td><td><Ee xclick={wa}xid={E.code}variant="text">Delete</Ee></td></tr>,Kn=()=>{let E=<div class={ga}><Ea/><Sa/><h2 class="title">Tracked instruments</h2><table xname={Lt}>{ct().map(S=><Tr instrument={S}/>)}</table></div>;return E.onMount=()=>{Gn(),console.log("ViewInstruments mounted!")},E},Gn=()=>{Xe()==="instruments"&&(Lt().querySelectorAll("[data-latest-update]").forEach(E=>E.innerHTML=ut(E.dataset.latestUpdate||"")),setTimeout(Gn,5e3))};var Ot=K("new-wallet-name"),Ir=K("wallet-list"),qe=Ve("wallet-block"),Mr=Ve("wallet-title"),kr=Ve("wallet-total"),Nr=Ve("wallet-instruments"),Cr=Ve("updated-ago"),Yn=De("wallet-instrument-list"),Lr=De("wallet-new-total-price"),Rr=De("wallet-new-unit-price"),Or=De("wallet-new-date"),Ar=De("wallet-new-instrument"),gt={},Ta=Ne`
  -label: view-wallets;

  [data-xname='${Ot.xname}'] {
    width: 200px;
    font-size: 0.8rem;
  }

  [data-xname='${Ir.xname}'] {
    width: 100%;
    margin-top: 10px;
  }

  [data-xname='${qe.xname}'] {
    margin-bottom: 2rem;
    [data-xname='${Mr.xname}'] {
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
      [data-xname='${Cr.xname}'] {
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
    [data-xname='${Nr.xname}'] {
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
      [data-xname='${kr.xname}'] {
        font-size: 0.75rem;
        font-weight: bold;
      }
    }
  }
`,Jn=()=>Ot().value="",Qn=E=>{Lr(E).value="",Rr(E).value="",Or(E).value=Xt(new Date),Ar(E).value=""},Zn=E=>{Ue(kr(E.name),<Eo wd={E}/>),Ue(Mr(E.name),<So wd={E}/>)};$(He,({changes:E=[]}={})=>{if(Xe()!=="wallets")return;let S=E.filter(T=>T.op==="update");if(S.length)for(let T of vt()){let I=T.instruments.filter(N=>S.some(C=>C.instrument.code===N.code));if(!I.length)continue;let M=bt(T),k=qe(T.name);I.forEach(N=>{let C=M.instruments.find(L=>L.id==N.id);C&&Ue(st(`${T.name}:${N.id}`)(k),<Pr ins={C}walletName={M.name}/>)}),Zn(M)}});$(Gt,({wallet:E,modifiedInstrumentId:S})=>{let T=bt(E),I=qe(E.name);T.instruments.some(M=>M.id===S)?($e(Yn(I),<Pr ins={T.instruments.slice(-1)[0]}walletName={T.name}/>),Qn(I)):S&&st(`${E.name}:${S}`)(I).remove(),Zn(T)});$(Kt,({wallet:E})=>{gt[E.name]=!0,Jn(),$e(Ir(),<To wallet={E}/>)});$(Yt,({name:E})=>qe(E)?.remove());var Ia=$(j,({xid:E=""})=>{gt[E]=!gt[E],Nr(E).classList.toggle("expanded",gt[E])}),Ma=$(j,Jn),ka=$(j,({xid:E=""})=>Qn(qe(E))),Na=$(j,async()=>{let E=Ot().value.trim();E&&await nn({name:E,comment:"",instruments:[]})}),Ca=$(j,async({xid:E=""})=>{Ke()[E]&&confirm(`Delete wallet:  ${E} 
?`)&&await on(E)}),La=$(j,async({xid:E=""})=>{let S=Ke()[E];if(!S)return;let T=""+Date.now(),I=qe(E);S.instruments.push({id:T,code:Ar(I).value,date:Or(I).value,totalPrice:+Lr(I).value,unitPrice:+Rr(I).value}),await Jt(S,T)}),Ra=$(j,async({xid:E=""})=>{let[S,T]=E.split(":"),I=Ke()[S],M=I?.instruments.findIndex(({id:N})=>""+N===T);if(!I||M<0)return;let k=Re()[I.instruments[M].code]?.name;confirm(`Delete:  ${k} 
from:     ${I.name} 
?`)&&(I.instruments.splice(M,1),await Jt(I,T))}),Oa=$(j,async()=>{lt(0)}),Eo=({wd:E})=><tr xname={kr}xid={E.name}><td class="instrument-name">Total</td><td class="price">{E.changeValue}</td><td class="percent">{E.changePercent}</td><td class="price">{Y(E.totalValue)}</td><td class="price"/><td class="price"/><td class="price">{Y(E.totalPaid)}</td><td class="price"/><td class="price"/><td class="actions"/></tr>,So=({wd:E})=><div xname={Mr}xid={E.name}><div xclick={Ia}class="toggle-instruments"xid={E.name}/><div class="name">{E.name}</div><div xname={Cr}xid={E.name}>{E.updatedAgo}</div><Ee variant="text"class="delete-wallet"xid={E.name}xclick={Ca}>Delete</Ee><div class="summary"><div><b>{E.changeValue}</b></div><div><b>{E.changePercent}%</b></div><div>Value <b>{Y(E.totalValue)}</b></div><div>Paid <b>{Y(E.totalPaid)}</b></div></div></div>,Pr=({ins:E,walletName:S})=>{let T=`${S}:${E.id}`;return<tr xid={T}><td class="instrument-name"><a href={E.instrumentUrl}target="_blank">({E.instrumentType}) {E.instrumentName}</a></td><td class="price">{Y(E.currentTotal-E.paidTotal)}</td><td class="percent">{Y(E.change)}</td><td class="price">{Y(E.currentTotal)}</td><td class="price">{Y(E.currentUnit)}</td><td class="price">{Y(E.unitCount)}</td><td class="price">{Y(E.paidTotal)}</td><td class="price">{Y(E.paidUnit)}</td><td class="date">{E.paidDate}</td><td class="actions"><Ee xclick={Ra}xid={T}variant="text">Delete</Ee></td></tr>},Aa=({wallet:E})=><tr><td><select xname={Ar}xid={E.name}class=""><option value=""/>{ct().map(S=><option value={S.code}>({S.type}) {S.name}</option>)}</select></td><td/><td/><td class="price"><input type="number"xname={Lr}xid={E.name}class=""/></td><td/><td/><td/><td class="price"><input type="number"xname={Rr}xid={E.name}class=""/></td><td class="date"><input type="date"xname={Or}xid={E.name}pattern="yyyy-mm-dd"value={Xt(new Date)}class=""/></td><td class="actions"><Ee xclick={La}xid={E.name}>Add</Ee><Ee xclick={ka}xid={E.name}variant="text">Clear</Ee></td></tr>,To=({wallet:E})=>{let S=bt(E);return<div xname={qe}xid={E.name}><So wd={S}/><table xname={Nr}xid={E.name}class={_n({expanded:gt[E.name]})}><thead><tr><th class="instrument-name">Instrument</th><th class="price">Change</th><th class="percent">%</th><th class="price">Total value</th><th class="price">Unit value</th><th class="price">Unit count</th><th class="price">Total price</th><th class="price">Unit price</th><th class="date">Date</th><th class="actions"/></tr></thead><tbody xname={Yn}>{S.instruments.map(T=><Pr ins={T}walletName={S.name}/>)}</tbody><tfoot><Eo wd={S}/><Aa wallet={E}/></tfoot></table></div>},Io=()=>{let E=<div class={Ta}><div><input xname={Ot}/>{"\xA0"}<Ee xclick={Na}>Create wallet</Ee><Ee xclick={Ma}variant="text">Clear</Ee>{"\xA0\xA0\xA0\xA0\xA0\xA0\xA0"}<Ee xclick={Oa}variant="text">Fetch instrument data now</Ee></div><div xname={Ir}>{vt().map(S=><To wallet={S}/>)}</div></div>;return E.onMount=()=>{Mo(),console.log("ViewWallets mounted!")},E},Mo=()=>{Xe()==="wallets"&&(vt().forEach(E=>Cr(E.name).innerHTML=Zt(E.instruments)),setTimeout(Mo,5*1e3))};var ko=K("items"),No=K("new-todo-text"),At,xt,Co=()=>{xt.focus();let E=xt.value.trim();E&&(xt.value="",Br(E))},Pa=rn((E,S)=>{jr({done:!1,text:S,id:E})},500),Da=$(j,({xid:E=""})=>Xr(E)),Wa=$(j,Co),$a=$($t,({ev:E})=>E.key==="Enter"&&Co()),Ua=$($t,({ev:E,xid:S=""})=>{let{value:T}=E.target;typeof T=="string"&&Pa(S,T)});$(Ht,({todoId:E})=>st(E)(At).remove());$(_t,({todo:E})=>$e(At,<Lo todo={E}/>));var Lo=({todo:E})=><li xname="todo"xid={E.id}><button xclick={Da}xid={E.id}> X </button>{"\xA0"}<input xkeyup={Ua}xid={E.id}value={E.text}/></li>,Ro=()=>{let E=<div><input xkeyup={$a}xname={No}/>{"\xA0"}<button xclick={Wa}>Add</button><ol xname={ko}/></div>;return E.onMount=async()=>{At=ko(),xt=No(),xt.focus(),await qr(),yt(At,...zr().map(S=><Lo todo={S}/>)),console.log("ViewTodo mounted!")},E};var Va=Ne`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,Pt,_a=$(j,()=>{let E=Ke(),S=Re();Pt.value=JSON.stringify({instruments:S,wallets:E},null,2),Pt.select()}),Ha=$(j,async()=>{if(confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:E,instruments:S}=JSON.parse(Pt?.value||"");console.log("IMPORTED:",{wallets:E,instruments:S}),await en(S),await sn(E)}catch(E){alert("Failed to load data: "+E)}}),Oo=()=>{let E=<div class={Va}><div><Ee xclick={_a}>Export from LS</Ee> <Ee xclick={Ha}>Import to LS</Ee></div><textarea xname="buffer"/></div>;return E.onMount=()=>{Pt=K("buffer")(),console.log("ViewMigration mounted!")},E};var Dt={home:{label:"Home",Component:jn},wallets:{label:"Wallets",Component:Io},instruments:{label:"Instruments",Component:Kn},todo:{label:"Todo",Component:Ro},migration:{label:"Data migration",Component:Oo}},Xe=()=>new URLSearchParams(window.location.search).get("view")||"home",Ao=()=>Dt[Xe()]||Dt.home;var Fa=Ne`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Po=()=>{let[,...E]=Object.entries(Dt);return<div class={Fa}><Er href={location.pathname}><h1>Investment tracker</h1></Er>{E.map(([S,T],I)=><>{I>0?" | ":""}<Er view={S}>{T.label}</Er></>)}</div>};Hn`
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

`;var Do=K("current-view");$(Vt,()=>{let{Component:E}=Ao();yt(Do(),<E/>)});var Wo=()=>{let E=<div class="app"><Po/><hr/><div xname={Do}/></div>;return E.onMount=()=>{console.log("App mounted!")},E};Promise.all([Zr(),an()]).then(()=>{lt(),Ur(),Ue(document.getElementById("app"),<Wo/>),Hr()});})();
