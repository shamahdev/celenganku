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
                <button id="withdraw-balance" class="flex-1 p-5 bg-red-500 shadow-red rounded-lg w-full transition duration-100 ease-in-out">
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
                </button>
                <button id="deposit-balance" class="flex-1 p-5 bg-green-500 shadow-green rounded-lg w-full transition duration-100 ease-in-out">
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
                </button>
              </div>
            </div>
            <div id="nominal-form" class="hidden transition duration-100 ease-in-out">
              <p class="my-5 text-xl">Nominal</p>
              <input placeholder="Masukkan Nominal" type="text" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-white text-black border-gray-300 placeholder-gray-500 focus:placeholder-gray-400">
              <button class="w-max bg-primary text-white font-light py-3 px-5 rounded-lg">Lanjut ke pembayaran</button>
            </div>
            </div>
        </div>
      `
  },

  async afterRender() {
    const optionButton = document.querySelectorAll("#deposit-balance, #withdraw-balance")
    optionButton.forEach(option => {
      option.addEventListener('click', () => {
        this._selectTransactionOption(optionButton, option.id)
      })
    })
  },

  _selectTransactionOption(optionButton, optionId) {
    window.scrollTo(0,document.body.scrollHeight);
    optionButton.forEach(option => {
      if (option.id !== optionId) {
        option.classList.add('disabled-option')
      } else {
        option.classList.remove('disabled-option')
      }
    })
    const nominalForm = document.getElementById('nominal-form')
    nominalForm.classList.remove('hidden')
  }
}

export default Pay
