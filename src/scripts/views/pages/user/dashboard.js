const Dashboard = {
  async render() {
    return /* html */ `
        <div class="hidden md:block text-center">
          <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
            Celengan Shaddam Amru
          </p>
        </div>

        <div class="flex flex-col">
          <div
            class="bg-gray-200 gap-4 p-4 rounded-lg flex flex-wrap flex-col mt-4 md:p-8 md:gap-8 md:mt-6 md:flex-row">
            <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-primary rounded-lg shadow-primary">
              <div class="flex items-center">
                <div class="text-white flex flex-col flex-1">
                  <p class="-mb-2">Saldo</p>
                  <p class="text-4xl md:text-2xl lg:text-4xl font-bold">Rp 720.000</p>
                  <div class="flex flex-row gap-2 mt-4">
                    <a href="#/transaction" class="w-10 h-10 p-1 bg-primaryLight text-primary font-light rounded-lg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </a>
                    <a href="#/report" class="w-10 h-10 p-1 bg-primaryLight text-primary font-light rounded-lg">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-white rounded-lg shadow-lg">
              <div class="flex items-center">
                <div class="flex flex-col flex-1">
                  <p class="-mb-2 text-gray-700">Pemasukan Bulan ini</p>
                  <p class="text-gray-800 text-4xl md:text-2xl lg:text-4xl font-bold">Rp 800.000</p>
                  <p class="font-bold text-sm text-gray-400 mt-3" href="">RP 100.000 MINGGU INI</p>
                </div>
              </div>
            </div>
            <div class="flex-grow-1 flex-auto lg:flex-1 p-5 bg-white rounded-lg shadow-lg">
              <div class="flex items-center">
                <div class="flex flex-col flex-1">
                  <p class="-mb-2 text-gray-700">Pengeluaran Bulan ini</p>
                  <p class="text-gray-800 text-4xl md:text-2xl lg:text-4xl font-bold">Rp 80.000</p>
                  <p class="font-bold text-sm text-gray-400 mt-3" href="">RP 100.000 MINGGU INI</p>
                </div>
              </div>
            </div>
          </div>
          <p class="mt-6 text-xl text-center md:text-left">Riwayat Transaksi</p>
          <div class="bg-gray-200 gap-4 p-4 rounded-lg flex flex-col mt-6 md:p-8">
            <div class="flex-1 py-0 white rounded-lg">
              <table class="w-full mb-4">
                <tbody>
                  <tr class="text-left text-gray-700">
                    <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">ID Transaksi</th>
                    <th class="font-normal pb-5 pt-0">Nominal</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Metode</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>
                    <th class="font-normal pb-5 pt-0">Status</th>
                    <th class="font-normal pb-5 pt-0 justify-end"></th>
                  </tr>
                  <tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
                    <td class="p-5 pr-0 text-gray-500 bg-white rounded-l-lg">17 JANUARI 2021</td>
                    <td class="bg-white hidden lg:table-cell">TWL2277972</td>
                    <td class="bg-white text-failed">RP 80.000</td>
                    <td class="bg-white hidden lg:table-cell">ADMIN</td>
                    <td class="bg-white hidden lg:table-cell">PENARIKAN</td>
                    <td class="bg-white">
                      <p class="text-sm bg-primaryDisable text-primary py-2 px-3 rounded-lg w-max">PEMBAYARAN</p>
                    </td>
                    <td class="bg-white rounded-r-lg justify-end flex p-3">
                      <button class="p-2 w-12 h-12 text-gray-700" id="settings">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                          </path>
                        </svg>
                      </button>
                      <div id="settings-dropdown"
                        class="hidden absolute mt-10 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <a href="#/profile"
                            class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem">
                            <i class="text-primary flex"><svg class="w-8 h-8" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg></i>
                            <p class="flex ml-2 mt-1 leading-relaxed">Transaksi Lagi</p>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="h-4"></tr>
                  <tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
                    <td class="p-5 pr-0 text-gray-500 bg-white rounded-l-lg">17 JANUARI 2021</td>
                    <td class="bg-white hidden lg:table-cell">TDD2884125</td>
                    <td class="bg-white text-success">RP 80.0000</td>
                    <td class="bg-white hidden lg:table-cell">GOPAY</td>
                    <td class="bg-white hidden lg:table-cell">PENARIKAN</td>
                    <td class="bg-white">
                      <p class="text-sm bg-primary text-white py-2 px-3 rounded-lg w-max">SELESAI</p>
                    </td>
                    <td class="bg-white rounded-r-lg justify-end flex p-3">
                      <button class="p-2 w-12 h-12 text-gray-700" id="settings">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                          </path>
                        </svg>
                      </button>
                      <div id="settings-dropdown"
                        class="hidden absolute mt-10 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <a href="#/profile"
                            class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem">
                            <i class="text-primary flex"><svg class="w-8 h-8" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg></i>
                            <p class="flex ml-2 mt-1 leading-relaxed">Transaksi Lagi</p>
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Dashboard
