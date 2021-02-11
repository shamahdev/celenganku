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
      const response = await fetch(API_ENDPOINT.ADMIN(id))
      return response.json()
    } catch (err) {
      return {}
    }
  }
}

export default APIData
