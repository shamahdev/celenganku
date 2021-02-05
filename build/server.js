/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/app.js":
/*!***************************!*\
  !*** ./src/server/app.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime */ \"regenerator-runtime\");\n/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _routes_siswaRoutes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/siswaRoutes */ \"./src/server/routes/siswaRoutes.js\");\n/* harmony import */ var _utils_appError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/appError */ \"./src/server/utils/appError.js\");\n\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\nvar HTML_FILE = path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, 'index.html');\napp.use(cors__WEBPACK_IMPORTED_MODULE_4___default()());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default().json());\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default().static(__dirname));\napp.use('/api/siswa', _routes_siswaRoutes__WEBPACK_IMPORTED_MODULE_5__.default);\napp.use('/', function (req, res) {\n  res.sendFile(HTML_FILE);\n});\napp.use('*', function (req, res, next) {\n  var err = new _utils_appError__WEBPACK_IMPORTED_MODULE_6__.default(404, 'fail', 'undefined route');\n  next(err, req, res, next);\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://celenganku-app/./src/server/app.js?");

/***/ }),

/***/ "./src/server/controllers/authController.js":
/*!**************************************************!*\
  !*** ./src/server/controllers/authController.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _globalController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalController */ \"./src/server/controllers/globalController.js\");\n/* harmony import */ var _models_siswaModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/siswaModel */ \"./src/server/models/siswaModel.js\");\n/* harmony import */ var _utils_appError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/appError */ \"./src/server/utils/appError.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n\n\n\nvar authController = {\n  //   login: async (req, res, next) => {\n  //     try {\n  //       const { nisn, password } = req.body\n  //       if (!nisn || !password) {\n  //         return next(\n  //           new AppError(404, 'fail', 'Please provide NISN or password'),\n  //           req,\n  //           res,\n  //           next,\n  //         )\n  //       }\n  //       // 2) check if user exist and password is correct\n  //       // const user = await global.getOne(siswa.akun, nisn)\n  //       // console.log(user)\n  //       // if (!user) {\n  //       //   return next(\n  //       //     new AppError(401, \"fail\", \"Email or Password is wrong\"),\n  //       //     req,\n  //       //     res,\n  //       //     next,\n  //       //   );\n  //       // }\n  //       // // 3) All correct, send jwt to client\n  //       // // const token = createToken(user.id);\n  //       // // Remove the password from the output\n  //       // user.password = undefined;\n  //       res.status(200).json({\n  //         status: 'success',\n  //         data: {\n  //           user,\n  //         },\n  //       })\n  //     } catch (err) {\n  //       next(err)\n  //     }\n  //   },\n  register: function () {\n    var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {\n      var _req$body, nisn, email, password, user;\n\n      return regeneratorRuntime.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _req$body = req.body, nisn = _req$body.nisn, email = _req$body.email, password = _req$body.password;\n\n              if (!(!nisn || !email || !password)) {\n                _context.next = 4;\n                break;\n              }\n\n              return _context.abrupt(\"return\", next(new _utils_appError__WEBPACK_IMPORTED_MODULE_2__.default(404, 'fail', 'Please provide NISN, Email, or password'), req, res, next));\n\n            case 4:\n              _context.next = 6;\n              return _models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.akun.doc(nisn).get();\n\n            case 6:\n              user = _context.sent;\n\n              if (!user.exists) {\n                _context.next = 9;\n                break;\n              }\n\n              return _context.abrupt(\"return\", next(new _utils_appError__WEBPACK_IMPORTED_MODULE_2__.default(400, 'fail', 'Account with this NISN already exist'), req, res, next));\n\n            case 9:\n              _context.next = 11;\n              return _models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.akun.doc(nisn).set({\n                nisn: nisn,\n                email: email,\n                password: password\n              });\n\n            case 11:\n              res.status(200).json({\n                status: 'success',\n                response: req.body\n              });\n              _context.next = 17;\n              break;\n\n            case 14:\n              _context.prev = 14;\n              _context.t0 = _context[\"catch\"](0);\n              next(_context.t0);\n\n            case 17:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 14]]);\n    }));\n\n    function register(_x, _x2, _x3) {\n      return _register.apply(this, arguments);\n    }\n\n    return register;\n  }()\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authController);\n\n//# sourceURL=webpack://celenganku-app/./src/server/controllers/authController.js?");

