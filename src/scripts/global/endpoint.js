const API_ENDPOINT = {
  SISWA: {
    LIST: 'api/siswa/',
    LIST_DATA: 'api/siswa/data',
    AKUN: (id) => `api/siswa/${id}`,
    DATA: (id) => `api/siswa/${id}/data`,
    PROFIL: (id) => `api/siswa/${id}/profil`,
  },
  ADMIN: (id) => `api/admin/${id}`,
}

export default API_ENDPOINT
