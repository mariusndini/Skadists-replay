!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Popper=t()}(this,function(){"use strict";function e(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}function t(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},le))}}function n(e){var t={};return e&&"[object Function]"===t.toString.call(e)}function o(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView,o=n.getComputedStyle(e,null);return t?o[t]:o}function r(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function i(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=o(e),n=t.overflow,a=t.overflowX;return/(auto|scroll|overlay)/.test(n+t.overflowY+a)?e:i(r(e))}function a(e){return e&&e.referenceNode?e.referenceNode:e}function f(e){return 11===e?de:10===e?he:de||he}function s(e){if(!e)return document.documentElement;for(var t=f(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var r=n&&n.nodeName;return r&&"BODY"!==r&&"HTML"!==r?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===o(n,"position")?s(n):n:e?e.ownerDocument.documentElement:document.documentElement}function p(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||s(e.firstElementChild)===e)}function l(e){return null!==e.parentNode?l(e.parentNode):e}function u(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?e:t,r=n?t:e,i=document.createRange();i.setStart(o,0),i.setEnd(r,0);var a=i.commonAncestorContainer;if(e!==a&&t!==a||o.contains(r))return p(a)?a:s(a);var f=l(e);return f.host?u(f.host,t):u(e,l(t).host)}function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===t?"scrollTop":"scrollLeft",o=e.nodeName;if("BODY"===o||"HTML"===o){var r=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||r)[n]}return e[n]}function d(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=c(t,"top"),r=c(t,"left"),i=n?-1:1;return e.top+=o*i,e.bottom+=o*i,e.left+=r*i,e.right+=r*i,e}function h(e,t){var n="x"===t?"Left":"Top",o="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"])+parseFloat(e["border"+o+"Width"])}function m(e,t,n,o){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],f(10)?parseInt(n["offset"+e])+parseInt(o["margin"+("Height"===e?"Top":"Left")])+parseInt(o["margin"+("Height"===e?"Bottom":"Right")]):0)}function g(e){var t=e.body,n=e.documentElement,o=f(10)&&getComputedStyle(n);return{height:m("Height",t,n,o),width:m("Width",t,n,o)}}function v(e){return be({},e,{right:e.left+e.width,bottom:e.top+e.height})}function b(e){var t={};try{if(f(10)){t=e.getBoundingClientRect();var n=c(e,"top"),r=c(e,"left");t.top+=n,t.left+=r,t.bottom+=n,t.right+=r}else t=e.getBoundingClientRect()}catch(e){}var i={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},a="HTML"===e.nodeName?g(e.ownerDocument):{},s=a.width||e.clientWidth||i.width,p=a.height||e.clientHeight||i.height,l=e.offsetWidth-s,u=e.offsetHeight-p;if(l||u){var d=o(e);l-=h(d,"x"),u-=h(d,"y"),i.width-=l,i.height-=u}return v(i)}function w(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=f(10),a="HTML"===t.nodeName,s=b(e),p=b(t),l=i(e),u=o(t),c=parseFloat(u.borderTopWidth),h=parseFloat(u.borderLeftWidth);n&&a&&(p.top=Math.max(p.top,0),p.left=Math.max(p.left,0));var m=v({top:s.top-p.top-c,left:s.left-p.left-h,width:s.width,height:s.height});if(m.marginTop=0,m.marginLeft=0,!r&&a){var g=parseFloat(u.marginTop),w=parseFloat(u.marginLeft);m.top-=c-g,m.bottom-=c-g,m.left-=h-w,m.right-=h-w,m.marginTop=g,m.marginLeft=w}return(r&&!n?t.contains(l):t===l&&"BODY"!==l.nodeName)&&(m=d(m,t)),m}function y(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,o=w(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),a=t?0:c(n),f=t?0:c(n,"left");return v({top:a-o.top+o.marginTop,left:f-o.left+o.marginLeft,width:r,height:i})}function E(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===o(e,"position"))return!0;var n=r(e);return!!n&&E(n)}function x(e){if(!e||!e.parentElement||f())return document.documentElement;for(var t=e.parentElement;t&&"none"===o(t,"transform");)t=t.parentElement;return t||document.documentElement}function O(e,t,n,o){var f=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s={top:0,left:0},p=f?x(e):u(e,a(t));if("viewport"===o)s=y(p,f);else{var l=void 0;"scrollParent"===o?(l=i(r(t)),"BODY"===l.nodeName&&(l=e.ownerDocument.documentElement)):l="window"===o?e.ownerDocument.documentElement:o;var c=w(l,p,f);if("HTML"!==l.nodeName||E(p))s=c;else{var d=g(e.ownerDocument),h=d.height,m=d.width;s.top+=c.top-c.marginTop,s.bottom=h+c.top,s.left+=c.left-c.marginLeft,s.right=m+c.left}}n=n||0;var v="number"==typeof n;return s.left+=v?n:n.left||0,s.top+=v?n:n.top||0,s.right-=v?n:n.right||0,s.bottom-=v?n:n.bottom||0,s}function L(e){return e.width*e.height}function T(e,t,n,o,r){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=O(n,o,i,r),f={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},s=Object.keys(f).map(function(e){return be({key:e},f[e],{area:L(f[e])})}).sort(function(e,t){return t.area-e.area}),p=s.filter(function(e){var t=e.width,o=e.height;return t>=n.clientWidth&&o>=n.clientHeight}),l=p.length>0?p[0].key:s[0].key,u=e.split("-")[1];return l+(u?"-"+u:"")}function N(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return w(n,o?x(t):u(t,a(n)),o)}function C(e){var t=e.ownerDocument.defaultView,n=t.getComputedStyle(e),o=parseFloat(n.marginTop||0)+parseFloat(n.marginBottom||0),r=parseFloat(n.marginLeft||0)+parseFloat(n.marginRight||0);return{width:e.offsetWidth+r,height:e.offsetHeight+o}}function D(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function M(e,t,n){n=n.split("-")[0];var o=C(e),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),a=i?"top":"left",f=i?"left":"top",s=i?"height":"width",p=i?"width":"height";return r[a]=t[a]+t[s]/2-o[s]/2,r[f]=n===f?t[f]-o[p]:t[D(f)],r}function F(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function S(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var o=F(e,function(e){return e[t]===n});return e.indexOf(o)}function W(e,t,o){return(void 0===o?e:e.slice(0,S(e,"name",o))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var o=e.function||e.fn;e.enabled&&n(o)&&(t.offsets.popper=v(t.offsets.popper),t.offsets.reference=v(t.offsets.reference),t=o(t,e))}),t}function k(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=N(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=T(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=M(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=W(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function H(e,t){return e.some(function(e){var n=e.name;return e.enabled&&n===t})}function P(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),o=0;o<t.length;o++){var r=t[o],i=r?""+r+n:e;if(void 0!==document.body.style[i])return i}return null}function B(){return this.state.isDestroyed=!0,H(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[P("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e){var t=e.ownerDocument;return t?t.defaultView:window}function I(e,t,n,o){var r="BODY"===e.nodeName,a=r?e.ownerDocument.defaultView:e;a.addEventListener(t,n,{passive:!0}),r||I(i(a.parentNode),t,n,o),o.push(a)}function j(e,t,n,o){n.updateBound=o,A(e).addEventListener("resize",n.updateBound,{passive:!0});var r=i(e);return I(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function R(){this.state.eventsEnabled||(this.state=j(this.reference,this.options,this.state,this.scheduleUpdate))}function U(e,t){return A(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function Y(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=U(this.reference,this.state))}function V(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function z(e,t){Object.keys(t).forEach(function(n){var o="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&V(t[n])&&(o="px"),e.style[n]=t[n]+o})}function q(e,t){Object.keys(t).forEach(function(n){!1!==t[n]?e.setAttribute(n,t[n]):e.removeAttribute(n)})}function K(e){return z(e.instance.popper,e.styles),q(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&z(e.arrowElement,e.arrowStyles),e}function _(e,t,n,o,r){var i=N(r,t,e,n.positionFixed),a=T(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",a),z(t,{position:n.positionFixed?"fixed":"absolute"}),n}function G(e,t){var n=e.offsets,o=n.popper,r=n.reference,i=Math.round,a=Math.floor,f=function(e){return e},s=i(r.width),p=i(o.width),l=-1!==["left","right"].indexOf(e.placement),u=-1!==e.placement.indexOf("-"),c=s%2==p%2,d=s%2==1&&p%2==1,h=t?l||u||c?i:a:f,m=t?i:f;return{left:h(d&&!u&&t?o.left-1:o.left),top:m(o.top),bottom:m(o.bottom),right:h(o.right)}}function Q(e,t){var n=t.x,o=t.y,r=e.offsets.popper,i=F(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==i?i:t.gpuAcceleration,f=s(e.instance.popper),p=b(f),l={position:r.position},u=G(e,window.devicePixelRatio<2||!we),c="bottom"===n?"top":"bottom",d="right"===o?"left":"right",h=P("transform"),m=void 0,g=void 0;if(g="bottom"===c?"HTML"===f.nodeName?-f.clientHeight+u.bottom:-p.height+u.bottom:u.top,m="right"===d?"HTML"===f.nodeName?-f.clientWidth+u.right:-p.width+u.right:u.left,a&&h)l[h]="translate3d("+m+"px, "+g+"px, 0)",l[c]=0,l[d]=0,l.willChange="transform";else{var v="bottom"===c?-1:1,w="right"===d?-1:1;l[c]=g*v,l[d]=m*w,l.willChange=c+", "+d}var y={"x-placement":e.placement};return e.attributes=be({},y,e.attributes),e.styles=be({},l,e.styles),e.arrowStyles=be({},e.offsets.arrow,e.arrowStyles),e}function X(e,t,n){var o=F(e,function(e){return e.name===t}),r=!!o&&e.some(function(e){return e.name===n&&e.enabled&&e.order<o.order});if(!r){var i="`"+t+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return r}function J(e,t){var n;if(!X(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;if("string"==typeof r){if(!(r=e.instance.popper.querySelector(r)))return e}else if(!e.instance.popper.contains(r))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var i=e.placement.split("-")[0],a=e.offsets,f=a.popper,s=a.reference,p=-1!==["left","right"].indexOf(i),l=p?"height":"width",u=p?"Top":"Left",c=u.toLowerCase(),d=p?"left":"top",h=p?"bottom":"right",m=C(r)[l];s[h]-m<f[c]&&(e.offsets.popper[c]-=f[c]-(s[h]-m)),s[c]+m>f[h]&&(e.offsets.popper[c]+=s[c]+m-f[h]),e.offsets.popper=v(e.offsets.popper);var g=s[c]+s[l]/2-m/2,b=o(e.instance.popper),w=parseFloat(b["margin"+u]),y=parseFloat(b["border"+u+"Width"]),E=g-e.offsets.popper[c]-w-y;return E=Math.max(Math.min(f[l]-m,E),0),e.arrowElement=r,e.offsets.arrow=(n={},ve(n,c,Math.round(E)),ve(n,d,""),n),e}function Z(e){return"end"===e?"start":"start"===e?"end":e}function $(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Ee.indexOf(e),o=Ee.slice(n+1).concat(Ee.slice(0,n));return t?o.reverse():o}function ee(e,t){if(H(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=O(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),o=e.placement.split("-")[0],r=D(o),i=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case xe.FLIP:a=[o,r];break;case xe.CLOCKWISE:a=$(o);break;case xe.COUNTERCLOCKWISE:a=$(o,!0);break;default:a=t.behavior}return a.forEach(function(f,s){if(o!==f||a.length===s+1)return e;o=e.placement.split("-")[0],r=D(o);var p=e.offsets.popper,l=e.offsets.reference,u=Math.floor,c="left"===o&&u(p.right)>u(l.left)||"right"===o&&u(p.left)<u(l.right)||"top"===o&&u(p.bottom)>u(l.top)||"bottom"===o&&u(p.top)<u(l.bottom),d=u(p.left)<u(n.left),h=u(p.right)>u(n.right),m=u(p.top)<u(n.top),g=u(p.bottom)>u(n.bottom),v="left"===o&&d||"right"===o&&h||"top"===o&&m||"bottom"===o&&g,b=-1!==["top","bottom"].indexOf(o),w=!!t.flipVariations&&(b&&"start"===i&&d||b&&"end"===i&&h||!b&&"start"===i&&m||!b&&"end"===i&&g),y=!!t.flipVariationsByContent&&(b&&"start"===i&&h||b&&"end"===i&&d||!b&&"start"===i&&g||!b&&"end"===i&&m),E=w||y;(c||v||E)&&(e.flipped=!0,(c||v)&&(o=a[s+1]),E&&(i=Z(i)),e.placement=o+(i?"-"+i:""),e.offsets.popper=be({},e.offsets.popper,M(e.instance.popper,e.offsets.reference,e.placement)),e=W(e.instance.modifiers,e,"flip"))}),e}function te(e){var t=e.offsets,n=t.popper,o=t.reference,r=e.placement.split("-")[0],i=Math.floor,a=-1!==["top","bottom"].indexOf(r),f=a?"right":"bottom",s=a?"left":"top",p=a?"width":"height";return n[f]<i(o[s])&&(e.offsets.popper[s]=i(o[s])-n[p]),n[s]>i(o[f])&&(e.offsets.popper[s]=i(o[f])),e}function ne(e,t,n,o){var r=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+r[1],a=r[2];if(!i)return e;if(0===a.indexOf("%")){var f=void 0;switch(a){case"%p":f=n;break;case"%":case"%r":default:f=o}return v(f)[t]/100*i}if("vh"===a||"vw"===a){return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i}return i}function oe(e,t,n,o){var r=[0,0],i=-1!==["right","left"].indexOf(o),a=e.split(/(\+|\-)/).map(function(e){return e.trim()}),f=a.indexOf(F(a,function(e){return-1!==e.search(/,|\s/)}));a[f]&&-1===a[f].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var s=/\s*,\s*|\s+/,p=-1!==f?[a.slice(0,f).concat([a[f].split(s)[0]]),[a[f].split(s)[1]].concat(a.slice(f+1))]:[a];return p=p.map(function(e,o){var r=(1===o?!i:i)?"height":"width",a=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,a=!0,e):a?(e[e.length-1]+=t,a=!1,e):e.concat(t)},[]).map(function(e){return ne(e,r,t,n)})}),p.forEach(function(e,t){e.forEach(function(n,o){V(n)&&(r[t]+=n*("-"===e[o-1]?-1:1))})}),r}function re(e,t){var n=t.offset,o=e.placement,r=e.offsets,i=r.popper,a=r.reference,f=o.split("-")[0],s=void 0;return s=V(+n)?[+n,0]:oe(n,i,a,f),"left"===f?(i.top+=s[0],i.left-=s[1]):"right"===f?(i.top+=s[0],i.left+=s[1]):"top"===f?(i.left+=s[0],i.top-=s[1]):"bottom"===f&&(i.left+=s[0],i.top+=s[1]),e.popper=i,e}function ie(e,t){var n=t.boundariesElement||s(e.instance.popper);e.instance.reference===n&&(n=s(n));var o=P("transform"),r=e.instance.popper.style,i=r.top,a=r.left,f=r[o];r.top="",r.left="",r[o]="";var p=O(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);r.top=i,r.left=a,r[o]=f,t.boundaries=p;var l=t.priority,u=e.offsets.popper,c={primary:function(e){var n=u[e];return u[e]<p[e]&&!t.escapeWithReference&&(n=Math.max(u[e],p[e])),ve({},e,n)},secondary:function(e){var n="right"===e?"left":"top",o=u[n];return u[e]>p[e]&&!t.escapeWithReference&&(o=Math.min(u[n],p[e]-("right"===e?u.width:u.height))),ve({},n,o)}};return l.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";u=be({},u,c[t](e))}),e.offsets.popper=u,e}function ae(e){var t=e.placement,n=t.split("-")[0],o=t.split("-")[1];if(o){var r=e.offsets,i=r.reference,a=r.popper,f=-1!==["bottom","top"].indexOf(n),s=f?"left":"top",p=f?"width":"height",l={start:ve({},s,i[s]),end:ve({},s,i[s]+i[p]-a[p])};e.offsets.popper=be({},a,l[o])}return e}function fe(e){if(!X(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=F(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}function se(e){var t=e.placement,n=t.split("-")[0],o=e.offsets,r=o.popper,i=o.reference,a=-1!==["left","right"].indexOf(n),f=-1===["top","left"].indexOf(n);return r[a?"left":"top"]=i[n]-(f?r[a?"width":"height"]:0),e.placement=D(t),e.offsets.popper=v(r),e}var pe="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,le=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(pe&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}(),ue=pe&&window.Promise,ce=ue?e:t,de=pe&&!(!window.MSInputMethodContext||!document.documentMode),he=pe&&/MSIE 10/.test(navigator.userAgent),me=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},ge=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),ve=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},we=pe&&/Firefox/i.test(navigator.userAgent),ye=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],Ee=ye.slice(3),xe={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},Oe={shift:{order:100,enabled:!0,fn:ae},offset:{order:200,enabled:!0,fn:re,offset:0},preventOverflow:{order:300,enabled:!0,fn:ie,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:te},arrow:{order:500,enabled:!0,fn:J,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:ee,behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:se},hide:{order:800,enabled:!0,fn:fe},computeStyle:{order:850,enabled:!0,fn:Q,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:K,onLoad:_,gpuAcceleration:void 0}},Le={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:Oe},Te=function(){function e(t,o){var r=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};me(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=ce(this.update.bind(this)),this.options=be({},e.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=o&&o.jquery?o[0]:o,this.options.modifiers={},Object.keys(be({},e.Defaults.modifiers,i.modifiers)).forEach(function(t){r.options.modifiers[t]=be({},e.Defaults.modifiers[t]||{},i.modifiers?i.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return be({name:e},r.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&n(e.onLoad)&&e.onLoad(r.reference,r.popper,r.options,e,r.state)}),this.update();var a=this.options.eventsEnabled;a&&this.enableEventListeners(),this.state.eventsEnabled=a}return ge(e,[{key:"update",value:function(){return k.call(this)}},{key:"destroy",value:function(){return B.call(this)}},{key:"enableEventListeners",value:function(){return R.call(this)}},{key:"disableEventListeners",value:function(){return Y.call(this)}}]),e}();return Te.Utils=("undefined"!=typeof window?window:global).PopperUtils,Te.placements=ye,Te.Defaults=Le,Te}),function(e){var t={common:{init:function(){},finalize:function(){}},home:{init:function(){},finalize:function(){}},about_us:{init:function(){}}},n={fire:function(e,n,o){var r,i=t;n=void 0===n?"init":n,r=""!==e,r=r&&i[e],(r=r&&"function"==typeof i[e][n])&&i[e][n](o)},loadEvents:function(){n.fire("common"),e.each(document.body.className.replace(/-/g,"_").split(/\s+/),function(e,t){n.fire(t),n.fire(t,"finalize")}),n.fire("common","finalize")}};e(document).ready(n.loadEvents)}(jQuery);
//# sourceMappingURL=main.js.map