/***/ }),

/***/ "./src/server/controllers/globalController.js":
/*!****************************************************!*\
  !*** ./src/server/controllers/globalController.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _utils_appError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/appError */ \"./src/server/utils/appError.js\");\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n/* eslint-disable consistent-return */\n\nvar global = {\n  deleteOne: function deleteOne(Model) {\n    return /*#__PURE__*/function () {\n      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {\n        var doc;\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.prev = 0;\n                _context.next = 3;\n                return Model.findByIdAndDelete(req.params.id);\n\n              case 3:\n                doc = _context.sent;\n\n                if (doc) {\n                  _context.next = 6;\n                  break;\n                }\n\n                return _context.abrupt(\"return\", next(new _utils_appError__WEBPACK_IMPORTED_MODULE_0__.default(404, 'fail', 'No document found with that id'), req, res, next));\n\n              case 6:\n                res.status(204).json({\n                  status: 'success',\n                  data: null\n                });\n                _context.next = 12;\n                break;\n\n              case 9:\n                _context.prev = 9;\n                _context.t0 = _context[\"catch\"](0);\n                next(_context.t0);\n\n              case 12:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, null, [[0, 9]]);\n      }));\n\n      return function (_x, _x2, _x3) {\n        return _ref.apply(this, arguments);\n      };\n    }();\n  },\n  updateOne: function updateOne(Model) {\n    return /*#__PURE__*/function () {\n      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {\n        var doc;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.prev = 0;\n                _context2.next = 3;\n                return Model.findByIdAndUpdate(req.params.id, req.body, {\n                  \"new\": true,\n                  runValidators: true\n                });\n\n              case 3:\n                doc = _context2.sent;\n\n                if (doc) {\n                  _context2.next = 6;\n                  break;\n                }\n\n                return _context2.abrupt(\"return\", next(new _utils_appError__WEBPACK_IMPORTED_MODULE_0__.default(404, 'fail', 'No document found with that id'), req, res, next));\n\n              case 6:\n                res.status(200).json({\n                  status: 'success',\n                  data: {\n                    doc: doc\n                  }\n                });\n                _context2.next = 12;\n                break;\n\n              case 9:\n                _context2.prev = 9;\n                _context2.t0 = _context2[\"catch\"](0);\n                next(_context2.t0);\n\n              case 12:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, null, [[0, 9]]);\n      }));\n\n      return function (_x4, _x5, _x6) {\n        return _ref2.apply(this, arguments);\n      };\n    }();\n  },\n  createOne: function createOne(Model) {\n    return /*#__PURE__*/function () {\n      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {\n        var doc;\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                _context3.prev = 0;\n                _context3.next = 3;\n                return Model.create(req.body);\n\n              case 3:\n                doc = _context3.sent;\n                res.status(201).json({\n                  status: 'success',\n                  data: {\n                    doc: doc\n                  }\n                });\n                _context3.next = 10;\n                break;\n\n              case 7:\n                _context3.prev = 7;\n                _context3.t0 = _context3[\"catch\"](0);\n                next(_context3.t0);\n\n              case 10:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3, null, [[0, 7]]);\n      }));\n\n      return function (_x7, _x8, _x9) {\n        return _ref3.apply(this, arguments);\n      };\n    }();\n  },\n  getOne: function getOne(Model, id) {\n    return /*#__PURE__*/function () {\n      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {\n        var doc, data;\n        return regeneratorRuntime.wrap(function _callee4$(_context4) {\n          while (1) {\n            switch (_context4.prev = _context4.next) {\n              case 0:\n                _context4.prev = 0;\n                _context4.next = 3;\n                return Model.doc(req.params.id || id).get();\n\n              case 3:\n                doc = _context4.sent;\n                data = doc.data();\n\n                if (doc) {\n                  _context4.next = 7;\n                  break;\n                }\n\n                return _context4.abrupt(\"return\", next(new _utils_appError__WEBPACK_IMPORTED_MODULE_0__.default(404, 'fail', 'No document found with that id'), req, res, next));\n\n              case 7:\n                res.status(200).json({\n                  status: 'success',\n                  data: data\n                });\n                _context4.next = 13;\n                break;\n\n              case 10:\n                _context4.prev = 10;\n                _context4.t0 = _context4[\"catch\"](0);\n                next(_context4.t0);\n\n              case 13:\n              case \"end\":\n                return _context4.stop();\n            }\n          }\n        }, _callee4, null, [[0, 10]]);\n      }));\n\n      return function (_x10, _x11, _x12) {\n        return _ref4.apply(this, arguments);\n      };\n    }();\n  },\n  getAll: function getAll(Model) {\n    return /*#__PURE__*/function () {\n      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {\n        var data, snapshot;\n        return regeneratorRuntime.wrap(function _callee5$(_context5) {\n          while (1) {\n            switch (_context5.prev = _context5.next) {\n              case 0:\n                _context5.prev = 0;\n                data = [];\n                _context5.next = 4;\n                return Model.get();\n\n              case 4:\n                snapshot = _context5.sent;\n                snapshot.forEach(function (doc) {\n                  data.push(doc.data());\n                });\n                res.status(200).json({\n                  status: 'success',\n                  results: data.length,\n                  data: data\n                });\n                _context5.next = 12;\n                break;\n\n              case 9:\n                _context5.prev = 9;\n                _context5.t0 = _context5[\"catch\"](0);\n                next(_context5.t0);\n\n              case 12:\n              case \"end\":\n                return _context5.stop();\n            }\n          }\n        }, _callee5, null, [[0, 9]]);\n      }));\n\n      return function (_x13, _x14, _x15) {\n        return _ref5.apply(this, arguments);\n      };\n    }();\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);\n\n//# sourceURL=webpack://celenganku-app/./src/server/controllers/globalController.js?");

