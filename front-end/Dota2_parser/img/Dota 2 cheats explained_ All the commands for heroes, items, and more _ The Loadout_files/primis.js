!function(t){var r={};function o(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=r,o.d=function(n,e,t){o.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:t})},o.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return o.d(e,"a",e),e},o.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},o.p="",o(o.s=49)}({0:function(n,e,t){"use strict";t.d(e,"d",function(){return r}),t.d(e,"c",function(){return o}),t.d(e,"a",function(){return i}),t.d(e,"b",function(){return u}),t.d(e,"o",function(){return d}),t.d(e,"j",function(){return c}),t.d(e,"k",function(){return a}),t.d(e,"i",function(){return f}),t.d(e,"f",function(){return s}),t.d(e,"g",function(){return l}),t.d(e,"h",function(){return p}),t.d(e,"l",function(){return b}),t.d(e,"m",function(){return g}),t.d(e,"n",function(){return m}),t.d(e,"e",function(){return y});var r=nnads.config,o=nnads.cmd,i=nnads.fn.CMPTool,u=nnads.fn.DOMReady,d=(nnads.fn.checkForMoat,nnads.fn.checkPermutive,nnads.fn.loadScript),c=(nnads.fn.loadJSON,nnads.fn.getBrowserWidth),a=nnads.fn.getHeight,f=nnads.fn.elementInViewport,s=(nnads.fn.getCookie,nnads.fn.setCookie,nnads.debug.debugAll),l=nnads.debug.debugging,p=nnads.debug.debuggingTest,b=nnads.debug.getflag,g=nnads.debug.info,m=nnads.debug.kdebug,y=nnads.debug.log},49:function(n,e,t){n.exports=t(64)},64:function(n,e,t){"use strict";t.r(e);var o=t(0),c=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return o.n.apply(void 0,["nndebug=pmp",{title:"nn__PrimisPlayer:",style:"font-weight:bold;font-size:13px;color:brown"}].concat(e))},i=null,u=null,d=null,a=!1,f="https://live.primis.tech/live/liveView.php";function r(n,e,t){var r=document.getElementById(n);if(r&&e){var o="",i=t.queryParams||{},u=Object.keys(i).map(function(n){return n+"="+i[n]}).join("&");i.cbuster||(o="cbuster="+Date.now());var d=[u,o,e?"s="+e:""].filter(function(n){return""!==n&&null!=n}).join("&");c(n,e,t),function(n,e){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("language","javascript"),t.setAttribute("src",f+"?"+e),n.appendChild(t),c("Script added")}(r,d),window.addEventListener("nn_primis_remove",function(){s(n)}),window.dispatchEvent(new CustomEvent("nn_primis_setup",{detail:{player:{elementId:n,siteId:e,options:t,removePrimisPlayer:s}}}))}else c("domElement or siteId is wrong",r,e)}function s(n){document.getElementById(n)&&(document.getElementById(n).remove(),c("Removing Primis Player:",n))}function l(){a&&i&&u&&r(i,u,d)}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function b(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach(function(n){g(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function g(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}window;o.c.push("primis",function(){var n=(o.d.modules.primis||{}).units||[],t={cbuster:Date.now(),subId:"[SUBID_ENCODED]",pubUrl:encodeURIComponent(document.location.href)},r=o.d.supplychain.id||"";n.forEach(function(n){var e=function(n,e,t){var r=b({schain:function(n){return"1.0,1!network-n.com,"+n+",1"}(t)},n);return{divId:e.divId||"",siteId:e.siteId||"",queryParam:r}}(t,n,r);e.divId&&e.siteId&&function(n,e,t){i=n,u=e,d=t,Object(o.b)(function(){var n=new o.a;n.debug=c,a=!0,n.ready(l)})}(e.divId,e.siteId,{queryParams:b({},e.queryParam)})})})}});