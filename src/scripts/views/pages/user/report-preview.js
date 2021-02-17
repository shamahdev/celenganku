import sortBy from 'lodash/sortBy'
import APIData from '../../../data/api-data'
import StringFormater from '../../../helper/string-formater'
import SlugParser from '../../../routes/slugparser'
import UrlParser from '../../../routes/urlparser'

const ReportPreview = {
  async render() {
    return /* html */`
        <div class="text-center relative">
          <a href="#/report" class="-mt-4 w-max absolute left-0 text-primary mx-1 p-4">
          <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </a>
          <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
            Preview Laporan
          </p>
        </div>
        <div class="flex flex-col w-full p-4 md:p-8 pt-0 rounded-lg shadow-lg mx-auto md:mt-4 text-gray-800">
        <div class="p-4 rounded-lg flex flex-col">
          <p id="name" class="text-2xl font-bold"></p>
          <p id="nisn"class="mb-2 text-lg"></p>
          <p id="alamat" class="text-gray-600"><p>
          <p id="periode" class="mt-4 mb-6 text-sm text-primary"></p>
          <div class="flex-1 py-0 white rounded-lg">
          <table id="transaction-table" class="table-auto w-full">
          <tbody>
          <tr class="text-left text-gray-700">
              <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
              <th class="font-normal pb-5 pt-0 hidden md:table-cell">Jenis Transaksi</th>
              <th class="font-normal pb-5 pt-0">Nominal</th>
              <th class="font-normal pb-5 pt-0 ">Saldo</th>
          </tr>
          </tbody>
        </table>
          <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
            <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
          </div>
          </div>
          <div class="text-right mt-4">
          <p id="first-balance" class="mb-2 flex">Saldo Awal:</p>
          <p id="deposit-text" class="mb-2 flex">Pemasukan Saldo:</p>
          <p id="withdraw-text" class="mb-2 flex">Pengeluaran Saldo:</p>
          <p id="last-balance" class="mb-2 flex">Saldo Akhir:</p>
          </div>
          </div>
        </div>
      `
  },

  async afterRender() {
    const preloaders = document.querySelectorAll('.preloader')
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const title = SlugParser.parseToText(url.id)

    this._reportTime = title

    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    const userAccount = await APIData.getAkunSiswa(this._userId)
    const userData = await APIData.getDataSiswa(this._userId)
    this._ballance = userAccount.saldo

    // Values
    this._withdraw = 0
    this._deposit = 0

    // Elements
    const nameText = document.getElementById('name')
    const nisnText = document.getElementById('nisn')
    const alamatText = document.getElementById('alamat')
    const periodeText = document.getElementById('periode')

    const firstBalanceText = document.getElementById('first-balance')
    const lastBalanceText = document.getElementById('last-balance')
    const withdrawText = document.getElementById('withdraw-text')
    const depositText = document.getElementById('deposit-text')

    await this._renderTable(this._reportTime)

    nameText.innerHTML = userData.nama
    nisnText.innerHTML = userData.nisn
    alamatText.innerHTML = userData.alamat

    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    const firstDay = new Date(y, m, 1)
    const lastDay = new Date(y, m + 1, 0)
    if (this._reportTime === 'Monthly') periodeText.innerHTML = `Periode: ${firstDay.toLocaleDateString('id-ID')} s/d ${lastDay.toLocaleDateString('id-ID')}`
    else periodeText.innerHTML = `Periode: 1/1/${y} s/d  31/1/${y}`

    firstBalanceText.innerHTML = `Saldo Awal: <p class="flex ml-auto">${document.querySelector('.saldo').textContent}</p>`
    lastBalanceText.innerHTML = `Saldo Akhir: <p class="flex ml-auto">${document.querySelectorAll('.saldo')[document.querySelectorAll('.saldo').length - 1].textContent}</p>`
    depositText.innerHTML = `Pemasukan Saldo: <p class="flex ml-auto">RP ${StringFormater.convertToCashFormat(this._deposit)}</p>`
    withdrawText.innerHTML = `Pengeluaran Saldo: <p class="flex ml-auto">RP ${StringFormater.convertToCashFormat(this._withdraw)}</p>`
    preloaders.forEach((preloader) => {
      preloader.remove()
    })
  },
  async _renderTable(reportTime) {
    const tableElement = document.getElementById('transaction-table')
    const tableBody = tableElement.querySelector('tbody')
    const unsortedTransactionData = await APIData.getTransaksiSiswa(this._userId)
    const transactionData = sortBy(unsortedTransactionData.data, ['tenggat_waktu_pembayaran.seconds']).reverse()

    let thisSaldo = this._ballance
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

      if (transaction.status_transaksi.toLowerCase() === 'pembayaran') return ''

      const timeStamp = new Date(transaction.tenggat_waktu_pembayaran.seconds * 1000)
      if (reportTime === 'Monthly') {
        if (timeStamp.getMonth() !== new Date().getMonth()) return ''
      }
      const jenisTransaksi = transaction.jenis_transaksi
      timeStamp.setDate(timeStamp.getDate() - 1)
      const transactionDateMini = timeStamp.toLocaleDateString('id-ID')

      if (jenisTransaksi.toLowerCase() === 'pemasukan') {
        thisSaldo -= StringFormater.convertCasttoInt(transaction.nominal)
        this._withdraw += StringFormater.convertCasttoInt(transaction.nominal)
      } else {
        thisSaldo += StringFormater.convertCasttoInt(transaction.nominal)
        this._deposit += StringFormater.convertCasttoInt(transaction.nominal)
      }

      return /* html */`<tr class="font-bold text-gray-800 mb-5">
      <td class="p-5 pr-0 text-gray-500 bg-gray-200 rounded-l-lg">${transactionDateMini.toUpperCase()}</td>
      <td class="bg-gray-200 hidden md:table-cell">${transaction.jenis_transaksi}</td>
      <td class="bg-gray-200 ">RP ${transaction.nominal}</td>
      <td class="saldo bg-gray-200 rounded-r-lg">RP ${StringFormater.convertToCashFormat(thisSaldo)}</td>
      </td>
    </tr>
    <tr class="h-4"></tr>`
    }

    tableBody.innerHTML = `
    <tr class="text-left text-gray-700">
      <th class="font-normal p-5 pr-0 pt-0">Tanggal</th>
      <th class="font-normal pb-5 pt-0 hidden md:table-cell">Jenis Transaksi</th>
      <th class="font-normal pb-5 pt-0">Nominal</th>
      <th class="font-normal pb-5 pt-0 ">Saldo</th>
    </tr>`
    const transactionElementArray = []
    let transactionRowTemplate = []
    transactionData.forEach((transaction) => {
      transactionElementArray.push(transactionTemplate(transaction))
    })
    transactionRowTemplate = transactionElementArray.reverse()
    tableBody.innerHTML += transactionRowTemplate.join('')
  },
}

export default ReportPreview
