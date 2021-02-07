/* eslint-disable consistent-return */
import dotenv from 'dotenv'
import atob from 'atob'
import jwt from 'jsonwebtoken'
import siswa from '../models/siswa-model'
import siswaController from './siswa-controller'

dotenv.config()
const maxAge = 3 * 24 * 60 * 60
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

const authController = {
  requireAuth: (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
          console.log(err.message)
          res.redirect('/login')
        } else {
          console.log(decodedToken)
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

      const account = await siswa.akun.where('nisn', '==', nisn).where('password', '==', password).get()
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
    const { nisn } = await siswaController.createAkunSiswa(req, res, next)
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
  retrieveUser: async (req, res, next) => {
    const cookiesToken = await req.cookies.jwt
    const parsedToken = JSON.parse(atob(cookiesToken.split('.')[1]))
    res.status(200).json({
      status: 'success',
      error: false,
      response: parsedToken,
    })
  },
}

export default authController
