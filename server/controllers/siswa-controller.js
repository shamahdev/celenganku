/* eslint-disable camelcase */
import BaseController from './base-controller'
import siswa from '../models/siswa-model'

const siswaController = {
  getAllSiswaData: BaseController.getAll(siswa.data),
  getAllAkunSiswa: BaseController.getAll(siswa.akun),
  getDataSiswa: BaseController.getOne(siswa.data),
  getProfilSiswa: BaseController.getOne(siswa.profil),
  getAkunSiswa: BaseController.getOne(siswa.akun),
  deleteAkunSiswa: BaseController.deleteOne(siswa.akun, siswa.profil),
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
      const data = await siswa.data.doc(nisn).get()
      if (!data.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'This NISN isn\'t registered',
          response: req.body,
        })
      }
      // Check for existed document
      const account = await siswa.akun.doc(nisn).get()
      if (account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this NISN already exist',
          response: req.body,
        })
      }

      await siswa.akun.doc(nisn).set({
        nisn,
        email,
        password,
        saldo: 0,
      })

      await siswa.profil.doc(nisn).set({
        nisn,
        no_telepon: no_telepon || '',
        url_foto: url_foto || '',
      })

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

      const account = await siswa.akun.doc(nisn).get()
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

      // Check if req.body is not empty
      if (!updateData.email || !updateData.password) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Please provide Email, or password',
          response: req.body,
        })
      }

      // Check for existed document
      await siswa.akun.doc(nisn).update({
        email: updateData.email,
        password: updateData.password,
      })

      await siswa.profil.doc(nisn).set({
        no_telepon: updateData.no_telepon || '',
        url_foto: updateData.url_foto || '',
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

export default siswaController
