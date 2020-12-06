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
          <div class="p-3 rounded-lg">
            <div class="flex w-48 h-48 rounded-full text-white"><img
              class="rounded-full w-full h-full" alt="User Photo Profile" src="https://avatars3.githubusercontent.com/u/2763884?s=128"> </div>
          </div>
          <div class="flex-1 p-5 rounded-lg w-full">
            <p class="my-2 text-lg">NISN</p>
            <input disabled value="181113842" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">
            <p class="my-2 text-lg">Nama Lengkap</p>
            <input disabled value="Turyadi Kevin" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">
            <p class="my-2 text-lg">Tentang Saya</p>
            <textarea disabled rows="4" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum molestias dolorum ea enim doloribus, voluptatem dolor recusandae quo totam delectus quae deserunt magnam.</textarea>
            <p class="my-2 text-lg">Password</p>
            <input disabled value="Nardi Meninggal" type="password" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white border-gray-300 text-gray-500 focus:placeholder-gray-400">
            <button class="w-max bg-primary text-white font-light py-3 px-5 rounded-lg">Edit Profil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
      `;
  },

  async afterRender() {
    // Write after render here.
  },
};

export default About;
