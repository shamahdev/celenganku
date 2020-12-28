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
          <p class="text-xl text-center leading-8 font-normal tracking-tight text-gray-900 md:text-3xl mb-10">
          Mulai Menabung
        </p>
        <div class="flex flex-col md:flex-row gap-8">
          <button id='login-button' class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Masuk</p>
                <img class="object-contain" src="./images/login-cover.png" alt="Login Button Illustration" srcset="">
                <p class="text-sm">Sudah punya akun? Login ke akunmu dan cek celengan kamu sekarang</p>
              </div>
            </div>
          </button>
          <button id='register-button' class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Daftar</p>
                <img class="object-contain" src="./images/register-cover.png" alt="Register Button Illustration" srcset="">
                <p class="text-sm">Belum punya akun? Daftar sekarang dan mulai menabung di celenganku</p>
              </div>
            </div>
          </button>
        </div>
        <div class="text-center my-8">
          <a role="button" id="admin-login-button" class="block text-blue-500 underline"">login sebagai admin</a>
          <p class="inline-block">Butuh bantuan? </p><a class=" text-blue-500 underline" href="#/admin"> lihat panduan berikut</a>
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
          <input value="" type="number" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
          <p class="my-2">Password</p>
          <input value="" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <a data-modal="Masuk" href="#/dashboard" disabled id="login" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</a>
          <a class="ml-4 block text-blue-500 underline text-sm" href="#/admin">Lupa Password</a>
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
          <input value="" type="number" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
          <p class="my-2">Password</p>
          <input value="" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <a data-modal="Masuk Sebagai Admin" href="#/admin" disabled id="login" class="w-max bg-blue-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</a>
          <a class="ml-4 block text-blue-500 underline text-sm" href="#/admin">Lupa Password</a>
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
          <input value="" type="number" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
          <p class="my-2">Password</p>
          <input value="" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
          <p class="my-2">Ulangi Password</p>
          <input value="" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
        </div>
        <div class="flex justify-start items-center w-100 px-6 pb-6">
          <button disabled id="register" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Daftar</button>
          <a class="ml-4 block text-blue-500 underline text-sm" href="#/admin">Sudah punya akun</a>
        </div>`,
      })
    })
  },
}

export default Home