/***/ }),

/***/ "./src/server/controllers/siswaController.js":
/*!***************************************************!*\
  !*** ./src/server/controllers/siswaController.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _globalController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalController */ \"./src/server/controllers/globalController.js\");\n/* harmony import */ var _models_siswaModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/siswaModel */ \"./src/server/models/siswaModel.js\");\n\n\nvar siswaController = {\n  getAllSiswaData: _globalController__WEBPACK_IMPORTED_MODULE_0__.default.getAll(_models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.data),\n  getAllAkunSiswa: _globalController__WEBPACK_IMPORTED_MODULE_0__.default.getAll(_models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.akun),\n  getAkunSiswa: _globalController__WEBPACK_IMPORTED_MODULE_0__.default.getOne(_models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.akun),\n  getProfilSiswa: _globalController__WEBPACK_IMPORTED_MODULE_0__.default.getOne(_models_siswaModel__WEBPACK_IMPORTED_MODULE_1__.default.profil)\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siswaController); // exports.deleteMe = async (req, res, next) => {\n//   try {\n//     await User.findByIdAndUpdate(req.user.id, {\n//       active: false,\n//     })\n//     res.status(204).json({\n//       status: 'success',\n//       data: null,\n//     })\n//   } catch (error) {\n//     next(error)\n//   }\n// }\n// exports.getAllUsers = global.getAll(User)\n// exports.getUser = global.getOne(User)\n// // Don't update password on this\n// exports.updateUser = global.updateOne(User)\n// exports.deleteUser = global.deleteOne(User)\n\n//# sourceURL=webpack://celenganku-app/./src/server/controllers/siswaController.js?");

/***/ }),

/***/ "./src/server/global/config.js":
/*!*************************************!*\
  !*** ./src/server/global/config.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar CONFIG = {\n  PORT: process.env.PORT || 8080,\n  DIST_DIR: __dirname\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CONFIG);\n\n//# sourceURL=webpack://celenganku-app/./src/server/global/config.js?");

/***/ }),

