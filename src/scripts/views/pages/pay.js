import ModalInitializer from '../../utils/modal-initializer'

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
              <button id='pay-button' class="w-max bg-primary text-white font-light py-3 px-5 rounded-lg">Lanjut ke pembayaran</button>
            </div>
            </div>
        </div>
      `
  },

  async afterRender() {
    const optionButton = document.querySelectorAll('#deposit-balance, #withdraw-balance')
    const payButton = document.getElementById('pay-button')
    optionButton.forEach((option) => {
      option.addEventListener('click', () => {
        this._selectTransactionOption(optionButton, option.id)
      })
    })
    payButton.addEventListener('click', () => {
      this._initPayMethodForm()
    })
  },

  _initPayMethodForm() {
    ModalInitializer.init({
      title: 'Metode Pembayaran',
      content:
        `<div class="px-6 py-4">
          <p class="my-2">Nominal</p>
          <input disabled value="180000" type="number" class="mb-4 text-md block px-5 py-3 rounded-lg w-full bg-gray-200 border-gray-300">
          <p class="my-2">Pilih Metode Pembayaran</p>
          <div class='flex flex-col'>
            <button class="flex-1 my-2 bg-primary rounded-lg shadow-blue">
              <div class="flex items-center">
                <div class="text-white flex flex-col flex-1">
                  <p class="p-5 absolute">Admin</p>
                  <img class="w-10/12 ml-auto" src="./images/payment-method-admin.png" alt="Admin 3D Ilustration">
                </div>
              </div>
            </button>
            <button class="flex-1 my-2 bg-white rounded-lg shadow-lg">
              <div class="flex items-center">
                <div class="flex flex-col flex-1">
                  <p class="p-5 absolute">Gopay</p>
                  <img class="w-10/12 ml-auto" src="./images/payment-method-gopay.png" alt="Admin 3D Ilustration">
                </div>
              </div>
            </button>
            <button class="flex-1 my-2 bg-blue-500 rounded-lg shadow-blue">
              <div class="flex items-center">
                <div class="text-white flex flex-col flex-1">
                  <p class="p-5 absolute">Bank</p>
                  <img class="w-10/12 ml-auto" src="./images/payment-method-bank.png" alt="Admin 3D Ilustration">
                </div>
              </div>
            </button>
          </div>
        </div>`,
    })
  },

  _selectTransactionOption(optionButton, optionId) {
    window.scrollTo(0, document.body.scrollHeight)
    optionButton.forEach((option) => {
      if (option.id !== optionId) {
        option.classList.add('disabled-option')
      } else {
        option.classList.remove('disabled-option')
      }
    })
    const nominalForm = document.getElementById('nominal-form')
    nominalForm.classList.remove('hidden')
  },
}

export default Pay
