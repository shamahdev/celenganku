import ModalInitializer from '../../../utils/modal-initializer'

const Transaction = {
  async render() {
    return /* html */`
        <div class="text-center">
          <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
            Transaksi
          </p>
        </div>
        <div class="flex flex-col w-full md:w-8/12 lg:w-6/12 mx-auto">
          <div class="bg-gray-200 p-5 rounded-lg flex flex-col mt-4 md:p-8 md:mt-6">
            <div class="flex flex-row mx-auto mb-4">
              <button id="withdraw-option" class="w-max bg-white text-gray-500 py-3 px-10 rounded-lg disabled:opacity-50 rounded-r-none">Tarik Saldo</button>
              <button id="deposit-option" class="w-max bg-primary text-white py-3 px-10 rounded-lg disabled:opacity-50 rounded-l-none">Isi Saldo</button>
            </div>
            <div class="flex-1 py-0 white rounded-lg">
            <p class="mb-2">Nominal</p>
            <input id="input-nominal" name="Nominal" value="" type="number" class="mb-6 block px-5 py-3 rounded-lg w-full bg-white">
              <div class="flex flex-col gap-6 items-center">
                <button id="online-option" class="flex-1 p-5 pb-8 bg-white shadow-lg rounded-lg w-full focus:outline-none ">
                  <div class="flex md:justify-center">
                    <div class="text-white flex flex-1 flex-row">
                      <div data-option class="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg">
                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                      </div>
                      <div class="flex flex-col flex-1 text-left ml-4">
                        <p class="md:-mb-2 text-gray-700">Pembayaran secara luring</p>
                        <p id="monthly-withdraw" class="text-gray-800 text-2xl lg:text-4xl font-bold">Melalui Admin/TU</p>
                        <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT BIAYA ADMIN</p>
                      </div>
                    </div>
                  </div>
                </button>
                <button id="offline-option" class="flex-1 p-5 pb-8 bg-white shadow-lg rounded-lg w-full focus:outline-none ">
                  <div class="flex md:justify-center">
                    <div class="text-white flex flex-1 flex-row">
                      <div data-option class="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg">
                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                      </div>
                      <div class="flex flex-col flex-1 text-left ml-4">
                        <p class="md:-mb-1 text-gray-700">Pembayaran secara daring</p>
                        <p id="monthly-withdraw" class="text-gray-800 text-xl md:text-2xl font-bold lg:mr-8">Melalui e-Wallets, Bank, Indomaret, dll</p>
                        <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT BIAYA TAMBAHAN</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            </div>
            <button disabled id="edit-button" class="w-max bg-primary text-white py-3 px-8 rounded-lg disabled:opacity-50 mx-auto mt-4">Lanjut</button>
            </div>
        </div>
      `
  },

  async afterRender() {
    const optionButton = document.querySelectorAll('#online-option, #offline-option')
    optionButton.forEach((option) => {
      option.addEventListener('click', () => {
        this._selectTransactionOption(optionButton, option.id)
      })
    })
    // payButton.addEventListener('click', () => {
    //   this._initPayMethodForm()
    // })
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
    const selectedClass = 'mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg'
    const nonSelectedClass= 'mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg'
    optionButton.forEach((option) => {
      const optionIcon = option.querySelector('div[data-option]')
      if (option.id === optionId) {
        option.classList.add('border-2', 'border-primary')
        optionIcon.className = selectedClass
      } else {
        option.classList.remove('border-2', 'border-primary')
        optionIcon.className = nonSelectedClass
      }
    })
  },
}

export default Transaction
