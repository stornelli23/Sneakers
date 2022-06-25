const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require ('path');
const imgFilePath = path.join(__dirname, '../public/img/users');
const { body } = require('express-validator');


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
  body('email-usuario').notEmpty().withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Ingrese un email valido'),

  body('password-usuario').notEmpty().withMessage('Este campo no puede estar vacio')
]

const validateRegister = [
  body('first_name').notEmpty().withMessage('Este campo no puede estar vacio'),

  body('last_name').notEmpty().withMessage('Este campo no puede estar vacio'),

  body('email').notEmpty().withMessage('Este campo no puede estar vacio').bail().isEmail().withMessage('Ingrese un email valido'),

  body('password').notEmpty().withMessage('Este campo no puede estar vacio'),

  body('date_of_birth').notEmpty().withMessage('Este campo no puede estar vacio'),

  body('gender').notEmpty().withMessage('Seleccione una opcion'),

  body('avatar').custom((value, {req}) => {
    let file = req.file;
    let acceptedExtensions = ['.png', '.jpg', '.jpeg'];
      if(!file){
        throw new Error('Tienes que subir una imagen')
      }else{
        let fileExtension = path.extname(file.originalname);
        if(!acceptedExtensions.includes(fileExtension)) {
          throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join('. ')}`);
      }
    }
    
    return true;
  })
]

/*RUTAS POR GET*/

router.get('/users', usersControllers.index);
router.get('/login', usersControllers.login);
router.get('/register', usersControllers.register);
router.get('/userProfile/:id', usersControllers.profile);

/*RUTAS POR POST*/

router.post('/register', upload.single('avatar'), validateRegister, usersControllers.processRegister);
router.post('/login', validateLogin, usersControllers.loginProcess);

module.exports = router;