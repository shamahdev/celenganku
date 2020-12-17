const Dashboard = {
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
          <a href="#/dashboard" class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Masuk</p>
                <img class="object-contain" src="./images/login-cover.png" alt="Login Button Illustration" srcset="">
                <p class="text-sm">Sudah punya akun? Login ke akunmu dan cek celengan kamu sekarang</p>
              </div>
            </div>
          </a>
          <div class="flex-1 cursor-pointer p-5 w-24-rem bg-gray-200 rounded-lg hover:bg-primary hover:shadow-primary hover:text-white transition duration-100 ease-in-out">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Daftar</p>
                <img class="object-contain" src="./images/register-cover.png" alt="Register Button Illustration" srcset="">
                <p class="text-sm">Belum punya akun? Daftar sekarang dan mulai menabung di celenganku</p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center my-8">

          <a class="block text-primary underline" href="#/admin">login sebagai admin</a>
          <p class="inline-block">Butuh bantuan? </p><a class="text-primary underline" href="#/admin"> lihat panduan berikut</a>
        </div>
        </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Dashboard
