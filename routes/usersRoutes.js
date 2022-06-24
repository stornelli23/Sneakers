const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require ('path');
const imgFilePath = path.join(__dirname, '../public/img/users');
const { check } = require('express-validator');

///*** Controller Require **** */
const usersControllers = require('../controllers/usersControllers');

// ************ MULTER ************

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, imgFilePath )
    },

    filename: function (req, file, cb) {
      const name = file.originalname     
      cb(null, name)
    }

  })
  
const upload = multer({ storage: storage })

/*VALIDACIONES*/

const validateLogin = [
  check('email-usuario')
    .notEmpty()
    .withMessage('Este campo no puede estar vacio').bail()
    .isEmail().withMessage('Ingrese un email valido'),

  check('password-usuario')
    .notEmpty().withMessage('Este campo no puede estar vacio')
]

const validateRegister = [
  check('first_name').notEmpty()
  .withMessage('Este campo no puede estar vacio').bail(),

  check('last_name').notEmpty()
  .withMessage('Este campo no puede estar vacio').bail(),

  check('email').notEmpty()
  .withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Ingrese un email valido'),

  check('password').notEmpty()
  .withMessage('Este campo no puede estar vacio').bail(),

  check('date_of_birth'),
  check('gender')
]

/*RUTAS POR GET*/

router.get('/users', usersControllers.index);
router.get('/login', usersControllers.login);
router.get('/register', usersControllers.register);
router.get('/userProfile/:id', usersControllers.profile);

/*RUTAS POR POST*/

router.post('/register', upload.any(), validateRegister, usersControllers.processRegister);
router.post('/login', validateLogin, usersControllers.loginProcess);

module.exports = router;