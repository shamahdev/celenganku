import StringFormater from '../../../helper/string-formater'
import DateFormater from '../../../helper/date-formater'
import APIData from '../../../data/api-data'

const Report = {
  async render() {
    return /* html */`
    <div class="text-center">
    <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
      Riwayat Transaksi
    </p>
    <div class="flex flex-row mt-4 md:mt-6 ">
      <div class="flex flex-row">
        <button id="user-login-button" class="w-max bg-primary text-white mx-1 py-3 px-5 rounded-lg disabled:opacity-50">Cetak Laporan</button>
        <p id="total-transaction" class="hidden md:inline mt-3 ml-4 text-gray-700">Total Transaksi:</p>
      </div>
      <div class="flex flex-1 md:flex-initial ml-4 md:ml-auto flex-row ">
      <input id="search-input" placeholder="Cari tanggal, nominal, dll" value="" type="text" class="text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
      <svg class="w-8 h-8 mt-auto mb-auto ml-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>
    </div>
  </div>
    <div class="bg-gray-200 gap-5 p-4 rounded-lg flex flex-col mt-6 md:p-8">
      <div class="flex-1 py-0 white rounded-lg">
      <table id="transaction-table" class="table-auto w-full">
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
      </tbody>
    </table>
      <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
        <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
      </div>
      </div>
    </div>
      `
  },

  async afterRender() {
    // Remove Preloders
    this._totalTransaction = 0
    const totalTransactionElement = document.getElementById('total-transaction')
    const preloaders = document.querySelectorAll('.preloader')

    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    const accountData = await APIData.getAkunSiswa(this._userId)
    this._ballance = accountData.saldo

    await this._renderTable()
    totalTransactionElement.innerHTML = `Total Transaksi: Rp ${StringFormater.convertToCashFormat(this._totalTransaction)}`
    preloaders.forEach((preloader) => {
      preloader.remove()
    })
  },

  async _renderTable() {
    const tableElement = document.getElementById('transaction-table')
    const tableBody = tableElement.querySelector('tbody')
    const transactionData = await APIData.getTransaksiSiswa(this._userId)

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
      const timeCreated = new Date()
      timeCreated.setDate(timeStamp.getDate() - 1)
      const transactionDate = timeCreated.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      const transactionDateMini = timeCreated.toLocaleDateString('id-ID')

      this._totalTransaction += StringFormater.convertCasttoInt(transaction.nominal)

      // Classes
      const nominalColor = (jenis) => {
        if (jenis.toLowerCase() === 'pemasukan') return 'text-success'
        return 'text-failed'
      }

      const statusColor = (status) => {
        if (status.toLowerCase() === 'selesai') return 'bg-primary text-white'
        return 'bg-primaryDisable text-primary'
      }

      const renderStatusIcon = (status) => {
        if (status.toLowerCase() === 'selesai') return 'M5 13l4 4L19 7'
        return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      }

      const getStatusAction = (status) => {
        if (status.toLowerCase() === 'selesai') {
          return `
          <a href="#/profile"
            class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-primary flex"><svg class="w-8 h-8" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg></i>
            <p class="flex ml-2 mt-1 leading-relaxed">Transaksi Lagi</p>
          </a>`
        }
        return `
          <a href="#/profile"
            class="flex px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-primary flex"><svg class="w-8 h-8" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg></i>
            <p class="flex ml-2 mt-1 leading-relaxed">Batalkan Transaksi</p>
          </a>`
      }

      if (transaction.status_transaksi.toLowerCase() === 'pembayaran') {
        setInterval(() => {
          try {
            const {
              distance, hours, minutes,
            } = DateFormater.getTimeCounter(timeStamp)
            const counterText = `${hours} jam ${minutes} menit`
            const counterReminder = `Transaksi ini akan automatis dibatalkan dalam <br><b class="flex mt-3 text-primary">${counterText}</b>`
            const reminderElement = document.getElementById('reminder-element')
            reminderElement.className = 'p-5 text-sm font-normal text-gray-600'
            reminderElement.innerHTML = counterReminder

          // if (distance < 0) console.log('telat bang')
          } catch (error) {
            // console.log('')
          }
        }, 1000)
      }

      return /* html */`<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
      <td class="hidden md:table-cell p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDate.toUpperCase()}</td>
      <td class="table-cell md:hidden p-5 pr-0 text-gray-500 bg-white rounded-l-lg">${transactionDateMini.toUpperCase()}</td>
      <td class="bg-white hidden lg:table-cell">${transaction.id_transaksi}</td>
      <td class="bg-white ${nominalColor(jenisTransaksi)}">RP ${transaction.nominal}</td>
      <td class="bg-white hidden lg:table-cell">${transaction.metode_pembayaran}</td>
      <td class="bg-white hidden lg:table-cell">${jenisTransaksi}</td>
      <td class="bg-white">
        <div class="ml-2 md:ml-0 text-sm ${statusColor(transaction.status_transaksi)} p1 md:py-2 md:px-6 rounded-lg w-max">
        <p class="hidden md:inline">${transaction.status_transaksi}</p>
        <p class="inline md:hidden"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${renderStatusIcon(transaction.status_transaksi)}"></path></svg></p>
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
          <p id="reminder-element"></p>
            ${getStatusAction(transaction.status_transaksi)}
          </div>
        </div>
      </td>
    </tr>
    <tr class="h-4"></tr>`
    }

    transactionData.data.forEach((transaction) => {
      tableBody.innerHTML += transactionTemplate(transaction)
    })
    this._createTableEvent()
  },

  async _createTableEvent() {
    const searchInput = document.getElementById('search-input')
    const table = document.getElementById('transaction-table')

    searchInput.addEventListener('keyup', (event) => {
      const filter = event.target.value.toUpperCase()
      const transaction = table.querySelectorAll('tr[class*="hover:shadow-lg"]')
      event.preventDefault()

      transaction.forEach((row) => {
        const rowData = row.querySelectorAll('td')
        if (rowData.length) {
          const textArray = []
          rowData.forEach((data) => {
            textArray.push(data.textContent.toUpperCase() || data.innerText.toUpperCase())
          })
          const textValue = textArray.toString()
          if (textValue.indexOf(filter) > -1) {
            row.style.display = ''
          } else {
            row.style.display = 'none'
          }
        }
      })
    })
  },

}

export default Report
