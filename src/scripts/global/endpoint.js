const API_ENDPOINT = {
  TOKEN: 'api/token',
  MIDTRANS: 'https://cors-dimana-saja.herokuapp.com/https://app.sandbox.midtrans.com/snap/v1/transactions',
  SISWA: {
    LIST: 'api/siswa',
    LIST_DATA: 'api/siswa/data',
    IMPORT_DATA: 'api/siswa/data/import',
    LIST_PROFIL: 'api/siswa/profil',
    LOGIN: 'api/siswa/login',
    REGISTER: 'api/siswa/register',
    AKUN: (id) => `api/siswa/${id}`,
    DATA: (id) => `api/siswa/${id}/data`,
    PROFIL: (id) => `api/siswa/${id}/profil`,
    SALDO: (id) => `api/siswa/${id}/saldo`,
    TRANSAKSI: (id) => `api/transaction/nisn/${id}`,
  },

  TRANSAKSI: {
    ID: (id) => `api/transaction/${id}`,
    CREATE: 'api/transaction/create',
  },
  ADMIN: {
    ID: (id) => `api/admin/${id}`,
    LOGIN: 'api/admin/login',
    TRANSAKSI: (id) => `api/transaction/admin/${id}`,
  },
  UPLOAD_FILE: 'api/upload',
  DELETE_FILE: 'api/delete',
}

export default API_ENDPOINT
