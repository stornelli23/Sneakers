const db = require("../../database/models");
const { productCart } = require("../productsController");

const apiProductsController = {
  allProducts: (req, res) => {
    db.Product.findAll({
      attributes: ["id", "name", "description", "category_id"],
    }).then((products) => {
      let totalHombre = 0;
      let totalMujer = 0;
      let totalUnisex = 0;

      for (let i = 0; i < products.length; i++) {
        products[i].setDataValue(
          "detail",
          "http://localhost:3000/productDetail/" + products[i].id
        );

        if (products[i].category_id == 1) {
          totalHombre++;
        }
        if (products[i].category_id == 2) {
          totalMujer++;
        }
        if (products[i].category_id == 3) {
          totalUnisex++;
        }
      }

      res.status(200).json({
        total: products.length,
        countByCategory: [
          {
            Hombre: totalHombre,
          },
          {
            Mujer: totalMujer,
          },
          {
            Unisex: totalUnisex,
          },
        ],
        data: products,
        status: 200,
      });
    });
  },

  productDetail: async (req, res) => {
    let id = req.params.id;

    await db.Product.findOne({where: "id" == id}, {
      include: [{ 
        model: Category,
        as: 'categories'
      }]
    }).then((product) => {
      

      res.status(200).json({
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          description: product.description,
          image: "http://localhost:3000/img/products/" + product.image,
          productCategory: [
            { Category: product.Category.category },
            { Brand: product.brand_id },
          ],
        },
        status: 200,
      });
    });
  },
};

module.exports = apiProductsController;
