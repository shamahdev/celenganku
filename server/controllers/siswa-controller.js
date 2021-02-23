/* eslint-disable camelcase */
import BaseController from './base-controller'
import Siswa from '../models/siswa-model'
import { db } from '../global/firebase'

const SiswaController = {
  getAllSiswaData: BaseController.getAll(Siswa.data),
  getAllAkunSiswa: BaseController.getAll(Siswa.akun),
  getAllProfilSiswa: BaseController.getAll(Siswa.profil),
  getDataSiswa: BaseController.getOne(Siswa.data),
  getProfilSiswa: BaseController.getOne(Siswa.profil),
  getAkunSiswa: BaseController.getOne(Siswa.akun),
  deleteAkunSiswa: BaseController.deleteOne(Siswa.akun, Siswa.profil, 'transaksi'),
  deleteDataSiswa: BaseController.deleteOne(Siswa.akun, Siswa.profil, Siswa.data, 'transaksi'),
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
          title: 'Daftar Gagal',
          message: 'Please provide NISN, Email, or password',
          response: req.body,
        })
      }

      // Check if NISN is registered
      const data = await Siswa.data.doc(nisn).get()
      if (!data.exists) {
        res.status(401).json({
          status: 'error',
          error: true,
          title: 'Registrasi Gagal',
          message: 'NISN tidak valid atau belum terdaftar',
          response: req.body,
        })
      } else {
        // Check for existed document
        const account = await Siswa.akun.doc(nisn).get()
        if (account.exists) {
          res.status(401).json({
            status: 'error',
            error: true,
            title: 'Registrasi Gagal',
            message: 'Akun dengan NISN berikut sudah terdaftar',
            response: req.body,
          })
        } else {
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
        }
      }

      req.body.password = undefined

      res.status(200).json({
        status: 'success',
        title: 'Registrasi Berhasil',
        message: 'Akun berhasil dibuat, silahkan login',
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
        status: 'failed',
        error: true,
        response: error,
      })
    }
  },
  createDataSiswa: async (req, res, next) => {
    try {
      const {
        nisn, nama, alamat, jenis_kelamin,
      } = req.body

      // Check if req.body is not empty
      if (!nisn || !nama || !alamat || !jenis_kelamin) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          title: 'Data Gagal Ditambahkan',
          message: 'Please provide NISN, Name, Address, or Gender',
          response: req.body,
        })
      }

      const isData = await Siswa.data.doc(nisn).get()
      if (isData.exists) {
        res.status(401).json({
          status: 'error',
          error: true,
          title: 'Data Gagal Ditambahkan',
          message: 'Data dengan NISN berikut sudah ada',
          response: req.body,
        })
      } else {
        await Siswa.data.doc(nisn).set({
          nisn,
          nama,
          alamat,
          jenis_kelamin,
        })
      }
      res.status(200).json({
        status: 'success',
        title: 'Data Berhasil Ditambahkan',
        message: 'Tekan tutup untuk menutup popup',
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
        status: 'failed',
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

      await Siswa.profil.doc(nisn).update({
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
  updateDataSiswa: async (req, res, next) => {
    try {
      const nisn = req.params.id

      const account = await Siswa.data.doc(nisn).get()
      if (!account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Data with this NISN doesn\'t exist',
          response: req.body,
        })
      }

      const siswaData = account.data()

      // Check for existed document
      await Siswa.data.doc(nisn).update({
        nama: req.body.nama || siswaData.nama,
        alamat: req.body.alamat || siswaData.alamat,
        jenis_kelamin: req.body.jenis_kelamin || siswaData.jenis_kelamin,
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
