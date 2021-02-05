import db from '../global/firebase'

const siswa = {
  data: db.collection('data_siswa'),
  akun: db.collection('akun_siswa'),
  profil: db.collection('profil_siswa'),
}

export default siswa
