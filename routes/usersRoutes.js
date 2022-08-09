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
    const name = Date.now() + path.extname(file.originalname )    
    cb(null, name)
  }

})

const upload = multer({ storage })

/*VALIDACIONES*/

const validateLogin = [
  check('email-usuario').notEmpty().withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Ingrese un email valido'),

  check('password-usuario').notEmpty().withMessage('Este campo no puede estar vacio')
]

const validateRegister = [
  check('first_name').notEmpty().withMessage('Ingrese su nombre'),

  check('last_name').notEmpty().withMessage('Ingrese su apellido'),

  check('email').notEmpty().withMessage('Ingrese su email').bail().isEmail().withMessage('Ingrese un email valido'),

  check('password').notEmpty().withMessage('Ingrese su contraseña'),

  check('date_of_birth').notEmpty().withMessage('Ingrese su fecha de nacimiento'),

  check('gender').notEmpty().withMessage('Seleccione una opcion')

  ,check('avatar').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.png', '.jpg', '.jpeg'];
    if(file){
      let fileExtension = path.extname(file.originalname)
      if(!acceptedExtensions.includes(fileExtension)){
        throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join('. ')}`)} 
    }  
    return true;
  })
]

/*RUTAS POR GET*/

router.get('/users', usersControllers.index);
router.get('/login', usersControllers.login);
router.get('/register', usersControllers.register);
router.get('/userProfile/:id', usersControllers.profile);
router.get('/logout', usersControllers.logout);

/*RUTAS POR POST*/

router.post('/register', upload.single("avatar"), validateRegister, usersControllers.processRegister);
router.post('/login', validateLogin,  usersControllers.loginProcess);

module.exports = router;

//

// 