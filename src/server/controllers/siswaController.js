import global from './globalController'
import siswa from '../models/siswaModel'

const siswaController = {
  getAllSiswaData: global.getAll(siswa.data),
  getAllAkunSiswa: global.getAll(siswa.akun),
  getAkunSiswa: global.getOne(siswa.akun),
  getProfilSiswa: global.getOne(siswa.profil),
}

export default siswaController

// exports.deleteMe = async (req, res, next) => {
//   try {
//     await User.findByIdAndUpdate(req.user.id, {
//       active: false,
//     })

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

// exports.getAllUsers = global.getAll(User)
// exports.getUser = global.getOne(User)

// // Don't update password on this
// exports.updateUser = global.updateOne(User)
// exports.deleteUser = global.deleteOne(User)
