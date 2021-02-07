import express from 'express'
import bodyParser from 'body-parser'
import siswaController from '../controllers/siswa-controller'
import authController from '../controllers/auth-controller'

const siswaRoutes = express.Router()

siswaRoutes.use(bodyParser.json())

siswaRoutes.post('/login', authController.login)
siswaRoutes.post('/register', authController.register)

siswaRoutes.use(authController.requireAuth)

siswaRoutes.route('/')
  .get(siswaController.getAllAkunSiswa)

siswaRoutes.route('/:id')
  .get(siswaController.getAkunSiswa)
  .patch(siswaController.updateAkunSiswa)
  .delete(siswaController.deleteAkunSiswa)

siswaRoutes.route('/:id/profil')
  .get(siswaController.getProfilSiswa)

siswaRoutes.route('/:id/data')
  .get(siswaController.getDataSiswa)

export default siswaRoutes