/***/ "./src/server/global/firebase.js":
/*!***************************************!*\
  !*** ./src/server/global/firebase.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar firebaseConfig = {\n  apiKey: 'AIzaSyAW4XYKvHlGB2n85IrI311kXrFp-S_11YM',\n  authDomain: 'celenganku-app.firebaseapp.com',\n  databaseURL: 'https://celenganku-app.firebaseio.com',\n  projectId: 'celenganku-app',\n  storageBucket: 'celenganku-app.appspot.com',\n  messagingSenderId: '414105942761',\n  appId: '1:414105942761:web:f68bc17372af32cf848e78',\n  measurementId: 'G-QQ3YEP9ZCT'\n};\nvar firebaseInit = firebase_app__WEBPACK_IMPORTED_MODULE_0___default().initializeApp(firebaseConfig);\nvar db = firebaseInit.firestore();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (db);\n\n//# sourceURL=webpack://celenganku-app/./src/server/global/firebase.js?");

/***/ }),

/***/ "./src/server/models/siswaModel.js":
/*!*****************************************!*\
  !*** ./src/server/models/siswaModel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _global_firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global/firebase */ \"./src/server/global/firebase.js\");\n\nvar siswa = {\n  data: _global_firebase__WEBPACK_IMPORTED_MODULE_0__.default.collection('data_siswa'),\n  akun: _global_firebase__WEBPACK_IMPORTED_MODULE_0__.default.collection('akun_siswa'),\n  profil: _global_firebase__WEBPACK_IMPORTED_MODULE_0__.default.collection('profil_siswa')\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siswa);\n\n//# sourceURL=webpack://celenganku-app/./src/server/models/siswaModel.js?");

/***/ }),

/***/ "./src/server/routes/siswaRoutes.js":
/*!******************************************!*\
  !*** ./src/server/routes/siswaRoutes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _controllers_siswaController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/siswaController */ \"./src/server/controllers/siswaController.js\");\n/* harmony import */ var _controllers_authController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/authController */ \"./src/server/controllers/authController.js\");\n\n\n\n\n\nvar siswaRoutes = express__WEBPACK_IMPORTED_MODULE_1___default().Router();\nsiswaRoutes.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\nsiswaRoutes.post('/register', _controllers_authController__WEBPACK_IMPORTED_MODULE_4__.default.register);\nsiswaRoutes.route('/').get(_controllers_siswaController__WEBPACK_IMPORTED_MODULE_3__.default.getAllAkunSiswa);\nsiswaRoutes.route('/:id').get(_controllers_siswaController__WEBPACK_IMPORTED_MODULE_3__.default.getAkunSiswa);\nsiswaRoutes.route('/:id/profil').get(_controllers_siswaController__WEBPACK_IMPORTED_MODULE_3__.default.getProfilSiswa);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (siswaRoutes);\n\n//# sourceURL=webpack://celenganku-app/./src/server/routes/siswaRoutes.js?");

/***/ }),

/***/ "./src/server/server-dev.js":
/*!**********************************!*\
  !*** ./src/server/server-dev.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ \"./src/server/app.js\");\n/* harmony import */ var _webpack_dev__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../webpack.dev */ \"./webpack.dev.js\");\n/* harmony import */ var _webpack_dev__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_webpack_dev__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _global_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/config */ \"./src/server/global/config.js\");\n\n\n\n\n\n\nvar compiler = webpack__WEBPACK_IMPORTED_MODULE_0___default()((_webpack_dev__WEBPACK_IMPORTED_MODULE_4___default()));\n_app__WEBPACK_IMPORTED_MODULE_3__.default.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_1___default()(compiler, {\n  publicPath: (_webpack_dev__WEBPACK_IMPORTED_MODULE_4___default().output.publicPath)\n}));\n_app__WEBPACK_IMPORTED_MODULE_3__.default.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_2___default()(compiler));\n_app__WEBPACK_IMPORTED_MODULE_3__.default.listen(_global_config__WEBPACK_IMPORTED_MODULE_5__.default.PORT, function () {\n  console.log(\"App listening to \".concat(_global_config__WEBPACK_IMPORTED_MODULE_5__.default.PORT, \"....\"));\n  console.log('Press Ctrl+C to quit.');\n});\n\n//# sourceURL=webpack://celenganku-app/./src/server/server-dev.js?");

