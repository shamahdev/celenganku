import global from './globalController'
import siswa from '../models/siswaModel'
import AppError from '../utils/appError'

const authController = {
//   login: async (req, res, next) => {
//     try {
//       const { nisn, password } = req.body

  //       if (!nisn || !password) {
  //         return next(
  //           new AppError(404, 'fail', 'Please provide NISN or password'),
  //           req,
  //           res,
  //           next,
  //         )
  //       }

  //       // 2) check if user exist and password is correct
  //       // const user = await global.getOne(siswa.akun, nisn)
  //       // console.log(user)

  //       // if (!user) {
  //       //   return next(
  //       //     new AppError(401, "fail", "Email or Password is wrong"),
  //       //     req,
  //       //     res,
  //       //     next,
  //       //   );
  //       // }

  //       // // 3) All correct, send jwt to client
  //       // // const token = createToken(user.id);

  //       // // Remove the password from the output
  //       // user.password = undefined;

  //       res.status(200).json({
  //         status: 'success',
  //         data: {
  //           user,
  //         },
  //       })
  //     } catch (err) {
  //       next(err)
  //     }
  //   },
  register: async (req, res, next) => {
    try {
      const { nisn, email, password } = req.body

      if (!nisn || !email || !password) {
        return next(
          new AppError(404, 'fail', 'Please provide NISN, Email, or password'),
          req,
          res,
          next,
        )
      }

      const user = await siswa.akun.doc(nisn).get()
      if (user.exists) {
        return next(
          new AppError(400, 'fail', 'Account with this NISN already exist'),
          req,
          res,
          next,
        )
      }

      await siswa.akun.doc(nisn).set({
        nisn,
        email,
        password,
      })

      res.status(200).json({
        status: 'success',
        response: req.body,
      })
    } catch (err) {
      next(err)
    }
  },
}

export default authController
