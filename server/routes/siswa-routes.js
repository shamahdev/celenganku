import express from 'express'
import bodyParser from 'body-parser'
import SiswaController from '../controllers/siswa-controller'
import AuthController from '../controllers/auth-controller'

const siswaRoutes = express.Router()

siswaRoutes.use(bodyParser.json())

siswaRoutes.post('/login', AuthController.login)
siswaRoutes.post('/register', AuthController.register)

siswaRoutes.use(AuthController.requireAuth)

siswaRoutes.route('/')
  .get(SiswaController.getAllAkunSiswa)

siswaRoutes.route('/data')
  .get(SiswaController.getDataSiswa)

siswaRoutes.route('/:id')
  .get(SiswaController.getAkunSiswa)
  .patch(SiswaController.updateAkunSiswa)
  .delete(SiswaController.deleteAkunSiswa)

siswaRoutes.route('/:id/profil')
  .get(SiswaController.getProfilSiswa)

siswaRoutes.route('/:id/data')
  .get(SiswaController.getDataSiswa)

export default siswaRoutes
