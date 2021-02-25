/* eslint-disable camelcase */
import * as firebase from 'firebase/app'
import BaseController from './base-controller'
import Siswa from '../models/siswa-model'
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
  getTransactionByAdmin: async (req, res, next) => {
    try {
      const snapshot = await Transaction.where('id_admin', '==', req.params.id).get()
      if (snapshot.empty) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'No transaction found from that admin id',
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
        nominal, metode_pembayaran, jenis_transaksi, nisn, id_admin,
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
        id_admin,
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
      const { id_admin, token, status_transaksi } = req.body
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

      await Transaction.doc(id_transaksi).update({
        id_admin: id_admin || transactionData.id_admin,
        token: token || transactionData.token,
        status_transaksi: status_transaksi || transactionData.status_transaksi,
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

  finishPayment: async (req, res) => {
    try {
      const transactionId = req.query.order_id || ''

      if (transactionId !== '') {
        const response = await Transaction.doc(transactionId).get()
        const transaction = response.data()

        await Transaction.doc(transactionId).update({
          status_transaksi: 'selesai',
        })

        const account = await Siswa.akun.doc(transaction.nisn).get()
        const accountData = account.data()
        const { nominal, jenis_transaksi } = transaction

        let newSaldo = 0
        if (jenis_transaksi === 'pemasukan') newSaldo = +accountData.saldo + +nominal
        else newSaldo = +accountData.saldo - +nominal

        // Check for existed document
        await Siswa.akun.doc(transaction.nisn).update({
          saldo: newSaldo,
        })
        res.redirect('/')
      } else {
        res.redirect('/')
      }
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
