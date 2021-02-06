import express from 'express'
import bodyParser from 'body-parser'
import siswaController from '../controllers/siswaController'
import authController from '../controllers/authController'

const siswaRoutes = express.Router()

siswaRoutes.use(bodyParser.json())

siswaRoutes.post('/login', authController.login)
siswaRoutes.post('/register', authController.register)

siswaRoutes.use(authController.authenticateToken)

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
