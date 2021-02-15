/* eslint-disable camelcase */
import midtransClient from 'midtrans-client'
import BaseController from './base-controller'
import { db } from '../global/firebase'
import CONFIG from '../global/config'

const Transaction = db.collection('transaksi')
const TransactionController = {
  getMidtransToken: async (req, res, next) => {
    const data = `${CONFIG.MIDTRANS_SERVER_KEY}:`
    const base64data = Buffer.from(data).toString('base64')
    res.status(200).json({
      status: 'success',
      error: false,
      response: base64data,
    })
    // const snap = new midtransClient.Snap({
    //   isProduction: false,
    //   serverKey: CONFIG.MIDTRANS_SERVER_KEY,
    //   clientKey: CONFIG.MIDTRANS_CLIENT_KEY,
    // })

    // // prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
    // const parameter = {
    //   transaction_details: {
    //     order_id: req.params.id,
    //     gross_amount: 1,
    //   },
    //   credit_card: {
    //     secure: true,
    //   },
    // }

    // // create transaction
    // snap.createTransaction(parameter)
    //   .then((transaction) => {
    //     // transaction token
    //     const transactionToken = transaction.token
    //     console.log('transactionToken:', transactionToken)

    //     // transaction redirect url
    //     const transactionRedirectUrl = transaction.redirect_url
    //     console.log('transactionRedirectUrl:', transactionRedirectUrl)

    //     res.status(201).json({
    //       status: 'success',
    //       error: false,
    //       token: transactionToken,
    //       redirect_url: transactionRedirectUrl,
    //     })
    //   })
    //   .catch((e) => {
    //     console.log('Error occured:', e.message)
    //   })
  },
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
        results: transactionData.length,
        data: transactionData,
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
