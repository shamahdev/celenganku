const API_ENDPOINT = {
  TOKEN: 'api/token/',
  MIDTRANS: 'https://cors-anywhere.herokuapp.com/https://app.sandbox.midtrans.com/snap/v1/transactions',
  SISWA: {
    LIST: 'api/siswa/',
    LIST_DATA: 'api/siswa/data',
    AKUN: (id) => `api/siswa/${id}`,
    DATA: (id) => `api/siswa/${id}/data`,
    PROFIL: (id) => `api/siswa/${id}/profil`,
    TRANSAKSI: (id) => `api/transaction/nisn/${id}`,

  },
  ADMIN: (id) => `api/admin/${id}`,
  UPLOAD_FILE: 'api/upload',
  DELETE_FILE: 'api/delete',
}

export default API_ENDPOINT
