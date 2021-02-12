/* eslint-disable camelcase */
import BaseController from './base-controller'
import { db } from '../global/firebase'

const Transaction = db.collection('transaksi')
const TransactionController = {
  getTransactionById: BaseController.getOne(Transaction),
  getTransactionByNisn: async (req, res, next) => {
    console.log(req.params)
    try {
      const snapshot = await Transaction.where('nisn', '==', req.params.id).get()
      if (snapshot.empty) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'No transaction found from that user id',
          response: req.params,
        })
      }
      const transactionData = []
      snapshot.forEach((doc) => {
        transactionData.push(doc.data())
      })

      res.status(200).json({
        status: 'success',
        error: false,
        transactionData,
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      // res.status(502).json({
      //   status: 'success',
      //   error: true,
      //   response: error,
      // })
    }
  },
}

export default TransactionController
