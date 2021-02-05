import 'firebase/firestore'
import express from 'express'
import bodyParser from 'body-parser'
import siswaController from '../controllers/siswaController'
import authController from '../controllers/authController'

const siswaRoutes = express.Router()

siswaRoutes.use(bodyParser.json())

siswaRoutes.post('/register', authController.register)

siswaRoutes.route('/')
  .get(siswaController.getAllAkunSiswa)

siswaRoutes.route('/:id')
  .get(siswaController.getAkunSiswa)

siswaRoutes.route('/:id/profil')
  .get(siswaController.getProfilSiswa)

export default siswaRoutes
