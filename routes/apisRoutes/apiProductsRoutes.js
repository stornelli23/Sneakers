const express = require("express");
const router = express.Router();
const path = require("path");


///*** Controller Require **** */
const apiProductsController = require("../../controllers/apiControllers/apiProductsController.js")



/*RUTAS POR GET*/

router.get("/api/products", apiProductsController.allProducts);
router.get("/api/products/:id", apiProductsController.productDetail);



/*RUTAS POR POST*/



module.exports = router;