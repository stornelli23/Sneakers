const db = require("../../database/models");
const { productCart } = require("../productsController");

const apiProductsController = {

    allProducts: (req, res) => {
    db.Product.findAll({
      attributes: ["id", "name", "description"],
    })
    .then((products) => {
      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          "detail",
          "http://localhost:3000/productDetail/" + products[i].id
        );
      }

      res.status(200).json({
        total: products.length,
        data: products,
        status: 200,
      });
    });
  },

  productDetail: (req, res) => {
    let id = req.params.id
    db.Product.findByPk(id)
    .then((product) => {
      

      res.status(200).json({
        data: {
            id:             product.id,
            name:     product.name,
            price:      product.price,
            discount:          product.discount,
            description:  product.description,
            brand_id:         product.brand_id,
            image: "localhost:3000/public/img/products/"+product.image,
            category_id:     product.category_id
        },
        status: 200,
      });
    });
  },






};

module.exports = apiProductsController;
