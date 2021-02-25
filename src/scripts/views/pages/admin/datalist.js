/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
import Swal from 'sweetalert2'
import StringFormater from '../../../helper/string-formater'
import APIData from '../../../data/api-data'
import formValidation from '../../../helper/form-validation'
import EventHelper from '../../../helper/event-helper'
import ModalInitializer from '../../../utils/modal-initializer'
import UrlParser from '../../../routes/urlparser'

const DataList = {
  async render() {
    return /* html */`
      <div class="p-4 pt-0 md:p-8 md:pt=8 lg:p-12 lg:pt-12 h-full">
        <div class="flex flex-col h-full mb-40 md:mb-0 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
          <div class="text-center">
            <p class="text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
              Data Celenganku
            </p>
            <div class="flex flex-col lg:flex-row mt-4 md:mt-6 ">
              <div class="flex flex-row mb-4 lg:mb-0 flex-1 lg:flex-initial">
                  <button id="account-option" disabled
                    class="w-max flex-1 lg:flex-initial bg-secondary text-white py-3 px-5 md:px-10 rounded-lg rounded-r-none disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-default">Daftar Akun</button>
                  <button id="data-option"
                    class="w-max flex-1 lg:flex-initial bg-secondary text-white py-3 px-5 md:px-10 rounded-lg rounded-l-none disabled:bg-white disabled:text-gray-500 disabled:cursor-default">Data Siswa</button>
              </div>
              <div class="flex flex-1 lg:flex-initial lg:ml-auto flex-row">
                <input id="search-input" placeholder="Cari nisn, nama, dll" value="" type="text"
                  class="text-md flex flex-1 px-5 py-3 rounded-lg bg-gray-200">
                <svg class="flex w-8 h-8 mt-auto mb-auto ml-4 text-secondary" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="bg-gray-200 gap-5 p-4 rounded-lg flex flex-col mt-6 md:p-8">
            <div id="page-content" class="flex-1 py-0 white rounded-lg">
            </div>
          </div>
        </div>
      </div>
      <div>
        <button id="add-button" role="button"
          class="fixed w-max bg-secondary text-white p-4 rounded-full right-0 bottom-0 mb-24 mr-8 md:mr-16 md:mb-16 print:hidden">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        </button>
      </div>
      `
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    this._profileRedirectID = url.id || ''

    this._pageContent = document.getElementById('page-content')
    this._totalTransaction = 0
    this._tableOption = 'account'

    const tableOptionButton = document.querySelectorAll('#account-option, #data-option')
    const addButton = document.getElementById('add-button')

    const _selectTableOption = (optionId) => {
      tableOptionButton.forEach((option) => {
        if (option.id === optionId) {
          option.disabled = true
        } else {
          option.disabled = false
        }
      })
      this._tableOption = optionId.replace('-option', '')
    }

    addButton.addEventListener('click', () => {
      this._createAccountModalInit()
    })

    // Fetch Data
    const responseData = await APIData.retrieveUser()
    this._userId = responseData.id

    tableOptionButton.forEach((option) => {
      option.addEventListener('click', async () => {
        _selectTableOption(option.id)

        if (this._tableOption === 'data') await this._renderDataTable()
        else await this._renderAccountTable()
      })
    })

    if (this._profileRedirectID !== '') await this._initEditProfile(this._profileRedirectID)
    else await this._renderAccountTable()
  },

  _createAccountModalInit(nisn = null) {
    ModalInitializer.init({
      title: 'Daftar Akun',
      content:
      `<div class="px-10 py-6">
        <div id="modal-content">
        <div id="register-form" class="mb-4">
        <p class="mb-2 text-gray-800">NISN</p>
        <input id="user-nisn-register" name="NISN" data-rule="required no-space number-must-10" value="${nisn}"
          type="number" class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
        <p class="mb-2 text-gray-800">Email</p>
        <input id="user-email" name="Email" value="" type="email"
          data-rule="required no-space email"
          class="editable mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
        <p class="mb-2 text-gray-800">Buat Password</p>
        <input id="user-password-register" name="Password" data-rule="required no-space digit-more-than-6" value=""
          type="password" class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
        <p class="mb-2 text-gray-800">Password</p>
        <input id="user-password-again-register" name="Input"
          data-rule="required no-space digit-more-than-6 equal-user-password-register" value="" type="password"
          class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 text-gray-800">
        <div class="flex justify-end items-center w-100 mt-4">
          <button role="button" id="user-register-button" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Daftar</button>
        </div>
        </div>
      </div>`,
      bg: 'bg-secondary',
    })
    const modal = document.getElementById('modal-daftar-akun')
    const registerFormInputs = document.querySelectorAll('#register-form input[data-rule]')
    const registerSubmit = document.getElementById('user-register-button')
    const nisnInput = document.getElementById('user-nisn-register')

    formValidation.init({
      formInputs: registerFormInputs,
      submitButton: registerSubmit,
    })

    if (nisn !== null) EventHelper.triggerEvent(nisnInput, 'keyup')

    registerSubmit.addEventListener('click', async () => {
      const registerData = {
        nisn: registerFormInputs[0].value,
        email: registerFormInputs[1].value,
        password: registerFormInputs[3].value,
      }
      const registerResponse = await APIData.registerUser(registerData)
      console.log(registerResponse)
      if (registerResponse.error) {
        Swal.fire({
          icon: registerResponse.status,
          text: registerResponse.message,
          title: registerResponse.title,
          confirmButtonText: 'Tutup',
          customClass: {
            popup: 'popup-sweetalert',
            confirmButton: 'btn-sweetalert bg-secondary',
          },
          buttonsStyling: false,
        })
      } else {
        Swal.fire({
          icon: registerResponse.status,
          text: 'Akun Siswa berhasil didaftarkan',
          title: registerResponse.title,
          confirmButtonText: 'Tutup',
          customClass: {
            popup: 'popup-sweetalert',
            confirmButton: 'btn-sweetalert bg-secondary',
          },
          buttonsStyling: false,
        })
        modal.remove()
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }
    })
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

  async _getDataSiswa() {
    const mergeArrays = (arr1 = [], arr2 = []) => {
      let res = []
      res = arr1.map((obj) => {
        const index = arr2.findIndex((el) => el.nisn === obj.nisn)
        const { saldo } = index !== -1 ? arr2[index] : {}
        // eslint-disable-next-line camelcase
        return {
          ...obj,
          saldo,
        }
      })
      return res
    }

    const profileDataArray = []
    profileDataArray.push(await APIData.getAllDataSiswa())
    profileDataArray.push(await APIData.getAllAkunSiswa())

    const profileData = mergeArrays(
      profileDataArray[0].data,
      profileDataArray[1].data,
    )
    return profileData
  },

  async _renderAccountTable() {
    this._pageContent.innerHTML = `<table id="transaction-table" class="table-auto w-full">
    <tbody>
      <tr class="text-left text-gray-700">
        <th class="font-normal p-5 pr-0 pt-0">NISN</th>
        <th class="font-normal pb-5 pt-0 hidden md:table-cell">Nama Siswa</th>
        <th class="font-normal pb-5 pt-0 hidden xl:table-cell">Email</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">No Telepon</th>
        <th class="font-normal pb-5 pt-0">Saldo</th>
        <th class="font-normal pb-5 pt-0 justify-end"></th>
      </tr>
    </tbody>
  </table>
  <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
    <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
  </div>
  `
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
            title: 'Hapus?',
            showCancelButton: true,
            confirmButtonText: 'Batalkan',
            cancelButtonText: 'Jangan',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
              try {
                await APIData.deleteSiswa(user.nisn)
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
            this._renderAccountTable()
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
      <td class="bg-white hidden md:table-cell">${user.nama}</td>
      <td class="bg-white font-normal hidden xl:table-cell">${user.email}</td>
      <td class="bg-white hidden lg:table-cell">${user.no_telepon}</td>
      <td class="bg-white text-secondary">RP ${StringFormater.convertToCashFormat(user.saldo)}</td>
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
        <th class="font-normal pb-5 pt-0 hidden md:table-cell">Nama Siswa</th>
        <th class="font-normal pb-5 pt-0 hidden xl:table-cell">Email</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">No Telepon</th>
        <th class="font-normal pb-5 pt-0 ">Saldo</th>
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
        const nisn = event.target.id.replace('show-profile-button-', '')
        this._initEditProfile(nisn)
      })
    })

    printReportButton.forEach(async (button) => {
      await this._createPrintEvent(button)
    })

    this._createTableEvent()
  },

  async _renderDataTable() {
    this._pageContent.innerHTML = `
    <button role="button" id="add-data-button" class="w-max bg-secondary text-white mb-4 md:mb-8 py-3 px-8 flex ml-auto rounded-lg disabled:opacity-50">
      <i class="text-white flex">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      </i>
      <p class="flex ml-2 leading-relaxed">Tambah Data Siswa</p>
    </button>
    <table id="transaction-table" class="table-auto w-full">
    <tbody>
      <tr class="text-left text-gray-700">
        <th class="font-normal p-5 pr-0 pt-0">NISN</th>
        <th class="font-normal pb-5 pt-0 hidden md:table-cell">Nama Siswa</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">JK</th>
        <th class="font-normal pb-5 pt-0 hidden xl:table-cell">Alamat</th>
        <th class="font-normal pb-5 pt-0">Akun</th>
        <th class="font-normal pb-5 pt-0 justify-end"></th>
      </tr>
    </tbody>
  </table>
  <div class="preloader p-4 flex mt-auto mb-auto mx-auto justify-center">
    <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
  </div>
  `
    const tableElement = document.getElementById('transaction-table')
    const tableBody = tableElement.querySelector('tbody')
    const addDataButton = document.getElementById('add-data-button')
    const allUserAccount = await this._getDataSiswa()

    addDataButton.addEventListener('click', () => {
      this._addDataModalEvent()
    })

    const userTemplate = (user) => {
      let initialized = false
      setInterval(() => {
        try {
          while (!initialized) {
            const createButton = document.getElementById(`create-user-${user.nisn}`)
            createButton.addEventListener('click', () => {
              this._createAccountModalInit(user.nisn)
            })
            initialized = true
          }
        } catch (error) {
          // console.log('')
        }
      }, 1000)

      const _accountStatus = (saldo) => {
        let classColor = 'bg-secondaryDisable text-secondary'
        let title = 'TIDAK ADA'
        let icon = 'M6 18L18 6M6 6l12 12'
        if (typeof (saldo) !== 'undefined' && saldo != null) {
          classColor = 'bg-secondary text-white'
          title = 'TERDAFTAR'
          icon = 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
        }

        return `<div class="ml-2 md:ml-0 text-sm ${classColor} py-2 px-6 rounded-lg w-max">
          <p class="">${title}</p>
        </div>`
      }

      const _renderAction = (saldo) => {
        if (typeof (saldo) === 'undefined' || saldo === null) {
          return `
          <button id="create-user-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Daftar Akun</p>
          </button>
          <button id="show-data-button-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Lihat Data Siswa</p>
          </button>
          <button id="delete-data-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Hapus Data</p>
          </button>
          `
        }
        return `
        <button id="show-data-button-${user.nisn}"
          class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          role="menuitem">
          <i class="text-secondary flex">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </i>
          <p class="flex ml-2 leading-relaxed">Lihat Data Siswa</p>
        </button>
        <button id="delete-data-${user.nisn}"
            class="flex w-full flex-1 px-4 py-3 text-sm font-normal text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem">
            <i class="text-secondary flex">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </i>
            <p class="flex ml-2 leading-relaxed">Hapus Data</p>
        </button>
        `
      }

      const _deleteDataButtonInit = (deleteButton) => {
        deleteButton.addEventListener('click', async (event) => {
          event.stopPropagation()
          const result = await Swal.fire({
            icon: 'warning',
            text: 'Tekan pilihan untuk mengkonfirmasi',
            title: 'Hapus Data Siswa?',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Jangan',
            customClass: {
              popup: 'popup-sweetalert',
              confirmButton: 'btn-sweetalert bg-success',
              cancelButton: 'btn-sweetalert bg-failed',
            },
            buttonsStyling: false,
          })

          if (result.isConfirmed) {
            const response = await APIData.deleteDataSiswa(user.nisn)
            console.log(response)
            this._renderDataTable()
          }
        })
        return true
      }

      let deleteInitialized = false
      setInterval(() => {
        try {
          while (!deleteInitialized) {
            const deleteButton = document.getElementById(`delete-data-${user.nisn}`)
            deleteInitialized = _deleteDataButtonInit(deleteButton)
          }
        } catch (error) {
          // console.log('')
        }
      }, 1000)


      return /* html */`<tr class="font-bold text-gray-800 mb-5 hover:shadow-lg">
      <td class="p-5 pr-0 select-all text-gray-500 bg-white rounded-l-lg">${user.nisn}</td>
      <td class="bg-white hidden md:table-cell">${user.nama}</td>
      <td class="bg-white pr-6 hidden lg:table-cell">${user.jenis_kelamin}</td>
      <td class="bg-white font-normal hidden xl:table-cell">${user.alamat}</td>
      <td class="bg-white ">${_accountStatus(user.saldo)}</td>
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
          ${_renderAction(user.saldo)}
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
        <th class="font-normal pb-5 pt-0 hidden md:table-cell">Nama Siswa</th>
        <th class="font-normal pb-5 pt-0 hidden lg:table-cell">JK</th>
        <th class="font-normal pb-5 pt-0 hidden xl:table-cell">Alamat</th>
        <th class="font-normal pb-5 pt-0">Akun</th>
        <th class="font-normal pb-5 pt-0 justify-end"></th>
      </tr>`

    allUserAccount.forEach((user) => {
      tableBody.innerHTML += userTemplate(user)
    })

    const preloader = document.querySelector('.preloader')
    preloader.remove()

    const showDataButtons = document.querySelectorAll('button[id*="show-data-button"]')

    showDataButtons.forEach((button) => {
      button.addEventListener('click', async () => {
        ModalInitializer.init({
          title: 'Data Siswa',
          content:
          /* html */`<div class="px-10 py-6">
            <div id="modal-content">
            <div class="preloader p-4 flex w-max m-auto">
              <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
            </div>
            </div>
            <div class="flex justify-end items-center w-100 mt-4">
                <button role="button" id="edit-data" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Edit Data</button>
                <button id="discard-button"
                  class="hidden w-max bg-failed text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Batalkan</button>
                <button id="confirm-button"
                  class="hidden w-max bg-success text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Selesai</button>
              </div>
          </div>`,
          bg: 'bg-secondary',
        })

        const modal = document.getElementById('modal-data-siswa')
        const modalContent = document.getElementById('modal-content')
        const nisnUser = button.id.replace('show-data-button-', '')
        const user = await APIData.getDataSiswa(nisnUser)
        this._genderOption = user.jenis_kelamin

        const _selectGenderOption = (optionButton, optionId) => {
          const selectedClass = 'mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg'
          const nonSelectedClass = 'mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg'
          optionButton.forEach((option) => {
            const optionIcon = option.querySelector('div[data-option]')
            if (option.id === optionId) {
              optionIcon.className = selectedClass
            } else {
              optionIcon.className = nonSelectedClass
            }
          })
          this._genderOption = optionId.replace('-option', '')[0].toUpperCase()
        }

        setTimeout(() => {
          modalContent.innerHTML = /* html */`
        <p class="mb-2 text-gray-800">NISN</p>
              <input name="NISN" disabled value="${user.nisn}" data-rule="required number-must-10"
                class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800">
                <p class="mb-2 text-gray-800">Nama Lengkap</p>
              <input name="Nama Lengkap" disabled value="${user.nama}" data-rule="required"
                class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800">
                <div class="my-6 flex flex-col gap-4 md:flex-row">
                <button disabled id="laki-option" class="disabled:cursor-default w-full rounded-lg focus:outline-none ">
                  <div class="flex flex-1 md:justify-center">
                    <div class="text-white flex flex-1 flex-row">
                      <div data-option class="mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg">
                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                      </div>
                      <p class="text-gray-700 mt-1">Laki-laki</p>
                    </div>
                  </div>
                </button>
                <button disabled id="perempuan-option" class="disabled:cursor-default w-full focus:outline-none ">
                  <div class="flex flex-1 md:justify-center">
                    <div class="text-white flex flex-1 flex-row">
                      <div data-option class="mx-2 my-auto text-sm bg-gray-300 text-gray-300 p-1 rounded-lg">
                      <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                      </div>
                      <p class="text-gray-700 mt-1">Perempuan</p>
                    </div>
                  </div>
                </button>
                </div>
              <p class="mb-2 text-gray-800">Alamat</p>
              <textarea id="input-alamat" name="Alamat" rows="4" type="text" data-rule="required"
                class="disabled:resize-none mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800"
                disabled>${user.alamat}</textarea>
            `

          const editButton = document.getElementById('edit-data')
          const discardButton = document.getElementById('discard-button')
          const confirmButton = document.getElementById('confirm-button')
          const editableForm = document.querySelectorAll('input[data-rule], textarea[data-rule]')
          const genderOptionButtons = document.querySelectorAll('#laki-option, #perempuan-option')
          const [nisn, nama, alamat] = editableForm

          formValidation.init({
            formInputs: editableForm,
            submitButton: confirmButton,
            isEdit: true,
          })

          let genderId = ''
          genderId = 'laki-option'
          if (this._genderOption === 'P') genderId = 'perempuan-option'
          _selectGenderOption(genderOptionButtons, genderId)

          const nisnTemp = nisn.value
          const namaTemp = nama.value
          const alamatTemp = alamat.value
          const genderTemp = this._genderOption

          const toggleEditable = (option) => {
            if (option) {
              editButton.classList.add('hidden')
              discardButton.classList.remove('hidden')
              confirmButton.classList.remove('hidden')
            } else {
              editButton.classList.remove('hidden')
              discardButton.classList.add('hidden')
              confirmButton.classList.add('hidden')
            }
          }

          editButton.addEventListener('click', () => {
            genderOptionButtons.forEach((option) => {
              option.disabled = false
            })
            editableForm.forEach((input) => {
              input.disabled = false
              toggleEditable(true)
            })
          })

          discardButton.addEventListener('click', () => {
            nisn.value = nisnTemp
            nama.value = namaTemp
            alamat.value = alamatTemp
            this._genderOption = genderTemp

            let genderIdOption = ''
            genderIdOption = 'laki-option'
            if (genderTemp === 'P') genderIdOption = 'perempuan-option'

            _selectGenderOption(genderOptionButtons, genderIdOption)
            genderOptionButtons.forEach((option) => {
              option.disabled = true
            })
            editableForm.forEach((input) => {
              input.disabled = true
              toggleEditable(false)
            })
          })

          confirmButton.addEventListener('click', async () => {
            const result = await Swal.fire({
              icon: 'warning',
              text: 'Tekan pilihan untuk mengkonfirmasi',
              title: 'Ubah Data?',
              showCancelButton: true,
              confirmButtonText: 'Ubah',
              cancelButtonText: 'Jangan',
              showLoaderOnConfirm: true,
              preConfirm: async () => {
                try {
                  await this._updateData(nisn.value, nama.value, alamat.value, this._genderOption)
                  modal.remove()
                  this._renderDataTable()
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
              modal.remove()
              this._renderDataTable()
            }
          })

          genderOptionButtons.forEach((option) => {
            option.addEventListener('click', () => {
              _selectGenderOption(genderOptionButtons, option.id)
            })
          })
        }, 200)
      })
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

  async _addDataModalEvent() {
    ModalInitializer.init({
      title: 'Tambah Data Siswa',
      content:
      /* html */`<div class="px-10 py-6">
          <div id="modal-content">
          <p class="mb-2 text-gray-800">NISN</p>
            <input name="NISN" value="" data-rule="required number-must-10"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800">
              <p class="mb-2 text-gray-800">Nama Lengkap</p>
            <input name="Nama Lengkap" value="" data-rule="required"
              class="mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800">
              <div class="my-6 flex flex-col gap-4 md:flex-row">
              <button id="laki-option" class="disabled:cursor-default w-full rounded-lg focus:outline-none ">
                <div class="flex flex-1 md:justify-center">
                  <div class="text-white flex flex-1 flex-row">
                    <div data-option class="mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg">
                    <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                    </div>
                    <p class="text-gray-700 mt-1">Laki-laki</p>
                  </div>
                </div>
              </button>
              <button id="perempuan-option" class="disabled:cursor-default w-full focus:outline-none ">
                <div class="flex flex-1 md:justify-center">
                  <div class="text-white flex flex-1 flex-row">
                    <div data-option class="mx-2 my-auto text-sm bg-gray-300 text-gray-300 p-1 rounded-lg">
                    <p><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg></p>
                    </div>
                    <p class="text-gray-700 mt-1">Perempuan</p>
                  </div>
                </div>
              </button>
              </div>
            <p class="mb-2 text-gray-800">Alamat</p>
            <textarea id="input-alamat" name="Alamat" rows="4" type="text" data-rule="required"
              class="disabled:resize-none mb-2 block px-5 py-3 rounded-lg w-full bg-gray-200 disabled:text-gray-500 text-gray-800"></textarea>
          </div>
          <div class="flex justify-end items-center w-100 mt-4">
              <button role="button" disable id="add-data" class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Tambah Data</button>
            </div>
        </div>`,
      bg: 'bg-secondary',
    })

    const modal = document.getElementById('modal-tambah-data-siswa')
    this._addGenderOption = 'L'

    const _selectGenderOption = (optionButton, optionId) => {
      const selectedClass = 'mx-2 my-auto text-sm bg-secondary text-white p-1 rounded-lg'
      const nonSelectedClass = 'mx-2 my-auto text-sm bg-gray-200 text-gray-200 p-1 rounded-lg'
      optionButton.forEach((option) => {
        const optionIcon = option.querySelector('div[data-option]')
        if (option.id === optionId) {
          optionIcon.className = selectedClass
        } else {
          optionIcon.className = nonSelectedClass
        }
      })
      this._addGenderOption = optionId.replace('-option', '')[0].toUpperCase()
    }

    const confirmAddDataButton = document.getElementById('add-data')
    const editableForm = document.querySelectorAll('input[data-rule], textarea[data-rule]')
    const genderOptionButtons = document.querySelectorAll('#laki-option, #perempuan-option')
    const [nisn, nama, alamat] = editableForm

    formValidation.init({
      formInputs: editableForm,
      submitButton: confirmAddDataButton,
    })

    let genderId = ''
    genderId = 'laki-option'
    if (this._addGenderOption === 'P') genderId = 'perempuan-option'
    _selectGenderOption(genderOptionButtons, genderId)

    confirmAddDataButton.addEventListener('click', async () => {
      await Swal.fire({
        icon: 'warning',
        text: 'Tekan pilihan untuk mengkonfirmasi',
        title: 'Tambahkan Data?',
        showCancelButton: true,
        confirmButtonText: 'Tambah',
        cancelButtonText: 'Jangan',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await this._addData(nisn.value, nama.value, alamat.value, this._addGenderOption)
            modal.remove()
            this._renderDataTable()
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
    })

    genderOptionButtons.forEach((option) => {
      option.addEventListener('click', () => {
        _selectGenderOption(genderOptionButtons, option.id)
      })
    })
  },

  async _initEditProfile(nisn) {
    const element = /* html */`
        <div class="flex flex-col h-full mb-20 md:mb-0 md:max-w-screen-md lg:max-w-screen-xl mx-auto">
          <div class="text-center relative print:hidden">
            <button id="back-button" class="print:hidden -mt-4 w-max absolute left-0 text-secondary mx-1 p-4">
              <svg class="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
              </svg>
            </button>
            <p class="print:hidden text-xl leading-8 font-bold tracking-tight text-gray-800 md:text-2xl md:mt-2">
              Profil Siswa
            </p>
          </div>
          <div class="flex flex-col lg:flex-row">
            <div class="p-5 rounded-lg flex flex-row md:flex-col flex-1 md:mt-4">
              <div class="bg-gray-200 flex flex-1 flex-col white rounded-lg">
                <div class="preloader p-4 flex mt-auto mb-auto ml-auto mr-auto">
                  <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
                </div>
                <div id="account-form" class="hidden flex flex-col gap-4">
                  <div class="mx-auto mt-4 rounded-lg">
                    <div class="flex flex-col w-48 rounded-full text-white">
                      <img id="photo-profile" class="object-cover rounded-full w-full h-48 mx-auto"
                        alt="User Photo Profile" src="http://ui-avatars.com/api/background=fff&color=fff">
                      <div id="change-photo" class="disabled:cursor-default hidden flex flex-row">
                        <label for="file-upload"
                          class="p-3 mt-4 mr-1 ml-auto cursor-pointer w-max bg-secondary text-white mx-1 rounded-lg disabled:opacity-50">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                            </path>
                          </svg>
                        </label>
                        <input class="hidden" id="file-upload" type="file" accept="image/*">
                        <button id="delete-photo"
                          class="disabled:cursor-default p-3 mt-4 mr-auto ml-1 cursor-pointer w-max bg-secondary text-white mx-1 rounded-lg disabled:opacity-50">
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
                      <p class="mb-2 mt-4">Ubah Password</p>
                      <input id="input-password" name="Password" disabled value="" placeholder="Isi untnuk mengubah password..." type="password"
                        data-rule="required no-space digit-more-than-6"
                        class="editable block px-5 py-3 rounded-lg w-full bg-white disabled:text-gray-500">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-5 rounded-lg flex flex-col flex-1 md:mt-4">
              <div class="bg-gray-200 flex-col white rounded-lg">
                <div class="preloader justify-center p-4 flex mt-auto mb-auto ml-auto mr-auto">
                  <div class="loader admin loader-mini ease-linear rounded-full border-8 border-t-8 border-gray-200"></div>
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
                  class="w-max bg-secondary text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Edit Profil</button>
                <button id="discard-button"
                  class="hidden w-max bg-failed text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Batalkan</button>
                <button id="confirm-button"
                  class="hidden w-max bg-success text-white mx-1 py-3 px-8 rounded-lg disabled:opacity-50">Selesai</button>
              </div>
            </div>
          </div>
        </div>
  `

    this._pageContent.innerHTML = element
    this._accountInput = ''
    this._profileInput = ''

    const backButton = document.getElementById('back-button')
    const user = await this._getProfileData(nisn)
    const allInputForms = document.querySelectorAll('[id^="input"]')
    const photoProfile = document.getElementById('photo-profile')
    backButton.addEventListener('click', () => {
      this._renderAccountTable()
    })
    allInputForms.forEach((input) => {
      const inputValue = input.id.replace('input-', '')
      if (inputValue !== 'password') input.value = user[inputValue]
    })

    photoProfile.src = user.url_foto || `http://ui-avatars.com/api/?name=${user.nama}&background=fff`
    this._initializeProfile()
  },

  async _initializeProfile() {
    // Remove Preloders
    const preloaders = document.querySelectorAll('.preloader')
    const profileForm = document.getElementById('profile-form')
    const accountForm = document.getElementById('account-form')

    // Buttons
    const editButton = document.getElementById('edit-button')
    const discardButton = document.getElementById('discard-button')
    const confirmButton = document.getElementById('confirm-button')

    // Photos
    let newPhoto = ''
    const photoContainer = document.getElementById('change-photo')
    const photoProfile = document.getElementById('photo-profile')
    const deletePhotoButton = document.getElementById('delete-photo')
    const photoUploadButton = document.getElementById('file-upload')

    // Inputs
    const nisn = document.getElementById('input-nisn').value
    const editableForm = document.querySelectorAll('input[data-rule]')
    const [email, password, nomorTelepon] = editableForm

    // Input Temp
    const photoProfileTemp = photoProfile.src
    const emailTemp = email.value
    const nomorTeleponTemp = nomorTelepon.value

    if (photoProfileTemp.includes('ui-avatars.com')) deletePhotoButton.disabled = true

    const toggleEditable = (option) => {
      if (option) {
        editButton.classList.add('hidden')
        discardButton.classList.remove('hidden')
        confirmButton.classList.remove('hidden')
        photoContainer.classList.remove('hidden')
      } else {
        editButton.classList.remove('hidden')
        discardButton.classList.add('hidden')
        confirmButton.classList.add('hidden')
        photoContainer.classList.add('hidden')
      }
    }

    // Events
    editButton.addEventListener('click', () => {
      editableForm.forEach((input) => {
        input.disabled = false
        toggleEditable(true)
      })
    })

    confirmButton.addEventListener('click', async () => {
      const result = await Swal.fire({
        icon: 'warning',
        text: 'Tekan pilihan untuk mengkonfirmasi',
        title: 'Ubah Profil?',
        showCancelButton: true,
        confirmButtonText: 'Ubah',
        cancelButtonText: 'Jangan',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await this._updateProfile(nisn, email.value, password.value, nomorTelepon.value, newPhoto, photoProfileTemp)
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
        Swal.fire({
          icon: 'success',
          text: 'Tekan tutup untuk menutup popup',
          title: 'Profil berhasil diubah',
          confirmButtonText: 'Tutup',
          customClass: {
            popup: 'popup-sweetalert',
            confirmButton: 'btn-sweetalert bg-secondary',
          },
          buttonsStyling: false,
        })
        this._initEditProfile(nisn)
      }
    })

    discardButton.addEventListener('click', () => {
      const elementAlerts = document.querySelectorAll('span[id*="-alert"]')
      if (elementAlerts.length > 0) {
        elementAlerts.forEach((element) => {
          element.remove()
        })
      } else if (elementAlerts.length !== 0) {
        elementAlerts.remove()
      }
      photoProfile.src = photoProfileTemp
      email.value = emailTemp
      password.value = ''
      nomorTelepon.value = nomorTeleponTemp
      if (photoProfileTemp.includes('ui-avatars.com')) deletePhotoButton.disabled = true

      editableForm.forEach((input) => {
        input.classList.remove('border-red-500', 'border-opacity-50', 'focus:border-red-500', 'border-green-500', 'border-opacity-50', 'focus:border-green-500')
        input.disabled = true
        toggleEditable(false)
      })
    })

    photoUploadButton.addEventListener('change', async (event) => {
      // eslint-disable-next-line prefer-destructuring
      newPhoto = event.target.files[0]
      const reader = new FileReader()
      photoProfile.title = newPhoto.name

      reader.onload = (e) => {
        photoProfile.src = e.target.result
      }
      reader.readAsDataURL(newPhoto)
      deletePhotoButton.disabled = false
    })
    deletePhotoButton.addEventListener('click', () => {
      newPhoto = 'default'
      photoProfile.src = `http://ui-avatars.com/api/?name=${emailTemp}&background=fff`
      deletePhotoButton.disabled = true
    })

    formValidation.init({
      formInputs: editableForm,
      submitButton: confirmButton,
      isEdit: true,
    })

    // Remove preloader
    profileForm.classList.remove('hidden')
    accountForm.classList.remove('hidden')
    preloaders.forEach((preloader) => {
      preloader.remove()
    })
  },

  async _getProfileData(id) {
    const profileDataArray = []
    profileDataArray.push(await APIData.getAkunSiswa(id))
    profileDataArray.push(await APIData.getProfilSiswa(id))
    profileDataArray.push(await APIData.getDataSiswa(id))

    const profileData = {}
    profileDataArray.forEach((data) => {
      Object.assign(profileData, data)
    })

    return profileData
  },

  // eslint-disable-next-line camelcase
  async _updateProfile(nisn, email, password, noTelepon, newPhoto, photoProfileTemp) {
    try {
      const newData = {
        email,
        no_telepon: noTelepon,
        url_foto: photoProfileTemp,
      }

      if (password !== '') newData.password = password

      if (newPhoto !== '') {
        if (photoProfileTemp !== '' && !(photoProfileTemp.includes('ui-avatars.com'))) {
          await APIData.deleteFile(photoProfileTemp)
        }
        if (newPhoto === 'default') {
          newData.url_foto = ''
        } else {
          const photo = await APIData.uploadFile(newPhoto)
          newData.url_foto = photo.url
        }
      }

      const response = await APIData.updateAkunSiswa(nisn, newData)
      console.log(response)
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'Periksa internet kamu dan coba lagi',
        title: 'Terjadi Kesalahan',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    }
  },

  // eslint-disable-next-line camelcase
  async _updateData(nisn, nama, alamat, jenis_kelamin) {
    try {
      const newData = {
        nisn,
        nama,
        alamat,
        jenis_kelamin,
      }

      const response = await APIData.updateDataSiswa(nisn, newData)
      console.log(response)

      Swal.fire({
        icon: 'success',
        text: 'Tekan tutup untuk menutup popup',
        title: 'Data Berhasil diubah',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        text: 'Periksa internet kamu dan coba lagi',
        title: 'Terjadi kesalahan',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    }
  },

  // eslint-disable-next-line camelcase
  async _addData(nisn, nama, alamat, jenis_kelamin) {
    try {
      const newData = {
        nisn,
        nama,
        alamat,
        jenis_kelamin,
      }

      const response = await APIData.createDataSiswa(newData)
      console.log(response)

      Swal.fire({
        icon: response.status,
        text: response.message,
        title: response.title,
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    } catch (error) {
      console.log(error)
      await Swal.fire({
        icon: 'error',
        text: 'Periksa internet kamu dan coba lagi',
        title: 'Terjadi kesalahan',
        confirmButtonText: 'Tutup',
        customClass: {
          popup: 'popup-sweetalert',
          confirmButton: 'btn-sweetalert bg-secondary',
        },
        buttonsStyling: false,
      })
    }
  },
}

export default DataList
