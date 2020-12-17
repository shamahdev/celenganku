const Dashboard = {
  async render() {
    return `
        <div class="flex flex-col flex-wrap content-center justify-center">
          <p class="h-24 w-24 p-4 text-center mx-auto">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g stroke="null">
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_2" cy="12" cx="5.51189" stroke-width="0" fill="#FF974B"/>
                <ellipse stroke="#000" ry="4.54353" rx="4.54353" id="svg_3" cy="12" cx="18.48811" stroke-width="0" fill="#FF974B"/>
              </g>
            </svg>
          </p>
          <p class="text-xl text-center leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
          Mulai Menabung
        </p>
        <div class="flex md:flex-row gap-5">
          <div class="flex-1 p-5  bg-gray-300 rounded-lg">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Masuk</p>
                <img class="object-contain" src="./images/login-cover.png" alt="" srcset="">
                <p>Sudah punya akun? Login ke akunmu dan cek celengan kamu sekarang</p>
              </div>
            </div>
          </div>
          <div class="flex-1 p-5  bg-gray-300 rounded-lg">
            <div class="flex items-center text-center">
              <div class="flex flex-col flex-1">
                <p class="text-xl">Daftar</p>
                <img class="object-contain" src="./images/register-cover.png" alt="" srcset="">
                <p>Belum punya akun? Daftar sekarang dan mulai menabung di celenganku</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Dashboard
