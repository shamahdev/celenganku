/* eslint-disable max-len */
import Swal from 'sweetalert2'
import APIData from '../../../data/api-data'
import ModalInitializer from '../../../utils/modal-initializer'
import formValidation from '../../../helper/form-validation'
import EventHelper from '../../../helper/event-helper'
import DateFormater from '../../../helper/date-formater'

const Transaction = {
  async render() {
    return /* html */`
      <div class="p-4 pt-0 md:p-8 md:pt=8 lg:p-12 lg:pt-12 h-full">
        <div class="flex flex-col h-full mb-20 md:mb-0 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
          <div class="text-center">
            <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
              Transaksi
            </p>
          </div>
          <div class="flex flex-col w-full md:w-8/12 lg:w-6/12 mx-auto">
            <div class="bg-gray-200 p-5 rounded-lg flex flex-col mt-4 md:p-8 md:mt-6">
              <div class="flex flex-row mx-auto mb-4">
                <button id="pemasukan-option" disabled
                  class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Isi
                  Saldo</button>
                <button id="penarikan-option"
                  class="w-max bg-primary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Tarik
                  Saldo</button>
              </div>
              <div class="flex-1 py-0 white rounded-lg">
                <div class="mb-6">
                  <p class="mb-2">Nominal</p>
                  <input id="input-nominal" name="Nominal" data-rule="required value-more-than-999 multiple-of-1000"
                    value="" type="number" class="block px-5 py-3 rounded-lg w-full bg-white">
                </div>
                <div class="flex flex-col gap-6 items-center">
                  <button id="luring-option"
                    class="flex-1 p-5 pb-8 border-2 border-primary bg-white shadow-lg rounded-lg w-full focus:outline-none ">
                    <div class="flex md:justify-center">
                      <div class="text-white flex flex-1 flex-row">
                        <div data-option class="mx-2 my-auto text-sm bg-primary text-white p-1 rounded-lg">
                          <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7">
                              </path>
                            </svg></p>
                        </div>
                        <div class="flex flex-col flex-1 text-left ml-4">
                          <p class="md:-mb-2 text-gray-700">Pembayaran secara luring</p>
                          <p id="monthly-withdraw" class="text-gray-800 text-2xl lg:text-4xl font-bold">Melalui Admin/TU
                          </p>
                          <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT
                            BIAYA ADMIN</p>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button id="daring-option"
                    class="flex-1 p-5 pb-8 bg-white shadow-lg rounded-lg w-full focus:outline-none ">
                    <div class="flex md:justify-center">
                      <div class="text-white flex flex-1 flex-row">
                        <div data-option class="mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg">
                          <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7">
                              </path>
                            </svg></p>
                        </div>
                        <div class="flex flex-col flex-1 text-left ml-4">
                          <p class="md:-mb-1 text-gray-700">Pembayaran secara daring</p>
                          <p id="monthly-withdraw" class="text-gray-800 text-xl md:text-2xl font-bold lg:mr-8">Melalui
                            e-Wallets, Bank, Indomaret, dll</p>
                          <p id="weekly-withdraw" class="font-bold text-sm text-gray-400 mt-3" href="">TIDAK DIPUNGUT
                            BIAYA TAMBAHAN</p>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <button disabled id="next-button"
              class="disabled:cursor-default w-max bg-primary text-white py-3 px-8 rounded-lg disabled:opacity-50 mx-auto mt-4">Lanjut</button>
          </div>
        </div>
      </div>
      </div>
      `
  },

  async afterRender() {
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    const userAccount = await APIData.getAkunSiswa(this._userId)
    this._userAccount = userAccount
    this._ballance = userAccount.saldo
    this._transactionOption = 'pemasukan'
    this._paymentOption = 'luring'

    const paymentOptionButton = document.querySelectorAll('#daring-option, #luring-option')
    const transactionOptionButton = document.querySelectorAll('#penarikan-option, #pemasukan-option')
    const nominalInput = document.getElementById('input-nominal')
    const nextButton = document.getElementById('next-button')

    formValidation.init({
      formInputs: nominalInput,
      submitButton: nextButton,
    })

    transactionOptionButton.forEach((option) => {
      option.addEventListener('click', () => {
        this._selectTransactionOption(transactionOptionButton, option.id)
        if (this._transactionOption === 'penarikan') {
          nominalInput.dataset.rule += ` cannot-more-than-${this._ballance}`
          this._selectPaymentOption(paymentOptionButton, paymentOptionButton[0].id)
          paymentOptionButton[1].style.display = 'none'
        } else {
          nominalInput.dataset.rule = 'required value-more-than-999 multiple-of-1000'
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

    nextButton.addEventListener('click', async () => {
      try {
        const transactionData = {
          nisn: this._userId,
          nominal: nominalInput.value,
          jenis_transaksi: this._transactionOption,
          metode_pembayaran: this._paymentOption,
        }

        const response = await APIData.createTransaction(transactionData)
        console.log(response)

        if (this._paymentOption === 'luring') this._adminPaymentInit(response)
        else this._midtransPaymentInit(response)
      } catch (error) {
        console.log(error)
      }
    })
  },

  async _midtransPaymentInit(transactionData) {
    // eslint-disable-next-line no-undef
    snap.show()
    const dataResponse = transactionData.response
    const userData = await APIData.getDataSiswa(this._userId)

    const data = {
      transaction_details: {
        order_id: dataResponse.id_transaksi,
        gross_amount: dataResponse.nominal,
      },
      item_details: [{
        id: dataResponse.id_transaksi,
        price: dataResponse.nominal,
        quantity: 1,
        name: `${dataResponse.jenis_transaksi.charAt(0).toUpperCase() + dataResponse.jenis_transaksi.slice(1)} Saldo`,
        brand: 'Celenganku',
      }],
      customer_details: {
        first_name: userData.nama,
        email: this._userAccount.email,
      },
      callbacks: {
        finish: '/',
      },
    }
    try {
      const response = await APIData.getMidtransToken(data)

      await APIData.updateTransaction(dataResponse.id_transaksi, {
        token: response.token,
      })
      // eslint-disable-next-line no-undef
      snap.pay(response.token, {
        onSuccess: async () => {
          await APIData.updateTransaction(dataResponse.id_transaksi, {
            status_transaksi: 'selesai',
          })
          await APIData.updateSaldo(dataResponse.nisn, dataResponse.nominal, dataResponse.jenis_transaksi)
          window.location.hash = '#'
        },
        onPending() {
        /* You may add your own implementation here */
          window.location.hash = '#'
        },
        onError(result) {
          // eslint-disable-next-line no-undef
          console.log(result)
          // eslint-disable-next-line no-undef
          snap.hide()
        },
        onClose() {
          window.location.hash = '#'
        },
      })
    } catch (error) {
      // eslint-disable-next-line no-undef
      snap.hide()
      await APIData.deleteTransaksiSiswa(dataResponse.id_transaksi)
      await Swal.fire({
        icon: 'error',
        text: 'Silahkan tunggu sejenak dan coba kembali',
        title: 'Terjadi kesalahan pada Midtrans Payment',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-primary',
        },
        buttonsStyling: false,
      })
    }
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

  _adminPaymentInit(transaction) {
    window.location.hash = '#'
    ModalInitializer.init({
      title: 'Kode Transaksi',
      content:
      `<div class="px-10 py-6">
        <div class="preloader p-4 flex justify-center m-auto">
          <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
        <div class="hidden" id="modal-content">
          <p class="mt-2 mb-1">Kode Transaksi kamu adalah</p>
          <div class="flex flex-row">
            <p id="id-transaksi" class="my-2 text-3xl select-all font-bold">${transaction.response.id_transaksi}</p>
            <button role="button" id="copy-button" class="w-max text-primary ml-2 font-light p-2">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
            </button>
          </div>
          <p class="mt-4 text-gray-500">Transaksi ini akan automatis dibatalkan dalam</p>
          <p id="time-count" class="mt-1 text-primary"></p>
        </div>
        <div class="flex justify-end items-center w-100 mt-4">
          <button role="button" id="show-qr-button" class="w-max text-primary mx-1 font-light p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></button>
          <button role="button" id="close-button" class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tutup</button>
        </div>
      </div>`,
    })
    const preloader = document.querySelector('.preloader')
    const modal = document.getElementById('modal-kode-transaksi')
    const modalContent = document.getElementById('modal-content')
    const thisContent = modalContent.innerHTML
    const qrContent = `<img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${transaction.response.id_transaksi}"></img>`
    const showQRButton = document.getElementById('show-qr-button')
    const closeButton = document.getElementById('close-button')
    const copyButton = document.getElementById('copy-button')
    const copyText = document.getElementById('id-transaksi')
    copyButton.addEventListener('click', () => {
      EventHelper.copyTextToClipboard(transaction.response.id_transaksi)
      copyText.focus()
    })

    const timeStamp = new Date(transaction.response.tenggat_waktu_pembayaran.seconds * 1000)
    const timeCountInterval = setInterval(() => {
      try {
        const timeCounter = document.getElementById('time-count')
        const {
          hours, minutes, seconds,
        } = DateFormater.getTimeCounter(timeStamp)
        const counterText = `${hours} jam ${minutes} menit ${seconds} detik`
        timeCounter.innerHTML = counterText
      } catch (error) {
        // console.log(error)
      }
    }, 1000)

    this._toggleQR = false
    showQRButton.addEventListener('click', (event) => {
      event.stopPropagation()
      this._toggleQR = !this._toggleQR
      if (this._toggleQR) modalContent.innerHTML = qrContent
      else modalContent.innerHTML = thisContent
    })
    closeButton.addEventListener('click', () => {
      modal.remove()
      clearInterval(timeCountInterval)
    })

    setTimeout(() => {
      preloader.remove()
      modalContent.classList.remove('hidden')
    }, 500)
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
  },
}

export default Transaction
