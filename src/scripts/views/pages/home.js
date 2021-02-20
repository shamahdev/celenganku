/* eslint-disable max-len */
import Swal from 'sweetalert2'
import formValidation from '../../helper/form-validation'

const Home = {
  async render() {
    return /* html */`
    <div class="flex flex-col-reverse md:flex-row">
      <div class="bg-primary flex-1 h-screen">
        <div class="relative md:h-screen flex flex-col">
          <img class="h-64 md:h-full object-cover" src="./images/login-cover.png">
          <div class="absolute left-0 right-0 bottom-0 mb-4 md:mb-8 mx-auto flex flex-1 flex-col">
            <p class="text-white text-center">Apa itu Celenganku?</p>
            <svg class="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>
      <div class="flex flex-1 h-full my-24 md:my-auto">
        <div class="flex flex-col w-8/12 mx-auto">
        <img class="w-48 mb-16" alt="Celenganku Wordmark" src="./images/celenganku-logo.png">
          <div class="flex flex-row mb-6">
            <button id="pemasukan-option" disabled
              class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-default">Masuk</button>
            <button id="penarikan-option"
              class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Daftar</button>
          </div>
          <div id="login-form">
            <p class="mb-2">NISN</p>
            <input id="user-nisn" name="NISN" data-rule="required no-space number-must-10" value="" type="number"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2">Password</p>
            <input id="user-password" name="Password" data-rule="required no-space" value="" type="password"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
          </div>
          <div class="flex justify-start items-center w-100 mt-6">
            <button role="button" data-submit="/user/register" disabled id="user-login-button"
              class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Masuk</button>
            <a class="ml-4 block text-primary" href="#/admin">Lupa Password</a>
          </div>
          <p class="mt-8">Seorang admin? <a class="ml-1 text-primary" href="#/admin">Login disini</a></p>
        </div>
      </div>
    </div>
      `
  },

  async afterRender() {
    const formInputs = document.querySelectorAll('input[data-rule]')
    const submit = document.querySelector('button[data-submit]')
    formValidation.init({
      formInputs,
      submitButton: submit,
    })

    submit.addEventListener('click', async () => {
      const loginData = {
        nisn: formInputs[0].value,
        password: formInputs[1].value,
      }
      const response = await fetch('/api/siswa/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      const loginResponse = (await response.json())
      Swal.fire({
        icon: loginResponse.status,
        text: loginResponse.message,
        title: loginResponse.title,
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert',
        },
        buttonsStyling: false,
      })
      if (loginResponse.status === 'success') {
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    })
  },

}

// async _createModalForm() {
//   const registerButton = document.getElementById('register-button')
//   const loginButton = document.getElementById('login-button')
//   const adminLoginButton = document.getElementById('admin-login-button')
//   await this._initRegisterForm(registerButton)
//   await this._initLoginForm(loginButton)
//   await this._initAdminLoginForm(adminLoginButton)
// },

//   async _initLoginForm(loginButton) {
//     loginButton.addEventListener('click', (event) => {
//       event.preventDefault()
//       ModalInitializer.init({
//         title: 'Masuk',
//         content:
//         `<div class="px-6 py-4">
//           <p class="my-2">NISN</p>
//           <input id="user-nisn"name="NISN" data-rule="required no-space number-must-10" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//           <p class="my-2">Password</p>
//           <input id="user-password" name="Password" data-rule="required no-space" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//         </div>
//         <div class="flex justify-start items-center w-100 px-6 pb-6">
//           <button role="button" data-submit="/user/register" disabled id="user-login-button" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</button>
//           <a class="ml-4 block text-blue-500 underline text" href="#/admin">Lupa Password</a>
//         </div>`,
//       })
//     })
//   },

//   async _initAdminLoginForm(adminLoginButton) {
//     adminLoginButton.addEventListener('click', (event) => {
//       event.preventDefault()
//       ModalInitializer.init({
//         title: 'Masuk Sebagai Admin',
//         content:
//         `<div class="px-6 py-4">
//           <p class="my-2">ID Admin</p>
//           <input id="admin-id" name="ID Admin" data-rule="required no-space" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//           <p class="my-2">Password</p>
//           <input id="admin-password "name="Password" data-rule="required no-space" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//         </div>
//         <div class="flex justify-start items-center w-100 px-6 pb-6">
//           <button role="button" data-submit="/user/register" disabled id="admin-login-button" class="w-max bg-blue-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Masuk</button>
//           <a class="ml-4 block text-blue-500 underline" href="#/admin">Lupa Password</a>
//         </div>`,
//         bg: 'bg-blue-500',
//       })
//     })
//   },

//   async _initRegisterForm(registerButton) {
//     registerButton.addEventListener('click', (event) => {
//       event.preventDefault()
//       ModalInitializer.init({
//         title: 'Daftar',
//         content:
//         `<div class="px-6 py-4">
//           <p class="my-2">NISN</p>
//           <input id="user-nisn" name="NISN" data-rule="required no-space number-must-10" value="" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//           <p class="my-2">Email</p>
//           <input id="user-email" name="Email" data-rule="required no-space email" value="" placeholder="email@address.com" type="email" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//           <p class="my-2">Password</p>
//           <input id="user-password" name="Password" data-rule="required no-space" data-equal="register-password" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//           <p class="my-2">Ulangi Password</p>
//           <input id="user-pass-again" name="Password" data-rule="required no-space equal-register-password" value="" type="password" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
//         </div>
//         <div class="flex justify-start items-center w-100 px-6 pb-6">
//           <button data-submit="/user/register" disabled id="user-register-button" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50 disabled:cursor-default">Daftar</button>
//           <a class="ml-4 block text-blue-500 underline" href="#/dashboard">Sudah punya akun</a>
//         </div>`,
//       })
//     })
//   },
// }

export default Home
