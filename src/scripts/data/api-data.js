/* eslint-disable quote-props */
import JWTParser from '../helper/jwtparser'
import API_ENDPOINT from '../global/endpoint'

class APIData {
  static async retrieveUser() {
    try {
      const response = await fetch(API_ENDPOINT.TOKEN)
      let token = await response.json()
      token = await JWTParser(token.response)
      return token
    } catch (error) {
      return {
        id: null,
        role: 'unauthorized',
        error: true,
        message: error,
      }
    }
  }

  static async loginAdmin(loginData) {
    try {
      const response = await fetch(API_ENDPOINT.ADMIN.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      return response.json()
    } catch (error) {
      return {
        status: 'error',
        message: error,
      }
    }
  }

  static async loginUser(loginData) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
      return response.json()
    } catch (error) {
      return {
        status: 'error',
        message: error,
      }
    }
  }

  static async registerUser(registerData) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })
      return response.json()
    } catch (error) {
      return {
        error: true,
        message: error,
      }
    }
  }

  static async getMidtransToken(transactionDetails) {
    try {
      const SERVER_KEY = 'SB-Mid-server-XmFoI8_j9MpEyaNvbE1-sQiN:'
      const AUTH_STRING = btoa(SERVER_KEY)

      const response = await fetch(API_ENDPOINT.MIDTRANS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${AUTH_STRING}`,
        },
        body: JSON.stringify(transactionDetails),
      })
      return response.json()
    } catch (err) {
      return err
    }
  }

  static async createTransaction(transactionData) {
    try {
      const response = await fetch(API_ENDPOINT.TRANSAKSI.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })
      return response.json()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  static async updateTransaction(id, transactionData) {
    try {
      const response = await fetch(API_ENDPOINT.TRANSAKSI.ID(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      })
      return response.json()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  static async uploadFile(file) {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      console.log(formData)

      const response = await fetch(API_ENDPOINT.UPLOAD_FILE, {
        method: 'POST',
        body: formData,
      })
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async deleteFile(url) {
    try {
      const first = url.search('%2F')
      const end = url.search('alt')
      const fileName = url.slice(first + 3, end - 1)
      const fileData = {
        url,
        name: fileName,
      }

      const response = await fetch(API_ENDPOINT.DELETE_FILE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fileData),
      })
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getAllSiswaData() {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.LIST_DATA)
      const responseJson = await response.json()
      return responseJson.restaurants
    } catch (err) {
      return {}
    }
  }

  static async getAllAkunSiswa() {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.LIST)
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getDataSiswa(id) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.DATA(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getProfilSiswa(id) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.PROFIL(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getAkunSiswa(id) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.AKUN(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async updateSaldo(id, saldo, jenis) {
    const saldoObject = {
      saldo,
      jenis,
    }
    try {
      const response = await fetch(API_ENDPOINT.SISWA.SALDO(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saldoObject),
      })
      return response.json()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  static async getTransaksiSiswa(id) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.TRANSAKSI(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getTransaksiAdmin(id) {
    try {
      const response = await fetch(API_ENDPOINT.ADMIN.TRANSAKSI(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getTransaction(id) {
    try {
      const response = await fetch(API_ENDPOINT.TRANSAKSI.ID(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async deleteTransaksiSiswa(id) {
    try {
      const response = await fetch(API_ENDPOINT.TRANSAKSI.ID(id), {
        method: 'DELETE',
      })
      return response.json()
    } catch (err) {
      return err
    }
  }

  static async updateAkunSiswa(id, newData) {
    try {
      const response = await fetch(API_ENDPOINT.SISWA.AKUN(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })
      return response.json()
    } catch (err) {
      return {}
    }
  }

  static async getAdmin(id) {
    try {
      const response = await fetch(API_ENDPOINT.ADMIN.ID(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }
}

export default APIData
