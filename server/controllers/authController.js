/* eslint-disable consistent-return */
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import siswa from '../models/siswaModel'
import siswaController from './siswaController'

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
  authenticateToken: (req, res, next) => {
    try {
      // 1) check if the token is there
      console.log(req.cookies)
      const token = req.cookies.jwt
      if (token == null) return res.sendStatus(401) // if there isn't any token

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
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
    await siswaController.createAkunSiswa(req, res, next)
  },
}

export default authController
