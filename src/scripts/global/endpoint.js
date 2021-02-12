const API_ENDPOINT = {
  TOKEN: 'api/token/',
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
