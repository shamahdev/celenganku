import formValidation from '../../../helper/form-validation'

const Profile = {
  async render() {
    return /* html */`
    <div class="hidden md:block text-center">
    <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
      Profil Saya
    </p>
  </div>
  <div class="flex flex-row">
    <div class="p-4 rounded-lg flex flex-col flex-1 mt-4">
      <div class="bg-gray-200 flex flex-col py-0 white rounded-lg p-4">
        <div class="flex flex-col gap-4">
          <div class="p-3 mx-auto rounded-lg">
            <div class="flex flex-col w-48 rounded-full text-white">
              <img class="rounded-full w-full h-48 mx-auto" alt="User Photo Profile" src="https://i.pravatar.cc/150?u=tooryadikevin">
              <div id="change-photo" class="flex flex-row">
              <label for="file-upload" class="mt-4 mr-2 ml-auto cursor-pointer w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">
                  U
              </label>
              <input class="hidden" id="file-upload" type="file"/>
              <button class="mt-4 ml-2 mr-auto cursor-pointer w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">E</button>
              </div>
            </div>
          </div>
          <div class="flex-1 p-5 rounded-lg w-full">
            <div class="py-4">
            <p class="my-2">NISN</p>
            <input disabled value="0031818066" type="text" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
            <p class="my-2">Nama Lengkap</p>
            <input disabled value="shaddam.a.h@gmail.com" type="email" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
            <p class="my-2">Password</p>
            <input disabled value="shamahdotid" type="password" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="p-4 rounded-lg flex flex-col flex-1 mt-4">
    <p class="mb-4 text-lg text-center md:text-left">Informasi Siswa</p>
      <div class="bg-gray-200 p-4 flex-row py-0 white rounded-lg">
        <div class="flex flex-col gap-4">
          <div class="flex-1 p-5 rounded-lg w-full">
            <div class="">
            <p class="my-2">Nama Lengkap</p>
            <input disabled value="Shaddam Amru Hasibuan" type="text" class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
            <p class="my-2">Alamat</p>
            <textarea rows="4" type="text" class="disabled:resize-none mb-2 block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500 focus:placeholder-gray-400" disabled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestias dolorum ea enim doloribus, voluptatem dolor recusandae quo totam delectus quae deserunt magnam.</textarea>
            <p class="my-2">Nomor Telepon</p>
            <input id="edit-password" name="Password" data-rule="required no-space" value="081321300015" type="number" class="mb-2 text-md block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500 focus:placeholder-gray-400" disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4">
            <button id="edit-button" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Edit Profil</button>
            <button id="discard-button" class="hidden w-max bg-red-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Batal</button>
            <button id="confirm-button" class="hidden w-max bg-green-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Selesai</button>
            </div>
    </div>
  </div>
      `
  },

  async afterRender() {
    const editButton = document.getElementById('edit-button')
    const discardButton = document.getElementById('discard-button')
    const confirmButton = document.getElementById('confirm-button')
    const changePhotoButton = document.getElementById('change-photo')
    const editableForm = document.querySelectorAll('textarea, input[type="password"]')
    editButton.addEventListener('click', () => {
      editableForm.forEach((input) => {
        input.disabled = false
        editButton.classList.add('hidden')
        discardButton.classList.remove('hidden')
        confirmButton.classList.remove('hidden')
        changePhotoButton.classList.remove('hidden')
      })
    })
    confirmButton.addEventListener('click', () => {
      editableForm.forEach((input) => {
        input.disabled = true
        editButton.classList.remove('hidden')
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
        changePhotoButton.classList.add('hidden')
      })
    })
    discardButton.addEventListener('click', () => {
      editableForm[0].value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestias dolorum ea enim doloribus, voluptatem dolor recusandae quo totam delectus quae deserunt magnam.'
      editableForm[1].value = 'turyadikevin'
      editableForm.forEach((input) => {
        editableForm[1].classList.remove('border-red-500', 'border-opacity-50', 'focus:border-red-500', 'border-green-500', 'border-opacity-50', 'focus:border-green-500')
        const passwordInputAlert = document.getElementById('edit-password-alert')

        if (typeof (passwordInputAlert) !== 'undefined' && passwordInputAlert != null) {
          passwordInputAlert.remove()
        }
        input.disabled = true
        editButton.classList.remove('hidden')
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
        changePhotoButton.classList.add('hidden')
      })
    })

    formValidation.init({
      formInputs: editableForm[1],
      submitButton: confirmButton,
    })
  },
}

export default Profile
