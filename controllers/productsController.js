const { validationResult } = require("express-validator");
const db = require("../database/models");
const Op = db.Sequelize.Op;

const productsController = {
  productCart: async (req, res) => {
    let logueado = req.session.userLogged;      
    let arrayCarrito = [];                          //inicializa el array de elementos del carrito
    let carrito = req.session.arrayCarrito;         //recupera el arrayCarrito del session si existe
    let arrayPrecio = [500];                        //inicializa array de SumaTotal incluyendo costo de envío
    let precio = req.session.arrayPrecio ;          //recupera array de SumaTotal del session si existe
    let destacados = await db.Product.findAll({     
      where: {
        discount: { [Op.lte]: 0 },
      },
    });
    if(precio){                                     //si existe sumaTotal en session lo incluye en el arrayPrecio (suma total)
      arrayPrecio = precio ;
    }   
    if (carrito) {                                  //si existe arrayCarrito en session lo incluye en el arrayCarrito
      arrayCarrito = carrito;
    }

    let indice = await db.Product.findByPk(req.params.id);         //trae de DB el producto a incorporar al carrito

    if (indice) {                                                  //si lo encuentra trae sus datos
        let indice2 = indice.dataValues
      let cantidad = req.body.selectcantidad                        //agrega la cantidad seleccionada al objeto
      let subtotalElemento = cantidad*indice2.price                 //calcula subtotal (precio x cantidad)
      let elemento ={                                       
        ...indice2,
        cantidad:cantidad,
        subtotalElemento:subtotalElemento
      }
      console.log("elemento", elemento)
      arrayCarrito.push(elemento);                                  //agrega el elemento al carrito
      arrayPrecio.push(subtotalElemento)                            //agrega el subtotal a la SuMaTotal
      console.log("indiceprice", indice.price)
      req.session.arrayPrecio = arrayPrecio;                        //guarda en session el arrayPrecio (sumaTotal que levanta al principio)
      req.session.arrayCarrito = arrayCarrito;                      //guarda en session el carrito
      }

      const initialValue = 0;               //reduce para sumar los distintos precios del array de carrito y guardarlo en sumaTotal
      const sumaTotal = arrayPrecio.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
      initialValue);
      req.session.sumaTotal = sumaTotal
      res.render("productCart", { arrayCarrito, destacados, carrito, logueado, sumaTotal});
  },

  productCartDelete: async (req, res) => {
    let logueado = req.session.userLogged;
    let id = req.params.id;
    let arrayCarrito = [];
    let carrito = req.session.arrayCarrito;
    let arrayPrecio = [];
    let precio = req.session.arrayPrecio ;
    
    let destacados = await db.Product.findAll({
      where: {
        discount: { [Op.lte]: 0 },
      },
    });

    if (carrito) {
      arrayCarrito = carrito;
    }
    console.log("preciosession", precio)
    if(precio){
      arrayPrecio = precio ;
    }

    const indiceAEliminar = arrayCarrito.findIndex((elemento) => {   //busca en el carrito el indice del producto a eliminar (viene por paramas)
      return elemento.id == id;
    });
    if (indiceAEliminar != -1) {                                          
      arrayCarrito.splice(indiceAEliminar, 1);                        //si lo encuentra elimina ese indice del arrayCarrito
      req.session.arrayCarrito = arrayCarrito;
      arrayPrecio.splice(indiceAEliminar+1, 1);                       //elimina el subtotal correspondiente a ese producto del arraySumatotal
      req.session.arrayPrecio = arrayPrecio;                          //guarda el nuevo array de suma total en session
      console.log("arrayPrecio", arrayPrecio)
    }
  
    const initialValue = 0;               //reduce para sumar los distintos precios del array de carrito y guardarlo en sumaTotal
const sumaTotal = arrayPrecio.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue);
    req.session.sumaTotal = sumaTotal

    res.render("productCart", { arrayCarrito, destacados, carrito, logueado, sumaTotal });
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
