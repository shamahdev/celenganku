/* eslint-disable max-len */
import Swal from 'sweetalert2'
import APIData from '../../data/api-data'
import formValidation from '../../helper/form-validation'

const Home = {
  async render() {
    return /* html */`
    <div class="flex flex-col-reverse md:flex-row">
      <div class="bg-primary flex-1 h-screen">
        <div class="relative md:h-screen flex flex-col">
          <img id="jumbotron" class="h-64 md:h-full object-cover" src="./images/login-cover.png">
          <div class="absolute left-0 right-0 bottom-0 mb-4 mx-auto flex flex-1 flex-col">
            <p class="text-white text-center">Apa itu Celenganku?</p>
            <svg class="w-8 h-8 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="flex flex-1 h-full my-24 md:my-auto">
        <div class="flex flex-col w-8/12 mx-auto">
          <img class="w-64 mb-16" alt="Celenganku Wordmark" src="./images/celenganku-logo.png">
          <div class="flex flex-row mb-6">
            <button id="login-option" disabled
              class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-default">Masuk</button>
            <button id="register-option"
              class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Daftar</button>
          </div>
          <div id="login-form">
            <p class="mb-2 text-gray-800">NISN</p>
            <input id="user-nisn" name="NISN" data-rule="required no-space number-must-10" value="" type="number"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2 text-gray-800">Password</p>
            <input id="user-password" name="Password" data-rule="required no-space" value=""
              type="password" class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <div class="flex justify-start items-center w-100 mt-6">
              <button role="button" disabled id="user-login-button"
                class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-default">Masuk</button>
            </div>
          </div>
          <div class="hidden" id="register-form">
            <p class="mb-2 text-gray-800">NISN</p>
            <input id="user-nisn-register" name="NISN" data-rule="required no-space number-must-10" value=""
              type="number" class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2 text-gray-800">Email</p>
            <input id="user-email" name="Email" value="" type="email"
              data-rule="required no-space email"
              class="editable mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2 text-gray-800">Buat Password</p>
            <input id="user-password-register" name="Password" data-rule="required no-space digit-more-than-6" value=""
              type="password" class="mb-2 block px-5 py-3 Ulangi Password-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2 text-gray-800">Password</p>
            <input id="user-password-again-register" name="Input"
              data-rule="required no-space digit-more-than-6 equal-user-password-register" value="" type="password"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <div class="flex justify-start items-center w-100 mt-6">
              <button role="button" disabled id="user-register-button"
                class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-default">Daftar</button>
            </div>
          </div>
          <p class="mt-8 text-gray-800">Seorang admin? <a class="ml-1 text-primary" href="#/admin">Login disini</a></p>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col flex-1 text-gray-800">
        <div class="w-8/12 mx-auto md:mr-0 md:ml-auto my-20">
          <img class="w-64 mb-6" alt="Celenganku Wordmark" src="./images/celenganku-logo.png">
          <p class="mb-4">Celenganku adalah sebuah aplikasi tabungan untuk siswa yang difokuskan untunk diterapkan pada
            sekolah</p>
          <p>Dengan menggunakan aplikasi ini diharapkan para siswa dapat mulai menanamkan sikap hemat dan rajin menabung
          </p>
        </div>
      </div>
      <div class="flex flex-1 flex-col h-full mb-16 md:my-auto">
        <div class="mx-auto w-8/12">
          <p class="text-xl font-bold mb-6 text-gray-800">Keunggulan Celenganku</p>
          <div class="flex flex-row my-4">
            <p class="text-white bg-primary rounded-lg h-fit" style="padding: 0.25rem 0.85rem">1</p>
            <p class="mt-1 ml-3">Dapat diakses dengan mudah</p>
          </div>
          <div class="flex flex-row my-4">
            <p class="px-3 py-1 text-white bg-primary rounded-lg h-fit">2</p>
            <p class="mt-1 ml-3">Tampilan yang minimalis dan mudah diinteraksikan</p>
          </div>
          <div class="flex flex-row my-4">
            <p class="px-3 py-1 text-white bg-primary rounded-lg h-fit">3</p>
            <p class="mt-1 ml-3">Metode pembayaran yang lengkap</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="text-center p-5 my-8 text-gray-500">Copyright 2021 Celenganku. All right reserved</footer>
      `
  },

  async afterRender() {
    const loginFormInputs = document.querySelectorAll('#login-form input[data-rule]')
    const loginSubmit = document.getElementById('user-login-button')
    const registerFormInputs = document.querySelectorAll('#register-form input[data-rule]')
    const registerSubmit = document.getElementById('user-register-button')
    const signOption = document.querySelectorAll('#login-option, #register-option')
    const loginForm = document.getElementById('login-form')
    const registerForm = document.getElementById('register-form')
    const forgotPasswordLink = document.getElementById('forgot-password')
    const jumobtronImage = document.getElementById('jumbotron')
    formValidation.init({
      formInputs: loginFormInputs,
      submitButton: loginSubmit,
    })
    this._signOption = 'login'
    signOption.forEach((option) => {
      option.addEventListener('click', () => {
        this._renderChangeOption(signOption, option.id)
        formValidation.init({
          formInputs: loginFormInputs,
          submitButton: loginSubmit,
        })
        if (this._signOption === 'login') {
          loginForm.classList.remove('hidden')
          registerForm.classList.add('hidden')
        } else {
          let registerValidationInit = false
          if (!registerValidationInit) {
            formValidation.init({
              formInputs: registerFormInputs,
              submitButton: registerSubmit,
            })
            registerValidationInit = !registerValidationInit
          }
          loginForm.classList.add('hidden')
          registerForm.classList.remove('hidden')
        }
        jumobtronImage.src = `./images/${this._signOption}-cover.png`
      })
    })

    loginSubmit.addEventListener('click', async () => {
      const loginData = {
        nisn: loginFormInputs[0].value,
        password: loginFormInputs[1].value,
      }
      const loginResponse = await APIData.loginUser(loginData)
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
        loginFormInputs.forEach((input) => {
          input.value = ''
          input.classList.remove('border-green-500', 'border-opacity-50', 'focus:border-green-500')
        })
        window.location.hash = ''
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    })

    registerSubmit.addEventListener('click', async () => {
      const registerData = {
        nisn: registerFormInputs[0].value,
        email: registerFormInputs[1].value,
        password: registerFormInputs[3].value,
      }
      const registerResponse = await APIData.registerUser(registerData)
      console.log(registerResponse)
      Swal.fire({
        icon: registerResponse.status,
        text: registerResponse.message,
        title: registerResponse.title,
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert',
        },
        buttonsStyling: false,
      })
      if (registerResponse.status === 'success') {
        loginFormInputs.forEach((input) => {
          input.value = ''
          input.classList.remove('border-green-500', 'border-opacity-50', 'focus:border-green-500')
        })
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    })
  },

  _renderChangeOption(optionButton, optionId) {
    optionButton.forEach((option) => {
      if (option.id === optionId) {
        option.disabled = true
      } else {
        option.disabled = false
      }
    })
    this._signOption = optionId.replace('-option', '')
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
