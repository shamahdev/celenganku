const API_ENDPOINT = {
  TOKEN: 'api/token',
  MIDTRANS: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
  SISWA: {
    LIST: 'api/siswa',
    LOGIN: 'api/siswa/login',
    REGISTER: 'api/siswa/register',
    LIST_DATA: 'api/siswa/data',
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
