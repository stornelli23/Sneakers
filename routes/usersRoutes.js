const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require ('path');
const imgFilePath = path.join(__dirname, '../public/img/users');

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

/*RUTAS POR GET*/

router.get('/users', usersControllers.index);
router.get('/login', usersControllers.login);
router.get('/register', usersControllers.register);

/*RUTAS POR POST*/

router.post('/register', upload.any(), usersControllers.saveUser);

module.exports = router;