/* eslint-disable camelcase */
import BaseController from './base-controller'
import Siswa from '../models/siswa-model'
import db from '../global/firebase'

const Admin = db.collection('akun_admin')
const AdminController = {
  getAdmin: BaseController.getOne(Siswa.akun),
  deleteAdmin: BaseController.deleteOne(Siswa.akun, Siswa.profil),
  createAdmin: async (req, res, next) => {
    try {
      const { id_admin, nama, password } = req.body

      // Check if req.body is not empty
      if (!id_admin || !nama || !password) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Please provide ID, Name, or password',
          response: req.body,
        })
      }

      // Check for existed document
      const account = await Admin.doc(id_admin).get()
      if (account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this ID already exist',
          response: req.body,
        })
      }

      await Admin.akun.doc(id_admin).set({
        id_admin,
        nama,
        password,
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
  updateAdmin: async (req, res, next) => {
    try {
      const { id_admin } = req.params

      const account = await Admin.doc(id_admin).get()
      if (!account.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Account with this ID doesn\'t exist',
          response: req.body,
        })
      }

      const accountData = account.data()

      const updateData = {
        id_admin: req.body.id_admin || accountData.id_admin,
        nama: req.body.nama || accountData.nama,
        password: req.body.password || accountData.password,
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
      await Admin.doc(id_admin).update({
        id_admin: updateData.id_admin,
        nama: updateData.nama,
        password: updateData.password,
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
}

export default AdminController
