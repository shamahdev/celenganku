import ModalInitializer from '../../utils/modal-initializer'

const Home = {
  async render() {
    return `
        <div class="p-4 flex flex-col flex-wrap content-center justify-center">
          <p class="w-16 text-center mx-auto">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="null">
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#FF974B"/>
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#FF974B"/>
              </g>
            </svg>
          </p>
          <p class="text-3xl text-center leading-8 font-normal tracking-tight text-gray-900 mb-10">
          Celenganku
        </p>
        <div class="flex flex-col md:flex-row my-4 gap-8">
          <button id='login-button' class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl font-bold">Masuk</p>
                <img class="hidden md:block object-contain" src="./images/login-cover.png" alt="Login Button Illustration" srcset="">
                <p class="mt-2 md:mt-0 text-sm">Sudah punya akun? Login dan cek celengan kamu sekarang!</p>
              </div>
            </div>
          </button>
          <button id='register-button' class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl font-bold">Daftar</p>
                <img class="hidden md:block object-contain" src="./images/register-cover.png" alt="Register Button Illustration" srcset="">
                <p class="mt-2 md:mt-0 text-sm">Belum punya akun? Daftar sekarang dan mulai menabung di Celenganku</p>
              </div>
            </div>
          </button>
        </div>
        <div class="text-center flex flex-col w-max ml-auto mr-auto mt-3">
          <bu role="button" id="admin-login-button" class="text-primary underline mb-5">Masuk sebagai Admin</bu>
          <p class="inline-block text-gray-800">Butuh bantuan? </p><a class="text-blue-500 ml-2 underline block md:inline" href="#/admin">Pelajari panduan berikut</a>
        </div>
        </div>
      `
  },

  async afterRender() {
    await this._createModalForm()
  },

  async _createModalForm() {
    const registerButton = document.getElementById('register-button')
    const loginButton = document.getElementById('login-button')
    const adminLoginButton = document.getElementById('admin-login-button')
    await this._initRegisterForm(registerButton)
    await this._initLoginForm(loginButton)
    await this._initAdminLoginForm(adminLoginButton)
  },

  async _initLoginForm(loginButton) {
    loginButton.addEventListener('click', (event) => {
      event.preventDefault()
      ModalInitializer.init({
        title: 'Masuk',
        content:
        `<div class="px-6 py-4">
          <p class="my-2">NISN</p>
          <input name="NISN" data-rule="required no-space number-must-10" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          <p class="my-2">Password</p>
          <div class="relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <input class="hidden password-toggle" id="toggle" type="checkbox">
              <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="toggle">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
              </label>
            </div>
            <input name="Password" data-rule="required" data-equal="register-password" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          </div>
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <button role="button" data-submit="/user/register" disabled id="login" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</button>
          <a class="ml-4 block text-blue-500 underline text" href="#/admin">Lupa Password</a>
        </div>`,
      })
    })
  },

  async _initAdminLoginForm(adminLoginButton) {
    adminLoginButton.addEventListener('click', (event) => {
      event.preventDefault()
      ModalInitializer.init({
        title: 'Masuk Sebagai Admin',
        content:
        `<div class="px-6 py-4">
          <p class="my-2">ID Admin</p>
          <input name="ID Admin" data-rule="required no-space" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          <p class="my-2">Password</p>
          <div class="relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <input class="hidden password-toggle" id="toggle" type="checkbox">
              <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="toggle">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
              </label>
            </div>
            <input id="admin-password "name="Password" data-rule="required no-space" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          </div>
          
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <button role="button" data-submit="/user/register" data-modal="Masuk Sebagai Admin" href="#/admin" disabled id="login" class="w-max bg-blue-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</button>
          <a class="ml-4 block text-blue-500 underline" href="#/admin">Lupa Password</a>
        </div>`,
        bg: 'bg-blue-500',
      })
    })
  },

  async _initRegisterForm(registerButton) {
    registerButton.addEventListener('click', (event) => {
      event.preventDefault()
      ModalInitializer.init({
        title: 'Daftar',
        content:
        `<div class="px-6 py-4">
          <p class="my-2">NISN</p>
          <input name="NISN" data-rule="required no-space number-must-10" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          <p class="my-2">Email</p>
          <input name="Email" data-rule="required no-space email" value="" placeholder="email@address.com" type="email" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          <p class="my-2">Password</p>
          <div class="relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <input class="hidden password-toggle" id="toggle" type="checkbox">
              <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="toggle">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
              </label>
            </div>
            <input name="Password" data-rule="required" data-equal="register-password" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          </div>
          
          <p class="my-2">Ulangi Password</p>
          <div class="relative w-full">
            <div class="absolute inset-y-0 right-0 flex items-center px-2">
              <input class="hidden password-toggle" id="toggle" type="checkbox">
              <label class="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer password-label" for="toggle">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
              </label>
            </div>
            <input name="Password" data-rule="required equal-register-password" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
          </div>
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <button data-submit="/user/register" disabled id="register" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50 disabled:cursor-default">Daftar</button>
          <a class="ml-4 block text-blue-500 underline" href="#/admin">Sudah punya akun</a>
        </div>`,
      })
    })
  },
}

export default Home
