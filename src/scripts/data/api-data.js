import JWTParser from '../helper/jwtparser'
import API_ENDPOINT from '../global/endpoint'

class APIData {
  static async retrieveUser() {
    try {
      const response = await fetch('/token')
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

  static async getAdmin(id) {
    try {
      const response = await fetch(API_ENDPOINT.ADMIN(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }
}

export default APIData
