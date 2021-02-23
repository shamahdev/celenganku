/* eslint-disable max-len */
import Swal from 'sweetalert2'
import APIData from '../../data/api-data'
import formValidation from '../../helper/form-validation'

const Admin = {
  async render() {
    return /* html */`
    <div class="flex flex-col-reverse md:flex-row">
      <div class="bg-secondary flex-1 h-screen">
        <div class="relative md:h-screen flex flex-col">
          <img id="jumbotron" class="h-64 md:h-full object-contain" src="./images/login-admin-cover.png">
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
          <img class="w-full max-w-sm mb-16" alt="Celenganku Admin Wordmark" src="./images/celengankuadmin-logo.png">
          <div id="login-admin-form">
            <p class="mb-2 text-gray-800">ID Admin</p>
            <input id="user-nisn" name="ID Admin" data-rule="required no-space" value=""
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <p class="mb-2 text-gray-800">Password</p>
            <input id="user-password" name="Password" data-rule="required no-space" value=""
              type="password" class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
            <div class="flex justify-start items-center w-100 mt-6">
              <button role="button" disabled id="admin-login-button"
                class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-default">Masuk</button>
              <a id="forgot-password" class="ml-4 block text-secondary">Lupa Password</a>
            </div>
          </div>
          <p class="mt-8 text-gray-800">Seorang siswa? <a class="ml-1 text-secondary" href="#/">Login disini</a></p>
        </div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col flex-1 text-gray-800">
        <div class="w-8/12 mx-auto md:mr-0 md:ml-auto my-20">
          <img class="w-full max-w-sm mb-6" alt="Celenganku Admin Wordmark" src="./images/celengankuadmin-logo.png">
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
            <p class="text-white bg-secondary rounded-lg h-fit" style="padding: 0.25rem 0.85rem">1</p>
            <p class="mt-1 ml-3">Dapat diakses dengan mudah</p>
          </div>
          <div class="flex flex-row my-4">
            <p class="px-3 py-1 text-white bg-secondary rounded-lg h-fit">2</p>
            <p class="mt-1 ml-3">Tampilan yang minimalis dan mudah diinteraksikan</p>
          </div>
          <div class="flex flex-row my-4">
            <p class="px-3 py-1 text-white bg-secondary rounded-lg h-fit">3</p>
            <p class="mt-1 ml-3">Metode pembayaran yang lengkap</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="text-center p-5 my-8 text-gray-500">Copyright 2021 Celenganku. All right reserved</footer>
      `
  },

  async afterRender() {
    const loginFormInputs = document.querySelectorAll('input[data-rule]')
    const loginSubmit = document.getElementById('admin-login-button')
    formValidation.init({
      formInputs: loginFormInputs,
      submitButton: loginSubmit,
    })
    this._signOption = 'login'

    loginSubmit.addEventListener('click', async () => {
      const loginData = {
        id_admin: loginFormInputs[0].value,
        password: loginFormInputs[1].value,
      }
      const loginResponse = await APIData.loginAdmin(loginData)
      Swal.fire({
        icon: loginResponse.status,
        text: loginResponse.message,
        title: loginResponse.title,
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
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
  },
}

export default Admin
