/* eslint-disable camelcase */
import * as firebase from 'firebase/app'
import BaseController from './base-controller'
import { db } from '../global/firebase'

const Transaction = db.collection('transaksi')
const TransactionController = {
  getTransactionById: BaseController.getOne(Transaction),
  deleteTransactionById: BaseController.deleteOne(Transaction),
  getTransactionByNisn: async (req, res, next) => {
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
      res.status(502).json({
        status: 'failed',
        error: true,
        response: error,
      })
    }
  },
  createTransaction: async (req, res, next) => {
    try {
      const {
        nominal, metode_pembayaran, jenis_transaksi, nisn,
      } = req.body

      // Check if req.body is not empty
      if (!nominal || !metode_pembayaran || !jenis_transaksi || !nisn) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Something wrong when creating a transaction',
          response: req.body,
        })
      }

      const metodeLetter = metode_pembayaran[0].toUpperCase()
      let jenisLetter = ''
      if (jenis_transaksi === 'pemasukan') jenisLetter = 'D'
      else jenisLetter = 'W'

      const allTransaction = []
      const snapshot = await Transaction.get()
      snapshot.forEach((doc) => {
        allTransaction.push(doc.data())
      })

      const allTransactionId = []
      allTransaction.forEach((transaction) => {
        allTransactionId.push(transaction.id_transaksi)
      })

      let generatedNumber = Math.floor(1000000 + Math.random() * 9000000)
      let id_transaksi = `T${jenisLetter + metodeLetter + generatedNumber.toString()}`
      while (allTransactionId.includes(id_transaksi)) {
        generatedNumber = Math.floor(1000000 + Math.random() * 9000000)
        id_transaksi = `T${jenisLetter + metodeLetter + generatedNumber.toString()}`
      }

      const dateCreated = new Date()
      dateCreated.setDate(dateCreated.getDate() + 1)
      const time = firebase.firestore.Timestamp.fromDate(dateCreated)
      const transactionResponse = {
        id_transaksi,
        nominal,
        metode_pembayaran,
        jenis_transaksi,
        nisn,
        status_transaksi: 'pembayaran',
        tenggat_waktu_pembayaran: time,
        token: '',
      }

      await Transaction.doc(id_transaksi).set(transactionResponse)

      res.status(200).json({
        status: 'success',
        error: false,
        response: {
          ...transactionResponse,
        },
      })
    } catch (error) {
      console.log(error)
      res.status(502).json({
        status: 'failed',
        error: true,
        response: error,
      })
    }
  },

  updateTransaction: async (req, res, next) => {
    try {
      const { token, status_transaksi } = req.body
      const id_transaksi = req.params.id

      const transaction = await Transaction.doc(id_transaksi).get()
      if (!transaction.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Transaction with this ID doesn\'t exist',
          response: req.body,
        })
      }

      const transactionData = transaction.data()

      const updateData = {
        status_transaksi: status_transaksi || transactionData.status_transaksi,
        token: token || transactionData.token,
      }

      // Check for existed document
      await Transaction.doc(id_transaksi).update({
        status_transaksi: updateData.status_transaksi,
        token: updateData.token,
      })

      res.status(200).json({
        status: 'success',
        error: false,
        response: req.body,
      })
      return { success: true }
    } catch (error) {
      console.log(error)
      res.status(502).json({
        status: 'failed',
        error: true,
        response: error,
      })
    }
  },
}

export default TransactionController
