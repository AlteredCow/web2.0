!function(a,b){"use strict";function P(a,b,c){if(!a)throw O("areq","Argument '{0}' is {1}",b||"?",c||"required");return a}function Q(a,b){return a||b?a?b?(h(a)&&(a=a.join(" ")),h(b)&&(b=b.join(" ")),a+" "+b):a:b:""}function R(a){var b={};return a&&(a.to||a.from)&&(b.to=a.to,b.from=a.from),b}function S(a,b,c){var d="";return a=h(a)?a:a&&i(a)&&a.length?a.split(/\s+/):[],g(a,function(a,e){a&&a.length>0&&(d+=e>0?" ":"",d+=c?b+a:a+b)}),d}function T(a,b){var c=a.indexOf(b);b>=0&&a.splice(c,1)}function U(a){if(a instanceof f)switch(a.length){case 0:return a;case 1:if(a[0].nodeType===o)return a;break;default:return f(V(a))}if(a.nodeType===o)return f(a)}function V(a){if(!a[0])return a;for(var b=0;b<a.length;b++){var c=a[b];if(c.nodeType==o)return c}}function W(a,b,c){g(b,function(b){a.addClass(b,c)})}function X(a,b,c){g(b,function(b){a.removeClass(b,c)})}function Y(a){return function(b,c){c.addClass&&(W(a,b,c.addClass),c.addClass=null),c.removeClass&&(X(a,b,c.removeClass),c.removeClass=null)}}function Z(a){if(a=a||{},!a.$$prepared){var b=a.domOperation||c;a.domOperation=function(){a.$$domOperationFired=!0,b(),b=c},a.$$prepared=!0}return a}function $(a,b){_(a,b),aa(a,b)}function _(a,b){b.from&&(a.css(b.from),b.from=null)}function aa(a,b){b.to&&(a.css(b.to),b.to=null)}function ba(a,b,d){var f=b.options||{},g=d.options||{},h=(f.addClass||"")+" "+(g.addClass||""),i=(f.removeClass||"")+" "+(g.removeClass||""),j=ca(a.attr("class"),h,i);g.preparationClasses&&(f.preparationClasses=ja(g.preparationClasses,f.preparationClasses),delete g.preparationClasses);var k=f.domOperation!==c?f.domOperation:null;return e(f,g),k&&(f.domOperation=k),j.addClass?f.addClass=j.addClass:f.addClass=null,j.removeClass?f.removeClass=j.removeClass:f.removeClass=null,b.addClass=f.addClass,b.removeClass=f.removeClass,f}function ca(a,b,c){function j(a){i(a)&&(a=a.split(" "));var b={};return g(a,function(a){a.length&&(b[a]=!0)}),b}var d=1,e=-1,f={};a=j(a),b=j(b),g(b,function(a,b){f[b]=d}),c=j(c),g(c,function(a,b){f[b]=f[b]===d?null:e});var h={addClass:"",removeClass:""};return g(f,function(b,c){var f,g;b===d?(f="addClass",g=!a[c]):b===e&&(f="removeClass",g=a[c]),g&&(h[f].length&&(h[f]+=" "),h[f]+=c)}),h}function da(a){return a instanceof b.element?a[0]:a}function ea(a,b,c){var d="";b&&(d=S(b,s,!0)),c.addClass&&(d=ja(d,S(c.addClass,q))),c.removeClass&&(d=ja(d,S(c.removeClass,r))),d.length&&(c.preparationClasses=d,a.addClass(d))}function fa(a,b){b.preparationClasses&&(a.removeClass(b.preparationClasses),b.preparationClasses=null),b.activeClasses&&(a.removeClass(b.activeClasses),b.activeClasses=null)}function ga(a,b){var c=b?"-"+b+"s":"";return ia(a,[L,c]),[L,c]}function ha(a,b){var c=b?"paused":"",d=A+H;return ia(a,[d,c]),[d,c]}function ia(a,b){var c=b[0],d=b[1];a.style[c]=d}function ja(a,b){return a?b?a+" "+b:a:b}function ta(a){return[K,a+"s"]}function ua(a,b){return[b?J:L,a+"s"]}function va(a,b,c){var d=Object.create(null),e=a.getComputedStyle(b)||{};return g(c,function(a,b){var c=e[a];if(c){var f=c.charAt(0);("-"===f||"+"===f||f>=0)&&(c=wa(c)),0===c&&(c=null),d[b]=c}}),d}function wa(a){var b=0,c=a.split(/\s*,\s*/);return g(c,function(a){"s"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1)),a=parseFloat(a)||0,b=b?Math.max(a,b):a}),b}function xa(a){return 0===a||null!=a}function ya(a,b){var c=y,d=a+"s";return b?c+=C:d+=" linear all",[c,d]}function za(){var a=Object.create(null);return{flush:function(){a=Object.create(null)},count:function(b){var c=a[b];return c?c.total:0},get:function(b){var c=a[b];return c&&c.value},put:function(b,c){a[b]?a[b].total++:a[b]={total:1,value:c}}}}function Aa(a,b,c){g(c,function(c){a[c]=l(a[c])?a[c]:b.style.getPropertyValue(c)})}var y,z,A,B,c=b.noop,d=b.copy,e=b.extend,f=b.element,g=b.forEach,h=b.isArray,i=b.isString,j=b.isObject,k=b.isUndefined,l=b.isDefined,m=b.isFunction,n=b.isElement,o=1,q="-add",r="-remove",s="ng-",t="-active",u="-prepare",v="ng-animate",w="$$ngAnimateChildren";k(a.ontransitionend)&&l(a.onwebkittransitionend)?("-webkit-",y="WebkitTransition",z="webkitTransitionEnd transitionend"):(y="transition",z="transitionend"),k(a.onanimationend)&&l(a.onwebkitanimationend)?("-webkit-",A="WebkitAnimation",B="webkitAnimationEnd animationend"):(A="animation",B="animationend");var C="Duration",D="Property",E="Delay",F="TimingFunction",G="IterationCount",H="PlayState",I=9999,J=A+E,K=A+C,L=y+E,M=y+C,O=b.$$minErr("ng"),ka=["$$rAF",function(a){function d(a){b=b.concat(a),e()}function e(){if(b.length){for(var d=b.shift(),f=0;f<d.length;f++)d[f]();c||a(function(){c||e()})}}var b,c;return b=d.queue=[],d.waitUntilQuiet=function(b){c&&c(),c=a(function(){c=null,b(),e()})},d}],la=["$interpolate",function(a){return{link:function(c,d,e){function g(a){a="on"===a||"true"===a,d.data(w,a)}var f=e.ngAnimateChildren;b.isString(f)&&0===f.length?d.data(w,!0):(g(a(f)(c)),e.$observe("ngAnimateChildren",g))}}}],ma="$$animateCss",na=1e3,pa=3,qa=1.5,ra={transitionDuration:M,transitionDelay:L,transitionProperty:y+D,animationDuration:K,animationDelay:J,animationIterationCount:A+G},sa={transitionDuration:M,transitionDelay:L,animationDuration:K,animationDelay:J},Ba=["$animateProvider",function(a){var b=za(),e=za();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(a,f,i,j,k,l,m,n){function u(a,b){var c="$$ngAnimateParentKey",d=a.parentNode;return(d[c]||(d[c]=++p))+"-"+a.getAttribute("class")+"-"+b}function v(c,d,e,f){var g=b.get(e);return g||(g=va(a,c,f),"infinite"===g.animationIterationCount&&(g.animationIterationCount=1)),b.put(e,g),g}function w(c,d,g,h){var i;if(b.count(g)>0&&!(i=e.get(g))){var j=S(d,"-stagger");f.addClass(c,j),i=va(a,c,h),i.animationDuration=Math.max(i.animationDuration,0),i.transitionDuration=Math.max(i.transitionDuration,0),f.removeClass(c,j),e.put(g,i)}return i||{}}function E(a){C.push(a),m.waitUntilQuiet(function(){b.flush(),e.flush();for(var a=k(),c=0;c<C.length;c++)C[c](a);C.length=0})}function G(a,b,c){var d=v(a,b,c,ra),e=d.animationDelay,f=d.transitionDelay;return d.maxDelay=e&&f?Math.max(e,f):e||f,d.maxDuration=Math.max(d.animationDuration*d.animationIterationCount,d.transitionDuration),d}var o=Y(f),p=0,C=[];return function(e,k){function Ja(){La()}function Ka(){La(!0)}function La(a){if(!(J||L&&K)){J=!0,K=!1,m.$$skipPreparationClasses||f.removeClass(e,ea),f.removeClass(e,ja),ha(v,!1),ga(v,!1),g(x,function(a){v.style[a[0]]=""}),o(e,m),$(e,m),Object.keys(p).length&&g(p,function(a,b){a?v.style.setProperty(b,a):v.style.removeProperty(b)}),m.onDone&&m.onDone(),W&&W.length&&e.off(W.join(" "),Oa);var b=e.data(ma);b&&(j.cancel(b[0].timer),e.removeData(ma)),M&&M.complete(!a)}}function Ma(a){Ha.blockTransition&&ga(v,a),Ha.blockKeyframeAnimation&&ha(v,!!a)}function Na(){return M=new i({end:Ja,cancel:Ka}),E(c),La(),{$$willAnimate:!1,start:function(){return M},end:Ja}}function Oa(a){a.stopPropagation();var b=a.originalEvent||a,c=b.$manualTimeStamp||Date.now(),d=parseFloat(b.elapsedTime.toFixed(pa));Math.max(c-V,0)>=P&&d>=Q&&(L=!0,La())}function Pa(){function c(){if(!J){if(Ma(!1),g(x,function(a){var b=a[0],c=a[1];v.style[b]=c}),o(e,m),f.addClass(e,ja),Ha.recalculateTimingStyles){if(fa=v.className+" "+ea,oa=u(v,fa),Fa=G(v,fa,oa),Ga=Fa.maxDelay,O=Math.max(Ga,0),0===(Q=Fa.maxDuration))return void La();Ha.hasTransitions=Fa.transitionDuration>0,Ha.hasAnimations=Fa.animationDuration>0}if(Ha.applyAnimationDelay&&(Ga="boolean"!=typeof m.delay&&xa(m.delay)?parseFloat(m.delay):Ga,O=Math.max(Ga,0),Fa.animationDelay=Ga,Ia=ua(Ga,!0),x.push(Ia),v.style[Ia[0]]=Ia[1]),P=O*na,U=Q*na,m.easing){var a,b=m.easing;Ha.hasTransitions&&(a=y+F,x.push([a,b]),v.style[a]=b),Ha.hasAnimations&&(a=A+F,x.push([a,b]),v.style[a]=b)}Fa.transitionDuration&&W.push(z),Fa.animationDuration&&W.push(B),V=Date.now();var c=P+qa*U,h=V+c,i=e.data(ma)||[],k=!0;if(i.length){var l=i[0];k=h>l.expectedEndTime,k?j.cancel(l.timer):i.push(La)}if(k){var n=j(d,c,!1);i[0]={timer:n,expectedEndTime:h},i.push(La),e.data(ma,i)}W.length&&e.on(W.join(" "),Oa),m.to&&(m.cleanupStyles&&Aa(p,v,Object.keys(m.to)),aa(e,m))}}function d(){var a=e.data(ma);if(a){for(var b=1;b<a.length;b++)a[b]();e.removeData(ma)}}if(!J){if(!v.parentNode)return void La();var a=function(a){if(L)K&&a&&(K=!1,La());else if(K=!a,Fa.animationDuration){var b=ha(v,K);K?x.push(b):T(x,b)}},b=Da>0&&(Fa.transitionDuration&&0===ra.transitionDuration||Fa.animationDuration&&0===ra.animationDuration)&&Math.max(ra.animationDelay,ra.transitionDelay);b?j(c,Math.floor(b*Da*na),!1):c(),N.resume=function(){a(!0)},N.pause=function(){a(!1)}}}var m=k||{};m.$$prepared||(m=Z(d(m)));var p={},v=da(e);if(!v||!v.parentNode||!n.enabled())return Na();var J,K,L,M,N,O,P,Q,U,V,x=[],C=e.attr("class"),H=R(m),W=[];if(0===m.duration||!l.animations&&!l.transitions)return Na();var X=m.event&&h(m.event)?m.event.join(" "):m.event,Y=X&&m.structural,ba="",ca="";Y?ba=S(X,s,!0):X&&(ba=X),m.addClass&&(ca+=S(m.addClass,q)),m.removeClass&&(ca.length&&(ca+=" "),ca+=S(m.removeClass,r)),m.applyClassesEarly&&ca.length&&o(e,m);var ea=[ba,ca].join(" ").trim(),fa=C+" "+ea,ja=S(ea,t),ka=H.to&&Object.keys(H.to).length>0;if(!((m.keyframeStyle||"").length>0||ka||ea))return Na();var oa,ra;if(m.stagger>0){var va=parseFloat(m.stagger);ra={transitionDelay:va,animationDelay:va,transitionDuration:0,animationDuration:0}}else oa=u(v,fa),ra=w(v,ea,oa,sa);m.$$skipPreparationClasses||f.addClass(e,ea);var wa;if(m.transitionStyle){var za=[y,m.transitionStyle];ia(v,za),x.push(za)}if(m.duration>=0){wa=v.style[y].length>0;var Ba=ya(m.duration,wa);ia(v,Ba),x.push(Ba)}if(m.keyframeStyle){var Ca=[A,m.keyframeStyle];ia(v,Ca),x.push(Ca)}var Da=ra?m.staggerIndex>=0?m.staggerIndex:b.count(oa):0,Ea=0===Da;Ea&&!m.skipBlocking&&ga(v,I);var Fa=G(v,fa,oa),Ga=Fa.maxDelay;O=Math.max(Ga,0),Q=Fa.maxDuration;var Ha={};if(Ha.hasTransitions=Fa.transitionDuration>0,Ha.hasAnimations=Fa.animationDuration>0,Ha.hasTransitionAll=Ha.hasTransitions&&"all"==Fa.transitionProperty,Ha.applyTransitionDuration=ka&&(Ha.hasTransitions&&!Ha.hasTransitionAll||Ha.hasAnimations&&!Ha.hasTransitions),Ha.applyAnimationDuration=m.duration&&Ha.hasAnimations,Ha.applyTransitionDelay=xa(m.delay)&&(Ha.applyTransitionDuration||Ha.hasTransitions),Ha.applyAnimationDelay=xa(m.delay)&&Ha.hasAnimations,Ha.recalculateTimingStyles=ca.length>0,(Ha.applyTransitionDuration||Ha.applyAnimationDuration)&&(Q=m.duration?parseFloat(m.duration):Q,Ha.applyTransitionDuration&&(Ha.hasTransitions=!0,Fa.transitionDuration=Q,wa=v.style[y+D].length>0,x.push(ya(Q,wa))),Ha.applyAnimationDuration&&(Ha.hasAnimations=!0,Fa.animationDuration=Q,x.push(ta(Q)))),0===Q&&!Ha.recalculateTimingStyles)return Na();if(null!=m.delay){var Ia;"boolean"!=typeof m.delay&&(Ia=parseFloat(m.delay),O=Math.max(Ia,0)),Ha.applyTransitionDelay&&x.push(ua(Ia)),Ha.applyAnimationDelay&&x.push(ua(Ia,!0))}return null==m.duration&&Fa.transitionDuration>0&&(Ha.recalculateTimingStyles=Ha.recalculateTimingStyles||Ea),P=O*na,U=Q*na,m.skipBlocking||(Ha.blockTransition=Fa.transitionDuration>0,Ha.blockKeyframeAnimation=Fa.animationDuration>0&&ra.animationDelay>0&&0===ra.animationDuration),m.from&&(m.cleanupStyles&&Aa(p,v,Object.keys(m.from)),_(e,m)),Ha.blockTransition||Ha.blockKeyframeAnimation?Ma(Q):m.skipBlocking||ga(v,!1),{$$willAnimate:!0,end:Ja,start:function(){if(!J)return N={end:Ja,cancel:Ka,resume:null,pause:null},M=new i(N),E(Pa),M}}}}]}],Ca=["$$animationProvider",function(a){function j(a){return a.parentNode&&11===a.parentNode.nodeType}a.drivers.push("$$animateCssDriver");var b="ng-animate-shim",e="ng-anchor-out";this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(a,k,l,m,n,o,p){function u(a){return a.replace(/\bng-\S+\b/g,"")}function v(a,b){return i(a)&&(a=a.split(" ")),i(b)&&(b=b.split(" ")),a.filter(function(a){return-1===b.indexOf(a)}).join(" ")}function w(c,i,j){function r(a){var b={},c=da(a).getBoundingClientRect();return g(["width","height","top","left"],function(a){var d=c[a];switch(a){case"top":d+=q.scrollTop;break;case"left":d+=q.scrollLeft}b[a]=Math.floor(d)+"px"}),b}function t(){var b=a(k,{addClass:e,delay:!0,from:r(i)});return b.$$willAnimate?b:null}function w(a){return a.attr("class")||""}function x(){var b=u(w(j)),c=v(b,m),d=v(m,b),f=a(k,{to:r(j),addClass:"ng-anchor-in "+c,removeClass:e+" "+d,delay:!0});return f.$$willAnimate?f:null}function y(){k.remove(),i.removeClass(b),j.removeClass(b)}var k=f(da(i).cloneNode(!0)),m=u(w(k));i.addClass(b),j.addClass(b),k.addClass("ng-anchor"),s.append(k);var n,o=t();if(!o&&!(n=x()))return y();var p=o||n;return{start:function(){function c(){b&&b.end()}var a,b=p.start();return b.done(function(){if(b=null,!n&&(n=x()))return b=n.start(),b.done(function(){b=null,y(),a.complete()}),b;y(),a.complete()}),a=new l({end:c,cancel:c})}}}function x(a,b,d,e){var f=y(a,c),h=y(b,c),i=[];if(g(e,function(a){var b=a.out,c=a.in,e=w(d,b,c);e&&i.push(e)}),f||h||0!==i.length)return{start:function(){function c(){g(a,function(a){a.end()})}var a=[];f&&a.push(f.start()),h&&a.push(h.start()),g(i,function(b){a.push(b.start())});var b=new l({end:c,cancel:c});return l.all(a,function(a){b.complete(a)}),b}}}function y(b){var c=b.element,d=b.options||{};b.structural&&(d.event=b.event,d.structural=!0,d.applyClassesEarly=!0,"leave"===b.event&&(d.onDone=d.domOperation)),d.preparationClasses&&(d.event=ja(d.event,d.preparationClasses));var e=a(c,d);return e.$$willAnimate?e:null}if(!n.animations&&!n.transitions)return c;var q=p[0].body,r=da(m),s=f(j(r)||q.contains(r)?r:q);return Y(o),function(b){return b.from&&b.to?x(b.from,b.to,b.classes,b.anchors):y(b)}}]}],Da=["$animateProvider",function(a){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(b,d,e){function i(c){c=h(c)?c:c.split(" ");for(var d=[],e={},f=0;f<c.length;f++){var g=c[f],i=a.$$registeredAnimations[g];i&&!e[g]&&(d.push(b.get(i)),e[g]=!0)}return d}var f=Y(e);return function(a,b,e,h){function t(){h.domOperation(),f(a,h)}function u(){k=!0,t(),$(a,h)}function w(a,b,e,f,g){var h;switch(e){case"animate":h=[b,f.from,f.to,g];break;case"setClass":h=[b,l,n,g];break;case"addClass":h=[b,l,g];break;case"removeClass":h=[b,n,g];break;default:h=[b,g]}h.push(f);var i=a.apply(a,h);if(i)if(m(i.start)&&(i=i.start()),i instanceof d)i.done(g);else if(m(i))return i;return c}function x(a,b,e,f,h){var i=[];return g(f,function(f){var g=f[h];g&&i.push(function(){var f,h,i=!1,j=function(a){i||(i=!0,(h||c)(a),f.complete(!a))};return f=new d({end:function(){j()},cancel:function(){j(!0)}}),h=w(g,a,b,e,function(a){j(!1===a)}),f})}),i}function y(a,b,c,e,f){var h=x(a,b,c,e,f);if(0===h.length){var i,j;"beforeSetClass"===f?(i=x(a,"removeClass",c,e,"beforeRemoveClass"),j=x(a,"addClass",c,e,"beforeAddClass")):"setClass"===f&&(i=x(a,"removeClass",c,e,"removeClass"),j=x(a,"addClass",c,e,"addClass")),i&&(h=h.concat(i)),j&&(h=h.concat(j))}if(0!==h.length)return function(b){var c=[];return h.length&&g(h,function(a){c.push(a())}),c.length?d.all(c,b):b(),function(b){g(c,function(a){b?a.cancel():a.end()})}}}var k=!1;3===arguments.length&&j(e)&&(h=e,e=null),h=Z(h),e||(e=a.attr("class")||"",h.addClass&&(e+=" "+h.addClass),h.removeClass&&(e+=" "+h.removeClass));var p,q,l=h.addClass,n=h.removeClass,o=i(e);if(o.length){var r,s;"leave"==b?(s="leave",r="afterLeave"):(s="before"+b.charAt(0).toUpperCase()+b.substr(1),r=b),"enter"!==b&&"move"!==b&&(p=y(a,b,h,o,s)),q=y(a,b,h,o,r)}if(p||q){var v;return{$$willAnimate:!0,end:function(){return v?v.end():(u(),v=new d,v.complete(!0)),v},start:function(){function e(a){u(a),v.complete(a)}function f(b){k||((a||c)(b),e(b))}if(v)return v;v=new d;var a,b=[];return p&&b.push(function(b){a=p(b)}),b.length?b.push(function(a){t(),a(!0)}):t(),q&&b.push(function(b){a=q(b)}),v.setHost({end:function(){f()},cancel:function(){f(!0)}}),d.chain(b,e),v}}}}}]}],Ea=["$$animationProvider",function(a){a.drivers.push("$$animateJsDriver"),this.$get=["$$animateJs","$$AnimateRunner",function(a,b){function c(b){var c=b.element,d=b.event,e=b.options,f=b.classes;return a(c,d,f,e)}return function(d){if(d.from&&d.to){var e=c(d.from),f=c(d.to);if(!e&&!f)return;return{start:function(){function d(){return function(){g(a,function(a){a.end()})}}function h(a){c.complete(a)}var a=[];e&&a.push(e.start()),f&&a.push(f.start()),b.all(a,h);var c=new b({end:d(),cancel:d()});return c}}}return c(d)}}]}],Fa="data-ng-animate",Ga="$ngAnimatePin",Ha=["$animateProvider",function(c){function s(a){if(!a)return null;var b=a.split(q),c=Object.create(null);return g(b,function(a){c[a]=!0}),c}function t(a,b){if(a&&b){var c=s(b);return a.split(q).some(function(a){return c[a]})}}function u(a,b,c,d){return r[a].some(function(a){return a(b,c,d)})}function v(a,b){var c=(a.addClass||"").length>0,d=(a.removeClass||"").length>0;return b?c&&d:c||d}var m=1,p=2,q=" ",r=this.rules={skip:[],cancel:[],join:[]};r.join.push(function(a,b,c){return!b.structural&&v(b)}),r.skip.push(function(a,b,c){return!b.structural&&!v(b)}),r.skip.push(function(a,b,c){return"leave"==c.event&&b.structural}),r.skip.push(function(a,b,c){return c.structural&&c.state===p&&!b.structural}),r.cancel.push(function(a,b,c){return c.structural&&b.structural}),r.cancel.push(function(a,b,c){return c.state===p&&b.structural}),r.cancel.push(function(a,b,c){if(c.structural)return!1;var d=b.addClass,e=b.removeClass,f=c.addClass,g=c.removeClass;return!(k(d)&&k(e)||k(f)&&k(g))&&(t(d,g)||t(e,f))}),this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(q,r,s,t,x,y,z,A,B,C){function G(){var a=!1;return function(b){a?b():r.$$postDigest(function(){a=!0,b()})}}function M(a,b){return ba(a,b,{})}function O(a,b,c){var d=da(b),e=da(a),f=[],h=I[c];return h&&g(h,function(a){N.call(a.node,d)?f.push(a.callback):"leave"===c&&N.call(a.node,e)&&f.push(a.callback)}),f}function Q(a,b,c){var d=V(b);return a.filter(function(a){return!(a.node===d&&(!c||a.callback===c))})}function R(a,b){"close"!==a||b[0].parentNode||S.off(b)}function T(a,b,c){function Q(b,c,d,e){n(function(){var b=O(k,a,c);b.length?q(function(){g(b,function(b){b(a,d,e)}),R(d,a)}):R(d,a)}),b.progress(c,d,e)}function S(b){fa(a,e),L(a,e),$(a,e),e.domOperation(),l.complete(!b)}var f,k,e=d(c);a=U(a),a&&(f=da(a),k=a.parent()),e=Z(e);var l=new z,n=G();if(h(e.addClass)&&(e.addClass=e.addClass.join(" ")),e.addClass&&!i(e.addClass)&&(e.addClass=null),h(e.removeClass)&&(e.removeClass=e.removeClass.join(" ")),e.removeClass&&!i(e.removeClass)&&(e.removeClass=null),e.from&&!j(e.from)&&(e.from=null),e.to&&!j(e.to)&&(e.to=null),!f)return S(),l;var o=[f.className,e.addClass,e.removeClass].join(" ");if(!K(o))return S(),l;var s=["enter","move","leave"].indexOf(b)>=0,w=t[0].hidden,x=!F||w||E.get(f),A=!x&&D.get(f)||{},B=!!A.state;if(x||B&&A.state==m||(x=!aa(a,k,b)),x)return w&&Q(l,b,"start"),S(),w&&Q(l,b,"close"),l;s&&W(a);var C={structural:s,element:a,event:b,addClass:e.addClass,removeClass:e.removeClass,close:S,options:e,runner:l};if(B){if(u("skip",a,C,A))return A.state===p?(S(),l):(ba(a,A,C),A.runner);if(u("cancel",a,C,A))if(A.state===p)A.runner.end();else{if(!A.structural)return ba(a,A,C),A.runner;A.close()}else{if(u("join",a,C,A)){if(A.state!==p)return ea(a,s?b:null,e),b=C.event=A.event,e=ba(a,A,C),A.runner;M(a,C)}}}else M(a,C);var N=C.structural;if(N||(N="animate"===C.event&&Object.keys(C.options.to||{}).length>0||v(C)),!N)return S(),X(a),l;var P=(A.counter||0)+1;return C.counter=P,ca(a,m,C),r.$$postDigest(function(){var c=D.get(f),d=!c;c=c||{};var g=a.parent()||[],h=g.length>0&&("animate"===c.event||c.structural||v(c));if(d||c.counter!==P||!h)return d&&(L(a,e),$(a,e)),(d||s&&c.event!==b)&&(e.domOperation(),l.end()),void(h||X(a));b=!c.structural&&v(c,!0)?"setClass":c.event,ca(a,p);var i=y(a,b,c.options);l.setHost(i),Q(l,b,"start",{}),i.done(function(c){S(!c);var d=D.get(f);d&&d.counter===P&&X(da(a)),Q(l,b,"close",{})})}),l}function W(a){var b=da(a),c=b.querySelectorAll("["+Fa+"]");g(c,function(a){var b=parseInt(a.getAttribute(Fa)),c=D.get(a);if(c)switch(b){case p:c.runner.end();case m:D.remove(a)}})}function X(a){var b=da(a);b.removeAttribute(Fa),D.remove(b)}function _(a,b){return da(a)===da(b)}function aa(a,b,c){var i,d=f(t[0].body),e=_(a,d)||"HTML"===a[0].nodeName,g=_(a,s),h=!1,j=E.get(da(a)),m=f.data(a[0],Ga);for(m&&(b=m),b=da(b);b&&(g||(g=_(b,s)),b.nodeType===o);){var n=D.get(b)||{};if(!h){var p=E.get(b);if(!0===p&&!1!==j){j=!0;break}!1===p&&(j=!1),h=n.structural}if(k(i)||!0===i){var q=f.data(b,w);l(q)&&(i=q)}if(h&&!1===i)break;if(e||(e=_(b,d)),e&&g)break;b=g||!(m=f.data(b,Ga))?b.parentNode:da(m)}return(!h||i)&&!0!==j&&g&&e}function ca(a,b,c){c=c||{},c.state=b;var d=da(a);d.setAttribute(Fa,b);var f=D.get(d),g=f?e(f,c):c;D.put(d,g)}var D=new x,E=new x,F=null,H=r.$watch(function(){return 0===A.totalPendingRequests},function(a){a&&(H(),r.$$postDigest(function(){r.$$postDigest(function(){null===F&&(F=!0)})}))}),I={},J=c.classNameFilter(),K=J?function(a){return J.test(a)}:function(){return!0},L=Y(B),N=a.Node.prototype.contains||function(a){return this===a||!!(16&this.compareDocumentPosition(a))},S={on:function(a,b,c){var d=V(b);I[a]=I[a]||[],I[a].push({node:d,callback:c}),f(b).on("$destroy",function(){D.get(d)||S.off(a,b,c)})},off:function(a,c,d){if(1!==arguments.length||b.isString(arguments[0])){var f=I[a];f&&(I[a]=1===arguments.length?null:Q(f,c,d))}else{c=arguments[0];for(var e in I)I[e]=Q(I[e],c)}},pin:function(a,b){P(n(a),"element","not an element"),P(n(b),"parentElement","not an element"),a.data(Ga,b)},push:function(a,b,c,d){return c=c||{},c.domOperation=d,T(a,b,c)},enabled:function(a,b){var c=arguments.length;if(0===c)b=!!F;else{if(n(a)){var e=da(a),f=E.get(e);1===c?b=!f:E.put(e,!b)}else b=F=!!a}return b}};return S}]}],Ia=["$animateProvider",function(a){function e(a,b){a.data(d,b)}function h(a){a.removeData(d)}function i(a){return a.data(d)}var b="ng-animate-ref",c=this.drivers=[],d="$$animationRunner";this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(a,d,j,k,l,m){function p(a){function f(a){if(a.processed)return a;a.processed=!0;var c=a.domNode,e=c.parentNode;d.put(c,a);for(var g;e;){if(g=d.get(e)){g.processed||(g=f(g));break}e=e.parentNode}return(g||b).children.push(a),a}function g(a){var d,b=[],c=[];for(d=0;d<a.children.length;d++)c.push(a.children[d]);var e=c.length,f=0,g=[];for(d=0;d<c.length;d++){var h=c[d];e<=0&&(e=f,f=0,b.push(g),g=[]),g.push(h.fn),h.children.forEach(function(a){f++,c.push(a)}),e--}return g.length&&b.push(g),b}var c,b={children:[]},d=new l;for(c=0;c<a.length;c++){var e=a[c];d.put(e.domNode,a[c]={domNode:e.domNode,fn:e.fn,children:[]})}for(c=0;c<a.length;c++)f(a[c]);return g(b)}var n=[],o=Y(a);return function(l,q,r){function z(a){var c="["+b+"]",d=a.hasAttribute(b)?[a]:a.querySelectorAll(c),e=[];return g(d,function(a){var c=a.getAttribute(b);c&&c.length&&e.push(a)}),e}function A(a){var c=[],d={};g(a,function(a,e){var h=a.element,i=da(h),j=a.event,k=["enter","move"].indexOf(j)>=0,l=a.structural?z(i):[];if(l.length){var m=k?"to":"from";g(l,function(a){var c=a.getAttribute(b);d[c]=d[c]||{},d[c][m]={animationID:e,element:f(a)}})}else c.push(a)});var e={},h={};return g(d,function(b,d){var f=b.from,g=b.to;if(!f||!g){var i=f?f.animationID:g.animationID,j=i.toString();return void(e[j]||(e[j]=!0,c.push(a[i])))}var k=a[f.animationID],l=a[g.animationID],m=f.animationID.toString();if(!h[m]){var n=h[m]={structural:!0,beforeStart:function(){k.beforeStart(),l.beforeStart()},close:function(){k.close(),l.close()},classes:B(k.classes,l.classes),from:k,to:l,anchors:[]};n.classes.length?c.push(n):(c.push(k),c.push(l))}h[m].anchors.push({out:f.element,in:g.element})}),c}function B(a,b){a=a.split(" "),b=b.split(" ");for(var c=[],d=0;d<a.length;d++){var e=a[d];if("ng-"!==e.substring(0,3))for(var f=0;f<b.length;f++)if(e===b[f]){c.push(e);break}}return c.join(" ")}function C(a){for(var b=c.length-1;b>=0;b--){var d=c[b],e=j.get(d),f=e(a);if(f)return f}}function D(){l.addClass(v),x&&a.addClass(l,x),y&&(a.removeClass(l,y),y=null)}function E(a,b){function c(a){var c=i(a);c&&c.setHost(b)}a.from&&a.to?(c(a.from.element),c(a.to.element)):c(a.element)}function F(){var a=i(l);!a||"leave"===q&&r.$$domOperationFired||a.end()}function G(b){l.off("$destroy",F),h(l),o(l,r),$(l,r),r.domOperation(),x&&a.removeClass(l,x),l.removeClass(v),t.complete(!b)}r=Z(r);var s=["enter","move","leave"].indexOf(q)>=0,t=new k({end:function(){G()},cancel:function(){G(!0)}});if(!c.length)return G(),t;e(l,t);var w=Q(l.attr("class"),Q(r.addClass,r.removeClass)),x=r.tempClasses;x&&(w+=" "+x,r.tempClasses=null);var y;return s&&(y="ng-"+q+u,a.addClass(l,y)),n.push({element:l,classes:w,event:q,structural:s,options:r,beforeStart:D,close:G}),l.on("$destroy",F),n.length>1?t:(d.$$postDigest(function(){var a=[];g(n,function(b){i(b.element)?a.push(b):b.close()}),n.length=0;var b=A(a),c=[];g(b,function(a){c.push({domNode:da(a.from?a.from.element:a.element),fn:function(){a.beforeStart();var c,d=a.close;if(i(a.anchors?a.from.element||a.to.element:a.element)){var f=C(a);f&&(c=f.start)}if(c){var g=c();g.done(function(a){d(!a)}),E(a,g)}else d()}})}),m(p(c))}),t)}}]}],Ja=["$animate","$rootScope",function(a,b){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(b,c,d,e,f){var g,h;b.$watchCollection(d.ngAnimateSwap||d.for,function(d){g&&a.leave(g),h&&(h.$destroy(),h=null),(d||0===d)&&(h=b.$new(),f(h,function(b){g=b,a.enter(b,null,c)}))})}}}];b.module("ngAnimate",[]).directive("ngAnimateSwap",Ja).directive("ngAnimateChildren",la).factory("$$rAFScheduler",ka).provider("$$animateQueue",Ha).provider("$$animation",Ia).provider("$animateCss",Ba).provider("$$animateCssDriver",Ca).provider("$$animateJs",Da).provider("$$animateJsDriver",Ea)}(window,window.angular);
