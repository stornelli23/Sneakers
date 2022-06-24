const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require ('path');
const imgFilePath = path.join(__dirname, '../public/img');
///*** Controller Require **** */
const mainControllers = require('../controllers/mainControllers');

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


// ROUTES GET//
router.get('/productCart', mainControllers.productCart);
router.get('/createProduct', mainControllers.createProduct);
router.get('/editProduct/:id/', mainControllers.editProduct);
router.get('/products', mainControllers.products);
router.get('/productDetail/:id/', mainControllers.productDetail);


// ROUTES POST//
router.delete('/editProduct/delete/:id/', mainControllers.delete);
router.post('/createProduct', upload.any(), mainControllers.store);
router.post('/productCart/:id/', mainControllers.productCart);
router.delete('/productCart/delete/:id/', mainControllers.productCartDelete);
router.put('/editProduct/:id/', upload.any(), mainControllers.editProductStore);

module.exports = router;