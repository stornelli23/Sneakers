const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const imgFilePath = path.join(__dirname, "../public/img/products/");
const { check } = require("express-validator");
///*** Controller Require **** */
const productsController = require("../controllers/productsController");
// ************ MULTER ************

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imgFilePath);
  },

  filename: function (req, file, cb) {
    const name = Date.now() + path.extname(file.originalname); //const name = file.originalname
    cb(null, name);
  },
});

const upload = multer({ storage });

/*VALIDACIONES*/

const validateProduct = [
  check("name")
    .notEmpty()
    .withMessage("Ingrese el nombre del producto")
    .bail()
    .isLength({ min: 5 })
    .withMessage("El nombre deberá tener al menos 5 caracteres"),
  check("price")
    .notEmpty()
    .withMessage("Ingrese el precio del producto")
    .bail()
    .isNumeric()
    .withMessage("Ingrese un valor numerico entero")
    .bail()
    .isInt()
    .withMessage("Ingrese un valor entero"),
  check("discount")
    .notEmpty()
    .withMessage("Ingrese un descuento")
    .bail()
    .isNumeric()
    .withMessage("Ingrese un valor numerico")
    .bail()
    .isInt()
    .withMessage("Ingrese un valor entero"),
  check("description")
    .notEmpty()
    .withMessage("Ingrese una descripcion del producto")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripcion debe ser de al menos 20 caracteres"),
  check("category_id")
    .notEmpty()
    .withMessage("Seleccione la categoria del producto"),
  check("brand_id")
    .notEmpty()
    .withMessage("Seleccione la marca del producto"),
  check("image")
  .custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".png", ".jpg", ".jpeg", ".gif"];
    if (file) {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Las extensiones permitidas son ${acceptedExtensions.join(". ")}`
        );
      }
    }
    return true;
  })
];

// ROUTES GET//
router.get("/productCart", productsController.productCart);
router.get("/createProduct", productsController.createProduct);
router.get("/editProduct/:id/", productsController.editProduct);
router.get("/products", productsController.products);
router.get("/productDetail/:id/", productsController.productDetail);

// ROUTES POST//
router.delete("/editProduct/delete/:id/", productsController.delete);
router.post(
  "/createProduct",
  upload.single("image"),
  validateProduct,
  productsController.store
);
router.post("/productCart/:id/", productsController.productCart);
router.delete("/productCart/delete/:id/", productsController.productCartDelete);
router.put(
  "/editProduct/:id/",
  upload.single(),
  productsController.editProductStore
);

module.exports = router;
