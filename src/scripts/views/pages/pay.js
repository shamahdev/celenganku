const Pay = {
  async render() {
    return `
        <div class="hidden md:block text-center">
          <p class="text-xl leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
            Buat Transaksi
          </p>
        </div>
        <div class="flex flex-col">
          <div class="bg-gray-200 p-4 rounded-lg flex flex-col mt-4 md:p-8 md:mt-6">
            <p class="my-4 text-2xl">Jenis Transaksi</p>
            <div class="flex-1 py-0 white rounded-lg">
              <div class="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div class="flex-1 p-5 bg-red-500 rounded-lg w-full">
                  <div class="flex items-center">
                    <div class="text-white flex flex-col flex-1 text-center items-center">
                      <p class="text-2xl font-bold">tarik saldo</p>
                      <svg class="w-32 h-32 p-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="flex-1 p-5 bg-green-500 rounded-lg w-full">
                  <div class="flex items-center">
                    <div class="text-white flex flex-col flex-1 text-center items-center">
                      <p class="text-2xl font-bold">isi saldo</p>
                      <svg class="w-32 h-32 p-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="my-5 text-xl">Nominal</p>
            <input placeholder="Masukkan Nominal" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white text-black border-gray-300 placeholder-gray-500 focus:placeholder-gray-400">
            <button class="w-max bg-primary text-white font-light py-3 px-5 rounded-lg">Lanjut ke pembayaran</button>
          </div>
        </div>
      `
  },

  async afterRender() {
    // Write after render here.
  },
}

export default Pay
