/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
import QrScanner from 'qr-scanner'
import sortBy from 'lodash/sortBy'
import Swal from 'sweetalert2'
import QrScannerWorkerPath from '!!file-loader!../../../../../node_modules/qr-scanner/qr-scanner-worker.min'
import APIData from '../../../data/api-data'
import StringFormater from '../../../helper/string-formater'
import ModalInitializer from '../../../utils/modal-initializer'
import EventHelper from '../../../helper/event-helper'
import formValidation from '../../../helper/form-validation'
import DateFormater from '../../../helper/date-formater'

QrScanner.WORKER_PATH = QrScannerWorkerPath

const AdminDashboard = {
  async render() {
    return /* html */`
    <div class="p-4 pt-0 md:p-8 md:pt=8 lg:p-12 lg:pt-12 h-full">
    <div class="flex flex-col h-full mb-20 md:mb-0 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
      <div class="text-center">
        <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
          Celenganku<i class="text-secondary not-italic">admin</i>
        </p>
      </div>

      <div class="flex flex-col">
        <div class="bg-gray-200 gap-4 p-5 rounded-lg flex flex-wrap flex-col mt-4 md:p-8 md:gap-8 md:mt-6 md:flex-row">
          <div class="flex p-5 md:w-1/3 bg-secondary rounded-lg shadow-lg">
            <div class="flex flex-1 items-center">
            <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
              <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
            </div>
              <div id="process-report-card" class="hidden flex flex-col flex-1">
                <p class="-mb-2 text-white">Proses Transaksi Bulan ini</p>
                <p id="monthly-process" class="text-white text-4xl md:text-2xl lg:text-4xl font-bold">124</p>
                <p class="-mb-1 mt-3 text-white">Proses Transaksi Minggu ini</p>
                <p id="weekly-process" class="text-white text-xl md:text-lg lg:text-xl font-bold">5</p>
              </div>
            </div>
          </div>
          <div class="flex flex-1 p-5 bg-white rounded-lg shadow-lg">
            <div class="flex flex-1 items-center">

              <div id="process-card" class="flex flex-col flex-1 w-fill">
                <p class="mb-4 text-lg text-gray-600">Proses Transaksi</p>
                <p class="mb-2 text-gray-800 font-semibold">Kode Transaksi</p>
                <div class="flex flex-col md:flex-row mb-4">
                <div class="flex flex-1 flex-col">
                <input id="transaction-code" name="Kode Transaksi" data-rule="required no-space number-must-10" value=""
                  class="flex flex-1 px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
                </div>
                  <div class="flex mt-4 md:mt-0">
                      <button role="button" disabled id="process-transaction"
                      class="w-max bg-secondary text-white mx-1 md:ml-4 py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-default">Proses</button>
                      <button role="button" id="scan-qr-button" class="w-max text-secondary mx-1 font-light p-2">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></button>
                  </div>
                </div>
                  </div>
            </div>
          </div>
        </div>
        <p class="mt-6 text-xl text-center md:text-left">Riwayat Proses Transaksi</p>
        <div class="bg-gray-200 p-5 rounded-lg flex flex-col mt-6 md:p-8">
          <div class="flex-1 py-0 white rounded-lg">
            <table id="transaction-table" class="table-auto w-full">
              <tbody>
                <tr class="text-left text-gray-700">
                  <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">NISN Siswa</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Nominal</th>
                  <th class="font-normal pb-5 pt-0">Kode Transaksi</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>
                  <th class="font-normal pb-5 pt-0">Status</th>
                  <th class="font-normal pb-5 pt-0 justify-end"></th>
                </tr>
              </tbody>
            </table>
            <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
              <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `
  },

  async afterRender() {
    // Remove Preloders
    const preloaders = document.querySelectorAll('.preloader')

    const processReportCard = document.getElementById('process-report-card')
    const monthlyProcessText = document.getElementById('monthly-process')
    const weeklyProcessText = document.getElementById('weekly-process')
    this._monthly = 0
    this._weekly = 0

    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._adminId = responseData.id

    await this._renderTable()

    const transactionCodeInput = document.getElementById('transaction-code')
    const processTransactionButton = document.getElementById('process-transaction')
    formValidation.init({
      formInputs: transactionCodeInput,
      submitButton: processTransactionButton,
    })

    const qrScannerButton = document.getElementById('scan-qr-button')
    qrScannerButton.addEventListener('click', () => {
      ModalInitializer.init({
        title: 'Scan QR',
        content:
        `<div class="px-10 py-6">
          <div id="modal-content">
            <div id="video-container" class="flex flex-row relative">
              <video class="w-full" id="scanner-preview"></video>
            </div>
          </div>
          <div class="flex justify-end items-center w-100 mt-4">
            <button role="button" data-modal="Scan QR" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tutup</button>
          </div>
        </div>`,
        bg: 'bg-secondary',
      })
      try {
        const video = document.getElementById('scanner-preview')
        const modal = document.getElementById('modal-scan-qr')
        const videoContainer = document.getElementById('video-container')
        const qrScanner = new QrScanner(video, async (result) => {
          console.log('decoded qr code:', result)
          await this._processTransaction(result)
          qrScanner.stop()
          modal.remove()
        })
        videoContainer.appendChild(qrScanner.$canvas)
        video.style.paddingTop = '50%'
        qrScanner.$canvas.className = 'absolute w-full h-full'
        qrScanner.start()
        window.scanner = qrScanner
      } catch (error) {
        console.log(`error: ${error}`)
      }
    })

    processTransactionButton.addEventListener('click', async () => {
      await this._processTransaction(transactionCodeInput.value)
    })

    monthlyProcessText.innerHTML = this._monthly
    weeklyProcessText.innerHTML = this._weekly
    processReportCard.classList.remove('hidden')
    preloaders.forEach((preloader) => {
      preloader.remove()
    })
  },

  async _processTransaction(transactionCodeInput) {
    const response = await APIData.getTransaction(transactionCodeInput)
    console.log(response)
    if (response.error) {
      Swal.fire({
        icon: 'error',
        text: 'Kode Transaksi tidak valid',
        title: 'Proses Transaksi Gagal',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    } else if (response.status_transaksi === 'selesai') {
      Swal.fire({
        icon: 'error',
        text: 'Transaksi ini sudah selesai diproses',
        title: 'Proses Transaksi Gagal',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    } else if (response.metode_pembayaran === 'daring') {
      Swal.fire({
        icon: 'error',
        text: 'Transaksi ini dibuat dengan metode pembayaran daring',
        title: 'Proses Transaksi Gagal',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    } else {
      ModalInitializer.init({
        title: 'Transaksi',
        content:
        `<div class="px-10 py-6">
          <div id="modal-content">
            <p class="mt-2 mb-1">Kode Transaksi</p>
            <div class="flex flex-row">
              <p id="id-transaksi" class="my-2 text-3xl select-all font-bold">${response.id_transaksi}</p>
              <button role="button" id="copy-button" class="w-max text-secondary ml-2 font-light p-2">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
              </button>
            </div>
            <p class="mb-2 text-gray-800">NISN</p>
            <input name="NISN" disabled value="${response.nisn}"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
              <p class="mb-2 text-gray-800">Nominal</p>
            <input name="NISN" disabled value="RP ${StringFormater.convertToCashFormat(response.nominal)}"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
            <div class="flex flex-col md:flex-row md:gap-4">
              <div class="flex flex-1 flex-col">
              <p class="mb-2 text-gray-800">Jenis Transaksi</p>
              <input name="NISN" disabled value="${response.jenis_transaksi.toUpperCase()}"
                class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
              </div>
              <div class="flex flex-1 flex-col">
              <p class="mb-2 text-gray-800">Metode Pembayaran</p>
                <input name="NISN" disabled value="${response.metode_pembayaran.toUpperCase()}"
                  class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center w-100 mt-4">
            <button role="button" id="process-button" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Proses Transaksi</button>
          </div>
        </div>`,
        bg: 'bg-secondary',
      })
      const modal = document.getElementById('modal-transaksi')
      const processButton = document.getElementById('process-button')
      const copyButton = document.getElementById('copy-button')
      const copyText = document.getElementById('id-transaksi')
      copyButton.addEventListener('click', () => {
        EventHelper.copyTextToClipboard(response.id_transaksi)
        copyText.focus()
      })
      processButton.addEventListener('click', async (event) => {
        event.preventDefault()
        const result = await Swal.fire({
          icon: 'warning',
          text: 'Tekan pilihan untuk mengkonfirmasi',
          title: 'Konfirmasi Pembayaran?',
          showCancelButton: true,
          confirmButtonText: 'Konfirmasi',
          cancelButtonText: 'Jangan',
          showLoaderOnConfirm: true,
          preConfirm: async () => {
            try {
              await APIData.updateTransaction(response.id_transaksi, {
                id_admin: this._adminId,
                status_transaksi: 'selesai',
              })
            } catch (error) {
              Swal.showValidationMessage(
                `Request failed: ${error}`,
              )
            }
          },
          customClass: {
            popup: 'popup-sweetalert',
            confirmButton: 'btn-sweetalert bg-success',
            cancelButton: 'btn-sweetalert bg-failed',
          },
          buttonsStyling: false,
        })

        if (result.isConfirmed) {
          // eslint-disable-next-line max-len
          await APIData.updateSaldo(response.nisn, response.nominal, response.jenis_transaksi)
          modal.remove()
          this._renderTable()
        }
      })
    }
  },

  async _renderTable() {
    const tableElement = document.getElementById('transaction-table')
    const tableBody = tableElement.querySelector('tbody')
    const unsortedTransactionData = await APIData.getTransaksiAdmin(this._adminId)
    const transactionData = sortBy(unsortedTransactionData.data, ['tenggat_waktu_pembayaran.seconds']).reverse()

    const transactionTemplate = (transaction) => {
      Object.keys(transaction).forEach((key) => {
        if (typeof transaction[key] === 'object') {
          //
        } else if (key === 'nominal') {
          transaction[key] = StringFormater.convertToCashFormat(transaction[key])
        } else {
          transaction[key] = transaction[key].toString().toUpperCase()
        }
      })

      const timeStamp = new Date(transaction.tenggat_waktu_pembayaran.seconds * 1000)
      const jenisTransaksi = transaction.jenis_transaksi
      const timeLeft = new Date()
      timeLeft.setDate(timeStamp.getDate())
      timeStamp.setDate(timeStamp.getDate() - 1)
      const transactionDate = timeStamp.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      const transactionDateMini = timeStamp.toLocaleDateString('id-ID')

      if (timeStamp.getMonth() === new Date().getMonth()) {
        this._monthly++
        if (DateFormater.isDateInThisWeek(timeStamp)) {
          this._weekly++
        }
      }

      // Classes
      const nominalColor = (jenis) => {
        if (jenis.toLowerCase() === 'pemasukan') return 'text-success'
        return 'text-failed'
      }

      const _showTransactionModalInit = async (showButton) => {
        const dataSiswa = await APIData.getDataSiswa(transaction.nisn)
        showButton.addEventListener('click', () => {
          ModalInitializer.init({
            title: 'Transaksi',
            content:
            `<div class="px-10 py-6">
              <div id="modal-content">
                <p class="mt-2 mb-1">Kode Transaksi kamu adalah</p>
                <div class="flex flex-row">
                  <p id="id-transaksi" class="my-2 text-3xl select-all font-bold">${transaction.id_transaksi}</p>
                  <button role="button" id="copy-button" class="w-max text-secondary ml-2 font-light p-2">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                  </button>
                </div>
                <p class="mb-2 text-gray-800">Nama Siswa</p>
                <input name="NISN" disabled value="${dataSiswa.nama} (${transaction.nisn})"
                  class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
                  <p class="mb-2 text-gray-800">Nominal</p>
                <input name="Nominal" disabled value="RP ${transaction.nominal}"
                  class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
                <div class="flex flex-col md:flex-row md:gap-4">
                  <div class="flex flex-1 flex-col">
                  <p class="mb-2 text-gray-800">Jenis Transaksi</p>
                  <input name="Jenis Transaksi" disabled value="${transaction.jenis_transaksi}"
                    class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
                  </div>
                  <div class="flex flex-1 flex-col">
                  <p class="mb-2 text-gray-800">Metode Pembayaran</p>
                    <input name="Metode Pembayaran" disabled value="${transaction.metode_pembayaran}"
                      class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-500">
                  </div>
                </div>
              </div>
              <div class="flex justify-end items-center w-100 mt-4">
                <button role="button" data-modal="Transaksi" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tutup</button>
              </div>
            </div>`,
            bg: 'bg-secondary',
          })
          const modalContent = document.getElementById('modal-content')
          const thisContent = modalContent.innerHTML
          const qrContent = `<img class="mx-auto" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${transaction.id_transaksi}"></img>`
          const showQRButton = document.getElementById('show-qr-button')
          const copyButton = document.getElementById('copy-button')
          const copyText = document.getElementById('id-transaksi')
          this._isQRContent = false
          copyButton.addEventListener('click', () => {
            EventHelper.copyTextToClipboard(transaction.id_transaksi)
            copyText.focus()
          })
          showQRButton.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(this._isQRContent)
            if (!this._isQRContent) modalContent.innerHTML = qrContent
            else modalContent.innerHTML = thisContent
            this._isQRContent = !this._isQRContent
          })
        })
        return true
      }

      let initialized = false
      setInterval(async () => {
        try {
          while (!initialized) {
            const showButton = document.getElementById(`show-transaction-button-${transaction.id_transaksi}`)
            // eslint-disable-next-line no-await-in-loop
            initialized = await _showTransactionModalInit(showButton)
          }
        } catch (error) {
          // console.log('')
        }
      }, 1000)

      return /* html */`<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
      <td class="hidden md:table-cell p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDate.toUpperCase()}</td>
      <td class="table-cell md:hidden p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDateMini.toUpperCase()}</td>
      <td class="bg-white hidden lg:table-cell">${transaction.nisn}</td>
      <td class="bg-white hidden lg:table-cell ${nominalColor(jenisTransaksi)}">RP ${transaction.nominal}</td>
      <td class="bg-white select-all">${transaction.id_transaksi}</td>
      <td class="bg-white hidden lg:table-cell">${jenisTransaksi}</td>
      <td class="bg-white">
        <div class="ml-2 md:ml-0 text-sm bg-secondary text-white p-1 md:py-2 md:px-6 rounded-lg w-max">
        <p class="hidden md:inline">${transaction.status_transaksi}</p>
        <p class="inline md:hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
        </div>
      </td>
      <td class="bg-white rounded-r-lg justify-end flex p-3 pl-0">
        <button class="w-8 md:p-2 md:w-12 h-12 text-gray-700" id="settings">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
            </path>
          </svg>
        </button>
        <div id="settings-dropdown"
          class="hidden absolute mt-10 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <p id="reminder-element-${transaction.id_transaksi}">
          <button id="show-transaction-button-${transaction.id_transaksi}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Lihat Transaksi</p>
          </button>
          <a href="#/list/${transaction.nisn}" class="flex w-full flex-1 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          <button id="show-profile-button-${transaction.id_transaksi}"
            class="flex w-full px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Lihat Profil Siswa</p>
          </button>
          </a>
          </p>
          </div>
        </div>
      </td>
    </tr>
    <tr class="h-4"></tr>`
    }

    tableBody.innerHTML = `
    <tr class="text-left text-gray-700">
    <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">NISN Siswa</th>
    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Nominal</th>
    <th class="font-normal pb-5 pt-0">Kode Transaksi</th>
    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>
    <th class="font-normal pb-5 pt-0">Status</th>
    <th class="font-normal pb-5 pt-0 justify-end"></th>
  </tr>`
    transactionData.forEach((transaction) => {
      tableBody.innerHTML += transactionTemplate(transaction)
    })
  },
}

export default AdminDashboard
