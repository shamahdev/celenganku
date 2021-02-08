/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Siswa from '../models/siswa-model'
import SiswaController from './siswa-controller'
import db from '../global/firebase'

dotenv.config()
const maxAge = 3 * 24 * 60 * 60
const Admin = db.collection('akun_admin')
const createToken = (id) => {
  let role = 'user'
  if (id.length < 10) {
    role = 'admin'
  }
  const accessToken = jwt.sign(
    {
      id,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRE_TIME,
    },
  )
  return accessToken
}

const AuthController = {
  requireAuth: (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err.message)
          res.redirect('/login')
        } else {
          next()
        }
      })
    } else {
      res.redirect('/login')
    }
  },

  restrictTo: (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({
        status: 'failed',
        error: true,
        message: 'You\'re not allowed to do that action',
        response: req.body,
      })
    }
    next()
  },
  adminLogin: async (req, res, next) => {
    try {
      const { id_admin, password } = req.body

      if (!id_admin || !password) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Please provide ID, or password',
          response: req.body,
        })
      }

      const account = await Admin.where('id_admin', '==', id_admin).where('password', '==', password).get()
      if (account.empty) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Wrong ID or Password',
          response: req.body,
        })
      }

      const token = createToken(id_admin)
      req.body.password = undefined

      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json({
        status: 'success',
        error: false,
        response: req.body,
      })
    } catch (err) {
      next(err)
    }
  },

  login: async (req, res, next) => {
    try {
      const { nisn, password } = req.body

      if (!nisn || !password) {
        return res.status(404).json({
          status: 'failed',
          error: true,
          message: 'Please provide NISN, or password',
          response: req.body,
        })
      }

      const account = await Siswa.akun.where('nisn', '==', nisn).where('password', '==', password).get()
      if (account.empty) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'Wrong NISN or Password',
          response: req.body,
        })
      }

      const token = createToken(nisn)
      req.body.password = undefined

      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json({
        status: 'success',
        error: false,
        response: req.body,
      })
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    const { nisn } = await SiswaController.createAkunSiswa(req, res, next)
    console.log(nisn)

    const token = createToken(nisn)
    req.body.password = undefined
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({
      status: 'success',
      error: false,
      response: req.body,
    })
  },
  retrieveToken: async (req, res, next) => {
    res.status(200).json({
      status: 'success',
      error: false,
      response: req.cookies.jwt,
    })
  },
}

export default AuthController
