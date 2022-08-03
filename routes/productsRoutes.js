const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require ('path');
const imgFilePath = path.join(__dirname, '../public/img/products/');
///*** Controller Require **** */
const productsController = require('../controllers/productsController');
// ************ MULTER ************

const storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
      cb(null, imgFilePath)
      
    },

    filename: function (req, file, cb) {
      
      const name = Date.now() + path.extname(file.originalname )                                       //const name = file.originalname     
      cb(null, name)
    }

  })
  
const upload = multer({ storage }) 



// ROUTES GET//
router.get('/productCart', productsController.productCart);
router.get('/createProduct', productsController.createProduct);
router.get('/editProduct/:id/', productsController.editProduct);
router.get('/products', productsController.products);
router.get('/productDetail/:id/', productsController.productDetail);


// ROUTES POST//
router.delete('/editProduct/delete/:id/', productsController.delete);
router.post('/createProduct', upload.any("image"),  productsController.store);
router.post('/productCart/:id/', productsController.productCart);
router.delete('/productCart/delete/:id/', productsController.productCartDelete);
router.put('/editProduct/:id/', upload.any(), productsController.editProductStore);

module.exports = router;





