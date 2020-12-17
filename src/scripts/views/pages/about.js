const About = {
  async render() {
    return `
    <div class="hidden md:block text-center">
    <p class="text-xl leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
      Profil Saya
    </p>
  </div>
  <div class="flex flex-col">
    <div class="bg-gray-200 p-4 rounded-lg flex flex-col mt-4 md:p-8 md:mt-6">
      <div class="flex-1 py-0 white rounded-lg">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="p-3 mx-auto rounded-lg">
            <div class="flex w-48 h-48 rounded-full text-white"><img
              class="rounded-full w-full h-full mx-auto" alt="User Photo Profile" src="https://i.pravatar.cc/150?u=tooryadikevin"> </div>
          </div>
          <div class="flex-1 p-5 rounded-lg w-full">
            <p class="my-2 text-lg">NISN</p>
            <input disabled value="181113842" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">
            <p class="my-2 text-lg">Nama Lengkap</p>
            <input disabled value="Turyadi Kevin" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">
            <p class="my-2 text-lg">Tentang Saya</p>
            <textarea rows="4" type="text" class="disabled:resize-none mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 disabled:text-gray-500 focus:placeholder-gray-400" disabled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestias dolorum ea enim doloribus, voluptatem dolor recusandae quo totam delectus quae deserunt magnam.</textarea>
            <p class="my-2 text-lg">Password</p>
            <input value="turyadikevin" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 disabled:text-gray-500 focus:placeholder-gray-400" disabled>
            <button id="edit-button" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Edit Profil</button>
            <button id="discard-button" class="hidden w-max bg-red-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Batal</button>
            <button id="confirm-button" class="hidden w-max bg-green-500 text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Selesai</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      `
  },

  async afterRender() {
    const editButton = document.getElementById('edit-button')
    const discardButton = document.getElementById('discard-button')
    const confirmButton = document.getElementById('confirm-button')
    const editableForm = document.querySelectorAll('textarea, input[type="password"]')
    editButton.addEventListener('click', () => {
      editableForm.forEach(input => {
        input.disabled = false
        editButton.disabled = true
        discardButton.classList.remove('hidden')
        confirmButton.classList.remove('hidden')
      })
    })
    confirmButton.addEventListener('click', () => {
      editableForm.forEach(input => {
        input.disabled = true
        editButton.disabled = false
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
      })
    })
    discardButton.addEventListener('click', () => {
      editableForm[0].value = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestias dolorum ea enim doloribus, voluptatem dolor recusandae quo totam delectus quae deserunt magnam.`
      editableForm[1].value = `turyadikevin`
      editableForm.forEach(input => {
        input.disabled = true
        editButton.disabled = false
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
      })
    })
  },
}

export default About;