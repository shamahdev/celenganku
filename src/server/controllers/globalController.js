/* eslint-disable consistent-return */
import AppError from '../utils/appError'

const global = {
  deleteOne: (Model) => async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id)

      if (!doc) {
        return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next)
      }

      res.status(204).json({
        status: 'success',
        data: null,
      })
    } catch (error) {
      next(error)
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
        data: {
          doc,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  createOne: (Model) => async (req, res, next) => {
    try {
      const doc = await Model.create(req.body)

      res.status(201).json({
        status: 'success',
        data: {
          doc,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  getOne: (Model, id) => async (req, res, next) => {
    try {
      const doc = await Model.doc(req.params.id || id).get()
      const data = doc.data()

      if (!doc) {
        return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next)
      }

      res.status(200).json({
        status: 'success',
        data,
      })
    } catch (error) {
      next(error)
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
        results: data.length,
        data,
      })
    } catch (error) {
      next(error)
    }
  },

}

export default global
