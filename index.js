(()=>{var V=(e,t)=>{let r=e.appendChild(t);return t.onMount&&t.onMount(),r},Ce=(e,...t)=>{e.replaceChildren(...t),t.forEach(r=>r.onMount&&r.onMount())},G=(e,t)=>{let r=e?.parentElement;if(!r)return null;let n=r.replaceChild(t,e);return t.onMount&&t.onMount(),n},K=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},x=({el:e=document,sel:t="",xname:r,xid:n})=>{let a=r?`[data-xname="${r}"]`:"",s=n?`[data-xid="${n}"]`:"";return e.querySelector(`${t}${a}${s}`)},xt=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.innerHTML=""+t;return}let n=K(e);n&&(n.innerHTML=""+t)},yt=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.innerHTML!==void 0?r.innerHTML:t;let n=K(e);return n?.innerHTML!==void 0?n.innerHTML:t},X=(e,t)=>{if(!e)return;let r=e;if(r.querySelector){r.value=""+t;return}let n=K(e);n&&(n.value=""+t)},ee=(e,t)=>{if(!e)return t;let r=e;if(r.querySelector)return r.value;let n=K(e);return n?n.value:t};var Yr=e=>e.toLowerCase().replace(/(-[a-z])/g,t=>t.toUpperCase().replace("-","")),o=(e,t,...r)=>{if(typeof e=="function")return e(t||{},...r);let n=document.createElement(e);return Object.entries(t||{}).forEach(([a,s])=>{a.startsWith("on")&&typeof s=="function"?n.addEventListener(a.substring(2).toLowerCase(),s):a.startsWith("data-")?n.dataset[Yr(a.substring(5))]=""+s:a==="xname"||a==="xid"?n.dataset[a]=""+s:(["string","number","boolean"].includes(typeof s)&&n.setAttribute(a,""+s),n[a]=s)}),r.flat().forEach(a=>V(n,typeof a=="object"?a:document.createTextNode(a))),n},u=(e,...t)=>{let r=document.createDocumentFragment();return t.flat().forEach(n=>V(r,typeof n=="object"?n:document.createTextNode(n))),r};var te={},Jr=1,h=(e,t)=>{let{type:r}=e({});if(r)return te[r]=te[r]||[],te[r].push(t),{type:r,callback:t};let n="event-"+Jr++;return te[n]=te[n]||[],te[n].push(t),{type:n,callback:t}},T=(e,t)=>{let r=0,{type:n}=e({});for(let a of te[n]||[])a(t),r++;return r};var wt=({url:e=window.location.href,pathname:t,searchAdd:r,searchSet:n})=>{let a=new URL(""+e);a.pathname=t??a.pathname;let s=r??n;if(!s)return a;let i=new URLSearchParams(r?a.search:"");for(let c in s){let l=s[c];Array.isArray(l)?(i.delete(c),l.forEach(p=>i.append(c,p))):l!==void 0?i.set(c,l):i.delete(c)}return a.search=""+i,a},He=e=>({type:"router:navigate",payload:e}),Ve=e=>{T(He,{newUrl:new URL(e)})},vt=e=>{let t=""+e;window.history.pushState(null,"",t),Ve(t)};var bt=()=>Ve(window.location.href);window.addEventListener("popstate",()=>Ve(window.location.href));var xe=(e="")=>t=>({type:e,payload:t}),I=xe(),ze=xe(),Fe=e=>t=>{let r=t.target,{xclick:n,xkeyup:a,xkeydown:s}=r,{xname:i="",xid:c=""}=r.dataset,l={xname:i,xid:c,ev:t};return n&&e==="click"?T(xe(n.type),l):a&&e==="keyup"?T(xe(a.type),l):s&&e==="keydown"?T(xe(s.type),l):0},Tt=()=>{document.addEventListener("click",Fe("click")),document.addEventListener("keyup",Fe("keyup")),document.addEventListener("keydown",Fe("keydown"))};var It={};var St=e=>{let{xname:t="",xid:r=""}=e.dataset;return(t||r)&&(It[`${t}:${r}`]=e),e},Mt=(e="",t="")=>It[`${e}:${t}`];function Qr(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function Zr(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Ct=function(){function e(r){var n=this;this._insertTag=function(a){var s;n.tags.length===0?n.insertionPoint?s=n.insertionPoint.nextSibling:n.prepend?s=n.container.firstChild:s=n.before:s=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,s),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(Zr(this));var a=this.tags[this.tags.length-1];if(!1)var s;if(this.isSpeedy){var i=Qr(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}();var S="-ms-",oe="-moz-",m="-webkit-",ke="comm",ae="rule",se="decl";var kt="@import";var Ee="@keyframes";var Et=Math.abs,re=String.fromCharCode,Nt=Object.assign;function Lt(e,t){return(((t<<2^M(e,0))<<2^M(e,1))<<2^M(e,2))<<2^M(e,3)}function Ne(e){return e.trim()}function Pt(e,t){return(e=t.exec(e))?e[0]:e}function f(e,t,r){return e.replace(t,r)}function ye(e,t){return e.indexOf(t)}function M(e,t){return e.charCodeAt(t)|0}function Y(e,t,r){return e.slice(t,r)}function k(e){return e.length}function ie(e){return e.length}function ce(e,t){return t.push(e),e}function Rt(e,t){return e.map(t).join("")}var Le=1,le=1,At=0,E=0,v=0,de="";function we(e,t,r,n,a,s,i){return{value:e,root:t,parent:r,type:n,props:a,children:s,line:Le,column:le,length:i,return:""}}function pe(e,t){return Nt(we("",null,null,"",null,null,0),e,{length:-e.length},t)}function Ot(){return v}function Dt(){return v=E>0?M(de,--E):0,le--,v===10&&(le=1,Le--),v}function N(){return v=E<At?M(de,E++):0,le++,v===10&&(le=1,Le++),v}function $(){return M(de,E)}function ve(){return E}function me(e,t){return Y(de,e,t)}function ue(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Pe(e){return Le=le=1,At=k(de=e),E=0,[]}function Re(e){return de="",e}function fe(e){return Ne(me(E-1,qe(e===91?e+2:e===40?e+1:e)))}function $t(e){for(;(v=$())&&v<33;)N();return ue(e)>2||ue(v)>3?"":" "}function Ut(e,t){for(;--t&&N()&&!(v<48||v>102||v>57&&v<65||v>70&&v<97););return me(e,ve()+(t<6&&$()==32&&N()==32))}function qe(e){for(;N();)switch(v){case e:return E;case 34:case 39:e!==34&&e!==39&&qe(v);break;case 40:e===41&&qe(e);break;case 92:N();break}return E}function Wt(e,t){for(;N()&&e+v!==47+10;)if(e+v===42+42&&$()===47)break;return"/*"+me(t,E-1)+"*"+re(e===47?e:N())}function _t(e){for(;!ue($());)N();return me(e,E)}function Ft(e){return Re(Ae("",null,null,null,[""],e=Pe(e),0,[0],e))}function Ae(e,t,r,n,a,s,i,c,l){for(var p=0,d=0,g=i,P=0,B=0,D=0,y=1,R=1,b=1,C=0,_="",ge=a,j=s,H=n,w=_;R;)switch(D=C,C=N()){case 40:if(D!=108&&w.charCodeAt(g-1)==58){ye(w+=f(fe(C),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:w+=fe(C);break;case 9:case 10:case 13:case 32:w+=$t(D);break;case 92:w+=Ut(ve()-1,7);continue;case 47:switch($()){case 42:case 47:ce(Xr(Wt(N(),ve()),t,r),l);break;default:w+="/"}break;case 123*y:c[p++]=k(w)*b;case 125*y:case 59:case 0:switch(C){case 0:case 125:R=0;case 59+d:B>0&&k(w)-g&&ce(B>32?Vt(w+";",n,r,g-1):Vt(f(w," ","")+";",n,r,g-2),l);break;case 59:w+=";";default:if(ce(H=Ht(w,t,r,p,d,a,c,_,ge=[],j=[],g),s),C===123)if(d===0)Ae(w,t,H,H,ge,s,g,c,j);else switch(P){case 100:case 109:case 115:Ae(e,H,H,n&&ce(Ht(e,H,H,0,0,a,c,_,a,ge=[],g),j),a,j,g,c,n?ge:j);break;default:Ae(w,H,H,H,[""],j,0,c,j)}}p=d=B=0,y=b=1,_=w="",g=i;break;case 58:g=1+k(w),B=D;default:if(y<1){if(C==123)--y;else if(C==125&&y++==0&&Dt()==125)continue}switch(w+=re(C),C*y){case 38:b=d>0?1:(w+="\f",-1);break;case 44:c[p++]=(k(w)-1)*b,b=1;break;case 64:$()===45&&(w+=fe(N())),P=$(),d=g=k(_=w+=_t(ve())),C++;break;case 45:D===45&&k(w)==2&&(y=0)}}return s}function Ht(e,t,r,n,a,s,i,c,l,p,d){for(var g=a-1,P=a===0?s:[""],B=ie(P),D=0,y=0,R=0;D<n;++D)for(var b=0,C=Y(e,g+1,g=Et(y=i[D])),_=e;b<B;++b)(_=Ne(y>0?P[b]+" "+C:f(C,/&\f/g,P[b])))&&(l[R++]=_);return we(e,t,r,a===0?ae:c,l,p,d)}function Xr(e,t,r){return we(e,t,r,ke,re(Ot()),Y(e,2,-2),0)}function Vt(e,t,r,n){return we(e,t,r,se,Y(e,0,n),Y(e,n+1,-1),n)}function Be(e,t){switch(Lt(e,t)){case 5103:return m+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return m+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return m+e+oe+e+S+e+e;case 6828:case 4268:return m+e+S+e+e;case 6165:return m+e+S+"flex-"+e+e;case 5187:return m+e+f(e,/(\w+).+(:[^]+)/,m+"box-$1$2"+S+"flex-$1$2")+e;case 5443:return m+e+S+"flex-item-"+f(e,/flex-|-self/,"")+e;case 4675:return m+e+S+"flex-line-pack"+f(e,/align-content|flex-|-self/,"")+e;case 5548:return m+e+S+f(e,"shrink","negative")+e;case 5292:return m+e+S+f(e,"basis","preferred-size")+e;case 6060:return m+"box-"+f(e,"-grow","")+m+e+S+f(e,"grow","positive")+e;case 4554:return m+f(e,/([^-])(transform)/g,"$1"+m+"$2")+e;case 6187:return f(f(f(e,/(zoom-|grab)/,m+"$1"),/(image-set)/,m+"$1"),e,"")+e;case 5495:case 3959:return f(e,/(image-set\([^]*)/,m+"$1$`$1");case 4968:return f(f(e,/(.+:)(flex-)?(.*)/,m+"box-pack:$3"+S+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+m+e+e;case 4095:case 3583:case 4068:case 2532:return f(e,/(.+)-inline(.+)/,m+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(k(e)-1-t>6)switch(M(e,t+1)){case 109:if(M(e,t+4)!==45)break;case 102:return f(e,/(.+:)(.+)-([^]+)/,"$1"+m+"$2-$3$1"+oe+(M(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~ye(e,"stretch")?Be(f(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(M(e,t+1)!==115)break;case 6444:switch(M(e,k(e)-3-(~ye(e,"!important")&&10))){case 107:return f(e,":",":"+m)+e;case 101:return f(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+m+(M(e,14)===45?"inline-":"")+"box$3$1"+m+"$2$3$1"+S+"$2box$3")+e}break;case 5936:switch(M(e,t+11)){case 114:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return m+e+S+f(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return m+e+S+e+e}return e}function J(e,t){for(var r="",n=ie(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function zt(e,t,r,n){switch(e.type){case kt:case se:return e.return=e.return||e.value;case ke:return"";case Ee:return e.return=e.value+"{"+J(e.children,n)+"}";case ae:e.value=e.props.join(",")}return k(r=J(e.children,n))?e.return=e.value+"{"+r+"}":""}function qt(e){var t=ie(e);return function(r,n,a,s){for(var i="",c=0;c<t;c++)i+=e[c](r,n,a,s)||"";return i}}function Bt(e){return function(t){t.root||(t=t.return)&&e(t)}}function jt(e,t,r,n){if(e.length>-1&&!e.return)switch(e.type){case se:e.return=Be(e.value,e.length);break;case Ee:return J([pe(e,{value:f(e.value,"@","@"+m)})],n);case ae:if(e.length)return Rt(e.props,function(a){switch(Pt(a,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return J([pe(e,{props:[f(a,/:(read-\w+)/,":"+oe+"$1")]})],n);case"::placeholder":return J([pe(e,{props:[f(a,/:(plac\w+)/,":"+m+"input-$1")]}),pe(e,{props:[f(a,/:(plac\w+)/,":"+oe+"$1")]}),pe(e,{props:[f(a,/:(plac\w+)/,S+"input-$1")]})],n)}return""})}}function en(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Gt=en;var tn=function(t,r,n){for(var a=0,s=0;a=s,s=$(),a===38&&s===12&&(r[n]=1),!ue(s);)N();return me(t,E)},rn=function(t,r){var n=-1,a=44;do switch(ue(a)){case 0:a===38&&$()===12&&(r[n]=1),t[n]+=tn(E-1,r,n);break;case 2:t[n]+=fe(a);break;case 4:if(a===44){t[++n]=$()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=re(a)}while(a=N());return t},nn=function(t,r){return Re(rn(Pe(t),r))},Kt=new WeakMap,on=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!Kt.get(n))&&!a){Kt.set(t,!0);for(var s=[],i=nn(r,s),c=n.props,l=0,p=0;l<i.length;l++)for(var d=0;d<c.length;d++,p++)t.props[p]=s[l]?i[l].replace(/&\f/g,c[d]):c[d]+" "+i[l]}}},an=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};var sn=[jt],cn=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(y){var R=y.getAttribute("data-emotion");R.indexOf(" ")!==-1&&(document.head.appendChild(y),y.setAttribute("data-s",""))})}var a=t.stylisPlugins||sn,s={},i,c=[];i=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(y){for(var R=y.getAttribute("data-emotion").split(" "),b=1;b<R.length;b++)s[R[b]]=!0;c.push(y)});var l,p=[on,an];{var d,g=[zt,Bt(function(y){d.insert(y)})],P=qt(p.concat(a,g)),B=function(R){return J(Ft(R),P)};l=function(R,b,C,_){d=C,B(R?R+"{"+b.styles+"}":b.styles),_&&(D.inserted[b.name]=!0)}}var D={key:r,sheet:new Ct({key:r,container:i,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:s,registered:{},insert:l};return D.sheet.hydrate(c),D},Yt=cn;function ln(e){for(var t=0,r,n=0,a=e.length;a>=4;++n,a-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(a){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Jt=ln;var un={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Qt=un;var dn=/[A-Z]|^ms/g,pn=/_EMO_([^_]+?)_([^]*?)_EMO_/g,tr=function(t){return t.charCodeAt(1)===45},Zt=function(t){return t!=null&&typeof t!="boolean"},je=Gt(function(e){return tr(e)?e:e.replace(dn,"-$&").toLowerCase()}),Xt=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(pn,function(n,a,s){return F={name:a,styles:s,next:F},a})}return Qt[t]!==1&&!tr(t)&&typeof r=="number"&&r!==0?r+"px":r};function be(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return F={name:r.name,styles:r.styles,next:F},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)F={name:n.name,styles:n.styles,next:F},n=n.next;var a=r.styles+";";return a}return mn(e,t,r)}case"function":{if(e!==void 0){var s=F,i=r(e);return F=s,be(e,t,i)}break}case"string":if(!1)var c,l;break}if(t==null)return r;var p=t[r];return p!==void 0?p:r}function mn(e,t,r){var n="";if(Array.isArray(r))for(var a=0;a<r.length;a++)n+=be(e,t,r[a])+";";else for(var s in r){var i=r[s];if(typeof i!="object")t!=null&&t[i]!==void 0?n+=s+"{"+t[i]+"}":Zt(i)&&(n+=je(s)+":"+Xt(s,i)+";");else if(Array.isArray(i)&&typeof i[0]=="string"&&(t==null||t[i[0]]===void 0))for(var c=0;c<i.length;c++)Zt(i[c])&&(n+=je(s)+":"+Xt(s,i[c])+";");else{var l=be(e,t,i);switch(s){case"animation":case"animationName":{n+=je(s)+":"+l+";";break}default:n+=s+"{"+l+"}"}}}return n}var er=/label:\s*([^\s;\n{]+)\s*(;|$)/g;var F,Oe=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var a=!0,s="";F=void 0;var i=t[0];i==null||i.raw===void 0?(a=!1,s+=be(n,r,i)):s+=i[0];for(var c=1;c<t.length;c++)s+=be(n,r,t[c]),a&&(s+=i[c]);var l;er.lastIndex=0;for(var p="",d;(d=er.exec(s))!==null;)p+="-"+d[1];var g=Jt(s)+p;return{name:g,styles:s,next:F}};var fn=!0;function Ge(e,t,r){var n="";return r.split(" ").forEach(function(a){e[a]!==void 0?t.push(e[a]+";"):n+=a+" "}),n}var rr=function(t,r,n){var a=t.key+"-"+r.name;if((n===!1||fn===!1)&&t.registered[a]===void 0&&(t.registered[a]=r.styles),t.inserted[r.name]===void 0){var s=r;do{var i=t.insert(r===s?"."+a:"",s,t.sheet,!0);s=s.next}while(s!==void 0)}};function nr(e,t){if(e.inserted[t.name]===void 0)return e.insert("",t,e.sheet,!0)}function or(e,t,r){var n=[],a=Ge(e,n,r);return n.length<2?r:a+t(n)}var hn=function(t){var r=Yt(t);r.sheet.speedy=function(c){this.isSpeedy=c},r.compat=!0;var n=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Oe(p,r.registered,void 0);return rr(r,g,!1),r.key+"-"+g.name},a=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Oe(p,r.registered),P="animation-"+g.name;return nr(r,{name:g.name,styles:"@keyframes "+P+"{"+g.styles+"}"}),P},s=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var g=Oe(p,r.registered);nr(r,g)},i=function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];return or(r.registered,n,gn(p))};return{css:n,cx:i,injectGlobal:s,keyframes:a,hydrate:function(l){l.forEach(function(p){r.inserted[p]=!0})},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:Ge.bind(null,r.registered),merge:or.bind(null,r.registered,n)}},gn=function e(t){for(var r="",n=0;n<t.length;n++){var a=t[n];if(a!=null){var s=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))s=e(a);else{s="";for(var i in a)a[i]&&i&&(s&&(s+=" "),s+=i)}break}default:s=a}s&&(r&&(r+=" "),r+=s)}}return r},ar=hn;var z=ar({key:"css"}),la=z.flush,ua=z.hydrate,sr=z.cx,da=z.merge,pa=z.getRegisteredStyles,ir=z.injectGlobal,ma=z.keyframes,W=z.css,fa=z.sheet,ha=z.cache;var xn=W`
  cursor: pointer;
`,yn=W`
  border: 0;
  color: blue;
  background: transparent;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    text-decoration: underline;
  }
`,A=(e,...t)=>{let{class:r="",...n}={...e};n.disabled||delete n.disabled;let a=`${n.variant==="text"?yn:xn} ${r}`;return o("button",{class:a,...n},t)},Ke=(e,...t)=>{let r={...e},{view:n}=e;return n&&(r.href=""+wt({searchSet:{view:n}})),o("a",{"data-to":r.href,onClick:a=>{a.preventDefault();let{href:s}=a.currentTarget;s&&s!==window.location.href&&vt(s)},...r},t)};var cr="view-home",lr=()=>{let e=Mt(cr),t=St(o("div",{xname:cr},"Home rendered ",o("strong",{xname:"xxx"},+yt({el:e,xname:"xxx"},0)+1)," times.",o("br",null),"This is a persistent input: ",K({el:e,xname:"yyy"})||o("input",{xname:"yyy",value:"test "}),o("p",null,"This app does NOT send any data to the server. Anything you save is stored in your browser's local storage only."),o("p",null,"Start with defining some instruments, then add them to a wallet.")));return t.onMount=()=>{console.log("ViewHome mounted!")},t};var ur="todos",Q=[],Ye=e=>({type:"store:item-created",payload:e}),wn=e=>({type:"store:item-updated",payload:e}),Je=e=>({type:"store:item-deleted",payload:e}),dr=()=>Q,pr=async e=>{let t={text:e,done:!1,id:new Date().toISOString()};return Q.push(t),Qe().then(()=>T(Ye,{todo:t}))},mr=async e=>{let t=Q.find(r=>r.id===e.id);return t?(Object.assign(t,e),Qe().then(()=>T(wn,{todo:t}))):!1},fr=async e=>{let t=Q.findIndex(r=>r.id===e);return t<0?!1:(Q.splice(t,1),Qe().then(()=>T(Je,{todoId:e})))},hr=async()=>{Q=JSON.parse(localStorage.getItem(ur)||"[]"),console.log({todos:Q})},Qe=async()=>{localStorage.setItem(ur,JSON.stringify(Q))};var vr=location.hostname==="localhost"?"http://localhost":"https://it.nottycanvas.com",gr=e=>fetch(`${vr}?target=${e}`),xr=(e,t)=>fetch(`${vr}?target=${e}`,{method:"POST",body:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}),yr=e=>{if(!e.code)throw new Error(`Error: instrument code is missing in: ${e.name}`)},wr=e=>{if(!e.sourceUrl)throw new Error("Error: empty source URL");return!0},Ze=[{name:"ose-stocks",description:"Oslo B\xF8rs - Stocks",matchSource:e=>e.includes("product/equities/")&&e.includes("live.euronext.com/"),fetchInitialData:async e=>{if(!wr(e))return e;let t=(e.sourceUrl.match(/equities\/([^/]+)(?:\/overview)?/)||[])[1],r=`https://live.euronext.com/en/ajax/getDetailedQuote/${t}`,a=((await(await xr(r,"theme_name=euronext_live")).text()).match(/<strong>([^<]+)/)||[])[1],s=t.replace(/-.+$/,"");return Object.assign(e,{name:a,isin:s,code:t,type:"S"}),e},fetchCurrentPrice:async e=>{yr(e);let t=`https://live.euronext.com/en/ajax/getDetailedQuote/${e.code}`,r=await(await xr(t,"theme_name=euronext_live")).text();return e.latestPrice=+(r.match(/instrument-price">([^<]+)/)||["","0"])[1],e}},{name:"ose-funds",description:"Oslo B\xF8rs - Funds",matchSource:e=>e.includes("markedsaktivitet/#/details/")&&e.includes("oslobors.no/"),fetchInitialData:async e=>{if(!wr(e))return e;let t=(e.sourceUrl.match(/details\/([^/]+)\/overview/)||[])[1],r=`https://www.oslobors.no/ob/servlets/components?type=header&source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+ISIN%2C+SECURITYNAME+as+LONG_NAME%2C&filter=ITEM_SECTOR%3D%3Ds${t}`,n=await(await gr(r)).json(),{ISIN:a,LONG_NAME:s}=n.rows[0].values;return Object.assign(e,{name:s,isin:a,code:t,type:"F"}),e},fetchCurrentPrice:async e=>{yr(e);let t=`https://www.oslobors.no/ob/servlets/components?source=feed.omff.FUNDS&view=REALTIME&columns=ITEM%2C+PRICECHANGEPCT%2C+TRADE_TIME%2C+PRICE%2C+DATE%2C+LAST%2C+CHANGE&filter=ITEM_SECTOR%3D%3Ds${e.code}`,r=await(await gr(t)).json();return e.latestPrice=+r.rows[0].values.PRICE.toFixed(2),e}}];var Xe="instruments",O={},Z=e=>({type:"store:instruments-updated",payload:e}),Te=()=>Object.values(O),q=()=>O,vn=async e=>{if(O[e.code])return!1;let t={...e};return t.latestUpdate=new Date().toISOString(),O[t.code]=t,et().then(()=>T(Z,{changes:[{instrument:t,op:"create"}]}))},bn=async(e,t)=>{let{code:r=""}=e;if(!O[r])return!1;let n=O[r];return Object.assign(n,e),n.latestUpdate=new Date().toISOString(),et().then(()=>t&&T(Z,{changes:[{instrument:n,op:"update"}]}))},br=async e=>{if(!O[e])return!1;let t=O[e];return delete O[e],et().then(()=>T(Z,{changes:[{instrument:t,op:"delete"}]}))},Tr=async()=>{O=JSON.parse(localStorage.getItem(Xe)||"{}"),Object.values(O).forEach(e=>e.type||(e.type="F")),console.log({instruments:O})},et=async()=>{localStorage.setItem(Xe,JSON.stringify(O))},Ir=async e=>{localStorage.setItem(Xe,JSON.stringify(e)),O=e},Sr=window;Sr.quick_refresh=!1;var Tn=()=>Sr.quick_refresh?.2:2,In=10,tt=async()=>{let e=[];for(let t of Te())if(!t.latestUpdate||new Date(t.latestUpdate).getTime()<Date.now()-Tn()*60*1e3){let r=Ze.find(n=>n.name===t.sourceName);if(!r){console.log("Error: source not found:",t);continue}try{await r.fetchCurrentPrice(t),await bn(t,!1),e.push({instrument:t,op:"update"})}catch{}}e.length&&T(Z,{changes:e}),setTimeout(tt,In*1e3)},Mr=async e=>{let t=Ze.find(n=>n.matchSource(e));if(!t)throw new Error("Unrecognised URL");let r={sourceUrl:e,sourceName:t.name};if(await t.fetchInitialData(r),!r.name)throw new Error("Failed to fetch instrument data");if(q()[r.code||""])throw new Error("Instrument already registered");await t.fetchCurrentPrice(r),await vn(r)};var Cr=(e,t)=>{let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>e(...n),t)}};var Na=new Intl.DateTimeFormat("en-GB",{dateStyle:"medium",timeStyle:"medium"}),Sn=new Intl.DateTimeFormat("en-GB",{dateStyle:"short"}),Mn=new Intl.NumberFormat("no-NB",{minimumFractionDigits:2,maximumFractionDigits:2});var rt=e=>{let t=Sn.formatToParts(typeof e=="string"?new Date(e):e);return`${t[4].value}-${t[2].value}-${t[0].value}`},L=e=>Mn.format(e),Ie=(e,t=new Date)=>{let r=typeof e=="string"?new Date(e):e,n=typeof t=="string"?new Date(t):t,a=Math.floor((n.getTime()-r.getTime())/1e3),s=Math.floor(a/3600),i=Math.floor((a-s*3600)/60),c=a-s*3600-i*60,l=`${s>0?s+"h":""} ${i>0?i+"m":""} ${c>0?c+"s":""}`.trim();return l?l+" ago":"just now"};var nt="wallets",U={},ot=e=>({type:"store:wallet-created",payload:e}),at=e=>({type:"store:wallet-updated",payload:e}),st=e=>({type:"store:wallet-deleted",payload:e}),De=()=>Object.values(U),he=()=>U,kr=async e=>{if(U[e.name])return!1;let t={...e};return U[t.name]=t,ct().then(()=>T(ot,{wallet:t}))},it=async(e,t)=>{let{name:r=""}=e;return U[r]?(U[r]=e,ct().then(()=>T(at,{wallet:e,modifiedInstrumentId:t}))):!1},Er=async e=>U[e]?(delete U[e],ct().then(()=>T(st,{name:e}))):!1,Nr=async()=>{U=JSON.parse(localStorage.getItem(nt)||"{}"),console.log({wallets:U})},ct=async()=>{localStorage.setItem(nt,JSON.stringify(U))},Lr=async e=>{localStorage.setItem(nt,JSON.stringify(e)),U=e},lt=e=>{let t=q();return Ie(e.reduce((r,n)=>{let a=t[n.code]?.latestUpdate||"";return r<a?r:a},new Date("2030-01-01").toISOString()))},$e=e=>{let t=q(),r=e.instruments.map(s=>{let i=t[s.code],c=i?.latestPrice||0,l=s.totalPrice/s.unitPrice,p=c*l;return{id:s.id,instrumentName:i?.name??"???",instrumentUrl:i?.sourceUrl,instrumentType:i?.type,change:p/s.totalPrice*100-100,currentTotal:p,currentUnit:c,unitCount:l,paidTotal:s.totalPrice,paidUnit:s.unitPrice,paidDate:s.date,updatedAt:i?.latestUpdate||""}}),n=r.reduce((s,i)=>s+i.currentTotal,0),a=r.reduce((s,i)=>s+i.paidTotal,0);return{name:e.name,instruments:r,totalValue:n,totalPaid:a,changeValue:L(n-a),changePercent:L(n/a*100-100),updatedAgo:lt(e.instruments)}};var Cn=W`
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
`,pt,ut,mt;h(Z,({changes:e})=>{if(ne()==="instruments")for(let t of e){let r=K({xname:"instrument",xid:t.instrument.code});switch(t.op){case"create":V(mt,o(dt,{instrument:t.instrument}));break;case"update":G(r,o(dt,{instrument:t.instrument}));break;case"delete":r?.remove();break}}});var Pr=()=>pt.value="",kn=h(I,Pr),En=h(I,async()=>{ut.disabled=!0;try{await Mr(pt.value)}catch(e){alert(e)}ut.disabled=!1,Pr()}),Nn=h(I,async({xid:e=""})=>{let{name:t}=q()[e]||{};!t||!confirm(`Remove instrument:  
${t} 
? 
It will NOT be removed from wallets (you will need to do it manually)`)||await br(e)}),Ln=()=>o("div",null,"Paste the URL of the instrument you want to track. Supported websites:",o("ul",null,o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors funds")," ",o("small",null,"( for example:"," ",o("a",{href:"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview",target:"_blank"},"https://www.oslobors.no/ob_eng/markedsaktivitet/#/details/DK-GLOIN.OSE/overview")," ",")")),o("li",null,o("a",{href:"https://live.euronext.com/en"},"oslobors stocks")," ",o("small",null,"( for example:"," ",o("a",{href:"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview",target:"_blank"},"https://live.euronext.com/en/product/equities/NO0010823131-MERK/overview")," ",")")))),Pn=()=>o("div",null,o("input",{xname:"new-instrument-source"}),"  ",o(A,{xclick:En,xname:"add-instrument"},"Add instrument"),"  ",o(A,{xclick:kn,variant:"text"},"Clear")),dt=({instrument:e})=>o("tr",{xname:"instrument",xid:e.code},o("td",null,o("a",{href:e.sourceUrl,target:"_blank"},"(",e.type,") ",o("strong",null,e.name))),o("td",{class:"right"},o("strong",null,e.latestPrice.toFixed(2))),o("td",null,e.code),o("td",null,e.isin),o("td",{class:"updatedAgo","data-latest-update":e.latestUpdate},Ie(e.latestUpdate)),o("td",null,o(A,{xclick:Nn,xid:e.code,variant:"text"},"Delete"))),Rr=()=>{let e=o("div",{class:Cn},o(Ln,null),o(Pn,null),o("h2",{class:"title"},"Tracked instruments"),o("table",{xname:"instrument-list"},Te().map(t=>o(dt,{instrument:t}))));return e.onMount=()=>{pt=x({xname:"new-instrument-source"}),ut=x({xname:"add-instrument"}),mt=x({xname:"instrument-list"}),Ar(),console.log("ViewInstruments mounted!")},e},Ar=()=>{ne()==="instruments"&&(mt.querySelectorAll("[data-latest-update]").forEach(e=>{let t=e;t.innerHTML=Ie(t.dataset.latestUpdate||"")}),setTimeout(Ar,5e3))};var Rn=W`
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
`,ft,ht,Se={},Or=()=>{ft.value=""},Dr=e=>{X({el:e,xname:"wallet-new-total-price"},""),X({el:e,xname:"wallet-new-unit-price"},""),X({el:e,xname:"wallet-new-date"},rt(new Date)),X({el:e,xname:"wallet-new-instrument"},"")},$r=e=>{G(x({xname:"wallet-total",xid:e.name}),o(Ur,{wd:e})),G(x({xname:"wallet-title",xid:e.name}),o(Wr,{wd:e}))};h(Z,({changes:e=[]}={})=>{if(ne()!=="wallets")return;let t=e.filter(r=>r.op==="update");if(!!t.length)for(let r of De()){let n=r.instruments.filter(s=>t.some(i=>i.instrument.code===s.code));if(!n.length)continue;let a=$e(r);n.forEach(s=>{let i=a.instruments.find(c=>c.id==s.id);i&&G(x({xid:`${r.name}:${s.id}`}),o(gt,{ins:i,walletName:a.name}))}),$r(a)}});h(at,({wallet:e,modifiedInstrumentId:t})=>{let r=$e(e);if(r.instruments.some(n=>n.id===t)){let n=x({xname:"wallet",xid:e.name});V(x({el:n,xname:"instrument-list"}),o(gt,{ins:r.instruments.slice(-1)[0],walletName:r.name})),Dr(n)}else t&&x({xid:`${e.name}:${t}`}).remove();$r(r)});h(ot,({wallet:e})=>{Se[e.name]=!0,Or(),V(ht,o(_r,{wallet:e}))});h(st,({name:e})=>{x({el:ht,xname:"wallet",xid:e})?.remove()});var An=h(I,({xid:e=""})=>{Se[e]=!Se[e],x({xname:"instruments",xid:e}).classList.toggle("expanded",Se[e])}),On=h(I,Or),Dn=h(I,({xid:e=""})=>{Dr(x({xname:"wallet",xid:e}))}),$n=h(I,async()=>{let e=(ft?.value||"").trim();!e||await kr({name:e,comment:"",instruments:[]})}),Un=h(I,async({xid:e=""})=>{!he()[e]||!confirm(`Delete wallet:  ${e} 
?`)||await Er(e)}),Wn=h(I,async({xid:e=""})=>{let t=he()[e];if(!t)return;let r=x({xname:"wallet",xid:e}),n=""+Date.now();t.instruments.push({id:n,code:ee({el:r,xname:"wallet-new-instrument"},""),date:ee({el:r,xname:"wallet-new-date"},""),totalPrice:+ee({el:r,xname:"wallet-new-total-price"},""),unitPrice:+ee({el:r,xname:"wallet-new-unit-price"},"")}),await it(t,n)}),_n=h(I,async({xid:e=""})=>{let[t,r]=e.split(":"),n=he()[t],a=n?.instruments.findIndex(({id:i})=>""+i===r);if(!n||a<0)return;let s=q()[n.instruments[a].code]?.name;!confirm(`Delete:  ${s} 
from:     ${n.name} 
?`)||(n.instruments.splice(a,1),await it(n,r))}),Ur=({wd:e})=>o("tr",{xname:"wallet-total",xid:e.name},o("td",{class:"instrument-name"},"Total"),o("td",{class:"price"},e.changeValue),o("td",{class:"percent"},e.changePercent),o("td",{class:"price"},L(e.totalValue)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"price"},L(e.totalPaid)),o("td",{class:"price"}),o("td",{class:"price"}),o("td",{class:"actions"})),Wr=({wd:e})=>o("div",{xname:"wallet-title",xid:e.name},o("div",{xclick:An,class:"toggle-instruments",xid:e.name}),o("div",{class:"name"},e.name),o("div",{xname:"updated-ago",xid:e.name},e.updatedAgo),o(A,{variant:"text",class:"delete-wallet",xid:e.name,xclick:Un},"Delete"),o("div",{class:"summary"},o("div",{class:""},"Change\xA0",o("b",null,e.changeValue),"\xA0(",o("b",null,e.changePercent,"%"),")"),o("div",{class:""},"Value ",o("b",null,L(e.totalValue))),o("div",{class:""},"Paid ",o("b",null,L(e.totalPaid))))),gt=({ins:e,walletName:t})=>{let r=`${t}:${e.id}`;return o("tr",{xid:r},o("td",{class:"instrument-name"},o("a",{href:e.instrumentUrl,target:"_blank"},"(",e.instrumentType,") ",e.instrumentName)),o("td",{class:"price"},L(e.currentTotal-e.paidTotal)),o("td",{class:"percent"},L(e.change)),o("td",{class:"price"},L(e.currentTotal)),o("td",{class:"price"},L(e.currentUnit)),o("td",{class:"price"},L(e.unitCount)),o("td",{class:"price"},L(e.paidTotal)),o("td",{class:"price"},L(e.paidUnit)),o("td",{class:"date"},e.paidDate),o("td",{class:"actions"},o(A,{xclick:_n,xid:r,variant:"text"},"Delete")))},Hn=({wallet:e})=>o("tr",null,o("td",null,o("select",{xname:"wallet-new-instrument",xid:e.name,class:""},o("option",{value:""}),Te().map(t=>o("option",{value:t.code},"(",t.type,") ",t.name)))),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-total-price",xid:e.name,class:""})),o("td",null),o("td",null),o("td",null),o("td",{class:"price"},o("input",{type:"number",xname:"wallet-new-unit-price",xid:e.name,class:""})),o("td",{class:"date"},o("input",{type:"date",xname:"wallet-new-date",xid:e.name,pattern:"yyyy-mm-dd",value:rt(new Date),class:""})),o("td",{class:"actions"},o(A,{xclick:Wn,xid:e.name},"Add"),o(A,{xclick:Dn,xid:e.name,variant:"text"},"Clear"))),_r=({wallet:e})=>{let t=$e(e);return o("div",{xname:"wallet",xid:e.name},o(Wr,{wd:t}),o("table",{xname:"instruments",xid:e.name,class:sr({expanded:Se[e.name]})},o("thead",null,o("tr",null,o("th",{class:"instrument-name"},"Instrument"),o("th",{class:"price"},"Change"),o("th",{class:"percent"},"%"),o("th",{class:"price"},"Total value"),o("th",{class:"price"},"Unit value"),o("th",{class:"price"},"Unit count"),o("th",{class:"price"},"Total price"),o("th",{class:"price"},"Unit price"),o("th",{class:"date"},"Date"),o("th",{class:"actions"}))),o("tbody",{xname:"instrument-list"},t.instruments.map(r=>o(gt,{ins:r,walletName:t.name}))),o("tfoot",null,o(Ur,{wd:t}),o(Hn,{wallet:e}))))},Hr=()=>{let e=o("div",{class:Rn},o("div",null,o("input",{xname:"new-wallet-name"}),"  ",o(A,{xclick:$n},"Create wallet"),"  ",o(A,{xclick:On,variant:"text"},"Clear")),o("div",{xname:"wallet-list"},De().map(t=>o(_r,{wallet:t}))));return e.onMount=()=>{ft=x({xname:"new-wallet-name"}),ht=x({xname:"wallet-list"}),Vr(),console.log("ViewWallets mounted!")},e},Vr=()=>{ne()==="wallets"&&(De().forEach(e=>xt({xname:"updated-ago",xid:e.name},lt(e.instruments))),setTimeout(Vr,5*1e3))};var Ue,Me,Fr=()=>{Me.focus();let e=Me.value.trim();!e||(Me.value="",pr(e))},Vn=Cr((e,t)=>{mr({done:!1,text:t,id:e})},500),Fn=h(I,({xid:e=""})=>fr(e)),zn=h(I,Fr),qn=h(ze,({ev:e})=>e.key==="Enter"&&Fr()),Bn=h(ze,({ev:e,xid:t=""})=>{let{value:r}=e.target;typeof r=="string"&&Vn(t,r)});h(Je,({todoId:e})=>x({el:Ue,xname:"todo",xid:e}).remove());h(Ye,({todo:e})=>V(Ue,o(zr,{todo:e})));var zr=({todo:e})=>o("li",{xname:"todo",xid:e.id},o("button",{xclick:Fn,xid:e.id}," X "),"\xA0",o("input",{xkeyup:Bn,xid:e.id,value:e.text})),qr=()=>{let e=o("div",null,o("input",{xkeyup:qn,xname:"new-item-text"}),"\xA0",o("button",{xclick:zn},"Add"),o("ol",{xname:"items"}));return e.onMount=async()=>{Ue=x({xname:"items"}),Me=x({xname:"new-item-text"}),Me.focus(),await hr(),Ce(Ue,...dr().map(t=>o(zr,{todo:t}))),console.log("ViewTodo mounted!")},e};var jn=W`
  -label: view-migration;

  textarea {
    margin-top: 10px;
    width: 500px;
    height: 600px;
  }
`,We,Gn=h(I,()=>{let e=he(),t=q();X(We,JSON.stringify({instruments:t,wallets:e},null,2)),We.select()}),Kn=h(I,async()=>{if(!!confirm("WARNING! This will replace *ALL* INSTRUMENT AND WALLET  data in local storage!"))try{let{wallets:e,instruments:t}=JSON.parse(ee(We,""));console.log("IMPORTED:",{wallets:e,instruments:t}),await Ir(t),await Lr(e)}catch(e){alert("Failed to load data: "+e)}}),Br=()=>{let e=o("div",{class:jn},o("div",null,o(A,{xclick:Gn},"Export from LS")," ",o(A,{xclick:Kn},"Import to LS")),o("textarea",{xname:"buffer"}));return e.onMount=()=>{We=x({xname:"buffer"}),console.log("ViewMigration mounted!")},e};var _e={home:{label:"Home",Component:lr},wallets:{label:"Wallets",Component:Hr},instruments:{label:"Instruments",Component:Rr},todo:{label:"Todo",Component:qr},migration:{label:"Data migration",Component:Br}},ne=()=>new URLSearchParams(window.location.search).get("view")||"home",jr=()=>{let{Component:e,label:t}=_e[ne()]||_e.home;return{Component:e,label:t}};var Yn=W`
  -label: top-bar;

  a {
    color: red;
    text-decoration: none;
  }
`,Gr=()=>{let[,...e]=Object.entries(_e);return o("div",{class:Yn},o(Ke,{href:location.pathname},o("h1",null,"Investment tracker")),e.map(([t,r],n)=>o(u,null,n>0?" | ":"",o(Ke,{view:t},r.label))))};ir`
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

`;h(He,()=>{let{Component:e}=jr();Ce(x({xname:"current-view"}),o(e,null))});var Kr=()=>{let e=o("div",{class:"app"},o(Gr,null),o("hr",null),o("div",{xname:"current-view"}));return e.onMount=()=>{console.log("App mounted!")},e};Promise.all([Tr(),Nr()]).then(()=>{tt(),Tt(),G(document.getElementById("app"),o(Kr,null)),bt()});})();
