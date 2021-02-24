import express from 'express'
import bodyParser from 'body-parser'
import TransactionController from '../controllers/transaction-controller'

const transactionRoutes = express.Router()
transactionRoutes.use(bodyParser.json())

// transactionRoutes.use(AuthController.requireAuth)
transactionRoutes.route('/finish')
  .get(TransactionController.finishPayment)
transactionRoutes.route('/create')
  .post(TransactionController.createTransaction)
transactionRoutes.route('/:id')
  .get(TransactionController.getTransactionById)
  .patch(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransactionById)
transactionRoutes.route('/nisn/:id')
  .get(TransactionController.getTransactionByNisn)
transactionRoutes.route('/admin/:id')
  .get(TransactionController.getTransactionByAdmin)

export default transactionRoutes
