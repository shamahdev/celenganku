import formValidation from '../../../helper/form-validation'

const Process = {
  async render() {
    return `
          <div class="hidden md:block text-center">
            <p class="text-xl leading-8 font-normal tracking-tight text-gray-900 md:text-3xl md:mt-2">
              Proses Transaksi Siswa
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-xl text-center md:text-left md:text-2xl mt-4 md:mt-6">Masukkan Kode Transaksi</p>
            <div class="flex flex-row mt-4 ml-auto mr-auto md:ml-0 md:mr-0">
              <div class="flex flex-col w-40 mr-2">
                <input id="transaction-code" name="Kode Transaksi" data-rule="required no-space number-must-6" value=""
                  type="number" class="mb-2 text-md block px-5 py-3 text-2xl h-16 rounded-lg bg-gray-200">
              </div>
              <button data-submit="/user/register" disabled id="process-button"
                class="w-max bg-primary text-white mx-1 font-light py-3 px-6 text-xl h-16 rounded-lg disabled:opacity-50 disabled:cursor-default">Proses</button>
            </div>
            <p class="mt-8 md:mt-10 lg:mt-10 text-xl text-center md:text-left md:text-2xl">Riwayat Transaksi Admin
            </p>
            <div class="bg-gray-200 gap-4 p-4 rounded-lg flex flex-col mt-6 md:p-8">
              <div class="flex-1 py-0 white rounded-lg">
                <div class="flex items-center">
                  <div class="font-bold text-lg text-gray-900 flex flex-row flex-1">
                    <p class="flex-1">Nama</p>
                    <p class="flex-1 hidden md:block">Jenis</p>
                    <p class="flex-1">Nominal</p>
                    <p class="flex-1 hidden md:block">Tanggal</p>
                    <a class="ml-auto h-6 w-6 text-transparent">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <button
                class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
                <div class="flex items-center">
                  <div class="flex flex-row flex-1">
                    <p class="flex-1 font-bold">Shaddam Amru</p>
                    <p class="flex-1 hidden md:block">Penarikan</p>
                    <p class="flex-1 font-bold text-red-500">Rp 80.000</p>
                    <p class="flex-1 hidden md:block">17 September 2020</p>
                    <a class="ml-auto h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </button>
              <button
                class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
                <div class="flex items-center">
                  <div class="flex flex-row flex-1">
                    <p class="flex-1 font-bold">Turyadi Kevin</p>
                    <p class="flex-1 hidden md:block">Pemasukan</p>
                    <p class="flex-1 font-bold text-green-500">Rp 800.000</p>
                    <p class="flex-1 hidden md:block">17 September 2020</p>
                    <a class="ml-auto h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </button>
              <button
                class="text-left bg-white flex-1 p-5 white rounded-lg hover:shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-in-out">
                <div class="flex items-center">
                  <div class="flex flex-row flex-1">
                    <p class="flex-1 font-bold">Dede Haryanto</p>
                    <p class="flex-1 hidden md:block">Penarikan</p>
                    <p class="flex-1 font-bold text-red-500">Rp 65.000</p>
                    <p class="flex-1 hidden md:block">17 September 2020</p>
                    <a class="ml-auto h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </button>
            </div>
          </div>
        `
  },

  async afterRender() {
    const transcationCodeInput = document.getElementById('transaction-code')
    const processButton = document.getElementById('process-button')

    formValidation.init({
      formInputs: transcationCodeInput,
      submitButton: processButton,
    })
  },
}

export default Process
