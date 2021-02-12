import express from 'express'
import multer from 'multer'
import bodyParser from 'body-parser'
import AuthController from '../controllers/auth-controller'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})
const appRoutes = express.Router()

appRoutes.use(bodyParser.json())

// appRoutes.use(AuthController.requireAuth)

appRoutes.get('/token', AuthController.retrieveToken)
appRoutes.post('/upload', upload.single('avatar'), AuthController.uploadFile)
appRoutes.post('/delete', AuthController.deleteFile)
appRoutes.use('/logout', AuthController.logout)

export default appRoutes
