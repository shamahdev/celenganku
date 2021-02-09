const Report = {
  async render() {
    return /* html */`
    <div class="hidden md:block text-center">
    <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
      Riwayat Transaksi
    </p>
    <div class="flex flex-row mt-4 md:mt-6 ">
      <div class="flex flex-row">
      <button id="user-login-button" class="w-max bg-primary text-white mx-1 font-light py-3 px-5 rounded-lg disabled:opacity-50">Cetak Laporan</button>
      <p class="mt-3 ml-4">Total Transaksi: Rp 880.000</p>
      </div>
      <div class="flex flex-row ml-auto">
      <input placeholder="Cari tanggal, nominal, dll" value="" type="text" class="text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
      <svg class="w-8 h-8 mt-auto mb-auto ml-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>
  </div>
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
    // //
  },

}

export default Report
