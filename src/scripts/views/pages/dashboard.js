const Dashboard = {
  async render() {
    return `
        <div class="hidden md:block text-center">
        <p class="text-xl leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
          Celengan Turyadi Kevin 
        </p>
      </div>
      <div class="flex flex-col">
        <div class="bg-gray-200 gap-4 p-4 rounded-lg flex flex-wrap flex-col mt-4 md:p-8 md:gap-8 md:mt-6 md:flex-row">
          <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-blue-500 rounded-lg shadow-blue">
            <div class="flex items-center">
              <div class="text-white flex flex-col flex-1">
                <p class="font-light">Saldo</p>
                <p class="text-4xl md:text-2xl lg:text-4xl font-bold">Rp 720.000</p>
              </div>
            </div>
          </div>
          <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-green-500 rounded-lg shadow-green">
            <div class="flex items-center">
              <div class="text-white flex flex-col flex-1">
                <p class="font-light">Pemasukan Bulan ini</p>
                <p class="text-4xl md:text-2xl lg:text-4xl font-bold">Rp 800.000</p>
                <a class="font mt-3 text-right ml-auto underline" href="">Lihat Detail</a>
              </div>
            </div>
          </div>
          <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-red-500 rounded-lg shadow-red">
            <div class="flex items-center">
              <div class="text-white flex flex-col flex-1">
                <p class="font-light">Pengeluaran Bulan ini</p>
                <p class="text-4xl md:text-2xl lg:text-4xl font-bold">Rp 80.000</p>
                <a class="font mt-3 text-right ml-auto underline" href="">Lihat Detail</a>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-6 md:mt-8 lg:mt-10 text-xl text-center md:text-left md:text-2xl">Riwayat Transaksi</p>
        <div class="bg-gray-200 gap-4 p-4 rounded-lg flex flex-col mt-6 md:p-8">
          <div class="flex-1 py-0 white rounded-lg">
            <div class="flex items-center">
              <div class="font-bold text-lg text-gray-900 flex flex-row flex-1">
                <p class="flex-1 hidden md:block">Jenis</p>
                <p class="flex-1">Nominal</p>
                <p class="flex-1">Metode</p>
                <p class="flex-1 hidden md:block">Tanggal</p>
                <a class="ml-auto h-6 w-6 text-transparent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <button class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
            <div class="flex items-center">
              <div class="flex flex-row flex-1">
                <p class="flex-1 hidden md:block">Penarikan</p>
                <p class="flex-1 font-bold text-red-500">Rp 80.000</p>
                <p class="flex-1">gopay</p>
                <p class="flex-1 hidden md:block">17 September 2020</p>
                <a class="ml-auto h-6 w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </button>
          <button class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
            <div class="flex items-center">
              <div class="flex flex-row flex-1">
                <p class="flex-1 hidden md:block">Pemasukan</p>
                <p class="flex-1 font-bold text-green-500">Rp 800.000</p>
                <p class="flex-1">Admin</p>
                <p class="flex-1 hidden md:block">17 September 2020</p>
                <a class="ml-auto h-6 w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </button>
          <button class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
            <div class="flex items-center">
              <div class="flex flex-row flex-1">
                <p class="flex-1 hidden md:block">Penarikan</p>
                <p class="flex-1 font-bold text-red-500">Rp 65.000</p>
                <p class="flex-1">gopay</p>
                <p class="flex-1 hidden md:block">17 September 2020</p>
                <a class="ml-auto h-6 w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </button>
        </div>
      </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Dashboard
