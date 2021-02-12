import express from 'express'
import bodyParser from 'body-parser'
import TransactionController from '../controllers/transaction-controller'
import AuthController from '../controllers/auth-controller'

const transactionRoutes = express.Router()

transactionRoutes.use(bodyParser.json())

// transactionRoutes.use(AuthController.requireAuth)

transactionRoutes.route('/:id')
  .get(TransactionController.getTransactionById)
transactionRoutes.route('/nisn/:id')
  .get(TransactionController.getTransactionByNisn)

export default transactionRoutes
