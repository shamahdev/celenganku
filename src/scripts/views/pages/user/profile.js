/* eslint-disable max-len */
import Swal from 'sweetalert2'
import APIData from '../../../data/api-data'
import formValidation from '../../../helper/form-validation'

const Profile = {
  async render() {
    return /* html */`
    <div class="text-center">
    <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
      Profil Saya
    </p>
  </div>
  <div class="flex flex-col lg:flex-row">
    <div class="p-5 rounded-lg flex flex-row md:flex-col flex-1 md:mt-4">
      <div class="bg-gray-200 p-5 md:p-8 flex flex-1 flex-col white rounded-lg">
      <div class="preloader p-4 flex mt-auto mb-auto ml-auto mr-auto">
        <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
        <div id="account-form" class="hidden flex flex-col gap-4">
          <div class="mx-auto mt-4 rounded-lg">
            <div class="flex flex-col w-48 rounded-full text-white">
              <img id="photo-profile" class="object-cover rounded-full w-full h-48 mx-auto" alt="User Photo Profile" src="http://ui-avatars.com/api/background=fff&color=fff">
              <div id="change-photo" class="disabled:cursor-default hidden flex flex-row">
              <label for="file-upload" class="p-3 mt-4 mr-1 ml-auto cursor-pointer w-max bg-primary text-white mx-1 rounded-lg disabled:opacity-50">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </label>
              <input class="hidden" id="file-upload" type="file" accept="image/*">
              <button id="delete-photo" class="disabled:cursor-default p-3 mt-4 mr-auto ml-1 cursor-pointer w-max bg-primary text-white mx-1 rounded-lg disabled:opacity-50">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
              </div>
            </div>
          </div>
          <div class="flex-1 pt-0 rounded-lg w-full">
        <div class="">
        <p class="mb-2">NISN</p>
        <input id="input-nisn" name="NISN" disabled value="" type="text" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500">
        <p class="mb-2 mt-4">Email</p>
        <input id="input-email" name="Email" disabled value="" type="email" data-rule="required no-space email" class="editable mb-2 block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500">
        <p class="mt-4">Password</p>
        <input id="input-password" name="Password" disabled value="" type="password" data-rule="required no-space" class="editable block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500">
        </div>
    </div>
      </div>
    </div>
    </div>
    <div class="p-5 rounded-lg flex flex-col flex-1 md:mt-4">
    <p class="mb-4 text-lg text-center md:text-left">Informasi Siswa</p>
      <div class="bg-gray-200 p-5 md:p-8 flex-col white rounded-lg">
      <div class="preloader justify-center p-4 flex mt-auto mb-auto ml-auto mr-auto">
        <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
        <div id="profile-form" class="hidden flex flex-col">
          <div class="flex-1 rounded-lg w-full">
            <div class="">
              <p class="mb-2">Nama Lengkap</p>
              <input id="input-nama" name="Nama" disabled value="" type="text" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
              <p class="mb-2 mt-4">Alamat</p>
              <textarea id="input-alamat" name="Alamat" rows="4" type="text" class="disabled:resize-none mb-2 block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500" disabled></textarea>
              <p class="mb-2 mt-4">Nomor Telepon</p>
              <input id="input-no_telepon" name="Nomer Telepon" data-rule="required no-space" value="" type="number" class="editable text-md block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500 focus:placeholder-gray-400" disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4">
            <button id="edit-button" class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Edit Profil</button>
            <button id="discard-button" class="hidden w-max bg-failed text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Batalkan</button>
            <button id="confirm-button" class="hidden w-max bg-success text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Selesai</button>
            </div>
    </div>
  </div>
      `
  },

  async afterRender() {
    this._accountInput = ''
    this._profileInput = ''
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    const user = await this._getProfileData(responseData.id)

    const allInputForms = document.querySelectorAll('[id^="input"]')
    const photoProfile = document.getElementById('photo-profile')
    allInputForms.forEach((input) => {
      const inputValue = input.id.replace('input-', '')
      input.value = user[inputValue]
    })

    photoProfile.src = user.url_foto || `http://ui-avatars.com/api/?name=${user.nama}&background=fff`
    this._initialize()
  },

  async _initialize() {
    // Remove Preloders
    const preloaders = document.querySelectorAll('.preloader')
    const profileForm = document.getElementById('profile-form')
    const accountForm = document.getElementById('account-form')

    // Buttons
    const editButton = document.getElementById('edit-button')
    const discardButton = document.getElementById('discard-button')
    const confirmButton = document.getElementById('confirm-button')

    // Photos
    let newPhoto = ''
    const photoContainer = document.getElementById('change-photo')
    const photoProfile = document.getElementById('photo-profile')
    const deletePhotoButton = document.getElementById('delete-photo')
    const photoUploadButton = document.getElementById('file-upload')

    // Inputs
    const editableForm = document.querySelectorAll('input[data-rule]')
    const [email, password, nomorTelepon] = editableForm

    // Input Temp
    const photoProfileTemp = photoProfile.src
    const emailTemp = email.value
    const passwordTemp = password.value
    const nomorTeleponTemp = nomorTelepon.value

    if (photoProfileTemp.includes('ui-avatars.com')) deletePhotoButton.disabled = true

    const toggleEditable = (option) => {
      if (option) {
        editButton.classList.add('hidden')
        discardButton.classList.remove('hidden')
        confirmButton.classList.remove('hidden')
        photoContainer.classList.remove('hidden')
      } else {
        editButton.classList.remove('hidden')
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
        photoContainer.classList.add('hidden')
      }
    }

    // Events
    editButton.addEventListener('click', () => {
      editableForm.forEach((input) => {
        input.disabled = false
        toggleEditable(true)
      })
    })

    confirmButton.addEventListener('click', async () => {
      let confirmUpdate = true
      if (password.value !== passwordTemp) {
        confirmUpdate = false
        const result = await Swal.fire({
          icon: 'warning',
          text: 'Tekan pilihan untuk mengkonfirmasi',
          title: 'Apakah benar ingin mengubah password?',
          showCancelButton: true,
          confirmButtonText: 'Benar',
          cancelButtonText: 'Tidak',
          customClass: {
            popup: 'popup-sweetalert',
            confirmButton: 'btn-sweetalert bg-success',
            cancelButton: 'btn-sweetalert bg-failed',
          },
          buttonsStyling: false,
        })

        if (result.isConfirmed) {
          confirmUpdate = true
        }
      }

      if (confirmUpdate) {
        this._updateProfile(email.value, password.value, nomorTelepon.value, newPhoto, photoProfileTemp)
        editableForm.forEach((input) => {
          input.disabled = true
          toggleEditable(false)
        })
      }
    })

    discardButton.addEventListener('click', () => {
      const elementAlerts = document.querySelectorAll('span[id*="-alert"]')
      if (elementAlerts.length > 0) {
        elementAlerts.forEach((element) => {
          element.remove()
        })
      } else if (elementAlerts.length !== 0) {
        elementAlerts.remove()
      }
      photoProfile.src = photoProfileTemp
      email.value = emailTemp
      password.value = passwordTemp
      nomorTelepon.value = nomorTeleponTemp
      if (photoProfileTemp.includes('ui-avatars.com')) deletePhotoButton.disabled = true

      editableForm.forEach((input) => {
        input.classList.remove('border-red-500', 'border-opacity-50', 'focus:border-red-500', 'border-green-500', 'border-opacity-50', 'focus:border-green-500')
        input.disabled = true
        toggleEditable(false)
      })
    })

    photoUploadButton.addEventListener('change', async (event) => {
      // eslint-disable-next-line prefer-destructuring
      newPhoto = event.target.files[0]
      const reader = new FileReader()
      photoProfile.title = newPhoto.name

      reader.onload = (e) => {
        photoProfile.src = e.target.result
      }
      reader.readAsDataURL(newPhoto)
      deletePhotoButton.disabled = false
    })

    deletePhotoButton.addEventListener('click', () => {
      newPhoto = 'default'
      photoProfile.src = `http://ui-avatars.com/api/?name=${emailTemp}&background=fff`
      deletePhotoButton.disabled = true
    })

    formValidation.init({
      formInputs: editableForm,
      submitButton: confirmButton,
      isEdit: true,
    })

    // Remove preloader
    profileForm.classList.remove('hidden')
    accountForm.classList.remove('hidden')
    preloaders.forEach((preloader) => {
      preloader.remove()
    })
  },

  async _getProfileData(id) {
    const profileDataArray = []
    profileDataArray.push(await APIData.getAkunSiswa(id))
    profileDataArray.push(await APIData.getProfilSiswa(id))
    profileDataArray.push(await APIData.getDataSiswa(id))

    const profileData = {}
    profileDataArray.forEach((data) => {
      Object.assign(profileData, data)
    })

    return profileData
  },

  async _updateProfile(email, password, noTelepon, newPhoto, photoProfileTemp) {
    const newData = {
      email,
      password,
      no_telepon: noTelepon,
      url_foto: photoProfileTemp,
    }

    if (newPhoto !== '') {
      if (photoProfileTemp !== '' && !(photoProfileTemp.includes('ui-avatars.com'))) {
        await APIData.deleteFile(photoProfileTemp)
      }
      if (newPhoto === 'default') {
        newData.url_foto = ''
      } else {
        const photo = await APIData.uploadFile(newPhoto)
        newData.url_foto = photo.url
      }
    }

    const response = await APIData.updateAkunSiswa(this._userId, newData)
    console.log(response)
  },
}

export default Profile
