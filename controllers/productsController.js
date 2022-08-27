const { validationResult } = require("express-validator");
const db = require("../database/models");
const Op = db.Sequelize.Op;

const productsController = {
  productCart: async (req, res) => {
    let logueado = req.session.userLogged;
    let arrayCarrito = [];
    let arrayPrecio = [];
    let precio = req.session.arrayPrecio ;
    let carrito = req.session.arrayCarrito;
    let destacados = await db.Product.findAll({
      where: {
        discount: { [Op.lte]: 0 },
      },
    });
    if(precio){
      arrayPrecio = precio ;
    }
    if (carrito) {
      arrayCarrito = carrito;
    }

    let indice = await db.Product.findByPk(req.params.id);

    if (indice) {
      arrayCarrito.push(indice);
      arrayPrecio.push(indice.price)
      req.session.arrayPrecio = arrayPrecio;
      req.session.arrayCarrito = arrayCarrito;
    }
    console.log(indice.precio)
    console.log(arrayPrecio)

    const initialValue = 0;
const sumaTotal = arrayPrecio.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
  console.log(sumaTotal)
    res.render("productCart", { arrayCarrito, destacados, carrito, logueado, sumaTotal });
  },

  productCartDelete: async (req, res) => {
    let logueado = req.session.userLogged;
    let id = req.params.id;
    let arrayCarrito = [];
    let carrito = req.session.arrayCarrito;
    let destacados = await db.Product.findAll({
      where: {
        discount: { [Op.lte]: 0 },
      },
    });

    if (carrito) {
      arrayCarrito = carrito;
    }

    const indiceAEliminar = arrayCarrito.findIndex((elemento) => {
      return elemento.id == id;
    });
    if (indiceAEliminar != -1) {
      arrayCarrito.splice(indiceAEliminar, 1);
      req.session.arrayCarrito = arrayCarrito;
    }

    res.render("productCart", { arrayCarrito, destacados, carrito, logueado });
  },

  productDetail: async (req, res) => {
    let logueado = req.session.userLogged;

    let destacados = await db.Product.findAll({
      where: {
        discount: { [Op.lte]: 0 },
      },
    });
    let productosFiltrados = await db.Product.findByPk(req.params.id);

    if (!productosFiltrados) {
      res.send("Algo salió mal...");
    } else {
      res.render("productDetail", { productosFiltrados, destacados, logueado });
    }
  },

  createProduct: (req, res) => {
    let logueado = req.session.userLogged;

    res.render("createProduct", { logueado });
  },

  store: async (req, res) => {
    let logueado = req.session.userLogged;
    let resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
      return res.render("createProduct", {
        logueado,
        errors: resultValidation.mapped(),
        oldData: req.body
      })
    }else {

      
          let image;
          if(req.file){
            image = req.file.filename
          }else{
            image = 'nike.png'
          }
      
          await db.Product.create({
            
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            brand_id: req.body.brand_id,
            image: image,
            category_id: req.body.category_id,
          });
      
          res.redirect("/");


    }


  },

  editProduct: async (req, res) => {
    let logueado = req.session.userLogged;

    let productToEdit = await db.Product.findByPk(req.params.id);

    res.render("editProduct", { productToEdit, logueado });
  },
  editProductStore: async (req, res) => {
    let productToEdit = await db.Product.findByPk(req.params.id);

    productToEdit.name = req.body.name;
    productToEdit.price = req.body.price;
    productToEdit.discount = req.body.discount;
    productToEdit.description = req.body.description;
    productToEdit.brand_id = req.body.brand_id;
    productToEdit.category_id = req.body.category_id;

    await productToEdit.save();

    res.redirect("/");
  },

  products: async (req, res) => {
    let logueado = req.session.userLogged;
    let productos = await db.Product.findAll();
    res.render("products", { productos, logueado });
  },

  delete: async (req, res) => {
    await db.Product.destroy({
      where: { id: req.params.id },
    });

    res.redirect("/products");
  },
};

module.exports = productsController;