/***/ }),

/***/ "./src/server/utils/appError.js":
/*!**************************************!*\
  !*** ./src/server/utils/appError.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nvar AppError = /*#__PURE__*/function (_Error) {\n  _inherits(AppError, _Error);\n\n  var _super = _createSuper(AppError);\n\n  function AppError(statusCode, status, message) {\n    var _this;\n\n    _classCallCheck(this, AppError);\n\n    _this = _super.call(this, message);\n    _this.statusCode = statusCode;\n    _this.status = status;\n    _this.message = message;\n    return _this;\n  }\n\n  return AppError;\n}( /*#__PURE__*/_wrapNativeSuper(Error));\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppError);\n\n//# sourceURL=webpack://celenganku-app/./src/server/utils/appError.js?");

/***/ }),

/***/ "./webpack.common.js":
/*!***************************!*\
  !*** ./webpack.common.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar WebpackBar = __webpack_require__(/*! webpackbar */ \"webpackbar\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar CopyWebpackPlugin = __webpack_require__(/*! copy-webpack-plugin */ \"copy-webpack-plugin\");\n\nmodule.exports = {\n  entry: {\n    main: './src/scripts/index.js'\n  },\n  output: {\n    path: path.join(__dirname, 'build'),\n    publicPath: '/',\n    filename: '[name].js'\n  },\n  target: 'web',\n  devtool: 'source-map',\n  module: {\n    rules: [{\n      test: /\\.html$/,\n      use: [{\n        loader: 'html-loader'\n      }]\n    }, {\n      test: /\\.(sa|sc|c)ss$/,\n      use: ['style-loader', {\n        loader: 'css-loader',\n        options: {\n          importLoaders: 1\n        }\n      }, 'postcss-loader']\n    }, {\n      test: /\\.(png|svg|jpg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new WebpackBar(), new CopyWebpackPlugin({\n    patterns: [{\n      from: './src/public/',\n      to: './'\n    }]\n  }), new HtmlWebPackPlugin({\n    template: './src/index.html',\n    filename: './index.html',\n    excludeChunks: ['server']\n  })]\n};\n\n//# sourceURL=webpack://celenganku-app/./webpack.common.js?");

/***/ }),

/***/ "./webpack.dev.js":
/*!************************!*\
  !*** ./webpack.dev.js ***!
  \************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! webpack-merge */ \"webpack-merge\"),\n    merge = _require.merge;\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar common = __webpack_require__(/*! ./webpack.common */ \"./webpack.common.js\");\n\nmodule.exports = merge(common, {\n  mode: 'development',\n  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]\n});\n\n//# sourceURL=webpack://celenganku-app/./webpack.dev.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"body-parser\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22body-parser%22?");

/***/ }),

/***/ "copy-webpack-plugin":
/*!**************************************!*\
  !*** external "copy-webpack-plugin" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"copy-webpack-plugin\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22copy-webpack-plugin%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"cors\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22express%22?");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"firebase/app\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22firebase/app%22?");

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"firebase/firestore\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22firebase/firestore%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"html-webpack-plugin\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22path%22?");

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"regenerator-runtime\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22regenerator-runtime%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-dev-middleware\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-hot-middleware\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22webpack-hot-middleware%22?");

/***/ }),

/***/ "webpack-merge":
/*!********************************!*\
  !*** external "webpack-merge" ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-merge\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22webpack-merge%22?");

/***/ }),

/***/ "webpackbar":
/*!*****************************!*\
  !*** external "webpackbar" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpackbar\");;\n\n//# sourceURL=webpack://celenganku-app/external_%22webpackbar%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/server/server-dev.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;