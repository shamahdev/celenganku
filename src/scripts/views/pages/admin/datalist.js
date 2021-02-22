import Swal from 'sweetalert2'
import sortBy from 'lodash/sortBy'
import StringFormater from '../../../helper/string-formater'
import DateFormater from '../../../helper/date-formater'
import APIData from '../../../data/api-data'
import ModalInitializer from '../../../utils/modal-initializer'

const DataList = {
  async render() {
    return /* html */`
      <div class="p-4 pt-0 md:p-8 md:pt=8 lg:p-12 lg:pt-12 h-full">
        <div class="flex flex-col h-full mb-20 md:mb-0 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
          <div class="text-center">
            <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
              Data Celenganku
            </p>
            <div class="flex flex-row mt-4 md:mt-6 ">
              <div class="flex flex-row">
                  <button id="login-option" disabled
                    class="w-max bg-secondary text-white py-3 px-10 rounded-lg rounded-r-none disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-default">Akun Terdaftar</button>
                  <button id="register-option"
                    class="w-max bg-secondary text-white py-3 px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Data Siswa</button>
                </div>
              <div class="flex flex-1 md:flex-initial ml-4 md:ml-auto flex-row ">
                <input id="search-input" placeholder="Cari nisn, nama, dll" value="" type="text"
                  class="text-md block px-5 py-3 rounded-lg w-full bg-gray-200">
                <svg class="w-8 h-8 mt-auto mb-auto ml-4 text-secondary" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button id="create-account"
              class="w-max bg-secondary text-white mx-1 py-3 px-8 ml-6 rounded-lg disabled:opacity-50">Buat Akun</button>
            </div>
          </div>
          <div class="bg-gray-200 gap-5 p-4 rounded-lg flex flex-col mt-6 md:p-8">
            <div id="page-content" class="flex-1 py-0 white rounded-lg">
              <table id="transaction-table" class="table-auto w-full">
                <tbody>
                  <tr class="text-left text-gray-700">
                    <th class="font-normal p-5 pr-0 pt-0">NISN</th>
                    <th class="font-normal pb-5 pt-0 ">Nama Siswa</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Email</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">No Telepon</th>
                    <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Saldo</th>
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
    this._pageContent = document.getElementById('page-content')
    this._totalTransaction = 0
    
    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id
    await this._renderTable()
  },

  async _createPrintEvent(printButton) {
    printButton.addEventListener('click', () => {
      const nisn = printButton.id.replace('print-report-button-', '')
      ModalInitializer.init({
        title: 'Laporan',
        content:
        `<div class="px-10 py-6">
          <div id="modal-content">
            <p class="mt-2 mb-1">Pilih Jangka Waktu</p>
            <div class="my-4 flex flex-col gap-4 md:flex-row">
            <button id="monthly-option" class="w-full p-4 border-2 border-secondary bg-white shadow-lg rounded-lg focus:outline-none ">
              <div class="flex flex-1 md:justify-center">
                <div class="text-white flex flex-1 flex-row">
                  <div data-option class="mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg">
                  <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                  </div>
                  <p class="text-gray-700 mt-1">Bulan Ini</p>
                </div>
              </div>
            </button>
            <button id="yearly-option" class="w-full p-4 bg-white shadow-lg rounded-lg focus:outline-none ">
              <div class="flex flex-1 md:justify-center">
                <div class="text-white flex flex-1 flex-row">
                  <div data-option class="mx-2 my-auto text-sm bg-gray-300 text-gray-300 p-1 rounded-lg">
                  <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                  </div>
                  <p class="text-gray-700 mt-1">Tahun Ini</p>
                </div>
              </div>
            </button>
            </div>
          </div>
          <div class="flex justify-end items-center w-100 mt-4">
            <button role="button" id="next-button" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Cetak</button>
          </div>
        </div>`,
        bg: 'bg-secondary',
      })
      const modal = document.getElementById('modal-laporan')

      this._frequencyOption = 'monthly'
      const frequencyOptionButton = document.querySelectorAll('#monthly-option, #yearly-option')
      const nextButton = document.getElementById('next-button')

      frequencyOptionButton.forEach((option) => {
        option.addEventListener('click', () => {
          this._selectReportOption(frequencyOptionButton, option.id)
        })
      })
      nextButton.addEventListener('click', () => {
        window.location.hash = `#/report/${nisn}?${this._frequencyOption}`
        modal.remove()
      })
    })
  },

  _selectReportOption(optionButton, optionId) {
    const selectedClass = 'mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg'
    const nonSelectedClass = 'mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg'
    optionButton.forEach((option) => {
      const optionIcon = option.querySelector('div[data-option]')
      if (option.id === optionId) {
        option.classList.add('border-2', 'border-secondary')
        optionIcon.className = selectedClass
      } else {
        option.classList.remove('border-2', 'border-secondary')
        optionIcon.className = nonSelectedClass
      }
    })
    this._frequencyOption = optionId.replace('-option', '')
  },

  async _getAllSiswa() {
    const mergeArrays = (arr1 = [], arr2 = [], arr3 = []) => {
      let res = []
      res = arr1.map((obj) => {
        const index = arr2.findIndex((el) => el.nisn === obj.nisn)
        const index2 = arr3.findIndex((el) => el.nisn === obj.nisn)
        const { nama } = index !== -1 ? arr2[index] : {}
        // eslint-disable-next-line camelcase
        const { no_telepon } = index !== -1 ? arr3[index2] : {}
        return {
          ...obj,
          nama,
          no_telepon,
        }
      })
      return res
    }

    const profileDataArray = []
    profileDataArray.push(await APIData.getAllAkunSiswa())
    profileDataArray.push(await APIData.getAllDataSiswa())
    profileDataArray.push(await APIData.getAllProfilSiswa())

    const profileData = mergeArrays(
      profileDataArray[0].data,
      profileDataArray[1].data,
      profileDataArray[2].data,
    )
    return profileData
  },

  async _renderTable() {
    const tableElement = document.getElementById('transaction-table')
    const tableBody = tableElement.querySelector('tbody')
    const allUserAccount = await this._getAllSiswa()

    const userTemplate = (user) => {
      const _deleteButtonInit = (deleteButton) => {
        deleteButton.addEventListener('click', async (event) => {
          event.stopPropagation()
          const result = await Swal.fire({
            icon: 'warning',
            text: 'Tekan pilihan untuk mengkonfirmasi',
            title: 'Hapus akun?',
            showCancelButton: true,
            confirmButtonText: 'Batalkan',
            cancelButtonText: 'Jangan',
            customClass: {
              popup: 'popup-sweetalert',
              confirmButton: 'btn-sweetalert bg-success',
              cancelButton: 'btn-sweetalert bg-failed',
            },
            buttonsStyling: false,
          })

          if (result.isConfirmed) {
            // const response = await APIData.(transaction.id_transaksi)
            // console.log(response)
            this._renderTable()
          }
        })
        return true
      }

      let initialized = false
      setInterval(() => {
        try {
          while (!initialized) {
            const deleteButton = document.getElementById(`delete-user-${user.nisn}`)
            initialized = _deleteButtonInit(deleteButton)
          }
        } catch (error) {
          // console.log('')
        }
      }, 1000)

      return /* html */`<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
      <td class="p-5 pr-0 select-all text-gray-500 bg-white rounded-l-lg">${user.nisn}</td>
      <td class="bg-white">${user.nama}</td>
      <td class="bg-white font-normal hidden lg:table-cell">${user.email}</td>
      <td class="bg-white hidden lg:table-cell">${user.no_telepon}</td>
      <td class="bg-white hidden lg:table-cell">RP ${StringFormater.convertToCashFormat(user.saldo)}</td>
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
          <p id="reminder-element-${user.nisn}">
          <button id="print-report-button-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Cetak Laporan</p>
          </button>
          <button id="show-profile-button-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Lihat Profil</p>
          </button>
          <button id="delete-user-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Hapus Akun</p>
          </button>
          </p>
          </div>
        </div>
      </td>
    </tr>
    <tr class="h-4"></tr>`
    }

    tableBody.innerHTML = `
      <tr class="text-left text-gray-700">
        <th class="font-normal p-5 pr-0 pt-0">NISN</th>
        <th class="font-normal pb-5 pt-0">Nama Siswa</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Email</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">No Telepon</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">Saldo</th>
        <th class="font-normal pb-5 pt-0 justify-end"></th>
      </tr>`

    allUserAccount.forEach((user) => {
      tableBody.innerHTML += userTemplate(user)
    })

    const preloader = document.querySelector('.preloader')
    preloader.remove()

    const printReportButton = document.querySelectorAll('button[id*="print-report-button"]')
    const editProfileButton = document.querySelectorAll('button[id*="show-profile-button"]')

    editProfileButton.forEach((button) => {
      button.addEventListener('click', (event) => {
        const user = event.target.id.replace('show-profile-button-', '')
        this._initEditProfile(user)
      })
    })

    printReportButton.forEach(async (button) => {
      await this._createPrintEvent(button)
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

  async _initEditProfile(user) {
    const element = /* html */`<div class="flex flex-col lg:flex-row">
    <div class="p-5 rounded-lg flex flex-row md:flex-col flex-1 md:mt-4">
      <div class="bg-gray-200 p-5 md:p-8 flex flex-1 flex-col white rounded-lg">
        <div class="preloader p-4 flex mt-auto mb-auto ml-auto mr-auto">
          <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
        <div id="account-form" class="hidden flex flex-col gap-4">
          <div class="mx-auto mt-4 rounded-lg">
            <div class="flex flex-col w-48 rounded-full text-white">
              <img id="photo-profile" class="object-cover rounded-full w-full h-48 mx-auto"
                alt="User Photo Profile" src="http://ui-avatars.com/api/background=fff&color=fff">
              <div id="change-photo" class="disabled:cursor-default hidden flex flex-row">
                <label for="file-upload"
                  class="p-3 mt-4 mr-1 ml-auto cursor-pointer w-max bg-primary text-white mx-1 rounded-lg disabled:opacity-50">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                    </path>
                  </svg>
                </label>
                <input class="hidden" id="file-upload" type="file" accept="image/*">
                <button id="delete-photo"
                  class="disabled:cursor-default p-3 mt-4 mr-auto ml-1 cursor-pointer w-max bg-primary text-white mx-1 rounded-lg disabled:opacity-50">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="flex-1 pt-0 rounded-lg w-full">
            <div class="">
              <p class="mb-2">NISN</p>
              <input id="input-nisn" name="NISN" disabled value="" type="text"
                class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500">
              <p class="mb-2 mt-4">Email</p>
              <input id="input-email" name="Email" disabled value="" type="email"
                data-rule="required no-space email"
                class="editable mb-2 block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500">
              <p class="mt-4">Password</p>
              <input id="input-password" name="Password" disabled value="" type="password"
                data-rule="required no-space"
                class="editable block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-5 rounded-lg flex flex-col flex-1 md:mt-4">
      <p class="mb-4 text-lg text-center md:text-left">Informasi Siswa</p>
      <div class="bg-gray-200 p-5 md:p-8 flex-col white rounded-lg">
        <div class="preloader justify-center p-4 flex mt-auto mb-auto ml-auto mr-auto">
          <div class="loader loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
        </div>
        <div id="profile-form" class="hidden flex flex-col">
          <div class="flex-1 rounded-lg w-full">
            <div class="">
              <p class="mb-2">Nama Lengkap</p>
              <input id="input-nama" name="Nama" disabled value="" type="text"
                class="mb-2 block px-5 py-3 rounded-lg w-full bg-white text-gray-500 focus:placeholder-gray-400">
              <p class="mb-2 mt-4">Alamat</p>
              <textarea id="input-alamat" name="Alamat" rows="4" type="text"
                class="disabled:resize-none mb-2 block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500"
                disabled></textarea>
              <p class="mb-2 mt-4">Nomor Telepon</p>
              <input id="input-no_telepon" name="Nomer Telepon" data-rule="required no-space" value=""
                type="number"
                class="editable text-md block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500 focus:placeholder-gray-400"
                disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-start items-center mt-4">
        <button id="edit-button"
          class="w-max bg-primary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Edit Profil</button>
        <button id="discard-button"
          class="hidden w-max bg-failed text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Batalkan</button>
        <button id="confirm-button"
          class="hidden w-max bg-success text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Selesai</button>
      </div>
    </div>
  </div>`

    this._pageContent.innerHTML = element
  },
}

export default DataList
