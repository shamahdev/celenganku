import sortBy from 'lodash/sortBy'
import Swal from 'sweetalert2'
import APIData from '../../../data/api-data'
import DateFormater from '../../../helper/date-formater'
import StringFormater from '../../../helper/string-formater'

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
          <div class="flex p-5 w-1/3 bg-secondary rounded-lg shadow-lg">
            <div class="flex flex-1 items-center">
              <div id="process-report-card" class="flex flex-col flex-1">
                <p class="-mb-2 text-white">Proses Transaksi Bulan ini</p>
                <p id="monthly-process" class="text-white text-4xl md:text-2xl lg:text-4xl font-bold">124</p>
                <p class="-mb-1 mt-3 text-white">Proses Transaksi Hari ini</p>
                <p id="daily-process" class="text-white text-xl md:text-lg lg:text-xl font-bold">5</p>
              </div>
            </div>
          </div>
          <div class="flex flex-1 p-5 bg-white rounded-lg shadow-lg">
            <div class="flex flex-1 items-center">

              <div id="process-card" class="flex flex-col flex-1 w-fill">
                <p class="mb-4 text-lg text-gray-600">Proses Transaksi</p>
                <p class="mb-2 text-gray-800 font-semibold">Kode Transaksi</p>
                <div class="flex flex-row mb-4">
                <input id="user-nisn" name="Kode Transaksi" data-rule="required no-space" value=""
                  class="flex flex-1 px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
                  <button role="button" disabled id="admin-login-button"
                  class="w-max bg-secondary text-white mx-1 ml-4 py-3 px-8 rounded-lg disabled:opacity-50 disabled:cursor-default">Proses</button>
                  <button role="button" id="show-qr-button" class="w-max text-secondary mx-1 font-light p-2">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg></button>
                </div>
                  </div>
            </div>
          </div>
        </div>
        <p class="mt-6 text-xl text-center md:text-left">Riwayat Transaksi</p>
        <div class="bg-gray-200 p-5 rounded-lg flex flex-col mt-6 md:p-8">
          <div class="flex-1 py-0 white rounded-lg">
            <table id="transaction-table" class="table-auto w-full">
              <tbody>
                <tr class="text-left text-gray-700">
                  <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Nama Siswa</th>
                  <th class="font-normal pb-5 pt-0">Nominal</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Kode Transaksi</th>
                  <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Jenis</th>
                  <th class="font-normal pb-5 pt-0">Status</th>
                  <th class="font-normal pb-5 pt-0 justify-end"></th>
                </tr>
              </tbody>
            </table>
            <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
              <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
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

    this._ballance = 0
    this._deposit = 0
    this._weeklyDeposit = 0
    this._withdraw = 0
    this._weeklyWithdraw = 0

    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._adminId = responseData.id

    await this._renderTable()

    preloaders.forEach((preloader) => {
      preloader.remove()
    })
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

      // Classes
      const nominalColor = (jenis) => {
        if (jenis.toLowerCase() === 'pemasukan') return 'text-success'
        return 'text-failed'
      }

      return /* html */`<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
      <td class="hidden md:table-cell p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDate.toUpperCase()}</td>
      <td class="table-cell md:hidden p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDateMini.toUpperCase()}</td>
      <td class="bg-white select-all hidden lg:table-cell">${transaction.id_transaksi}</td>
      <td class="bg-white ${nominalColor(jenisTransaksi)}">RP ${transaction.nominal}</td>
      <td class="bg-white hidden lg:table-cell">${transaction.id_transaksi}</td>
      <td class="bg-white hidden lg:table-cell">${jenisTransaksi}</td>
      <td class="bg-white">
        <div class="ml-2 md:ml-0 text-sm bg-secondary text-white p-1 md:py-2 md:px-6 rounded-lg w-max">
        <p class="hidden md:inline">${transaction.status_transaksi}</p>
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
          <p id="reminder-element-${transaction.id_transaksi}"></p>
          </div>
        </div>
      </td>
    </tr>
    <tr class="h-4"></tr>`
    }

    tableBody.innerHTML = `
    <tr class="text-left text-gray-700">
    <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Nama Siswa</th>
    <th class="font-normal pb-5 pt-0">Nominal</th>
    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Kode Transaksi</th>
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
