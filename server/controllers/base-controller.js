/* eslint-disable consistent-return */
import AppError from '../utils/appError'

const BaseController = {
  deleteOne: (...Model) => async (req, res, next) => {
    try {
      Model.forEach(async (model) => {
        await model.doc(req.params.id).delete()
      })
      res.status(200).json({
        status: 'success',
        error: false,
        results: `Deleted ${Model.length} document`,
      })
    } catch (error) {
      res.status(502).json({
        status: 'success',
        error: true,
        response: error,
      })
    }
  },

  updateOne: (Model) => async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })

      if (!doc) {
        return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next)
      }

      res.status(200).json({
        status: 'success',
        ...doc,
      })
    } catch (error) {
      next(error)
    }
  },

  getOne: (Model) => async (req, res, next) => {
    try {
      const doc = await Model.doc(req.params.id).get()
      if (!doc.exists) {
        res.status(401).json({
          status: 'failed',
          error: true,
          message: 'No document found with that id',
          response: req.params,
        })
        return { success: false }
      }
      const data = doc.data()

      res.status(200).json({
        status: 'success',
        error: false,
        ...data,
      })
      return { success: true }
    } catch (error) {
      res.status(502).json({
        status: 'success',
        error: true,
        response: error,
      })
    }
  },

  getAll: (Model) => async (req, res, next) => {
    try {
      const data = []
      const snapshot = await Model.get()
      snapshot.forEach((doc) => {
        data.push(doc.data())
      })

      res.status(200).json({
        status: 'success',
        error: false,
        results: data.length,
        ...data,
      })

      if (data.length > 0) {
        return { success: true }
      }
      return { success: false }
    } catch (error) {
      res.status(502).json({
        status: 'success',
        error: true,
        response: error,
      })
    }
  },

}

export default BaseController
