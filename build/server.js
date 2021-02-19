(()=>{"use strict";var e={651:e=>{e.exports=require("xhr2")}},t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{require("regenerator-runtime");const e=require("express");var t=r.n(e);const n=require("path");var s=r.n(n);const o=require("cors");var a=r.n(o);const u=require("body-parser");var i=r.n(u);const c=require("cookie-parser");var p=r.n(c);const d=require("multer");var l=r.n(d);const f=require("dotenv");var m=r.n(f);const g=require("jsonwebtoken");var b=r.n(g);const y=require("firebase/app");var v=r.n(y);require("firebase/firestore"),require("firebase/storage");var h=v().initializeApp({apiKey:"AIzaSyAW4XYKvHlGB2n85IrI311kXrFp-S_11YM",authDomain:"celenganku-app.firebaseapp.com",databaseURL:"https://celenganku-app.firebaseio.com",projectId:"celenganku-app",storageBucket:"celenganku-app.appspot.com",messagingSenderId:"414105942761",appId:"1:414105942761:web:f68bc17372af32cf848e78",measurementId:"G-QQ3YEP9ZCT"}),w=h.firestore(),j=h.storage();const k={data:w.collection("data_siswa"),akun:w.collection("akun_siswa"),profil:w.collection("profil_siswa")};function O(e){return("function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function x(e,t){return!t||"object"!==O(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e){var t="function"==typeof Map?new Map:void 0;return function(e){if(null===e||(e,-1===Function.toString.call(r).indexOf("[native code]")))return e;var r;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,n)}function n(){return P(e,arguments,A(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),R(n,e)}(e)}function P(e,t,r){return(S()?Reflect.construct:function(e,t,r){var n=[null];n.push.apply(n,t);var s=new(Function.bind.apply(e,n));return r&&R(s,r.prototype),s}).apply(null,arguments)}function S(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function R(e,t){return(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function A(e){return(Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}Error;function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){I(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function I(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function T(e,t,r,n,s,o,a){try{var u=e[o](a),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,s)}function N(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var o=e.apply(t,r);function a(e){T(o,n,s,a,u,"next",e)}function u(e){T(o,n,s,a,u,"throw",e)}a(void 0)}))}}const q=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(){var e=N(regeneratorRuntime.mark((function e(r,n,s){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{t.forEach(function(){var e=N(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.doc(r.params.id).delete();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),n.status(200).json({status:"success",error:!1,results:"Deleted ".concat(t.length," document")})}catch(e){n.status(502).json({status:"success",error:!0,response:e})}case 1:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}()},M=function(e){return function(){var t=N(regeneratorRuntime.mark((function t(r,n,s){var o,a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.doc(r.params.id).get();case 3:if((o=t.sent).exists){t.next=7;break}return n.status(401).json({status:"failed",error:!0,message:"No document found with that id",response:r.params}),t.abrupt("return",{success:!1});case 7:return a=o.data(),n.status(200).json(E({status:"success",error:!1},a)),t.abrupt("return",{success:!0});case 12:t.prev=12,t.t0=t.catch(0),n.status(502).json({status:"success",error:!0,response:t.t0});case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e,r,n){return t.apply(this,arguments)}}()},C=function(e){return function(){var t=N(regeneratorRuntime.mark((function t(r,n,s){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,o=[],t.next=4,e.get();case 4:if(t.sent.forEach((function(e){o.push(e.data())})),n.status(200).json(E({status:"success",error:!1,results:o.length},o)),!(o.length>0)){t.next=9;break}return t.abrupt("return",{success:!0});case 9:return t.abrupt("return",{success:!1});case 12:t.prev=12,t.t0=t.catch(0),n.status(502).json({status:"success",error:!0,response:t.t0});case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e,r,n){return t.apply(this,arguments)}}()};function B(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?B(Object(r),!0).forEach((function(t){L(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):B(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function L(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function K(e,t,r,n,s,o,a){try{var u=e[o](a),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,s)}function Y(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var o=e.apply(t,r);function a(e){K(o,n,s,a,u,"next",e)}function u(e){K(o,n,s,a,u,"throw",e)}a(void 0)}))}}var X,G,H;const z={getAllSiswaData:C(k.data),getAllAkunSiswa:C(k.akun),getDataSiswa:M(k.data),getProfilSiswa:M(k.profil),getAkunSiswa:M(k.akun),deleteAkunSiswa:q(k.akun,k.profil),createAkunSiswa:(H=Y(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u,i,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=t.body,o=s.nisn,a=s.email,u=s.password,i=s.no_telepon,c=s.url_foto,o&&a&&u){e.next=4;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Please provide NISN, Email, or password",response:t.body}));case 4:return e.next=6,k.data.doc(o).get();case 6:return e.sent.exists||r.status(401).json({status:"failed",error:!0,message:"This NISN isn't registered",response:t.body}),e.next=10,k.akun.doc(o).get();case 10:return e.sent.exists&&r.status(401).json({status:"failed",error:!0,message:"Account with this NISN already exist",response:t.body}),e.next=14,k.akun.doc(o).set({nisn:o,email:a,password:u,saldo:0});case 14:return e.next=16,k.profil.doc(o).set({nisn:o,no_telepon:i||"",url_foto:c||""});case 16:return t.body.password=void 0,r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",F(F({},t.body),{},{error:!1}));case 21:e.prev=21,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 25:case"end":return e.stop()}}),e,null,[[0,21]])}))),function(e,t,r){return H.apply(this,arguments)}),updateAkunSiswa:(G=Y(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=t.params.id,e.next=4,k.akun.doc(s).get();case 4:return(o=e.sent).exists||r.status(401).json({status:"failed",error:!0,message:"Account with this NISN doesn't exist",response:t.body}),a=o.data(),u={email:t.body.email||a.email,password:t.body.password||a.password,no_telepon:t.body.no_telepon||a.no_telepon,url_foto:t.body.url_foto||a.url_foto},e.next=10,k.akun.doc(s).update({email:u.email,password:u.password});case 10:return e.next=12,k.profil.doc(s).set({no_telepon:u.no_telepon||"",url_foto:u.url_foto||""});case 12:return t.body.password=void 0,r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",{success:!0});case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 21:case"end":return e.stop()}}),e,null,[[0,17]])}))),function(e,t,r){return G.apply(this,arguments)}),updateSaldoSiswa:(X=Y(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u,i,c,p;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=t.params.id,e.next=4,k.akun.doc(s).get();case 4:return(o=e.sent).exists||r.status(401).json({status:"failed",error:!0,message:"Account with this NISN doesn't exist",response:t.body}),a=o.data(),u=t.body,i=u.saldo,c=u.jenis,0,p="pemasukan"===c?+a.saldo+ +i:+a.saldo-+i,e.next=12,k.akun.doc(s).update({saldo:p});case 12:return r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",{success:!0});case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 20:case"end":return e.stop()}}),e,null,[[0,16]])}))),function(e,t,r){return X.apply(this,arguments)})};function Q(e,t,r,n,s,o,a){try{var u=e[o](a),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,s)}function U(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var o=e.apply(t,r);function a(e){Q(o,n,s,a,u,"next",e)}function u(e){Q(o,n,s,a,u,"throw",e)}a(void 0)}))}}global.XMLHttpRequest=r(651),m().config();var W,V,Z,J,$,ee,te=w.collection("akun_admin"),re=function(e){var t="user";return e.length<10&&(t="admin"),b().sign({id:e,role:t},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_EXPIRE_TIME})};const ne={requireAuth:function(e,t,r){var n=e.cookies.jwt;n?b().verify(n,process.env.ACCESS_TOKEN_SECRET,(function(e,n){e?(console.log(e.message),t.redirect("/api/logout")):r()})):t.redirect("/api/logout")},restrictTo:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e,r,n){t.includes(e.user.role)||r.status(401).json({status:"failed",error:!0,message:"You're not allowed to do that action",response:e.body}),n()}},adminLogin:(ee=U(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=t.body,o=s.id_admin,a=s.password,o&&a){e.next=4;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Please provide ID, or password",response:t.body}));case 4:return e.next=6,te.where("id_admin","==",o).where("password","==",a).get();case 6:e.sent.empty&&r.status(401).json({status:"failed",error:!0,message:"Wrong ID or Password",response:t.body}),u=re(o),t.body.password=void 0,r.cookie("jwt",u,{httpOnly:!0,maxAge:2592e6}),r.status(200).json({status:"success",error:!1,response:t.body}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),n(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])}))),function(e,t,r){return ee.apply(this,arguments)}),login:($=U(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=t.body,o=s.nisn,a=s.password,o&&a){e.next=4;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Please provide NISN, or password",response:t.body}));case 4:return e.next=6,k.akun.where("nisn","==",o).where("password","==",a).get();case 6:e.sent.empty&&r.status(401).json({status:"error",error:!0,title:"NISN atau Password salah",message:"Silahkan coba lagi",response:t.body}),u=re(o),t.body.password=void 0,r.cookie("jwt",u,{httpOnly:!0,maxAge:2592e6}),r.status(200).json({status:"success",title:"Login Berhasil",message:"Mengalihkan ke halaman dashboard",error:!1,response:t.body}),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),n(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])}))),function(e,t,r){return $.apply(this,arguments)}),logout:function(e,t){t.cookie("jwt","",{maxAge:1}),t.redirect("/")},register:(J=U(regeneratorRuntime.mark((function e(t,r,n){var s,o,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.createAkunSiswa(t,r,n);case 2:s=e.sent,o=s.nisn,a=re(o),t.body.password=void 0,r.cookie("jwt",a,{httpOnly:!0,maxAge:2592e6}),r.status(200).json({status:"success",error:!1,response:t.body});case 8:case"end":return e.stop()}}),e)}))),function(e,t,r){return J.apply(this,arguments)}),retrieveToken:(Z=U(regeneratorRuntime.mark((function e(t,r,n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.status(200).json({status:"success",error:!1,response:t.cookies.jwt});case 1:case"end":return e.stop()}}),e)}))),function(e,t,r){return Z.apply(this,arguments)}),uploadFile:(V=U(regeneratorRuntime.mark((function e(t,r,n){var s,o,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=t.file,o=j.ref("upload/".concat(s.originalname)),e.next=5,o.put(s.buffer);case 5:return e.next=7,o.getDownloadURL();case 7:a=e.sent,r.status(200).json({status:"success",url:a}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),n(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])}))),function(e,t,r){return V.apply(this,arguments)}),deleteFile:(W=U(regeneratorRuntime.mark((function e(t,r,n){var s,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{(s=t.body).url,o=s.name,j.ref("upload/".concat(o)).delete(),r.status(200).json({status:"success",error:!1})}catch(e){n(e)}case 1:case"end":return e.stop()}}),e)}))),function(e,t,r){return W.apply(this,arguments)})};var se=l()({storage:l().memoryStorage(),limits:{fileSize:5242880}}),oe=t().Router();oe.use(i().json()),oe.get("/token",ne.retrieveToken),oe.post("/upload",se.single("avatar"),ne.uploadFile),oe.post("/delete",ne.deleteFile),oe.use("/logout",ne.logout);const ae=oe;var ue=t().Router();ue.use(i().json()),ue.post("/register",ne.register),ue.post("/login",ne.login),ue.use(ne.requireAuth),ue.route("/").get(z.getAllAkunSiswa),ue.route("/data").get(z.getDataSiswa),ue.route("/:id").get(z.getAkunSiswa).patch(z.updateAkunSiswa).delete(z.deleteAkunSiswa),ue.route("/:id/profil").get(z.getProfilSiswa),ue.route("/:id/data").get(z.getDataSiswa),ue.route("/:id/saldo").patch(z.updateSaldoSiswa);const ie=ue;function ce(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function pe(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ce(Object(r),!0).forEach((function(t){de(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ce(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function de(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function le(e,t,r,n,s,o,a){try{var u=e[o](a),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,s)}function fe(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var o=e.apply(t,r);function a(e){le(o,n,s,a,u,"next",e)}function u(e){le(o,n,s,a,u,"throw",e)}a(void 0)}))}}var me,ge,be=w.collection("akun_admin");const ye={getAdmin:M(k.akun),deleteAdmin:q(k.akun,k.profil),createAdmin:(ge=fe(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=t.body,o=s.id_admin,a=s.nama,u=s.password,o&&a&&u){e.next=4;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Please provide ID, Name, or password",response:t.body}));case 4:return e.next=6,be.doc(o).get();case 6:return e.sent.exists&&r.status(401).json({status:"failed",error:!0,message:"Account with this ID already exist",response:t.body}),e.next=10,be.akun.doc(o).set({id_admin:o,nama:a,password:u});case 10:return t.body.password=void 0,r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",pe(pe({},t.body),{},{error:!1}));case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"success",error:!0,response:e.t0});case 19:case"end":return e.stop()}}),e,null,[[0,15]])}))),function(e,t,r){return ge.apply(this,arguments)}),updateAdmin:(me=fe(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=t.params.id_admin,e.next=4,be.doc(s).get();case 4:if((o=e.sent).exists||r.status(401).json({status:"failed",error:!0,message:"Account with this ID doesn't exist",response:t.body}),a=o.data(),(u={id_admin:t.body.id_admin||a.id_admin,nama:t.body.nama||a.nama,password:t.body.password||a.password}).email&&u.password){e.next=10;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Please provide Email, or password",response:t.body}));case 10:return e.next=12,be.doc(s).update({id_admin:u.id_admin,nama:u.nama,password:u.password});case 12:return t.body.password=void 0,r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",{success:!0});case 17:e.prev=17,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 21:case"end":return e.stop()}}),e,null,[[0,17]])}))),function(e,t,r){return me.apply(this,arguments)})};var ve=t().Router();ve.use(i().json()),ve.post("/login",ne.adminLogin),ve.use(ne.requireAuth),ve.route("/").get(ye.getAdmin),ve.route("/:id").patch(ye.updateAdmin).delete(ye.deleteAdmin);const he=ve;function we(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function je(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?we(Object(r),!0).forEach((function(t){ke(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):we(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function ke(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Oe(e,t,r,n,s,o,a){try{var u=e[o](a),i=u.value}catch(e){return void r(e)}u.done?t(i):Promise.resolve(i).then(n,s)}function xe(e){return function(){var t=this,r=arguments;return new Promise((function(n,s){var o=e.apply(t,r);function a(e){Oe(o,n,s,a,u,"next",e)}function u(e){Oe(o,n,s,a,u,"throw",e)}a(void 0)}))}}var _e,Pe,Se,Re=w.collection("transaksi");const Ae={getTransactionById:M(Re),deleteTransactionById:q(Re),getTransactionByNisn:(Se=xe(regeneratorRuntime.mark((function e(t,r,n){var s,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Re.where("nisn","==",t.params.id).get();case 3:return(s=e.sent).empty&&r.status(401).json({status:"failed",error:!0,message:"No transaction found from that user id",response:t.params}),o=[],s.forEach((function(e){o.push(e.data())})),r.status(200).json({status:"success",error:!1,results:o.length,data:o}),e.abrupt("return",{success:!0});case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 15:case"end":return e.stop()}}),e,null,[[0,11]])}))),function(e,t,r){return Se.apply(this,arguments)}),createTransaction:(Pe=xe(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u,i,c,p,d,l,f,m,g,b,v;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,s=t.body,o=s.nominal,a=s.metode_pembayaran,u=s.jenis_transaksi,i=s.nisn,o&&a&&u&&i){e.next=4;break}return e.abrupt("return",r.status(404).json({status:"failed",error:!0,message:"Something wrong when creating a transaction",response:t.body}));case 4:return c=a[0].toUpperCase(),p="",p="pemasukan"===u?"D":"W",d=[],e.next=10,Re.get();case 10:for(e.sent.forEach((function(e){d.push(e.data())})),l=[],d.forEach((function(e){l.push(e.id_transaksi)})),f=Math.floor(1e6+9e6*Math.random()),m="T".concat(p+c+f.toString());l.includes(m);)f=Math.floor(1e6+9e6*Math.random()),m="T".concat(p+c+f.toString());return(g=new Date).setDate(g.getDate()+1),b=y.firestore.Timestamp.fromDate(g),v={id_transaksi:m,nominal:o,metode_pembayaran:a,jenis_transaksi:u,nisn:i,status_transaksi:"pembayaran",tenggat_waktu_pembayaran:b,token:""},e.next=23,Re.doc(m).set(v);case 23:r.status(200).json({status:"success",error:!1,response:je({},v)}),e.next=30;break;case 26:e.prev=26,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 30:case"end":return e.stop()}}),e,null,[[0,26]])}))),function(e,t,r){return Pe.apply(this,arguments)}),updateTransaction:(_e=xe(regeneratorRuntime.mark((function e(t,r,n){var s,o,a,u,i,c,p;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=t.body,o=s.token,a=s.status_transaksi,u=t.params.id,e.next=5,Re.doc(u).get();case 5:return(i=e.sent).exists||r.status(401).json({status:"failed",error:!0,message:"Transaction with this ID doesn't exist",response:t.body}),c=i.data(),p={status_transaksi:a||c.status_transaksi,token:o||c.token},e.next=11,Re.doc(u).update({status_transaksi:p.status_transaksi,token:p.token});case 11:return r.status(200).json({status:"success",error:!1,response:t.body}),e.abrupt("return",{success:!0});case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0),r.status(502).json({status:"failed",error:!0,response:e.t0});case 19:case"end":return e.stop()}}),e,null,[[0,15]])}))),function(e,t,r){return _e.apply(this,arguments)})};var De=t().Router();De.use(i().json()),De.route("/create").post(Ae.createTransaction),De.route("/:id").get(Ae.getTransactionById).patch(Ae.updateTransaction).delete(Ae.deleteTransactionById),De.route("/nisn/:id").get(Ae.getTransactionByNisn);const Ee=De;var Ie=t()(),Te=s().join(__dirname,"index.html");Ie.use(a()()),Ie.options("*",a()()),Ie.use(p()()),Ie.use(t().json({limit:"15kb"})),Ie.use(i().urlencoded({extended:!0})),Ie.use("/api",ae),Ie.use("/api/siswa",ie),Ie.use("/api/admin",he),Ie.use("/api/transaction",Ee),Ie.use(t().static(__dirname)),Ie.use("/",(function(e,t){return t.sendFile(Te)}));const Ne=Ie,qe={PORT:process.env.PORT||8080,DIST_DIR:__dirname,MIDTRANS_SERVER_KEY:"SB-Mid-server-XmFoI8_j9MpEyaNvbE1-sQiN",MIDTRANS_CLIENT_KEY:"SB-Mid-client-ht5GrRu9A98pjHLR",MIDTRANS_MERCHANT_ID:"G485644100"};Ne.listen(qe.PORT,(function(){console.log("App listening to ".concat(qe.PORT,"....")),console.log("Press Ctrl+C to quit.")}))})()})();