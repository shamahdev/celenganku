(()=>{var e={90:(e,t,r)=>{var n=r(622).join(__dirname,"index.html");e.exports=function(e){e.route("/").get((function(e,t){t.sendFile(n)})),e.route("/test").get((function(e,t){t.send("test")}))}},622:e=>{"use strict";e.exports=require("path")}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=require("express");var t=r.n(e),n=r(90),o=r.n(n);const s={PORT:process.env.PORT||8080,DIST_DIR:__dirname};var i=t()();i.use(t().static(s.DIST_DIR)),o()(i),i.listen(s.PORT,(function(){console.log("App listening to ".concat(s.PORT,"....")),console.log("Press Ctrl+C to quit.")}))})()})();