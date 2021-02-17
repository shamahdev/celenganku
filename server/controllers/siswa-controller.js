/* eslint-disable camelcase */
import BaseController from './base-controller'
import Siswa from '../models/siswa-model'

const SiswaController = {
  getAllSiswaData: BaseController.getAll(Siswa.data),
  getAllAkunSiswa: BaseController.getAll(Siswa.akun),
  getDataSiswa: BaseController.getOne(Siswa.data),
  getProfilSiswa: BaseController.getOne(Siswa.profil),
  getAkunSiswa: BaseController.getOne(Siswa.akun),
  deleteAkunSiswa: BaseController.deleteOne(Siswa.akun, Siswa.profil),
  createAkunSiswa: async (req, res, next) => {
    try {
      const {
        nisn, email, password, no_telepon, url_foto,
      } = req.body

      // Check if req.body is not empty
      if (!nisn || !email || !password) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Please provide NISN, Email, or password',
          response: req.body,
        })
      }

      // Check if NISN is registered
      const data = await Siswa.data.doc(nisn).get()
      if (!data.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'This NISN isn\'t registered',
          response: req.body,
        })
      }
      // Check for existed document
      const account = await Siswa.akun.doc(nisn).get()
      if (account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this NISN already exist',
          response: req.body,
        })
      }

      await Siswa.akun.doc(nisn).set({
        nisn,
        email,
        password,
        saldo: 0,
      })

      await Siswa.profil.doc(nisn).set({
        nisn,
        no_telepon: no_telepon || '',
        url_foto: url_foto || '',
      })

      req.body.password = undefined

      res.status(200).json({
        status: 'success',
        error: false,
        response: req.body,
      })
      return {
        ...req.body,
        error: false,
      }
    } catch (error) {
      console.log(error)
      res.status(502).json({
        status: 'success',
        error: true,
        response: error,
      })
    }
  },
  updateAkunSiswa: async (req, res, next) => {
    try {
      const nisn = req.params.id

      const account = await Siswa.akun.doc(nisn).get()
      if (!account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this NISN doesn\'t exist',
          response: req.body,
        })
      }

      const accountData = account.data()

      const updateData = {
        email: req.body.email || accountData.email,
        password: req.body.password || accountData.password,
        no_telepon: req.body.no_telepon || accountData.no_telepon,
        url_foto: req.body.url_foto || accountData.url_foto,
      }

      // Check for existed document
      await Siswa.akun.doc(nisn).update({
        email: updateData.email,
        password: updateData.password,
      })

      await Siswa.profil.doc(nisn).set({
        no_telepon: updateData.no_telepon || '',
        url_foto: updateData.url_foto || '',
      })

      req.body.password = undefined

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
  updateSaldoSiswa: async (req, res, next) => {
    try {
      const nisn = req.params.id

      const account = await Siswa.akun.doc(nisn).get()
      if (!account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this NISN doesn\'t exist',
          response: req.body,
        })
      }
      const accountData = account.data()
      const { saldo, jenis } = req.body

      let newSaldo = 0
      if (jenis === 'pemasukan') newSaldo = +accountData.saldo + +saldo
      else newSaldo = +accountData.saldo - +saldo

      // Check for existed document
      await Siswa.akun.doc(nisn).update({
        saldo: newSaldo,
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

export default SiswaController
