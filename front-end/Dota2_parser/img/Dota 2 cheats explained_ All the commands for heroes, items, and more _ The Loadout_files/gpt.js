!function(n){var o={};function r(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,r),e.l=!0,e.exports}r.m=n,r.c=o,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=34)}({0:function(t,e,n){"use strict";n.d(e,"d",function(){return o}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return s}),n.d(e,"b",function(){return i}),n.d(e,"o",function(){return l}),n.d(e,"j",function(){return a}),n.d(e,"k",function(){return d}),n.d(e,"i",function(){return u}),n.d(e,"f",function(){return c}),n.d(e,"g",function(){return g}),n.d(e,"h",function(){return f}),n.d(e,"l",function(){return p}),n.d(e,"m",function(){return b}),n.d(e,"n",function(){return y}),n.d(e,"e",function(){return S});var o=nnads.config,r=nnads.cmd,s=nnads.fn.CMPTool,i=nnads.fn.DOMReady,l=(nnads.fn.checkForMoat,nnads.fn.checkPermutive,nnads.fn.loadScript),a=(nnads.fn.loadJSON,nnads.fn.getBrowserWidth),d=nnads.fn.getHeight,u=nnads.fn.elementInViewport,c=(nnads.fn.getCookie,nnads.fn.setCookie,nnads.debug.debugAll),g=nnads.debug.debugging,f=nnads.debug.debuggingTest,p=nnads.debug.getflag,b=nnads.debug.info,y=nnads.debug.kdebug,S=nnads.debug.log},34:function(t,e,n){t.exports=n(54)},54:function(t,e,n){"use strict";n.r(e);function o(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r.n.apply(void 0,["nndebug=gpt",{title:"nn__GPT:"}].concat(e))}var r=n(0),s=window;function i(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,o)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){u(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}!1===s.AdSlots.disableScripts.includes("gpt")&&Object(r.o)("https://securepubads.g.doubleclick.net/tag/js/gpt.js"),s.googletag=s.googletag||{cmd:[]},s.enableSingleRequest=!0,googletag.cmd.push(function(){o("GPT Queue started"),googletag.pubads().disableInitialLoad();var t=s.location.pathname.substring(0,40);googletag.pubads().setTargeting("url",t),Object(r.m)("Ad URL:",t),o("Collapse Empty Divs:","occupy"===s.collapseEmptyDivs?"occupy":!!s.collapseEmptyDivs),"occupy"!==s.collapseEmptyDivs&&googletag.pubads().collapseEmptyDivs(!!s.collapseEmptyDivs),r.h&&(googletag.pubads().setTargeting("testpage","true"),Object(r.m)("Page Condition:","testpage"));var e=Object(r.l)("nntestads",!0)||s.AdSlots.displayMode;"production"!==e&&void 0!==e&&(Object(r.m)("TestMode Enabled:",e),googletag.pubads().setTargeting("testads",e)),s.enableSingleRequest&&(o("Single Request Mode = enabled"),googletag.pubads().enableSingleRequest()),googletag.enableServices(),googletag.pubads().addEventListener("slotRenderEnded",function(t){var e=t.slot.getSlotElementId();"nn_skinl"!==e&&"nn_skinr"!==e||document.getElementById(e)&&(document.getElementById(e).style.display="block"),r.g&&t.isEmpty&&console.warn("EMPTY Ad Slot (unfilled):",t.slot.getSlotElementId())})});var c=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return r.n.apply(void 0,["nndebug=gpt",{title:"nn__GPT:"}].concat(e))},g=window,f=document,p=f.getElementById.bind(f);function b(n,o){var t=2<arguments.length&&void 0!==arguments[2]&&arguments[2];if(!t&&AdSlots.config[n])return console.error("WARNING: Adslot config '".concat(n,"' already exists"));AdSlots.config[n]&&!t&&(o.original=Object.keys(AdSlots.config[n]).filter(function(t){return Object.keys(o).includes(t)}).reduce(function(t,e){return JSON.stringify(o[e])===JSON.stringify(AdSlots.config[n][e])||(t[e]=o[e]),t},{}),o=d(d({},o),AdSlots.config[n])),AdSlots.config[n]=o,c("Slot %c".concat(n,"%c added to config%s"),"font-weight:bold","",t&&AdSlots.config[n]?" (replaced)":"");var e=!0;if((void 0!==o.minWidth&&Object(r.j)()<o.minWidth||void 0!==o.maxWidth&&Object(r.j)()>o.maxWidth)&&(e=!1),AdSlots.divCheck&&!o.skipDivCheck&&!p(o.id))return c("%c".concat(o.id,"%c adslot DOES NOT exist on the page"),"font-weight:bold;color:red","color:red"),!1;e&&(o.defined=!0,googletag.cmd.push(function(){if(AdSlots.slots[n]&&(y(n),delete AdSlots.slots[n]),AdSlots.slots[n]=googletag.defineSlot(o.path,o.sizes,o.id).addService(googletag.pubads()),o.targeting)for(var t in o.targeting)AdSlots.slots[n].setTargeting(t,o.targeting[t]);var e;void 0!==o.setCollapseEmptyDiv&&(e=AdSlots.slots[n]).setCollapseEmptyDiv.apply(e,i(Array.isArray(o.setCollapseEmptyDiv)?o.setCollapseEmptyDiv:[o.setCollapseEmptyDiv]));c("Slot Defined:",o)}))}function y(t){var e=[];return"string"==typeof t&&(t=[t]),void 0!==t&&t.length?(t.forEach(function(t){AdSlots.slots[t]&&e.push(AdSlots.slots[t])}),c("Destroyed Slots:",t),googletag.destroySlots(e)):(c("All Slots Destroyed"),googletag.destroySlots())}function S(){var t=AdSlots.config,e=[];for(var n in t){var o=p(t[n].id);o&&Object(r.i)(o)&&e.push(n)}return c("Slots InView:",e),e}function m(){var t=AdSlots.config,e=[];for(var n in t){var o=p(t[n].id);o&&"none"===g.getComputedStyle(o).display&&e.push(n)}return c("Empty Slots",e),e}g.AdSlots=g.AdSlots||{config:{},slots:{}},g.generateAdSlot=b,g.refreshAdSlots=function(t){AdSlots.meta=AdSlots.meta||{refreshCount:0},AdSlots.meta.refreshCount||(AdSlots.meta.refreshCount=0);var e=AdSlots.meta.refreshCount;0<=AdSlots.meta.refreshCount&&googletag.cmd.push(function(){googletag.pubads().setTargeting("refresh",JSON.stringify(e))}),AdSlots.meta.refreshCount++;var n=[];if("string"==typeof t&&(t=[t]),g.dispatchEvent(new CustomEvent("nn_refresh",{detail:{slots:t}})),void 0===t||!t.length)return c("All Slots Refreshed",Object.keys(AdSlots.slots)),googletag.cmd.push(function(){return Object.values(AdSlots.slots).forEach(function(t){googletag.display(t.getSlotElementId())}),googletag.pubads().refresh(null)});t.forEach(function(t){AdSlots.slots[t]&&n.push(AdSlots.slots[t])}),0===n.length&&console.warn("REFRESH mismatch for ".concat(t.join(", ")," !!! No matching slot(s). failed.")),n&&(n.forEach(function(t){return googletag.display(t)}),googletag.cmd.push(function(){return googletag.pubads().refresh(n)}),c("Refreshed Slots:",t))},g.destroyAdSlots=y,g.excludeAdSlots=function(e){return Object.keys(AdSlots.config).filter(function(t){return!e.includes(t)}).reduce(function(t,e){return[].concat(i(t),[e])},[])},g.getAdSlotsInView=S,g.AdSlots.getInView=S,g.getEmptyAdSlots=m,g.AdSlots.getEmptySlots=m,g.getSlots=function(){return[].concat(i(m()),i(S()))};var v=window;r.c.push("gpt",function(){googletag.cmd.push(function(){Object(r.b)(function(){!function(t){var e=0<arguments.length&&void 0!==t?t:[],n=r.d.modules.gpt;if(e.length<1)for(var o in n.units)e.push(o);e.forEach(function(t){var e=n.units[t];if(!e)return console.error('%cWARNING%c "%s" is NOT a valid ad unit id',"font-weight:bold","",t);e.path="".concat(n.networkid,"/").concat(n.siteid,"/").concat(e.path),e.id=t,e.collapseEmptyDivs&&(e.setCollapseEmptyDiv=!0),e.collapseBeforeAdFetch&&(e.setCollapseEmptyDiv=[!0,!0]),e.skipFirstPageLoad?v.AdSlots.config[t]=e:b(t,e)})}(nnads.queuedSlotIds),v.dispatchEvent(new Event("nn_post_setup"))})})})}});