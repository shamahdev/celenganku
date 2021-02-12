import express from 'express'
import bodyParser from 'body-parser'
import AdminController from '../controllers/admin-controller'
import AuthController from '../controllers/auth-controller'

const adminRoutes = express.Router()

adminRoutes.use(bodyParser.json())

adminRoutes.post('/login', AuthController.adminLogin)

// adminRoutes.use(AuthController.requireAuth)

adminRoutes.route('/')
  .get(AdminController.getAdmin)

adminRoutes.route('/:id')
  .patch(AdminController.updateAdmin)
  .delete(AdminController.deleteAdmin)

export default adminRoutes
