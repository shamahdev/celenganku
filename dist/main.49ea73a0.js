(self.webpackChunkcelenganku_app=self.webpackChunkcelenganku_app||[]).push([[111],{398:()=>{function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(n)}function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function t(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(n,t){return!t||"object"!==e(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(n):t}function o(e){var n="function"==typeof Map?new Map:void 0;return(o=function(e){if(null===e||(t=e,-1===Function.toString.call(t).indexOf("[native code]")))return e;var t;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(e))return n.get(e);n.set(e,r)}function r(){return a(e,arguments,l(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),s(r,e)})(e)}function a(e,n,t){return(a=i()?Reflect.construct:function(e,n,t){var r=[null];r.push.apply(r,n);var o=new(Function.bind.apply(e,r));return t&&s(o,t.prototype),o}).apply(null,arguments)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function s(e,n){return(s=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var u=function(e){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&s(e,n)}(f,e);var o,a,u,c,d,p=(o=f,a=i(),function(){var e,n=l(o);if(a){var t=l(this).constructor;e=Reflect.construct(n,arguments,t)}else e=n.apply(this,arguments);return r(this,e)});function f(){return n(this,f),p.apply(this,arguments)}return u=f,(c=[{key:"_bgColor",value:function(){var e="bg-primary";return"admin"===this._type&&(e="bg-blue-500"),e}},{key:"_renderNavsByType",value:function(){return"admin"===this._type?'<a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg active" href="#/admin">\n            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" \n                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />\n            </svg>\n        </a>\n        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/admin/pay">\n          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />\n          </svg>\n        </a>\n        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/admin/data">\n          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n          </svg>\n        </a>':'<a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg active" href="#/dashboard">\n            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" \n                  d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />\n          </svg>\n        </a>\n        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/pay">\n        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />\n      </svg>\n        </a>\n        <a class="btn-nav rounded-b-lg md:rounded-none md:rounded-l-lg" href="#/profile">\n          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n          </svg>\n        </a>'}},{key:"_render",value:function(){this.className="".concat(this._bgColor()," fixed bottom-0 w-full md:relative md:w-auto md:h-auto md:min-h-screen"),this.innerHTML='\n    <div id="navs" class="sticky top-0 flex flex-row justify-evenly md:flex-col">\n        <p class="h-16 w-16 p-4 text-white">\n            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">\n            <g stroke="null">\n                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#ffffff"/>\n                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#ffffff"/>\n            </g>\n            </svg>\n        </p>\n        '.concat(this._renderNavsByType(),"\n    </div>")}},{key:"type",set:function(e){this._type=e,this._render()}}])&&t(u.prototype,c),d&&t(u,d),f}(o(HTMLElement));customElements.define("sidebar-nav",u)},502:(e,n,t)=>{"use strict";function r(e,n,t,r,o,a,i){try{var s=e[a](i),l=s.value}catch(e){return void t(e)}s.done?n(l):Promise.resolve(l).then(r,o)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(o,a){var i=e.apply(n,t);function s(e){r(i,o,a,s,l,"next",e)}function l(e){r(i,o,a,s,l,"throw",e)}s(void 0)}))}}t.d(n,{Z:()=>a});const a={init:function(e){var n=this;return o(regeneratorRuntime.mark((function t(){var r,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.formInputs,o=e.submitButton,n._formInputs=r,n._submitButton=o,t.next=5,n._createEvent();case 5:case"end":return t.stop()}}),t)})))()},_createEvent:function(){var e=this;return o(regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:void 0!==(t=e._formInputs).length?t.forEach((function(n){e._showPasswordToggle(n),n.addEventListener("keyup",(function(t){t.preventDefault(),e._validateInput(n)}))})):(e._showPasswordToggle(t),t.addEventListener("keyup",(function(n){n.preventDefault(),e._validateInput(t)})));case 2:case"end":return n.stop()}}),n)})))()},_showPasswordToggle:function(e){return o(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:"password"===e.type&&((t=document.createElement("div")).className="relative w-full",t.id="".concat(e.id,"-wrapper"),t.innerHTML='\n          <div class="absolute inset-y-0 right-0 flex items-center px-2">\n            <input class="hidden password-toggle" id="'.concat(e.id,'-toggle" type="checkbox">\n            <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="').concat(e.id,'-toggle">\n            <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />\n        </svg>\n            </label>\n          </div>'),e.parentElement.insertBefore(t,e),t.appendChild(e),r=document.getElementById("".concat(e.id,"-toggle")),console.log(r),r.addEventListener("change",(function(){var n=r.parentElement.querySelector(".password-label");"password"===e.type?(e.type="text",n.innerHTML='<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />\n        </svg>'):(e.type="password",n.innerHTML='<svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />\n        </svg>'),e.focus()})));case 1:case"end":return n.stop()}}),n)})))()},_validateInput:function(e){var n=this;return o(regeneratorRuntime.mark((function t(){var r,o,a,i,s,l,u,c,d,p,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=["border-red-500","border-opacity-50","focus:border-red-500"],a=["border-green-500","border-opacity-50","focus:border-green-500"],(i=document.createElement("span")).className="text-sm text-red-500",i.id="".concat(e.id,"-alert"),s=[],"rule"in e.dataset&&e.dataset.rule.split(" ").forEach((function(n){if("required"===n)""===e.value?s.push("".concat(e.name," tidak boleh kosong")):s.includes("".concat(e.name," tidak boleh kosong"))&&s.splice(s.indexOf("".concat(e.name," tidak boleh kosong")),1);else if("no-space"===n)e.value.indexOf(" ")>=0?s.push("".concat(e.name," tidak boleh mengandung spasi")):s.includes("".concat(e.name," tidak boleh mengandung spasi"))&&s.splice(s.indexOf("".concat(e.name," tidak boleh mengandung spasi")),1);else if(n.includes("number-must-")){var t=parseInt(n.replace("number-must-",""),10);e.value.length<t||e.value.length>t?s.push("".concat(e.name," harus berisi ").concat(t," digit angka")):s.includes("".concat(e.name," harus berisikan ").concat(t," digit angka"))&&s.splice(s.indexOf("".concat(e.name," harus berisi ").concat(t," digit angka")),1)}else if(n.includes("email"))e.value.includes("@")&&e.value.split("@")[1].includes(".")?s.includes("".concat(e.name," harus berisikan format: your@email.com"))&&s.splice(s.indexOf("".concat(e.name," harus berisikan format: your@email.com")),1):s.push("".concat(e.name," harus berisikan format: your@email.com"));else if(n.includes("equal-")){var r=document.querySelector('input[data-equal="'.concat(n.replace("equal-",""),'"]'));e.value!==r.value?s.push("Input harus sama dengan ".concat(r.name)):s.includes("Input harus sama dengan ".concat(r.name))&&s.splice(s.indexOf("Input harus sama dengan ".concat(r.name)),1)}})),l=document.getElementById("".concat(e.id,"-alert")),s.length>0)(u=e.classList).add.apply(u,o),(c=e.classList).remove.apply(c,a),void 0!==l&&null!=l?l.innerHTML=s[0]:(i.innerHTML=s[0],"Password"===e.name?e.parentElement.parentElement.insertBefore(i,e.parentElement.nextSibling):e.parentElement.insertBefore(i,e.nextSibling));else try{(d=e.classList).remove.apply(d,o),(p=e.classList).add.apply(p,a),l.remove()}catch(e){}f=document.querySelectorAll("input.border-green-500"),void 0!==n._formInputs.length?f.length===n._formInputs.length?n._submitButton.disabled=!1:n._submitButton.disabled=!0:(r=n._formInputs.className).includes.apply(r,a)?n._submitButton.disabled=!1:n._submitButton.disabled=!0;case 11:case"end":return t.stop()}}),t)})))()}}},746:(e,n,t)=>{"use strict";t(9),t(777),t(73),t(665);var r=t(618);e=t.hmd(e);var o=new r.Z({content:document.querySelector("main"),sidebar:document.createElement("sidebar-nav"),appbar:document.getElementById("appbar")});window.addEventListener("hashchange",(function(){o.loadPage()})),window.addEventListener("load",(function(){o.loadPage()})),void 0!==e.hot&&e.hot.accept()}}]);
//# sourceMappingURL=main.49ea73a0.js.map