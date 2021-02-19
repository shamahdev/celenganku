(self.webpackChunkcelenganku_app=self.webpackChunkcelenganku_app||[]).push([[73],{93351:(t,e,n)=>{"use strict";n.d(e,{Z:()=>h});var a=n(67930),r=n.n(a),o=n(66560),s=n(77511),i=n.n(s),l=n(3078),d=n(7504),c=n(7902),u=n(30557);function m(t){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e,n,a,r,o,s){try{var i=t[o](s),l=i.value}catch(t){return void n(t)}i.done?e(l):Promise.resolve(l).then(a,r)}function g(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){p(o,a,r,s,i,"next",t)}function i(t){p(o,a,r,s,i,"throw",t)}s(void 0)}))}}const h={render:function(){return g(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",'\n        <div class="text-center relative">\n          <a href="#/report" class="-mt-4 w-max absolute left-0 text-primary mx-1 p-4">\n          <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>\n          </a>\n          <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">\n            Preview Laporan\n          </p>\n        </div>\n        <div class="flex flex-col w-full pt-0 rounded-lg mx-auto md:mt-4 shadow-lg text-gray-800 mb-24">\n        <div id="report" class="p-8 md:p-12 rounded-lg flex flex-col">\n          <img class="w-48 mb-10" src="./images/celenganku-logo.png">\n          <p id="name" class="text-2xl font-bold"></p>\n          <p id="nisn"class="mb-2 text-lg"></p>\n          <p id="alamat" class="text-gray-600"><p>\n          <p id="periode" class="mt-4 mb-6 text-sm text-primary"></p>\n          <div class="flex-1 py-0 white rounded-lg">\n          <table id="transaction-table" class="table-auto w-full">\n          <tbody>\n          <tr class="text-left text-gray-700">\n              <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>\n              <th class="font-normal pb-5 pt-0 hidden md:table-cell">Jenis Transaksi</th>\n              <th class="font-normal pb-5 pt-0">Nominal</th>\n              <th class="font-normal pb-5 pt-0 ">Saldo</th>\n          </tr>\n          </tbody>\n        </table>\n          <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">\n            <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>\n          </div>\n          </div>\n          <div class="text-right mt-4">\n          <p id="first-balance" class="mb-2 flex">Saldo Awal:</p>\n          <p id="withdraw-text" class="mb-2 flex">Pemasukan Saldo:</p>\n          <p id="deposit-text" class="mb-2 flex">Penarikan Saldo:</p>\n          <p id="last-balance" class="mb-2 flex">Saldo Akhir:</p>\n          </div>\n          </div>\n        </div>\n        <div>\n        <button id="download-button" role="button" class="hidden fixed w-max bg-primary text-white p-4 rounded-full right-0 bottom-0 mb-24 mr-8 md:mr-16 md:mb-16">\n        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>\n        </button>\n        </div>\n      ');case 1:case"end":return t.stop()}}),t)})))()},afterRender:function(){var t=this;return g(regeneratorRuntime.mark((function e(){var n,a,s,i,m,p,g,h,f,x,v,w,b,y,k,_,T,I,E,L,C,M,B;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.querySelectorAll(".preloader"),a=u.Z.parseActiveUrlWithoutCombiner(),s=c.Z.parseToText(a.id),t._reportTime=s,e.next=6,l.Z.retrieveUser();case 6:return i=e.sent,t._userId=i.id,e.next=10,l.Z.getAkunSiswa(t._userId);case 10:return m=e.sent,e.next=13,l.Z.getDataSiswa(t._userId);case 13:return p=e.sent,t._ballance=m.saldo,t._withdraw=0,t._deposit=0,g=document.getElementById("name"),h=document.getElementById("nisn"),f=document.getElementById("alamat"),x=document.getElementById("periode"),v=document.getElementById("first-balance"),w=document.getElementById("last-balance"),b=document.getElementById("withdraw-text"),y=document.getElementById("deposit-text"),e.next=27,t._renderTable(t._reportTime);case 27:k=document.getElementById("download-button"),_=document.querySelector("#report"),k.addEventListener("click",(function(){r()(_,{scale:1}).then((function(t){var e=new o.kH("p","pt","a4"),n=e.internal.pageSize.getWidth(),a=t.toDataURL("image/jpeg",1),r=e.getImageProperties(a),s=r.height*n/r.width;e.addImage(a,"PNG",0,0,n,s),e.output("dataurlnewwindow")}))})),g.innerHTML=p.nama,h.innerHTML=p.nisn,f.innerHTML=p.alamat,T=new Date,I=T.getFullYear(),E=T.getMonth(),L=new Date(I,E,1),C=new Date(I,E+1,0),"Monthly"===t._reportTime?x.innerHTML="Periode: ".concat(L.toLocaleDateString("id-ID")," s/d ").concat(C.toLocaleDateString("id-ID")):x.innerHTML="Periode: 1/1/".concat(I," s/d  31/1/").concat(I),M=document.querySelector(".nominal").textContent.replace("RP ",""),B=document.querySelector(".saldo").textContent.replace("RP ",""),B=d.Z.convertCasttoInt(B)-d.Z.convertCasttoInt(M),v.innerHTML='Saldo Awal: <p class="flex ml-auto">RP '.concat(d.Z.convertToCashFormat(B),"</p>"),y.innerHTML='Pemasukan Saldo: <p class="flex ml-auto">RP '.concat(d.Z.convertToCashFormat(t._deposit),"</p>"),b.innerHTML='Penarikan Saldo: <p class="flex ml-auto">RP '.concat(d.Z.convertToCashFormat(t._withdraw),"</p>"),w.innerHTML='Saldo Akhir: <p class="flex ml-auto font-bold text-primary">'.concat(document.querySelectorAll(".saldo")[document.querySelectorAll(".saldo").length-1].textContent,"</p>"),n.forEach((function(t){t.remove()})),k.classList.remove("hidden");case 48:case"end":return e.stop()}}),e)})))()},_renderTable:function(t){var e=this;return g(regeneratorRuntime.mark((function n(){var a,r,o,s,c,u,p,g;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=document.getElementById("transaction-table"),r=a.querySelector("tbody"),n.next=4,l.Z.getTransaksiSiswa(e._userId);case 4:o=n.sent,s=i()(o.data,["tenggat_waktu_pembayaran.seconds"]).reverse(),c=e._ballance,u=function(n){if(Object.keys(n).forEach((function(t){"object"===m(n[t])||(n[t]="nominal"===t?d.Z.convertToCashFormat(n[t]):n[t].toString().toUpperCase())})),"pembayaran"===n.status_transaksi.toLowerCase())return"";var a=new Date(1e3*n.tenggat_waktu_pembayaran.seconds);if("Monthly"===t&&a.getMonth()!==(new Date).getMonth())return"";var r=n.jenis_transaksi;a.setDate(a.getDate()-1);var o=a.toLocaleDateString("id-ID"),s=c;return"pemasukan"===r.toLowerCase()?(c-=d.Z.convertCasttoInt(n.nominal),e._withdraw+=d.Z.convertCasttoInt(n.nominal)):(c+=d.Z.convertCasttoInt(n.nominal),e._deposit+=d.Z.convertCasttoInt(n.nominal)),'<tr class="font-bold text-gray-800 mb-5">\n      <td class="p-5 pr-0 text-gray-500 bg-gray-200 rounded-l-lg">'.concat(o.toUpperCase(),'</td>\n      <td class="bg-gray-200 hidden md:table-cell">').concat(n.jenis_transaksi,'</td>\n      <td class="nominal bg-gray-200 ">RP ').concat(n.nominal,'</td>\n      <td class="saldo bg-gray-200 rounded-r-lg">RP ').concat(d.Z.convertToCashFormat(s),'</td>\n      </td>\n    </tr>\n    <tr class="h-4"></tr>')},r.innerHTML='\n    <tr class="text-left text-gray-700">\n      <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>\n      <th class="font-normal pb-5 pt-0 hidden md:table-cell">Jenis Transaksi</th>\n      <th class="font-normal pb-5 pt-0">Nominal</th>\n      <th class="font-normal pb-5 pt-0 ">Saldo</th>\n    </tr>',p=[],g=[],s.forEach((function(t){p.push(u(t))})),g=p.reverse(),r.innerHTML+=g.join("");case 14:case"end":return n.stop()}}),n)})))()}}},45960:(t,e,n)=>{"use strict";n.d(e,{Z:()=>g});var a=n(538),r=n.n(a),o=n(77511),s=n.n(o),i=n(7504),l=n(15978),d=n(3078),c=n(83711);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t,e,n,a,r,o,s){try{var i=t[o](s),l=i.value}catch(t){return void n(t)}i.done?e(l):Promise.resolve(l).then(a,r)}function p(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){m(o,a,r,s,i,"next",t)}function i(t){m(o,a,r,s,i,"throw",t)}s(void 0)}))}}const g={render:function(){return p(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",'\n    <div class="text-center">\n    <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">\n      Riwayat Transaksi\n    </p>\n    <div class="flex flex-row mt-4 md:mt-6 ">\n      <div class="flex flex-row">\n        <button id="print-report-button" class="w-max bg-primary text-white mx-1 py-3 px-5 rounded-lg disabled:opacity-50">Cetak Laporan</button>\n        <p id="total-transaction" class="hidden md:inline mt-3 ml-4 text-gray-700">Total Transaksi:</p>\n      </div>\n      <div class="flex flex-1 md:flex-initial ml-4 md:ml-auto flex-row ">\n      <input id="search-input" placeholder="Cari tanggal, nominal, dll" value="" type="text" class="text-md block px-5 py-3 rounded-lg w-full bg-gray-200">\n      <svg class="w-8 h-8 mt-auto mb-auto ml-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>\n      </div>\n    </div>\n  </div>\n    <div class="bg-gray-200 gap-5 p-4 rounded-lg flex flex-col mt-6 md:p-8">\n      <div class="flex-1 py-0 white rounded-lg">\n      <table id="transaction-table" class="table-auto w-full">\n      <tbody>\n      <tr class="text-left text-gray-700">\n          <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>\n          <th class="font-normal pb-5 pt-0 hidden lg:table-cell">ID Transaksi</th>\n          <th class="font-normal pb-5 pt-0">Nominal</th>\n          <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Metode</th>\n          <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>\n          <th class="font-normal pb-5 pt-0">Status</th>\n          <th class="font-normal pb-5 pt-0 justify-end"></th>\n        </tr>\n      </tbody>\n    </table>\n      <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">\n        <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>\n      </div>\n      </div>\n    </div>\n      ');case 1:case"end":return t.stop()}}),t)})))()},afterRender:function(){var t=this;return p(regeneratorRuntime.mark((function e(){var n,a,r,o,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t._totalTransaction=0,n=document.getElementById("total-transaction"),a=document.querySelectorAll(".preloader"),r=document.getElementById("print-report-button"),e.next=6,d.Z.retrieveUser();case 6:return o=e.sent,t._userId=o.id,e.next=10,d.Z.getAkunSiswa(t._userId);case 10:return s=e.sent,t._ballance=s.saldo,e.next=14,t._renderTable();case 14:return e.next=16,t._createPrintEvent(r);case 16:n.innerHTML="Total Transaksi: Rp ".concat(i.Z.convertToCashFormat(t._totalTransaction)),a.forEach((function(t){t.remove()}));case 18:case"end":return e.stop()}}),e)})))()},_createPrintEvent:function(t){var e=this;return p(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.addEventListener("click",(function(){c.Z.init({title:"Laporan",content:'<div class="px-10 py-6">\n          <div id="modal-content">\n            <p class="mt-2 mb-1">Pilih Jangka Waktu</p>\n            <div class="my-4 flex flex-col gap-4 md:flex-row">\n            <button id="monthly-option" class="w-full p-4 border-2 border-primary bg-white shadow-lg rounded-lg focus:outline-none ">\n              <div class="flex flex-1 md:justify-center">\n                <div class="text-white flex flex-1 flex-row">\n                  <div data-option class="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg">\n                  <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>\n                  </div>\n                  <p class="text-gray-700 mt-1">Bulan Ini</p>\n                </div>\n              </div>\n            </button>\n            <button id="yearly-option" class="w-full p-4 bg-white shadow-lg rounded-lg focus:outline-none ">\n              <div class="flex flex-1 md:justify-center">\n                <div class="text-white flex flex-1 flex-row">\n                  <div data-option class="mx-2 my-auto text-sm bg-gray-300 text-gray-300 p-1 rounded-lg">\n                  <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>\n                  </div>\n                  <p class="text-gray-700 mt-1">Tahun Ini</p>\n                </div>\n              </div>\n            </button>\n            </div>\n          </div>\n          <div class="flex justify-end items-center w-100 mt-4">\n            <button role="button" id="next-button" class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Cetak</button>\n          </div>\n        </div>'});var t=document.getElementById("modal-laporan");e._frequencyOption="monthly";var n=document.querySelectorAll("#monthly-option, #yearly-option"),a=document.getElementById("next-button");n.forEach((function(t){t.addEventListener("click",(function(){e._selectReportOption(n,t.id)}))})),a.addEventListener("click",(function(){window.location.hash="#/report/".concat(e._frequencyOption),t.remove()}))}));case 1:case"end":return n.stop()}}),n)})))()},_selectReportOption:function(t,e){t.forEach((function(t){var n=t.querySelector("div[data-option]");t.id===e?(t.classList.add("border-2","border-primary"),n.className="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg"):(t.classList.remove("border-2","border-primary"),n.className="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg")})),this._frequencyOption=e.replace("-option","")},_renderTable:function(){var t=this;return p(regeneratorRuntime.mark((function e(){var n,a,o,m,g;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=document.getElementById("transaction-table"),a=n.querySelector("tbody"),e.next=4,d.Z.getTransaksiSiswa(t._userId);case 4:o=e.sent,m=s()(o.data,["tenggat_waktu_pembayaran.seconds"]).reverse(),g=function(e){Object.keys(e).forEach((function(t){"object"===u(e[t])||(e[t]="nominal"===t?i.Z.convertToCashFormat(e[t]):e[t].toString().toUpperCase())}));var n=new Date(1e3*e.tenggat_waktu_pembayaran.seconds),a=e.jenis_transaksi,o=new Date;o.setDate(n.getDate()),n.setDate(n.getDate()-1);var s=n.toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"}),m=n.toLocaleDateString("id-ID");"selesai"===e.status_transaksi.toLowerCase()&&(t._totalTransaction+=i.Z.convertCasttoInt(e.nominal));var g,h,f=function(n){return n.addEventListener("click",function(){var n=p(regeneratorRuntime.mark((function n(a){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a.stopPropagation(),n.next=3,r().fire({icon:"warning",text:"Tekan pilihan untuk mengkonfirmasi",title:"Apakah benar ingin membatalkan transaksi?",showCancelButton:!0,confirmButtonText:"Benar",cancelButtonText:"Tidak",customClass:{popup:"popup-sweetalert",confirmButton:"btn-sweetalert bg-success",cancelButton:"btn-sweetalert bg-failed"},buttonsStyling:!1});case 3:if(!n.sent.isConfirmed){n.next=10;break}return n.next=7,d.Z.deleteTransaksiSiswa(e.id_transaksi);case 7:o=n.sent,console.log(o),t._renderTable();case 10:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()),!0},x=function(t){return t.addEventListener("click",(function(){if("daring"===e.metode_pembayaran.toLowerCase()&&"pembayaran"===e.status_transaksi.toLowerCase())return snap.pay(e.token.toLowerCase(),{onSuccess:(t=p(regeneratorRuntime.mark((function t(n){var a;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(n),t.next=3,d.Z.updateTransaction(e.id_transaksi,{status_transaksi:"selesai"});case 3:a=t.sent,console.log(a),window.dispatchEvent(new HashChangeEvent("hashchange"));case 6:case"end":return t.stop()}}),t)}))),function(e){return t.apply(this,arguments)}),onPending:function(){},onClose:function(){}}),!0;var t;c.Z.init({title:"Kode Transaksi",content:'<div class="px-10 py-6">\n              <div id="modal-content">\n                <p class="mt-2 mb-1">Kode Transaksi kamu adalah</p>\n                <div class="flex flex-row">\n                <p id="id-transaksi" class="my-2 text-3xl select-all font-bold">'.concat(e.id_transaksi,'</p>\n                <button role="button" id="copy-button" class="w-max text-primary ml-2 font-light p-2">\n                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>\n                </button>\n                </div>\n              </div>\n              <div class="flex justify-end items-center w-100 mt-4">\n                <button role="button" id="show-qr-button" class="w-max text-primary mx-1 font-light p-2">\n                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></button>\n                <button role="button" id="close-button" class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tutup</button>\n              </div>\n            </div>')});var n=document.getElementById("modal-kode-transaksi"),a=document.getElementById("modal-content"),r=a.innerHTML,o='<img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='.concat(e.id_transaksi,'"></img>'),s=document.getElementById("show-qr-button"),i=document.getElementById("close-button"),l=document.getElementById("copy-button"),u=document.getElementById("id-transaksi");l.addEventListener("click",(function(){EventHelper.copyTextToClipboard(e.id_transaksi),u.focus()})),s.addEventListener("click",(function(t){a.innerHTML===r?a.innerHTML=o:a.innerHTML=r})),i.addEventListener("click",(function(){n.remove()}))})),!0};if("pembayaran"===e.status_transaksi.toLowerCase()){var v=1e3;setInterval(p(regeneratorRuntime.mark((function n(){var a,r,s,i,c,u,m,p,g;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,a=l.Z.getTimeCounter(o),r=a.distance,s=a.hours,i=a.minutes,c="".concat(s," jam ").concat(i," menit"),u='Transaksi ini akan automatis dibatalkan dalam <br><b class="flex mt-3 text-primary">'.concat(c,"</b>"),(m=document.getElementById("reminder-element-".concat(e.id_transaksi))).className="p-5 text-sm font-normal text-gray-600",m.innerHTML=u,!(r<0)){n.next=11;break}return n.next=10,d.Z.deleteTransaksiSiswa(e.id_transaksi);case 10:t._renderTable();case 11:for(p=!1;!p;)g=document.getElementById("cancel-transaction-button-".concat(e.id_transaksi)),p=f(g),v=6e4;n.next=17;break;case 15:n.prev=15,n.t0=n.catch(0);case 17:case"end":return n.stop()}}),n,null,[[0,15]])}))),v)}return setInterval((function(){try{for(var t=!1;!t;){var n=document.getElementById("show-transaction-button-".concat(e.id_transaksi));t=x(n)}}catch(t){}}),1e3),'<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">\n      <td class="hidden md:table-cell p-5 pr-0 text-gray-500 bg-white rounded-l-lg">'.concat(s.toUpperCase(),'</td>\n      <td class="table-cell md:hidden p-5 pr-0 text-gray-500 bg-white rounded-l-lg">').concat(m.toUpperCase(),'</td>\n      <td class="bg-white select-all hidden lg:table-cell">').concat(e.id_transaksi,'</td>\n      <td class="bg-white ').concat((h=a,"pemasukan"===h.toLowerCase()?"text-success":"text-failed"),'">RP ').concat(e.nominal,'</td>\n      <td class="bg-white hidden lg:table-cell">').concat(e.metode_pembayaran,'</td>\n      <td class="bg-white hidden lg:table-cell">').concat(a,'</td>\n      <td class="bg-white">\n        <div class="ml-2 md:ml-0 text-sm ').concat((g=e.status_transaksi,"selesai"===g.toLowerCase()?"bg-primary text-white":"bg-primaryDisable text-primary"),' p-1 md:py-2 md:px-6 rounded-lg w-max">\n        <p class="hidden md:inline">').concat(e.status_transaksi,'</p>\n        <p class="inline md:hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="').concat(function(t){return"selesai"===t.toLowerCase()?"M5 13l4 4L19 7":"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}(e.status_transaksi),'"></path></svg></p>\n        </div>\n      </td>\n      <td class="bg-white rounded-r-lg justify-end flex p-3 pl-0">\n        <button class="w-8 md:p-2 md:w-12 h-12 text-gray-700" id="settings">\n          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">\n            </path>\n          </svg>\n        </button>\n        <div id="settings-dropdown"\n          class="hidden absolute mt-10 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">\n          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">\n          <p id="reminder-element-').concat(e.id_transaksi,'"></p>\n            ').concat(function(t){return"selesai"===t.toLowerCase()?'\n          <button id="show-transaction-button-'.concat(e.id_transaksi,'"\n            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"\n            role="menuitem">\n            <i class="text-primary flex">\n            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>\n            </i>\n            <p class="flex ml-2 mt-1 leading-relaxed">Lihat Transaksi</p>\n          </button>'):'\n        <button id="show-transaction-button-'.concat(e.id_transaksi,'"\n            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"\n            role="menuitem">\n            <i class="text-primary flex">\n            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>\n            </i>\n            <p class="flex ml-2 mt-1 leading-relaxed">Bayar Transaksi</p>\n          </button>\n          <button id="cancel-transaction-button-').concat(e.id_transaksi,'"\n            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"\n            role="menuitem">\n            <i class="text-primary flex"><svg class="w-8 h-8" fill="none" stroke="currentColor"\n                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                  d="M6 18L18 6M6 6l12 12"></path>\n              </svg></i>\n            <p class="flex ml-2 mt-1 leading-relaxed">Batalkan Transaksi</p>\n          </button>')}(e.status_transaksi),'\n          </div>\n        </div>\n      </td>\n    </tr>\n    <tr class="h-4"></tr>')},a.innerHTML='\n      <tr class="text-left text-gray-700">\n        <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>\n        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">ID Transaksi</th>\n        <th class="font-normal pb-5 pt-0">Nominal</th>\n        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Metode</th>\n        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>\n        <th class="font-normal pb-5 pt-0">Status</th>\n        <th class="font-normal pb-5 pt-0 justify-end"></th>\n      </tr>',m.forEach((function(t){a.innerHTML+=g(t)})),t._createTableEvent();case 10:case"end":return e.stop()}}),e)})))()},_createTableEvent:function(){return p(regeneratorRuntime.mark((function t(){var e,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=document.getElementById("search-input"),n=document.getElementById("transaction-table"),e.addEventListener("keyup",(function(t){var e=t.target.value.toUpperCase(),a=n.querySelectorAll('tr[class*="hover:shadow-lg"]');t.preventDefault(),a.forEach((function(t){var n=t.querySelectorAll("td");if(n.length){var a=[];n.forEach((function(t){a.push(t.textContent.toUpperCase()||t.innerText.toUpperCase())})),a.toString().indexOf(e)>-1?t.style.display="":t.style.display="none"}}))}));case 3:case"end":return t.stop()}}),t)})))()}}},23665:(t,e,n)=>{"use strict";n.d(e,{Z:()=>c});var a=n(3078),r=n(83711),o=n(82502),s=n(94115),i=n(15978);function l(t,e,n,a,r,o,s){try{var i=t[o](s),l=i.value}catch(t){return void n(t)}i.done?e(l):Promise.resolve(l).then(a,r)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){l(o,a,r,s,i,"next",t)}function i(t){l(o,a,r,s,i,"throw",t)}s(void 0)}))}}const c={render:function(){return d(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",'\n        <div class="text-center">\n          <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">\n            Transaksi\n          </p>\n        </div>\n        <div class="flex flex-col w-full md:w-8/12 lg:w-6/12 mx-auto">\n          <div class="bg-gray-200 p-5 rounded-lg flex flex-col mt-4 md:p-8 md:mt-6">\n            <div class="flex flex-row mx-auto mb-4">\n            <button id="pemasukan-option" disabled class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Isi Saldo</button>\n              <button id="penarikan-option" class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Tarik Saldo</button>\n            </div>\n            <div class="flex-1 py-0 white rounded-lg">\n            <div class="mb-6">\n              <p class="mb-2">Nominal</p>\n              <input id="input-nominal" name="Nominal" data-rule="required value-more-than-999 multiple-of-1000" value="" type="number" class="block px-5 py-3 rounded-lg w-full bg-white">\n            </div>\n              <div class="flex flex-col gap-6 items-center">\n                <button id="luring-option" class="flex-1 p-5 pb-8 border-2 border-primary bg-white shadow-lg rounded-lg w-full focus:outline-none ">\n                  <div class="flex md:justify-center">\n                    <div class="text-white flex flex-1 flex-row">\n                      <div data-option class="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg">\n                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>\n                      </div>\n                      <div class="flex flex-col flex-1 text-left ml-4">\n                        <p class="md:-mb-2 text-gray-700">Pembayaran secara luring</p>\n                        <p id="monthly-withdraw" class="text-gray-800 text-2xl lg:text-4xl font-bold">Melalui Admin/TU</p>\n                        <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT BIAYA ADMIN</p>\n                      </div>\n                    </div>\n                  </div>\n                </button>\n                <button id="daring-option" class="flex-1 p-5 pb-8 bg-white shadow-lg rounded-lg w-full focus:outline-none ">\n                  <div class="flex md:justify-center">\n                    <div class="text-white flex flex-1 flex-row">\n                      <div data-option class="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg">\n                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>\n                      </div>\n                      <div class="flex flex-col flex-1 text-left ml-4">\n                        <p class="md:-mb-1 text-gray-700">Pembayaran secara daring</p>\n                        <p id="monthly-withdraw" class="text-gray-800 text-xl md:text-2xl font-bold lg:mr-8">Melalui e-Wallets, Bank, Indomaret, dll</p>\n                        <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT BIAYA TAMBAHAN</p>\n                      </div>\n                    </div>\n                  </div>\n                </button>\n              </div>\n            </div>\n            </div>\n            <button disabled id="next-button" class="disabled:cursor-default w-max bg-primary text-white py-3 px-8 rounded-lg disabled:opacity-50 mx-auto mt-4">Lanjut</button>\n            </div>\n        </div>\n      ');case 1:case"end":return t.stop()}}),t)})))()},afterRender:function(){var t=this;return d(regeneratorRuntime.mark((function e(){var n,r,i,l,c,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.Z.retrieveUser();case 2:return n=e.sent,t._userId=n.id,e.next=6,a.Z.getAkunSiswa(t._userId);case 6:r=e.sent,t._userAccount=r,t._ballance=r.saldo,t._transactionOption="pemasukan",t._paymentOption="luring",i=document.querySelectorAll("#daring-option, #luring-option"),l=document.querySelectorAll("#penarikan-option, #pemasukan-option"),c=document.getElementById("input-nominal"),u=document.getElementById("next-button"),o.Z.init({formInputs:c,submitButton:u}),l.forEach((function(e){e.addEventListener("click",(function(){t._selectTransactionOption(l,e.id),"penarikan"===t._transactionOption?(c.dataset.rule+=" cannot-more-than-".concat(t._ballance),t._selectPaymentOption(i,i[0].id),i[1].style.display="none"):(c.dataset.rule="required value-more-than-999 multiple-of-1000",i[1].style.display=""),s.Z.triggerEvent(c,"keyup")}))})),i.forEach((function(e){e.addEventListener("click",(function(){t._selectPaymentOption(i,e.id)}))})),u.addEventListener("click",d(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n={nisn:t._userId,nominal:c.value,jenis_transaksi:t._transactionOption,metode_pembayaran:t._paymentOption},e.next=4,a.Z.createTransaction(n);case 4:r=e.sent,console.log(r),"luring"===t._paymentOption?t._adminPaymentInit(r):t._midtransPaymentInit(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])}))));case 19:case"end":return e.stop()}}),e)})))()},_midtransPaymentInit:function(t){var e=this;return d(regeneratorRuntime.mark((function n(){var r,o,s,i;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return snap.show(),r=t.response,n.next=4,a.Z.getDataSiswa(e._userId);case 4:return o=n.sent,s={transaction_details:{order_id:r.id_transaksi,gross_amount:r.nominal},item_details:[{id:r.id_transaksi,price:r.nominal,quantity:1,name:"".concat(r.jenis_transaksi.charAt(0).toUpperCase()+r.jenis_transaksi.slice(1)," Saldo"),brand:"Celenganku"}],customer_details:{first_name:o.nama,email:e._userAccount.email},callbacks:{finish:"/"}},n.next=8,a.Z.getMidtransToken(s);case 8:return i=n.sent,n.next=11,a.Z.updateTransaction(r.id_transaksi,{token:i.token});case 11:snap.pay(i.token,{onSuccess:function(){var t=d(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.Z.updateTransaction(r.id_transaksi,{status_transaksi:"selesai"});case 2:return t.next=4,a.Z.updateSaldo(r.nisn,r.nominal,r.jenis_transaksi);case 4:window.location.hash="#";case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),onPending:function(){window.location.hash="#"},onClose:function(){window.location.hash="#"}});case 12:case"end":return n.stop()}}),n)})))()},_selectTransactionOption:function(t,e){t.forEach((function(t){t.id===e?t.disabled=!0:t.disabled=!1})),this._transactionOption=e.replace("-option","")},_adminPaymentInit:function(t){var e=this;window.location.hash="#",r.Z.init({title:"Kode Transaksi",content:'<div class="px-10 py-6">\n        <div class="preloader p-4 flex justify-center m-auto">\n          <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>\n        </div>\n        <div class="hidden" id="modal-content">\n          <p class="mt-2 mb-1">Kode Transaksi kamu adalah</p>\n          <div class="flex flex-row">\n            <p id="id-transaksi" class="my-2 text-3xl select-all font-bold">'.concat(t.response.id_transaksi,'</p>\n            <button role="button" id="copy-button" class="w-max text-primary ml-2 font-light p-2">\n            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>\n            </button>\n          </div>\n          <p class="mt-4 text-gray-500">Transaksi ini akan automatis dibatalkan dalam</p>\n          <p id="time-count" class="mt-1 text-primary"></p>\n        </div>\n        <div class="flex justify-end items-center w-100 mt-4">\n          <button role="button" id="show-qr-button" class="w-max text-primary mx-1 font-light p-2">\n          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></button>\n          <button role="button" id="close-button" class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tutup</button>\n        </div>\n      </div>')});var n=document.querySelector(".preloader"),a=document.getElementById("modal-kode-transaksi"),o=document.getElementById("modal-content"),l=o.innerHTML,d='<img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data='.concat(t.response.id_transaksi,'"></img>'),c=document.getElementById("show-qr-button"),u=document.getElementById("close-button"),m=document.getElementById("copy-button"),p=document.getElementById("id-transaksi");m.addEventListener("click",(function(){s.Z.copyTextToClipboard(t.response.id_transaksi),p.focus()}));var g=new Date(1e3*t.response.tenggat_waktu_pembayaran.seconds),h=setInterval((function(){try{var t=document.getElementById("time-count"),e=i.Z.getTimeCounter(g),n=e.hours,a=e.minutes,r=e.seconds,o="".concat(n," jam ").concat(a," menit ").concat(r," detik");t.innerHTML=o}catch(t){}}),1e3);this._toggleQR=!1,c.addEventListener("click",(function(t){t.stopPropagation(),e._toggleQR=!e._toggleQR,e._toggleQR?o.innerHTML=d:o.innerHTML=l})),u.addEventListener("click",(function(){a.remove(),clearInterval(h)})),setTimeout((function(){n.remove(),o.classList.remove("hidden")}),500)},_selectPaymentOption:function(t,e){window.scrollTo(0,document.body.scrollHeight);t.forEach((function(t){var n=t.querySelector("div[data-option]");t.id===e?(t.classList.add("border-2","border-primary"),n.className="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg"):(t.classList.remove("border-2","border-primary"),n.className="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg")})),this._paymentOption=e.replace("-option","")}}}}]);
//# sourceMappingURL=main.fabb21b8.js.map