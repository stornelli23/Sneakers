const db = require("../database/models");
const Op = db.Sequelize.Op;

const productsController = {
  productCart: async (req, res) => {
    let logueado = req.session.userLogged;
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

    let indice = await db.Product.findByPk(req.params.id);

    if (indice) {
      arrayCarrito.push(indice);
      req.session.arrayCarrito = arrayCarrito;
    }

    res.render("productCart", { arrayCarrito, destacados, carrito, logueado });
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
    let productos = await db.Product.findAll();

    await db.Product.create({
      id: productos.length + 2,
      name: req.body.name,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      brand_id: req.body.brand_id,
      image: req.files[0].filename,
      category_id: req.body.category_id,
    });

    res.redirect("/");
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
