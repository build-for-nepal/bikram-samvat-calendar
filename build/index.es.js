import t,{useState as e}from"react";function r(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var n,a={exports:{}};var i=r((n||(n=1,a.exports=function(){var t=1e3,e=6e4,r=36e5,n="millisecond",a="second",i="minute",s="hour",o="day",c="week",u="month",l="quarter",f="year",h="date",d="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},p=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},g={s:p,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),a=r%60;return(e<=0?"+":"-")+p(n,2,"0")+":"+p(a,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),a=e.clone().add(n,u),i=r-a<0,s=e.clone().add(n+(i?-1:1),u);return+(-(n+(r-a)/(i?a-s:s-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:f,w:c,d:o,D:h,h:s,m:i,s:a,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",b={};b[$]=v;var w="$isDayjsObject",O=function(t){return t instanceof x||!(!t||!t[w])},D=function t(e,r,n){var a;if(!e)return $;if("string"==typeof e){var i=e.toLowerCase();b[i]&&(a=i),r&&(b[i]=r,a=i);var s=e.split("-");if(!a&&s.length>1)return t(s[0])}else{var o=e.name;b[o]=e,a=o}return!n&&a&&($=a),a||!n&&$},M=function(t,e){if(O(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new x(r)},S=g;S.l=D,S.i=O,S.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var x=function(){function v(t){this.$L=D(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[w]=!0}var p=v.prototype;return p.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(m);if(n){var a=n[2]-1||0,i=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)):new Date(n[1],a,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)}}return new Date(e)}(t),this.init()},p.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},p.$utils=function(){return S},p.isValid=function(){return!(this.$d.toString()===d)},p.isSame=function(t,e){var r=M(t);return this.startOf(e)<=r&&r<=this.endOf(e)},p.isAfter=function(t,e){return M(t)<this.startOf(e)},p.isBefore=function(t,e){return this.endOf(e)<M(t)},p.$g=function(t,e,r){return S.u(t)?this[e]:this.set(r,t)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(t,e){var r=this,n=!!S.u(e)||e,l=S.p(t),d=function(t,e){var a=S.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?a:a.endOf(o)},m=function(t,e){return S.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},y=this.$W,v=this.$M,p=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case f:return n?d(1,0):d(31,11);case u:return n?d(1,v):d(0,v+1);case c:var $=this.$locale().weekStart||0,b=(y<$?y+7:y)-$;return d(n?p-b:p+(6-b),v);case o:case h:return m(g+"Hours",0);case s:return m(g+"Minutes",1);case i:return m(g+"Seconds",2);case a:return m(g+"Milliseconds",3);default:return this.clone()}},p.endOf=function(t){return this.startOf(t,!1)},p.$set=function(t,e){var r,c=S.p(t),l="set"+(this.$u?"UTC":""),d=(r={},r[o]=l+"Date",r[h]=l+"Date",r[u]=l+"Month",r[f]=l+"FullYear",r[s]=l+"Hours",r[i]=l+"Minutes",r[a]=l+"Seconds",r[n]=l+"Milliseconds",r)[c],m=c===o?this.$D+(e-this.$W):e;if(c===u||c===f){var y=this.clone().set(h,1);y.$d[d](m),y.init(),this.$d=y.set(h,Math.min(this.$D,y.daysInMonth())).$d}else d&&this.$d[d](m);return this.init(),this},p.set=function(t,e){return this.clone().$set(t,e)},p.get=function(t){return this[S.p(t)]()},p.add=function(n,l){var h,d=this;n=Number(n);var m=S.p(l),y=function(t){var e=M(d);return S.w(e.date(e.date()+Math.round(t*n)),d)};if(m===u)return this.set(u,this.$M+n);if(m===f)return this.set(f,this.$y+n);if(m===o)return y(1);if(m===c)return y(7);var v=(h={},h[i]=e,h[s]=r,h[a]=t,h)[m]||1,p=this.$d.getTime()+n*v;return S.w(p,this)},p.subtract=function(t,e){return this.add(-1*t,e)},p.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||d;var n=t||"YYYY-MM-DDTHH:mm:ssZ",a=S.z(this),i=this.$H,s=this.$m,o=this.$M,c=r.weekdays,u=r.months,l=r.meridiem,f=function(t,r,a,i){return t&&(t[r]||t(e,n))||a[r].slice(0,i)},h=function(t){return S.s(i%12||12,t,"0")},m=l||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace(y,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return S.s(e.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return f(r.monthsShort,o,u,3);case"MMMM":return f(u,o);case"D":return e.$D;case"DD":return S.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(r.weekdaysMin,e.$W,c,2);case"ddd":return f(r.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(i);case"HH":return S.s(i,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return m(i,s,!0);case"A":return m(i,s,!1);case"m":return String(s);case"mm":return S.s(s,2,"0");case"s":return String(e.$s);case"ss":return S.s(e.$s,2,"0");case"SSS":return S.s(e.$ms,3,"0");case"Z":return a}return null}(t)||a.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(n,h,d){var m,y=this,v=S.p(h),p=M(n),g=(p.utcOffset()-this.utcOffset())*e,$=this-p,b=function(){return S.m(y,p)};switch(v){case f:m=b()/12;break;case u:m=b();break;case l:m=b()/3;break;case c:m=($-g)/6048e5;break;case o:m=($-g)/864e5;break;case s:m=$/r;break;case i:m=$/e;break;case a:m=$/t;break;default:m=$}return d?m:S.a(m)},p.daysInMonth=function(){return this.endOf(u).$D},p.$locale=function(){return b[this.$L]},p.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=D(t,e,!0);return n&&(r.$L=n),r},p.clone=function(){return S.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},v}(),j=x.prototype;return M.prototype=j,[["$ms",n],["$s",a],["$m",i],["$H",s],["$W",o],["$M",u],["$y",f],["$D",h]].forEach((function(t){j[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,x,M),t.$i=!0),M},M.locale=D,M.isDayjs=O,M.unix=function(t){return M(1e3*t)},M.en=b[$],M.Ls=b,M.p={},M}()),a.exports)),s=["January","February","March","April","May","June","July","August","September","October","November","December"];function o(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return t.filter(Boolean).join(" ")}var c={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},u=t.createContext&&t.createContext(c),l=["attr","size","title"];function f(t,e){if(null==t)return{};var r,n,a=function(t,e){if(null==t)return{};var r={};for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){if(e.indexOf(n)>=0)continue;r[n]=t[n]}return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(n=0;n<i.length;n++)r=i[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}function h(){return h=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},h.apply(this,arguments)}function d(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?d(Object(r),!0).forEach((function(e){y(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function y(t,e,r){var n;return(e="symbol"==typeof(n=function(t,e){if("object"!=typeof t||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(e,"string"))?n:n+"")in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function v(e){return e&&e.map(((e,r)=>t.createElement(e.tag,m({key:r},e.attr),v(e.child))))}function p(e){return r=>t.createElement(g,h({attr:m({},e.attr)},r),v(e.child))}function g(e){var r=r=>{var n,{attr:a,size:i,title:s}=e,o=f(e,l),c=i||r.size||"1em";return r.className&&(n=r.className),e.className&&(n=(n?n+" ":"")+e.className),t.createElement("svg",h({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},r.attr,a,o,{className:n,style:m(m({color:e.color||r.color},r.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),s&&t.createElement("title",null,s),e.children)};return void 0!==u?t.createElement(u.Consumer,null,(t=>r(t))):r(c)}function $(t){return p({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"9 6 15 12 9 18"},child:[]}]})(t)}function b(t){return p({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"polyline",attr:{fill:"none",strokeWidth:"2",points:"9 6 15 12 9 18",transform:"matrix(-1 0 0 1 24 0)"},child:[]}]})(t)}function w(){var r=i(),n=e(r),a=n[0],c=n[1],u=e(r),l=u[0],f=u[1];return t.createElement("div",{className:"flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col"},t.createElement("div",{className:"w-96 h-96 "},t.createElement("div",{className:"flex justify-between items-center"},t.createElement("h1",{className:"select-none font-semibold"},s[a.month()],", ",a.year()),t.createElement("div",{className:"flex gap-10 items-center "},t.createElement(b,{className:"w-5 h-5 cursor-pointer hover:scale-105 transition-all",onClick:function(){c(a.month(a.month()-1))}}),t.createElement("h1",{className:" cursor-pointer hover:scale-105 transition-all",onClick:function(){c(r)}},"Today"),t.createElement($,{className:"w-5 h-5 cursor-pointer hover:scale-105 transition-all",onClick:function(){c(a.month(a.month()+1))}}))),t.createElement("div",{className:"grid grid-cols-7 "},["S","M","T","W","T","F","S"].map((function(e,r){return t.createElement("h1",{key:r,className:"text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"},e)}))),t.createElement("div",{className:" grid grid-cols-7 "},function(t,e){void 0===t&&(t=i().month()),void 0===e&&(e=i().year());for(var r=i().year(e).month(t).startOf("month"),n=i().year(e).month(t).endOf("month"),a=[],s=0;s<r.day();s++){var o=r.day(s);a.push({currentMonth:!1,date:o})}for(s=r.date();s<=n.date();s++)a.push({currentMonth:!0,date:r.date(s),today:r.date(s).toDate().toDateString()===i().toDate().toDateString()});var c=42-a.length;for(s=n.date()+1;s<=n.date()+c;s++)a.push({currentMonth:!1,date:n.date(s)});return a}(a.month(),a.year()).map((function(e,r){var n=e.date,a=e.currentMonth,i=e.today;return t.createElement("div",{key:r,className:"p-2 text-center h-14 grid place-content-center text-sm border-t"},t.createElement("h1",{className:o(a?"":"text-gray-400",i?"bg-red-600 text-white":"",l.toDate().toDateString()===n.toDate().toDateString()?"bg-black text-white":"","h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"),onClick:function(){f(n)}},n.date()))})))),t.createElement("div",{className:"h-96 w-96 sm:px-5"},t.createElement("h1",{className:" font-semibold"},"Schedule for ",l.toDate().toDateString()),t.createElement("p",{className:"text-gray-400"},"No meetings for today.")))}export{w as Calendar};
//# sourceMappingURL=index.es.js.map
