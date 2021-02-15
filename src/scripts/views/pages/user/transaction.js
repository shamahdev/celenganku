import APIData from '../../../data/api-data'
import ModalInitializer from '../../../utils/modal-initializer'
import formValidation from '../../../helper/form-validation'
import EventHelper from '../../../helper/event-helper'

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
            <button id="deposit-option" disabled class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Isi Saldo</button>
              <button id="withdraw-option" class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Tarik Saldo</button>
            </div>
            <div class="flex-1 py-0 white rounded-lg">
            <div class="mb-6">
              <p class="mb-2">Nominal</p>
              <input id="input-nominal" name="Nominal" data-rule="required" value="" type="number" class="block px-5 py-3 rounded-lg w-full bg-white">
            </div>
              <div class="flex flex-col gap-6 items-center">
                <button id="luring-option" class="flex-1 p-5 pb-8 border-2 border-primary bg-white shadow-lg rounded-lg w-full focus:outline-none ">
                  <div class="flex md:justify-center">
                    <div class="text-white flex flex-1 flex-row">
                      <div data-option class="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg">
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
                <button id="daring-option" class="flex-1 p-5 pb-8 bg-white shadow-lg rounded-lg w-full focus:outline-none ">
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
            <button disabled id="next-button" class="w-max bg-primary text-white py-3 px-8 rounded-lg disabled:opacity-50 mx-auto mt-4">Lanjut</button>
            </div>
        </div>
      `
  },

  async afterRender() {
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    const accountData = await APIData.getAkunSiswa(this._userId)
    this._ballance = accountData.saldo
    this._transactionOption = 'withdraw'
    this._paymentOption = 'luring'

    const paymentOptionButton = document.querySelectorAll('#daring-option, #luring-option')
    const transactionOptionButton = document.querySelectorAll('#withdraw-option, #deposit-option')
    const nominalInput = document.getElementById('input-nominal')
    const nextButton = document.getElementById('next-button')

    formValidation.init({
      formInputs: nominalInput,
      submitButton: nextButton,
    })

    transactionOptionButton.forEach((option) => {
      option.addEventListener('click', () => {
        this._selectTransactionOption(transactionOptionButton, option.id)
        if (this._transactionOption === 'withdraw') {
          nominalInput.dataset.rule += ` value-more-than-${this._ballance}`
          this._selectPaymentOption(paymentOptionButton, paymentOptionButton[0].id)
          paymentOptionButton[1].style.display = 'none'
        } else {
          nominalInput.dataset.rule = 'required'
          paymentOptionButton[1].style.display = ''
        }
        EventHelper.triggerEvent(nominalInput, 'keyup')
      })
    })

    paymentOptionButton.forEach((option) => {
      option.addEventListener('click', () => {
        this._selectPaymentOption(paymentOptionButton, option.id)
      })
    })

    nextButton.addEventListener('click', () => {
      if (this._paymentOption === 'luring') this._initPayMethodForm()
      else this._midtransInit()
    })
  },

  async _midtransInit() {
    const data = {
      transaction_details: {
        order_id: `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`,
        gross_amount: 10000,
      },
      callbacks: {
        finish: '/',
      },
    }
    const response = await APIData.getMidtransToken(data)
    console.log(response)
    // eslint-disable-next-line no-undef
    snap.pay(response.token, {
      onSuccess: (result) => {
        /* You may add your own implementation here */
        alert('payment success!'); console.log(result)
      },
      onPending(result) {
        /* You may add your own implementation here */
        alert('wating your payment!'); console.log(result)
      },
      onError(result) {
        /* You may add your own implementation here */
        alert('payment failed!'); console.log(result)
      },
      onClose() {
        /* You may add your own implementation here */
        alert('you closed the popup without finishing the payment')
      },
    })
    window.location.search = ''
    window.location.hash = '#/transaction'
  },

  _selectTransactionOption(optionButton, optionId) {
    optionButton.forEach((option) => {
      if (option.id === optionId) {
        option.disabled = true
      } else {
        option.disabled = false
      }
    })
    this._transactionOption = optionId.replace('-option', '')
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

  _selectPaymentOption(optionButton, optionId) {
    window.scrollTo(0, document.body.scrollHeight)
    const selectedClass = 'mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg'
    const nonSelectedClass = 'mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg'
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
    this._paymentOption = optionId.replace('-option', '')
    console.log(this._paymentOption)
  },
}

export default Transaction
