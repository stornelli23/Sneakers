const db = require("../../database/models");

const apiProductsController = {
  allProducts: async (req, res) => {
    let totalBrands = await db.Brand.findAll();

    await db.Product.findAll().then((products) => {
      let totalNike = 0;
      let totalAdidas = 0;
      let totalReebok = 0;

      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          "detail",
          "http://localhost:3000/productDetail/" + products[i].id
        );

        if (products[i].brand_id == 1) {
          totalNike++;
        }
        if (products[i].brand_id == 2) {
          totalAdidas++;
        }
        if (products[i].brand_id == 3) {
          totalReebok++;
        }
      }

      res.status(200).json({
        totalProducts: products.length,
        totalBrands: totalBrands.length,
        countByBrand: [
          {
            Nike: totalNike,
          },
          {
            Adidas: totalAdidas,
          },
          {
            Reebok: totalReebok,
          },
        ],
        products: products,
        status: 200,
      });
    });
  },

  productDetail: async (req, res) => {
    let id = req.params.id;

    await db.Product.findByPk(id).then((product) => {
      res.json(resultado);

      res.status(200).json({
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          description: product.description,
          image: "http://localhost:3000/img/products/" + product.image,
          productCategory: [
            { Category: product.category_id },
            { Brand: product.brand_id },
          ],
        },
        status: 200,
      });
    });
  },
};

module.exports = apiProductsController;
